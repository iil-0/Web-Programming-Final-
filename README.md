<p align="center">
  <img src="app/assets/images/logo.png" alt="BiletixProjem" width="240" />
</p>

<h1 align="center">BiletixProjem</h1>

<p align="center">
  Event ticketing platform — Nuxt 4 &middot; Vue 3 &middot; Firebase &middot; Pinia &middot; TypeScript
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-4.2-00DC82?logo=nuxt.js&logoColor=white" alt="Nuxt" />
  <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Pinia-3-ffd859?logo=vue.js&logoColor=white" alt="Pinia" />
  <img src="https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white" alt="TypeScript" />
</p>

---

## What This Is

A functional front-end replica of [biletix.com](https://www.biletix.com) — Turkey's largest event ticketing platform. The project recreates the core user flows: event discovery, performance browsing, ticket selection, cart management, and user authentication, built from scratch using Nuxt 4, Vue 3, and Firebase.

---

## Architecture

**Nuxt 4** with file-based routing, layout system (`default`, `event-group`, `auth`), and client-only Firebase plugin injection via `provide/inject`. All state management runs through **Pinia** with 7 dedicated stores, each encapsulating its own Firestore queries and error handling.

The component layer follows **Atomic Design**:

| Level | Role | Examples |
|-------|------|---------|
| `atoms/` | Reusable primitives | `BaseButton`, `BaseInput`, `BaseSelect`, `BaseLogo` |
| `molecules/` | Composed UI blocks | `EventListItem`, `TicketStart`, `SearchBox`, `SliderItem` |
| `organisms/` | Full page sections | `MainHeader`, `FeaturedSection`, `SpotlightSlider`, `TicketSelection`, `OrderSummary` |

---

## State Management

Seven Pinia stores, all using the Composition API (`setup` syntax):

| Store | Responsibility |
|-------|---------------|
| `user` | Firebase Auth lifecycle — `onAuthStateChanged` listener, login/register actions, Firestore profile read/write |
| `sepet` | Cart with **dual persistence**: `localStorage` for anonymous users, Firestore `carts/{uid}` for authenticated users, with `syncAfterLogin()` merge strategy |
| `eventGroup` | Fetches event groups by slug, maps static hero images per slug |
| `performance` | Queries performances by `eventGroupSlug` (Firestore `where`), or by document ID |
| `spotlight` | Home page spotlight carousel data |
| `featured` | Home page featured events grid data |
| `categorySpotlight` | Music/Stage category showcase items |

---

## Routing

| Route | Page | Layout |
|-------|------|--------|
| `/` | Home — spotlight slider, featured carousel, category showcases | `default` |
| `/etkinlik-group/[slug]` | Event group detail — tabbed sections (about, calendar, rules) | `event-group` |
| `/performance/[id]` | Performance — ticket category selection, order summary, seat info | `event-group` |
| `/cart` | Cart — grouped items, quantity control, checkout summary | `default` |
| `/auth/login` | Login with Firebase Auth | `auth` |
| `/auth/register` | Registration with KVKK consent flow | `auth` |

---

## Notable Implementation Details

- **Cart persistence strategy**: Anonymous sessions persist to `localStorage`. On login, `syncAfterLogin(uid)` merges the local cart into Firestore, then clears local storage — no data loss across auth transitions.
- **Auth state management**: A single `onAuthStateChanged` listener initializes once, hydrates the user store, and pulls the Firestore profile document on every session restore.
- **Firebase as plugin**: Initialized client-side only via `firebase.client.ts`, injected as `$db` and `$auth` through Nuxt's plugin `provide` — keeps Firebase out of SSR context.
- **Hero image mapping**: Static imports mapped to event slugs at the store level, avoiding runtime asset resolution.
- **Firestore seeding**: `pnpm seed` runs a standalone script that populates `eventGroups` and `performances` collections with structured sample data.

---

## Tech Stack

| Concern | Choice |
|---------|--------|
| Meta-framework | Nuxt 4 (SSR / SPA / SSG) |
| View layer | Vue 3.5 — `<script setup>`, Composition API |
| Type system | TypeScript with shared interfaces (`types/interfaces.ts`) |
| State | Pinia 3 — reactive stores with Firestore integration |
| Auth | Firebase Authentication (email/password) |
| Database | Cloud Firestore — collections: `eventGroups`, `performances`, `users`, `carts` |
| Carousel | Swiper 12 |
| Styling | Sass + CSS Custom Properties (design tokens) |
| Package manager | pnpm |

---

## Project Structure

```
app/
├── components/
│   ├── atoms/              12 base components
│   ├── molecules/          16 composed components
│   └── organisms/          20 page-level sections
├── layouts/                default · event-group · auth
├── pages/                  6 routes (2 dynamic)
├── stores/                 7 Pinia stores
├── plugins/                Firebase client init
├── styles/                 Global tokens, header, footer
├── types/                  Shared TypeScript interfaces
└── data/                   Static category/ticket data

scripts/
└── seed-firestore.mjs      Firestore seed script
```

---

## Getting Started

```bash
git clone https://github.com/iil-0/Web-Programming-Final-.git
cd Web-Programming-Final-
pnpm install
pnpm seed
pnpm dev
```

## Build

```bash
pnpm build       # SSR production
pnpm generate    # Static export
pnpm preview     # Local preview
```