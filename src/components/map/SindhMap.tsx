import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import type { Feature, Polygon, MultiPolygon, FeatureCollection } from 'geojson';
import { useAppStore, USER_MAPBOX_TOKEN } from '../../store/useAppStore';
import { SINDH_DISTRICTS } from '../../data/sindhGeo';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { AlertCircle } from 'lucide-react';

// ============================================================================
// ⚙️ SINDH BOUNDARY, MASK & INTERACTION CONFIGURATION (Tweakable Values)
// ============================================================================
export const SINDH_CONFIG = {
  // GeoJSON file path (served from Vite's /public folder)
  GEOJSON_PATH: '/sindh.geojson',

  // 1. Outside Dimmer / Inverted Mask (set to 0 opacity so overlay is invisible while selection logic remains active)
  MASK_OPACITY: 0,
  MASK_COLOR: '#000000',

  // 2. Boundary Styling (High visibility across dark and satellite modes)
  BOUNDARY_LINE_COLOR: '#00f0ff',  // Vibrant cyan line for maximum contrast
  BOUNDARY_LINE_WIDTH: 2.2,        // Clear, prominent line width
  BOUNDARY_LINE_OPACITY: 1.0,      // Full opacity

  // Boundary Casing / Dark Outer Glow for Satellite/Dark contrast
  ENABLE_CASING: true,
  CASING_COLOR: '#000000',         // Deep black casing for sharp separation from satellite terrain
  CASING_WIDTH: 4.5,
  CASING_OPACITY: 0.85,

  // 3. Interaction & Hit Testing
  CLICK_BUFFER_KM: 3.0,            // Tolerance buffer in km so coastal/border clicks aren't wrongly rejected
  OUTSIDE_CLICK_MESSAGE_EN: 'Please choose a location inside Sindh.',
  OUTSIDE_CLICK_MESSAGE_UR: 'براہ کرم سندھ کے اندر کسی مقام کا انتخاب کریں۔',

  // 4. Viewport Boundaries
  MIN_ZOOM: 4.5,                   // Fully fixed zoom-out limit
  MAX_ZOOM: 18.0,                  // Fully fixed zoom-in limit
  FIT_BOUNDS_PADDING: 40,          // Padding in px around Sindh on initial load
};

mapboxgl.accessToken = USER_MAPBOX_TOKEN;

