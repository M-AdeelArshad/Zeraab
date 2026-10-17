import { USER_MAPBOX_TOKEN } from '../store/useAppStore';
import { GeocodedLocation } from '../types';
import { getNearestDistrictName, SINDH_BOUNDS, isInsideSindh } from '../data/sindhGeo';

export interface PlaceSearchResult {
  id: string;
  name: string;
  formattedAddress: string;
  type: 'city' | 'town' | 'village' | 'landmark' | 'street' | 'district' | 'coordinate' | 'place';
  lat: number;
  lng: number;
  bbox?: [number, number, number, number];
}

const geocodeCache = new Map<string, GeocodedLocation>();

/**
 * Parse pasted coordinate strings in multiple formats:
 * - "26.6065, 69.2827"
 * - "26.6065 69.2827"
 * - "26.6065° N, 69.2827° E"
 * - "26°36'23\"N 69°16'58\"E"
 */
export function parseCoordinates(input: string): { lat: number; lng: number } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // 1. Simple decimal pair: "26.6065, 69.2827" or "26.6065 69.2827"
  const decimalMatch = trimmed.match(
    /^\[?\s*([+-]?\d+(?:\.\d+)?)\s*[,|\s]\s*([+-]?\d+(?:\.\d+)?)\s*\]?$/
  );
  if (decimalMatch) {
    const val1 = parseFloat(decimalMatch[1]);
    const val2 = parseFloat(decimalMatch[2]);
    // Determine which is lat and which is lng based on Sindh / Pakistan bounds
    // Lat is ~23–29, Lng is ~66–72
    if (val1 >= 20 && val1 <= 35 && val2 >= 60 && val2 <= 80) {
      return { lat: val1, lng: val2 };
    }
    if (val2 >= 20 && val2 <= 35 && val1 >= 60 && val1 <= 80) {
      return { lat: val2, lng: val1 };
    }
    // Generic lat/lng within world bounds
    if (Math.abs(val1) <= 90 && Math.abs(val2) <= 180) {
      return { lat: val1, lng: val2 };
    }
  }

  // 2. Cardinal hemisphere format: "26.6065 N, 69.2827 E"
  const cardinalMatch = trimmed.match(
    /([+-]?\d+(?:\.\d+)?)\s*°?\s*([NSns])\s*[,|\s]\s*([+-]?\d+(?:\.\d+)?)\s*°?\s*([EWew])/
  );
  if (cardinalMatch) {
    let lat = parseFloat(cardinalMatch[1]);
    if (cardinalMatch[2].toUpperCase() === 'S') lat = -lat;
    let lng = parseFloat(cardinalMatch[3]);
    if (cardinalMatch[4].toUpperCase() === 'W') lng = -lng;
    return { lat, lng };
  }

  // 3. DMS Format: 26°36'23"N 69°16'58"E
  const dmsMatch = trimmed.match(
    /(\d+)\s*°\s*(\d+)\s*['′]\s*(\d+(?:\.\d+)?)\s*["″]?\s*([NSns])\s*[,|\s]\s*(\d+)\s*°\s*(\d+)\s*['′]\s*(\d+(?:\.\d+)?)\s*["″]?\s*([EWew])/
  );
  if (dmsMatch) {
    const latDeg = parseFloat(dmsMatch[1]);
    const latMin = parseFloat(dmsMatch[2]);
    const latSec = parseFloat(dmsMatch[3]);
    let lat = latDeg + latMin / 60 + latSec / 3600;
    if (dmsMatch[4].toUpperCase() === 'S') lat = -lat;

    const lngDeg = parseFloat(dmsMatch[5]);
    const lngMin = parseFloat(dmsMatch[6]);
    const lngSec = parseFloat(dmsMatch[7]);
    let lng = lngDeg + lngMin / 60 + lngSec / 3600;
    if (dmsMatch[8].toUpperCase() === 'W') lng = -lng;

    return { lat, lng };
  }

  return null;
}

/**
 * High-precision place search using Mapbox Geocoding v6 API
 * Biased to map proximity, restricted to Pakistan, with coordinate parser
 */
