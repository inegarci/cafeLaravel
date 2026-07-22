# Public Map Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public `/map` Inertia page and a full-width “Empecemos” action beneath the welcome page authentication actions.

**Architecture:** Laravel exposes the page with a named public `Route::inertia` route. Wayfinder generates the typed `map()` frontend route helper, and the welcome page uses an Inertia `Link` so navigation stays client-side. A focused PHPUnit feature test proves guests can access the new page.

**Tech Stack:** Laravel 13, Inertia.js 3, React 19, Wayfinder, Tailwind CSS 4, PHPUnit 12, TypeScript

---

## File Structure

- Create `tests/Feature/MapPageTest.php`: proves `/map` is public and renders the expected Inertia component.
- Modify `routes/web.php`: registers the public named route.
- Create `resources/js/pages/mapa.tsx`: owns the initial public map-page presentation.
- Modify `resources/js/pages/welcome.tsx`: owns the two-row welcome action layout and link to the map.
- Generated `resources/js/routes/index.ts`: refreshed by Wayfinder; do not edit manually.

### Task 1: Prove the Public Map Route

**Files:**
- Create: `tests/Feature/MapPageTest.php`
- Modify: `routes/web.php`
- Create: `resources/js/pages/mapa.tsx`

- [ ] **Step 1: Create the failing PHPUnit feature test**

Run:

```powershell
php artisan make:test --phpunit MapPageTest --no-interaction
```

Replace the generated test with:

```php
<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class MapPageTest extends TestCase
{
    public function test_guests_can_view_the_map_page(): void
    {
        $response = $this->get('/map');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('mapa')
        );
    }
}
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
php artisan test --compact tests/Feature/MapPageTest.php
```

Expected: FAIL because `/map` returns 404.

- [ ] **Step 3: Register the minimal public route**

Add immediately after the home route in `routes/web.php`:

```php
Route::inertia('/map', 'mapa')->name('map');
```

Keep it outside the `auth` and `verified` middleware group.

- [ ] **Step 4: Create the minimal Inertia page**

Create `resources/js/pages/mapa.tsx`:

```tsx
import { Head } from '@inertiajs/react';

export default function Mapa() {
    return (
        <>
            <Head title="Mapa" />

            <main className="bg-cafecitos flex min-h-screen items-center justify-center p-6">
                <h1 className="text-5xl font-bold tracking-[0.08em] text-[#722f37] uppercase">
                    Mapa
                </h1>
            </main>
        </>
    );
}
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```powershell
php artisan test --compact tests/Feature/MapPageTest.php
```

Expected: PASS, 1 test passed.

- [ ] **Step 6: Regenerate Wayfinder routes**

Run:

```powershell
php artisan wayfinder:generate --with-form --no-interaction
```

Expected: success; `resources/js/routes/index.ts` exports `map`.

### Task 2: Add the Full-Width Empecemos Action

**Files:**
- Modify: `resources/js/pages/welcome.tsx`

- [ ] **Step 1: Import the typed map route**

Replace the route imports with:

```tsx
import { dashboard, login, map, register } from '@/routes';
```

- [ ] **Step 2: Replace the existing navigation block**

Replace the current `<nav>` with this shared-width action group:

```tsx
<div className="flex w-full max-w-[250px] flex-col gap-4">
    <nav className="flex w-full items-center justify-center gap-4">
        {auth.user ? (
            <Link
                href={dashboard()}
                className="w-full rounded-md bg-[#722f37] px-6 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#5d252d]"
            >
                Dashboard
            </Link>
        ) : (
            <>
                <Link
                    href={login()}
                    className="flex-1 rounded-md border border-[#722f37] px-6 py-2.5 text-center text-sm font-medium text-[#722f37] transition hover:bg-[#722f37] hover:text-white"
                >
                    Login
                </Link>

                <Link
                    href={register()}
                    className="flex-1 rounded-md bg-[#722f37] px-6 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#5d252d]"
                >
                    Register
                </Link>
            </>
        )}
    </nav>

    <Link
        href={map()}
        className="w-full rounded-md bg-[#722f37] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_4px_24px_rgba(44,36,32,0.14)] transition hover:bg-[#5d252d]"
    >
        Empecemos
    </Link>
</div>
```

The outer `max-w-[250px]` defines one shared width. The top row fills it with two `flex-1` actions, while “Empecemos” uses `w-full` beneath it.

- [ ] **Step 3: Check frontend types**

Run:

```powershell
npm run types:check
```

Expected: PASS with no TypeScript errors.

- [ ] **Step 4: Check frontend lint**

Run:

```powershell
npm run lint:check
```

Expected: PASS with no ESLint errors.

### Task 3: Final Verification

**Files:**
- Verify: `tests/Feature/MapPageTest.php`
- Verify: `routes/web.php`
- Verify: `resources/js/pages/mapa.tsx`
- Verify: `resources/js/pages/welcome.tsx`

- [ ] **Step 1: Format modified PHP**

Run:

```powershell
vendor/bin/pint --dirty --format agent
```

Expected: PASS; modified PHP follows project formatting.

- [ ] **Step 2: Run the focused backend test again**

Run:

```powershell
php artisan test --compact tests/Feature/MapPageTest.php
```

Expected: PASS.

- [ ] **Step 3: Build production frontend assets**

Run:

```powershell
npm run build
```

Expected: PASS; Vite emits updated `welcome` and `mapa` assets.

- [ ] **Step 4: Verify both public endpoints**

Run:

```powershell
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8000/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8000/map
```

Expected: both responses return HTTP 200.

## Repository Note

The application directory is not currently a Git repository, so commit steps are intentionally omitted. If Git is initialized later, commit the test and route/page change together as one feature commit.

