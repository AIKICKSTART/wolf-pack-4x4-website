import type { Metadata } from "next"

import { CreativeGallery } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_CREATIVES } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Creative gallery | Marketing campaigns",
  description:
    "Primitive 07 — thumbnail grid of creatives with channel filter, select-for-A/B and clone actions.",
}

export default function CreativeGalleryScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Creative gallery"
        title="Creative gallery"
        description="Filter creatives by channel, tap to select for an A/B run, or clone the asset to a private variant. Each tile shows a channel chip and an optional duration / dimension chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Creative gallery" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <CreativeGallery assets={DEMO_CREATIVES} defaultFilter="all" />
      </section>
    </main>
  )
}