export async function searchPlaces(
  query: string,
  proximityLngLat?: [number, number],
  signal?: AbortSignal
): Promise<PlaceSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  // 1. Direct coordinate check
  const parsedCoords = parseCoordinates(trimmed);
  if (parsedCoords) {
    const isInside = isInsideSindh(parsedCoords.lat, parsedCoords.lng);
    if (!isInside) {
      return []; // Reject coordinates outside Sindh
    }
    return [
      {
        id: `coord-${parsedCoords.lat.toFixed(5)}-${parsedCoords.lng.toFixed(5)}`,
        name: `${parsedCoords.lat.toFixed(5)}° N, ${parsedCoords.lng.toFixed(5)}° E`,
        formattedAddress: 'Sindh Province, Pakistan',
        type: 'coordinate',
        lat: parsedCoords.lat,
        lng: parsedCoords.lng,
      },
    ];
  }

  const results: PlaceSearchResult[] = [];

  try {
    const prox = proximityLngLat
      ? `&proximity=${proximityLngLat[0].toFixed(4)},${proximityLngLat[1].toFixed(4)}`
      : `&proximity=${SINDH_BOUNDS.centerLon},${SINDH_BOUNDS.centerLat}`;

    // Mapbox Geocoding v6 forward geocoding restricted to country=pk and Sindh bbox
    const sindhBBoxParam = `&bbox=${SINDH_BOUNDS.minLon},${SINDH_BOUNDS.minLat},${SINDH_BOUNDS.maxLon},${SINDH_BOUNDS.maxLat}`;
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
      trimmed
    )}&access_token=${USER_MAPBOX_TOKEN}&country=pk${sindhBBoxParam}${prox}&limit=10`;

    const res = await fetch(url, { signal });
    if (!res.ok) {
      return fallbackOsmSearch(trimmed, signal);
    }

    const data = await res.json();
    if (Array.isArray(data.features)) {
      for (const feat of data.features) {
        const coords = feat.geometry?.coordinates;
        if (!coords || coords.length < 2) continue;
        const [lng, lat] = coords;

        if (!isInsideSindh(lat, lng)) continue; // Enforce strict Sindh containment

        const props = feat.properties || {};
        const featType = props.feature_type || 'place';
        let cleanType: PlaceSearchResult['type'] = 'place';
        if (featType === 'poi') cleanType = 'landmark';
        else if (featType === 'street' || featType === 'address') cleanType = 'street';
        else if (featType === 'locality' || featType === 'place') cleanType = 'town';
        else if (featType === 'district') cleanType = 'district';
        else if (featType === 'neighborhood') cleanType = 'village';

        results.push({
          id: feat.id || props.mapbox_id || Math.random().toString(),
          name: props.name || trimmed,
          formattedAddress: props.place_formatted || props.full_address || 'Sindh, Pakistan',
          type: cleanType,
          lat,
          lng,
          bbox: feat.bbox,
        });
      }
    }
  } catch (err: unknown) {
    if ((err as Error)?.name === 'AbortError') throw err;
    return fallbackOsmSearch(trimmed, signal);
  }

  if (results.length === 0) {
    return fallbackOsmSearch(trimmed, signal);
  }

  return results;
}

/**
 * OpenStreetMap Nominatim fallback if Mapbox search yields few results, filtered strictly to Sindh
 */
async function fallbackOsmSearch(query: string, signal?: AbortSignal): Promise<PlaceSearchResult[]> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&countrycodes=pk&addressdetails=1&limit=10`;
    const res = await fetch(url, {
      signal,
      headers: { 'Accept-Language': 'en,ur' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    const mapped: PlaceSearchResult[] = data.map((item: any) => ({
      id: `osm-${item.place_id}`,
      name: item.name || (item.display_name || '').split(',')[0],
      formattedAddress: (item.display_name || '').split(',').slice(1, 4).join(', ').trim(),
      type: item.type === 'city' ? 'city' : item.type === 'town' ? 'town' : 'place',
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      bbox: item.boundingbox
        ? [
            parseFloat(item.boundingbox[2]),
            parseFloat(item.boundingbox[0]),
            parseFloat(item.boundingbox[3]),
            parseFloat(item.boundingbox[1]),
          ]
        : undefined,
    }));

    return mapped.filter((item) => isInsideSindh(item.lat, item.lng));
  } catch {
    return [];
  }
}


/**
 * Reverse geocoding via Mapbox v6 with Nominatim fallback
 * Returns honest place title, administrative hierarchy, and full address
 */
export async function reverseGeocodeLocation(lat: number, lng: number): Promise<GeocodedLocation> {
  const roundedLat = Number(lat.toFixed(4));
  const roundedLng = Number(lng.toFixed(4));
  const cacheKey = `${roundedLat},${roundedLng}`;

  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)!;
  }

  const nearestDistrict = getNearestDistrictName(lat, lng);

  try {
    const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${roundedLng}&latitude=${roundedLat}&access_token=${USER_MAPBOX_TOKEN}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.features) && data.features.length > 0) {
        const top = data.features[0];
        const props = top.properties || {};
        const context = props.context || {};

        const districtName =
          context.district?.name || context.place?.name || nearestDistrict;
        const placeName = props.name || props.name_preferred || districtName;
        const addressContext =
          props.place_formatted ||
          `${districtName}, Sindh, Pakistan`;

        const result: GeocodedLocation = {
          village: placeName,
          district: districtName,
          province: 'Sindh',
          country: 'Pakistan',
          formattedAddress: addressContext,
        };
        geocodeCache.set(cacheKey, result);
        return result;
      }
    }
  } catch {
    // Non-blocking fallback
  }

  const fallback: GeocodedLocation = {
    village: nearestDistrict,
    district: nearestDistrict,
    province: 'Sindh',
    country: 'Pakistan',
    formattedAddress: `${nearestDistrict}, Sindh, Pakistan`,
  };
  geocodeCache.set(cacheKey, fallback);
  return fallback;
}
