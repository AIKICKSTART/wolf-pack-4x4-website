import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./marketplace.module.css"

export const metadata: Metadata = {
  title: "Marketplace primitives | UI Primitives",
  description:
    "Plugin marketplace primitives shipped from the Oak Flats Mufflermen workshop — discovery, install state, permissions, compatibility, and progress.",
}

interface MarketplaceScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
  preview: ReadonlyArray<{ label: string; value: string }>
}

const SCENES: ReadonlyArray<MarketplaceScene> = [
  {
    kicker: "Scene 01",
    title: "Plugin card",
    body: "Discovery card — logo mark, author, description, rating, price chip, install CTA.",
    href: "/ui-primitives/marketplace/plugin-card",
    accent: "teal",
    glyph: "SC",
    state: "Visual only",
    preview: [
      { label: "Cards", value: "6 plugins" },
      { label: "States", value: "3 install" },
    ],
  },
  {
    kicker: "Scene 02",
    title: "Category sidebar",
    body: "Left navigation rail — 12 plugin categories with live count chips and active state.",
    href: "/ui-primitives/marketplace/category-sidebar",
    accent: "amber",
    glyph: "CAT",
    state: "Navigational",
    preview: [
      { label: "Cats", value: "12" },
      { label: "Active", value: "CRM" },
    ],
  },
  {
    kicker: "Scene 03",
    title: "Featured banner",
    body: "Carousel hero — large image-placeholder, headline copy, install CTA, dot indicators.",
    href: "/ui-primitives/marketplace/featured-banner",
    accent: "red",
    glyph: "FEAT",
    state: "Stateful · carousel",
    preview: [
      { label: "Slides", value: "3" },
      { label: "Auto", value: "8s" },
    ],
  },
  {
    kicker: "Scene 04",
    title: "Install button",
    body: "All five install states — install, installing, installed, update available, uninstall.",
    href: "/ui-primitives/marketplace/install-button",
    accent: "red",
    glyph: "↓",
    state: "Stateful · live",
    preview: [
      { label: "States", value: "5" },
      { label: "ARIA", value: "Live" },
    ],
  },
  {
    kicker: "Scene 05",
    title: "Plugin detail header",
    body: "Detail page header — large logo, title, author, tagline, install slot, tab strip.",
    href: "/ui-primitives/marketplace/plugin-detail-header",
    accent: "teal",
    glyph: "HDR",
    state: "Tabbed",
    preview: [
      { label: "Tabs", value: "5" },
      { label: "Author", value: "OFM" },
    ],
  },
  {
    kicker: "Scene 06",
    title: "Review card",
    body: "Customer review — avatar, name, star rating, body, verified-purchase chip, helpful counter.",
    href: "/ui-primitives/marketplace/review-card",
    accent: "amber",
    glyph: "★★★★★",
    state: "Visual only",
    preview: [
      { label: "Reviews", value: "4" },
      { label: "Rating", value: "4.6 ★" },
    ],
  },
  {
    kicker: "Scene 07",
    title: "Author chip",
    body: "Compact author chip with avatar, verified badge, optional profile link.",
    href: "/ui-primitives/marketplace/author-chip",
    accent: "teal",
    glyph: "@",
    state: "Visual only",
    preview: [
      { label: "Variants", value: "4" },
      { label: "Verified", value: "Yes" },
    ],
  },
  {
    kicker: "Scene 08",
    title: "Version chip",
    body: "Semver chip with release date and changelog popover trigger.",
    href: "/ui-primitives/marketplace/version-chip",
    accent: "green",
    glyph: "v1.2.0",
    state: "Stateful · popover",
    preview: [
      { label: "Tags", value: "4" },
      { label: "Popover", value: "Yes" },
    ],
  },
  {
    kicker: "Scene 09",
    title: "Permissions list",
    body: "Permission scope list with sensitivity tone — low / medium / high colour shifts.",
    href: "/ui-primitives/marketplace/permissions-required-list",
    accent: "amber",
    glyph: "PERM",
    state: "Visual only",
    preview: [
      { label: "Scopes", value: "5" },
      { label: "Tones", value: "3" },
    ],
  },
  {
    kicker: "Scene 10",
    title: "Compatibility matrix",
    body: "Matrix view across mufflermen.com.au, Mufflerpulse, Hermes, API, and CLI surfaces.",
    href: "/ui-primitives/marketplace/compatibility-matrix",
    accent: "teal",
    glyph: "▦",
    state: "Visual only",
    preview: [
      { label: "Surfaces", value: "5" },
      { label: "Rows", value: "5" },
    ],
  },
  {
    kicker: "Scene 11",
    title: "Pricing tier chip",
    body: "Tier chip — Free, Pro, Enterprise, Pay-per-use with tone shift and small icon.",
    href: "/ui-primitives/marketplace/pricing-tier-chip",
    accent: "green",
    glyph: "$",
    state: "Visual only",
    preview: [
      { label: "Tiers", value: "4" },
      { label: "Icons", value: "Yes" },
    ],
  },
  {
    kicker: "Scene 12",
    title: "Trending strip",
    body: "Horizontal scroller — rank chip, momentum arrow, and snap controls.",
    href: "/ui-primitives/marketplace/trending-strip",
    accent: "amber",
    glyph: "↑",
    state: "Stateful · scroll",
    preview: [
      { label: "Items", value: "8" },
      { label: "Snap", value: "Yes" },
    ],
  },
  {
    kicker: "Scene 13",
    title: "Recently updated row",
    body: "Recent release row — logo, name, version chip, release date, changelog excerpt.",
    href: "/ui-primitives/marketplace/recently-updated-row",
    accent: "teal",
    glyph: "↻",
    state: "Visual only",
    preview: [
      { label: "Rows", value: "5" },
      { label: "Chip", value: "VersionChip" },
    ],
  },
  {
    kicker: "Scene 14",
    title: "Installation progress",
    body: "Step-by-step install flow — Downloading, Verifying, Configuring, Permissions, Done.",
    href: "/ui-primitives/marketplace/installation-progress",
    accent: "red",
    glyph: "01·02·03·04·05",
    state: "Live region",
    preview: [
      { label: "Steps", value: "5" },
      { label: "Progress", value: "70%" },
    ],
  },
  {
    kicker: "Bonus",
    title: "Full marketplace",
    body: "Composition — featured banner, category sidebar, plugin grid, trending strip, recent rail.",
    href: "/ui-primitives/marketplace/full-marketplace",
    accent: "red",
    glyph: "FULL",
    state: "Composition",
    preview: [
      { label: "Comps", value: "5" },
      { label: "Real", value: "Mufflermen" },
    ],
  },
]

const ACCENT_CLASS: Record<MarketplaceScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function MarketplaceIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22 / Marketplace"
        title="Marketplace — plugin browser primitives"
        description="Fifteen marketplace scenes used inside the Oak Flats Mufflermen plugin browser. Discovery cards, category nav, install flows, compatibility, permissions, and a full marketplace composition built from fourteen focused primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real plugin install actions
      </span>

      <section className={styles.grid} aria-label="Marketplace gallery patterns">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbGlyph}>{scene.glyph}</span>
                {scene.preview.map((row) => (
                  <span key={row.label} className={styles.thumbField}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </span>
                ))}
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
