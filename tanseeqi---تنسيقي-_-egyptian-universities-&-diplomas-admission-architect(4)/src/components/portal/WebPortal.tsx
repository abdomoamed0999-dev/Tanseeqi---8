import React, { useState } from 'react';
import { 
  Calculator, 
  Radio, 
  Wrench, 
  Building2, 
  Bot, 
  HelpCircle,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock,
  Compass,
  ArrowRightLeft
} from 'lucide-react';
import { CalculatorScreen } from '../mobile/screens/CalculatorScreen';
import { LiveTrackerScreen } from '../mobile/screens/LiveTrackerScreen';
import { DiplomasScreen } from '../mobile/screens/DiplomasScreen';
import { DirectoryScreen } from '../mobile/screens/DirectoryScreen';
import { CollegeDetailModal } from '../mobile/screens/CollegeDetailModal';
import { AiCounselorChat } from '../chat/AiCounselorChat';
import { FaqAccordion } from '../mobile/FaqAccordion';
import { College } from '../../types/tanseeqi';
import { PortalTab } from '../Navbar';

interface WebPortalProps {
  lang: 'ar' | 'en';
  activeTab: PortalTab;
  setActiveTab: (tab: PortalTab) => void;
}

export const WebPortal: React.FC<WebPortalProps> = ({
  lang,
  activeTab,
  setActiveTab,
}) => {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const portalTabs: Array<{
    id: PortalTab;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'calc',
      titleAr: 'حاسبة التنسيق والمجموع',
      titleEn: 'Score & GPA Calculator',
      descAr: 'حساب النسبة التراكمية، نظام 320 و 410، والكليات المتاحة',
      descEn: 'Cumulative GPA, 320/410 systems, and matching colleges',
      icon: <Calculator className="w-5 h-5 text-emerald-400" />,
      badge: lang === 'ar' ? 'نظام 320' : '320 Marks'
    },
    {
      id: 'tracker',
      titleAr: 'متابعة مراحل التنسيق',
      titleEn: 'Live Stages Tracker',
      descAr: 'المرحلة الأولى والثانية واختبارات القدرات لحظة بلحظة',
      descEn: 'Phase 1, 2, 3 and aptitude test real-time monitoring',
      icon: <Radio className="w-5 h-5 text-emerald-400" />,
      badge: lang === 'ar' ? 'مباشر' : 'Live'
    },
    {
      id: 'diplomas',
      titleAr: 'تنسيق الدبلومات والمعادلات',
      titleEn: 'Technical Diplomas Hub',
      descAr: 'دبلوم 3 و 5 سنوات، مسابقة المعادلة، والجامعات التكنولوجية',
      descEn: '3Y & 5Y technical diplomas, equivalencies, and tech unis',
      icon: <Wrench className="w-5 h-5 text-teal-400" />,
    },
    {
      id: 'directory',
      titleAr: 'دليل الكليات والجامعات',
      titleEn: 'Colleges & Universities',
      descAr: 'دليل الجامعات الحكومية والأهلية والخاصة والمعاهد العليا',
      descEn: 'Public, National, Private universities and higher institutes',
      icon: <Building2 className="w-5 h-5 text-emerald-400" />,
      badge: lang === 'ar' ? '450+ كلية' : '450+ Inst.'
    },
    {
      id: 'ai',
      titleAr: 'المستشار الذكي (AI)',
      titleEn: 'AI Admissions Advisor',
      descAr: 'إرشاد فوري مدعوم بالذكاء الاصطناعي وقواعد المجلس الأعلى',
      descEn: 'Instant guidance powered by official admission criteria',
      icon: <Bot className="w-5 h-5 text-emerald-400" />,
      badge: 'AI'
    },
    {
      id: 'faq',
      titleAr: 'الأسئلة الشائعة وقواعد القبول',
      titleEn: 'Admission FAQs & Rules',
      descAr: 'قواعد التوزيع الجغرافي، تقليل الاغتراب، والشهادات المعادلة',
      descEn: 'Geographic zoning, alienation reduction, and credentials',
      icon: <HelpCircle className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <div className="w-full space-y-6">
      
      {/* Web Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 p-4 sm:p-6 lg:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lang === 'ar' ? 'بوابة التنسيق المعتمدة · الموسم الجامعي 2026' : 'Official Tanseeqi Portal · 2026 Academic Season'}</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {lang === 'ar' ? (
                <>
                  منظومة التنسيق الذكية للجامعات والمعاهد المصرية <span className="text-emerald-400">2026</span>
                </>
              ) : (
                <>
                  Smart Egyptian Universities Admission Portal <span className="text-emerald-400">2026</span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'احسب مجموعك التراكمي بدقة مع نظام الثانوية العامة الجديد (320 درجة) ونظام 410 التقليدي، واكتشف كليات القمة والجامعات الأهلية المتاحة لمجموعك وتوزيعك الجغرافي مع مقارنة تاريخية لـ 3 أعوام سابقة.'
                : 'Accurately estimate your cumulative GPA under the new restructured 320-mark system and classic 410-mark system. Discover matching governmental, national, and technological universities based on official SCU zoning.'}
            </p>

            {/* Portal Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] sm:text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{lang === 'ar' ? 'معايير المجلس الأعلى للجامعات' : 'Supreme Council Standards'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{lang === 'ar' ? 'توزيع جغرافي ذكي (أ، ب، ج)' : 'Smart Geographic Zoning (A, B, C)'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{lang === 'ar' ? 'تحديثات مباشرة لمراحل التنسيق' : 'Live Stage Status'}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Stat Card on Desktop */}
          <div className="hidden xl:flex flex-col gap-3 shrink-0 p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 w-72 text-right">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{lang === 'ar' ? 'حالة التنسيق الإلكتروني' : 'System Status'}</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {lang === 'ar' ? 'نشط' : 'Active'}
              </span>
            </div>
            <div className="space-y-2 pt-1 border-t border-slate-800/60 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'ar' ? 'المرحلة الأولى:' : 'Phase 1:'}</span>
                <span className="text-emerald-400 font-semibold">{lang === 'ar' ? 'مفتوحة الآن' : 'Open Now'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'ar' ? 'الحد الأدنى لعلوم:' : 'Science Cutoff:'}</span>
                <span className="text-white font-mono font-bold">88.5% (283 د)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'ar' ? 'الحد الأدنى لرياضة:' : 'Math Cutoff:'}</span>
                <span className="text-white font-mono font-bold">84.0% (268.8 د)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'ar' ? 'الحد الأدنى لأدبي:' : 'Arts Cutoff:'}</span>
                <span className="text-white font-mono font-bold">70.0% (224 د)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website Primary Portal Tabs Navigation */}
      <nav aria-label="Portal Navigation" className="border-b border-slate-800 pb-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
          {portalTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2.5 sm:p-3.5 rounded-xl text-right transition-all flex flex-col justify-between border relative group ${
                  isActive
                    ? 'bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/20'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}`}>
                    {tab.icon}
                  </div>
                  {tab.badge && (
                    <span className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                      isActive 
                        ? 'bg-emerald-500 text-slate-950' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className={`text-xs sm:text-sm font-bold tracking-tight ${
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {lang === 'ar' ? tab.titleAr : tab.titleEn}
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1 mt-0.5 hidden sm:block">
                    {lang === 'ar' ? tab.descAr : tab.descEn}
                  </p>
                </div>

                {/* Active bottom highlight bar */}
                {isActive && (
                  <span className="absolute -bottom-2 left-3 right-3 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Tab Screen Content View (Full Web Width Container) */}
      <section className="min-h-[500px]">
        {activeTab === 'calc' && (
          <div className="space-y-6">
            <CalculatorScreen
              onSelectCollege={(c) => setSelectedCollege(c)}
              lang={lang}
              onOpenAi={() => setActiveTab('ai')}
            />
          </div>
        )}

        {activeTab === 'tracker' && (
          <div className="space-y-6">
            <LiveTrackerScreen lang={lang} />
          </div>
        )}

        {activeTab === 'diplomas' && (
          <div className="space-y-6">
            <DiplomasScreen
              onSelectCollege={(c) => setSelectedCollege(c)}
              lang={lang}
            />
          </div>
        )}

        {activeTab === 'directory' && (
          <div className="space-y-6">
            <DirectoryScreen
              onSelectCollege={(c) => setSelectedCollege(c)}
              lang={lang}
            />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-4 max-w-5xl mx-auto">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-base font-bold text-white">
                    {lang === 'ar' ? 'مستشار تنسيقي الذكي للقبول الجامعي' : 'Tanseeqi AI Admission Counselor'}
                  </h2>
                </div>
                <p className="text-xs text-slate-300">
                  {lang === 'ar'
                    ? 'محرك استشاري ذكي مدعوم بنماذج الذكاء الاصطناعي وقواعد المجلس الأعلى للجامعات المصرية للإجابة عن أسئلة التوزيع الجغرافي والحدود الدنيا والمعادلات.'
                    : 'Intelligent advisor trained on Egyptian admission regulations, zoning rules, and minimum cutoffs.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'إجابات معتمدة رسمياً' : 'Verified Admissions Rules'}</span>
              </div>
            </div>

            <AiCounselorChat lang={lang} />
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <FaqAccordion
              lang={lang}
              onOpenAi={() => setActiveTab('ai')}
              defaultCollapsed={false}
            />
          </div>
        )}
      </section>

      {/* College Detail Modal Dialog */}
      <CollegeDetailModal
        college={selectedCollege}
        userGovernorate="القاهرة"
        onClose={() => setSelectedCollege(null)}
        lang={lang}
      />

    </div>
  );
};
