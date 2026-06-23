/**
 * Shared types + label maps + formatters for the news-system primitive family.
 * Visual reference only — no live newsroom is wired. Fixtures are real
 * Oak Flats Mufflermen news copy (dyno install, EV bay, awards, promos).
 */

export type NewsTone = "red" | "amber" | "teal" | "green" | "neutral"

export type NewsCategory =
  | "workshop"
  | "ev"
  | "awards"
  | "promotions"
  | "community"
  | "press"

export interface NewsAuthor {
  name: string
  role: string
}

export interface NewsItem {
  id: string
  category: NewsCategory
  source: string
  /** ISO timestamp — formatted relative to a fixed "now" so SSR is stable. */
  publishedAt: string
  headline: string
  summary: string
  author?: NewsAuthor
  readMinutes: number
  tone: NewsTone
  /** Optional kicker shown above the headline in hero/feature contexts. */
  kicker?: string
}

export interface PressReleaseSection {
  heading: string
  body: ReadonlyArray<string>
}

export interface NewsCategoryTab {
  category: NewsCategory
  label: string
  count: number
}

export interface NewsTickerEntry {
  id: string
  label: string
  headline: string
  tone: NewsTone
}

/** Fixed reference clock so relative timestamps render identically on server + client. */
export const NEWS_NOW = Date.UTC(2026, 4, 29, 9, 0, 0)

export const CATEGORY_LABEL: Record<NewsCategory, string> = {
  workshop: "Workshop",
  ev: "EV & Hybrid",
  awards: "Awards",
  promotions: "Promotions",
  community: "Community",
  press: "Press",
}

