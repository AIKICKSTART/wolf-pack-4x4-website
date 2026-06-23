import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ParallelBranch } from "../../components/ai-workflow"

import { BLOG_PARALLEL_LANES } from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Parallel branch | AI workflow",
  description:
    "Primitive 06 — fan-out lanes with first / wait-all / race-best-score join strategies.",
}

export default function ParallelBranchScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Parallel"
        title="Parallel branch"
        description="Fan-out a job across multiple lanes — typically multi-model drafting, ensemble retrieval or A/B copy. The join chip picks the strategy: first to finish, wait for all, or race and select the best score."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Parallel branch" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · race best-score · Monday blog draft fan-out
        </span>
        <ParallelBranch
          title="Blog draft · 4-model race"
          join="race"
          lanes={BLOG_PARALLEL_LANES}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · first to finish · quick triage
        </span>
        <ParallelBranch
          title="SMS triage · first-finish"
          join="first"
          lanes={[
            {
              id: "lf1",
              name: "Llama 70B intent",
              detail: "Self-hosted · on-prem",
              status: "passed",
              latencyMs: 240,
            },
            {
              id: "lf2",
              name: "Gemini Flash intent",
              detail: "Cheapest fallback",
              status: "skipped",
              latencyMs: 380,
            },
          ]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · wait-for-all · ensemble research
        </span>
        <ParallelBranch
          title="DPF cleaning research"
          join="all"
          lanes={[
            {
              id: "wa1",
              name: "RAG · workshop notes",
              detail: "5 years of bay journals",
              status: "passed",
              latencyMs: 142,
            },
            {
              id: "wa2",
              name: "RAG · supplier feeds",
              detail: "Manta + DPF Australia",
              status: "passed",
              latencyMs: 248,
            },
            {
              id: "wa3",
              name: "Web search · ADR",
              detail: "Compliance notes",
              status: "running",
            },
          ]}
        />
      </section>
    </main>
  )
}
