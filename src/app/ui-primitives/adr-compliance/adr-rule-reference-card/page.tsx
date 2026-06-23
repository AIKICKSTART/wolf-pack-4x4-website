import type { Metadata } from "next"

import { AdrRuleReferenceCard } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "ADR rule reference card | ADR compliance",
  description:
    "Primitive 06 — reference card surfacing an ADR rule number, plain-English summary and link to the official PDF.",
}

export default function AdrRuleReferenceCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Reference"
        title="ADR rule reference card"
        description="Plain-English ADR explainer. Surfaces the rule number, title, summary and an outbound link to the legislation register PDF. Use the chip badges to flag scope (e.g. light vehicle, stationary, drive-by)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "ADR rule reference card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>ADR 28/01 · light vehicle stationary</span>
        <AdrRuleReferenceCard
          rule="adr-28-01"
          badges={[
            { label: "Light vehicle", tone: "teal" },
            { label: "Stationary", tone: "amber" },
            { label: "90 dB(A)", tone: "green" },
          ]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>ADR 79/04 · emissions control</span>
        <AdrRuleReferenceCard
          rule="adr-79-04"
          badges={[
            { label: "Euro 5/6", tone: "teal" },
            { label: "Cat-converter intact", tone: "amber" },
          ]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>NSW VSI 14 · engineer sign-off</span>
        <AdrRuleReferenceCard
          rule="nsw-vsi-14"
          badges={[
            { label: "Engineer cert", tone: "amber" },
            { label: "NSW only", tone: "red" },
          ]}
        />
      </section>
    </main>
  )
}
