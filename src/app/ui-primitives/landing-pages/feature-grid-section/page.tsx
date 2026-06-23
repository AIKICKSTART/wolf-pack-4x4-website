import type { Metadata } from "next"

import { FeatureGridSection } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import { FEATURE_ITEMS } from "../_mock-data"
import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Feature grid section | Landing Pages",
  description:
    "Primitive 04 — 3 by 2 feature grid with icon + headline + body + optional inline link per tile.",
}

export default function FeatureGridSectionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Feature grid"
        title="Feature grid section"
        description="Six-tile feature grid. Each tile carries an icon, title, body, and optional inline link. Three states: full 6, condensed 4, and an inline-link variant."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Feature grid section" },
        ]}
      />

      <span className={styles.stageCaption}>State · Full 6-tile grid</span>
      <FeatureGridSection
        kicker="What's inside every install"
        heading="Stainless. Signed off. Built for South Coast roads."
        body="Every Mufflermen install comes with the same six commitments. No upsells. No second visits."
        features={FEATURE_ITEMS}
      />

      <span className={styles.stageCaption}>State · Condensed 4-tile grid</span>
      <FeatureGridSection
        heading="Why workshops switch to Mufflermen"
        features={FEATURE_ITEMS.slice(0, 4)}
      />

      <span className={styles.stageCaption}>State · Tiles with inline links</span>
      <FeatureGridSection
        kicker="Plan inclusions"
        heading="What lands with every plan"
        features={FEATURE_ITEMS.slice(0, 3).map((feature) => ({
          ...feature,
          link: { label: `Read the ${feature.title.toLowerCase()} brief`, href: `#${feature.id}` },
        }))}
      />
    </main>
  )
}
