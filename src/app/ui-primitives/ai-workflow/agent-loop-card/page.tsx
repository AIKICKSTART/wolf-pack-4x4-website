import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AgentLoopCard } from "../../components/ai-workflow"

import { TRIAGE_LOOP_ITERATIONS } from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Agent loop | AI workflow",
  description:
    "Primitive 10 — agentic loop card with max-iterations radial and expand-on-click traces.",
}

export default function AgentLoopScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Loop"
        title="Agent loop card"
        description="An agentic loop — plan, act, observe, repeat. Halt conditions cap runaway work: max iterations, goal reached, tool error, budget cap, or a human pulling the cord. Click an iteration to expand its thought, action and observation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Agent loop card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · halted on goal · SMS triage 4 iters
        </span>
        <AgentLoopCard
          title="SMS triage · Mick N80"
          goal="Identify intent, capture vehicle year, run the quote estimator and reply with one SMS."
          maxIterations={8}
          haltConditions={["goal-reached", "max-iterations", "budget-cap", "tool-error"]}
          iterations={TRIAGE_LOOP_ITERATIONS}
          haltedBy="goal-reached"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · approaching iteration cap · still running
        </span>
        <AgentLoopCard
          title="DPF warranty investigation"
          goal="Determine if the rattle is covered under the 24-month parts warranty."
          maxIterations={5}
          haltConditions={["max-iterations", "tool-error", "human-stop"]}
          iterations={[
            {
              id: "d1",
              iteration: 1,
              thought: "Pull invoice + part SKU from CRM",
              action: "customer.lookup({ rego: 'BFC83Z' })",
              observation: "Found invoice inv_44119 · DPF Manta-DPF-V8 · sold 14 Apr 2026",
              confidence: 0.92,
            },
            {
              id: "d2",
              iteration: 2,
              thought: "Check warranty status against the policy doc",
              action: "vector.search({ query: 'cat-back warranty terms' })",
              observation: "Manta parts 24-month warranty · within window",
              confidence: 0.84,
            },
            {
              id: "d3",
              iteration: 3,
              thought: "Need rattle audio classification — escalate",
              action: "hermes.escalate({ reason: 'audio-diagnostic-needed' })",
              observation: "Routed to Bay 2 lead · Sam W queue · est wait 12m",
              confidence: 0.68,
            },
            {
              id: "d4",
              iteration: 4,
              thought: "Wait on Sam W reply",
              action: "wait({ timeoutMs: 720000 })",
              observation: "Pending · poll loop active",
              confidence: 0.5,
            },
          ]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · stopped by budget cap · cost-aware halt
        </span>
        <AgentLoopCard
          title="Blog draft · long-form research"
          goal="Produce a 1,200-word draft on DPF cleaning vs replacement."
          maxIterations={12}
          haltConditions={["budget-cap", "max-iterations", "goal-reached"]}
          iterations={[
            {
              id: "b1",
              iteration: 1,
              thought: "Gather supplier perspectives",
              action: "vector.search({ index: 'supplier-feeds' })",
              observation: "8 hits · 6 high-confidence",
              confidence: 0.88,
            },
            {
              id: "b2",
              iteration: 2,
              thought: "Outline the article",
              action: "claude.generate({ template: 'long-form-outline' })",
              observation: "12-section outline produced · 2,400 tokens spent",
              confidence: 0.82,
            },
            {
              id: "b3",
              iteration: 3,
              thought: "Begin section 1 · costs",
              action: "claude.generate({ section: 1 })",
              observation: "Budget cap reached — $0.50 USD daily ceiling.",
              confidence: 0.62,
            },
          ]}
          haltedBy="budget-cap"
        />
      </section>
    </main>
  )
}
