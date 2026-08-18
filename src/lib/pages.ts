import { buildLastUpdated, assertRegistryDates, type LastUpdated } from './getLastModified'

/**
 * Single registry of every routed page on the site.
 *
 * One entry here gives a page three things at once:
 *   - its BreadcrumbList JSON-LD (via `breadcrumbsFor`)
 *   - its last-updated date (via `lastUpdatedFor`), which feeds the
 *     `article:modified_time` meta tag, the JSON-LD `dateModified`, and the
 *     visible "Updated ___" UI from one value so they cannot diverge
 *   - its label wherever a page is linked by route (hub cards, footer)
 *
 * Adding a page later is one line in PAGES.
 *
 * `lastUpdated` is the source of truth and is deliberately hand-maintained:
 * bump it when you materially change a page's content. It is NOT derived from
 * git — a shallow CI clone silently resolves to the wrong date, and a commit
 * that only fixes a typo should not advance a page's published freshness.
 */
export interface PageEntry {
  /** Breadcrumb trail label and hub-card label. */
  name: string
  /** Repo-relative source file. */
  file: string
  /**
   * Date this page's content was last materially updated, `YYYY-MM-DD`.
   * Required — a missing value is a TypeScript error, and a malformed or
   * future value fails the build (see `assertRegistryDates`).
   */
  lastUpdated: string
  /** Parent route, for pages nested one level under a hub. */
  parent?: string
}

export const PAGES = {
  '/': {
    name: 'Home',
    file: 'src/app/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/first-visit': {
    name: 'First Visit Guide',
    file: 'src/app/first-visit/page.tsx',
    lastUpdated: '2026-07-09',
  },
  '/itineraries': {
    name: 'Itineraries',
    file: 'src/app/itineraries/page.tsx',
    lastUpdated: '2026-06-22',
  },
  '/itineraries/disneyland-1-day': {
    name: 'Disneyland 1-Day',
    file: 'src/app/itineraries/disneyland-1-day/page.tsx',
    lastUpdated: '2026-06-22',
    parent: '/itineraries',
  },
  '/itineraries/disneyland-2-day': {
    name: 'Disneyland 2-Day',
    file: 'src/app/itineraries/disneyland-2-day/page.tsx',
    lastUpdated: '2026-06-22',
    parent: '/itineraries',
  },
  '/itineraries/disneyland-3-day': {
    name: 'Disneyland 3-Day',
    file: 'src/app/itineraries/disneyland-3-day/page.tsx',
    lastUpdated: '2026-06-22',
    parent: '/itineraries',
  },
  '/itineraries/dca-1-day': {
    name: 'DCA 1-Day',
    file: 'src/app/itineraries/dca-1-day/page.tsx',
    lastUpdated: '2026-06-22',
    parent: '/itineraries',
  },
  '/itineraries/dca-2-day': {
    name: 'DCA 2-Day',
    file: 'src/app/itineraries/dca-2-day/page.tsx',
    lastUpdated: '2026-06-22',
    parent: '/itineraries',
  },
  '/itineraries/park-hopper-2-day': {
    name: 'Park Hopper 2-Day',
    file: 'src/app/itineraries/park-hopper-2-day/page.tsx',
    lastUpdated: '2026-07-09',
    parent: '/itineraries',
  },
  '/itineraries/park-hopper-3-day': {
    name: 'Park Hopper 3-Day',
    file: 'src/app/itineraries/park-hopper-3-day/page.tsx',
    lastUpdated: '2026-07-09',
    parent: '/itineraries',
  },
  '/seasonal': {
    name: 'Best Time to Visit',
    file: 'src/app/seasonal/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/lightning-lane': {
    name: 'Lightning Lane',
    file: 'src/app/lightning-lane/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/saving-money': {
    name: 'Saving Money',
    file: 'src/app/saving-money/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/rides': {
    name: 'Rides for Kids',
    file: 'src/app/rides/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/characters': {
    name: 'Characters',
    file: 'src/app/characters/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/food': {
    name: 'Food & Snacks',
    file: 'src/app/food/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/packing-list': {
    name: 'Packing List',
    file: 'src/app/packing-list/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/hidden-gems': {
    name: 'Hidden Gems',
    file: 'src/app/hidden-gems/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/fireworks': {
    name: 'Fireworks',
    file: 'src/app/fireworks/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/best-strollers': {
    name: 'Best Strollers',
    file: 'src/app/best-strollers/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/news': {
    name: 'News',
    file: 'src/app/news/page.tsx',
    lastUpdated: '2026-07-28',
  },
  '/privacy': {
    name: 'Privacy Policy',
    file: 'src/app/privacy/page.tsx',
    lastUpdated: '2026-04-22',
  },
  '/contact': {
    name: 'Contact',
    file: 'src/app/contact/page.tsx',
    lastUpdated: '2026-08-17',
  },
  '/about': {
    name: 'About',
    file: 'src/app/about/page.tsx',
    lastUpdated: '2026-08-17',
  },
} satisfies Record<string, PageEntry>

export type PagePath = keyof typeof PAGES

// Validates every entry at module load. Because every routed page imports this
// module, a malformed, missing or future `lastUpdated` fails `next build` loudly
// instead of silently resolving to a fallback date.
assertRegistryDates(PAGES)

export interface Crumb {
  name: string
  path: string
}

/**
 * Home > [parent] > [page]. Two levels for most pages, three for the itinerary
 * sub-routes and anything else that declares a `parent`.
 */
export function breadcrumbsFor(path: PagePath): Crumb[] {
  const entry: PageEntry = PAGES[path]
  const trail: Crumb[] = [{ name: PAGES['/'].name, path: '/' }]

  if (entry.parent) {
    const parent: PageEntry = PAGES[entry.parent as PagePath]
    trail.push({ name: parent.name, path: entry.parent })
  }

  trail.push({ name: entry.name, path })
  return trail
}

/**
 * The one source of truth for "when did this page last change".
 *
 * Every consumer — the `article:modified_time` meta tag, JSON-LD
 * `dateModified`, and the visible "Updated ___" UI — derives its string from
 * this single object, so the three can never show different dates.
 */
export function lastUpdatedFor(path: PagePath): LastUpdated {
  return buildLastUpdated(PAGES[path].lastUpdated)
}
