# Leaflet Map Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the temporary public map page with a full-screen Leaflet map centered on Montevideo, without markers or Cafecitos feature components.

**Architecture:** The existing Laravel route continues rendering the Inertia React page. The page imports Leaflet CSS, dynamically loads Leaflet in a mount effect, initializes one map and CARTO tile layer, and removes the instance during React cleanup so Inertia navigation cannot initialize the same container twice.

**Tech Stack:** Laravel 13, Inertia React 3, React 19, TypeScript, Leaflet 1.9, Vite 8, PHPUnit 12

---

## File Structure

- Modify `package.json`: add Leaflet runtime and TypeScript declaration dependencies through npm.
- Modify `package-lock.json`: generated dependency lock changes.
- Modify `resources/js/pages/mapa.tsx`: own the Leaflet container, initialization, tile layer, and cleanup.
- Modify `README.md`: point developers to the Leaflet entry file.
- Verify `tests/Feature/MapPageTest.php`: keep the existing public-page contract passing.

### Task 1: Install Leaflet

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Confirm Leaflet is not installed**

Run:

```powershell
npm.cmd list leaflet @types/leaflet --depth=0
```

Expected: non-zero exit or output indicating the packages are absent.

- [ ] **Step 2: Install the runtime library**

Run:

```powershell
npm.cmd install leaflet
```

Expected: `leaflet` is added under `dependencies` and the lock file is updated.

- [ ] **Step 3: Install TypeScript declarations**

Run:

```powershell
npm.cmd install --save-dev @types/leaflet
```

Expected: `@types/leaflet` is added under `devDependencies`.

- [ ] **Step 4: Verify the installed dependency tree**

Run:

```powershell
npm.cmd list leaflet @types/leaflet --depth=0
```

Expected: both packages are listed with no dependency errors.

- [ ] **Step 5: Commit dependency installation**

```powershell
git add package.json package-lock.json
git commit -m "build: install Leaflet"
```

### Task 2: Build the Leaflet Page

**Files:**
- Modify: `resources/js/pages/mapa.tsx`
- Verify: `tests/Feature/MapPageTest.php`

- [ ] **Step 1: Preserve the existing backend contract test**

Run:

```powershell
php artisan test --compact tests/Feature/MapPageTest.php
```

Expected: PASS, proving `/map` remains public and renders `mapa` before the client-side enhancement.

- [ ] **Step 2: Replace the temporary map page**

Replace `resources/js/pages/mapa.tsx` with:

```tsx
import 'leaflet/dist/leaflet.css';

import { Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

const MONTEVIDEO: [number, number] = [-34.9011, -56.1645];
const DEFAULT_ZOOM = 14;

export default function Mapa() {
    // Leaflet renders inside this DOM element.
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<import('leaflet').Map | null>(null);

    useEffect(() => {
        let disposed = false;

        void import('leaflet').then((L) => {
            if (disposed || !containerRef.current || mapRef.current) {
                return;
            }

            // Initialize the map and its visual tile layer.
            const map = L.map(containerRef.current).setView(
                MONTEVIDEO,
                DEFAULT_ZOOM,
            );

            L.tileLayer(
                'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                {
                    attribution: '&copy; OpenStreetMap &copy; CARTO',
                    maxZoom: 20,
                },
            ).addTo(map);

            mapRef.current = map;
        });

        return () => {
            // Remove Leaflet state when Inertia unmounts this page.
            disposed = true;
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <>
            <Head title="Mapa" />

            <main className="h-dvh w-full">
                <div ref={containerRef} className="h-full w-full" />
            </main>
        </>
    );
}
```

The explicit `h-dvh` and `h-full` classes satisfy Leaflet's requirement that its container have a defined height. The `disposed` flag prevents the asynchronous import from initializing after unmount.

- [ ] **Step 3: Check TypeScript**

Run:

```powershell
npm.cmd run types:check
```

Expected: PASS with no TypeScript errors.

- [ ] **Step 4: Check lint and formatting**

Run:

```powershell
npm.cmd run lint:check
npm.cmd exec prettier -- --check resources/js/pages/mapa.tsx
```

Expected: both commands pass.

- [ ] **Step 5: Run the route test again**

Run:

```powershell
php artisan test --compact tests/Feature/MapPageTest.php
```

Expected: PASS with the same public-page assertions.

- [ ] **Step 6: Commit the map implementation**

```powershell
git add resources/js/pages/mapa.tsx
git commit -m "feat: add Leaflet map foundation"
```

### Task 3: Document and Verify the Integration

**Files:**
- Modify: `README.md`
- Verify: `resources/js/pages/mapa.tsx`

- [ ] **Step 1: Add a brief Leaflet note to the README**

Append after the Stack section:

```markdown
## Map

The public `/map` page initializes Leaflet in `resources/js/pages/mapa.tsx`. That file contains the map container, initial Montevideo view, tile layer, and React cleanup.
```

- [ ] **Step 2: Verify all automated checks**

Run:

```powershell
php artisan test --compact tests/Feature/MapPageTest.php
npm.cmd run types:check
npm.cmd run lint:check
npm.cmd run format:check
npm.cmd run build
```

Expected: every command exits successfully. The production manifest includes a `mapa` chunk and Leaflet CSS.

- [ ] **Step 3: Verify the map visually**

Open `http://localhost:8000/map` and confirm:

- The map fills the viewport.
- The initial view shows Montevideo.
- CARTO tiles load instead of a blank background.
- Native `+` and `−` zoom controls work.
- OpenStreetMap and CARTO attribution is visible.
- Browser console has no Leaflet initialization errors.

- [ ] **Step 4: Verify Inertia cleanup**

Navigate from `/map` to `/`, then return to `/map` using application links or browser navigation.

Expected: the map renders again and the console does not contain `Map container is already initialized`.

- [ ] **Step 5: Commit documentation**

```powershell
git add README.md
git commit -m "docs: explain Leaflet entry point"
```

- [ ] **Step 6: Push the completed work**

```powershell
git push origin main
```

Expected: the Leaflet commits are published to the private `inegarci/cafeLaravel` repository.

