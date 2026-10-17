import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { UNITS, getRiskCategory, RISK_THRESHOLDS } from '../../constants/units';
import { RiskGauge } from './RiskGauge';
import {
  X,
  Copy,
  Check,
  Download,
  Loader2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const ResultPanel: React.FC = () => {
  const {
    isResultPanelOpen,
    setResultPanelOpen,
    selectedCoords,
    geocodedLocation,
    gridPredictions,
    customDepth,
    customPrediction,
    isLoadingGrid,
    isLoadingCustom,
    errorMessage,
    predictCustomDepth,
    setExportModalOpen,
    userSettings,
    selectedDepthMeters,
    setSelectedDepthMeters,
  } = useAppStore();

  const isUrdu = userSettings.language === 'ur';
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'simulator'>('overview');
  const [sliderDepth, setSliderDepth] = useState<number>(customDepth || 75);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const lat = selectedCoords ? selectedCoords[0] : null;
  const lng = selectedCoords ? selectedCoords[1] : null;

  // Format coordinate label in standard cardinal direction format
  const coordString =
    lat !== null && lng !== null
      ? `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(4)}° ${
          lng >= 0 ? 'E' : 'W'
        }`
      : '';

  const handleCopyCoords = async () => {
    if (!coordString) return;
    try {
      await navigator.clipboard.writeText(coordString);
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2000);
    } catch {}
  };

  // Debounced simulator adjustment
  const handleSliderChange = (newDepth: number) => {
    setSliderDepth(newDepth);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      predictCustomDepth(newDepth);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  if (!selectedCoords && !isLoadingGrid) return null;
  if (!isResultPanelOpen && !isLoadingGrid) return null;

  // Derive active arsenic value from selected depth horizon
  let activeArsenic = 0;
  if (gridPredictions) {
    const key = `${selectedDepthMeters}m` as keyof typeof gridPredictions.depths;
    activeArsenic = gridPredictions.depths[key]?.arsenic_ugl ?? 0;
  }

  const safeDepth = gridPredictions?.safe_depth_m || 150;

  // Strata geological descriptions
  const strataInfo: Record<number, { titleEn: string; titleUr: string; descEn: string; descUr: string }> = {
    30: {
      titleEn: 'Shallow Holocene Silt',
      titleUr: 'سطحی ہولوسین مٹی',
      descEn: 'High organic matter, strongly reducing aquifer zone.',
      descUr: 'زیادہ نامیاتی مادے اور لوہے والی شدید کیمیائی تخفیفی تہہ۔',
    },
    60: {
      titleEn: 'Upper Alluvial Silt-Sand',
      titleUr: 'اوپری باریک ریت',
      descEn: 'Transitional horizon with decreasing reactive iron.',
      descUr: 'منتقلی کی تہہ جس میں لوہے کا اثر کم ہونا شروع ہوتا ہے۔',
    },
    100: {
      titleEn: 'Intermediate Aquifer',
      titleUr: 'درمیانی تہہ',
      descEn: 'Semi-confined sandy layer with moderate dilution.',
      descUr: 'نیم محفوظ ریتلی تہہ جس میں آرسینک بتدریج کم ہوتا ہے۔',
    },
    150: {
      titleEn: 'Deep Pleistocene Sand',
      titleUr: 'گہری قدیم ریتلی تہہ',
      descEn: 'Coarse oxidized sands with low dissolved arsenic.',
      descUr: 'موٹی ریت پر مشتمل قدیم تہہ جس میں سنکھیا انتہائی کم ہے۔',
    },
    200: {
      titleEn: 'Basal Pleistocene Aquifer',
      titleUr: 'سب سے نچلی محفوظ تہہ',
      descEn: 'Confined deep regional aquifer, high water safety.',
      descUr: 'مکمل محفوظ علاقائی آبستان، پینے کے لیے بہترین محفوظ پانی۔',
    },
  };

  return (
    <aside
      className={`fixed md:absolute bottom-0 md:bottom-auto md:top-5 right-0 md:right-5 z-40 w-full md:w-[380px] max-h-[82dvh] md:max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-t-[28px] md:rounded-[24px] bg-[#070b13]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-4 sm:p-5 text-white transition-all duration-300 ${
        isUrdu ? 'rtl text-right' : 'ltr text-left'
      } ${
        isResultPanelOpen
          ? 'translate-y-0 md:translate-x-0 opacity-100 pointer-events-auto'
          : 'translate-y-full md:translate-x-full opacity-0 pointer-events-none'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Mobile iOS Drag Handle */}
      <div className="w-9 h-1 bg-white/20 rounded-full mx-auto -mt-1 mb-3 md:hidden" />

      {/* 1. Header: exact place name, address context, coordinates */}
      <div className="space-y-1.5 pb-3.5 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          {/* Coordinates chip with tap-to-copy */}
          <button
            onClick={handleCopyCoords}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] font-mono tabular-nums text-white/70 transition-colors"
            title={isUrdu ? 'کوآرڈینیٹس کاپی کریں' : 'Click to copy coordinates'}
          >
            <span>{coordString || (isUrdu ? 'لوڈ ہو رہا ہے...' : 'Loading...')}</span>
            {copiedCoords ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-white/40" />
            )}
          </button>

          <button
            onClick={() => setResultPanelOpen(false)}
            className="w-7 h-7 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label={isUrdu ? 'بند کریں' : 'Close'}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Place Title */}
        {isLoadingGrid && !geocodedLocation ? (
          <div className="space-y-1 pt-1">
            <div className="h-6 w-3/4 rounded bg-white/[0.08] animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-white/[0.04] animate-pulse" />
          </div>
        ) : (
          <div className="pt-0.5">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              {geocodedLocation?.village || (isUrdu ? 'منتخب کردہ مقام' : 'Selected location')}
            </h2>
            <p className="text-xs text-white/50">
              {geocodedLocation?.formattedAddress || (isUrdu ? 'سندھ، پاکستان' : 'Sindh, Pakistan')}
            </p>
          </div>
        )}
      </div>

      {/* 2. iOS Segmented Control */}
      <div className="grid grid-cols-3 p-1 mt-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
        <button
          onClick={() => setActiveTab('overview')}
          className={`${isUrdu ? 'py-2 text-[13.5px]' : 'py-1.5 text-xs'} rounded-lg transition-all ${
            activeTab === 'overview'
              ? 'bg-white/15 text-white font-medium shadow-sm'
              : 'text-white/50 hover:text-white'
          }`}
        >
          {isUrdu ? 'جائزہ' : 'Overview'}
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`${isUrdu ? 'py-2 text-[13.5px]' : 'py-1.5 text-xs'} rounded-lg transition-all ${
            activeTab === 'profile'
              ? 'bg-white/15 text-white font-medium shadow-sm'
              : 'text-white/50 hover:text-white'
          }`}
        >
          {isUrdu ? 'گہرائی' : 'Depth profile'}
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`${isUrdu ? 'py-2 text-[13.5px]' : 'py-1.5 text-xs'} rounded-lg transition-all ${
            activeTab === 'simulator'
              ? 'bg-white/15 text-white font-medium shadow-sm'
              : 'text-white/50 hover:text-white'
          }`}
        >
          {isUrdu ? 'سمولیٹر' : 'Simulator'}
        </button>
      </div>

      {/* 3. Loading Shimmer */}
      {isLoadingGrid && (
        <div className="py-12 flex flex-col items-center justify-center space-y-2 text-center">
          <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
          <span className="text-xs text-white/50">
            {isUrdu ? 'ماڈل کی معلومات حاصل کی جا رہی ہیں...' : 'Fetching prediction from server...'}
          </span>
        </div>
      )}

      {/* 4. Error Message */}
      {!isLoadingGrid && errorMessage && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-500/[0.08] border border-rose-500/20 text-xs text-rose-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium">{isUrdu ? 'معلومات دستیاب نہیں' : 'Prediction unavailable'}</p>
            <p className="text-[11px] text-white/60 leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* 5. Main Content */}
      {!isLoadingGrid && gridPredictions && (
        <div className="mt-4 space-y-4">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Depth Selector Chips */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-white/40">
                  <span>{isUrdu ? 'گہرائی منتخب کریں' : 'Depth horizon'}</span>
                  <span className="tabular-nums font-mono">{selectedDepthMeters} m</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[30, 60, 100, 150, 200].map((depth) => {
                    const isSelected = selectedDepthMeters === depth;
                    const key = `${depth}m` as keyof typeof gridPredictions.depths;
                    const arsenic = gridPredictions.depths[key]?.arsenic_ugl ?? 0;
                    const category = getRiskCategory(arsenic);
                    const dotClass = RISK_THRESHOLDS[category].dotColor;

                    return (
                      <button
                        key={depth}
                        onClick={() => setSelectedDepthMeters(depth)}
                        className={`py-2 px-1 rounded-xl text-center transition-all ${
                          isSelected
                            ? 'bg-white/[0.12] border border-teal-400/60 text-white font-medium shadow-sm'
                            : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/60'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1 mb-0.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                          <span className="text-[11px] tabular-nums font-mono">{depth}m</span>
                        </div>
                        <span className="text-[10px] tabular-nums text-white/50 block">
                          {Math.round(arsenic)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Water Quality Metric */}
              <RiskGauge
                value={activeArsenic}
                depthMeters={selectedDepthMeters}
                isUrdu={isUrdu}
              />

              {/* Calm Recommendation Card */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{isUrdu ? 'محفوظ پانی کی تجویز کردہ گہرائی' : 'Safest drilling depth'}</span>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-emerald-300">
                    {safeDepth} {UNITS.DEPTH}
                  </span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  {gridPredictions.recommendation ||
                    (isUrdu
                      ? `محفوظ پانی کے لیے کم از کم ${safeDepth} میٹر گہرائی تک ڈرل کریں۔`
                      : `Drill to at least ${safeDepth} m to reach low-arsenic Pleistocene sand formation.`)}
                </p>
                {selectedDepthMeters !== safeDepth && (
                  <button
                    onClick={() => setSelectedDepthMeters(safeDepth)}
                    className="text-[11px] text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1 pt-1"
                  >
                    <span>{isUrdu ? `${safeDepth} میٹر کا جائزہ لیں` : `View ${safeDepth} m horizon`}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: DEPTH PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden text-xs">
                {([30, 60, 100, 150, 200] as const).map((depth) => {
                  const key = `${depth}m` as keyof typeof gridPredictions.depths;
                  const dData = gridPredictions.depths[key];
                  if (!dData) return null;
                  const isSelected = selectedDepthMeters === depth;
                  const category = getRiskCategory(dData.arsenic_ugl);
                  const info = RISK_THRESHOLDS[category];
                  const strata = strataInfo[depth];

                  return (
                    <button
                      key={depth}
                      onClick={() => setSelectedDepthMeters(depth)}
                      className={`w-full text-left px-3.5 py-3 transition-colors flex items-center justify-between gap-3 ${
                        isSelected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${info.dotColor}`} />
                          <span className="font-semibold text-white tabular-nums font-mono">
                            {depth} {UNITS.DEPTH}
                          </span>
                          <span className="text-white/40">·</span>
                          <span className="text-white/60">
                            {isUrdu ? strata?.titleUr : strata?.titleEn}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/40">
                          {isUrdu ? strata?.descUr : strata?.descEn}
                        </p>
                      </div>

                      <div className={`${isUrdu ? 'text-left' : 'text-right'} shrink-0`}>
                        <span className="text-xs font-semibold text-white tabular-nums font-mono block">
                          {dData.arsenic_ugl.toFixed(1)} {UNITS.ARSENIC}
                        </span>
                        <span className={`text-[10px] font-medium ${info.color}`}>
                          {isUrdu ? info.labelUr : info.labelEn}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">
                    {isUrdu ? 'مطلوبہ گہرائی منتخب کریں' : 'Simulated drilling depth'}
                  </span>
                  <span className="text-base font-semibold tabular-nums text-teal-400 font-mono">
                    {sliderDepth} {UNITS.DEPTH}
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={sliderDepth}
                  onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
                  className="w-full accent-teal-400 cursor-pointer h-2 bg-white/10 rounded-full appearance-none"
                />

                <div className="flex justify-between text-[10px] text-white/35 tabular-nums">
                  <span>10 m</span>
                  <span>{isUrdu ? '۱۵۰ میٹر (محفوظ ہدف)' : '150 m (Target)'}</span>
                  <span>300 m</span>
                </div>
              </div>

              {/* Simulator Result */}
              {isLoadingCustom ? (
                <div className="py-6 flex items-center justify-center gap-2 text-xs text-white/50">
                  <Loader2 className="w-3.5 h-3.5 text-teal-400 animate-spin" />
                  <span>{isUrdu ? 'حساب لگایا جا رہا ہے...' : 'Querying model...'}</span>
                </div>
              ) : customPrediction ? (
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">
                      {isUrdu ? 'متوقع آرسینک مقدار:' : 'Predicted arsenic:'}
                    </span>
                    <span className="text-sm font-semibold text-white tabular-nums font-mono">
                      {customPrediction.arsenic_ugl.toFixed(1)} {UNITS.ARSENIC}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">
                      {isUrdu ? 'عالمی ادارہ صحت معیار:' : 'WHO Guideline:'}
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        customPrediction.safe_who ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {customPrediction.safe_who
                        ? isUrdu
                          ? 'محفوظ (≤10 µg/L)'
                          : 'Safe (≤10 µg/L)'
                        : isUrdu
                        ? 'تجاوز شدہ (>10 µg/L)'
                        : 'Exceeds guideline'}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* 6. Footer Primary Action: Export Report */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => setExportModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-[#070b13] font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'رپورٹ حاصل کریں' : 'Export report'}</span>
            </button>

            <p className="text-[10px] text-white/45 text-center leading-normal px-2">
              {isUrdu
                ? 'ماڈل کی درستگی اور تخمینے کمپیوٹیشنل ماڈل ٹیسٹنگ سے حاصل کردہ ہیں نہ کہ فیلڈ ٹیسٹنگ سے۔ کنواں لگانے سے قبل لیب ٹیسٹ کرائیں۔'
                : 'Model accuracy and predictions are attained via computational model testing, not direct on-field testing. Laboratory testing is advised before drilling.'}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
