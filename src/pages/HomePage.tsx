import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { HeroSindhVisual } from '../components/home/HeroSindhVisual';
import {
  MapPin,
  ArrowRight,
  Map,
  Globe,
  Code,
  Brain,
  Activity,
  Shield,
  Layers,
  Info,
} from 'lucide-react';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const HomePage: React.FC = () => {
  const { setActivePage, userSettings } = useAppStore();
  const isUrdu = userSettings.language === 'ur';

  const handleOpenMap = () => {
    setActivePage('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`w-full min-h-screen bg-transparent text-white selection:bg-[#00D4C8]/30 selection:text-[#00D4C8] space-y-24 pb-24 relative overflow-hidden bg-grid-vertical ${
        isUrdu ? 'rtl text-right' : 'ltr text-left'
      }`}
    >
      
      {/* 1. Hero Section */}
      <section className="pt-8 sm:pt-16 pb-6 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className={`lg:col-span-6 space-y-7 ${isUrdu ? 'text-right' : 'text-left'}`}>
            
            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-6xl font-display font-extrabold text-white ${isUrdu ? 'leading-[1.7] sm:leading-[1.8] py-2' : 'tracking-tight leading-[1.1]'}`}>
              {isUrdu ? (
                <>
                  پانی کا خطرہ جانیں۔<br />
                  بورنگ سے پہلے۔
                </>
              ) : (
                <>
                  Know Your Water Risk.<br />
                  Before You Drill.
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className={`text-base sm:text-lg max-w-xl font-normal ${isUrdu ? 'text-white/80 leading-[2.2] text-lg' : 'text-white/70 leading-relaxed'}`}>
              {isUrdu
                ? 'زیرآب سیٹلائٹ ڈیٹا اور مشین لرننگ کے ذریعے سندھ بھر میں زیرِ زمین سنکھیا (آرسینک) کے خطرے کی درست نشاندہی کرتا ہے — تاکہ خاندان اور فلاحی ادارے جان سکیں کہ پانی کا ٹیسٹ کہاں سب سے زیادہ ضروری ہے۔'
                : 'Zeraab maps groundwater arsenic contamination risk across Sindh using satellite data and machine learning — helping communities and NGOs identify where water testing is most urgently needed.'}
            </p>

            {/* Open Risk Map CTA Button */}
            <div className="pt-1">
              <button
                onClick={handleOpenMap}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00D4C8] to-[#1599E1] hover:from-[#20e2d7] hover:to-[#2cb0fb] text-[#020B18] font-bold text-sm flex items-center gap-2.5 shadow-[0_0_25px_rgba(0,212,200,0.35)] hover:shadow-[0_0_35px_rgba(0,212,200,0.5)] transition-all transform active:scale-95"
              >
                <Activity className="w-4 h-4" />
                <span>{isUrdu ? 'خطرے کا نقشہ کھولیں' : 'Open Risk Map'}</span>
                <ArrowRight className={`w-4 h-4 ${isUrdu ? 'rotate-180 mr-0.5' : 'ml-0.5'}`} />
              </button>
            </div>

            {/* 4 Feature Trust Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Pillar 1 */}
              <div className="group relative p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-[#00D4C8]/30 transition-all duration-300 flex flex-col justify-between gap-2.5 hover-card-lift">
                <div className="w-7 h-7 rounded-lg bg-[#00D4C8]/10 border border-[#00D4C8]/20 flex items-center justify-center text-[#00D4C8] shrink-0 group-hover:scale-110 transition-transform">
                  <Map className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white tracking-tight">
                    {isUrdu ? 'آرسینک کا خطرہ' : 'Arsenic Risk'}
                  </div>
                  <div className="text-[11px] text-white/50 leading-snug mt-0.5">
                    {isUrdu ? 'سندھ کی میپنگ' : 'Sindh mapping'}
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="group relative p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-[#00D4C8]/30 transition-all duration-300 flex flex-col justify-between gap-2.5 hover-card-lift">
                <div className="w-7 h-7 rounded-lg bg-[#00D4C8]/10 border border-[#00D4C8]/20 flex items-center justify-center text-[#00D4C8] shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white tracking-tight">
                    {isUrdu ? 'عام رسائی' : 'Open Access'}
                  </div>
                  <div className="text-[11px] text-white/50 leading-snug mt-0.5">
                    {isUrdu ? 'مفت عوامی سہولت' : 'Free public utility'}
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="group relative p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-[#00D4C8]/30 transition-all duration-300 flex flex-col justify-between gap-2.5 hover-card-lift">
                <div className="w-7 h-7 rounded-lg bg-[#00D4C8]/10 border border-[#00D4C8]/20 flex items-center justify-center text-[#00D4C8] shrink-0 group-hover:scale-110 transition-transform">
                  <Code className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white tracking-tight">
                    {isUrdu ? 'اوپن سورس' : 'Open Source'}
                  </div>
                  <div className="text-[11px] text-white/50 leading-snug mt-0.5">
                    {isUrdu ? 'شفاف ڈیٹا' : 'Transparent data'}
                  </div>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="group relative p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-[#00D4C8]/30 transition-all duration-300 flex flex-col justify-between gap-2.5 hover-card-lift">
                <div className="w-7 h-7 rounded-lg bg-[#00D4C8]/10 border border-[#00D4C8]/20 flex items-center justify-center text-[#00D4C8] shrink-0 group-hover:scale-110 transition-transform">
                  <Brain className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white tracking-tight">
                    {isUrdu ? 'مصنوعی ذہانت' : 'AI Powered'}
                  </div>
                  <div className="text-[11px] text-white/50 leading-snug mt-0.5">
                    {isUrdu ? 'پیش گوئی ماڈل' : 'Predictive model'}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Glowing Sindh Vector */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <HeroSindhVisual />
          </div>

        </div>
      </section>

      {/* 2. Mapping Sindh's Groundwater Safety Section */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#00D4C8] tracking-tight">
              {isUrdu ? 'سندھ کے زیرِ زمین پانی کی حفاظت کا جائزہ' : "Mapping Sindh's Groundwater Safety"}
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              {isUrdu
                ? 'مشین لرننگ ماڈل کے خطرے کے تعین کی بنیاد بننے والے مصدقہ علاقائی سائنسی اعداد و شمار۔'
                : 'Aggregated telemetry and testing figures driving our machine learning risk classifications.'}
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-center">
            {/* Card 1 */}
            <div className="p-7 rounded-2xl bg-[#06101E]/80 border border-white/[0.08] backdrop-blur-md space-y-3 flex flex-col items-center justify-center shadow-lg hover-card-lift">
              <div className="w-9 h-9 rounded-full bg-[#00D4C8]/10 border border-[#00D4C8]/25 flex items-center justify-center text-[#00D4C8]">
                <Map className="w-4 h-4" />
              </div>
              <div className="text-3xl font-display font-extrabold text-white tracking-tight tabular-nums">
                141,000
              </div>
              <div className="text-[10px] font-bold tracking-wider uppercase text-white/50">
                {isUrdu ? 'مربع کلومیٹر رقبہ (۲۸ اضلاع)' : 'KM² COVERED (28 DISTRICTS)'}
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-2xl bg-[#06101E]/80 border border-white/[0.08] backdrop-blur-md space-y-3 flex flex-col items-center justify-center shadow-lg hover-card-lift">
              <div className="w-9 h-9 rounded-full bg-[#00D4C8]/10 border border-[#00D4C8]/25 flex items-center justify-center text-[#00D4C8]">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-3xl font-display font-extrabold text-white tracking-tight tabular-nums">
                57,638
              </div>
              <div className="text-[10px] font-bold tracking-wider uppercase text-white/50">
                {isUrdu ? 'ماسٹر ڈیٹا سیٹ ریکارڈز' : 'MASTER DATASET RECORDS'}
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-2xl bg-[#06101E]/80 border border-white/[0.08] backdrop-blur-md space-y-3 flex flex-col items-center justify-center shadow-lg hover-card-lift">
              <div className="w-9 h-9 rounded-full bg-[#00D4C8]/10 border border-[#00D4C8]/25 flex items-center justify-center text-[#00D4C8]">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-3xl font-display font-extrabold text-[#00D4C8] tracking-tight tabular-nums">
                0.9463
              </div>
              <div className="text-[10px] font-bold tracking-wider uppercase text-white/50">
                {isUrdu ? 'اینسمبل ماڈل کی درستگی (۹۵٪ عالمی معیار)' : 'ENSEMBLE LOO-CV R² (95% WHO)'}
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-7 rounded-2xl bg-[#06101E]/80 border border-white/[0.08] backdrop-blur-md space-y-3 flex flex-col items-center justify-center shadow-lg hover-card-lift">
              <div className="w-9 h-9 rounded-full bg-[#00D4C8]/10 border border-[#00D4C8]/25 flex items-center justify-center text-[#00D4C8]">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-3xl font-display font-extrabold text-white tracking-tight tabular-nums">
                4.36M
              </div>
              <div className="text-[10px] font-bold tracking-wider uppercase text-white/50">
                {isUrdu ? '۲۵۰ میٹر گرڈ سیلز · ۲.۱۸ کروڑ تخمینے' : '250M CELLS · 21.8M PREDICTIONS'}
              </div>
            </div>
          </div>

          {/* Professional Accuracy Clarification Note */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] max-w-3xl mx-auto flex items-start gap-2.5 text-center sm:text-left text-xs text-white/55">
            <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5 hidden sm:block" />
            <p className={`text-[11px] leading-relaxed w-full ${isUrdu ? 'text-right' : 'text-left'}`}>
              <strong className="text-white/80 font-medium">
                {isUrdu ? 'وضاحتی نوٹ برائے ماڈل درستگی:' : 'Technical Accuracy Note:'}{' '}
              </strong>
              {isUrdu
                ? 'رپورٹ کردہ R² (0.9463) اور کارکردگی کے تمام تخمینے شماریاتی مشین لرننگ ماڈل ٹیسٹنگ (Leave-One-Out CV) کے ذریعے حاصل کیے گئے ہیں، نہ کہ ہر مقام پر براہ راست آن فیلڈ بورنگ کے ذریعے۔ حتمی ڈرلنگ سے قبل لیبارٹری ٹیسٹ لازماً کرائیں۔'
                : 'All performance metrics (including LOO-CV R² = 0.9463) are attained strictly through rigorous computational model testing and cross-validation, not direct empirical on-field borehole testing. On-site chemical verification is recommended prior to well commissioning.'}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. What is Zeraab? Section */}
      <ScrollReveal delay={100}>
        <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              {isUrdu ? 'زیرآب کیا ہے؟' : 'What is Zeraab?'}
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              {isUrdu
                ? 'مختلف گہرائیوں پر آرسینک کی درست پیش گوئی کرنے والا ایک تحقیقی سائنسی پلیٹ فارم۔'
                : 'A research-grade platform providing exact continuous arsenic predictions across multiple aquifer depths.'}
            </p>
          </div>

          {/* 3 Pillar Feature Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isUrdu ? 'text-right' : 'text-left'}`}>
            {/* Pillar 1 */}
            <div className="p-7 rounded-2xl bg-[#06101E]/80 border border-white/[0.08] backdrop-blur-md space-y-4 shadow-lg hover-card-lift">
              <div className="w-9 h-9 rounded-full bg-[#00D4C8]/10 border border-[#00D4C8]/25 flex items-center justify-center text-[#00D4C8]">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isUrdu ? 'تین جہتی گہرائی کی تہہ بندی' : '3D Depth Stratification'}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                {isUrdu
                  ? 'پانچ مخصوص گہرائیوں (۳۰، ۶۰، ۱۰۰، ۱۵۰ اور ۲۰۰ میٹر) اور کسٹم گہرائی (۱۰ تا ۳۰۰ میٹر) پر آرسینک کی درست مقدار بتاتا ہے، تاکہ سطحی آلودگی کے باوجود گہرے محفوظ پانی تک رسائی ممکن ہو۔'
                  : 'Predicts exact arsenic concentrations in µg/L at five specific drilling horizons (30m, 60m, 100m, 150m, 200m) and custom depths (10–300m), pinpointing safe deep Pleistocene aquifers where shallow wells are contaminated.'}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-2xl bg-[#06101E]/80 border border-white/[0.08] backdrop-blur-md space-y-4 shadow-lg hover-card-lift">
              <div className="w-9 h-9 rounded-full bg-[#00D4C8]/10 border border-[#00D4C8]/25 flex items-center justify-center text-[#00D4C8]">
                <Brain className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isUrdu ? 'اسٹیکڈ اینسمبل مشین لرننگ' : 'Stacked Generalization Ensemble'}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                {isUrdu
                  ? 'کیٹ بوسٹ، ایکس جی بوسٹ، لائٹ جی بی ایم اور رینڈم فارسٹ کو یکجا کر کے بنایا گیا طاقتور ماڈل۔ ۱۲۵ سیٹلائٹ ماحولیاتی متغیرات اور سندھ کے مصدقہ لیبارٹری ڈیٹا پر تربیت یافتہ (ماڈل ٹیسٹنگ R² = 0.9463)۔'
                  : 'Combines XGBoost, LightGBM, CatBoost, and Random Forest meta-weighted via Ridge regression. Trained on 125 satellite remote sensing variables and calibrated with certified Sindh groundwater chemistry (model-tested LOO-CV R² = 0.9463).'}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-2xl bg-[#06101E]/80 border border-white/[0.08] backdrop-blur-md space-y-4 shadow-lg hover-card-lift">
              <div className="w-9 h-9 rounded-full bg-[#00D4C8]/10 border border-[#00D4C8]/25 flex items-center justify-center text-[#00D4C8]">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isUrdu ? 'ہمیشہ کے لیے مفت اور عام رسائی' : 'Free & Open Access Forever'}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                {isUrdu
                  ? 'سندھ کے کسانوں، بورنگ کرنے والوں، این جی اوز، طبی عملے اور طلبہ کے لیے مکمل مفت۔ بغیر کسی فیس یا رجسٹریشن کے، صرف پن لگا کر زندگی بچانے والی معلومات حاصل کریں۔'
                  : 'Completely free for farmers, local drillers, healthcare workers, NGOs, and students across Sindh. Built without paywalls, sign-ups, or token barriers so that anyone can access life-saving water data by dropping a pin.'}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 4. Important Hydrological Note Callout Card */}
      <ScrollReveal delay={150}>
        <section className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="p-5 rounded-2xl bg-[#061328]/70 border border-[#00D4C8]/20 flex items-start gap-4 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-[#00D4C8]/15 border border-[#00D4C8]/30 flex items-center justify-center text-[#00D4C8] shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div className={`space-y-1 ${isUrdu ? 'text-right' : 'text-left'}`}>
              <h4 className="text-xs font-bold text-[#00D4C8]">
                {isUrdu ? 'پراجیکٹ کا پس منظر اور علمی انتساب' : 'Project Origin & Scientific Attribution'}
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {isUrdu
                  ? 'محمد عدیل ارشد (میرپور ماتھیلو، پاکستان) کی تحقیق۔ دریائے سندھ کی وادی میں سنکھیا کی شدید آلودگی کے سدباب اور سائنسی بنیادوں پر بورنگ کے فیصلوں کے لیے تیار کیا گیا۔'
                  : <>Developed by <strong className="text-white">Muhammad Adeel Arshad</strong> (Mirpur Mathelo, Pakistan). Created in response to severe groundwater arsenic contamination across the Indus alluvial basin to enable science-backed drilling decisions.</>}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

    </div>
  );
};
