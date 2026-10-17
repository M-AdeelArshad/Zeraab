import { USER_MAPBOX_TOKEN } from '../store/useAppStore';
import { SINDH_BOUNDS, isInsideSindh, SINDH_DISTRICTS } from '../data/sindhGeo';
import { SINDH_CURATED_LOCATIONS } from '../data/sindhLocations';

export interface SindhSearchResult {
  id: string;
  name: string;
  nameUrdu?: string;
  subtitle: string;
  type: string;
  lat: number;
  lon: number;
  importance?: number;
  source: 'curated' | 'mapbox' | 'osm';
}

// Memory cache for frequent queries to avoid redundant network calls
const searchCache = new Map<string, SindhSearchResult[]>();

// Format OpenStreetMap / Nominatim type into a clean, Google Maps-like category label
function formatOsmType(item: any): string {
  const cls = (item.class || '').toLowerCase();
  const typ = (item.type || '').toLowerCase();

  if (cls === 'amenity') {
    if (['hospital', 'clinic', 'doctors', 'pharmacy'].includes(typ)) return 'Hospital / Medical';
    if (['university', 'college', 'school'].includes(typ)) return 'University / College';
    if (['place_of_worship', 'shrine'].includes(typ)) return 'Shrine / Landmark';
    if (['marketplace', 'restaurant', 'bank'].includes(typ)) return 'Commercial / Amenity';
    return 'Public Facility';
  }
  if (cls === 'historic' || cls === 'tourism') {
    if (['attraction', 'museum', 'monument', 'memorial', 'shrine', 'pillory'].includes(typ)) return 'Historical Landmark';
    if (['hotel', 'guest_house'].includes(typ)) return 'Hotel / Lodging';
    return 'Tourist Landmark';
  }
  if (cls === 'shop') {
    if (typ === 'mall' || typ === 'supermarket') return 'Shopping Mall';
    return 'Commercial Area';
  }
  if (cls === 'leisure') {
    if (['park', 'garden', 'stadium', 'sports_centre'].includes(typ)) return 'Park / Sports';
    return 'Recreation';
  }
  if (cls === 'natural' || cls === 'water') {
    if (['water', 'lake', 'bay', 'wetland'].includes(typ)) return 'Waterbody / Lake';
    if (['peak', 'hill', 'ridge'].includes(typ)) return 'Mountain / Hill';
    return 'Natural Feature';
  }
  if (cls === 'place') {
    if (typ === 'city') return 'City';
    if (typ === 'town') return 'Town';
    if (typ === 'suburb') return 'Subdivision / Town';
    if (['neighbourhood', 'quarter'].includes(typ)) return 'Neighborhood';
    if (['village', 'hamlet', 'isolated_dwelling'].includes(typ)) return 'Village';
    return 'Locality';
  }
  if (cls === 'highway' || cls === 'aeroway' || cls === 'railway') {
    if (typ === 'aerodrome' || typ === 'terminal') return 'Airport';
    if (typ === 'station') return 'Railway Station';
    return 'Road / Highway';
  }
  if (cls === 'boundary' && typ === 'administrative') {
    return 'Administrative Area';
  }
  return 'Point of Interest';
}

/**
 * Searches for ANY location, place, landmark, town, village, or address in Sindh Province
 * with ultra-high precision, exactly like Google Maps.
 *
 * Employs a parallel dual-engine (OSM Nominatim + Mapbox Places) bounded strictly to Sindh,
 * combined with local instant lookup and point-in-polygon verification.
 */
