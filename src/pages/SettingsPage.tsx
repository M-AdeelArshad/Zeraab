import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { UNITS } from '../constants/units';
import {
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { userSettings, updateSettings } = useAppStore();
  const isUrdu = userSettings.language === 'ur';

  const handleResetDefaults = () => {
    updateSettings({
      language: 'en',
      theme: 'dark',
      mapStyle: 'dark',
      unit: 'ug/L',
      overlayOpacity: 0.35,
      showRiskOverlay: false,
      showRiverBasin: false,
      showDistrictBorders: true,
      animationsEnabled: true,
    });
  };

  return (
    <div
      className={`w-full max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-16 space-y-10 sm:space-y-12 text-white text-left ${
        isUrdu ? 'rtl text-right' : 'ltr text-left'
      }`}
    >
      {/* Header */}
      <div className="space-y-2 border-b border-white/[0.08] pb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          {isUrdu ? 'ترتیبات' : 'Settings'}
        </h1>
        <p className="text-xs text-white/50">
          {isUrdu
            ? 'نقشہ اور انٹرفیس کی ترجیحات مرتب کریں۔'
            : 'Preferences for map visualization and language localization.'}
        </p>
      </div>

      <div className="space-y-4">
        {/* 1. Language & Localization */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-white">
              {isUrdu ? 'زبان' : 'Language'}
            </h3>
            <p className="text-[11px] text-white/40">
              {isUrdu ? 'انٹرفیس اور رپورٹ کی زبان' : 'Interface and guidance language'}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
            <button
              onClick={() => updateSettings({ language: 'en' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                userSettings.language === 'en'
                  ? 'bg-teal-400 text-[#070b13] font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => updateSettings({ language: 'ur' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-urdu transition-all ${
                userSettings.language === 'ur'
                  ? 'bg-teal-400 text-[#070b13] font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              اردو
            </button>
          </div>
        </div>

        {/* 2. Map Visual Style */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-white">
              {isUrdu ? 'نقشے کا انداز' : 'Default map style'}
            </h3>
            <p className="text-[11px] text-white/40">
              {isUrdu ? 'تاریک ویکٹر یا سیٹلائٹ منظر' : 'Mapbox dark vector or high-resolution satellite imagery'}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
            <button
              onClick={() => updateSettings({ mapStyle: 'dark' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                userSettings.mapStyle === 'dark'
                  ? 'bg-teal-400 text-[#070b13] font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {isUrdu ? 'تاریک' : 'Dark'}
            </button>
            <button
              onClick={() => updateSettings({ mapStyle: 'satellite' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                userSettings.mapStyle === 'satellite'
                  ? 'bg-teal-400 text-[#070b13] font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {isUrdu ? 'سیٹلائٹ' : 'Satellite'}
            </button>
          </div>
        </div>

        {/* 3. Measurement Units */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-white">
              {isUrdu ? 'پیمائش کی اکائی' : 'Concentration unit'}
            </h3>
            <p className="text-[11px] text-white/40">
              {isUrdu
                ? `پینے کے پانی کا معیاری سائنسی پیمانہ (${UNITS.ARSENIC})`
                : `Standard scientific drinking water benchmark (${UNITS.ARSENIC})`}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
            {(['ug/L', 'ppb'] as const).map((unit) => (
              <button
                key={unit}
                onClick={() => updateSettings({ unit })}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  userSettings.unit === unit
                    ? 'bg-teal-400 text-[#070b13] font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {unit === 'ug/L' ? 'µg/L' : 'ppb'}
              </button>
            ))}
          </div>
        </div>

        {/* 4. District Boundary Centroids */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-white">
              {isUrdu ? 'ضلعی مراکز' : 'District markers'}
            </h3>
            <p className="text-[11px] text-white/40">
              {isUrdu ? 'نقشے پر سندھ کے اضلاع کے بیج دکھائیں' : 'Display clickable district centroid markers across Sindh'}
            </p>
          </div>

          <button
            onClick={() =>
              updateSettings({
                showDistrictBorders: !userSettings.showDistrictBorders,
              })
            }
            className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
              userSettings.showDistrictBorders ? 'bg-teal-400' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#070b13] transition-transform ${
                userSettings.showDistrictBorders ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Reset Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-white/70 hover:text-white flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'پہلے جیسی حالت پر لائیں' : 'Reset defaults'}</span>
          </button>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'ترتیبات محفوظ ہیں' : 'Preferences saved'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
