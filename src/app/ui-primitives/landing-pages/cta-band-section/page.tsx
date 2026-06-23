import type { Metadata } from "next"

import { CtaBandSection } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "CTA band section | Landing Pages",
  description: "Primitive 12 — full-width CTA band with layered background and dual button row.",
}

export default function CtaBandSectionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / CTA band"
        title="CTA band section"
        description="Full-width CTA band — kicker, headline, sub-text, dual buttons. Three states: workshop booking, fleet contact, and Dyno Tuesday reminder."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "CTA band section" },
        ]}
      />

      <span className={styles.stageCaption}>State · Workshop booking CTA</span>
      <CtaBandSection
        kicker="Ready to book?"
        title="Welded in. Signed off. Driven home Friday."
        subtext="Bookings open from Monday 7am. Most catbacks fitted same week — fleet jobs slotted overnight."
        primary={{ label: "Book a workshop slot", href: "#book" }}
        secondary={{
          label: "Call the workshop",
          href: "tel:+61242567000",
          variant: "ghost",
        }}
      />

      <span className={styles.stageCaption}>State · Fleet contact CTA</span>
      <CtaBandSection
        kicker="Fleet plus"
        title="Talk to the foreman before next quarter."
        subtext="Quarterly fleet audits land the same week. Mufflermen scopes on-site — no portal hand-off."
        primary={{ label: "Request fleet quote", href: "#fleet" }}
      />

      <span className={styles.stageCaption}>State · Dyno Tuesday reminder</span>
      <CtaBandSection
        kicker="Dyno Tuesday"
        title="One Tuesday. One 30-minute pull. Real numbers."
        subtext="Free with every Trade Pack and Fleet Plus. Workshop Pass members pay member-only rates."
        primary={{ label: "Reserve a dyno slot", href: "#dyno" }}
        secondary={{ label: "See last week's charts", href: "#charts", variant: "secondary" }}
      />
    </main>
  )
}
