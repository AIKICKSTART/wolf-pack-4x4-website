import type { Metadata } from "next"

import { HeroSplitSection } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Hero split section | Landing Pages",
  description:
    "Primitive 01 — split-screen hero with copy + dual CTA on one side, framed media tile on the other.",
}

export default function HeroSplitSectionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Hero split"
        title="Hero split section"
        description="Split-screen hero — copy on one side with badge, kicker, headline, subhead, bullets, and dual CTA; framed media tile on the other. Three states: stainless default, mobile-fit, and reverse media-left."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Hero split section" },
        ]}
      />

      <span className={styles.stageCaption}>State · Stainless catback hero (default)</span>
      <HeroSplitSection
        badge={{ label: "Wollongong · Est 1972", tone: "amber" }}
        kicker="Stainless catback specialists"
        headline={
          <>
            One pit.
            <br />
            One tin roof.
            <br />
            Five decades of welds.
          </>
        }
        subhead="Hand-fitted Manta and X-Force catbacks, ADR-signed before you leave the kerb. Wollongong's most-trusted exhaust workshop since 1972."
        bullets={[
          "TIG-welded 304-grade stainless on the bay",
          "ADR 83 sign-off emailed before pickup",
          "Five-year weld warranty — even after sale",
        ]}
        primary={{ label: "Book a workshop slot", href: "#book" }}
        secondary={{ label: "Call the workshop", href: "tel:+61242567000", variant: "secondary" }}
        media={{
          label: "MUFFLERMEN",
          caption: "Bay 3 · Manta install in progress",
          badge: "Live workshop",
        }}
      />

      <span className={styles.stageCaption}>State · Mobile fit-out hero</span>
      <HeroSplitSection
        badge={{ label: "Fleet plus · Mobile-fit", tone: "teal" }}
        kicker="Fleet pickup + drop-off"
        headline="Council fleets serviced overnight."
        subhead="Mufflermen pickup at 5pm, full audit and weld inspection through the night, your truck back on shift by 7am. Keys lock-boxed, work logged to your fleet portal."
        bullets={[
          "Same-day pickup across the Illawarra",
          "Quarterly NSW noise + emissions audit",
          "Dedicated foreman on every fleet job",
        ]}
        primary={{ label: "Request fleet quote", href: "#fleet" }}
        secondary={{ label: "See council case study", href: "#case-study", variant: "ghost" }}
        media={{
          label: "FLEET",
          caption: "24-vehicle Shellharbour run · overnight cycle",
          badge: "Fleet plus",
        }}
        mediaSide="left"
      />

      <span className={styles.stageCaption}>State · Dyno Tuesday hero (compact)</span>
      <HeroSplitSection
        kicker="Dyno Tuesday · Weekly"
        headline="30-minute dyno pulls every Tuesday."
        subhead="Bring the ute in between 9am and 5pm. Power, torque, and air-fuel chart emailed before you collect."
        primary={{ label: "Book a dyno slot", href: "#dyno" }}
        media={{
          label: "DYNO",
          caption: "Power + torque · live read",
          badge: "Tuesday",
        }}
      />
    </main>
  )
}
