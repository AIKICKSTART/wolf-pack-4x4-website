import type { Metadata } from "next"

import { NodeEnd, WorkflowCanvas } from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "End node | Workflows",
  description:
    "Primitive 07 — End / terminal node. Neutral card with flag icon, optional outcome line, single input port.",
}

export default function NodeEndScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Node · End"
        title="End / terminal node"
        description="A neutral terminal card. Includes a flag icon, an optional outcome line, and a single input port. Used to close a branch of the workflow."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "End node" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — variants</span>
        <WorkflowCanvas
          ariaLabel="End node variants"
          height={420}
          zoomLabel="Variants"
        >
          <NodeEnd outcome="Customer notified" x={22} y={28} />
          <NodeEnd label="Branch end" outcome="No further action" x={58} y={28} />
          <NodeEnd
            label="Done"
            outcome="Logged · review tomorrow"
            x={36}
            y={72}
          />
          <NodeEnd outcome="Booking confirmed" x={72} y={72} />
        </WorkflowCanvas>
      </section>
    </main>
  )
}