export const SindhMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const isMountedRef = useRef(true);
  const currentStyleRef = useRef<string>('mapbox://styles/mapbox/dark-v11');

  // Interactive Cursor State Tracking
  const isDraggingMapRef = useRef(false);
  const isHoveringDistrictRef = useRef(false);
  const lastMouseLngLatRef = useRef<mapboxgl.LngLat | null>(null);

  // Cached Sindh Geometries from public/sindh.geojson
  const sindhFeatureRef = useRef<Feature<Polygon | MultiPolygon> | null>(null);
  const sindhBufferedRef = useRef<Feature<Polygon | MultiPolygon> | null>(null);
  const maskGeoJSONRef = useRef<Feature<Polygon | MultiPolygon> | null>(null);
  const sindhBBoxRef = useRef<[number, number, number, number] | null>(null);
  const districtListenersAttachedRef = useRef(false);

  // Friendly toast notification for outside-Sindh clicks
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const {
    selectedCoords,
    selectLocation,
    userSettings,
  } = useAppStore();

  const isUrdu = userSettings.language === 'ur';

  const showToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  const setMapCursor = (cursor: string) => {
    if (!mapInstanceRef.current) return;
    try {
      const canvas = mapInstanceRef.current.getCanvas();
      const container = mapInstanceRef.current.getCanvasContainer();
      if (canvas) canvas.style.cursor = cursor;
      if (container) container.style.cursor = cursor;
    } catch {}
  };

  const getMapStyle = () => {
    if (userSettings.mapStyle === 'satellite') {
      return 'mapbox://styles/mapbox/satellite-streets-v12';
    }
    return 'mapbox://styles/mapbox/dark-v11';
  };

  /**
   * Finds the first symbol layer ID in the active Mapbox style.
   * Placing custom mask and line layers before this layer ensures that
   * city names, highway numbers, and boundary labels remain crisp and readable on top!
   */
  const getFirstSymbolLayerId = (map: mapboxgl.Map): string | undefined => {
    try {
      const layers = map.getStyle().layers;
      if (!layers) return undefined;
      for (const layer of layers) {
        if (layer.type === 'symbol') {
          return layer.id;
        }
      }
    } catch {}
    return undefined;
  };

  /**
   * Computes the inverted world mask polygon using RFC 7946 and Mapbox GL WebGL winding rules.
   * To dim OUTSIDE Sindh while keeping INSIDE Sindh completely transparent & un-tinted:
   * 1. Exterior Ring: World bounding rectangle strictly within Web Mercator projection bounds
   *    [-180, -85.051129, 180, 85.051129] in Counter-Clockwise (CCW) order.
   * 2. Interior Ring(s) (Holes): Sindh boundary coordinates enforced in Clockwise (CW) order.
   *
   * In Mapbox GL / earcut WebGL triangulation, opposite winding ensures that the interior (Sindh)
   * is treated as an empty hole, leaving it 100% natural and transparent, while the exterior
   * world gets the dimming fill tint.
   */
  const computeInvertedMask = (
    sindhFeature: Feature<Polygon | MultiPolygon>
  ): Feature<Polygon | MultiPolygon> | null => {
    try {
      const worldPoly = turf.polygon([[
        [-180, -85.051129],
        [180, -85.051129],
        [180, 85.051129],
        [-180, 85.051129],
        [-180, -85.051129],
      ]]);
      const fc = turf.featureCollection([worldPoly, sindhFeature as any]);
      const diff = (turf as any).difference(fc);
      if (diff) {
        return diff as Feature<Polygon | MultiPolygon>;
      }
    } catch (err) {
      console.warn('turf.difference mask computation error:', err);
    }
    return null;
  };

  /**
   * Sets up or re-adds the Sindh Dimmer Mask and Prominent Border layers.
   */
  const setupSindhBoundaryLayers = (map: mapboxgl.Map) => {
    if (!isMountedRef.current || !map || !map.isStyleLoaded()) return;
    if (!sindhFeatureRef.current || !maskGeoJSONRef.current) return;

    let beforeId: string | undefined = undefined;
    try {
      const rawBefore = getFirstSymbolLayerId(map);
      if (rawBefore && map.getLayer(rawBefore)) {
        beforeId = rawBefore;
      }
    } catch {}

    // 1. Inverted Mask Layer
    try {
      if (!map.getSource('sindh-outside-mask-source')) {
        map.addSource('sindh-outside-mask-source', {
          type: 'geojson',
          data: maskGeoJSONRef.current as any,
        });
      } else {
        (map.getSource('sindh-outside-mask-source') as mapboxgl.GeoJSONSource).setData(
          maskGeoJSONRef.current as any
        );
      }

      if (!map.getLayer('sindh-outside-mask-layer')) {
        map.addLayer(
          {
            id: 'sindh-outside-mask-layer',
            type: 'fill',
            source: 'sindh-outside-mask-source',
            paint: {
              'fill-color': SINDH_CONFIG.MASK_COLOR,
              'fill-opacity': SINDH_CONFIG.MASK_OPACITY,
            },
          },
          beforeId
        );
      }
    } catch (err) {
      console.warn('Mask layer setup error:', err);
    }

    // 2. Sindh Boundary Source & Line Layers (Rendered at top of stack without beforeId for permanent visibility)
    try {
      if (!map.getSource('sindh-boundary-source')) {
        map.addSource('sindh-boundary-source', {
          type: 'geojson',
          data: sindhFeatureRef.current as any,
        });
      } else {
        (map.getSource('sindh-boundary-source') as mapboxgl.GeoJSONSource).setData(
          sindhFeatureRef.current as any
        );
      }

      if (SINDH_CONFIG.ENABLE_CASING && !map.getLayer('sindh-boundary-casing-layer')) {
        map.addLayer({
          id: 'sindh-boundary-casing-layer',
          type: 'line',
          source: 'sindh-boundary-source',
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': SINDH_CONFIG.CASING_COLOR,
            'line-width': SINDH_CONFIG.CASING_WIDTH,
            'line-opacity': SINDH_CONFIG.CASING_OPACITY,
          },
        });
      }

      if (!map.getLayer('sindh-boundary-line-layer')) {
        map.addLayer({
          id: 'sindh-boundary-line-layer',
          type: 'line',
          source: 'sindh-boundary-source',
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': SINDH_CONFIG.BOUNDARY_LINE_COLOR,
            'line-width': SINDH_CONFIG.BOUNDARY_LINE_WIDTH,
            'line-opacity': SINDH_CONFIG.BOUNDARY_LINE_OPACITY,
          },
        });
      }
    } catch (err) {
      console.warn('Boundary line layer setup error:', err);
    }
  };

  /**
   * Sets up district centroid markers and labels
   */
  const setupDistrictLayers = (map: mapboxgl.Map) => {
    if (!isMountedRef.current || !map || !map.isStyleLoaded()) return;

    try {
      setupSindhBoundaryLayers(map);

      const districtPoints = {
        type: 'FeatureCollection',
        features: SINDH_DISTRICTS.map((d) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [d.lon, d.lat],
          },
          properties: {
            name: d.name || '',
            nameUrdu: d.nameUrdu || '',
            lat: d.lat,
            lon: d.lon,
            arsenic: d.avgShallowArsenic || 0,
            risk: d.riskCategory || 'SAFE',
          },
        })),
      };

      if (!map.getSource('district-centroids')) {
        map.addSource('district-centroids', {
          type: 'geojson',
          data: districtPoints as any,
        });
      } else {
        (map.getSource('district-centroids') as mapboxgl.GeoJSONSource).setData(
          districtPoints as any
        );
      }

      if (!map.getLayer('district-centroid-dots')) {
        map.addLayer({
          id: 'district-centroid-dots',
          type: 'circle',
          source: 'district-centroids',
          layout: {
            visibility: userSettings.showDistrictBorders ? 'visible' : 'none',
          },
          paint: {
            'circle-radius': 4.5,
            'circle-color': '#00D4C8',
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#070b13',
          },
        });
      }

      if (!map.getLayer('district-centroid-labels')) {
        map.addLayer({
          id: 'district-centroid-labels',
          type: 'symbol',
          source: 'district-centroids',
          layout: {
            'text-field': [
              'to-string',
              ['get', userSettings.language === 'ur' ? 'nameUrdu' : 'name'],
            ],
            'text-size': 11,
            'text-offset': [0, 1.2],
            'text-anchor': 'top',
            visibility: userSettings.showDistrictBorders ? 'visible' : 'none',
          },
          paint: {
            'text-color': '#ffffff',
            'text-halo-color': '#070b13',
            'text-halo-width': 1.5,
          },
        });
      }

      if (!districtListenersAttachedRef.current) {
        districtListenersAttachedRef.current = true;
        map.on('click', 'district-centroid-dots', (e) => {
          if (e.features && e.features[0]) {
            const props = (e.features[0] as any).properties || {};
            if (props.lat && props.lon) {
              selectLocation(props.lon, props.lat, 'district', 11);
            }
          }
        });

        map.on('mouseenter', 'district-centroid-dots', () => {
          isHoveringDistrictRef.current = true;
          setMapCursor('pointer');
        });

        map.on('mouseleave', 'district-centroid-dots', () => {
          isHoveringDistrictRef.current = false;
          if (
            lastMouseLngLatRef.current &&
            checkIsInsideSindh(lastMouseLngLatRef.current.lng, lastMouseLngLatRef.current.lat)
          ) {
            setMapCursor('pointer');
          } else {
            setMapCursor('grab');
          }
        });
      }
    } catch (err) {
      console.warn('District layer setup catch:', err);
    }
  };

  /**
   * Point-in-polygon containment check using Turf with 3km buffer
   */
  const checkIsInsideSindh = (lng: number, lat: number): boolean => {
    if (!sindhBufferedRef.current) return true; // optimistic fallback while loading
    const pt = turf.point([lng, lat]);
    return turf.booleanPointInPolygon(pt, sindhBufferedRef.current as any);
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (!mapContainerRef.current) return;

    let initialLat = 25.8943;
    let initialLng = 68.5247;
    let initialZoom = 7.0;

    // Check URL parameters for shareable location restoration
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLat = parseFloat(urlParams.get('lat') || '');
      const urlLng = parseFloat(urlParams.get('lng') || '');
      const urlZ = parseFloat(urlParams.get('z') || '');
      if (!isNaN(urlLat) && !isNaN(urlLng)) {
        initialLat = urlLat;
        initialLng = urlLng;
        initialZoom = !isNaN(urlZ) ? urlZ : 11;
        selectLocation(urlLng, urlLat, 'url', initialZoom);
      }
    }

    const initialStyle = getMapStyle();
    currentStyleRef.current = initialStyle;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: initialStyle,
      center: [initialLng, initialLat],
      zoom: initialZoom,
      minZoom: SINDH_CONFIG.MIN_ZOOM,
      maxZoom: SINDH_CONFIG.MAX_ZOOM,
      pitch: 0,
      attributionControl: false,
      renderWorldCopies: false,
      scrollZoom: true,
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: true, visualizePitch: true }),
      'bottom-left'
    );
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

    // Asynchronously load public/sindh.geojson and configure boundaries
    const loadSindhGeoJSON = async () => {
      try {
        const res = await fetch(SINDH_CONFIG.GEOJSON_PATH);
        if (!res.ok) {
          throw new Error(`Failed to load ${SINDH_CONFIG.GEOJSON_PATH}: ${res.statusText}`);
        }
        const geojsonData: FeatureCollection = await res.json();
        if (!geojsonData.features || geojsonData.features.length === 0) {
          throw new Error('Sindh GeoJSON contains no features');
        }

        const sindhFeature = geojsonData.features[0] as Feature<Polygon | MultiPolygon>;
        sindhFeatureRef.current = sindhFeature;

        // 1. Compute exact bounding box using Turf.js
        const bbox = turf.bbox(sindhFeature) as [number, number, number, number];
        sindhBBoxRef.current = bbox;

        // 2. Compute 3 km buffer for click tolerance
        const buffered = turf.buffer(sindhFeature as any, SINDH_CONFIG.CLICK_BUFFER_KM, {
          units: 'kilometers',
        }) as Feature<Polygon | MultiPolygon>;
        sindhBufferedRef.current = buffered;

        // 3. Compute Inverted Dimmer Mask
        const mask = computeInvertedMask(sindhFeature);
        maskGeoJSONRef.current = mask;

        // 4. If map is already loaded, fit bounds and add layers immediately
        if (map.isStyleLoaded()) {
          // If URL params did not specify a custom location, fit tightly to Sindh
          if (typeof window !== 'undefined' && !window.location.search.includes('lat=')) {
            map.fitBounds(
              [
                [bbox[0], bbox[1]],
                [bbox[2], bbox[3]],
              ],
              {
                padding: SINDH_CONFIG.FIT_BOUNDS_PADDING,
                duration: 0,
              }
            );
          }
          setupDistrictLayers(map);
        }
      } catch (err) {
        console.error('Error loading sindh.geojson:', err);
      }
    };

    loadSindhGeoJSON();

    map.on('load', () => {
      if (!isMountedRef.current) return;
      if (sindhBBoxRef.current && typeof window !== 'undefined' && !window.location.search.includes('lat=')) {
        map.fitBounds(
          [
            [sindhBBoxRef.current[0], sindhBBoxRef.current[1]],
            [sindhBBoxRef.current[2], sindhBBoxRef.current[3]],
          ],
          {
            padding: SINDH_CONFIG.FIT_BOUNDS_PADDING,
            duration: 0,
          }
        );
      }
      setupDistrictLayers(map);
    });

    map.on('style.load', () => {
      if (isMountedRef.current) {
        setTimeout(() => {
          if (mapInstanceRef.current && isMountedRef.current) {
            setupDistrictLayers(mapInstanceRef.current);
          }
        }, 50);
      }
    });

    // Dynamic cursor indication based on Sindh containment
    map.on('mousemove', (e) => {
      if (!isMountedRef.current) return;
      lastMouseLngLatRef.current = e.lngLat;
      if (isDraggingMapRef.current || isHoveringDistrictRef.current) return;

      if (checkIsInsideSindh(e.lngLat.lng, e.lngLat.lat)) {
        setMapCursor('pointer');
      } else {
        setMapCursor('grab');
      }
    });

    map.on('dragstart', () => {
      isDraggingMapRef.current = true;
      setMapCursor('grabbing');
    });

    map.on('drag', () => {
      setMapCursor('grabbing');
    });

    map.on('dragend', () => {
      isDraggingMapRef.current = false;
      if (
        lastMouseLngLatRef.current &&
        checkIsInsideSindh(lastMouseLngLatRef.current.lng, lastMouseLngLatRef.current.lat)
      ) {
        setMapCursor('pointer');
      } else {
        setMapCursor('grab');
      }
    });

    map.on('mouseout', () => {
      lastMouseLngLatRef.current = null;
      setMapCursor('');
    });

    // =========================================================================
    // 🎯 RESTRICT INTERACTION TO SINDH: Primary Map Click Handler
    // =========================================================================
    map.on('click', (e) => {
      if (!isMountedRef.current) return;
      const normalized = e.lngLat.wrap();

      // Check if clicked location is inside the Sindh boundary (with 3km buffer)
      const isInside = checkIsInsideSindh(normalized.lng, normalized.lat);

      if (!isInside) {
        // Outside Sindh: Do not fetch or show groundwater info.
        // Show friendly toast message to guide the user.
        const friendlyMessage = isUrdu
          ? SINDH_CONFIG.OUTSIDE_CLICK_MESSAGE_UR
          : SINDH_CONFIG.OUTSIDE_CLICK_MESSAGE_EN;
        showToast(friendlyMessage);
        return;
      }

      // =======================================================================
      // [PLACEHOLDER / NORMAL HANDLER FOR LOCATIONS INSIDE SINDH]
      // =======================================================================
      selectLocation(normalized.lng, normalized.lat, 'map');
    });

    mapInstanceRef.current = map;

    return () => {
      isMountedRef.current = false;
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
      if (markerRef.current) {
        try {
          markerRef.current.remove();
        } catch {}
        markerRef.current = null;
      }
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {}
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update style when user toggles dark vs satellite
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const newStyle = getMapStyle();
    if (currentStyleRef.current !== newStyle) {
      currentStyleRef.current = newStyle;
      try {
        map.setStyle(newStyle);
      } catch (e) {
        console.warn('Map setStyle catch:', e);
      }
    }
  }, [userSettings.mapStyle]);

  // Update district markers visibility
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !map.isStyleLoaded()) return;

    try {
      if (map.getLayer('district-centroid-dots')) {
        map.setLayoutProperty(
          'district-centroid-dots',
          'visibility',
          userSettings.showDistrictBorders ? 'visible' : 'none'
        );
      }
      if (map.getLayer('district-centroid-labels')) {
        map.setLayoutProperty(
          'district-centroid-labels',
          'visibility',
          userSettings.showDistrictBorders ? 'visible' : 'none'
        );
      }
    } catch {}
  }, [userSettings.showDistrictBorders]);

  // Marker Synchronization (Draggable, updates on selection)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (!selectedCoords) {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      return;
    }

    const [lat, lon] = selectedCoords;

    if (markerRef.current) {
      markerRef.current.setLngLat([lon, lat]);
    } else {
      const el = document.createElement('div');
      el.className = 'custom-radar-pin-element';
      el.title = 'Draggable borehole location marker';
      el.style.cursor = 'grab';
      el.innerHTML = `
        <div style="position: relative; width: 32px; height: 32px; display: flex; items-center; justify-content: center; cursor: grab;">
          <div style="position: absolute; width: 32px; height: 32px; border-radius: 9999px; background: rgba(0, 212, 200, 0.2); animation: radar-pulse 2.4s ease-out infinite;"></div>
          <div style="width: 12px; height: 12px; border-radius: 9999px; background: #00D4C8; border: 2px solid #ffffff; box-shadow: 0 0 10px rgba(0, 212, 200, 0.5);"></div>
        </div>
      `;

      const marker = new mapboxgl.Marker({
        element: el,
        draggable: true,
      })
        .setLngLat([lon, lat])
        .addTo(map);

      marker.on('dragstart', () => {
        el.style.cursor = 'grabbing';
        setMapCursor('grabbing');
      });

      marker.on('drag', () => {
        setMapCursor('grabbing');
      });

      marker.on('dragend', () => {
        el.style.cursor = 'grab';
        const lngLat = marker.getLngLat().wrap();
        if (checkIsInsideSindh(lngLat.lng, lngLat.lat)) {
          selectLocation(lngLat.lng, lngLat.lat, 'marker');
        } else {
          showToast(
            isUrdu
              ? SINDH_CONFIG.OUTSIDE_CLICK_MESSAGE_UR
              : SINDH_CONFIG.OUTSIDE_CLICK_MESSAGE_EN
          );
          // Return marker to previous valid coords
          marker.setLngLat([lon, lat]);
        }
      });

      markerRef.current = marker;
    }
  }, [selectedCoords, selectLocation, isUrdu, showToast]);

  const handleFlyTo = (
    targetLat: number,
    targetLng: number,
    zoom = 12,
    bbox?: [number, number, number, number]
  ) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    try {
      if (bbox) {
        map.fitBounds(
          [
            [bbox[0], bbox[1]],
            [bbox[2], bbox[3]],
          ],
          { padding: 80, duration: 1400, maxZoom: 15 }
        );
      } else {
        map.flyTo({
          center: [targetLng, targetLat],
          zoom,
          essential: true,
          duration: 1200,
          curve: 1.4,
          easing: (t) => t * (2 - t),
        });
      }
    } catch (e) {
      console.warn('Map flyTo catch:', e);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#070A0F] overflow-hidden">
      {/* Mapbox Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Friendly Outside Click Toast Notification */}
      {toastMessage && (
        <div
          role="alert"
          className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0d1527]/95 border border-amber-500/50 text-amber-200 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Place Search & Map Controls */}
      <MapControls
        onFlyToCoords={(targetLat, targetLng, zoom, bbox) =>
          handleFlyTo(targetLat, targetLng, zoom, bbox)
        }
        getMapCenter={() => {
          if (!mapInstanceRef.current) return undefined;
          const center = mapInstanceRef.current.getCenter();
          return [center.lng, center.lat];
        }}
      />

      {/* Unobtrusive Minimal WHO Water Legend */}
      <MapLegend />
    </div>
  );
};
