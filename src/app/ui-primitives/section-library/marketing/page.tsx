import type { Metadata } from "next"
import type { ReactNode } from "react"

import { PageHeader } from "../../components/page-header"
import type { BlockManifest } from "../../builder/model"

import {
  BeforeAfterGallery,
  CtaSection,
  PricingServiceSection,
  PromoCampaignSection,
  SocialCampaignSection,
  TestimonialsSection,
  beforeAfterGalleryManifest,
  ctaSectionManifest,
  marketingSectionManifests,
  pricingServiceSectionManifest,
  promoCampaignSectionManifest,
  socialCampaignSectionManifest,
  testimonialsSectionManifest,
} from "./index"
import { PreviewFrame } from "./_showcase/preview-frame"
import {
  beforeAfterItems,
  ctaSampleProps,
  pricingColumns,
  pricingIncluded,
  pricingRows,
  promoSampleProps,
  socialChannels,
  socialSampleProps,
  socialSteps,
  testimonialsSampleProps,
} from "./_showcase/sample-data"
import styles from "./section-library-marketing.module.css"

export const metadata: Metadata = {
  title: "Marketing Section Library | UI Primitives",
  description:
    "Six production-ready Oak Flats Mufflermen marketing sections — CTA banner, before/after gallery, testimonials & reviews, promo campaign, social campaign, and pricing & service — each composed from existing primitives, fully token-driven, and shipping a BlockManifest for the CMS canvas.",
}

interface ShowcaseEntry {
  index: string
  manifest: BlockManifest
  render: ReactNode
}

const SHOWCASE: ReadonlyArray<ShowcaseEntry> = [
  { index: "01", manifest: ctaSectionManifest, render: <CtaSection {...ctaSampleProps} /> },
  {
    index: "02",
    manifest: beforeAfterGalleryManifest,
    render: (
      <BeforeAfterGallery
        kicker="Proof in the metal"
        heading="Before & after the bay"
        body="Every job photographed on the hoist — stock system out, custom Mufflermen install in."
        items={beforeAfterItems}
      />
    ),
  },
  {
    index: "03",
    manifest: testimonialsSectionManifest,
    render: <TestimonialsSection {...testimonialsSampleProps} />,
  },
  {
    index: "04",
    manifest: promoCampaignSectionManifest,
    render: <PromoCampaignSection {...promoSampleProps} />,
  },
  {
    index: "05",
    manifest: socialCampaignSectionManifest,
    render: (
      <SocialCampaignSection
        {...socialSampleProps}
        channels={socialChannels}
        steps={socialSteps}
      />
    ),
  },
  {
    index: "06",
    manifest: pricingServiceSectionManifest,
    render: (
      <PricingServiceSection
        kicker="Workshop pricing"
        heading="Pick your exhaust package"
        body="Transparent fixed pricing on the systems we fit every week. Custom builds quoted on the hoist."
        columns={pricingColumns}
        rows={pricingRows}
        footnote="Prices fitted, inc GST. Custom and dual systems quoted on inspection."
        actions={[
          { label: "Book a fit-up", href: "/book", variant: "primary" },
          { label: "Request a quote", href: "/quote", variant: "secondary" },
        ]}
        included={pricingIncluded}
      />
    ),
  },
]

const editableFieldCount = marketingSectionManifests.reduce(
  (total, manifest) => total + manifest.editableFields.length,
  0,
)
const tokenDependencyCount = marketingSectionManifests.reduce(
  (total, manifest) => total + manifest.tokenDependencies.length,
  0,
)

const META_TILES: ReadonlyArray<{ value: string; label: string }> = [
  { value: String(marketingSectionManifests.length), label: "Drag-ready sections" },
  { value: String(editableFieldCount), label: "Owner-editable fields" },
  { value: String(tokenDependencyCount), label: "Token dependencies wired" },
]

export default function SectionLibraryMarketingPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Section library / Marketing"
        title="Marketing page sections"
        description="Six reusable, production-ready Oak Flats Mufflermen marketing sections — CTA banner, before/after gallery, testimonials & reviews, promo campaign, social campaign, and pricing & service. Each is composed from existing UI primitives, fully token-driven (carbon + metallic, red→amber CTAs), light/dark, responsive 320→1920, reduced-motion safe, and ships a BlockManifest so the CMS canvas can drag, edit, and document it."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Section library · Marketing" },
        ]}
      />

      <section className={styles.intro} aria-label="Overview">
        <span className={styles.notice}>
          Composed from existing primitives · zero hardcoded design values
        </span>
        <div className={styles.metaGrid}>
          {META_TILES.map((tile) => (
            <div key={tile.label} className={styles.metaTile}>
              <span className={styles.metaValue}>{tile.value}</span>
              <span className={styles.metaLabel}>{tile.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.frames}>
        {SHOWCASE.map((entry) => (
          <PreviewFrame
            key={entry.manifest.type}
            index={entry.index}
            title={entry.manifest.name}
            blockType={entry.manifest.type}
            summary={entry.manifest.summary}
          >
            {entry.render}
          </PreviewFrame>
        ))}
      </div>
    </main>
  )
}
