import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FlowCanvas } from "../../components/ai-workflow"

import {
  QUOTE_FLOW_EDGES,
  QUOTE_FLOW_NODES,
  QUOTE_FLOW_NODES_FAILED,
  QUOTE_FLOW_NODES_IDLE,
} from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Flow canvas | AI workflow",
  description:
    "Primitive 01 — node/edge flow canvas with pan, zoom, grid and minimap. Quote estimator scenario.",
}

export default function FlowCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Canvas"
        title="Flow canvas"
        description="The node/edge canvas — pan with mouse, zoom with the +/- controls, scout with the minimap. Live status drives node tone — running pulses, failed glows red. The quote estimator wires together PII redact → RAG context → prompt → model → JSON gate → tool persist."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Flow canvas" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · running · model node mid-stream
        </span>
        <FlowCanvas
          nodes={QUOTE_FLOW_NODES}
          edges={QUOTE_FLOW_EDGES}
          selectedNodeId="n5"
          ariaLabel="Quote estimator workflow — running"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · idle · pre-fire</span>
        <FlowCanvas
          nodes={QUOTE_FLOW_NODES_IDLE}
          edges={QUOTE_FLOW_EDGES}
          ariaLabel="Quote estimator workflow — idle"
          showMinimap={false}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · failure · output gate rejected the JSON
        </span>
        <FlowCanvas
          nodes={QUOTE_FLOW_NODES_FAILED}
          edges={QUOTE_FLOW_EDGES}
          selectedNodeId="n6"
          ariaLabel="Quote estimator workflow — gate failed"
        />
      </section>
    </main>
  )
}
