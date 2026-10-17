import React from 'react';
import { UNITS, LIMITS, getRiskCategory, RISK_THRESHOLDS } from '../../constants/units';
import { Check, X } from 'lucide-react';

interface RiskGaugeProps {
  value: number; // in µg/L
  depthMeters?: number;
  isUrdu?: boolean;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  value,
  depthMeters = 30,
  isUrdu = false,
}) => {
  const category = getRiskCategory(value);
  const info = RISK_THRESHOLDS[category];

  const whoRatio = (value / LIMITS.WHO_ARSENIC_UGL).toFixed(1);
  const pakRatio = (value / LIMITS.PAKISTAN_PSQCA_UGL).toFixed(1);

  const passesWho = value <= LIMITS.WHO_ARSENIC_UGL;
  const passesPak = value <= LIMITS.PAKISTAN_PSQCA_UGL;

  // Single progress percentage capped at 120 µg/L for the bar width
  const percent = Math.min(100, Math.max(3, (value / 120) * 100));

  return (
    <div className="space-y-4">
      {/* 1. Hero Number with Single Calm Dot */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-white tabular-nums">
            {value.toFixed(1)}
          </span>
          <span className="text-sm font-medium text-white/50">{UNITS.ARSENIC}</span>
        </div>

        {/* Quiet status line */}
        <div className="flex items-center gap-2 text-xs">
          <span className={`w-2 h-2 rounded-full shrink-0 ${info.dotColor}`} />
          <span className={`font-medium ${info.color}`}>
            {isUrdu ? info.labelUr : info.labelEn}
          </span>
          <span className="text-white/40">·</span>
          <span className="text-white/60">
            {passesWho
              ? isUrdu
                ? 'عالمی ادارہ صحت کے معیار کے اندر'
                : 'Within WHO drinking limit'
              : isUrdu
              ? `${whoRatio}× عالمی معیار سے زیادہ`
              : `${whoRatio}× the WHO guideline`}
          </span>
        </div>
      </div>

      {/* 2. Thin Single-Color Progress Indicator */}
      <div className="space-y-1 pt-1">
        <div className="relative h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${info.dotColor}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-white/35 tabular-nums">
          <span>0</span>
          <span>{isUrdu ? '10 (ڈبلیو ایچ او)' : '10 (WHO)'}</span>
          <span>{isUrdu ? '50 (پاک)' : '50 (Pak)'}</span>
          <span>100+</span>
        </div>
      </div>

      {/* 3. Inset-Grouped List: Standards Comparison */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden text-xs">
        <div className="flex items-center justify-between px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                passesWho ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
              }`}
            >
              {passesWho ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
            </div>
            <span className="text-white/70">
              {isUrdu ? `عالمی ادارہ صحت کی حد (10 ${UNITS.ARSENIC})` : `WHO Guideline (10 ${UNITS.ARSENIC})`}
            </span>
          </div>
          <span className="tabular-nums font-medium text-white/90">
            {passesWho ? (isUrdu ? 'محفوظ (پاس)' : 'Complies') : `${whoRatio}×`}
          </span>
        </div>

        <div className="flex items-center justify-between px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                passesPak ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
              }`}
            >
              {passesPak ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
            </div>
            <span className="text-white/70">
              {isUrdu ? `پاکستان کا قومی معیار (50 ${UNITS.ARSENIC})` : `Pakistan Standard (50 ${UNITS.ARSENIC})`}
            </span>
          </div>
          <span className="tabular-nums font-medium text-white/90">
            {passesPak ? (isUrdu ? 'محفوظ (پاس)' : 'Complies') : `${pakRatio}×`}
          </span>
        </div>
      </div>
    </div>
  );
};
