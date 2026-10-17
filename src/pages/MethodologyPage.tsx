import React from 'react';
import { useAppStore } from '../store/useAppStore';
import {
  ArrowRight,
  Database,
  Shield,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Beaker,
  Gauge,
  Info,
} from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  const { setActivePage, userSettings } = useAppStore();
  const isUrdu = userSettings.language === 'ur';

  const handleOpenMap = () => {
    setActivePage('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Verified SHAP values from Stage 4 documentation (Part 4.7)
  const shapFeatures = [
    {
      name: isUrdu ? 'زیرِ زمین لوہا (iron_mg_l)' : 'Groundwater Iron (iron_mg_l)',
      shapImportance: 0.3841,
      note: isUrdu ? 'سب سے مضبوط عنصر — آئرن آکسی ہائیڈروکسائیڈ کو-پریسیپیٹیشن (r = +0.927)' : 'Strongest predictor — iron oxyhydroxide co-precipitation (r = +0.927)'
    },
    {
      name: isUrdu ? 'پانی کی پی ایچ سطح (ph)' : 'Aquifer pH Level (ph)',
      shapImportance: 0.1138,
      note: isUrdu ? 'الکلائن پی ایچ (7.5–8.0) جو سندھ کی مٹی سے سنکھیا خارج کرتا ہے (r = +0.952)' : 'Alkaline pH (7.5–8.0) desorption driver in calcareous Indus soils (r = +0.952)'
    },
    {
      name: isUrdu ? 'مینگنیز کی مقدار (manganese_mg_l)' : 'Groundwater Manganese (manganese_mg_l)',
      shapImportance: 0.0351,
      note: isUrdu ? 'کیمیاوی ریڈوکس ماحول کی ثانوی علامت' : 'Secondary redox indicator in alluvial strata'
    },
    {
      name: isUrdu ? 'بورہول کی گہرائی (depth_used_m)' : 'Aquifer Borehole Depth (depth_used_m)',
      shapImportance: 0.0217,
      note: isUrdu ? 'ارضیاتی گہرائی جو سطحی آلودہ پانی کو گہرے محفوظ پانی سے الگ کرتی ہے' : 'Stratigraphic depth separating Holocene from safe Pleistocene'
    },
    {
      name: isUrdu ? 'مٹی میں ریت کا تناسب (soil_sand_0_5cm)' : 'Soil Sand Content 0–5cm (soil_sand_0_5cm)',
      shapImportance: 0.0193,
      note: isUrdu ? 'مٹی کی نفوذ پذیری اور پانی کے سرایت کرنے کی رفتار' : 'Permeability & rapid recharge leaching covariate'
    },
    {
      name: isUrdu ? 'سیٹلائٹ ماحولیاتی انڈیکسز' : 'Satellite Environmental Covariates',
      shapImportance: 0.0820,
      note: isUrdu ? 'سینٹینل-۲ این ڈی ڈبلیو آئی / ای وی آئی، ایس آر ٹی ایم بلندی، لینڈسیٹ درجہ حرارت' : 'Sentinel-2 NDWI/EVI, SRTM 30m elevation, Landsat LST, MERIT Hydro'
    },
  ];

  const ensembleModels = [
    {
      name: 'CatBoost Regressor',
      r2: '0.9254',
      weight: '0.321',
      desc: isUrdu ? 'ہائی ڈائمینشنل کیمیائی ڈیٹا کے لیے موزوں ترین گریڈینٹ بوسٹنگ ماڈل' : 'Robust gradient boosting optimized for small, high-dimensional chemical sets'
    },
    {
      name: 'XGBoost Regressor',
      r2: '0.9348',
      weight: '0.283',
      desc: isUrdu ? 'ہسٹوگرام بیسڈ ڈیسیژن ٹری الگورتھم جو پیچیدہ جغرافیائی اثرات کو ماڈل کرتا ہے' : 'Histogram-based gradient boosting with native missing-value tree routing'
    },
    {
      name: 'Random Forest',
      r2: '0.9077',
      weight: '0.266',
      desc: isUrdu ? 'بیگنگ اینسمبل جو ماڈل کی تغیر پذیری کو کم کر کے ساخت میں تنوع لاتا ہے' : 'Bagging ensemble providing variance reduction and structural diversity'
    },
    {
      name: 'LightGBM Regressor',
      r2: '0.9276',
      weight: '0.229',
      desc: isUrdu ? 'تیز رفتار لیف وائز اسپلٹنگ گریڈینٹ بوسٹڈ ٹریز' : 'Fast gradient boosted decision trees with leaf-wise splitting'
    },
  ];

  return (
    <div
      className={`w-full min-h-screen bg-transparent text-white selection:bg-[#00D4C8]/30 selection:text-[#00D4C8] py-8 sm:py-14 px-4 sm:px-8 lg:px-12 space-y-10 sm:space-y-12 relative overflow-hidden bg-grid-vertical ${
        isUrdu ? 'rtl text-right' : 'ltr text-left'
      }`}
    >
      
      {/* Header Container */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        {/* Page Title */}
        <h1 className={`text-4xl sm:text-5xl font-display font-extrabold text-white ${isUrdu ? 'leading-[1.7] py-2' : 'tracking-tight'}`}>
          {isUrdu ? 'سائنسی طریقہ کار اور ماڈلنگ' : 'Scientific Methodology'}
        </h1>
        <p className={`max-w-2xl mx-auto ${isUrdu ? 'text-sm text-white/80 leading-[2.2]' : 'text-xs sm:text-sm text-white/70 leading-relaxed'}`}>
          {isUrdu
            ? 'زیرآب گوگل ارتھ انجن کے ۱۲۵ سیٹلائٹ ماحولیاتی متغیرات اور تصدیق شدہ کیمیائی تجزیوں کو ملا کر سندھ کے تمام ۲۸ اضلاع میں تین جہتی آرسینک کے خطرے کا تخمینہ لگاتا ہے۔'
            : 'Zeraab couples 125 multi-spectral satellite remote sensing covariates from Google Earth Engine with verified groundwater spectrometry to predict continuous 3D arsenic risk across all 28 districts of Sindh.'}
        </p>
      </div>

      <div className={`max-w-4xl mx-auto space-y-8 ${isUrdu ? 'text-right' : 'text-left'}`}>
        
        {/* 1. Confirmed Performance Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-6 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-2 shadow-lg hover-card-lift">
            <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
              {isUrdu ? 'ماڈل کراس ویلیڈیشن' : 'Leave-One-Out CV'}
            </span>
            <div className="text-2xl font-bold text-[#00D4C8] tabular-nums">R² 0.9463</div>
            <p className="text-[11px] text-white/60">
              {isUrdu ? 'ریج اینسمبل ماڈل' : 'Ridge Meta-Model Ensemble'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-2 shadow-lg hover-card-lift">
            <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
              {isUrdu ? 'عالمی ادارہ صحت معیار' : 'WHO Standard (10 µg/L)'}
            </span>
            <div className="text-2xl font-bold text-emerald-400 tabular-nums">95.0%</div>
            <p className="text-[11px] text-white/60">
              {isUrdu ? '۳۸/۴۰ کنوئیں درست · AUC 0.9784' : '38/40 Wells Correct · AUC 0.9784'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-2 shadow-lg hover-card-lift">
            <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
              {isUrdu ? 'ماڈل کی اوسط غلطی (MAE)' : 'Model Error (MAE)'}
            </span>
            <div className="text-2xl font-bold text-[#1599E1] tabular-nums">60.1 µg/L</div>
            <p className="text-[11px] text-white/60">
              {isUrdu ? 'لاگ اسکیل ٹرانسفارم' : 'Log-Target Transform'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-2 shadow-lg hover-card-lift">
            <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
              {isUrdu ? 'خلائی ریزولوشن' : 'Spatial Resolution'}
            </span>
            <div className="text-2xl font-bold text-amber-400 tabular-nums">
              {isUrdu ? '۲۵۰ میٹر' : '250 meters'}
            </div>
            <p className="text-[11px] text-white/60">
              {isUrdu ? '۴۳.۶ لاکھ سیلز · ۲.۱۸ کروڑ تخمینے' : '4.36M Cells · 21.8M Preds'}
            </p>
          </div>
        </div>

        {/* Model Testing vs. On-Field Testing Methodological Clarification */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md flex items-start gap-3 shadow-md">
          <Info className="w-4 h-4 text-[#00D4C8] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-semibold text-white/90">
              {isUrdu ? 'تکنیکی تصریح برائے ماڈل درستگی اور ٹیسٹنگ:' : 'Methodological Note on Model vs. Field Testing:'}
            </h4>
            <p className="text-white/60 leading-relaxed text-[11px]">
              {isUrdu
                ? 'رپورٹ کردہ تمام کارکردگی میٹرکس، بشمول R² = 0.9463 اور ۹۵.۰٪ عالمی ادارہ صحت کی توثیق، سائنسی مشین لرننگ ماڈل ٹیسٹنگ (Leave-One-Out Cross Validation) کے ذریعے حاصل کیے گئے ہیں نہ کہ ہر مقام پر براہِ راست زمینی بورنگ یا فیلڈ ٹیسٹنگ کے ذریعے۔ زیرِ زمین پانی کے کنویں کی تنصیب اور استعمال سے قبل مقامی طور پر لیبارٹری کیمیائی ٹیسٹ لازماً کرائیں۔'
                : 'All reported performance metrics—including LOO-CV R² = 0.9463, AUC 0.9784, and 95.0% WHO standard accuracy—are attained strictly through computational model testing, algorithmic cross-validation, and laboratory-benchmarked retrospective evaluation, rather than comprehensive empirical on-field borehole testing. On-site chemical and physical testing is strongly recommended prior to well excavation and human consumption.'}
            </p>
          </div>
        </div>

        {/* 2. Geochemical Mechanism Comparison (Sindh vs Global/Bangladesh) */}
        <div className="p-7 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-5 shadow-xl hover-card-lift">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#00D4C8]/10 border border-[#00D4C8]/25 flex items-center justify-center text-[#00D4C8]">
              <Beaker className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {isUrdu ? 'ہائیڈرو کیمیکل پیش رفت: الکلائن ڈی سورپشن' : 'Hydrogeochemical Breakthrough: Alkaline Desorption'}
              </h2>
              <p className="text-xs text-white/50">
                {isUrdu
                  ? 'عالمی اور ٹرانسفر ماڈلز کیوں ناکام ہوئے (R² = 0.12) اور سندھ کے مخصوص ماڈل نے کیوں غیر معمولی کامیابی حاصل کی (R² = 0.9463)۔'
                  : 'Why global and transfer models failed (R² = 0.12) and why Sindh-specific calibration succeeded (R² = 0.9463).'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Sindh Profile */}
            <div className="p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/25 space-y-2 hover-card-lift">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                  {isUrdu ? 'سندھ، پاکستان (زیرآب ماڈل)' : 'Sindh, Pakistan (Zeraab Model)'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 font-bold">R² = 0.9463</span>
              </div>
              <ul className="space-y-1.5 text-white/70">
                <li>• <strong>{isUrdu ? 'بنیادی عمل:' : 'Primary Mechanism:'}</strong> {isUrdu ? 'الکلائن پی ایچ ڈی سورپشن (سنکھیا کا اخراج)' : 'Alkaline pH Desorption'}</li>
                <li>• <strong>{isUrdu ? 'کیمیائی ماحول:' : 'Aquifer Chemistry:'}</strong> {isUrdu ? 'زیادہ پی ایچ (7.5–8.0) اور چونے والی مٹی' : 'High pH (7.5–8.0), calcareous alluvial soils'}</li>
                <li>• <strong>{isUrdu ? 'موسمیاتی سیاق:' : 'Climate Context:'}</strong> {isUrdu ? 'خشک آب و ہوا (۱۵۱ ملی میٹر سالانہ بارش)، ۰.۱۲٪ نامیاتی کاربن' : 'Arid (151mm annual rainfall), 0.12% soil carbon'}</li>
                <li>• <strong>{isUrdu ? 'اہم ترین محرکات:' : 'Core Drivers:'}</strong> {isUrdu ? 'پی ایچ (r = +0.952) اور لوہے (r = +0.927) سے گہرا تعلق' : 'Strong correlation with pH (r = +0.952) and Iron (r = +0.927)'}</li>
                <li>• <strong>{isUrdu ? 'سائنسی تصدیق:' : 'Validation:'}</strong> {isUrdu ? 'سندھ بھر کے ۴۰ کنوؤں پر لیو ون آؤٹ کراس ویلیڈیشن' : 'Verified via Leave-One-Out Cross Validation across 40 Sindh wells'}</li>
              </ul>
            </div>

            {/* Bangladesh / Global Comparison */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-white/60 hover-card-lift">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white/80 uppercase tracking-wider text-[11px]">
                  {isUrdu ? 'بنگلہ دیش / عالمی ٹرانسفر ماڈل' : 'Bangladesh / Global Transfer'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-rose-500/20 text-rose-300 font-bold">
                  {isUrdu ? 'R² = 0.12 (ناکام)' : 'R² = 0.12 (Failed)'}
                </span>
              </div>
              <ul className="space-y-1.5">
                <li>• <strong>{isUrdu ? 'بنیادی عمل:' : 'Mechanism:'}</strong> {isUrdu ? 'مائیکروبیل ریڈکٹیو تحلیل' : 'Microbial Reductive Dissolution'}</li>
                <li>• <strong>{isUrdu ? 'کیمیائی ماحول:' : 'Aquifer Chemistry:'}</strong> {isUrdu ? 'اینیروبک، نامیاتی مادوں سے بھرپور ماحول' : 'Anaerobic, organic-rich sediment matrices'}</li>
                <li>• <strong>{isUrdu ? 'موسمیاتی سیاق:' : 'Climate Context:'}</strong> {isUrdu ? 'شدید بارشیں (۲،۱۲۷ ملی میٹر بارش)، ۰.۴۱٪ مٹی کاربن' : 'Tropical wet (2,127mm rainfall), 0.41% soil carbon'}</li>
                <li>• <strong>{isUrdu ? 'سائنسی نتیجہ:' : 'Conclusion:'}</strong> {isUrdu ? 'عالمی یا بنگال بیسن کا ڈیٹا سندھ میں ناکام ہو جاتا ہے کیونکہ دونوں خطوں میں سنکھیا کے خارج ہونے کا ارضیاتی سبب مکمل مختلف ہے۔' : 'Training on global or Bengal basin data fails in Sindh because the fundamental geochemical release trigger is different.'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Stacked Generalization Ensemble Architecture */}
        <div className="p-7 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-5 shadow-xl hover-card-lift">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1599E1]/10 border border-[#1599E1]/25 flex items-center justify-center text-[#1599E1]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {isUrdu ? 'اسٹیکڈ اینسمبل ماڈل کی ساخت' : 'Stacked Ensemble Meta-Model'}
              </h2>
              <p className="text-xs text-white/50">
                {isUrdu
                  ? 'لیول-۱ کے الگورتھمز کو لاگ ٹرانسفارم شدہ آرسینک پر لیول-۲ ریج ریگریشن کے ذریعے یکجا کیا گیا ہے۔'
                  : 'Level-1 base learners combined via Level-2 Ridge regression (alpha = 1.0) on log-transformed arsenic.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ensembleModels.map((m) => (
              <div key={m.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 hover-card-lift">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{m.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/50">{isUrdu ? 'وزن:' : 'Weight:'} <strong className="text-[#00D4C8]">{m.weight}</strong></span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white font-semibold">R² {m.r2}</span>
                  </div>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. SHAP Feature Importance Table */}
        <div className="p-7 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-5 shadow-xl hover-card-lift">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {isUrdu ? 'اہم ترین عوامل (SHAP تجزیہ)' : 'Feature Importance (SHAP Explainability)'}
            </h3>
            <p className="text-xs text-white/50 mt-1">
              {isUrdu
                ? 'ایکس جی بوسٹ شیپلی ویلیوز جو ماحولیاتی اور کیمیائی خصوصیات کے اثرات کو ظاہر کرتی ہیں۔'
                : 'Confirmed XGBoost Shapley values showing exact relative contributions of geochemical and satellite features.'}
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {shapFeatures.map((feat) => (
              <div key={feat.name} className="space-y-1.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-white font-medium">{feat.name}</span>
                  <span className="text-[#00D4C8] font-bold tabular-nums">
                    {(feat.shapImportance * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00D4C8] to-[#1599E1]"
                    style={{ width: `${Math.min(100, feat.shapImportance * 100 * 2.5)}%` }}
                  />
                </div>
                <p className="text-[10.5px] text-white/45">{feat.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Depth Stratification Provincial Grid Statistics */}
        <div className="p-7 rounded-2xl bg-[#06101E]/85 border border-white/[0.08] backdrop-blur-md space-y-4 shadow-xl hover-card-lift">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {isUrdu ? 'سندھ میں گہرائی کے لحاظ سے پانی کی کیفیت (اسٹیج ۵ ماڈل)' : 'Sindh Provincial Depth Stratification (Stage 5 Grid Model)'}
            </h3>
            <p className="text-xs text-white/50 mt-1">
              {isUrdu
                ? '۴۳.۶ لاکھ گرڈ سیلز اور ۲،۲۰،۹۴۱ نوڈز پر مشتمل گہرائی کے لحاظ سے ارضیاتی تقسیم۔'
                : 'Corrected depth-varying chemistry distributions across 4.36M grid cells and 220,941 backend query nodes.'}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.04] text-white/50 border-b border-white/[0.06] text-[10px] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-2.5 px-3">{isUrdu ? 'گہرائی' : 'Horizon Depth'}</th>
                  <th className="py-2.5 px-3">{isUrdu ? 'ارضیاتی تہہ' : 'Geological Strata'}</th>
                  <th className="py-2.5 px-3">{isUrdu ? 'اوسط آرسینک' : 'Mean Arsenic'}</th>
                  <th className="py-2.5 px-3">{isUrdu ? 'محفوظ فیصد' : 'WHO Safe %'}</th>
                  <th className={`py-2.5 px-3 ${isUrdu ? 'text-left' : 'text-right'}`}>{isUrdu ? 'میدانی کیفیت' : 'Field Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">{isUrdu ? '۳۰ میٹر' : '30 meters'}</td>
                  <td className="py-2.5 px-3 text-white/60">{isUrdu ? 'سطحی ہولوسین مٹی (آلودہ)' : 'Holocene Alluvium (Shallow)'}</td>
                  <td className="py-2.5 px-3 font-semibold text-rose-400 tabular-nums">267.5 µg/L</td>
                  <td className="py-2.5 px-3 text-rose-400 font-semibold tabular-nums">{isUrdu ? '۰.۰٪ محفوظ' : '0.0% Safe'}</td>
                  <td className={`py-2.5 px-3 ${isUrdu ? 'text-left' : 'text-right'}`}><span className="px-2 py-0.5 rounded-full text-[9px] bg-rose-500/20 text-rose-300 font-bold">{isUrdu ? 'شدید آلودہ' : 'HEAVILY CONTAMINATED'}</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">{isUrdu ? '۶۰ میٹر' : '60 meters'}</td>
                  <td className="py-2.5 px-3 text-white/60">{isUrdu ? 'درمیانی الیویل تہہ' : 'Intermediate Alluvium'}</td>
                  <td className="py-2.5 px-3 font-semibold text-amber-400 tabular-nums">46.5 µg/L</td>
                  <td className="py-2.5 px-3 text-amber-400 font-semibold tabular-nums">{isUrdu ? '۰.۰٪ محفوظ' : '0.0% Safe'}</td>
                  <td className={`py-2.5 px-3 ${isUrdu ? 'text-left' : 'text-right'}`}><span className="px-2 py-0.5 rounded-full text-[9px] bg-amber-500/20 text-amber-300 font-bold">{isUrdu ? 'غیر محفوظ' : 'CONTAMINATED'}</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">{isUrdu ? '۱۰۰ میٹر' : '100 meters'}</td>
                  <td className="py-2.5 px-3 text-white/60">{isUrdu ? 'منتقلی زون' : 'Transition Zone'}</td>
                  <td className="py-2.5 px-3 font-semibold text-amber-400 tabular-nums">37.3 µg/L</td>
                  <td className="py-2.5 px-3 text-amber-400 font-semibold tabular-nums">{isUrdu ? '۰.۰٪ محفوظ' : '0.0% Safe'}</td>
                  <td className={`py-2.5 px-3 ${isUrdu ? 'text-left' : 'text-right'}`}><span className="px-2 py-0.5 rounded-full text-[9px] bg-amber-500/20 text-amber-300 font-bold">{isUrdu ? 'غیر محفوظ' : 'CONTAMINATED'}</span></td>
                </tr>
                <tr className="bg-emerald-500/[0.08]">
                  <td className="py-2.5 px-3 font-bold text-emerald-400">{isUrdu ? '۱۵۰ میٹر' : '150 meters'}</td>
                  <td className="py-2.5 px-3 text-emerald-200">{isUrdu ? 'گہری قدیم پلیسٹوسین ریتلی تہہ' : 'Deep Pleistocene Aquifer'}</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-400 tabular-nums">7.0 µg/L</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold tabular-nums">{isUrdu ? '۹۷.۰٪ محفوظ' : '97.0% Safe'}</td>
                  <td className={`py-2.5 px-3 ${isUrdu ? 'text-left' : 'text-right'}`}><span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/30 text-emerald-300 font-bold">{isUrdu ? 'تجویز کردہ ہدف' : 'RECOMMENDED TARGET'}</span></td>
                </tr>
                <tr className="bg-emerald-500/[0.04]">
                  <td className="py-2.5 px-3 font-bold text-emerald-400">{isUrdu ? '۲۰۰ میٹر' : '200 meters'}</td>
                  <td className="py-2.5 px-3 text-emerald-200">{isUrdu ? 'گہری قدیم پلیسٹوسین ریتلی تہہ' : 'Deep Pleistocene Aquifer'}</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-400 tabular-nums">7.0 µg/L</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold tabular-nums">{isUrdu ? '۹۶.۴٪ محفوظ' : '96.4% Safe'}</td>
                  <td className={`py-2.5 px-3 ${isUrdu ? 'text-left' : 'text-right'}`}><span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/30 text-emerald-300 font-bold">{isUrdu ? 'محفوظ پانی' : 'SAFE AQUIFER'}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-white/45 italic">
            {isUrdu
              ? 'میرپور ماتھیلو میں زمینی تصدیق: ۳۰ میٹر = ۲۳۶.۹ مائیکروگرام (غیر محفوظ) بمقابلہ ۱۵۰ میٹر = ۴.۶ مائیکروگرام (محفوظ ✅) جو حقیقی فیلڈ ٹیسٹوں سے مطابقت رکھتی ہے۔'
              : "Test verification in Mirpur Mathelo (Adeel's hometown): 30m = 236.9 µg/L (UNSAFE) vs 150m = 4.6 µg/L (SAFE ✅), matching ground-truth field audits."}
          </p>
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
