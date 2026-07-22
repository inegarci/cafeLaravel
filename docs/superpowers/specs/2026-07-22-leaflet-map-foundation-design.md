# Leaflet Map Foundation Design

## Goal

Replace the temporary `/map` content with a full-screen Leaflet map so the project has a small, understandable foundation for future Cafecitos map features.

## Scope

This stage includes only Leaflet itself:

- A full-viewport map.
- Initial center in Montevideo at `[-34.9011, -56.1645]`.
- Initial zoom level `14`.
- The light CARTO tile layer used by the original Cafecitos page.
- Visible attribution for OpenStreetMap and CARTO.
- Leaflet's native zoom controls.
- Safe React setup and teardown when navigating with Inertia.

This stage explicitly excludes markers, sample data, Supabase, cafe types, search, filters, add-cafe flows, detail sheets, profile controls, and bottom navigation.

## Technical Approach

Use Leaflet directly instead of React Leaflet. Install `leaflet` as a runtime dependency and `@types/leaflet` as a development dependency. Import Leaflet's distributed CSS from the map page.

The `mapa.tsx` page will own two refs:

- A DOM-container ref passed to the full-screen map element.
- A Leaflet-map ref that prevents duplicate initialization and retains the instance for cleanup.

On mount, a React effect will create the Leaflet map, set the Montevideo view, and attach the CARTO tile layer. On unmount, the cleanup will remove the Leaflet instance and reset its ref. This is required because Inertia can mount and unmount the page without a full browser reload.

## Educational Notes

Keep comments short and limited to three concepts:

1. The DOM element Leaflet renders into.
2. Map and tile-layer initialization.
3. Cleanup when React unmounts the page.

The README will include a short note pointing developers to `resources/js/pages/mapa.tsx` as the Leaflet entry point.

## Verification

- Keep the existing public `/map` feature test passing.
- Run TypeScript, ESLint, Prettier, and the production build.
- Open `/map` locally and verify that the Leaflet container and tile images render.
- Confirm that navigating away and back does not produce an "already initialized" error.

