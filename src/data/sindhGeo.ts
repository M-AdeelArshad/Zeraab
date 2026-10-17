import { SindhDistrict } from '../types';
import { SINDH_DETAILED_BOUNDARY } from './sindhDetailedBoundary';

// Bounding box for Sindh province
export const SINDH_BOUNDS = {
  minLat: 23.50,
  maxLat: 28.52,
  minLon: 66.60,
  maxLon: 71.12,
  centerLat: 25.8943,
  centerLon: 68.5247,
};

// Mapbox camera panning bounds (Southwest: [lon, lat], Northeast: [lon, lat])
export const SINDH_MAP_MAX_BOUNDS: [[number, number], [number, number]] = [
  [65.8, 23.2], // Southwest
  [71.8, 28.9], // Northeast
];

// Check if coordinates are strictly within Sindh's geographical limits
export function isInsideSindh(lat: number, lon: number): boolean {
  // 1. Primary bounding box test
  if (
    lat < SINDH_BOUNDS.minLat ||
    lat > SINDH_BOUNDS.maxLat ||
    lon < SINDH_BOUNDS.minLon ||
    lon > SINDH_BOUNDS.maxLon
  ) {
    return false;
  }

  // 2. High-precision point-in-polygon containment check
  return isPointInPolygon([lon, lat], SINDH_EXACT_POLYGON_COORDS);
}

// Ray-casting algorithm for point-in-polygon
function isPointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];

    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// High-precision Sindh Provincial Boundary Polygon ([lon, lat])
// Aligned with the exact vector SVG outline of Sindh
export const SINDH_EXACT_POLYGON_COORDS: [number, number][] = SINDH_DETAILED_BOUNDARY;

