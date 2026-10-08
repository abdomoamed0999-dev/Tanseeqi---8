import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Compass, 
  GraduationCap, 
  ArrowRightLeft, 
  FileCheck,
  ChevronUp
} from 'lucide-react';

export interface FaqItem {
  id: string;
  category: 'zoning' | 'transfer' | 'diplomas' | 'aptitude' | 'national_private' | 'general';
  categoryLabelAr: string;
  categoryLabelEn: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  officialSource?: string;
  sourceUrl?: string;
}

export const EGYPTIAN_ADMISSION_FAQS: FaqItem[] = [
  {
    id: 'zoning-rules',
    category: 'zoning',
    categoryLabelAr: 'التوزيع الجغرافي',
    categoryLabelEn: 'Geographic Zoning',
    questionAr: 'ما هي قواعد التوزيع الجغرافي (المجموعات أ، ب، ج) وكيف يتم تطبيقها؟',
    questionEn: 'What are the Geographic Zoning rules (Zones A, B, C) and how are they enforced?',
    answerAr: 'التوزيع الجغرافي قاعدة إلزامية من المجلس الأعلى للجامعات لمنع التكدس وتقليل الاغتراب:\n• المجموعة (أ) إجبارية: تشمل الجامعة أو الجامعات الأقرب للإدارة التعليمية التي حصل منها الطالب على الشهادة. يلزم اختيار كل كليات الرغبة في المجموعة (أ) أولاً.\n• المجموعة (ب) اختيارية بعد (أ): كليات تقع في النطاق الجغرافي المجاور للإدارة التعليمية.\n• المجموعة (ج): باقي الجامعات الحكومية في محافظات الجمهورية.\n⚠️ ملحوظة هامة: يرفض موقع التنسيق الإلكتروني حفظ الرغبات إذا اختار الطالب كلية من المجموعة (ب) قبل استيفاء كليات نفس التخصص في المجموعة (أ).',
    answerEn: 'Geographic zoning is mandatory by the Supreme Council of Universities:\n• Zone A (Mandatory): Closest universities to your educational administration. You must exhaust all Zone A faculties in your desired specialty first.\n• Zone B: Adjacent geographic governorates.\n• Zone C: All other governmental universities across Egypt.\n⚠️ The electronic portal automatically blocks submission if you select Zone B before exhausting Zone A.',
    officialSource: 'المجلس الأعلى للجامعات - مكتب التنسيق الرئيسي',
    sourceUrl: 'https://tansik.digital.gov.eg'
  },
  {
    id: 'alienation-reduction',
    category: 'transfer',
    categoryLabelAr: 'تقليل الاغتراب والتحويلات',
    categoryLabelEn: 'Alienation Reduction & Transfers',
    questionAr: 'ما هو الفرق بين تقليل الاغتراب المناظر وغير المناظر وشروطه؟',
    questionEn: 'What is the difference between Parallel vs. Non-Parallel Alienation Reduction?',
    answerAr: 'يفتح باب تقليل الاغتراب بنسبة 10% من الطاقة الاستيعابية للكليات، وينقسم إلى نوعين:\n1. التحويل المناظر (نفس الكلية): تحويل الطالب من كلية تم ترشيحه لها خارج منطقته الجغرافية (أ) إلى نفس الكلية داخل منطقته الجغرافية (أ)، بغض النظر عن فارق الحد الأدنى، مع مراعاة المفاضلة بالأعلى مجموعاً.\n2. التحويل غير المناظر (كلية مختلفة): تحويل الطالب لكلية أخرى مختلفة تماماً تقع داخل منطقته الجغرافية (أ)، ولكن يُشترط هنا استيفاء الطالب للحد الأدنى للقبول بالكلية المراد التحويل إليها واجتياز اختبارات قدراتها إن وُجدت.\n⚠️ التحويل إلكتروني فقط لمرة واحدة ولا توجد تحويلات ورقية بين الكليات.',
    answerEn: 'Alienation reduction opens within a 10% quota:\n1. Parallel Transfer: Moving to the same faculty in your Zone A, regardless of minor cutoff difference, ranked strictly by highest score.\n2. Non-Parallel Transfer: Moving to a different faculty inside Zone A; MUST satisfy the target faculty minimum cutoff score and aptitude tests.\n⚠️ The process is strictly online once; paper-based transfers are strictly prohibited.',
    officialSource: 'دليل تقليل الاغتراب الرسمي 2026',
    sourceUrl: 'https://tansik.digital.gov.eg'
  },
  {
    id: 'diplomas-equivalency',
    category: 'diplomas',
    categoryLabelAr: 'الدبلومات الفنية والمعادلات',
    categoryLabelEn: 'Technical Diplomas & Equivalency',
    questionAr: 'كيف يتم تنسيق الدبلومات الفنية (نظام 3 و 5 سنوات) ومسابقات المعادلة؟',
    questionEn: 'How does admission and central exam equivalency work for technical diplomas (3 & 5 years)?',
    answerAr: 'تُخصص نسبة 10% من مقاعد الكليات الحكومية (الهندسة، التجارة، التربية النوعية، الزراعة، الآثار، السياحة، التكنولوجيا والتعليم) لطلاب الدبلومات:\n• دبلوم 3 سنوات: الحد الأدنى عادة 70% للمعاهد الفنية والتكنولوجية، و75% فأكثر لبعض الكليات.\n• دبلوم 5 سنوات والمعاهد الفنية: يبدأ التنسيق من 75% فأكثر.\n• المسابقة المركزية الموحدة (معادلة الهندسة والتجارة والزراعة): تُعقد سنوياً تحت إشراف المجلس الأعلى للجامعات (بجامعة القاهرة وحلوان وعين شمس والزقازيق وأسيوط)، والنجاح بنسبة 50% في المواد يؤهل للالتحاق المباشر بالفرقة الأولى أو الإعدادي.',
    answerEn: '10% of university seats are allocated to diploma graduates:\n• 3-Year Diploma: Typically 70% for technical institutes, 75%+ for select faculties.\n• 5-Year Diploma: Starts at 75%+ for direct university entry.\n• Central Equivalency Exam (Engineering/Commerce/Agriculture): Administered by the Supreme Council of Universities; achieving 50%+ in test subjects grants direct university admission.',
    officialSource: 'أمانة المجلس الأعلى للجامعات - قطاع التعليم الفني',
    sourceUrl: 'https://scu.eg'
  },
  {
    id: 'aptitude-tests',
    category: 'aptitude',
    categoryLabelAr: 'اختبارات القدرات',
    categoryLabelEn: 'Aptitude Tests',
    questionAr: 'ما هي الكليات التي تشترط اختبارات القدرات وماذا يحدث في حال الرسوب؟',
    questionEn: 'Which faculties mandate aptitude tests and what happens upon failing?',
    answerAr: 'الكليات التي تشترط اجتياز القدرات قبل إعلان نتائج التنسيق تشمل:\n• كليات الفنون الجميلة (عمارة / فنون)\n• كليات الفنون التطبيقية\n• كليات التربية الموسيقية والتربية الفنية\n• كليات التربية الرياضية\n• كليات العلوم السينمائية والتطبيقية المتخصصة\n⚠️ تحذير حاسم: التسجيل يتم حصراً عبر موقع التنسيق الإلكتروني، ولا يُسمح نهائياً بإعادة اختبار القدرات في حال الرسوب في نفس العام تحت أي ظرف.',
    answerEn: 'Faculties requiring aptitude tests include: Applied Arts, Fine Arts (Architecture & Arts), Sports Education, Music Education, Art Education, and Media.\n⚠️ Tests are booked exclusively via the Tansik portal. Re-examination upon failure is strictly prohibited in the same academic year.',
    officialSource: 'لجنة اختبارات القدرات - وزارة التعليم العالي',
    sourceUrl: 'https://tansik.digital.gov.eg'
  },
  {
    id: 'nomination-card',
    category: 'general',
    categoryLabelAr: 'بطاقة الترشيح وتعديل الرغبات',
    categoryLabelEn: 'Nomination Card & Preferences',
    questionAr: 'متى تصبح بطاقة الترشيح نهائية؟ وهل يمكن تعديل الرغبات بعد الحفظ؟',
    questionEn: 'When does the nomination card become final? Can preferences be edited after saving?',
    answerAr: '• تعديل الرغبات: يحق للطالب تعديل رغباته الـ 75 على موقع التنسيق عدداً لا نهائياً من المرات طوال فترة فتح المرحلة (عادة 5 أيام). يعتمد الموقع دائماً آخر تعديل تم حفظه قبل إغلاق النظام في تمام السابعة مساء اليوم الأخير.\n• بطاقة الترشيح: البطاقة التي تطبعها بعد إعلان نتيجة المرحلة هي بطاقة مبدئية. تصبح بطاقة الترشيح "نهائية" فقط بعد انتهاء مرحلة تقليل الاغتراب وطباعة البطاقة المحدثة، وهي الوثيقة المطلوبة لتقديم الملف للكلية مع استمارة 2 و 6 جند للذكور وشهادة الميلاد الأصلية.',
    answerEn: '• Preference editing: You can modify your 75 preferences unlimited times while your stage is open. The portal saves the final submitted state at 7 PM on closing day.\n• Final Card: Initial nomination cards are tentative. The nomination card becomes FINAL only after the alienation reduction stage concludes.',
    officialSource: 'دليل مستخدم بوابة التنسيق الرقمية',
    sourceUrl: 'https://tansik.digital.gov.eg'
  },
  {
    id: 'national-private-unis',
    category: 'national_private',
    categoryLabelAr: 'الجامعات الأهلية والتكنولوجية والخاصة',
    categoryLabelEn: 'National & Private Universities',
    questionAr: 'ما الفرق بين الجامعات الأهلية المنبثقة والجامعات التكنولوجية والخاصة؟',
    questionEn: 'What is the distinction between Public-Spinoff National Unis, Technological Unis, and Private Unis?',
    answerAr: '1. الجامعات الأهلية المنبثقة من حكومية (مثل: حلوان الأهلية، بنها الأهلية، المنصورة الأهلية، الإسكندرية الأهلية): جامعات غير هادفة للربح، تقبل بحد أدنى أقل من الحكومي بـ 2% إلى 8%، ومصروفاتها مدعومة جزئياً.\n2. الجامعات الأهلية الدولية (الجلالة، العلمين، الملك سلمان، المنصورة الجديدة): تقدم برامج وتخصصات دولية بشراكات عالمية وتنسيق مستقل عبر منصتها الإلكترونية.\n3. الجامعات التكنولوجية (القاهرة الجديدة، بني سويف، الدلتا، مصر التكنولوجية): تركز على التدريب العملي لطلاب الثانوية والدبلومات الفنية (60% من مقاعدها للدبلومات الصناعية والتجارية) وتمنح بكالوريوس تكنولوجي معتمد.\n4. الجامعات الخاصة: تنسيق مباشر وموحد عبر موقع مجلس الجامعات الخاصة والأهلية.',
    answerEn: '1. National Spinoff Universities (Helwan, Benha, Mansoura, Alex): Non-profit, ~2-8% lower thresholds than public universities.\n2. International National Universities (Galala, Alamein, King Salman, New Mansoura): Independent electronic coordination with global dual-degree partnerships.\n3. Technological Universities: 60% diploma quota, hands-on industrial training, granting Bachelor of Technology.\n4. Private Universities: Unified electronic portal managed by Council of Private Universities.',
    officialSource: 'مجلس الجامعات الخاصة والأهلية - وزارة التعليم العالي',
    sourceUrl: 'https://cpnu-admission.edu.eg'
  },
  {
    id: 'exhausted-preferences',
    category: 'general',
    categoryLabelAr: 'استنفاذ الرغبات والتحويل اللاحق',
    categoryLabelEn: 'Exhausted Preferences & Re-admission',
    questionAr: 'ماذا يحدث إذا استنفذ الطالب رغباته؟ وكيف يتعامل الموقع مع ذلك؟',
    questionEn: 'What happens if a student exhausts all preferences without getting matched?',
    answerAr: 'يحدث استنفاذ الرغبات عندما يكتب الطالب كليات كان حدها الأدنى أعلى من مجموعه في كافة الرغبات الـ 75 المسجلة:\n• يتم إخطار الطالب في صفحة النتيجة بعبارة "استنفاذ الرغبات".\n• يفتح مكتب التنسيق رابطاً خاصاً للطلاب مستنفذي الرغبات لإعادة تسجيل رغبات جديدة تتناسب مع الكليات والمعاهد التي بها أماكن شاغرة.\n• لا يفقد الطالب حقه في الالتحاق بالتعليم الجامعي، ويتم تسكينه في أقرب كلية أو معهد شاغر مستوفٍ للحد الأدنى للمجموع.',
    answerEn: 'Exhausted preferences happen when all 75 registered choices have higher thresholds than your total score:\n• The portal displays "Exhausted Preferences" upon results release.\n• A dedicated re-entry portal is immediately opened to allow choosing from vacant institutions matching your actual score.\n• You never lose your right to higher education admission.',
    officialSource: 'قواعد التنسيق المعتمدة 2026',
    sourceUrl: 'https://tansik.digital.gov.eg'
  }
];

