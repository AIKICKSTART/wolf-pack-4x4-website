import type { Metadata } from "next"

import { DripSequenceEditor } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_DRIP_META, DEMO_DRIP_TOUCHPOINTS } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Drip sequence editor | Marketing campaigns",
  description:
    "Primitive 14 — vertical timeline of touchpoints with delay chips, branching conditions and a visual workflow canvas.",
}

export default function DripSequenceScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Drip sequence editor"
        title="Drip sequence editor"
        description="A vertical timeline of campaign touchpoints driven by a single trigger. Each step shows channel, delay and an optional branching condition. The right pane previews the touchpoints on the workflow canvas using NodeTrigger, NodeAction and NodeWait primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Drip sequence" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <DripSequenceEditor
          meta={DEMO_DRIP_META}
          touchpoints={DEMO_DRIP_TOUCHPOINTS}
        />
      </section>
    </main>
  )
}
