import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./landing-pages.module.css"

export const metadata: Metadata = {
  title: "Landing Pages | UI Primitives",
  description:
    "Fourteen reusable landing-page primitives for the Oak Flats Mufflermen design system — split hero, centred hero, social-proof strip, feature grid, testimonial carousel, pricing table, comparison matrix, FAQ accordion, lead-capture form, metric counter strip, case-study card, CTA band, event card, partner logo grid.",
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
    title: "Hero split section",
    body: "Split-screen hero — copy + dual CTA on one side, framed media tile on the other. Mediaside reversible.",
    href: "/ui-primitives/landing-pages/hero-split-section",
    accent: "red",
    state: "Hero",
  },
  {
    kicker: "Primitive 02",
    title: "Hero centred section",
    body: "Centred hero with KineticText headline, badge, background grid, dual CTA, and trust pillars.",
    href: "/ui-primitives/landing-pages/hero-centred-section",
    accent: "red",
    state: "Hero",
  },
  {
    kicker: "Primitive 03",
    title: "Social proof strip",
    body: "Heading + rating + review count + customer-since line, with a row of partner logo cards.",
    href: "/ui-primitives/landing-pages/social-proof-strip",
    accent: "amber",
    state: "Trust",
  },
  {
    kicker: "Primitive 04",
    title: "Feature grid section",
    body: "3 × 2 feature grid — icon + headline + body + optional inline link per tile.",
    href: "/ui-primitives/landing-pages/feature-grid-section",
    accent: "teal",
    state: "Features",
  },
  {
    kicker: "Primitive 05",
    title: "Testimonial carousel",
    body: "Carousel of testimonial cards — avatar initials, star rating, quote, case-study link, dot indicators.",
    href: "/ui-primitives/landing-pages/testimonial-carousel",
    accent: "amber",
    state: "Social proof",
  },
  {
    kicker: "Primitive 06",
    title: "Pricing table card",
    body: "3-column pricing table — feature checks, recommended badge on the middle tier, single CTA each.",
    href: "/ui-primitives/landing-pages/pricing-table-card",
    accent: "red",
    state: "Conversion",
  },
  {
    kicker: "Primitive 07",
    title: "Comparison table section",
    body: "Vs-competitor comparison matrix with check / partial / X states and a highlighted self column.",
    href: "/ui-primitives/landing-pages/comparison-table-section",
    accent: "teal",
    state: "Conversion",
  },
  {
    kicker: "Primitive 08",
    title: "FAQ accordion section",
    body: "Single-open accordion with a live search filter — narrows entries by question, answer, and tag.",
    href: "/ui-primitives/landing-pages/faq-accordion-section",
    accent: "green",
    state: "Support",
  },
  {
    kicker: "Primitive 09",
    title: "Lead capture form",
    body: "Three-step progressive form — contact, vehicle, service — with stepper + explicit success panel.",
    href: "/ui-primitives/landing-pages/lead-capture-form",
    accent: "red",
    state: "Capture",
  },
  {
    kicker: "Primitive 10",
    title: "Metric counter strip",
    body: "Row of in-view animated counters — years in business, vehicles serviced, five-star reviews, fleet vehicles.",
    href: "/ui-primitives/landing-pages/metric-counter-strip",
    accent: "amber",
    state: "Metrics",
  },
  {
    kicker: "Primitive 11",
    title: "Case study card",
    body: "Case-study card — problem / solution / results blocks with outcomes list and PDF download CTA.",
    href: "/ui-primitives/landing-pages/case-study-card",
    accent: "teal",
    state: "Storytelling",
  },
  {
    kicker: "Primitive 12",
    title: "CTA band section",
    body: "Full-width CTA band with layered background, kicker, headline, sub-text, and dual button row.",
    href: "/ui-primitives/landing-pages/cta-band-section",
    accent: "red",
    state: "Conversion",
  },
  {
    kicker: "Primitive 13",
    title: "Event card",
    body: "Upcoming event card — date tile, headline, location, summary, capacity bar, RSVP button.",
    href: "/ui-primitives/landing-pages/event-card",
    accent: "amber",
    state: "Engagement",
  },
  {
    kicker: "Primitive 14",
    title: "Partner logo grid",
    body: "Partner / supplier logo grid with category line, caption, and an external-link icon per card.",
    href: "/ui-primitives/landing-pages/partner-logo-grid",
    accent: "green",
    state: "Trust",
  },
  {
    kicker: "Bonus",
    title: "Full landing composition",
    body: "Every landing primitive sequenced into one full Mufflermen marketing landing surface.",
    href: "/ui-primitives/landing-pages/full-landing",
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

export default function LandingPagesIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22 / Landing pages"
        title="Landing-page primitives"
        description="Fourteen reusable marketing-landing surfaces for the Oak Flats Mufflermen brand — hero splits, hero centred kinetic, social proof, feature grids, carousels, pricing tables, comparison matrices, FAQ accordions, lead-capture forms, metric strips, case studies, CTA bands, event cards, and partner logo grids. Bonus: a full landing composition."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages" },
        ]}
      />

      <span className={styles.notice}>
        Composable marketing-landing surfaces — drop-in for public-site pages
      </span>

      <section className={styles.grid} aria-label="Landing-page primitives index">
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
