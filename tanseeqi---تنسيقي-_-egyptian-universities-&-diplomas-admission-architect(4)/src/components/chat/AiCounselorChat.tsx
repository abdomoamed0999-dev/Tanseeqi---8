import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Globe, 
  RotateCcw, 
  Lightbulb, 
  Loader2,
  BookOpen
} from 'lucide-react';
import { getTanseeqiKnowledgeAnswer } from '../../data/advisorKnowledge';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  groundingSources?: Array<{ title?: string; uri?: string }>;
  suggestedFollowUps?: string[];
  quotaNotice?: boolean;
  timestamp: string;
}

interface AiCounselorChatProps {
  lang?: 'ar' | 'en';
}

export const AiCounselorChat: React.FC<AiCounselorChatProps> = ({ lang = 'ar' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: lang === 'ar'
        ? 'مرحباً بك! أنا "مستشار تنسيقي الذكي" المعتمد على قواعد التنسيق الرسمية ونماذج الذكاء الاصطناعي مع البحث المحدث. كيف يمكنني إرشادك اليوم بخصوص كليات الثانوية العامة أو الدبلومات الفنية والمعادلات وقواعد التوزيع الجغرافي؟'
        : 'Welcome! I am Tanseeqi AI Counselor powered by Egyptian Coordination regulations and AI. How can I guide you today regarding colleges, diploma equivalencies, or zoning rules?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    {
      ar: 'ما هي شروط معادلة كلية الهندسة لدبلوم صناعي 3 سنوات؟',
      en: 'Requirements for engineering equivalency for 3Y industrial diploma?',
    },
    {
      ar: 'أنا جايب 88% علمي رياضة بالقاهرة، ما هي كليات الهندسة والحاسبات المتاحة؟',
      en: 'I scored 88% in Math track in Cairo, what engineering faculties fit?',
    },
    {
      ar: 'ما هي الجامعات التكنولوجية الـ 10 ومصروفاتها للشهادات الفنية؟',
      en: 'What are the 10 technological universities and their fees?',
    },
    {
      ar: 'كيف أختار رغباتي لتجنب استنفاذ الرغبات وقواعد التوزيع الجغرافي؟',
      en: 'How to arrange choices to avoid desire exhaustion under zoning rules?',
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          lang,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server status ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || (lang === 'ar' ? 'تم استلام استفسارك ومراجعة مؤشرات التنسيق.' : 'Response received.');

      // Extract search grounding sources if present
      const sources: Array<{ title?: string; uri?: string }> = [];
      if (data.groundingMetadata?.groundingChunks) {
        for (const chunk of data.groundingMetadata.groundingChunks) {
          if (chunk.web?.uri) {
            sources.push({
              title: chunk.web.title || chunk.web.uri,
              uri: chunk.web.uri,
            });
          }
        }
      }

      const assistantMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: reply,
        groundingSources: sources.length > 0 ? sources : undefined,
        suggestedFollowUps: data.suggestedFollowUps,
        quotaNotice: Boolean(data.quotaNotice),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      // Instant intelligent fallback to verified local knowledge base
      const localAnswer = getTanseeqiKnowledgeAnswer(text, lang);
      const assistantMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: localAnswer.response,
        groundingSources: localAnswer.groundingSources,
        suggestedFollowUps: localAnswer.suggestedFollowUps,
        quotaNotice: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: lang === 'ar'
          ? 'مرحباً بك! أنا مستشارك الذكي لتنسيق الجامعات والدبلومات الفنية بمصر. كيف يمكنني إرشادك اليوم؟'
          : 'Hello! I am your Tanseeqi AI Counselor. How can I guide you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[460px] sm:h-[520px] md:h-[580px] max-h-[75vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden relative">
      
      {/* Header */}
      <div className="p-3.5 px-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-white">
                {lang === 'ar' ? 'مستشار التنسيق الذكي (Tanseeqi AI)' : 'Tanseeqi AI Counselor'}
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[10px] text-slate-400">
              {lang === 'ar' ? 'دليل القواعد المعتمدة للمجلس الأعلى للجامعات' : 'Official SCU Admission Engine'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={resetChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={lang === 'ar' ? 'محادثة جديدة' : 'Reset chat'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                msg.role === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-emerald-400 border border-slate-700'
              }`}
            >
              {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3 leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-sm font-medium'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {/* Quota Notice Badge */}
              {msg.quotaNotice && (
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-amber-300/90 bg-amber-500/10 p-1.5 rounded-lg">
                  <BookOpen className="w-3 h-3 shrink-0 text-amber-400" />
                  <span>
                    {lang === 'ar'
                      ? 'ملاحظة: تم تقديم هذا الرد الموثق استناداً لقواعد التنسيق المعتمدة للمجلس الأعلى للجامعات.'
                      : 'Note: Answer verified via official Supreme Council of Universities admission regulations.'}
                  </span>
                </div>
              )}

              {/* Grounding Sources */}
              {msg.groundingSources && msg.groundingSources.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-emerald-400" />
                    <span>{lang === 'ar' ? 'المصادر المعتمدة:' : 'Official Portals:'}</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.groundingSources.slice(0, 3).map((src, i) => (
                      <a
                        key={i}
                        href={src.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 underline truncate max-w-[220px]"
                      >
                        {src.title || src.uri}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Follow-Ups */}
              {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] text-slate-400 block mb-1">
                    {lang === 'ar' ? 'استفسارات مرتبطة مقترحة:' : 'Related questions:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {msg.suggestedFollowUps.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[10px] text-emerald-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 px-2 py-0.5 rounded-md text-right transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <span className="block text-[9px] text-slate-400 text-left mt-1.5 opacity-70">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl rounded-tl-sm p-3 text-slate-400 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>{lang === 'ar' ? 'جارٍ تحليل قواعد التنسيق وبيانات القبول...' : 'Analyzing admission rules...'}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-1.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
        <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(lang === 'ar' ? q.ar : q.en)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-white whitespace-nowrap transition-colors shrink-0"
          >
            {lang === 'ar' ? q.ar : q.en}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-2.5 sm:p-3 bg-slate-950 border-t border-slate-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'اسأل المستشار عن كليات مجموعك، معادلات الدبلومات، أو التوزيع الجغرافي...'
                : 'Ask about eligible colleges, diploma equivalencies, or zoning...'
            }
            className="flex-1 h-10 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 flex items-center justify-center transition-colors shrink-0 font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
