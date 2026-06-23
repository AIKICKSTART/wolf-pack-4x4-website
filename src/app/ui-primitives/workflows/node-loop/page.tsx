import type { Metadata } from "next"

import { NodeLoop, WorkflowCanvas } from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Loop node | Workflows",
  description:
    "Primitive 05 — Loop node. Red For-Each block with iteration chip, input/output ports, and a labelled loop-back port on the bottom edge.",
}

export default function NodeLoopScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Node · Loop"
        title="Loop node"
        description="A red-toned For-Each block. Includes a repeat icon, name, optional iteration chip describing what the loop iterates over, an input on the left, an output on the right, and a labelled loop-back port on the bottom edge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Loop node" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — variants</span>
        <WorkflowCanvas
          ariaLabel="Loop node variants"
          height={460}
          zoomLabel="Variants"
        >
          <NodeLoop
            name="For each booking item"
            iteration="booking.items[]"
            x={26}
            y={36}
          />
          <NodeLoop
            name="For each fitment photo"
            iteration="job.photos[0..n]"
            x={66}
            y={36}
          />
          <NodeLoop
            name="Retry up to 3 times"
            iteration="attempt < 3"
            x={44}
            y={78}
          />
        </WorkflowCanvas>
      </section>
    </main>
  )
}
