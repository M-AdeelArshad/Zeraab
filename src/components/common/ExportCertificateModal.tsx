import React, { useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { Logo } from './Logo';

export const ExportCertificateModal: React.FC = () => {
  const {
    isExportModalOpen,
    setExportModalOpen,
    gridPredictions,
    geocodedLocation,
    selectedCoords,
    userSettings,
  } = useAppStore();

  const isUrdu = userSettings.language === 'ur';
  const printRef = useRef<HTMLDivElement>(null);

  if (!isExportModalOpen || !gridPredictions || !selectedCoords) return null;

  const [lat, lon] = selectedCoords;
  const safeDepth = gridPredictions.safe_depth_m || 150;
  const certificateId = `ZRB-${Math.round(lat * 100)}-${Math.round(lon * 100)}-${Date.now().toString().slice(-4)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const data = {
      certificateId,
      timestamp: new Date().toISOString(),
      location: {
        latitude: lat,
        longitude: lon,
        village: geocodedLocation?.village,
        district: geocodedLocation?.district,
        province: 'Sindh, Pakistan',
      },
      recommendedSafeDepthMeters: safeDepth,
      drillingRecommendation: gridPredictions.recommendation,
      standards: {
        whoLimit_ugl: gridPredictions.who_limit_ugl,
        pakistanLimit_ugl: gridPredictions.pakistan_limit_ugl,
      },
      depthProfiles: gridPredictions.depths,
      modelMetrics: {
        architecture: 'Multi-Depth Stacked Ensemble (XGBoost + CatBoost + LightGBM + RF → Ridge)',
        loo_cv_r2: 0.9463,
        who_accuracy: '95.0% (38/40 Wells, AUC 0.9784)',
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Zeraab_Water_Report_${certificateId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#071827] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 text-white space-y-6 ${
          isUrdu ? 'rtl text-right' : 'ltr text-left'
        }`}
      >
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" />
            <h3 className="font-display font-bold text-lg text-white">
              {isUrdu ? 'زیرِ زمین پانی کی سائنسی سرٹیفکیٹ رپورٹ' : 'Groundwater Intelligence Certificate'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#00D4C8] text-[#020B18] text-xs font-bold flex items-center gap-1.5 hover:bg-[#20e2d7] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'پرنٹ' : 'Print'}</span>
            </button>
            <button
              onClick={() => setExportModalOpen(false)}
              className="p-1.5 text-white/50 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div ref={printRef} className="space-y-6 p-4 rounded-2xl bg-[#04101c] border border-white/8">
          
          {/* Top Banner */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <Logo size="lg" />
              <div>
                <span className="font-display font-bold text-2xl tracking-tight text-white block">
                  {isUrdu ? 'زیرآب ہائیڈروجیولوجیکل رپورٹ' : 'ZERAAB HYDROGEOLOGICAL REPORT'}
                </span>
                <span className="text-xs text-[#00D4C8] font-mono">
                  {isUrdu ? 'سرٹیفکیٹ نمبر:' : 'Certificate ID:'} {certificateId}
                </span>
              </div>
            </div>
            <div className={`text-xs text-white/50 font-mono ${isUrdu ? 'text-left' : 'text-right'}`}>
              <div>{isUrdu ? 'تاریخ:' : 'Date:'} {new Date().toLocaleDateString(isUrdu ? 'ur-PK' : 'en-GB')}</div>
              <div>{isUrdu ? 'سندھ گرڈ: ۲۵۰ میٹر ریزولوشن' : 'Sindh Basin Grid: 250m Res'}</div>
            </div>
          </div>

          {/* Location Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-white/5 font-mono text-xs">
            <div>
              <span className="text-white/40 block text-[10px] uppercase">
                {isUrdu ? 'ضلع' : 'DISTRICT'}
              </span>
              <span className="font-semibold text-white">
                {geocodedLocation?.district || (isUrdu ? 'سندھ کا ضلع' : 'Sindh District')}
              </span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">
                {isUrdu ? 'مقام (کوآرڈینیٹس)' : 'COORDINATES'}
              </span>
              <span className="font-semibold text-white tabular-nums ltr" dir="ltr">
                {lat.toFixed(4)}°N, {lon.toFixed(4)}°E
              </span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">
                {isUrdu ? 'گاؤں / علاقہ' : 'VILLAGE / LOCALITY'}
              </span>
              <span className="font-semibold text-white truncate block">
                {geocodedLocation?.village || (isUrdu ? 'انڈس الیویل زون' : 'Indus Alluvial Zone')}
              </span>
            </div>
          </div>

          {/* Safe Drilling Recommendation Highlight */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                {isUrdu ? 'بورنگ کے لیے سرکاری سائنسی سفارش' : 'Official Drilling Recommendation'}
              </span>
              <p className="text-sm font-medium text-white">
                {gridPredictions.recommendation ||
                  (isUrdu
                    ? `محفوظ پینے کے پانی کے لیے کم از کم ${safeDepth} میٹر گہرائی تک ڈرل کریں۔`
                    : `Drill to at least ${safeDepth}m to reach safe Pleistocene aquifer.`)}
              </p>
            </div>
            <div className={`${isUrdu ? 'text-left pr-4' : 'text-right pl-4'}`}>
              <span className="text-3xl font-mono font-black text-emerald-400 tabular-nums">
                {safeDepth}m
              </span>
              <span className="text-[10px] text-white/60 block font-mono">
                {isUrdu ? 'کم از کم گہرائی' : 'Min Depth'}
              </span>
            </div>
          </div>

          {/* Depth Stratification Table */}
          <div>
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-2">
              {isUrdu ? 'زیرِ زمین تہوں کی درجہ بندی' : 'Aquifer Depth Stratification'}
            </span>
            <div className="overflow-hidden rounded-xl border border-white/10 font-mono text-xs">
              <table className={`w-full ${isUrdu ? 'text-right' : 'text-left'}`}>
                <thead className="bg-white/10 text-white/70">
                  <tr>
                    <th className="p-2.5">{isUrdu ? 'گہرائی' : 'Aquifer Depth'}</th>
                    <th className="p-2.5">{isUrdu ? 'آرسینک (µg/L)' : 'Arsenic (µg/L)'}</th>
                    <th className="p-2.5">{isUrdu ? 'عالمی حد (≤10)' : 'WHO Limit (≤10)'}</th>
                    <th className="p-2.5">{isUrdu ? 'قومی معیار (≤50)' : 'Pak Standard (≤50)'}</th>
                    <th className="p-2.5">{isUrdu ? 'خطرے کی درجہ بندی' : 'Risk Rating'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/90">
                  {Object.entries(gridPredictions.depths).map(([key, item]) => {
                    const isSafe = item.safe_who;
                    return (
                      <tr key={key} className={item.depth_m === safeDepth ? 'bg-emerald-500/10' : ''}>
                        <td className="p-2.5 font-bold">
                          {item.depth_m} {isUrdu ? 'میٹر' : 'meters'}
                        </td>
                        <td className="p-2.5 font-bold tabular-nums text-white">
                          {item.arsenic_ugl.toFixed(1)} µg/L
                        </td>
                        <td className="p-2.5">
                          {isSafe ? (
                            <span className="text-emerald-400 font-semibold">{isUrdu ? 'پاس' : 'PASS'}</span>
                          ) : (
                            <span className="text-rose-400">{isUrdu ? 'زیادہ' : 'EXCEEDS'}</span>
                          )}
                        </td>
                        <td className="p-2.5">
                          {item.safe_pakistan ? (
                            <span className="text-emerald-400 font-semibold">{isUrdu ? 'پاس' : 'PASS'}</span>
                          ) : (
                            <span className="text-rose-400">{isUrdu ? 'زیادہ' : 'EXCEEDS'}</span>
                          )}
                        </td>
                        <td className="p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.risk_level === 'SAFE'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : item.risk_level === 'CAUTION'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {isUrdu
                              ? item.risk_level === 'SAFE'
                                ? 'محفوظ'
                                : item.risk_level === 'CAUTION'
                                ? 'احتیاط'
                                : 'شدید خطرناک'
                              : item.risk_level}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Model Testing vs Field Testing Certificate Notice */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] text-[10px] text-white/55 leading-relaxed">
            <strong className="text-white/75 font-medium">
              {isUrdu ? 'تکنیکی تصریح برائے ماڈل درستگی:' : 'Technical Accuracy Notice:'}{' '}
            </strong>
            {isUrdu
              ? 'سرٹیفکیٹ میں درج R² قدریں (0.9463) اور ماڈل کی درستگی کے تخمینے سائنسی مشین لرننگ ماڈل ٹیسٹنگ اور کراس ویلیڈیشن پر مبنی ہیں، نہ کہ ہر مخصوص جگہ پر براہِ راست زمینی فیلڈ ٹیسٹنگ پر۔ ڈرلنگ اور استعمال سے قبل مصدقہ لیبارٹری ٹیسٹ لازمی ہے۔'
              : 'All stated accuracy metrics and R² figures (0.9463) are attained strictly through predictive computational model testing and cross-validation, not direct empirical on-field borehole testing. On-site physical and chemical laboratory verification is recommended prior to well commissioning.'}
          </div>

          {/* Model Credibility & Certification Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{isUrdu ? 'اسٹیکڈ اینسمبل ماڈل (LOO-CV R² = 0.9463)' : 'LOO-CV Stacked Model (R² = 0.9463)'}</span>
            </div>
            <span>{isUrdu ? 'زیرآب ہائیڈروجیولوجیکل انٹیلی جنس اقدام' : 'Zeraab Hydrogeological Intelligence Initiative'}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
