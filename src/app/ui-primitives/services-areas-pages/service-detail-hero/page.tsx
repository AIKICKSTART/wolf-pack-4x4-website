import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceDetailHero } from "../../components/services-areas-pages"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Service detail hero | Services & areas | UI Primitives",
  description:
    "Service detail hero primitive — kicker, headline, copy, cover image placeholder, scope chips, dual CTA.",
}

export default function ServiceDetailHeroScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03"
        title="Service detail hero"
        description="Service detail hero used at the top of a single-service page. Composes the marketing FeatureSpotlight primitive — supplies a cover image placeholder, Sound / Compliance / Performance scope bullets, and a dual CTA (book + quote)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Service detail hero" },
        ]}
      />
      <ServiceDetailHero
        kicker="Workshop service"
        headline="Custom stainless cat-back exhausts"
        body="Built around the vehicle, the way it is driven, and the tone target. Mandrel bends, sports mufflers, and finishing hardware fitted in-house at Albion Park Rail."
        coverLabel="Workshop preview"
        coverTitle="1600 × 900 cover slot"
        coverHelper="Brand cover or workshop photo"
        soundChip="Deeper note"
        complianceChip="ADR-compliant"
        performanceChip="+12% flow"
        primaryCta={{ label: "Book service", href: "#book" }}
        secondaryCta={{ label: "Get a quote", href: "#quote" }}
      />
    </main>
  )
}