export async function searchSindhLocations(
  rawQuery: string,
  signal?: AbortSignal
): Promise<SindhSearchResult[]> {
  const query = rawQuery.trim();
  if (!query || query.length < 2) {
    return [];
  }

  const cacheKey = query.toLowerCase();
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey)!;
  }

  const qLower = query.toLowerCase();
  const results: SindhSearchResult[] = [];
  const seenCoordinates = new Set<string>();
  const seenNames = new Set<string>();

  // Helper to add and deduplicate results strictly inside Sindh
  const addResult = (item: SindhSearchResult) => {
    // 1. Strict Sindh verification
    if (!isInsideSindh(item.lat, item.lon)) {
      return;
    }

    // 2. Normalization keys (within ~1.5km or exact normalized name)
    const coordKey = `${item.lat.toFixed(2)},${item.lon.toFixed(2)}`;
    const nameKey = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (seenCoordinates.has(coordKey) || (seenNames.has(nameKey) && seenCoordinates.has(coordKey))) {
      return;
    }

    seenCoordinates.add(coordKey);
    seenNames.add(nameKey);
    results.push(item);
  };

  // --- TIER 1: Instant Local Curated Matches ---
  for (const d of SINDH_DISTRICTS) {
    if (
      d.name.toLowerCase().includes(qLower) ||
      d.nameUrdu.includes(query) ||
      d.division.toLowerCase().includes(qLower)
    ) {
      addResult({
        id: `district-${d.id}`,
        name: d.name,
        nameUrdu: d.nameUrdu,
        subtitle: `${d.division} Division, Sindh Province`,
        type: 'District',
        lat: d.lat,
        lon: d.lon,
        importance: 0.95,
        source: 'curated',
      });
    }
  }

  for (const loc of SINDH_CURATED_LOCATIONS) {
    if (
      loc.name.toLowerCase().includes(qLower) ||
      (loc.nameUrdu && loc.nameUrdu.includes(query)) ||
      loc.district.toLowerCase().includes(qLower) ||
      loc.division.toLowerCase().includes(qLower)
    ) {
      addResult({
        id: `curated-${loc.id}`,
        name: loc.name,
        nameUrdu: loc.nameUrdu,
        subtitle: `${loc.district}, ${loc.division} Division, Sindh`,
        type: loc.type,
        lat: loc.lat,
        lon: loc.lon,
        importance: 0.9,
        source: 'curated',
      });
    }
  }

  // --- TIER 2 & 3: Run High-Precision Nominatim & Mapbox in Parallel ---
  // Sindh bounding box: Southwest [66.60, 23.50], Northeast [71.12, 28.52]
  const nominatimPromise = (async () => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&addressdetails=1&extratags=1&countrycodes=pk&viewbox=${SINDH_BOUNDS.minLon},${
        SINDH_BOUNDS.maxLat
      },${SINDH_BOUNDS.maxLon},${SINDH_BOUNDS.minLat}&bounded=1&limit=10`;

      const res = await fetch(url, {
        headers: { 'Accept-Language': 'en,ur' },
        signal,
      });

      if (!res.ok) return [];
      const data = await res.json();
      if (!Array.isArray(data)) return [];

      const parsed: SindhSearchResult[] = [];
      for (const item of data) {
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);
        if (isNaN(lat) || isNaN(lon) || !isInsideSindh(lat, lon)) continue;

        const addr = item.address || {};
        // Check if address is in Sindh
        const state = (addr.state || addr.province || '').toLowerCase();
        if (state && !state.includes('sindh') && !state.includes('سندھ')) {
          continue;
        }

        // Clean primary name
        const primaryName =
          item.name ||
          addr.hospital ||
          addr.amenity ||
          addr.suburb ||
          addr.neighbourhood ||
          addr.town ||
          addr.city ||
          (item.display_name || '').split(',')[0].trim();

        // Build clean Google Maps-style address subtitle
        const subtitleParts: string[] = [];
        if (addr.suburb && addr.suburb !== primaryName) subtitleParts.push(addr.suburb);
        if (addr.neighbourhood && addr.neighbourhood !== primaryName && !subtitleParts.includes(addr.neighbourhood)) subtitleParts.push(addr.neighbourhood);
        if (addr.city && addr.city !== primaryName) subtitleParts.push(addr.city);
        else if (addr.town && addr.town !== primaryName) subtitleParts.push(addr.town);
        else if (addr.village && addr.village !== primaryName) subtitleParts.push(addr.village);
        if (addr.county && !subtitleParts.includes(addr.county)) subtitleParts.push(addr.county);
        subtitleParts.push('Sindh, Pakistan');

        const cleanSubtitle = subtitleParts.slice(0, 3).join(', ');
        const typeLabel = formatOsmType(item);

        parsed.push({
          id: `osm-${item.place_id || Math.random()}`,
          name: primaryName,
          subtitle: cleanSubtitle,
          type: typeLabel,
          lat,
          lon,
          importance: parseFloat(item.importance) || 0.6,
          source: 'osm',
        });
      }
      return parsed;
    } catch {
      return [];
    }
  })();

  const mapboxPromise = (async () => {
    try {
      const bboxParam = `${SINDH_BOUNDS.minLon},${SINDH_BOUNDS.minLat},${SINDH_BOUNDS.maxLon},${SINDH_BOUNDS.maxLat}`;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${USER_MAPBOX_TOKEN}&proximity=68.5247,25.8943&country=pk&bbox=${bboxParam}&autocomplete=true&limit=8`;

      const res = await fetch(url, { signal });
      if (!res.ok) return [];
      const data = await res.json();
      if (!Array.isArray(data.features)) return [];

      const parsed: SindhSearchResult[] = [];
      for (const feat of data.features) {
        if (!feat.center || feat.center.length < 2) continue;
        const lon = feat.center[0];
        const lat = feat.center[1];
        if (!isInsideSindh(lat, lon)) continue;

        const placeType = feat.place_type?.[0] || 'place';
        let formattedType = 'Location';
        if (placeType === 'poi') formattedType = 'Landmark';
        else if (placeType === 'neighborhood') formattedType = 'Neighborhood';
        else if (placeType === 'locality' || placeType === 'place') formattedType = 'Town / City';
        else if (placeType === 'district') formattedType = 'District / Taluka';
        else if (placeType === 'address') formattedType = 'Address / Street';

        const contextParts = Array.isArray(feat.context)
          ? feat.context.map((c: any) => c.text).filter(Boolean)
          : [];
        const subtitle = contextParts.length > 0 ? contextParts.join(', ') : 'Sindh, Pakistan';

        parsed.push({
          id: `mbx-${feat.id || Math.random()}`,
          name: feat.text || feat.place_name?.split(',')[0] || query,
          subtitle,
          type: formattedType,
          lat,
          lon,
          importance: feat.relevance || 0.7,
          source: 'mapbox',
        });
      }
      return parsed;
    } catch {
      return [];
    }
  })();

  // Await both engines
  const [osmItems, mapboxItems] = await Promise.all([nominatimPromise, mapboxPromise]);

  // Merge items into results with priority:
  // POIs and specific places from OSM and Mapbox are prioritized for rich detail
  for (const item of osmItems) {
    addResult(item);
  }
  for (const item of mapboxItems) {
    addResult(item);
  }

  // Sort by relevance / importance
  results.sort((a, b) => (b.importance || 0.5) - (a.importance || 0.5));

  const finalResults = results.slice(0, 15);
  searchCache.set(cacheKey, finalResults);
  return finalResults;
}
