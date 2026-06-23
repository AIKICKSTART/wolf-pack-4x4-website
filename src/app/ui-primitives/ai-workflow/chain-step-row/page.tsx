import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ChainStepRow } from "../../components/ai-workflow"

import { QUOTE_CHAIN_STEPS } from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Chain step row | AI workflow",
  description:
    "Primitive 08 — single chain step row with input/output preview and token spend.",
}

export default function ChainStepRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Chain"
        title="Chain step row"
        description="A single horizontal row in a chain of steps — input on the left, output on the right, token spend and USD cost at the bottom. Status drives the row tone; running steps spin."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Chain step row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · quote estimator chain · live
        </span>
        <div className={styles.demoStack}>
          {QUOTE_CHAIN_STEPS.map((step, idx) => (
            <ChainStepRow
              key={step.id}
              index={idx}
              kind={step.kind}
              title={step.title}
              modelId={step.modelId}
              status={step.status}
              inputPreview={step.inputPreview}
              outputPreview={step.outputPreview}
              tokens={step.tokens}
              costUsd={step.costUsd}
              latencyMs={step.latencyMs}
            />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · failed mid-chain</span>
        <ChainStepRow
          index={3}
          kind="model"
          title="Draft the quote"
          modelId="claude-opus-4.7"
          status="failed"
          inputPreview="Generate JSON quote — parts inc GST, labour 2.5h × $80, total rounded."
          outputPreview="Error: rate limit · 429 from Anthropic API. Retry queued for 30s."
          tokens={0}
          costUsd={0}
          latencyMs={420}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · single skipped step · gate diverted
        </span>
        <ChainStepRow
          index={5}
          kind="tool"
          title="Persist quote · quote.create"
          status="skipped"
          inputPreview="Gate rejected the JSON shape · skipping the CRM write."
          outputPreview="—"
          tokens={0}
          costUsd={0}
        />
      </section>
    </main>
  )
}
