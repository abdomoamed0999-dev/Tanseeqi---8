import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Sliders, 
  TrendingUp,
  Percent,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { College, EducationStream } from '../../types/tanseeqi';
import { MOCK_COLLEGES } from '../../data/mockTansikData';

export interface SubjectItem {
  id: string;
  nameAr: string;
  nameEn: string;
  maxScore: number;
  expectedScore: number;
}

export type GradingSystem = 'new_320' | 'classic_410' | 'diploma_700';

interface SubjectTemplate {
  nameAr: string;
  nameEn: string;
  maxScore: number;
  defaultExpected: number;
}

const SUBJECT_TEMPLATES: Record<GradingSystem, Record<'thanaweya_science' | 'thanaweya_math' | 'thanaweya_arts' | 'diploma', SubjectTemplate[]>> = {
  // New Egyptian Thanaweya Amma System (Total 320 marks - 2024/2025/2026 restructured tracks)
  new_320: {
    thanaweya_science: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic Language', maxScore: 80, defaultExpected: 72 },
      { nameAr: 'اللغة الأجنبية الأولى (الإنجليزية)', nameEn: 'First Foreign Language (English)', maxScore: 60, defaultExpected: 54 },
      { nameAr: 'الأحياء', nameEn: 'Biology', maxScore: 60, defaultExpected: 55 },
      { nameAr: 'الكيمياء', nameEn: 'Chemistry', maxScore: 60, defaultExpected: 52 },
      { nameAr: 'الفيزياء', nameEn: 'Physics', maxScore: 60, defaultExpected: 51 },
    ],
    thanaweya_math: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic Language', maxScore: 80, defaultExpected: 70 },
      { nameAr: 'اللغة الأجنبية الأولى (الإنجليزية)', nameEn: 'First Foreign Language (English)', maxScore: 60, defaultExpected: 53 },
      { nameAr: 'الرياضيات البحتة والتطبيقية', nameEn: 'Pure & Applied Mathematics', maxScore: 60, defaultExpected: 54 },
      { nameAr: 'الكيمياء', nameEn: 'Chemistry', maxScore: 60, defaultExpected: 52 },
      { nameAr: 'الفيزياء', nameEn: 'Physics', maxScore: 60, defaultExpected: 50 },
    ],
    thanaweya_arts: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic Language', maxScore: 80, defaultExpected: 70 },
      { nameAr: 'اللغة الأجنبية الأولى (الإنجليزية)', nameEn: 'First Foreign Language (English)', maxScore: 60, defaultExpected: 52 },
      { nameAr: 'التاريخ', nameEn: 'History', maxScore: 60, defaultExpected: 53 },
      { nameAr: 'الجغرافيا', nameEn: 'Geography', maxScore: 60, defaultExpected: 54 },
      { nameAr: 'الإحصاء', nameEn: 'Statistics', maxScore: 60, defaultExpected: 48 },
    ],
    diploma: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic', maxScore: 100, defaultExpected: 85 },
      { nameAr: 'اللغة الإنجليزية', nameEn: 'English', maxScore: 100, defaultExpected: 80 },
      { nameAr: 'الرياضيات التطبيقية', nameEn: 'Applied Math', maxScore: 100, defaultExpected: 82 },
      { nameAr: 'الرسم الهندسي أو العملي', nameEn: 'Drafting / Practical', maxScore: 100, defaultExpected: 88 },
      { nameAr: 'تكنولوجيا التخصص 1', nameEn: 'Specialty Tech 1', maxScore: 150, defaultExpected: 130 },
      { nameAr: 'تكنولوجيا التخصص 2', nameEn: 'Specialty Tech 2', maxScore: 150, defaultExpected: 135 },
    ]
  },
  // Classic Egyptian Thanaweya System (Total 410 marks)
  classic_410: {
    thanaweya_science: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic Language', maxScore: 80, defaultExpected: 72 },
      { nameAr: 'اللغة الأجنبية الأولى', nameEn: 'First Foreign Language', maxScore: 50, defaultExpected: 45 },
      { nameAr: 'اللغة الأجنبية الثانية', nameEn: 'Second Foreign Language', maxScore: 40, defaultExpected: 38 },
      { nameAr: 'الأحياء', nameEn: 'Biology', maxScore: 60, defaultExpected: 55 },
      { nameAr: 'الجيولوجيا والعلوم البيئية', nameEn: 'Geology & Environmental', maxScore: 60, defaultExpected: 56 },
      { nameAr: 'الفيزياء', nameEn: 'Physics', maxScore: 60, defaultExpected: 51 },
      { nameAr: 'الكيمياء', nameEn: 'Chemistry', maxScore: 60, defaultExpected: 52 },
    ],
    thanaweya_math: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic Language', maxScore: 80, defaultExpected: 70 },
      { nameAr: 'اللغة الأجنبية الأولى', nameEn: 'First Foreign Language', maxScore: 50, defaultExpected: 44 },
      { nameAr: 'اللغة الأجنبية الثانية', nameEn: 'Second Foreign Language', maxScore: 40, defaultExpected: 37 },
      { nameAr: 'الرياضيات البحتة', nameEn: 'Pure Mathematics', maxScore: 60, defaultExpected: 53 },
      { nameAr: 'الرياضيات التطبيقية', nameEn: 'Applied Mathematics', maxScore: 60, defaultExpected: 52 },
      { nameAr: 'الفيزياء', nameEn: 'Physics', maxScore: 60, defaultExpected: 50 },
      { nameAr: 'الكيمياء', nameEn: 'Chemistry', maxScore: 60, defaultExpected: 51 },
    ],
    thanaweya_arts: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic Language', maxScore: 80, defaultExpected: 68 },
      { nameAr: 'اللغة الأجنبية الأولى', nameEn: 'First Foreign Language', maxScore: 50, defaultExpected: 43 },
      { nameAr: 'اللغة الأجنبية الثانية', nameEn: 'Second Foreign Language', maxScore: 40, defaultExpected: 36 },
      { nameAr: 'التاريخ', nameEn: 'History', maxScore: 60, defaultExpected: 52 },
      { nameAr: 'الجغرافيا', nameEn: 'Geography', maxScore: 60, defaultExpected: 54 },
      { nameAr: 'الفلسفة والمنطق', nameEn: 'Philosophy & Logic', maxScore: 60, defaultExpected: 55 },
      { nameAr: 'علم النفس والاجتماع', nameEn: 'Psychology & Sociology', maxScore: 60, defaultExpected: 53 },
    ],
    diploma: [
      { nameAr: 'المواد النظرية العامة', nameEn: 'General Theory', maxScore: 200, defaultExpected: 170 },
      { nameAr: 'المواد الفنية والعملية', nameEn: 'Technical & Practical', maxScore: 210, defaultExpected: 185 },
    ]
  },
  // Technical Diploma System (Total 700 marks)
  diploma_700: {
    thanaweya_science: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic', maxScore: 80, defaultExpected: 70 },
      { nameAr: 'اللغة الأجنبية', nameEn: 'Foreign Language', maxScore: 60, defaultExpected: 50 },
      { nameAr: 'العلوم الأساسية', nameEn: 'Basic Sciences', maxScore: 180, defaultExpected: 155 },
    ],
    thanaweya_math: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic', maxScore: 80, defaultExpected: 70 },
      { nameAr: 'اللغة الأجنبية', nameEn: 'Foreign Language', maxScore: 60, defaultExpected: 50 },
      { nameAr: 'الرياضيات والعلوم', nameEn: 'Math & Science', maxScore: 180, defaultExpected: 155 },
    ],
    thanaweya_arts: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic', maxScore: 80, defaultExpected: 70 },
      { nameAr: 'اللغة الأجنبية', nameEn: 'Foreign Language', maxScore: 60, defaultExpected: 50 },
      { nameAr: 'المواد الأدبية', nameEn: 'Humanities', maxScore: 180, defaultExpected: 155 },
    ],
    diploma: [
      { nameAr: 'اللغة العربية', nameEn: 'Arabic Language', maxScore: 100, defaultExpected: 88 },
      { nameAr: 'اللغة الأجنبية الأولى', nameEn: 'English Language', maxScore: 100, defaultExpected: 82 },
      { nameAr: 'الرياضيات التطبيقية', nameEn: 'Applied Math', maxScore: 100, defaultExpected: 85 },
      { nameAr: 'الفيزياء / الكيمياء العامة', nameEn: 'Physics / Chemistry', maxScore: 100, defaultExpected: 80 },
      { nameAr: 'الرسم الهندسي والورش', nameEn: 'Workshops & Drafting', maxScore: 150, defaultExpected: 135 },
      { nameAr: 'تكنولوجيا التخصص والمعدات', nameEn: 'Specialty & Equipment', maxScore: 150, defaultExpected: 138 },
    ]
  }
};

