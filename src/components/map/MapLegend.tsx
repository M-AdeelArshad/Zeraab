import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { UNITS } from '../../constants/units';

export const MapLegend: React.FC = () => {
  const { userSettings } = useAppStore();
  const isUrdu = userSettings.language === 'ur';

  return (
    <div
      className={`hidden sm:flex items-center gap-4 absolute bottom-5 left-20 lg:left-24 z-20 px-3.5 py-1.5 rounded-full bg-[#070b13]/80 backdrop-blur-xl border border-white/[0.08] shadow-sm text-xs text-white/70 select-none ${
        isUrdu ? 'rtl' : 'ltr'
      }`}
    >
      <span className="text-[11px] text-white/40 font-medium">
        {isUrdu ? 'پانی کا معیار:' : 'WHO standard:'}
      </span>

      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-[11px] text-white/70 tabular-nums">
          &lt;10 {UNITS.ARSENIC}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="text-[11px] text-white/70 tabular-nums">10–50</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-orange-400" />
        <span className="text-[11px] text-white/70 tabular-nums">50–100</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-rose-500" />
        <span className="text-[11px] text-white/70 tabular-nums">&gt;100</span>
      </div>
    </div>
  );
};
