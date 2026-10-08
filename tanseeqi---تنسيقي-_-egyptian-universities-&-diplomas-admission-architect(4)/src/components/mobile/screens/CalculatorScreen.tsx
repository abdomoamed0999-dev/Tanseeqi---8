import React from 'react';
import { College } from '../../../types/tanseeqi';
import { AdmissionCalculator } from '../../calculator/AdmissionCalculator';
import { MOCK_COLLEGES } from '../../../data/mockTansikData';
import { FaqAccordion } from '../FaqAccordion';
import { ExternalLink } from 'lucide-react';

interface CalculatorScreenProps {
  onSelectCollege: (college: College) => void;
  lang: 'ar' | 'en';
  onOpenAi?: () => void;
}

export const CalculatorScreen: React.FC<CalculatorScreenProps> = ({
  onSelectCollege,
  lang,
  onOpenAi,
}) => {
  return (
    <div className="space-y-4 pb-12">
      
      {/* Sponsored Partner Spotlight (Monetization component) */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border border-emerald-800/40 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
            BUC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/20 px-1.5 py-0.2 rounded">
                {lang === 'ar' ? 'جامعة شريكة معتمدة' : 'Sponsored Partner'}
              </span>
              <span className="text-xs font-bold text-white truncate">
                {lang === 'ar' ? 'جامعة بدر بالقاهرة (BUC)' : 'Badr University Cairo'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
              {lang === 'ar' 
                ? 'فتح باب التقديم المباشر لكليات الهندسة والصيدلة والذكاء الاصطناعي بحد أدنى 66%' 
                : 'Direct admission open with 66% minimum cutoff'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="https://buc.edu.eg"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors flex items-center gap-1"
            title={lang === 'ar' ? 'زيارة موقع جامعة بدر بالقاهرة الرسمي' : 'Badr University Cairo Official Website'}
          >
            <ExternalLink className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'موقع الجامعة' : 'Website'}</span>
          </a>
          <button
            onClick={() => {
              const buc = MOCK_COLLEGES.find(c => c.id === 'priv_buc_eng');
              if (buc) onSelectCollege(buc);
            }}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
          >
            {lang === 'ar' ? 'تفاصيل المنح' : 'Details'}
          </button>
        </div>
      </div>

      {/* Feature Announcement: Cumulative Score & Subject Grade Estimator */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between gap-2 shadow-sm text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-white">
            {lang === 'ar' ? 'حاسبة المجموع التراكمي للمواد' : 'Cumulative GPA Subject Calculator'}
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.2 rounded font-semibold">
            {lang === 'ar' ? '320 و 410 و 700' : '320 & 410'}
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          {lang === 'ar' ? 'متاحة بالتبويب أدناه ⬇' : 'Available below ⬇'}
        </span>
      </div>

      {/* The Reusable AdmissionCalculator Component */}
      <AdmissionCalculator
        onSelectCollege={onSelectCollege}
        initialTrack="thanaweya_science"
        initialPercentage={88.5}
        initialGovernorate="القاهرة"
        lang={lang}
      />

      {/* Collapsible FAQ Accordion Section */}
      <div className="pt-4 border-t border-slate-800/80">
        <FaqAccordion 
          lang={lang} 
          onOpenAi={onOpenAi} 
          defaultCollapsed={false}
        />
      </div>

    </div>
  );
};
