import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServicesIndexHero } from "../../components/services-areas-pages"
import { DEMO_SERVICES } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Services index hero | Services & areas | UI Primitives",
  description:
    "Services index hero primitive — kicker, headline, supporting copy, service-count + lead-time chips, dual CTA.",
}

export default function ServicesIndexHeroScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01"
        title="Services index hero"
        description="Anchor hero used at the top of the services index page. Composes the marketing TextFirstHero primitive — kicker, display headline, supporting copy, services-count + lead-time trust chips, and a dual CTA (primary book + secondary quote)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Services index hero" },
        ]}
      />
      <ServicesIndexHero
        kicker="Exhaust services"
        headline="Custom exhausts. Repairs. Performance. Done right."
        copy="Workshop-built stainless cat-backs, repair-first muffler work, extractors, and ECU tuning for Illawarra drivers — from same-day repairs to multi-week custom builds."
        serviceCount={DEMO_SERVICES.length}
        leadTime="2-week build"
        primaryCta={{ label: "Book a slot", href: "#book" }}
        secondaryCta={{ label: "Get a quote", href: "#quote" }}
      />
    </main>
  )
}
