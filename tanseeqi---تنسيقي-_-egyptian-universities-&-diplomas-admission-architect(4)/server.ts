import http from 'http';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { getTanseeqiKnowledgeAnswer } from './src/data/advisorKnowledge.ts';

dotenv.config();

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const httpServer = http.createServer(app);

  app.use(express.json());

  // API endpoint for Tanseeqi AI Counselor
  app.post('/api/chat', async (req, res) => {
    const { message, history, lang = 'ar' } = req.body;
    const customKey = (req.headers['x-gemini-api-key'] as string) || req.body.customApiKey;
    const apiKey = customKey || process.env.GEMINI_API_KEY;

    // Helper to get instant knowledge base reply
    const sendKnowledgeBaseReply = (isQuotaExceeded = false) => {
      const kbAnswer = getTanseeqiKnowledgeAnswer(message, lang === 'en' ? 'en' : 'ar');
      return res.status(200).json({
        reply: kbAnswer.response,
        groundingMetadata: {
          groundingChunks: (kbAnswer.groundingSources || []).map((s) => ({
            web: { title: s.title, uri: s.uri },
          })),
        },
        suggestedFollowUps: kbAnswer.suggestedFollowUps,
        quotaNotice: isQuotaExceeded,
      });
    };

    if (!apiKey) {
      return sendKnowledgeBaseReply(false);
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      // Build contents array with conversation history
      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) { // Keep last 6 exchanges to save tokens
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.content }],
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const systemInstruction = `أنت "مستشار تنسيقي الذكي" (Tanseeqi AI Counselor) - مستشار أكاديمي خبير في قواعد تنسيق القبول بالجامعات والمعاهد العليا المصرية لطلاب الثانوية العامة (علمي علوم، علمي رياضة، أدبي) وطلاب الدبلومات الفنية (صناعي، تجاري، زراعي، سياحة وفنادق نظام 3 و 5 سنوات).
مهامك:
1. تقديم إرشادات دقيقة حول الحدود الدنيا للقبول بالجامعات الحكومية والأهلية والخاصة والتكنولوجية والمعاهد العليا.
2. شرح قواعد التوزيع الجغرافي (مجموعة أ، ب، ج)، تقليل الاغتراب، واختبارات القدرات.
3. توضيح شروط ومواد المسابقة المركزية الموحدة (معادلة كلية الهندسة، كلية التجارة، كلية الزراعة) لخريجي الدبلومات الفنية.
4. استخدم لغة عربية مهنية ومشجعة للطلاب وأولياء الأمور في مصر.`;

      // Helper to check if error is quota exhaustion / rate limit
      const isQuotaError = (err: any): boolean => {
        if (!err) return false;
        const msg = (typeof err === 'string' ? err : err.message || JSON.stringify(err)).toLowerCase();
        return (
          err.status === 429 ||
          err.code === 429 ||
          msg.includes('429') ||
          msg.includes('quota') ||
          msg.includes('resource_exhausted') ||
          msg.includes('rate-limit') ||
          msg.includes('rate limit')
        );
      };

      // Helper to execute with timeout
      const executeWithTimeout = async <T>(promise: Promise<T>, timeoutMs = 6000): Promise<T> => {
        let timer: any;
        const timeoutPromise = new Promise<never>((_, reject) => {
          timer = setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs);
        });
        try {
          return await Promise.race([promise, timeoutPromise]);
        } finally {
          clearTimeout(timer);
        }
      };

      let replyText: string | null = null;
      let grounding: any = null;

      // Tier 1: Try gemini-3.8-flash with Google Search
      try {
        const response = await executeWithTimeout(
          ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction,
              tools: [{ googleSearch: {} }],
            },
          }),
          7000
        );
        replyText = response.text || null;
        grounding = response.candidates?.[0]?.groundingMetadata || null;
      } catch (tier1Err: any) {
        if (isQuotaError(tier1Err)) {
          // If quota limit 429 is encountered, instantly serve verified academic knowledge base
          return sendKnowledgeBaseReply(true);
        }

        // Tier 2: Try gemini-3.8-flash without search tool
        try {
          const response = await executeWithTimeout(
            ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents,
              config: {
                systemInstruction,
              },
            }),
            5000
          );
          replyText = response.text || null;
          grounding = null;
        } catch {
          return sendKnowledgeBaseReply(true);
        }
      }

      if (!replyText) {
        return sendKnowledgeBaseReply(true);
      }

      return res.status(200).json({
        reply: replyText,
        groundingMetadata: grounding,
        quotaNotice: false,
      });
    } catch (err: any) {
      console.warn('Tanseeqi chat fallback handler invoked:', err?.message || err);
      return sendKnowledgeBaseReply(true);
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Tanseeqi API' });
  });

  // Mount Vite middleware in development, or serve built assets in production
  const distPath = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.resolve(distPath, 'index.html');
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction || !fs.existsSync(indexHtmlPath)) {
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server: httpServer },
        watch: isHmrDisabled ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(indexHtmlPath);
    });
  }

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
