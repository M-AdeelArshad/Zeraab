import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  const { setActivePage, userSettings } = useAppStore();
  const isUrdu = userSettings.language === 'ur';

  return (
    <footer
      className={`w-full bg-transparent border-t border-white/[0.06] text-white/60 py-14 text-xs ${
        isUrdu ? 'rtl text-right' : 'ltr text-left'
      }`}
    >
      {/* Container perfectly matching Navbar and page sections: max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* 3-Column Grid Perfectly Aligned with the 3 Cards Above */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Column 1: Aligned under Card 1 (Brand & Mission) */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <Logo size="md" />
              <span className="font-display font-bold text-lg text-white">
                {isUrdu ? 'زیرآب' : 'Zeraab'}
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              {isUrdu
                ? 'سیٹلائٹ ٹیلی میٹری اور جدید مشین لرننگ کے ذریعے صوبہ سندھ میں زیرِ زمین سنکھیا کے خطرے کی پیش گوئی، تاکہ ایک محفوظ اور زہر سے پاک مستقبل تعمیر کیا جا سکے۔'
                : 'Mapping groundwater arsenic risk across Sindh, Pakistan using satellite telemetry and machine learning to build a safer, toxic-free future.'}
            </p>
          </div>

          {/* Column 2: Aligned under Card 2 (Quick Navigation) */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">
              {isUrdu ? 'فوری نیویگیشن' : 'Quick Navigation'}
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-white/60">
              <button
                onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`${isUrdu ? 'text-right' : 'text-left'} hover:text-[#00D4C8] transition-colors`}
              >
                {isUrdu ? 'ہوم' : 'Home'}
              </button>
              <button
                onClick={() => { setActivePage('map'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`${isUrdu ? 'text-right' : 'text-left'} hover:text-[#00D4C8] transition-colors`}
              >
                {isUrdu ? 'خطرے کا نقشہ' : 'Risk Map'}
              </button>
              <button
                onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`${isUrdu ? 'text-right' : 'text-left'} hover:text-[#00D4C8] transition-colors`}
              >
                {isUrdu ? 'ہمارے بارے میں' : 'About'}
              </button>
              <button
                onClick={() => { setActivePage('methodology'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`${isUrdu ? 'text-right' : 'text-left'} hover:text-[#00D4C8] transition-colors`}
              >
                {isUrdu ? 'سائنسی طریقہ کار' : 'Methodology'}
              </button>
            </div>
          </div>

          {/* Column 3: Aligned under Card 3 (Data & Technologies) */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">
              {isUrdu ? 'ڈیٹا اور ٹیکنالوجی' : 'Data & Technologies'}
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4C8] shrink-0" />
                <span>{isUrdu ? '۵۷،۶۳۸ ماسٹر ریکارڈز (۱۲۵ ماحولیاتی متغیرات)' : '57,638 Master Records (125 Covariates)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4C8] shrink-0" />
                <span>{isUrdu ? 'گوگل ارتھ انجن (سینٹینل، ایس آر ٹی ایم، لینڈسیٹ)' : 'Google Earth Engine (Sentinel, SRTM, Landsat)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4C8] shrink-0" />
                <span>{isUrdu ? 'اسٹیکڈ اینسمبل ماڈل (LOO-CV R² = 0.9463)' : 'Stacked Ensemble (LOO-CV R² = 0.9463)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4C8] shrink-0" />
                <span>{isUrdu ? '۲۵۰ میٹر سندھ گرڈ (۲.۱۸ کروڑ تخمینے)' : '250m Sindh Grid (21.8M Predictions)'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40">
          <div>
            {isUrdu ? (
              <>
                © ۲۰۲۶ زیرآب · <span className="text-white/70">محمد عدیل ارشد</span> (میرپور ماتھیلو، پاکستان)
              </>
            ) : (
              <>
                © 2026 Zeraab · <span className="text-white/70">Muhammad Adeel Arshad</span> (Mirpur Mathelo, Pakistan)
              </>
            )}
          </div>
          <div className={`text-center ${isUrdu ? 'sm:text-left' : 'sm:text-right'} max-w-xl italic`}>
            {isUrdu
              ? 'تکنیکی وضاحت: زیرآب کی تمام درستگی کے تخمینے اور R² قدریں کمپیوٹیشنل ماڈل ٹیسٹنگ کے ذریعے حاصل کی گئی ہیں نہ کہ فیلڈ ٹیسٹنگ کے ذریعے۔ یہ مخصوص کنوؤں کے جسمانی لیبارٹری کیمیائی ٹیسٹ کا متبادل نہیں ہے۔'
              : 'Notice: All accuracy metrics (including R² = 0.9463) and risk estimates are attained through computational model testing and cross-validation, not direct on-field testing. In-situ physical chemical testing is recommended for individual wells.'}
          </div>
        </div>

      </div>
    </footer>
  );
};
