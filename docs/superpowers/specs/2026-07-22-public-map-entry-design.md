# Public Map Entry Design

## Goal

Extend the Cafecitos welcome page with a full-width “Empecemos” action beneath the existing Login and Register actions. The action opens a new public Inertia page at `/map`.

## Welcome Layout

- Keep the “Cafecitos” title and subtitle centered over the striped background.
- Keep Login and Register side by side in one row for unauthenticated visitors.
- Place “Empecemos” beneath that row with visible vertical spacing.
- Wrap both rows in one fixed-width action group so “Empecemos” spans the combined width occupied by Login and Register.
- For authenticated visitors, retain the existing Dashboard action and show “Empecemos” beneath it using the same action-group width.
- Navigate with an Inertia `Link` and the generated Wayfinder route instead of a hard-coded URL or imperative timeout.

## Public Map Page

- Create the Inertia React page at `resources/js/pages/mapa.tsx`.
- Register a public named route at `/map` with route name `map`.
- Do not add authentication or email-verification middleware to this route.
- Initially render a minimal page with an Inertia `Head` title and a visible “Mapa” heading. Actual map-provider integration is outside this change.

## Data Flow

1. Laravel renders the public `welcome` Inertia page.
2. Wayfinder generates a typed frontend helper for the named `map` route.
3. Clicking “Empecemos” performs an Inertia visit to `/map`.
4. Laravel renders the public `mapa` Inertia page without requiring a session.

## Verification

- Add a PHPUnit feature test asserting that a guest can request `/map` and receives the `mapa` Inertia component.
- Run that test first before implementation and confirm it fails because the route does not exist.
- Implement the route, page, and welcome action.
- Run the focused PHPUnit test, frontend type check, lint check, and production build.

