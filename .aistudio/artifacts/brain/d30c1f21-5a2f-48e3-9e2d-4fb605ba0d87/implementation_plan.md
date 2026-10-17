# Precision Sindh Boundary Mask & Strict Geofencing

Convert the exact vector SVG outline of Sindh from the Home page into a high-precision geographic boundary, apply an inverted dark overlay mask on Mapbox to dim non-Sindh territories, block out-of-bounds pin placement with a warning toast, and lock camera panning to Sindh.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following design decisions were confirmed via interactive user interview in Phase 1 and govern this implementation:

- **Confirmed: Visual Mask Presentation**: Darken areas outside Sindh with an inverted overlay mask (`#020B18` at 75% opacity) and a crisp illuminated cyan boundary perimeter (`#00D4C8`).
- **Confirmed: Out-of-Bounds Click Enforcement**: Strictly block pin placement outside the Sindh boundary and display an animated warning toast notification ("Outside Sindh Province: Zeraab predictions are strictly available within Sindh").
- **Confirmed: Camera Constraints**: Lock Mapbox camera panning bounds tightly to Sindh territory (`maxBounds: [[66.2, 23.3], [71.3, 28.7]]`) to prevent drifting into neighboring provinces or countries.

---

## 1. Overview & Core Concept

- **What It Does**: Establishes an exact geofenced sandbox for Sindh Province on the interactive risk map. The high-resolution vector contour from the Home page vector visual is mathematically mapped to real-world coordinates, generating both a high-fidelity point-in-polygon containment engine and a Mapbox inverted cutout mask.
- **Target Audience**: Water drillers, local communities, researchers, and public health officials querying groundwater safety across Sindh's 28 districts.
- **Key Value**: Guarantees zero out-of-province false predictions or invalid pin drops along complex borders (such as the Kirthar mountain range bordering Balochistan, the Indus Delta, and the Thar desert border).

---

## 2. User Experience & Visual Design

- **Map Visual Atmosphere**:
  - **Sindh Province**: Fully illuminated, vivid satellite risk heatmap with district labels and interactive pin selection.
  - **Outside Regions (Balochistan, Punjab, India, Arabian Sea)**: Shaded with a deep obsidian mask (`#020B18`, 0.75 opacity), keeping full visual focus centered on Sindh.
  - **Border Perimeter**: Sleek 1.5px glowing teal boundary (`#00D4C8`, 0.6 opacity) tracing every contour of the provincial border.
- **Click & Interaction Feedback**:
  - **Hover Inside Sindh**: Cursor changes to `pointer` with coordinates HUD indicator.
  - **Hover Outside Sindh**: Cursor transitions to `not-allowed` / `grab`.
  - **Click Outside Sindh**: Instantly intercepted before any prediction query. The map displays a floating warning toast with an amber/rose shield indicator, and no pin or analysis panel is opened.
- **Camera Bounds**:
  - Restricts pan and drag to the geographic bounding box of Sindh with smooth rubber-band resistance.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: SVG Path to Geo-Coordinate Mathematical Mapping**
  - *Chosen Approach*: Map the 150+ point vector contour from `HeroSindhVisual.tsx` through an affine geographic projection onto the bounding box $[66.65^\circ\text{E}, 23.50^\circ\text{N}]$ to $[71.12^\circ\text{E}, 28.52^\circ\text{N}]$.
  - *Why*: The Home page SVG vector contour is already calibrated to Sindh's shape, capturing the western Kirthar ridge, the northern Kashmore bend, and the southeastern Nagarparkar bulge.
  - *Alternative Considered*: Manual rough 15-point polygon (caused the leak observed in user's screenshot).
- **Decision 2: Inverted World Polygon Cutout Mask**
  - *Chosen Approach*: Supply Mapbox with a GeoJSON polygon containing an outer world ring (`[[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]]`) and an inner hole ring following the reversed Sindh boundary polygon.
  - *Why*: Hardware-accelerated by Mapbox GL, smooth 60fps rendering, and seamlessly darkens all exterior landmasses and oceans without requiring raster tiles.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                     Interactive Risk Map                        │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                 Inverted Mask Layer                     │   │
│   │   Outer World: #020B18 (75% opacity)                    │   │
│   │   Cutout: Exact Sindh Vector Boundary                   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                │                                │
│                                ▼                                │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │               Glowing Perimeter Border                  │   │
│   │   GeoJSON LineString: #00D4C8 (1.5px stroke)            │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                │                                │
│                                ▼                                │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │           Point-in-Polygon Interceptor                  │   │
│   │                                                         │   │
│   │   Inside Sindh? ──► YES ──► Fetch Prediction API        │   │
│   │         │                                               │   │
│   │         └──► NO ──► Block Pin & Show Warning Toast      │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

- **Data Structures**:
  - `SINDH_VECTOR_GEO_BOUNDARY`: Array of $[lon, lat]$ coordinate pairs generated from the exact SVG path vertices.
  - `SINDH_INVERTED_MASK_GEOJSON`: GeoJSON polygon with outer world bounds and inner Sindh hole.
  - `SINDH_BORDER_LINE_GEOJSON`: GeoJSON LineString for perimeter rendering.
- **Component Modifications**:
  - `src/data/sindhGeo.ts`: Replace the simplified boundary with the comprehensive vector-derived coordinate array for `isInsideSindh`.
  - `src/data/sindhDetailedBoundary.ts`: Synchronize mask and boundary line definitions.
  - `src/components/map/SindhMap.tsx`: Mount the inverted mask fill layer, perimeter stroke layer, camera `maxBounds`, and floating toast notification on out-of-bounds click.
