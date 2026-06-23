import type { Metadata } from "next"

import { NodeWait, WorkflowCanvas } from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Wait node | Workflows",
  description:
    "Primitive 06 — Wait node. Compact amber delay block with clock icon, duration headline, optional schedule chip, and input + output ports.",
}

export default function NodeWaitScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Node · Wait"
        title="Wait node"
        description="A compact amber delay block. Includes a clock icon, the duration as the headline, an optional schedule chip (e.g. business-hours-only), and an input and an output port. Used to pause a branch."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Wait node" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — variants</span>
        <WorkflowCanvas
          ariaLabel="Wait node variants"
          height={420}
          zoomLabel="Variants"
        >
          <NodeWait duration="Wait 5 minutes" x={22} y={28} />
          <NodeWait
            duration="Wait 2 hours"
            schedule="Mon–Fri 9–17"
            x={56}
            y={28}
          />
          <NodeWait
            duration="Wait until tomorrow 8am"
            schedule="Sydney TZ"
            x={36}
            y={72}
          />
          <NodeWait duration="Delay 30 seconds" x={72} y={72} />
        </WorkflowCanvas>
      </section>
    </main>
  )
}
