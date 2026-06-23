import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Services & area-hub primitives | UI Primitives",
  description:
    "Fourteen reusable services + regional-area-hub primitives for the Oak Flats Mufflermen design system — services index, service detail, area hubs, coverage, and suburb lists.",
}

interface SceneCard {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
}

const ACCENT_CLASS: Record<SceneCard["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

const SCENES: ReadonlyArray<SceneCard> = [
  {
    kicker: "Primitive 01",
    title: "Services index hero",
    body: "Anchor hero for the services index: kicker, headline, supporting copy, service-count + lead-time chips, dual CTA.",
    href: "/ui-primitives/services-areas-pages/services-index-hero",
    accent: "red",
    glyph: "SVC",
    state: "Composes TextFirstHero",
  },
  {
    kicker: "Primitive 02",
    title: "Service tile",
    body: "Single service tile: category iconmark + name + short description + lead-time chip + average-price chip.",
    href: "/ui-primitives/services-areas-pages/service-tile",
    accent: "amber",
    glyph: "TILE",
    state: "Uses shared icons",
  },
  {
    kicker: "Primitive 03",
    title: "Service detail hero",
    body: "Service detail hero with cover-image placeholder and Sound / Compliance / Performance scope chips.",
    href: "/ui-primitives/services-areas-pages/service-detail-hero",
    accent: "teal",
    glyph: "DET",
    state: "Composes FeatureSpotlight",
  },
  {
    kicker: "Primitive 04",
    title: "Service process steps",
    body: "Numbered process steps row — drop-off → fitment check → build → test → handover.",
    href: "/ui-primitives/services-areas-pages/service-process-steps",
    accent: "amber",
    glyph: "5/5",
    state: "Composes ProcessSteps",
  },
  {
    kicker: "Primitive 05",
    title: "Service FAQ block",
    body: "Service-specific FAQ accordion with single-open expansion and Base UI accessibility wiring.",
    href: "/ui-primitives/services-areas-pages/service-faq-block",
    accent: "amber",
    glyph: "Q&A",
    state: "Composes FaqAccordion",
  },
  {
    kicker: "Primitive 06",
    title: "Service testimonials",
    body: "Testimonials wall for this service: star rating + customer name + vehicle + quote.",
    href: "/ui-primitives/services-areas-pages/service-testimonials",
    accent: "green",
    glyph: "★★★★★",
    state: "Composes TestimonialWall",
  },
  {
    kicker: "Primitive 07",
    title: "Service pricing band",
    body: "Pricing band card — From $XXX + GST chip + booking-deposit chip + finance chip.",
    href: "/ui-primitives/services-areas-pages/service-pricing-band",
    accent: "teal",
    glyph: "$$$",
    state: "Composes PriceTag",
  },
  {
    kicker: "Primitive 08",
    title: "Service coverage card",
    body: "Coverage card: mini radius map + drive-time stat + suburb chip cloud + see-all CTA.",
    href: "/ui-primitives/services-areas-pages/service-coverage-card",
    accent: "teal",
    glyph: "MAP",
    state: "Composes StaticMapCanvas",
  },
  {
    kicker: "Primitive 09",
    title: "Area hub hero",
    body: "Area hub hero with suburbs-count + workshops-count chips and split-credit layout.",
    href: "/ui-primitives/services-areas-pages/area-hub-hero",
    accent: "red",
    glyph: "ILW",
    state: "Composes TextFirstHero",
  },
  {
    kicker: "Primitive 10",
    title: "Area coverage map mini",
    body: "Mini coverage map: hand-drawn region outline + workshop pins + scale chip.",
    href: "/ui-primitives/services-areas-pages/area-coverage-map-mini",
    accent: "teal",
    glyph: "N",
    state: "Composes StaticMapCanvas + MapPin",
  },
  {
    kicker: "Primitive 11",
    title: "Area stats trio",
    body: "Trio of stat tiles: workshops count + suburbs covered + average response time.",
    href: "/ui-primitives/services-areas-pages/area-stats-trio",
    accent: "green",
    glyph: "3×",
    state: "Composes MetricBlock",
  },
  {
    kicker: "Primitive 12",
    title: "Area services grid",
    body: "Grid of services available in this area with localised copy + book CTA per service.",
    href: "/ui-primitives/services-areas-pages/area-services-grid",
    accent: "amber",
    glyph: "GRID",
    state: "Composes FeatureGrid",
  },
  {
    kicker: "Primitive 13",
    title: "Services breadcrumb",
    body: "Home / Services / Service trail. No postcode badge.",
    href: "/ui-primitives/services-areas-pages/services-breadcrumb",
    accent: "teal",
    glyph: "›",
    state: "Composes Breadcrumb",
  },
  {
    kicker: "Primitive 14",
    title: "Area suburb list card",
    body: "Listing of suburbs in an area with postcode + drive-time chip + services-count per row.",
    href: "/ui-primitives/services-areas-pages/area-suburb-list-card",
    accent: "red",
    glyph: "LIST",
    state: "Composes DistanceDurationChip",
  },
]

export default function ServicesAreasPagesIndexPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Services & areas"
        title="Services + area-hub primitives"
        description="Fourteen reusable primitives that mirror the live services index, service detail, and regional area-hub anatomy. Each primitive composes a shared umbrella primitive (TextFirstHero, FeatureGrid, ProcessSteps, FaqAccordion, TestimonialWall, PriceTag, StaticMapCanvas, MetricBlock, Breadcrumb) so the surface stays consistent across the design system."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas" },
        ]}
      />
      <span className={styles.notice}>
        Visual reference only — no live booking wiring
      </span>
      <div className={styles.fullCenterRow}>
        <Link className={styles.fullCenterCta} href="/ui-primitives/services-areas-pages/full-service-page">
          Full service page composition <span aria-hidden="true">→</span>
        </Link>
        <Link className={styles.fullCenterCta} href="/ui-primitives/services-areas-pages/full-area-page">
          Full area hub composition <span aria-hidden="true">→</span>
        </Link>
      </div>
      <section className={styles.grid} aria-label="Services and area-hub primitives gallery">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={`${styles.card} ${ACCENT_CLASS[scene.accent]}`}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.glyph}>{scene.glyph}</span>
            </div>
            <header className={styles.head}>
              <span className={styles.kicker}>{scene.kicker}</span>
              <h2 className={styles.title}>{scene.title}</h2>
              <p className={styles.body}>{scene.body}</p>
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
