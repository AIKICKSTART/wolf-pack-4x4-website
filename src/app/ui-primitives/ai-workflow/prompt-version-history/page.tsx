import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PromptVersionHistory } from "../../components/ai-workflow"

import { QUOTE_VERSIONS } from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Prompt version history | AI workflow",
  description:
    "Primitive 11 — versioned prompt history with win-rate per version.",
}

export default function PromptVersionHistoryScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / History"
        title="Prompt version history"
        description="Track every prompt edit. Each version carries a win-rate vs the previous, run count, average tokens and a trailing sparkline so regressions are obvious on first glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Prompt version history" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · quote estimator · v3.2 live · trend climbing
        </span>
        <PromptVersionHistory
          title="Quote estimator"
          versions={QUOTE_VERSIONS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · single live version · no prior baseline
        </span>
        <PromptVersionHistory
          title="Blog draft · v0.3 baseline"
          versions={[
            {
              id: "bv1",
              version: "v0.3",
              timestamp: "Today 06:00",
              author: "jordan.r",
              summary:
                "Initial structured outline prompt — pulls fitment notes + supplier specs as context.",
              winRate: 0.62,
              runs: 12,
              avgTokens: 3210,
              live: true,
            },
          ]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · failing regression · candidate vs current live
        </span>
        <PromptVersionHistory
          title="SMS triage · candidate"
          versions={[
            {
              id: "rc1",
              version: "v1.1-rc",
              timestamp: "Today 12:48",
              author: "bec.s",
              summary:
                "Candidate · forced tight intent enum. Win-rate dropped — too rigid for ambiguous SMS.",
              winRate: 0.51,
              runs: 64,
              avgTokens: 412,
              trend: [60, 58, 54, 52, 51, 50, 48, 51, 52, 51],
            },
            {
              id: "rc2",
              version: "v1.0",
              timestamp: "May 14 · 09:12",
              author: "bec.s",
              summary:
                "Live · fuzzy intent classification with free-text fallback for ambiguity.",
              winRate: 0.82,
              runs: 1846,
              avgTokens: 380,
              trend: [70, 72, 74, 76, 78, 79, 80, 81, 82, 82],
              live: true,
            },
          ]}
        />
      </section>
    </main>
  )
}
