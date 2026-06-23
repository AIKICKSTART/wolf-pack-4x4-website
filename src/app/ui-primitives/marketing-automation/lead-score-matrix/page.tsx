import type { Metadata } from "next"

import { LeadScoreMatrix } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import {
  LEAD_SCORE_COLS,
  LEAD_SCORE_ROWS,
  LEAD_SCORE_VALUES,
} from "../_mock-data"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Lead score matrix | Marketing automation",
  description:
    "Primitive 04 — firmographic × behavioural score grid with sales-ready threshold and heat-mapped cells.",
}

export default function LeadScoreMatrixScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Lead score matrix"
        title="Lead score matrix"
        description="Heat-mapped matrix used by sales to decide which contacts cross the MQL → SQL line. Rows are firmographic / vehicle segments; columns are behavioural signals."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Lead score matrix" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Production scores (threshold 70)</h2>
        <LeadScoreMatrix
          title="Mufflermen lead score · this week"
          rows={LEAD_SCORE_ROWS}
          cols={LEAD_SCORE_COLS}
          scores={LEAD_SCORE_VALUES}
          threshold={70}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Tightened threshold (90)</h2>
        <LeadScoreMatrix
          title="MQL → SQL · tightened"
          rows={LEAD_SCORE_ROWS}
          cols={LEAD_SCORE_COLS}
          scores={LEAD_SCORE_VALUES}
          threshold={90}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Cold-start (no signal yet)</h2>
        <LeadScoreMatrix
          title="Cold-start baseline"
          rows={LEAD_SCORE_ROWS}
          cols={LEAD_SCORE_COLS}
          scores={LEAD_SCORE_VALUES.map((row) => row.map(() => 0))}
          threshold={70}
        />
      </section>
    </main>
  )
}
