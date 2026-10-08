import React, { useState } from 'react';
import { 
  Calculator, 
  Radio, 
  Wrench, 
  Building2, 
  Bot, 
  HelpCircle, 
  BookOpen, 
  ExternalLink,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

export type PortalTab = 'calc' | 'tracker' | 'diplomas' | 'directory' | 'ai' | 'faq';

interface NavbarProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  activeTab: PortalTab;
  setActiveTab: (tab: PortalTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: PortalTab; labelAr: string; labelEn: string; icon: React.ReactNode; badge?: string }> = [
    {
      id: 'calc',
      labelAr: 'حاسبة التنسيق',
      labelEn: 'Calculator',
      icon: <Calculator className="w-4 h-4" />,
      badge: lang === 'ar' ? 'تراكمي' : 'GPA'
    },
    {
      id: 'tracker',
      labelAr: 'متابعة المراحل',
      labelEn: 'Live Tracker',
      icon: <Radio className="w-4 h-4" />,
      badge: lang === 'ar' ? 'مباشر' : 'Live'
    },
    {
      id: 'diplomas',
      labelAr: 'الدبلومات الفنية',
      labelEn: 'Diplomas Hub',
      icon: <Wrench className="w-4 h-4" />,
    },
    {
      id: 'directory',
      labelAr: 'دليل الجامعات',
      labelEn: 'Universities',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: 'ai',
      labelAr: 'المستشار الذكي',
      labelEn: 'AI Advisor',
      icon: <Bot className="w-4 h-4 text-emerald-400" />,
      badge: 'AI'
    },
    {
      id: 'faq',
      labelAr: 'الأسئلة الشائعة',
      labelEn: 'FAQ',
      icon: <HelpCircle className="w-4 h-4" />,
    },
  ];

  const handleTabClick = (tab: PortalTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleTabClick('calc')}
              className="flex items-center gap-3 text-right hover:opacity-95 transition-opacity"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
                ت
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white tracking-tight font-sans">
                    {lang === 'ar' ? 'تنسيقي' : 'Tanseeqi'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30">
                    2026
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  {lang === 'ar' 
                    ? 'بوابة تنسيق الجامعات المصرية والمعاهد العليا' 
                    : 'Egyptian University & Diploma Admissions Portal'}
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Web Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all relative ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                      isActive 
                        ? 'bg-emerald-400 text-slate-950' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (Official Portal + Language Switcher + Mobile Toggle) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://tansik.digital.gov.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              title={lang === 'ar' ? 'الانتقال إلى موقع التنسيق الإلكتروني الحكومي' : 'Go to Official Government Portal'}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'ar' ? 'بوابة التنسيق الرسمية' : 'Official Portal'}</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            {/* Language Switch Button */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="تبديل اللغة / Toggle Language"
            >
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-4 space-y-1.5 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-between text-right border transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <a
              href="https://tansik.digital.gov.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-medium border border-slate-800"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'زيارة موقع التنسيق الإلكتروني الرسمي' : 'Visit Official Coordination Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
