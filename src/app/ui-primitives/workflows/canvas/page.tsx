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
  title: "Workflow canvas | Workflows",
  description:
    "Primitive 01 — the dotted-grid canvas surface that hosts nodes positioned with absolute coordinates.",
}

export default function WorkflowCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Canvas"
        title="Workflow canvas"
        description="A bordered, dotted-grid canvas that hosts nodes via absolute positioning. Includes a soft zoom-out feel via a single CSS variable, ambient gradients, and a corner zoom badge. Children are positioned with x/y percentages."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Canvas" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — empty canvas (100%)</span>
        <WorkflowCanvas ariaLabel="Empty workflow canvas" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>With three demo nodes (90%)</span>
        <WorkflowCanvas ariaLabel="Demo workflow canvas" zoom={0.9}>
          <NodeTrigger
            name="New booking"
            source="Webhook · Calendly"
            x={18}
            y={38}
            live
          />
          <NodeAction name="Send SMS" service="Twilio · sms" x={52} y={38} />
          <NodeAction
            name="Add to CRM"
            service="HubSpot · contacts"
            x={82}
            y={38}
          />
          <ConnectionLine from={{ x: 240, y: 230 }} to={{ x: 460, y: 230 }} tone="amber" />
          <ConnectionLine from={{ x: 640, y: 230 }} to={{ x: 860, y: 230 }} tone="teal" />
        </WorkflowCanvas>
      </section>
    </main>
  )
}
