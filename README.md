# Centinela — frontend-app

Angular 16 single-page app for the Centinela research platform. Part of the
`PlataformaIntegradaInvestigadores` multi-repo org — this repo is UI only; it
never talks to a backend port directly, only through a reverse proxy
(`api-gateway` in staging/production, or your own local instance — see
[Architecture](#architecture)).

## Requirements

- Node 18 (`.nvmrc` pins the exact version; the Docker build image uses
  `node:18.18-alpine3.18`)
- npm (this repo uses `package-lock.json` — not pnpm/yarn, despite what you
  might find referenced elsewhere)
- Docker Desktop — only needed for the Docker workflow below
- A running backend stack if you need real API responses (see
  [Running the full stack](#running-the-full-stack-optional)) — not required
  for isolated UI/component work

## Architecture

- **Angular 16, NgModule-based** (not standalone components). Each feature
  area lives at `src/app/<feature>/`, split into:
  - `domain/` — business logic: `services/` (HTTP calls + state) and
    `entities/` (TypeScript interfaces for API payloads/models).
  - `presentation/` — UI: `pages/` (routed top-level views) and
    `components/` (reusable pieces within the feature).
- **`src/app/shared/`** — anything reused across 2+ features: `components/`,
  `domain/services/`, `interceptors/` (`AuthInterceptor` attaches the bearer
  token to every outgoing request), `interfaces/`, and `d3/` (shared D3.js
  graph/visualization helpers used by the various network/chart components).
- **`src/guards/`** — route guards (`auth.guard`, `phase.guard`,
  `researcher-only.guard`, etc.), deliberately kept outside `src/app/` so
  they stay a single shared, discoverable set rather than duplicated per
  feature.
- **Routing**: `app-routing.module.ts` defines the top-level paths. Most
  feature areas are lazy-loaded via `loadChildren` (code-split per feature);
  a few older ones are still eagerly imported into `AppModule` (auth
  components, home-page, about-us). Lazy loading is the expectation for
  anything new — see [Building a new module](#building-a-new-modulefeature).
- **State**: no NgRx/global store. Services expose state via RxJS
  `BehaviorSubject`/`Subject` and are injected as Angular singletons
  (`providedIn: 'root'`, or listed in a feature module's `providers`) — see
  `AuthService` or `WebSocketService` for the pattern.
- **Networking**: every backend call goes through a *relative* path —
  `environment.apiIdentity` / `apiSocial` / `apiSearch` / `apiPredictive` /
  `wsUrl` (see `src/environments/`) resolve to `/api/identity`, `/api/social`,
  etc., same-origin, never an absolute URL to a backend port. The app assumes
  something in front of it (an `api-gateway` reverse proxy in
  staging/production, or `ng serve`'s dev proxy locally) does the actual
  routing to each backend service. This is why the frontend alone, with
  nothing in front of it, can reach the UI but every API call will fail.
- **Styling**: mixed stack — Tailwind (+ Flowbite) is the primary one for new
  work (`src/styles.css`, `tailwind.config.js`); Bootstrap CSS and an Angular
  Material theme are also globally loaded (`angular.json` → `styles`) for
  older components that predate the Tailwind adoption. Don't add more
  Bootstrap-dependent UI — use Tailwind/Flowbite for anything new.

## Running locally

### Option A — Docker (closest to production, no hot reload)

```sh
docker compose build
docker compose up
```

Serves the built app at **http://localhost:8082** through the bundled
`nginx.conf`. This only builds and serves *this* repo — it does not start
`api-gateway` or any backend, so API calls will fail unless those are also
running (see below).

To add a new npm dependency in this workflow: find the running container id
with `docker ps`, then `docker exec -it <container_id> /bin/sh` and
`npm install <package>` inside it — then rebuild (`docker compose up --build`)
so the change actually lands in the image.

### Option B — `ng serve` (fast dev loop, hot reload)

```sh
npm install
npm start        # = ng serve, http://localhost:4200
```

`ng serve` proxies `/api`, `/ws`, and `/media` to `http://localhost:8080`
(see `proxy.conf.json`, wired into `angular.json`'s `serve` config) — that's
the host port `api-gateway` listens on when it's run via Docker. To get real
API responses while iterating with hot reload:

1. Start the backend stack you need (at minimum `api-gateway`, plus whichever
   services you're working against) — see each backend repo's own README, or
   `centinela-ops` for the full-stack compose. `api-gateway` needs to end up
   reachable at `127.0.0.1:8080` for the proxy above to work.
2. `npm start` here.
3. Open **http://localhost:4200** — API calls now flow through the proxy to
   `:8080` the same way they'd flow through the real gateway in
   staging/production.

If you're only doing isolated UI/presentation work, `ng serve` still works
without any backend running — API calls just 404, which is fine when you're
not exercising that code path.

### Running the full stack (optional)

This repo doesn't orchestrate the other 12 services — that lives in
`centinela-ops` (or by running each backend repo's own `docker compose up`
individually, exposing `api-gateway` on `127.0.0.1:8080`). See that repo, or
`plan.md` at the root of the multi-repo checkout, for the current
orchestration approach.

## Testing & coverage

```sh
npm test              # ng test — Karma/Jasmine, opens a real Chrome window
```

CI runs `ng test --code-coverage`. `karma.conf.js`'s
`coverageReporter.check.global` enforces a **90% floor on statements,
branches, functions, and lines** — a PR that drops any one of those below
90% fails CI outright. When adding tests, prefer covering the actual missing
branches (error paths, `??`/`||` fallbacks, edge cases) over padding trivial
assertions that don't move branch coverage.

## Building a new module/feature

Follow the existing convention under `src/app/<feature-name>/`:

```
src/app/<feature>/
├── domain/
│   ├── entities/                 # TS interfaces for API payloads/models
│   └── services/                 # HTTP calls + RxJS state, providedIn:'root' or module-level
├── presentation/
│   ├── pages/                    # routed top-level views
│   └── components/               # reusable pieces used within this feature
├── <feature>.module.ts           # declarations / imports / exports / providers
└── <feature>-routing.module.ts   # feature-local routes
```

1. Scaffold with the Angular CLI (`ng generate module <feature> --routing`,
   `ng generate component <feature>/presentation/pages/...`, etc.) inside
   that structure rather than hand-rolling the boilerplate.
2. Wire the feature into `app-routing.module.ts` via `loadChildren` (lazy)
   unless there's a specific reason it must load eagerly (e.g. it's needed
   on first paint, like auth). Lazy is the default for anything new.
3. Put anything genuinely reused by 2+ features into `src/app/shared/`
   instead of duplicating it — components, services, interfaces, or the
   `d3/` helpers as appropriate.
4. If the feature needs a route guard, add it to `src/guards/`, not inside
   the feature folder, so it stays part of the same discoverable set as the
   existing guards.
5. Write specs alongside each new file (`*.component.spec.ts`,
   `*.service.spec.ts`) as you go, not at the end — the 90% coverage gate
   means untested new code drags the whole build under threshold fast, since
   it adds to both the statement and branch denominators.
6. If the feature needs a new backend route, that's an `api-gateway` change
   (see that repo's `nginx.conf`), not something to work around in the
   frontend — this app should only ever call relative `/api/...` paths that
   an environment file (`src/environments/`) already knows about.

## Notes

- `/admin/` — Scopus data extraction panel/process.
