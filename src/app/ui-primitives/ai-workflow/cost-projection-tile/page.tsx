import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CostProjectionTile } from "../../components/ai-workflow"

import { QUOTE_COST_TREND_USD } from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Cost projection | AI workflow",
  description:
    "Primitive 12 — projected cost per run, per day and per month for a workflow.",
}

export default function CostProjectionTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Cost"
        title="Cost projection tile"
        description="Project the running cost of a workflow. Per-run, per-day and per-month figures are driven by model pricing × token mix × volume. AUD or USD modes available for local-currency thinking."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Cost projection tile" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · Quote estimator · Claude Opus 4.7
        </span>
        <CostProjectionTile
          title="Quote estimator"
          modelId="claude-opus-4.7"
          inputTokensPerRun={1820}
          outputTokensPerRun={620}
          runsPerDay={142}
          trendUsd={QUOTE_COST_TREND_USD}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · SMS triage · cost-aware Gemini Flash · AUD view
        </span>
        <CostProjectionTile
          title="SMS triage"
          modelId="gemini-2.5-flash"
          inputTokensPerRun={420}
          outputTokensPerRun={120}
          runsPerDay={1846}
          currency="AUD"
          trendUsd={[0.18, 0.22, 0.24, 0.21, 0.26, 0.28, 0.25]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · self-hosted Llama · negligible per-run
        </span>
        <CostProjectionTile
          title="Blog draft fan-out"
          modelId="llama-3.3-70b"
          inputTokensPerRun={2810}
          outputTokensPerRun={1240}
          runsPerDay={20}
        />
      </section>
    </main>
  )
}
