import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./marketing.module.css"

export const metadata: Metadata = {
  title: "Marketing Blocks | UI Primitives",
  description:
    "Fourteen reusable marketing primitives for the Oak Flats Mufflermen design system — heroes, grids, testimonials, pricing, FAQ, logo cloud, stat counters, newsletter, footer, cookie banner, floating chat, sticky CTA, and process steps.",
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
    title: "Text-first hero",
    body: "Editorial text-first hero with huge display headline, subhead, dual CTA, and a trust strip.",
    href: "/ui-primitives/marketing/text-first-hero",
    accent: "red",
    state: "Hero",
  },
  {
    kicker: "Primitive 02",
    title: "Feature grid",
    body: "Reveal-animated feature grid in 2, 3, or 4 columns with icon + title + body + optional link.",
    href: "/ui-primitives/marketing/feature-grid",
    accent: "amber",
    state: "Feature row",
  },
  {
    kicker: "Primitive 03",
    title: "Feature spotlight",
    body: "Single feature row with reversible image-left / copy-right layout for product walks.",
    href: "/ui-primitives/marketing/feature-spotlight",
    accent: "teal",
    state: "Storytelling",
  },
  {
    kicker: "Primitive 04",
    title: "Testimonial wall",
    body: "Masonry-style testimonial grid with varied card heights, attribution avatars, and star ratings.",
    href: "/ui-primitives/marketing/testimonial-wall",
    accent: "amber",
    state: "Social proof",
  },
  {
    kicker: "Primitive 05",
    title: "Pricing CTA section",
    body: "Wraps the ComparisonTable with a section header, supporting copy, and a final CTA row.",
    href: "/ui-primitives/marketing/pricing-cta",
    accent: "red",
    state: "Conversion",
  },
  {
    kicker: "Primitive 06",
    title: "FAQ accordion",
    body: "Single-open Base UI accordion with rich panel content — paragraphs and code blocks.",
    href: "/ui-primitives/marketing/faq-accordion",
    accent: "green",
    state: "Support",
  },
  {
    kicker: "Primitive 07",
    title: "Logo cloud",
    body: "Muted logo wall with 12 abstract brand-mark SVGs and subtle entrance animation.",
    href: "/ui-primitives/marketing/logo-cloud",
    accent: "teal",
    state: "Trust",
  },
  {
    kicker: "Primitive 08",
    title: "Stat counter row",
    body: "Row of four big stat counters with in-view count-up animation.",
    href: "/ui-primitives/marketing/stat-counter-row",
    accent: "amber",
    state: "Metrics",
  },
  {
    kicker: "Primitive 09",
    title: "Newsletter CTA",
    body: "Conversion-focused newsletter sign-up — heading, email field, submit, privacy line.",
    href: "/ui-primitives/marketing/newsletter-cta",
    accent: "red",
    state: "Capture",
  },
  {
    kicker: "Primitive 10",
    title: "Footer megamap",
    body: "Site footer with brand block, 4-column sitemap, contact, social, legal, region selector.",
    href: "/ui-primitives/marketing/footer-megamap",
    accent: "teal",
    state: "Navigation",
  },
  {
    kicker: "Primitive 11",
    title: "Cookie banner",
    body: "Bottom-aligned cookie consent banner with manage/accept and slide-in animation.",
    href: "/ui-primitives/marketing/cookie-banner",
    accent: "amber",
    state: "Compliance",
  },
  {
    kicker: "Primitive 12",
    title: "Floating chat launcher",
    body: "Bottom-right floating chat button with notification dot, pulse ring, and preview card.",
    href: "/ui-primitives/marketing/floating-chat",
    accent: "red",
    state: "Engagement",
  },
  {
    kicker: "Primitive 13",
    title: "Sticky CTA bar",
    body: "Top sticky CTA bar — auto-hides on scroll down, reveals on scroll up.",
    href: "/ui-primitives/marketing/sticky-cta-bar",
    accent: "amber",
    state: "Persistent CTA",
  },
  {
    kicker: "Primitive 14",
    title: "Process steps",
    body: "Numbered process steps (3-5) with a connecting line. Each step has icon + title + body.",
    href: "/ui-primitives/marketing/process-steps",
    accent: "green",
    state: "Onboarding",
  },
  {
    kicker: "Bonus",
    title: "Full landing composition",
    body: "Every marketing primitive composed into one long-scroll landing page surface.",
    href: "/ui-primitives/marketing/full-landing",
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

const MARKETING_DNA = [
  {
    label: "Section patterns",
    value: "Hero / proof / pricing / FAQ / CTA use the shared section grammar.",
  },
  {
    label: "Action layer",
    value: "Every conversion surface routes through Button DNA and primitive focus states.",
  },
  {
    label: "Responsive proof",
    value: "Cards, full landing, and sticky affordances collapse on token spacing rules.",
  },
] as const

export default function MarketingIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="20 / Marketing blocks"
        title="Marketing primitives"
        description="Fourteen reusable marketing surfaces for the Oak Flats Mufflermen brand — heroes, feature grids, testimonials, pricing CTAs, FAQ, logo clouds, stat counters, newsletter, footer, banners, chat, and process steps. Bonus: a full-landing composition page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing blocks" },
        ]}
        dnaSectionId="section-patterns"
      />

      <section className={styles.dnaPanel} aria-labelledby="marketing-dna-title">
        <div>
          <span className={styles.dnaKicker}>Marketing shared DNA</span>
          <h2 id="marketing-dna-title">One contract for public-site blocks</h2>
          <p>
            Marketing primitives are not standalone page art. They are section-pattern
            compositions that inherit surfaces, typography, actions, motion, and responsive
            spacing from the shared primitive foundation.
          </p>
        </div>
        <dl>
          {MARKETING_DNA.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <span className={styles.notice}>
        Composable marketing surfaces — drop-in for public-site pages
      </span>

      <section className={styles.grid} aria-label="Marketing primitives index">
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
