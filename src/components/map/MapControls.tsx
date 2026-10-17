import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { searchPlaces, PlaceSearchResult } from '../../services/geocoding';
import {
  Search,
  X,
  MapPin,
  Loader2,
  Building2,
  Landmark,
  Compass,
  RotateCcw,
  Layers,
  History,
  Trash2,
  Map,
  Globe,
} from 'lucide-react';

interface MapControlsProps {
  onFlyToCoords: (
    lat: number,
    lng: number,
    zoom?: number,
    bbox?: [number, number, number, number]
  ) => void;
  getMapCenter?: () => [number, number] | undefined;
}

const RECENT_SEARCHES_KEY = 'zeraab_recent_searches_v2';
const MAX_RECENT = 5;

function getResultIcon(type: PlaceSearchResult['type']) {
  switch (type) {
    case 'landmark':
      return <Landmark className="w-3.5 h-3.5 text-amber-400" />;
    case 'city':
    case 'town':
      return <Building2 className="w-3.5 h-3.5 text-teal-400" />;
    case 'coordinate':
      return <Compass className="w-3.5 h-3.5 text-cyan-400" />;
    default:
      return <MapPin className="w-3.5 h-3.5 text-white/50" />;
  }
}

export const MapControls: React.FC<MapControlsProps> = ({
  onFlyToCoords,
  getMapCenter,
}) => {
  const {
    userSettings,
    updateSettings,
    selectLocation,
    selectedCoords,
  } = useAppStore();

  const isUrdu = userSettings.language === 'ur';

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [results, setResults] = useState<PlaceSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Recent searches stored in localStorage
  const [recentSearches, setRecentSearches] = useState<PlaceSearchResult[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsLayersOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Save recent search
  const saveRecent = (item: PlaceSearchResult) => {
    const updated = [
      item,
      ...recentSearches.filter(
        (r) => r.id !== item.id && `${r.lat},${r.lng}` !== `${item.lat},${item.lng}`
      ),
    ].slice(0, MAX_RECENT);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {}
  };

  const clearRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {}
  };

  // Debounced search with AbortController
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsSearching(true);
    setSelectedIndex(-1);

    const timer = setTimeout(async () => {
      try {
        const center = getMapCenter?.();
        const res = await searchPlaces(trimmed, center, controller.signal);
        setResults(res);
      } catch (err: unknown) {
        if ((err as Error)?.name !== 'AbortError') {
          console.warn('Place search error:', err);
        }
      } finally {
        setIsSearching(false);
      }
    }, 220);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, getMapCenter]);

  const handleSelect = (item: PlaceSearchResult) => {
    saveRecent(item);

    // Determine contextual zoom by feature type
    let zoom = 12.5;
    if (item.type === 'street' || item.type === 'landmark') zoom = 15.5;
    else if (item.type === 'village' || item.type === 'coordinate') zoom = 13.5;
    else if (item.type === 'district') zoom = 9.5;

    onFlyToCoords(item.lat, item.lng, zoom, item.bbox);
    selectLocation(item.lng, item.lat, 'search', zoom);
    setQuery(item.name);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const list = query.trim().length >= 2 ? results : recentSearches;
    if (!isOpen || list.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < list.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : list.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = selectedIndex >= 0 ? list[selectedIndex] : list[0];
      if (target) handleSelect(target);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          onFlyToCoords(lat, lng, 13);
          selectLocation(lng, lat, 'map', 13);
        },
        () => {
          onFlyToCoords(25.8943, 68.5247, 7.5);
        }
      );
    }
  };

  // Helper to highlight matching text in search results
  const renderHighlightedName = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.trim()})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-white font-semibold underline decoration-teal-400/40">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  const showRecent = isOpen && query.trim().length < 2 && recentSearches.length > 0;
  const showResults = isOpen && query.trim().length >= 2;

  return (
    <div
      ref={containerRef}
      className={`absolute top-3 left-3 sm:top-5 sm:left-5 z-30 flex flex-col items-start gap-2 w-[calc(100vw-1.5rem)] sm:w-[360px] pointer-events-auto ${
        isUrdu ? 'rtl' : 'ltr'
      }`}
    >
      {/* 1. Restrained Search Bar */}
      <div className="relative w-full">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#070b13]/85 backdrop-blur-2xl border border-white/[0.08] shadow-sm transition-all focus-within:border-teal-400/50">
          {isSearching ? (
            <Loader2 className="w-4 h-4 text-teal-400 animate-spin shrink-0" />
          ) : (
            <Search className="w-4 h-4 text-white/40 shrink-0" />
          )}

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={
              isUrdu
                ? 'شہر، گاؤں، مقام یا کوآرڈینیٹس تلاش کریں...'
                : 'Search place, village, landmark or coords...'
            }
            className="w-full bg-transparent text-xs text-white placeholder-white/35 focus:outline-none"
          />

          {query && (
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
                setIsOpen(false);
              }}
              className="p-1 rounded-full text-white/40 hover:text-white transition-colors"
              aria-label="Clear"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 2. Dropdown: Results or Recent Searches */}
        {(showResults || showRecent) && (
          <div className="absolute top-full left-0 mt-2 w-full rounded-2xl bg-[#070b13]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.5)] p-2 z-50 max-h-[380px] overflow-y-auto">
            {/* Case A: Results */}
            {showResults && (
              <>
                {results.length > 0 ? (
                  <div className="space-y-0.5">
                    {results.map((item, idx) => {
                      const isSelected = selectedIndex === idx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-start gap-2.5 ${
                            isSelected ? 'bg-white/[0.1]' : 'hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">{getResultIcon(item.type)}</div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs text-white/90 block truncate">
                              {renderHighlightedName(item.name, query)}
                            </span>
                            <span className="text-[11px] text-white/40 block truncate">
                              {item.formattedAddress}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : isSearching ? (
                  <div className="py-6 text-center text-xs text-white/40">
                    {isUrdu ? 'تلاش جاری ہے...' : 'Searching places...'}
                  </div>
                ) : (
                  <div className="py-5 text-center text-xs text-white/40 px-3">
                    {isUrdu
                      ? 'کوئی نتیجہ نہیں ملا۔ درست ہجے یا کوآرڈینیٹس لکھیں۔'
                      : 'No places found. Check spelling or paste coordinates directly.'}
                  </div>
                )}
              </>
            )}

            {/* Case B: Recent Searches & Recent Locations */}
            {showRecent && (
              <div className="space-y-3">
                {recentSearches.length > 0 && (
                  <div className="space-y-1">
                    <div className="px-2.5 py-1 flex items-center justify-between text-[10px] text-white/35 font-medium">
                      <div className="flex items-center gap-1.5">
                        <History className="w-3 h-3 text-teal-400" />
                        <span>{isUrdu ? 'حالیہ تلاشیں' : 'Recent searches'}</span>
                      </div>
                      <button
                        onClick={clearRecent}
                        className="hover:text-white/60 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>{isUrdu ? 'صاف کریں' : 'Clear'}</span>
                      </button>
                    </div>

                    {recentSearches.map((item, idx) => {
                      const isSelected = selectedIndex === idx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-2.5 ${
                            isSelected ? 'bg-white/[0.1]' : 'hover:bg-white/[0.05]'
                          }`}
                        >
                          <History className="w-3.5 h-3.5 text-teal-400/70 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs text-white/80 block truncate">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-white/40 block truncate">
                              {item.formattedAddress}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Restrained Map Tool Buttons */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#070b13]/85 backdrop-blur-2xl border border-white/[0.08] shadow-sm">
        {/* Dark / Satellite Segmented Toggle */}
        <div className="flex items-center bg-white/[0.04] p-0.5 rounded-xl border border-white/[0.04]">
          <button
            onClick={() => updateSettings({ mapStyle: 'dark' })}
            className={`px-2.5 ${isUrdu ? 'py-1.5 text-xs' : 'py-1 text-[11px]'} rounded-lg font-medium flex items-center gap-1 transition-all ${
              userSettings.mapStyle !== 'satellite'
                ? 'bg-white/15 text-white font-medium shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Map className="w-3 h-3 text-teal-400" />
            <span>{isUrdu ? 'تاریک' : 'Dark'}</span>
          </button>
          <button
            onClick={() => updateSettings({ mapStyle: 'satellite' })}
            className={`px-2.5 ${isUrdu ? 'py-1.5 text-xs' : 'py-1 text-[11px]'} rounded-lg font-medium flex items-center gap-1 transition-all ${
              userSettings.mapStyle === 'satellite'
                ? 'bg-teal-400 text-[#070b13] font-semibold shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>{isUrdu ? 'سیٹلائٹ' : 'Satellite'}</span>
          </button>
        </div>

        <div className="h-4 w-[1px] bg-white/[0.08] mx-0.5" />

        {/* Layers toggle */}
        <button
          onClick={() => setIsLayersOpen(!isLayersOpen)}
          className={`p-1.5 rounded-xl text-xs flex items-center transition-all ${
            isLayersOpen ? 'bg-white/15 text-teal-400' : 'text-white/60 hover:text-white'
          }`}
          title={isUrdu ? 'تہیں دیکھیں' : 'Toggle Layers'}
          aria-label={isUrdu ? 'تہیں' : 'Layers'}
        >
          <Layers className="w-3.5 h-3.5" />
        </button>

        {/* Locate me */}
        <button
          onClick={handleGeolocation}
          className="p-1.5 rounded-xl text-white/60 hover:text-white transition-colors"
          title={isUrdu ? 'سندھ میں میرا مقام تلاش کریں' : 'Locate my position in Sindh'}
          aria-label={isUrdu ? 'میرا مقام' : 'Locate me'}
        >
          <Compass className="w-3.5 h-3.5" />
        </button>

        {/* Reset Sindh view */}
        <button
          onClick={() => onFlyToCoords(25.8943, 68.5247, 7.0)}
          className="p-1.5 rounded-xl text-white/60 hover:text-white transition-colors"
          title={isUrdu ? 'سندھ کے مرکزی منظر پر جائیں' : 'Reset to Sindh Province'}
          aria-label={isUrdu ? 'مرکزی منظر' : 'Reset view'}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. District markers popover */}
      {isLayersOpen && (
        <div
          className={`w-60 p-3 rounded-2xl bg-[#070b13]/95 backdrop-blur-2xl border border-white/[0.08] shadow-lg text-xs space-y-2.5 ${
            isUrdu ? 'rtl text-right' : 'ltr text-left'
          }`}
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.06]">
            <span className="font-medium text-white/80">
              {isUrdu ? 'نقشے کی تہیں' : 'Map layers'}
            </span>
            <button
              onClick={() => setIsLayersOpen(false)}
              className="text-white/40 hover:text-white text-xs"
              aria-label={isUrdu ? 'بند کریں' : 'Close'}
            >
              ✕
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">
              {isUrdu ? 'اضلاع کے مراکز' : 'District centers'}
            </span>
            <button
              onClick={() =>
                updateSettings({
                  showDistrictBorders: !userSettings.showDistrictBorders,
                })
              }
              className={`w-8 h-4.5 rounded-full transition-colors relative p-0.5 ${
                userSettings.showDistrictBorders ? 'bg-teal-400' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                  userSettings.showDistrictBorders ? 'translate-x-3.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