export const CATEGORY_TONE: Record<NewsCategory, NewsTone> = {
  workshop: "red",
  ev: "teal",
  awards: "amber",
  promotions: "green",
  community: "neutral",
  press: "red",
}

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** Relative "time ago" against the fixed reference clock. */
export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  const delta = NEWS_NOW - then
  if (delta < HOUR) {
    const mins = Math.max(1, Math.round(delta / MINUTE))
    return `${mins} min${mins === 1 ? "" : "s"} ago`
  }
  if (delta < DAY) {
    const hours = Math.round(delta / HOUR)
    return `${hours} hr${hours === 1 ? "" : "s"} ago`
  }
  const days = Math.round(delta / DAY)
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`
  const months = Math.round(days / 30)
  return `${months} month${months === 1 ? "" : "s"} ago`
}

/** Absolute, locale-stable date label (no timezone drift across SSR/CSR). */
export function formatAbsoluteDate(iso: string): string {
  const d = new Date(iso)
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

/** Real Mufflermen news fixtures — newest first. */
export const NEWS_ITEMS: ReadonlyArray<NewsItem> = [
  {
    id: "dyno-install",
    category: "workshop",
    source: "Workshop Desk",
    publishedAt: "2026-05-29T07:30:00Z",
    headline: "New Mainline Hub Dyno goes live in Bay 3",
    summary:
      "Our new Mainline Hub all-wheel-drive dyno is now calibrated and pulling numbers. Tune-and-prove runs, before/after sheets, and a printed power graph come standard with every performance job.",
    author: { name: "Dave Renshaw", role: "Head Technician" },
    readMinutes: 3,
    tone: "red",
    kicker: "Workshop upgrade",
  },
  {
    id: "ev-bay",
    category: "ev",
    source: "Oak Flats Mufflermen",
    publishedAt: "2026-05-28T22:15:00Z",
    headline: "Dedicated EV & hybrid service bay now open",
    summary:
      "Bay 5 has been re-fitted with isolated high-voltage tooling and a 22 kW charger. We now handle EV exhaust-delete inspections, hybrid heat-shield work, and battery-tray corrosion checks.",
    author: { name: "Priya Nathan", role: "Service Manager" },
    readMinutes: 4,
    tone: "teal",
    kicker: "EV & hybrid",
  },
  {
    id: "best-workshop-award",
    category: "awards",
    source: "Illawarra Trade Awards",
    publishedAt: "2026-05-22T03:00:00Z",
    headline: "Voted Illawarra's Best Independent Workshop 2026",
    summary:
      "For the third year running, Oak Flats Mufflermen has taken out the Illawarra Trade Award for Best Independent Workshop — judged on customer ratings, turnaround, and warranty record.",
    author: { name: "Front Desk", role: "Newsroom" },
    readMinutes: 2,
    tone: "amber",
    kicker: "Recognition",
  },
  {
    id: "winter-exhaust-promo",
    category: "promotions",
    source: "Oak Flats Mufflermen",
    publishedAt: "2026-05-20T01:45:00Z",
    headline: "Winter cat-back special: 15% off stainless systems",
    summary:
      "Book a full stainless cat-back exhaust through July and take 15% off parts plus a free under-body inspection. Stainless mandrel-bent in-house, lifetime weld warranty included.",
    readMinutes: 2,
    tone: "green",
    kicker: "Limited offer",
  },
  {
    id: "apprentice-intake",
    category: "community",
    source: "Oak Flats Mufflermen",
    publishedAt: "2026-05-14T05:20:00Z",
    headline: "Two new apprentices join the Oak Flats crew",
    summary:
      "We've welcomed Mason and Aisha onto the floor as first-year automotive apprentices, backed by our partnership with TAFE Illawarra. Mentoring the next generation of exhaust specialists.",
    author: { name: "Front Desk", role: "Newsroom" },
    readMinutes: 2,
    tone: "neutral",
    kicker: "Our team",
  },
  {
    id: "ceramic-coating",
    category: "workshop",
    source: "Workshop Desk",
    publishedAt: "2026-05-08T23:10:00Z",
    headline: "In-house ceramic exhaust coating now available",
    summary:
      "We've added a ceramic-coating oven for headers and downpipes — lower under-bonnet temps, a satin-black finish, and corrosion protection rated past 1,000°C.",
    author: { name: "Dave Renshaw", role: "Head Technician" },
    readMinutes: 3,
    tone: "red",
    kicker: "New service",
  },
]

/** Standalone breaking item — newest workshop milestone, surfaced as a banner. */
export const BREAKING_NEWS: NewsItem = NEWS_ITEMS[0]

/** Hero feature — the EV bay launch. */
export const FEATURED_NEWS: NewsItem = NEWS_ITEMS[1]

export const CATEGORY_TABS: ReadonlyArray<NewsCategoryTab> = [
  { category: "workshop", label: CATEGORY_LABEL.workshop, count: 2 },
  { category: "ev", label: CATEGORY_LABEL.ev, count: 1 },
  { category: "awards", label: CATEGORY_LABEL.awards, count: 1 },
  { category: "promotions", label: CATEGORY_LABEL.promotions, count: 1 },
  { category: "community", label: CATEGORY_LABEL.community, count: 1 },
]

export const TICKER_ENTRIES: ReadonlyArray<NewsTickerEntry> = [
  { id: "t-dyno", label: "Live", headline: "Mainline Hub dyno now running in Bay 3", tone: "red" },
  { id: "t-ev", label: "New", headline: "EV & hybrid service bay open in Bay 5", tone: "teal" },
  { id: "t-award", label: "Award", headline: "Illawarra's Best Independent Workshop 2026", tone: "amber" },
  { id: "t-promo", label: "Offer", headline: "15% off stainless cat-back systems till July", tone: "green" },
  { id: "t-team", label: "Team", headline: "Two new apprentices on the Oak Flats floor", tone: "neutral" },
]

export const PRESS_RELEASE: {
  dateline: string
  location: string
  title: string
  standfirst: string
  sections: ReadonlyArray<PressReleaseSection>
  contact: { name: string; role: string; email: string; phone: string }
} = {
  dateline: "2026-05-28T22:15:00Z",
  location: "OAK FLATS, NSW",
  title: "Oak Flats Mufflermen opens dedicated EV & hybrid service bay",
  standfirst:
    "The Illawarra exhaust specialist invests in high-voltage tooling and fast charging to service the region's growing electric and hybrid fleet.",
  sections: [
    {
      heading: "A purpose-built bay",
      body: [
        "Oak Flats Mufflermen today announced the opening of Bay 5, a dedicated electric-vehicle and hybrid service bay fitted with isolated high-voltage tooling, insulated lifting equipment, and a 22 kilowatt fast charger.",
        "The investment positions the family-run workshop as one of the few independent shops in the Illawarra equipped to handle the specialised under-body and heat-management work that modern electrified vehicles require.",
      ],
    },
    {
      heading: "What the bay services",
      body: [
        "The new bay handles EV exhaust-delete inspections, hybrid heat-shield replacement, battery-tray corrosion checks, and under-body protection — work that conventional exhaust shops are often not tooled to perform safely.",
        "All high-voltage procedures are carried out by technicians certified to depower and reinitialise traction systems, keeping both staff and customers safe.",
      ],
    },
    {
      heading: "Backed by three decades on the bench",
      body: [
        "The EV bay sits alongside the workshop's new Mainline Hub dyno and in-house ceramic-coating oven, part of a broader 2026 modernisation programme.",
        "Oak Flats Mufflermen was voted the Illawarra's Best Independent Workshop for the third consecutive year in May 2026.",
      ],
    },
  ],
  contact: {
    name: "Priya Nathan",
    role: "Service Manager",
    email: "media@mufflermen.com.au",
    phone: "(02) 4256 0000",
  },
}
