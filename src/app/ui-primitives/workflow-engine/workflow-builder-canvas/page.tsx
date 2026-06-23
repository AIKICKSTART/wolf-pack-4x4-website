import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WorkflowBuilderCanvas } from "../../components/workflow-engine"

import {
  QUOTE_FOLLOWUP_EDGES,
  QUOTE_FOLLOWUP_STEPS,
  QUOTE_FOLLOWUP_STEPS_FAILED,
  QUOTE_FOLLOWUP_STEPS_IDLE,
} from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Workflow builder canvas | Workflow engine",
  description:
    "Primitive 01 — node/edge canvas with pan, zoom, grid and minimap. Quote follow-up day-3 nudge.",
}

export default function WorkflowBuilderCanvasScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Canvas"
        title="Workflow builder canvas"
        description="The deterministic node/edge canvas. Pan with the mouse, jog the zoom, scout with the minimap. Status drives node tone — running pulses teal, failed glows red. Below sits the Quote follow-up day-3 nudge workflow — trigger → wait → decision → SMS or note → wait → decision → end."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Workflow builder canvas" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · running · SMS step mid-fire
        </span>
        <WorkflowBuilderCanvas
          steps={QUOTE_FOLLOWUP_STEPS}
          edges={QUOTE_FOLLOWUP_EDGES}
          selectedStepId="s4"
          ariaLabel="Quote follow-up nudge — running"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · idle · pre-fire</span>
        <WorkflowBuilderCanvas
          steps={QUOTE_FOLLOWUP_STEPS_IDLE}
          edges={QUOTE_FOLLOWUP_EDGES}
          ariaLabel="Quote follow-up nudge — idle"
          showMinimap={false}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · failure · Twilio SMS step exploded
        </span>
        <WorkflowBuilderCanvas
          steps={QUOTE_FOLLOWUP_STEPS_FAILED}
          edges={QUOTE_FOLLOWUP_EDGES}
          selectedStepId="s4"
          ariaLabel="Quote follow-up nudge — SMS failed"
        />
      </section>
    </main>
  )
}
