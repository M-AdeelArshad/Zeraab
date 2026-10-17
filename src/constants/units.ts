/**
 * Single source of truth for units, risk thresholds, and scientific model benchmarks.
 */

export const UNITS = {
  ARSENIC: 'µg/L',
  DEPTH: 'm',
  DEPTH_FEET: 'ft',
} as const;

export const LIMITS = {
  WHO_ARSENIC_UGL: 10.0,
  PAKISTAN_PSQCA_UGL: 50.0,
  CRITICAL_UGL: 100.0,
} as const;

export type RiskCategory = 'SAFE' | 'CAUTION' | 'UNSAFE' | 'CRITICAL';

export const RISK_THRESHOLDS: Record<
  RiskCategory,
  {
    labelEn: string;
    labelUr: string;
    color: string;
    dotColor: string;
    descriptionEn: string;
    descriptionUr: string;
  }
> = {
  SAFE: {
    labelEn: 'Safe',
    labelUr: 'محفوظ',
    color: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
    descriptionEn: 'Within WHO & Pakistan drinking water guidelines (<10 µg/L)',
    descriptionUr: 'عالمی ادارہ صحت اور پاکستان کے معیار کے مطابق (<10 µg/L)',
  },
  CAUTION: {
    labelEn: 'Caution',
    labelUr: 'احتیاط',
    color: 'text-amber-400',
    dotColor: 'bg-amber-400',
    descriptionEn: 'Exceeds WHO 10 µg/L guideline; acceptable under PSQCA 50 µg/L',
    descriptionUr: 'عالمی ادارہ صحت کے 10 µg/L معیار سے زیادہ لیکن پی ایس کیو سی اے کے مطابق',
  },
  UNSAFE: {
    labelEn: 'Unsafe',
    labelUr: 'غیر محفوظ',
    color: 'text-orange-400',
    dotColor: 'bg-orange-400',
    descriptionEn: 'Exceeds Pakistan national standard (50–100 µg/L)',
    descriptionUr: 'پاکستان کے قومی معیار سے تجاوز (50–100 µg/L)',
  },
  CRITICAL: {
    labelEn: 'Critical',
    labelUr: 'شدید خطرہ',
    color: 'text-rose-400',
    dotColor: 'bg-rose-500',
    descriptionEn: 'Severe arsenic contamination (>100 µg/L)',
    descriptionUr: 'آرسینک کی شدید آلودگی (>100 µg/L)',
  },
};

export function getRiskCategory(val: number): RiskCategory {
  if (val <= LIMITS.WHO_ARSENIC_UGL) return 'SAFE';
  if (val <= LIMITS.PAKISTAN_PSQCA_UGL) return 'CAUTION';
  if (val <= LIMITS.CRITICAL_UGL) return 'UNSAFE';
  return 'CRITICAL';
}

/**
 * Reconciled scientific metadata matching the active Railway backend v2 model
 * Source: Backend /summary endpoint and hydrogeological publication specifications
 */
export const MODEL_METADATA = {
  version: 'v2.0.0 (3D Stratified Hydrogeology)',
  totalGridCells: '4.36M',
  totalGridCellsExact: 4360734,
  spatialResolution: '250 m',
  accuracyR2: '0.9463',
  modelRMSE: '7.12 µg/L',
  architecture: 'Stacked LightGBM / XGBoost / Random Forest Ensemble',
  trainingSamples: '15,727 PCRWR water quality records',
  environmentalCovariates: 6,
  depthHorizonsMeters: [30, 60, 100, 150, 200],
  safeAquiferFormation: 'Deep Pleistocene Sand Strata (≥150 m)',
  targetSafeDepthMeters: 150,
} as const;
