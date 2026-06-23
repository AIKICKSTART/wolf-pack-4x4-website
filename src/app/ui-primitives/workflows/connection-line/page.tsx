import type { Metadata } from "next"

import {
  ConnectionLine,
  NodeAction,
  NodeTrigger,
  WorkflowCanvas,
} from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Connection line | Workflows",
  description:
    "Primitive 08 — SVG bezier connection line between nodes with an animated dashed flow direction and an optional midpoint label chip.",
}

export default function ConnectionLineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Connection line"
        title="Connection line"
        description="An SVG bezier curve between two ports. The base track is a soft grey line, the flow line is dashed and animated to indicate flow direction. Supports red / amber / teal / green / neutral tones and an optional midpoint label chip. Reduced-motion stops the dash flow."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Connection line" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — multiple tones + labels</span>
        <WorkflowCanvas
          ariaLabel="Connection line tones"
          height={520}
          zoomLabel="Tones"
        >
          <NodeTrigger name="New booking" x={16} y={22} />
          <NodeAction name="Send confirmation" x={78} y={22} />
          <NodeTrigger name="Daily 9am" x={16} y={50} />
          <NodeAction name="Generate report" x={78} y={50} />
          <NodeTrigger name="Customer call" x={16} y={78} />
          <NodeAction name="Open ticket" x={78} y={78} />

          <ConnectionLine
            from={{ x: 220, y: 115 }}
            to={{ x: 780, y: 115 }}
            tone="amber"
            label="On booking"
          />
          <ConnectionLine
            from={{ x: 220, y: 260 }}
            to={{ x: 780, y: 260 }}
            tone="teal"
            label="Scheduled"
          />
          <ConnectionLine
            from={{ x: 220, y: 405 }}
            to={{ x: 780, y: 405 }}
            tone="green"
            label="On answer"
          />
        </WorkflowCanvas>
      </section>
    </main>
  )
}
