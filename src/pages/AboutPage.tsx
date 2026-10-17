import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../data/translations';
import {
  Droplet,
  AlertTriangle,
  Users,
  Database,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileCheck,
  Award,
  Mail,
  Info,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage, userSettings } = useAppStore();
  const isUrdu = userSettings.language === 'ur';
  const t = translations[userSettings.language] || translations.en;

  const handleOpenMap = () => {
    setActivePage('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMethodology = () => {
    setActivePage('methodology');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`w-full min-h-screen bg-transparent text-white selection:bg-[#00D4C8]/30 selection:text-[#00D4C8] py-8 sm:py-14 px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-10 relative overflow-hidden bg-grid-vertical ${
        isUrdu ? 'rtl text-right' : 'ltr text-left'
      }`}
    >
      
      {/* Header Container */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        {/* Page Title */}
        <h1 className={`text-4xl sm:text-5xl font-display font-extrabold text-white ${isUrdu ? 'leading-[1.7] py-2' : 'tracking-tight'}`}>
          {isUrdu ? 'زیرآب کے بارے میں' : 'About Zeraab'}
        </h1>
        <p className={`max-w-xl mx-auto ${isUrdu ? 'text-sm text-white/80 leading-[2.2]' : 'text-xs sm:text-sm text-white/60'}`}>
          {isUrdu
            ? 'ایک خودمختار سائنسی تحقیقی منصوبہ جو سندھ کی عوام کے لیے تین جہتی زیرِ زمین پانی کی معلومات اور آرسینک کی درست پیش گوئی فراہم کرتا ہے۔'
            : 'An independent research initiative bringing 3D hydrogeological intelligence and exact arsenic modeling to the communities of Sindh.'}
        </p>
      </div>

      {/* Main Content Column */}
      <div className={`max-w-3xl mx-auto space-y-7 ${isUrdu ? 'text-right' : 'text-left'}`}>
        
        {/* 1. Author & Institutional Attribution Card */}
        <div className="p-7 rounded-2xl bg-gradient-to-br from-[#06101E]/95 to-[#081e33]/90 border border-[#00D4C8]/25 backdrop-blur-md space-y-4 shadow-xl hover-card-lift">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-full bg-[#00D4C8]/15 border border-[#00D4C8]/30 flex items-center justify-center text-[#00D4C8]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  {isUrdu ? 'مصنف اور پس منظر' : 'Author & Origin'}
                </h2>
                <span className="text-[11px] text-[#00D4C8] font-medium">
                  {isUrdu ? 'خودمختار ہائیڈروجیولوجیکل ریسرچ' : 'Independent Hydrogeological Research'}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] bg-white/[0.06] border border-white/10 text-white/80 font-semibold">
              {isUrdu ? 'ورژن ۱.۰ (اگست ۲۰۲۶)' : 'Version 1.0 (August 2026)'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs text-white/80 leading-relaxed">
            <p>
              <strong>{isUrdu ? 'پرنسپل محقق:' : 'Principal Investigator:'}</strong> Muhammad Adeel Arshad
            </p>
            <p className="flex items-center gap-1.5 flex-wrap">
              <strong>{isUrdu ? 'ای میل / رابطہ:' : 'Email / Contact:'}</strong>{' '}
              <a
                href="mailto:m.adeelarshad008@gmail.com"
                className="text-[#00D4C8] hover:underline inline-flex items-center gap-1 transition-colors ltr"
                dir="ltr"
              >
                <Mail className="w-3.5 h-3.5 inline" />
                <span>m.adeelarshad008@gmail.com</span>
              </a>
            </p>
            <p className="text-white/60 text-[11.5px] pt-1 border-t border-white/[0.06]">
              {isUrdu
                ? 'میرپور ماتھیلو سے تیار کردہ — جو شمالی سندھ میں زیرِ زمین سنکھیا کی شدید آلودگی کا مرکز ہے — تاکہ اندازوں کے بجائے جدید سائنسی بنیادوں پر محفوظ گہرائی کا تعین کیا جا سکے۔'
                : 'Developed from Mirpur Mathelo — an epicenter of severe groundwater arsenic contamination in northern Sindh — to replace subjective guesses with continuous, science-backed drilling depth predictions.'}
            </p>
          </div>
        </div>

        {/* 2. The Personal Catalyst & The Crisis in Sindh */}
        <div className="p-7 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-4 shadow-xl hover-card-lift">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              {isUrdu ? 'سندھ میں زیرِ زمین پانی کا بحران' : 'The Groundwater Crisis in Sindh'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            {isUrdu ? (
              <>
                سندھ بھر میں لاکھوں خاندان بغیر کسی کیمیائی جانچ کے ہینڈ پمپس اور ٹیوب ویلز سے زیرِ زمین پانی پینے پر مجبور ہیں۔ اگرچہ عالمی ادارہ صحت (WHO) کی زیادہ سے زیادہ محفوظ حد <strong>10 µg/L</strong> ہے، لیکن سندھ کے کئی علاقوں میں یہ مقدار <strong>100، 500 اور 900 µg/L سے بھی تجاوز کر جاتی ہے</strong> — جس کے نتیجے میں جلدی امراض، دل کے عارضے اور کینسر جیسی مہلک بیماریاں جنم لیتی ہیں۔
              </>
            ) : (
              <>
                Millions of families across Sindh drink groundwater from hand pumps and shallow tube wells with no awareness of their chemical safety. While the World Health Organization (WHO) maximum limit is <strong>10 µg/L</strong>, concentrations in Sindh routinely reach <strong>100, 500, to over 900 µg/L</strong> — causing arsenicosis, skin lesions, cardiovascular illness, and internal cancers upon prolonged exposure.
              </>
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 hover-card-lift">
              <span className="font-bold text-white text-[11px] block">
                {isUrdu ? 'سطحی پانی کی آلودگی' : 'Shallow Contamination'}
              </span>
              <p className="text-white/50 text-[11px] leading-relaxed">
                {isUrdu
                  ? 'سطحی ہولوسین الیویل تہیں (۲۰ تا ۶۰ میٹر) زیادہ لوہے اور الکلائن پی ایچ (7.5–8.0) کی حامل ہیں، جو پینے کے پانی میں آرسینک کے تیزی سے اخراج کا سبب بنتی ہیں۔'
                  : 'Shallow Holocene alluvial aquifers (20–60m) exhibit high iron and alkaline pH (7.5–8.0), triggering rapid desorption of arsenic into drinking water.'}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 hover-card-lift">
              <span className="font-bold text-emerald-400 text-[11px] block">
                {isUrdu ? 'گہرے محفوظ پانی کا حل' : 'The Deep Aquifer Solution'}
              </span>
              <p className="text-white/50 text-[11px] leading-relaxed">
                {isUrdu
                  ? 'قدیم گہری پلیسٹوسین تہیں (۱۵۰ تا ۲۰۰ میٹر) سطحی آلودگی سے محفوظ ہیں اور ان میں سنکھیا کی مقدار انتہائی کم ہے (سندھ بھر میں ۹۷.۰٪ محفوظ)، جو ہدف بنا کر ڈرلنگ کرنے پر محفوظ پینے کا پانی مہیا کرتی ہیں۔'
                  : 'Deep Pleistocene aquifers (150–200m) are isolated from shallow recharge and maintain low arsenic (97.0% safe across Sindh), offering life-saving potable water when properly targeted.'}
              </p>
            </div>
          </div>
        </div>

        {/* 3. The 5 Core Principles of Zeraab v3 */}
        <div className="p-7 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-4 shadow-xl hover-card-lift">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-6 h-6 rounded-full bg-[#00D4C8]/10 flex items-center justify-center text-[#00D4C8]">
              <Compass className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              {isUrdu ? 'پانچ بنیادی سائنسی اصول (زیرآب)' : '5 Foundational Principles (Zeraab v3)'}
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover-card-lift">
              <span className="w-5 h-5 rounded-md bg-[#00D4C8]/10 text-[#00D4C8] flex items-center justify-center shrink-0 font-bold text-[10px]">1</span>
              <div>
                <strong className="text-white block">
                  {isUrdu ? 'درست عددی تخمینہ، نہ کہ صرف ہاں یا نہ' : 'Exact Continuous Numbers, Not Binary Labels'}
                </strong>
                <span className="text-white/60 text-[11px]">
                  {isUrdu
                    ? 'ماڈل لاگ ٹرانسفارم شدہ درست عددی قیمت (µg/L) پیش کرتا ہے تاکہ بورنگ کرنے والوں اور عوام کو معلوم ہو سکے کہ پانی ۱۵ مائیکروگرام ہے یا ۹۰۰ مائیکروگرام۔'
                    : 'The model predicts continuous log-transformed arsenic back-transformed to exact µg/L so drillers and families know whether water is 15 µg/L or 900 µg/L.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover-card-lift">
              <span className="w-5 h-5 rounded-md bg-[#00D4C8]/10 text-[#00D4C8] flex items-center justify-center shrink-0 font-bold text-[10px]">2</span>
              <div>
                <strong className="text-white block">
                  {isUrdu ? 'تین جہتی گہرائی کے مطابق پیش گوئی' : '3D Depth-Specific Predictions'}
                </strong>
                <span className="text-white/60 text-[11px]">
                  {isUrdu
                    ? 'ہر پیش گوئی بورنگ کی گہرائی (۳۰، ۶۰، ۱۰۰، ۱۵۰، ۲۰۰ میٹر، اور کسٹم ۱۰ تا ۳۰۰ میٹر) کے مطابق الگ کی گئی ہے تاکہ زہریلی سطحی تہہ کو محفوظ گہری تہہ سے الگ کیا جا سکے۔'
                    : 'Every prediction is parameterized by borehole depth (30m, 60m, 100m, 150m, 200m, and custom 10–300m) to accurately separate shallow toxic zones from safe deep aquifers.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover-card-lift">
              <span className="w-5 h-5 rounded-md bg-[#00D4C8]/10 text-[#00D4C8] flex items-center justify-center shrink-0 font-bold text-[10px]">3</span>
              <div>
                <strong className="text-white block">
                  {isUrdu ? '۲۵۰ میٹر باریک ترین گرڈ ریزولوشن' : '250m High Spatial Resolution'}
                </strong>
                <span className="text-white/60 text-[11px]">
                  {isUrdu
                    ? 'سندھ کے تمام ۱،۴۱،۰۰۰ مربع کلومیٹر کو ۲۵۰ میٹر فی سیل (۴۳.۶ لاکھ گرڈ نوڈز) پر کور کرتا ہے، جسے فوری استفسار کے ڈیٹا بیس کی پشت پناہی حاصل ہے۔'
                    : 'Covers all 141,000 km² of Sindh Province at 250m per cell (4.36 million grid nodes), backed by an instant 220,941-node deployed query database.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover-card-lift">
              <span className="w-5 h-5 rounded-md bg-[#00D4C8]/10 text-[#00D4C8] flex items-center justify-center shrink-0 font-bold text-[10px]">4</span>
              <div>
                <strong className="text-white block">
                  {isUrdu ? 'ہمیشہ کے لیے مفت اور عام رسائی' : '100% Free Public Utility Forever'}
                </strong>
                <span className="text-white/60 text-[11px]">
                  {isUrdu
                    ? 'کوئی سبسکرپشن یا فیس نہیں۔ کشمور کے کسان سے لے کر کراچی کے طالب علم تک، ہر ایک کے لیے بلا معاوضہ دستیاب ہے۔'
                    : 'No paywalls, subscriptions, or token access. A farmer in Kashmore and a university student in Karachi have equal, open access to critical water safety data.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover-card-lift">
              <span className="w-5 h-5 rounded-md bg-[#00D4C8]/10 text-[#00D4C8] flex items-center justify-center shrink-0 font-bold text-[10px]">5</span>
              <div>
                <strong className="text-white block">
                  {isUrdu ? 'اعلیٰ سائنسی اور تحقیقی معیار' : 'Research-Grade Scientific Rigor'}
                </strong>
                <span className="text-white/60 text-[11px]">
                  {isUrdu
                    ? 'مکمل SHA-256 ڈیٹا سیٹ تصدیق، ماڈل کراس ویلیڈیشن (R² = 0.9463)، اور عالمی تحقیقی معیارات کے مطابق تصدیق شدہ۔'
                    : 'Full SHA-256 dataset provenance, Leave-One-Out Cross Validation (R² = 0.9463), SHAP explainability, and full alignment with academic standards.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Key Data Foundations Card */}
        <div className="p-7 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-4 shadow-xl hover-card-lift">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-6 h-6 rounded-full bg-[#00D4C8]/10 flex items-center justify-center text-[#00D4C8]">
              <Database className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              {isUrdu ? 'ڈیٹا کے ذرائع اور سائنسی بنیاد' : 'Data Provenance & Sources'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            {isUrdu
              ? 'سندھ کے ۱۲ سے زائد اضلاع میں تصدیق شدہ کنوؤں کی سپیکٹومیٹری لیبارٹری ڈیٹا اور گوگل ارتھ انجن کے ۱۲۵ سیٹلائٹ ماحولیاتی متغیرات (سینٹینل، ایس آر ٹی ایم، لینڈسیٹ، سوائل گرڈز، میرٹ ہائیڈرو) پر مبنی۔'
              : 'Calibrated on verified Sindh well spectrometry across 12+ districts (Qadirpur 2025, Khattak et al. 2022, Van Geen et al. 2017, PCRWR reports) joined with 125 satellite remote sensing covariates extracted via Google Earth Engine (Sentinel-1/2, SRTM, Landsat 8/9, SoilGrids 2.0, MERIT Hydro).'}
          </p>
          <div>
            <button
              onClick={handleOpenMethodology}
              className="text-xs font-bold text-[#00D4C8] hover:underline flex items-center gap-1.5 transition-colors"
            >
              <span>{isUrdu ? 'ماڈل کی مساوات اور سائنسی طریقہ کار دیکھیں' : 'Explore Model Equations & SHAP Breakdown'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isUrdu ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Model Testing vs Field Testing Note */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md flex items-start gap-3 text-xs text-white/60">
          <Info className="w-4 h-4 text-[#00D4C8] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-white/90 block">
              {isUrdu ? 'وضاحتی نوٹ برائے ماڈل درستگی اور ڈیٹا:' : 'Technical Notice on Model Validation:'}
            </span>
            <p className="text-[11px] leading-relaxed">
              {isUrdu
                ? 'پلیٹ فارم پر درج تمام درستگی میٹرکس (بشمول R² = 0.9463) سائنسی ماڈل ٹیسٹنگ اور مشین لرننگ کراس ویلیڈیشن سے اخذ کیے گئے ہیں، نہ کہ ہر مقام پر براہِ راست فیلڈ ٹیسٹنگ کے ذریعے۔ پانی کی تنصیب سے قبل فزیکل لیبارٹری ٹیسٹ تجویز کیا جاتا ہے۔'
                : 'All performance benchmarks and accuracy metrics (including R² = 0.9463) are attained strictly through predictive computational model testing and cross-validation, not direct empirical on-field testing. In-situ physical water testing is strongly advised before commissioning new boreholes.'}
            </p>
          </div>
        </div>

        {/* Centered CTA Button */}
        <div className="pt-6 flex justify-center">
          <button
            onClick={handleOpenMap}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D4C8] to-[#1599E1] hover:from-[#20e2d7] hover:to-[#2cb0fb] text-[#020B18] font-bold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(0,212,200,0.35)] hover:shadow-[0_0_35px_rgba(0,212,200,0.5)] transition-all transform active:scale-95"
          >
            <span>{isUrdu ? 'خطرے کا نقشہ کھولیں' : 'Open Risk Map'}</span>
            <ArrowRight className={`w-4 h-4 ${isUrdu ? 'rotate-180 mr-1' : 'ml-1'}`} />
          </button>
        </div>

      </div>

    </div>
  );
};
