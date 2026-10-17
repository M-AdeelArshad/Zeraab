import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../data/translations';
import { Database, Grid, Layers, ShieldCheck, Info } from 'lucide-react';

export const StatsCards: React.FC = () => {
  const { summaryData, userSettings } = useAppStore();
  const isUrdu = userSettings.language === 'ur';
  const t = translations[userSettings.language] || translations.en;

  const totalCells = summaryData?.total_cells || 4360734;
  const resolution = summaryData?.scale_m || 250;

  const stats = [
    {
      id: 'grid_cells',
      label: t.gridCellsCovered,
      value: (totalCells / 1000000).toFixed(2) + 'M',
      subtext: isUrdu
        ? `${resolution} میٹر گرڈ ریزولوشن`
        : `${resolution}m Spatial Grid Resolution`,
      icon: Grid,
    },
    {
      id: 'depths',
      label: t.depthPredictions,
      value: isUrdu ? '۵ آبی تہیں' : '5 Aquifer Depths',
      subtext: isUrdu
        ? '۳۰ میٹر · ۶۰ میٹر · ۱۰۰ میٹر · ۱۵۰ میٹر · ۲۰۰ میٹر'
        : '30m · 60m · 100m · 150m · 200m',
      icon: Layers,
    },
    {
      id: 'accuracy',
      label: t.modelAccuracy,
      value: 'R² 0.9463',
      subtext: isUrdu
        ? 'ماڈل کراس ویلیڈیشن · ۹۵.۰٪ درستگی (AUC 0.9784)'
        : 'LOO-CV · 95.0% WHO Match (AUC 0.9784)',
      icon: ShieldCheck,
    },
    {
      id: 'db_footprint',
      label: t.databaseSize,
      value: isUrdu ? '۴۳.۶ لاکھ نوڈز' : '4.36M Nodes',
      subtext: isUrdu
        ? 'حقیقی وقت میں ارضیاتی کیمیائی تجزیہ'
        : 'Real-Time Subsurface Hydrochemistry',
      icon: Database,
    },
  ];

  return (
    <section className="w-full py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] backdrop-blur-xl transition-all duration-300 space-y-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-center justify-between text-white/50">
                  <span className="text-xs font-medium text-white/70 tracking-tight">
                    {item.label}
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-white/[0.05] flex items-center justify-center text-[#00D4C8]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-2xl font-bold text-white tracking-tight font-mono tabular-nums">
                  {item.value}
                </div>

                <p className="text-[11px] text-white/40 pt-1.5 border-t border-white/[0.06]">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Model Testing vs. On-Field Testing Clarification Note */}
        <div className="mt-3.5 px-4 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#00D4C8] shrink-0" />
            <span className="text-[11px] leading-relaxed">
              <strong className="text-white/75 font-medium">
                {isUrdu ? 'وضاحتی نوٹ برائے ماڈل درستگی:' : 'Model Testing Note:'}{' '}
              </strong>
              {isUrdu
                ? 'رپورٹ کردہ درستگی اور R² قدریں کمپیوٹیشنل ماڈل ٹیسٹنگ اور کراس ویلیڈیشن سے حاصل کی گئی ہیں، نہ کہ ہر مقام پر براہِ راست فیلڈ ٹیسٹنگ کے ذریعے۔ کنواں کھودنے سے قبل لیبارٹری کیمیائی ٹیسٹ ضروری ہے۔'
                : 'All performance metrics and R² values are derived via computational predictive model testing and cross-validation, not direct empirical on-field testing. In-situ laboratory validation is recommended before drilling.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
