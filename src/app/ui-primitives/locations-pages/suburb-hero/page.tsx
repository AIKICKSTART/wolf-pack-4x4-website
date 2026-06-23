import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SuburbHero } from "../../components/locations-pages"

import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Suburb hero | Locations & Suburbs",
  description:
    "Primitive 01 — suburb hero composed from GlassSurface + primitives/Chip.",
}

export default function SuburbHeroPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Suburb hero"
        title="Suburb hero"
        description="Suburb display headline panel — kicker, postcode chip, state chip, drive-time chip, tagline copy, and a primary CTA. Composes GlassSurface and primitives/Chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Suburb hero" },
        ]}
      />

      <span className={styles.stageCaption}>Suburb · Albion Park Rail NSW</span>
      <SuburbHero
        kicker="Shellharbour service area"
        suburbName="Albion Park Rail"
        postcode="2527"
        state="NSW"
        driveTimeMinutes={4}
        tagline="Drivers from Albion Park Rail get the closest Oak Flats Muffler Men catchment — mandrel-bent stainless, ADR-stamped catbacks, and a lifetime weld warranty walking distance from Central Ave."
        primaryAction={{ label: "Call the workshop", href: "tel:+61242567000" }}
        secondaryAction={{ label: "See services", href: "#services" }}
      />

      <span className={styles.stageCaption}>Suburb · Kiama NSW</span>
      <SuburbHero
        kicker="Kiama service area"
        suburbName="Kiama"
        postcode="2533"
        state="NSW"
        driveTimeMinutes={18}
        tagline="Kiama drivers book Mufflermen for stainless catbacks, performance tone targets, and TIG-welded fabrication done in the Oak Flats bay before the coast run home."
        primaryAction={{ label: "Get a Kiama quote", href: "tel:+61242567000" }}
        secondaryAction={{ label: "Book online", href: "#book" }}
      />
    </main>
  )
}