interface CumulativeGpaEstimatorProps {
  lang: 'ar' | 'en';
  onSelectCollege: (college: College) => void;
  onApplyPercentageToMainCalculator?: (percentage: number, track: EducationStream) => void;
}

export const CumulativeGpaEstimator: React.FC<CumulativeGpaEstimatorProps> = ({
  lang,
  onSelectCollege,
  onApplyPercentageToMainCalculator
}) => {
  const [system, setSystem] = useState<GradingSystem>('new_320');
  const [stream, setStream] = useState<'thanaweya_science' | 'thanaweya_math' | 'thanaweya_arts' | 'diploma'>('thanaweya_science');
  
  // Custom subject grades
  const [subjectGrades, setSubjectGrades] = useState<Record<string, number>>(() => {
    const defaultTemplates = SUBJECT_TEMPLATES['new_320']['thanaweya_science'];
    const initial: Record<string, number> = {};
    defaultTemplates.forEach((t, i) => {
      initial[`sub_${i}`] = t.defaultExpected;
    });
    return initial;
  });

  // When changing system or stream, load default templates
  const handleSystemOrStreamChange = (newSys: GradingSystem, newStr: typeof stream) => {
    setSystem(newSys);
    setStream(newStr);
    const templates = SUBJECT_TEMPLATES[newSys][newStr];
    const newGrades: Record<string, number> = {};
    templates.forEach((t, i) => {
      newGrades[`sub_${i}`] = t.defaultExpected;
    });
    setSubjectGrades(newGrades);
  };

  const currentTemplates = useMemo(() => {
    return SUBJECT_TEMPLATES[system][stream];
  }, [system, stream]);

  // Update single subject grade
  const handleGradeChange = (subKey: string, val: number, maxScore: number) => {
    const safeVal = Math.max(0, Math.min(maxScore, isNaN(val) ? 0 : val));
    setSubjectGrades(prev => ({
      ...prev,
      [subKey]: safeVal
    }));
  };

  // Quick adjust all grades by a factor (e.g. +5% or 95% target)
  const handleSetTargetPercentage = (targetPct: number) => {
    const updated: Record<string, number> = {};
    currentTemplates.forEach((tpl, i) => {
      const key = `sub_${i}`;
      const score = Math.round((tpl.maxScore * targetPct) / 100 * 2) / 2; // half-mark precision
      updated[key] = Math.min(tpl.maxScore, score);
    });
    setSubjectGrades(updated);
  };

  // Calculations
  const { totalScore, maxTotal, percentage } = useMemo(() => {
    let currentTotal = 0;
    let max = 0;
    currentTemplates.forEach((tpl, i) => {
      const key = `sub_${i}`;
      const score = subjectGrades[key] !== undefined ? subjectGrades[key] : tpl.defaultExpected;
      currentTotal += score;
      max += tpl.maxScore;
    });
    const pct = max > 0 ? (currentTotal / max) * 100 : 0;
    return {
      totalScore: currentTotal,
      maxTotal: max,
      percentage: Number(pct.toFixed(2))
    };
  }, [currentTemplates, subjectGrades]);

  // Map to EducationStream
  const matchedTrack: EducationStream = useMemo(() => {
    if (stream === 'thanaweya_science') return 'thanaweya_science';
    if (stream === 'thanaweya_math') return 'thanaweya_math';
    if (stream === 'thanaweya_arts') return 'thanaweya_arts';
    return 'diploma_industrial_3y';
  }, [stream]);

  // Eligible Colleges matching student's estimated percentage
  const matchingColleges = useMemo(() => {
    return MOCK_COLLEGES
      .filter((c: College) => c.supportedStreams.includes(matchedTrack))
      .map((c: College) => {
        const margin = percentage - c.cutoffPercentage;
        let tier: 'guaranteed' | 'likely' | 'aspirational' | 'far' = 'far';
        if (margin >= 1.5) tier = 'guaranteed';
        else if (margin >= -1.5) tier = 'likely';
        else if (margin >= -5.0) tier = 'aspirational';
        return {
          ...c,
          margin,
          tier
        };
      })
      .sort((a, b) => b.cutoffPercentage - a.cutoffPercentage);
  }, [matchedTrack, percentage]);

  const guaranteedColleges = matchingColleges.filter((c) => c.tier === 'guaranteed');
  const likelyColleges = matchingColleges.filter((c) => c.tier === 'likely');
  const aspirationalColleges = matchingColleges.filter((c) => c.tier === 'aspirational');

  // Reset to default
  const handleResetToDefault = () => {
    const newGrades: Record<string, number> = {};
    currentTemplates.forEach((t, i) => {
      newGrades[`sub_${i}`] = t.defaultExpected;
    });
    setSubjectGrades(newGrades);
  };

  return (
    <div className="space-y-4 rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-emerald-500/20">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
              <span>{lang === 'ar' ? 'حاسبة المجموع التراكمي المتوقع' : 'Cumulative GPA & Score Estimator'}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                {lang === 'ar' ? 'جديد 2026' : '2026'}
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              {lang === 'ar' 
                ? 'أدخل درجاتك التقديرية لكل مادة لمعرفة مجموعك التراكمي والكليات المتاحة لك فوراً'
                : 'Enter your anticipated subject grades to estimate cumulative score & eligible faculties'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetToDefault}
          className="p-1.5 text-xs text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
          title={lang === 'ar' ? 'إعادة تعيين الدرجات' : 'Reset grades'}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === 'ar' ? 'تصفير' : 'Reset'}</span>
        </button>
      </div>

      {/* System Selection (320 New vs 410 Classic vs Diplomas 700) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'ar' ? 'نظام احتساب الثانوية:' : 'Grading System:'}</span>
          </label>
          <span className="text-[10px] text-slate-400 font-mono">
            {lang === 'ar' ? `المجموع الكلي: ${maxTotal} درجة` : `Total Marks: ${maxTotal}`}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => handleSystemOrStreamChange('new_320', stream === 'diploma' ? 'thanaweya_science' : stream)}
            className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all border ${
              system === 'new_320'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-sm shadow-emerald-500/20'
                : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="truncate">{lang === 'ar' ? 'النظام الجديد (320)' : 'New System (320)'}</div>
            <div className="text-[9px] opacity-80 font-normal">{lang === 'ar' ? 'دفعة 2025/2026' : '2025/2026 Cohort'}</div>
          </button>

          <button
            type="button"
            onClick={() => handleSystemOrStreamChange('classic_410', stream === 'diploma' ? 'thanaweya_science' : stream)}
            className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all border ${
              system === 'classic_410'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-sm shadow-emerald-500/20'
                : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="truncate">{lang === 'ar' ? 'النظام القديم (410)' : 'Classic (410)'}</div>
            <div className="text-[9px] opacity-80 font-normal">{lang === 'ar' ? 'المجموع التقليدي' : 'Traditional'}</div>
          </button>

          <button
            type="button"
            onClick={() => handleSystemOrStreamChange('diploma_700', 'diploma')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all border ${
              system === 'diploma_700'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-sm shadow-emerald-500/20'
                : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="truncate">{lang === 'ar' ? 'الدبلومات الفنية (700)' : 'Diplomas (700)'}</div>
            <div className="text-[9px] opacity-80 font-normal">{lang === 'ar' ? 'صناعي وتجاري' : 'Tech Diplomas'}</div>
          </button>
        </div>
      </div>

      {/* Stream Tabs (علمي علوم / علمي رياضة / أدبي) */}
      {system !== 'diploma_700' ? (
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'ar' ? 'الشعبة / المسار:' : 'Secondary Track:'}</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleSystemOrStreamChange(system, 'thanaweya_science')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors border ${
                stream === 'thanaweya_science'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {lang === 'ar' ? 'علمي علوم' : 'Science'}
            </button>
            <button
              type="button"
              onClick={() => handleSystemOrStreamChange(system, 'thanaweya_math')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors border ${
                stream === 'thanaweya_math'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {lang === 'ar' ? 'علمي رياضة' : 'Math'}
            </button>
            <button
              type="button"
              onClick={() => handleSystemOrStreamChange(system, 'thanaweya_arts')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors border ${
                stream === 'thanaweya_arts'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {lang === 'ar' ? 'أدبي' : 'Literature'}
            </button>
          </div>
        </div>
      ) : null}

      {/* Target Percentage Quick-Preset Bar */}
      <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none text-xs">
        <span className="text-[11px] text-slate-400 shrink-0 font-medium">
          {lang === 'ar' ? 'تطبيق سيناريو تقديري:' : 'Apply Scenario:'}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {[95, 90, 85, 80, 75, 65].map(preset => (
            <button
              key={preset}
              type="button"
              onClick={() => handleSetTargetPercentage(preset)}
              className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-slate-800 text-[11px] font-mono transition-colors"
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Subjects List with interactive Score Inputs & Sliders */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between text-xs text-slate-400 px-0.5">
          <span>{lang === 'ar' ? 'المادة ونهايتها العظمى' : 'Subject & Max Score'}</span>
          <span>{lang === 'ar' ? 'الدرجة المتوقعة' : 'Expected Grade'}</span>
        </div>

        <div className="space-y-2 max-h-[380px] md:max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
          {currentTemplates.map((sub, idx) => {
            const subKey = `sub_${idx}`;
            const currentVal = subjectGrades[subKey] !== undefined ? subjectGrades[subKey] : sub.defaultExpected;
            const subPercent = sub.maxScore > 0 ? ((currentVal / sub.maxScore) * 100).toFixed(0) : '0';

            return (
              <div
                key={subKey}
                className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-white block truncate">
                      {lang === 'ar' ? sub.nameAr : sub.nameEn}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {lang === 'ar' ? `النهاية العظمى: ${sub.maxScore}` : `Max: ${sub.maxScore}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="relative w-18 sm:w-20">
                      <input
                        type="number"
                        min="0"
                        max={sub.maxScore}
                        step="0.5"
                        value={currentVal}
                        onChange={(e) => handleGradeChange(subKey, parseFloat(e.target.value), sub.maxScore)}
                        className="w-full h-8 px-2 rounded-lg bg-slate-900 border border-slate-700/80 text-emerald-400 font-mono font-bold text-right text-xs focus:outline-none focus:border-emerald-500"
                      />
                      <span className="absolute left-1.5 top-2 text-[10px] text-slate-500 font-mono">
                        /{sub.maxScore}
                      </span>
                    </div>

                    <span className="w-8 sm:w-10 text-[11px] font-mono text-slate-400 text-left">
                      {subPercent}%
                    </span>
                  </div>
                </div>

                {/* Range Slider for ultra-smooth touch manipulation */}
                <div className="flex items-center gap-2 pt-0.5">
                  <input
                    type="range"
                    min="0"
                    max={sub.maxScore}
                    step="0.5"
                    value={currentVal}
                    onChange={(e) => handleGradeChange(subKey, parseFloat(e.target.value), sub.maxScore)}
                    className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Result Cumulative KPI Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              {lang === 'ar' ? 'النتيجة التراكمية المحسوبة' : 'Cumulative Score Result'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'ar' ? 'المجموع:' : 'Marks:'}
            </span>
            <span className="text-sm font-extrabold text-white font-mono">
              {totalScore} / {maxTotal}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight flex items-baseline gap-1">
              <span>{percentage.toFixed(2)}</span>
              <span className="text-lg text-emerald-300 font-bold">%</span>
            </div>
            <div className="text-[11px] text-slate-400">
              {lang === 'ar' 
                ? (percentage >= 90 ? 'مؤهل لكليات القمة الطبية والهندسية' : percentage >= 75 ? 'مؤهل لكليات الحاسبات والجامعات الأهلية' : 'مؤهل لكليات العلوم الإنسانية والتكنولوجية والمعاهد')
                : (percentage >= 90 ? 'Eligible for Top Tier Public Faculties' : percentage >= 75 ? 'Eligible for Computing & National Universities' : 'Eligible for Applied & Humanities Programs')}
            </div>
          </div>

          {/* Transfer button to main calculator */}
          {onApplyPercentageToMainCalculator && (
            <button
              type="button"
              onClick={() => onApplyPercentageToMainCalculator(percentage, matchedTrack)}
              className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <span>{lang === 'ar' ? 'تطبيق في الحاسبة' : 'Apply to Calculator'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          )}
        </div>

        {/* Breakdown bar */}
        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
          />
        </div>
      </div>

      {/* Faculty Threshold Quick Preview (الحدود الدنيا للكليات المتاحة) */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'ar' ? 'الحد الأدنى للكليات المتاحة لمجموعك:' : 'Faculties within your Cutoff:'}</span>
          </span>

          <span className="text-[11px] text-slate-400 font-mono">
            {guaranteedColleges.length + likelyColleges.length} {lang === 'ar' ? 'كلية محتملة ومؤكدة' : 'Colleges'}
          </span>
        </div>

        {/* Tier Summary Pills */}
        <div className="grid grid-cols-3 gap-1.5 text-center text-[11px]">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="block text-emerald-400 font-extrabold text-sm font-mono">
              {guaranteedColleges.length}
            </span>
            <span className="text-slate-400 text-[10px]">
              {lang === 'ar' ? 'مؤكد ومضمون' : 'Guaranteed'}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <span className="block text-sky-400 font-extrabold text-sm font-mono">
              {likelyColleges.length}
            </span>
            <span className="text-slate-400 text-[10px]">
              {lang === 'ar' ? 'محتمل ومتأرجح' : 'Likely'}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <span className="block text-purple-400 font-extrabold text-sm font-mono">
              {aspirationalColleges.length}
            </span>
            <span className="text-slate-400 text-[10px]">
              {lang === 'ar' ? 'طموح بفارق بسيط' : 'Aspirational'}
            </span>
          </div>
        </div>

        {/* College List with Direct Open */}
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
          {matchingColleges.slice(0, 8).map((college) => {
            const margin = percentage - college.cutoffPercentage;
            const isGuaranteed = margin >= 1.5;
            const isLikely = margin >= -1.5 && margin < 1.5;

            return (
              <div
                key={college.id}
                onClick={() => onSelectCollege(college)}
                className="p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                      {lang === 'ar' ? college.nameAr : college.nameEn}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate flex items-center gap-1.5">
                    <span>{lang === 'ar' ? college.universityNameAr : college.universityNameEn}</span>
                    <span>·</span>
                    <span>{college.governorate}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-extrabold font-mono text-white">
                    {college.cutoffPercentage.toFixed(2)}%
                  </div>
                  <div className="text-[10px] font-mono">
                    {isGuaranteed ? (
                      <span className="text-emerald-400">+{margin.toFixed(1)}% ({lang === 'ar' ? 'مضمون' : 'Safe'})</span>
                    ) : isLikely ? (
                      <span className="text-sky-400">{margin.toFixed(1)}% ({lang === 'ar' ? 'محتمل' : 'Close'})</span>
                    ) : (
                      <span className="text-purple-400">{margin.toFixed(1)}% ({lang === 'ar' ? 'طموح' : 'Asp'})</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