// District directory for Sindh
export const SINDH_DISTRICTS: SindhDistrict[] = [
  {
    id: 'karachi_central',
    name: 'Karachi Central',
    nameUrdu: 'کراچی وسطی',
    headquarters: 'Karachi',
    division: 'Karachi',
    lat: 24.9312,
    lon: 67.0375,
    population: '3.8M',
    avgShallowArsenic: 82.4,
    typicalSafeDepth: 150,
    riskCategory: 'UNSAFE',
  },
  {
    id: 'karachi_east',
    name: 'Karachi East',
    nameUrdu: 'کراچی شرقی',
    headquarters: 'Gulshan-e-Iqbal',
    division: 'Karachi',
    lat: 24.8918,
    lon: 67.1120,
    population: '3.9M',
    avgShallowArsenic: 74.1,
    typicalSafeDepth: 150,
    riskCategory: 'UNSAFE',
  },
  {
    id: 'karachi_south',
    name: 'Karachi South',
    nameUrdu: 'کراچی جنوبی',
    headquarters: 'Saddar',
    division: 'Karachi',
    lat: 24.8569,
    lon: 67.0143,
    population: '2.3M',
    avgShallowArsenic: 68.5,
    typicalSafeDepth: 150,
    riskCategory: 'UNSAFE',
  },
  {
    id: 'karachi_west',
    name: 'Karachi West',
    nameUrdu: 'کراچی غربی',
    headquarters: 'Orangi',
    division: 'Karachi',
    lat: 24.9450,
    lon: 66.9740,
    population: '2.7M',
    avgShallowArsenic: 89.2,
    typicalSafeDepth: 150,
    riskCategory: 'UNSAFE',
  },
  {
    id: 'malir',
    name: 'Malir',
    nameUrdu: 'ملیر',
    headquarters: 'Malir',
    division: 'Karachi',
    lat: 24.8967,
    lon: 67.2023,
    population: '2.4M',
    avgShallowArsenic: 96.0,
    typicalSafeDepth: 150,
    riskCategory: 'UNSAFE',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    nameUrdu: 'حیدرآباد',
    headquarters: 'Hyderabad',
    division: 'Hyderabad',
    lat: 25.3960,
    lon: 68.3578,
    population: '2.4M',
    avgShallowArsenic: 194.5,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'sukkur',
    name: 'Sukkur',
    nameUrdu: 'سکھر',
    headquarters: 'Sukkur',
    division: 'Sukkur',
    lat: 27.7139,
    lon: 68.8478,
    population: '1.6M',
    avgShallowArsenic: 212.0,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'larkana',
    name: 'Larkana',
    nameUrdu: 'لاڑکانہ',
    headquarters: 'Larkana',
    division: 'Larkana',
    lat: 27.5590,
    lon: 68.2120,
    population: '1.8M',
    avgShallowArsenic: 245.3,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'khairpur',
    name: 'Khairpur',
    nameUrdu: 'خیرپور',
    headquarters: 'Khairpur',
    division: 'Sukkur',
    lat: 27.5295,
    lon: 68.7592,
    population: '2.6M',
    avgShallowArsenic: 278.4,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'shaheed_benazirabad',
    name: 'Shaheed Benazirabad (Nawabshah)',
    nameUrdu: 'شہید بینظیر آباد',
    headquarters: 'Nawabshah',
    division: 'Shaheed Benazirabad',
    lat: 26.2483,
    lon: 68.4096,
    population: '1.8M',
    avgShallowArsenic: 260.1,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'dadu',
    name: 'Dadu',
    nameUrdu: 'دادو',
    headquarters: 'Dadu',
    division: 'Hyderabad',
    lat: 26.7341,
    lon: 67.7795,
    population: '1.7M',
    avgShallowArsenic: 185.0,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'ghotki',
    name: 'Ghotki',
    nameUrdu: 'گھوٹکی',
    headquarters: 'Mirpur Mathelo',
    division: 'Sukkur',
    lat: 28.0064,
    lon: 69.3161,
    population: '1.8M',
    avgShallowArsenic: 298.6,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'jacobabad',
    name: 'Jacobabad',
    nameUrdu: 'جیکب آباد',
    headquarters: 'Jacobabad',
    division: 'Larkana',
    lat: 28.2835,
    lon: 68.4388,
    population: '1.1M',
    avgShallowArsenic: 165.2,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'shikarpur',
    name: 'Shikarpur',
    nameUrdu: 'شکارپور',
    headquarters: 'Shikarpur',
    division: 'Larkana',
    lat: 27.9570,
    lon: 68.6378,
    population: '1.3M',
    avgShallowArsenic: 215.8,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'sanghar',
    name: 'Sanghar',
    nameUrdu: 'سانگھڑ',
    headquarters: 'Sanghar',
    division: 'Shaheed Benazirabad',
    lat: 26.0464,
    lon: 68.9493,
    population: '2.3M',
    avgShallowArsenic: 142.3,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'mirpur_khas',
    name: 'Mirpur Khas',
    nameUrdu: 'میرپور خاص',
    headquarters: 'Mirpur Khas',
    division: 'Mirpur Khas',
    lat: 25.5276,
    lon: 69.0159,
    population: '1.7M',
    avgShallowArsenic: 110.5,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'tharparkar',
    name: 'Tharparkar',
    nameUrdu: 'تھرپارکر',
    headquarters: 'Mithi',
    division: 'Mirpur Khas',
    lat: 24.7438,
    lon: 69.8000,
    population: '1.8M',
    avgShallowArsenic: 48.0,
    typicalSafeDepth: 150,
    riskCategory: 'CAUTION',
  },
  {
    id: 'umerkot',
    name: 'Umerkot',
    nameUrdu: 'عمرکوٹ',
    headquarters: 'Umerkot',
    division: 'Mirpur Khas',
    lat: 25.3549,
    lon: 69.7376,
    population: '1.2M',
    avgShallowArsenic: 65.4,
    typicalSafeDepth: 150,
    riskCategory: 'UNSAFE',
  },
  {
    id: 'badin',
    name: 'Badin',
    nameUrdu: 'بدین',
    headquarters: 'Badin',
    division: 'Hyderabad',
    lat: 24.6560,
    lon: 68.8370,
    population: '2.0M',
    avgShallowArsenic: 135.0,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'thatta',
    name: 'Thatta',
    nameUrdu: 'ٹھٹھہ',
    headquarters: 'Thatta',
    division: 'Banbhore',
    lat: 24.7475,
    lon: 67.9235,
    population: '1.1M',
    avgShallowArsenic: 155.2,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'sujawal',
    name: 'Sujawal',
    nameUrdu: 'سجاول',
    headquarters: 'Sujawal',
    division: 'Banbhore',
    lat: 24.6042,
    lon: 68.0778,
    population: '880K',
    avgShallowArsenic: 148.0,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'jamshoro',
    name: 'Jamshoro',
    nameUrdu: 'جامشورو',
    headquarters: 'Kotri',
    division: 'Hyderabad',
    lat: 25.4300,
    lon: 68.2800,
    population: '1.1M',
    avgShallowArsenic: 162.0,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'matiari',
    name: 'Matiari',
    nameUrdu: 'مٹیاری',
    headquarters: 'Matiari',
    division: 'Hyderabad',
    lat: 25.5971,
    lon: 68.4467,
    population: '840K',
    avgShallowArsenic: 210.4,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'tando_allahyar',
    name: 'Tando Allahyar',
    nameUrdu: 'ٹنڈو الہ یار',
    headquarters: 'Tando Allahyar',
    division: 'Hyderabad',
    lat: 25.4605,
    lon: 68.7176,
    population: '920K',
    avgShallowArsenic: 178.9,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'tando_muhammad_khan',
    name: 'Tando Muhammad Khan',
    nameUrdu: 'ٹنڈو محمد خان',
    headquarters: 'Tando Muhammad Khan',
    division: 'Hyderabad',
    lat: 25.1238,
    lon: 68.5372,
    population: '770K',
    avgShallowArsenic: 168.2,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'naushahro_feroze',
    name: 'Naushahro Feroze',
    nameUrdu: 'نوشہرو فیروز',
    headquarters: 'Naushahro Feroze',
    division: 'Shaheed Benazirabad',
    lat: 26.8463,
    lon: 68.1253,
    population: '1.8M',
    avgShallowArsenic: 265.0,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'kashmore',
    name: 'Kashmore',
    nameUrdu: 'کشمور',
    headquarters: 'Kandhkot',
    division: 'Larkana',
    lat: 28.4324,
    lon: 69.5841,
    population: '1.2M',
    avgShallowArsenic: 284.1,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
  {
    id: 'kambar_shahdadkot',
    name: 'Kambar Shahdadkot',
    nameUrdu: 'قمبر شہدادکوٹ',
    headquarters: 'Kambar',
    division: 'Larkana',
    lat: 27.5878,
    lon: 67.9984,
    population: '1.5M',
    avgShallowArsenic: 198.3,
    typicalSafeDepth: 150,
    riskCategory: 'CRITICAL',
  },
];

export function getNearestDistrictName(lat: number, lon: number): string {
  let closest = SINDH_DISTRICTS[0];
  let minD = 999999;
  for (const d of SINDH_DISTRICTS) {
    const dist = Math.hypot(lat - d.lat, lon - d.lon);
    if (dist < minD) {
      minD = dist;
      closest = d;
    }
  }
  return closest.name;
}
