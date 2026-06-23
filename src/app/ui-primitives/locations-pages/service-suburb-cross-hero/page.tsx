import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceSuburbCrossHero } from "../../components/locations-pages"

import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Service-suburb cross hero | Locations & Suburbs",
  description:
    "Primitive 14 — two-axis service + suburb hero. Composes GlassSurface.",
}

export default function ServiceSuburbCrossHeroPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Service-suburb cross hero"
        title="Service-suburb cross hero"
        description="Combination hero for /locations/[suburb]/[service] surfaces — pairs a service chip with a suburb chip above the cross headline. Wrapped in a chrome-tone GlassSurface."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Service-suburb cross hero" },
        ]}
      />

      <span className={styles.stageCaption}>Custom exhausts × Wollongong</span>
      <ServiceSuburbCrossHero
        kicker="Custom exhausts in Wollongong"
        serviceName="Custom exhausts"
        serviceHref="/services/custom-exhaust-systems"
        suburbName="Wollongong"
        suburbHref="/locations/wollongong"
        headline={
          <>
            Mandrel-bent stainless,
            <br />
            built for Wollongong.
          </>
        }
        supportingCopy="Cat-back fabrication, sports-muffler tone targets, and ADR-compliant stainless work for Wollongong daily drivers, weekend builds and Manta-fit performance utes."
        primaryAction={{ label: "Call Oak Flats", href: "tel:+61242567000" }}
        secondaryAction={{ label: "Wollongong service page", href: "/locations/wollongong/custom-exhaust-systems" }}
      />

      <span className={styles.stageCaption}>Muffler repairs × Kiama</span>
      <ServiceSuburbCrossHero
        kicker="Muffler repairs in Kiama"
        serviceName="Muffler repairs"
        serviceHref="/services/muffler-repairs-replacement"
        suburbName="Kiama"
        suburbHref="/locations/kiama"
        headline={
          <>
            Kiama mufflers fixed
            <br />
            before the coast run home.
          </>
        }
        supportingCopy="Repair-first muffler advice for Kiama drivers — same-day rattles, leaks, and broken hangers handled at the Oak Flats workshop bay."
        primaryAction={{ label: "Get a quote", href: "tel:+61242567000" }}
      />
    </main>
  )
}
