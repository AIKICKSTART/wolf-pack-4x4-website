import type { Metadata } from "next"

import { HeroCentredSection } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Hero centred section | Landing Pages",
  description:
    "Primitive 02 — centred hero with kinetic display headline, badge, background grid, and dual CTA.",
}

const PILLARS = [
  { label: "Years welding under Illawarra utes", value: "53+" },
  { label: "Vehicles serviced", value: "8,240" },
  { label: "Five-star reviews (Google + FB)", value: "612" },
  { label: "Fleet vehicles on audit", value: "124" },
] as const

export default function HeroCentredSectionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Hero centred"
        title="Hero centred section"
        description="Centre-aligned hero. Three states show different KineticText motions on the headline — letter rise, scanline wipe, and chrome glint."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Hero centred section" },
        ]}
      />

      <span className={styles.stageCaption}>State · Letter-rise headline</span>
      <HeroCentredSection
        badge={{ label: "Wollongong · Est 1972" }}
        kicker="Oak Flats workshop"
        headline="Welding South Coast utes since 1972"
        subhead="Wollongong's most-trusted exhaust workshop. Stainless catbacks fitted on the bay, ADR-signed before you leave."
        primary={{ label: "Book the workshop", href: "#book" }}
        secondary={{
          label: "View the Manta catalogue",
          href: "#manta",
          variant: "ghost",
        }}
        pillars={PILLARS}
        kinetic={{ fontId: "anton", motion: "letter-rise" }}
      />

      <span className={styles.stageCaption}>State · Scanline-wipe headline</span>
      <HeroCentredSection
        kicker="Dyno Tuesday · Live"
        headline="Real numbers. Not guesses."
        subhead="Dyno Tuesday measures power, torque, and air-fuel curves on the workshop dyno. Charts emailed before you collect."
        primary={{ label: "Reserve a dyno pull", href: "#dyno" }}
        kinetic={{ fontId: "bebas", motion: "scanline-wipe" }}
      />

      <span className={styles.stageCaption}>State · Chrome-glint headline</span>
      <HeroCentredSection
        badge={{ label: "Five-year weld warranty", tone: "red" }}
        kicker="Mufflermen guarantee"
        headline="Cracked welds re-welded free"
        subhead="Even after 200,000 km. Even after you've sold the system. If a Mufflermen TIG weld cracks inside five years, we re-weld it free."
        primary={{ label: "Read the guarantee", href: "#warranty" }}
        secondary={{ label: "Talk to the foreman", href: "tel:+61242567000", variant: "secondary" }}
        kinetic={{ fontId: "bigshoulders", motion: "chrome-glint" }}
      />
    </main>
  )
}
