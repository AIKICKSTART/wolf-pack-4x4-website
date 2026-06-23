import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./parts-pages.module.css"

export const metadata: Metadata = {
  title: "Parts pages | UI Primitives",
  description:
    "Fourteen reusable parts-page primitives for the Oak Flats Mufflermen design system — catalogue hero, search rail, category cards, result cards, detail hero, image gallery, spec table, fitment list, supplier badge, related rail, breadcrumb, FAQ, price chip, category shell.",
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
    title: "Parts catalogue hero",
    body: "Catalogue hero with kicker, headline, supplier coverage chip, part count chip, and supplier badge row.",
    href: "/ui-primitives/parts-pages/parts-catalogue-hero",
    accent: "amber",
    state: "Hero",
  },
  {
    kicker: "Primitive 02",
    title: "Parts search rail",
    body: "Vertical search rail — search input, category nav, supplier chips, price slider, in-stock toggle, fitment chips.",
    href: "/ui-primitives/parts-pages/parts-search-rail",
    accent: "teal",
    state: "Filtering",
  },
  {
    kicker: "Primitive 03",
    title: "Part category card",
    body: "Single category card — thumbnail mark, category name, part count chip, popular supplier chips.",
    href: "/ui-primitives/parts-pages/part-category-card",
    accent: "red",
    state: "Category",
  },
  {
    kicker: "Primitive 04",
    title: "Part result card",
    body: "Search result card — supplier-watermark image, SKU, title, supplier badge, RRP, fitment chip row.",
    href: "/ui-primitives/parts-pages/part-result-card",
    accent: "amber",
    state: "Result",
  },
  {
    kicker: "Primitive 05",
    title: "Part detail hero",
    body: "Part detail hero — gallery on left, summary on right with title, sku, supplier, price, in-stock, install time, CTA.",
    href: "/ui-primitives/parts-pages/part-detail-hero",
    accent: "red",
    state: "Product",
  },
  {
    kicker: "Primitive 06",
    title: "Part image gallery",
    body: "Primary image + thumb strip + zoom indicator with supplier-watermark variant and placeholder fallback.",
    href: "/ui-primitives/parts-pages/part-image-gallery",
    accent: "teal",
    state: "Media",
  },
  {
    kicker: "Primitive 07",
    title: "Part spec table",
    body: "Sectioned spec table — Dimensions / Materials / Sound / Compliance / Fitment groups.",
    href: "/ui-primitives/parts-pages/part-spec-table",
    accent: "green",
    state: "Specs",
  },
  {
    kicker: "Primitive 08",
    title: "Fitment compatibility list",
    body: "Vehicle fitment table — make, model, years, body, engine, notes chip, adapter-required chip.",
    href: "/ui-primitives/parts-pages/fitment-compatibility-list",
    accent: "green",
    state: "Fitment",
  },
  {
    kicker: "Primitive 09",
    title: "Supplier badge",
    body: "Inline supplier badge with official brand logo artwork, verified chip, and optional warranty chip.",
    href: "/ui-primitives/parts-pages/supplier-badge",
    accent: "amber",
    state: "Brand",
  },
  {
    kicker: "Primitive 10",
    title: "Related parts rail",
    body: "Horizontal scrollable rail of PartResultCards filtered by category + supplier.",
    href: "/ui-primitives/parts-pages/related-parts-rail",
    accent: "teal",
    state: "Cross-sell",
  },
  {
    kicker: "Primitive 11",
    title: "Parts breadcrumb",
    body: "Home / Parts / Category / Part — adapter over primitives/Breadcrumb with category tone on the leaf.",
    href: "/ui-primitives/parts-pages/parts-breadcrumb",
    accent: "amber",
    state: "Nav",
  },
  {
    kicker: "Primitive 12",
    title: "Parts FAQ section",
    body: "Accordion adapter over marketing/FaqAccordion with parts-specific 8-question default content.",
    href: "/ui-primitives/parts-pages/parts-faq-section",
    accent: "green",
    state: "Support",
  },
  {
    kicker: "Primitive 13",
    title: "Part price chip",
    body: "Price chip wraps commerce/PriceTag with savings chip and payment-instalment hint.",
    href: "/ui-primitives/parts-pages/part-price-chip",
    accent: "amber",
    state: "Pricing",
  },
  {
    kicker: "Primitive 14",
    title: "Parts category page shell",
    body: "Composition shell — Breadcrumb + Hero + Rail + Result grid + Pagination + FAQ.",
    href: "/ui-primitives/parts-pages/parts-category-page-shell",
    accent: "red",
    state: "Composition",
  },
  {
    kicker: "Bonus",
    title: "Full part detail experience",
    body: "Composes Breadcrumb + Detail hero + Gallery + Spec table + Fitment list + Related rail + FAQ.",
    href: "/ui-primitives/parts-pages/full-experience",
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

export default function PartsPagesIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Parts pages"
        title="Parts page primitives"
        description="Fourteen reusable parts-page surfaces for the Oak Flats Mufflermen brand — catalogue hero, search rail, category cards, result cards, detail hero, image gallery, spec table, fitment list, supplier badge, related rail, breadcrumb, FAQ, price chip, category shell. Bonus: a full detail-page composition route."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages" },
        ]}
      />

      <span className={styles.notice}>
        Parts catalogue primitives — composed from the umbrella design system
      </span>

      <section className={styles.grid} aria-label="Parts page primitives index">
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
