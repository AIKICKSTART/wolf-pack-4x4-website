import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./locations-pages.module.css"

export const metadata: Metadata = {
  title: "Locations & Suburbs | UI Primitives",
  description:
    "Fourteen reusable locations + suburbs primitives for the Oak Flats Mufflermen design system — suburb hero, fast facts, nearby workshops, service radius, postcode chip, surrounding suburbs, local quote CTA, suburb testimonial, last job card, drive time chip, locations breadcrumb, services grid, suburb FAQ, service-suburb cross hero.",
}

interface Block {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  state: string
}

const BLOCKS: ReadonlyArray<Block> = [
  {
    kicker: "Primitive 01",
    title: "Suburb hero",
    body: "Hero panel — kicker, postcode chip, state chip, drive-time chip, suburb display headline, tagline, primary CTA.",
    href: "/ui-primitives/locations-pages/suburb-hero",
    accent: "red",
    state: "Hero",
  },
  {
    kicker: "Primitive 02",
    title: "Suburb fast facts row",
    body: "Semantic dl of stat tiles — postcode, LGA, population, vehicle age, workshop distance.",
    href: "/ui-primitives/locations-pages/suburb-fast-facts-row",
    accent: "amber",
    state: "Stats",
  },
  {
    kicker: "Primitive 03",
    title: "Nearby workshops list",
    body: "Locator map + per-workshop rows with distance, opening status, and primary services chips.",
    href: "/ui-primitives/locations-pages/nearby-workshops-list",
    accent: "teal",
    state: "Coverage",
  },
  {
    kicker: "Primitive 04",
    title: "Service radius chip",
    body: "Service-radius chip with a mini map showing the radius ring and the suburb dot.",
    href: "/ui-primitives/locations-pages/service-radius-chip",
    accent: "amber",
    state: "Coverage",
  },
  {
    kicker: "Primitive 05",
    title: "Postcode chip",
    body: "Amber postcode chip with a popover surfacing state and LGA.",
    href: "/ui-primitives/locations-pages/postcode-chip",
    accent: "amber",
    state: "Chip",
  },
  {
    kicker: "Primitive 06",
    title: "Surrounding suburbs cloud",
    body: "Tag-cloud of nearby suburbs. Closer suburbs lift visually via tone + size.",
    href: "/ui-primitives/locations-pages/surrounding-suburbs-cloud",
    accent: "amber",
    state: "Navigation",
  },
  {
    kicker: "Primitive 07",
    title: "Local quote CTA card",
    body: "Big CTA — phone chip, book online, drop-off vs mobile-fit toggle.",
    href: "/ui-primitives/locations-pages/local-quote-cta-card",
    accent: "red",
    state: "Conversion",
  },
  {
    kicker: "Primitive 08",
    title: "Suburb testimonial",
    body: "Suburb-tagged customer testimonial with star rating, vehicle, and quote bubble.",
    href: "/ui-primitives/locations-pages/suburb-testimonial",
    accent: "amber",
    state: "Social proof",
  },
  {
    kicker: "Primitive 09",
    title: "Last job completed card",
    body: "Recent-work card — vehicle, service, suburb, days-ago chip, status pip.",
    href: "/ui-primitives/locations-pages/last-job-completed-card",
    accent: "green",
    state: "Recent work",
  },
  {
    kicker: "Primitive 10",
    title: "Drive time chip",
    body: "Workshop-to-suburb drive time with traffic-aware tone shift.",
    href: "/ui-primitives/locations-pages/drive-time-chip",
    accent: "teal",
    state: "Chip",
  },
  {
    kicker: "Primitive 11",
    title: "Locations breadcrumb",
    body: "Home / Locations / Suburb / Service breadcrumb with trailing state badge.",
    href: "/ui-primitives/locations-pages/locations-breadcrumb",
    accent: "teal",
    state: "Navigation",
  },
  {
    kicker: "Primitive 12",
    title: "Suburb services grid",
    body: "Grid of services available in this suburb — each tile carries a localised chip.",
    href: "/ui-primitives/locations-pages/suburb-services-grid",
    accent: "amber",
    state: "Services",
  },
  {
    kicker: "Primitive 13",
    title: "Suburb FAQ",
    body: "Suburb-specific accordion — fit time, mobile vs in-workshop, parking, why choose us.",
    href: "/ui-primitives/locations-pages/suburb-faq",
    accent: "green",
    state: "Support",
  },
  {
    kicker: "Primitive 14",
    title: "Service-suburb cross hero",
    body: "Two-axis hero — service chip + suburb chip, cross headline, supporting copy, dual CTA.",
    href: "/ui-primitives/locations-pages/service-suburb-cross-hero",
    accent: "red",
    state: "Hero",
  },
  {
    kicker: "Bonus",
    title: "Full suburb page composition",
    body: "Every locations primitive composed into one full suburb detail surface.",
    href: "/ui-primitives/locations-pages/full-suburb-page",
    accent: "red",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Block["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function LocationsPagesIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="21 / Locations & suburbs"
        title="Locations and suburb primitives"
        description="Fourteen reusable locations + suburbs primitives for the Oak Flats Mufflermen brand — suburb heroes, stat tiles, locators, radius chips, breadcrumbs, services grids, FAQs, and a cross hero. Bonus: a full suburb page composition."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs" },
        ]}
      />

      <span className={styles.notice}>
        Suburb-scale UI — built from the umbrella primitive library
      </span>

      <section className={styles.grid} aria-label="Locations primitives index">
        {BLOCKS.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className={[styles.card, ACCENT_CLASS[block.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbHeadline} />
                <div className={styles.thumbRows}>
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                </div>
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{block.kicker}</span>
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <p className={styles.cardBody}>{block.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{block.state}</span>
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
