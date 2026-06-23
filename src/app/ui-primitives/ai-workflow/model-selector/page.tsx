import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ModelSelector } from "../../components/ai-workflow"

import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Model selector | AI workflow",
  description:
    "Primitive 03 — model card picker with cost-per-1M and typical-latency badges.",
}

export default function ModelSelectorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Model"
        title="Model selector"
        description="Pick the model that runs this node. Cards display vendor, tier band, cost per million input tokens, typical latency and a speed descriptor. Try selecting different tiers — each tile has its own border and chip tone."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Model selector" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · default · Claude Opus 4.7 (frontier)
        </span>
        <ModelSelector
          kicker="Quote estimator model"
          models={[
            "claude-opus-4.7",
            "gpt-4o-2024",
            "gemini-2.5-flash",
            "llama-3.3-70b",
          ]}
          defaultSelectedId="claude-opus-4.7"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · fast pre-set · Gemini Flash (cost-aware automations)
        </span>
        <ModelSelector
          kicker="Customer SMS triage"
          models={[
            "gemini-2.5-flash",
            "llama-3.3-70b",
            "gpt-4o-2024",
          ]}
          defaultSelectedId="gemini-2.5-flash"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · two-model fallback · self-hosted as backup
        </span>
        <ModelSelector
          kicker="Marketing blog draft"
          models={["claude-opus-4.7", "llama-3.3-70b"]}
          defaultSelectedId="llama-3.3-70b"
        />
      </section>
    </main>
  )
}