interface FaqAccordionProps {
  lang: 'ar' | 'en';
  onOpenAi?: () => void;
  defaultCollapsed?: boolean;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  lang,
  onOpenAi,
  defaultCollapsed = false
}) => {
  // Track open item IDs
  const [openItems, setOpenItems] = useState<string[]>(
    defaultCollapsed ? [] : ['zoning-rules', 'alienation-reduction']
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => [
    { id: 'all', labelAr: 'جميع الأسئلة', labelEn: 'All Questions' },
    { id: 'zoning', labelAr: 'التوزيع الجغرافي', labelEn: 'Zoning' },
    { id: 'transfer', labelAr: 'تقليل الاغتراب', labelEn: 'Transfers' },
    { id: 'diplomas', labelAr: 'الدبلومات الفنية', labelEn: 'Diplomas' },
    { id: 'aptitude', labelAr: 'اختبارات القدرات', labelEn: 'Aptitude Tests' },
    { id: 'national_private', labelAr: 'الجامعات الأهلية', labelEn: 'National & Private' },
    { id: 'general', labelAr: 'الرغبات والترشيح', labelEn: 'General Rules' },
  ], []);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return EGYPTIAN_ADMISSION_FAQS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const q = lang === 'ar' ? item.questionAr.toLowerCase() : item.questionEn.toLowerCase();
      const a = lang === 'ar' ? item.answerAr.toLowerCase() : item.answerEn.toLowerCase();
      const cat = lang === 'ar' ? item.categoryLabelAr.toLowerCase() : item.categoryLabelEn.toLowerCase();

      return matchesCategory && (q.includes(query) || a.includes(query) || cat.includes(query));
    });
  }, [selectedCategory, searchQuery, lang]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenItems(filteredFaqs.map(f => f.id));
  };

  const handleCollapseAll = () => {
    setOpenItems([]);
  };

  const handleCopy = (item: FaqItem) => {
    const text = lang === 'ar' 
      ? `س: ${item.questionAr}\n\nج: ${item.answerAr}\n\nالمصدر: ${item.officialSource || 'موقع التنسيق الإلكتروني'}`
      : `Q: ${item.questionEn}\n\nA: ${item.answerEn}\n\nSource: ${item.officialSource || 'Tansik Portal'}`;

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-3.5">
      
      {/* Header Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{lang === 'ar' ? 'الأسئلة الشائعة وقواعد التنسيق' : 'Admissions FAQ & Rules'}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {lang === 'ar' ? 'معتمد 2026' : 'Official'}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {lang === 'ar' 
                  ? 'إجابات موثقة لقواعد القبول، التوزيع الجغرافي، تقليل الاغتراب، ومعادلات الدبلومات' 
                  : 'Official answers for zoning, transfers, diploma equivalencies & aptitude tests'}
              </p>
            </div>
          </div>

          {/* Expand/Collapse Toggle Actions */}
          <div className="flex items-center gap-1 shrink-0 text-[10px]">
            <button
              onClick={handleExpandAll}
              className="px-2 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title={lang === 'ar' ? 'فتح الكل' : 'Expand All'}
            >
              {lang === 'ar' ? 'فتح الكل' : 'Expand All'}
            </button>
            <button
              onClick={handleCollapseAll}
              className="px-2 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title={lang === 'ar' ? 'طي الكل' : 'Collapse All'}
            >
              {lang === 'ar' ? 'طي الكل' : 'Collapse All'}
            </button>
          </div>
        </div>

        {/* Real-Time Search Bar */}
        <div className="mt-3 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'ابحث في الأسئلة (مثال: تقليل الاغتراب، دبلوم، هندسة، قدرات)...'
                : 'Search questions (e.g., zoning, transfer, diploma, aptitude)...'
            }
            className="w-full ps-8 pe-8 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[10px] text-slate-400 hover:text-white absolute end-2.5 top-1/2 -translate-y-1/2 px-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filters (Horizontal Scrollable) */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/20'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/70'
                }`}
              >
                <span>{lang === 'ar' ? cat.labelAr : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-2">
        {filteredFaqs.length === 0 ? (
          <div className="p-6 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            <HelpCircle className="w-6 h-6 mx-auto mb-2 text-slate-500 opacity-60" />
            <p>
              {lang === 'ar'
                ? 'لم يتم العثور على نتائج مطابقة لبحثك.'
                : 'No matching admission questions found.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-2 text-emerald-400 hover:underline text-[11px]"
            >
              {lang === 'ar' ? 'عرض جميع الأسئلة' : 'Reset filters'}
            </button>
          </div>
        ) : (
          filteredFaqs.map((item, index) => {
            const isOpen = openItems.includes(item.id);
            const questionText = lang === 'ar' ? item.questionAr : item.questionEn;
            const answerText = lang === 'ar' ? item.answerAr : item.answerEn;
            const catLabel = lang === 'ar' ? item.categoryLabelAr : item.categoryLabelEn;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/95 border-emerald-500/40 shadow-md shadow-emerald-950/20'
                    : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700/80'
                }`}
              >
                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-3.5 flex items-start justify-between gap-3 text-start select-none transition-colors group cursor-pointer"
                >
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold text-emerald-400/90">
                          {catLabel}
                        </span>
                      </div>
                      <h3 className={`text-xs font-bold leading-snug transition-colors ${
                        isOpen ? 'text-white' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {questionText}
                      </h3>
                    </div>
                  </div>

                  {/* Collapse Icon Indicator */}
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen 
                      ? 'bg-emerald-500/20 text-emerald-400 rotate-180' 
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Collapsible Content Area */}
                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-800/60 text-xs animate-in fade-in-50 duration-200">
                    {/* Formatted Answer Body */}
                    <div className="text-slate-300 leading-relaxed space-y-1.5 whitespace-pre-line text-[11.5px] bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                      {answerText}
                    </div>

                    {/* Footer Actions: Source & Copy */}
                    <div className="mt-2.5 pt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                      {item.officialSource && (
                        <div className="flex items-center gap-1 text-slate-400 truncate max-w-[240px]">
                          <BookOpen className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{item.officialSource}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 ms-auto shrink-0">
                        {item.sourceUrl && (
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-slate-400"
                          >
                            <span>{lang === 'ar' ? 'البوابة الرسمية' : 'Portal'}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}

                        <button
                          onClick={() => handleCopy(item)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct AI Advisor Referral Box */}
      {onOpenAi && (
        <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-slate-900 border border-emerald-500/20 flex items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block text-[11px]">
                {lang === 'ar' ? 'لديك سؤال خاص بمجموعك أو محافظتك؟' : 'Have a custom inquiry for your score?'}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === 'ar' ? 'المستشار الذكي متاح للرد الفوري على مدار الساعة' : 'AI Advisor available 24/7 for instant answers'}
              </span>
            </div>
          </div>
          <button
            onClick={onOpenAi}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shrink-0 transition-colors"
          >
            {lang === 'ar' ? 'اسأل المستشار' : 'Ask AI'}
          </button>
        </div>
      )}

    </div>
  );
};
