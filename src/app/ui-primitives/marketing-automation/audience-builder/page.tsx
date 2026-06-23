import type { Metadata } from "next"

import { AudienceBuilder } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import { ILLAWARRA_4WD_AUDIENCE } from "../_mock-data"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Audience builder | Marketing automation",
  description:
    "Primitive 05 — visual rule builder with AND/OR groups, predicate cards and live reach estimate.",
}

const TINY_AUDIENCE = [
  {
    id: "core",
    title: "Quick build",
    operator: "and" as const,
    predicates: [
      {
        id: "v",
        kind: "vehicle" as const,
        label: "Vehicle make · Hilux",
        value: "Hilux",
      },
    ],
  },
]

const COMPLEX_AUDIENCE = [
  ...ILLAWARRA_4WD_AUDIENCE,
  {
    id: "boost",
    title: "Boost (OR)",
    operator: "or" as const,
    predicates: [
      {
        id: "b1",
        kind: "behaviour" as const,
        label: "Watched Bay 2 dyno reel · 30s+",
        value: "≥ 30s",
      },
      {
        id: "b2",
        kind: "tag" as const,
        label: "Tag · falcon-enthusiast",
      },
    ],
  },
]

export default function AudienceBuilderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Audience builder"
        title="Audience builder"
        description="Visual AND/OR rule builder that powers segmentation across every campaign in the orchestrator. Predicate kinds cover attribute, behaviour, lifecycle, geo, vehicle, tag and negation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Audience builder" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Single-rule starter</h2>
        <AudienceBuilder
          title="Quick segment"
          groups={TINY_AUDIENCE}
          estimate={3120}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Production · Illawarra 4WD</h2>
        <AudienceBuilder
          title="Illawarra 4WD · Bay 2 dyno"
          groups={ILLAWARRA_4WD_AUDIENCE}
          estimate={1284}
          estimateDelta={{ value: 184, direction: "up" }}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Complex multi-group</h2>
        <AudienceBuilder
          title="Illawarra · 4WD + boost cohort"
          groups={COMPLEX_AUDIENCE}
          estimate={2104}
          estimateDelta={{ value: 96, direction: "down" }}
        />
      </section>
    </main>
  )
}
