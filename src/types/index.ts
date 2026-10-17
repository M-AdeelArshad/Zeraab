export type RiskLevel = 'SAFE' | 'CAUTION' | 'UNSAFE' | 'CRITICAL';

export interface DepthPrediction {
  depth_m: number;
  arsenic_ugl: number;
  safe_who: boolean;
  safe_pakistan: boolean;
  risk_level: RiskLevel;
}

export interface GridPredictionResponse {
  latitude: number;
  longitude: number;
  depths: {
    '30m': DepthPrediction;
    '60m': DepthPrediction;
    '100m': DepthPrediction;
    '150m': DepthPrediction;
    '200m': DepthPrediction;
  };
  safe_depth_m: number | null;
  safe_available: boolean;
  recommendation: string;
  who_limit_ugl: number;
  pakistan_limit_ugl: number;
}

export interface SingleDepthPrediction {
  depth_m: number;
  arsenic_ugl: number;
  safe_who: boolean;
  safe_pakistan: boolean;
  risk_level: RiskLevel;
  latitude: number;
  longitude: number;
  note?: string;
}

export interface ChemistryMedians {
  lo: number;
  hi: number;
  iron_mg_l: number;
  ph: number;
  manganese_mg_l: number;
}

export interface DepthSummaryStat {
  safe_pct: number;
  mean_ugl: number;
  median_ugl: number;
  max_ugl: number;
  p95_ugl: number;
}

export interface BackendSummary {
  version: string;
  total_cells: number;
  scale_m: number;
  depth_chemistry_medians: {
    shallow: ChemistryMedians;
    medium: ChemistryMedians;
    deep: ChemistryMedians;
  };
  per_depth: {
    '30m': DepthSummaryStat;
    '60m': DepthSummaryStat;
    '100m': DepthSummaryStat;
    '150m': DepthSummaryStat;
    '200m': DepthSummaryStat;
  };
  safe_depth_distribution: Record<string, number>;
  no_safe_depth_pct: number;
  risk_60m_distribution: Record<string, number>;
}

export interface HealthStatus {
  status: string;
  db_rows: number;
  db_size_mb: number;
}

export interface GeocodedLocation {
  village?: string;
  subdistrict?: string;
  district: string;
  province: string;
  country: string;
  formattedAddress: string;
}

export interface SindhDistrict {
  id: string;
  name: string;
  nameUrdu: string;
  headquarters: string;
  division: string;
  lat: number;
  lon: number;
  population?: string;
  avgShallowArsenic?: number;
  typicalSafeDepth?: number;
  riskCategory: RiskLevel;
}

export type AppLanguage = 'en' | 'ur';
export type AppTheme = 'dark' | 'auto';
export type MapStyleType = 'dark' | 'satellite' | 'terrain' | 'streets';
export type ArsenicUnit = 'ug/L' | 'ppb';

export interface UserSettings {
  language: AppLanguage;
  theme: AppTheme;
  mapStyle: MapStyleType;
  unit: ArsenicUnit;
  overlayOpacity: number;
  showRiskOverlay: boolean;
  showRiverBasin: boolean;
  showDistrictBorders: boolean;
  animationsEnabled: boolean;
  mapboxToken: string;
}
