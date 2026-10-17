import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { GridPredictionResponse } from '../../types';

interface DepthStrataProps {
  grid: GridPredictionResponse | null;
  activeDepth: number;
  onSelectDepth: (depth: number) => void;
}

export const DepthStrataCrossSection: React.FC<DepthStrataProps> = ({
  grid,
  activeDepth,
  onSelectDepth,
}) => {
  const { userSettings } = useAppStore();
  const isUrdu = userSettings.language === 'ur';
  const safeDepth = grid?.safe_depth_m || 150;

  const strataLayers = [
    {
      depthRange: '0 – 40m',
      layerName: 'Holocene Alluvium & Silt',
      chemistry: 'Fe-reducing, pH 7.8, High Org-C',
      arsenicTypical: '180 – 350 µg/L',
      status: 'CRITICAL',
      color: 'from-rose-950/60 to-rose-900/30',
      borderColor: 'border-rose-500/30',
      dotColor: 'bg-rose-500',
      depthValue: 30,
    },
    {
      depthRange: '40 – 100m',
      layerName: 'Transitional Fine Sands',
      chemistry: 'Semioxic, pH 7.5, Fe 0.8 mg/L',
      arsenicTypical: '20 – 45 µg/L',
      status: 'CAUTION',
      color: 'from-amber-950/50 to-amber-900/20',
      borderColor: 'border-amber-500/30',
      dotColor: 'bg-amber-400',
      depthValue: 60,
    },
    {
      depthRange: '100 – 150m',
      layerName: 'Upper Pleistocene Sand & Clay',
      chemistry: 'Oxidized, pH 7.3, Low Fe',
      arsenicTypical: '15 – 25 µg/L',
      status: 'CAUTION',
      color: 'from-blue-950/50 to-cyan-950/20',
      borderColor: 'border-cyan-500/30',
      dotColor: 'bg-cyan-400',
      depthValue: 100,
    },
    {
      depthRange: '150 – 300m',
      layerName: 'Deep Pleistocene Gravel Aquifer',
      chemistry: 'Confined Paleochannel, Safe Artesian',
      arsenicTypical: '3.5 – 6.0 µg/L',
      status: 'SAFE',
      color: 'from-emerald-950/60 to-teal-900/30',
      borderColor: 'border-emerald-500/40',
      dotColor: 'bg-emerald-400',
      depthValue: 150,
      isRecommendedSafe: true,
    },
  ];

  return (
    <div className="p-4 rounded-2xl bg-[#071827]/80 border border-white/8 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
          {isUrdu ? 'ہائیڈروجیولوجیکل تہوں کا پروفائل' : 'Hydrogeological Strata Profile'}
        </h4>
        <span className="text-[10px] font-mono text-[#00D4C8] bg-[#00D4C8]/10 px-2 py-0.5 rounded border border-[#00D4C8]/20">
          {isUrdu ? `محفوظ ہدف: ≥${safeDepth} میٹر` : `Target Safe: ≥${safeDepth}m`}
        </span>
      </div>

      <div className="space-y-2 relative">
        {strataLayers.map((layer) => {
          const isCurrentSelected = Math.abs(activeDepth - layer.depthValue) < 20;
          return (
            <button
              key={layer.depthRange}
              onClick={() => onSelectDepth(layer.depthValue)}
              className={`w-full text-left p-2.5 rounded-xl border transition-all relative overflow-hidden bg-gradient-to-r ${layer.color} ${
                isCurrentSelected
                  ? 'border-[#00D4C8] ring-1 ring-[#00D4C8]/50 shadow-md shadow-[#00D4C8]/10'
                  : `${layer.borderColor} hover:border-white/20`
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${layer.dotColor}`} />
                    <span className="text-xs font-semibold text-white">
                      {layer.layerName}
                    </span>
                    {layer.isRecommendedSafe && (
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-500/30">
                        {isUrdu ? 'محفوظ ہدف' : 'SAFE TARGET'}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-white/50 font-mono mt-0.5">
                    {layer.chemistry}
                  </p>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-white block">
                    {layer.depthRange}
                  </span>
                  <span className="text-[10px] text-white/60">
                    {layer.arsenicTypical}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
