import type { Metadata } from "next"

import { HoldoutAudienceCard } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Holdout audience card | A/B runtime",
  description:
    "Primitive 05 — holdout group card with percent, estimated size, and exclude rules.",
}

export default function HoldoutAudienceCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Holdout"
        title="Holdout audience card"
        description="Defines a holdout group — what percent of eligible traffic is excluded from the experiment, the estimated subjects, and the precise field/operator/values exclude rules."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Holdout audience card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Mufflermen NZ holdout</span>
        <div className={styles.demoStack}>
          <HoldoutAudienceCard
            name="NZ wholesale holdout"
            description="Hold NZ wholesale account traffic out of the Quote PDF redesign — pricing and tax lines differ for those accounts."
            holdoutPct={10}
            estimatedSize={3120}
            effectiveUntil="2026-08-01"
            excludeRules={[
              {
                id: "country",
                field: "country",
                operator: "is",
                values: ["NZ"],
              },
              {
                id: "account",
                field: "account_type",
                operator: "in",
                values: ["wholesale", "fleet"],
              },
              {
                id: "channel",
                field: "channel",
                operator: "is-not",
                values: ["organic-search"],
              },
            ]}
          />

          <HoldoutAudienceCard
            name="Mobile-only canary"
            description="Holdout 5% of mobile traffic from the suburb-pinned CTA test so we keep a clean baseline for revenue tracking."
            holdoutPct={5}
            estimatedSize={780}
            excludeRules={[
              {
                id: "device",
                field: "device.type",
                operator: "is",
                values: ["mobile"],
              },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
