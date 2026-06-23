import type { Metadata } from "next"

import { AdrEducationSnippet } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "ADR education snippet | ADR compliance",
  description:
    "Primitive 11 — customer-facing ADR education spotlight explaining what the rules mean for their build.",
}

export default function AdrEducationSnippetScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Customer education"
        title="ADR education snippet"
        description="Wraps the FeatureSpotlight marketing primitive in a customer-friendly ADR explainer. Plain-English heading + body, rule chip bullets, and an optional ‘further reading’ link. Designed for the booking funnel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Education snippet" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Customer-friendly explainer</span>
        <AdrEducationSnippet
          heading="What ADR means for your build"
          body="The Australian Design Rules cap how loud your exhaust can be at the kerb and how clean your emissions need to be on a roadside test. The workshop fits parts that keep your build within those caps — so you keep your pink slip, your green slip, and your weekend."
          bullets={[
            { label: "ADR 28/01 — Stationary 90 dB(A) for light vehicles" },
            { label: "ADR 28/02 — Stationary 92 dB(A) for extended vehicles" },
            { label: "ADR 79/04 — Emissions controls must remain intact" },
            { label: "NSW VSI 08 — Aftermarket exhaust guidance" },
          ]}
          furtherReading={{
            label: "Read the workshop ADR cheat sheet",
            href: "/about/adr-cheat-sheet",
          }}
        />
      </section>
    </main>
  )
}
