import type { Metadata } from "next"

import { FeatureHighlightCard } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Feature highlight | Onboarding",
  description:
    "Primitive 07 — card highlighting a new feature, with an animated kicker chip, headline, supporting body, try-it CTA and a dismiss chevron.",
}

export default function FeatureHighlightScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Feature highlight"
        title="Feature highlight card"
        description="A small spotlight card surfaced post-signup or after a release. Pulsing kicker chip, big headline, supporting body, optional illustration slot, a primary try-it CTA, and a dismissible × button. Available in four accents (red, amber, teal, green)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Feature highlight" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — amber default</span>
        <FeatureHighlightCard
          kicker="New"
          headline="Bay-side ADR validator"
          body="Run an Oak Flats job through the ADR sound-level validator without leaving the bay screen — the rego is auto-checked against the build-date table."
          tryLabel="Try ADR validator"
          href="#adr"
          accent="amber"
          illustration={<span style={{ fontFamily: "var(--primitive-font-display)" }}>ADR</span>}
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Other accents</span>
        <div className={styles.demoStack}>
          <FeatureHighlightCard
            kicker="Beta"
            headline="Parts crawl index live for Oak Flats catalogue"
            body="The crawl index now surfaces parts SKUs across all three suppliers — Genie, Mufflerpulse, Pi Studio — with one tap."
            tryLabel="Try crawl index"
            href="#crawl"
            accent="teal"
            illustration={<span style={{ fontFamily: "var(--primitive-font-display)" }}>≡</span>}
          />
          <FeatureHighlightCard
            kicker="Just shipped"
            headline="Workshop dispatch SMS templates"
            body="Send the bay-1 customer a templated SMS when their muffler is ready for pickup — pulls vehicle + bay context automatically."
            tryLabel="Try dispatch SMS"
            href="#sms"
            accent="green"
            illustration={<span style={{ fontFamily: "var(--primitive-font-display)" }}>✉</span>}
          />
          <FeatureHighlightCard
            kicker="Priority"
            headline="Crew safety briefings"
            body="Daily crew briefings now record SafeWork NSW attendance with rego scans — handy for the audit trail."
            tryLabel="Try briefings"
            href="#safety"
            accent="red"
            illustration={<span style={{ fontFamily: "var(--primitive-font-display)" }}>★</span>}
          />
        </div>
      </section>
    </main>
  )
}
