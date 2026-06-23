import type { Metadata } from "next"

import { NodeTrigger, WorkflowCanvas } from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Trigger node | Workflows",
  description:
    "Primitive 02 — Trigger node card. Amber tone, bolt icon, name, optional source line, single output port.",
}

export default function NodeTriggerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Node · Trigger"
        title="Trigger node"
        description="An amber-toned trigger card. Includes the kicker label, name, optional source meta, a pulsing dot when live, and a single output port on the right edge. Used as the root of every workflow."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Trigger node" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — variants</span>
        <WorkflowCanvas
          ariaLabel="Trigger node variants"
          height={420}
          zoomLabel="Variants"
        >
          <NodeTrigger name="New booking created" x={22} y={26} />
          <NodeTrigger
            name="Customer rang in"
            source="Twilio · call.completed"
            x={62}
            y={26}
            live
          />
          <NodeTrigger
            name="Daily 8am check"
            source="Cron · 0 8 * * *"
            x={22}
            y={72}
          />
          <NodeTrigger
            name="Hilux fitment review"
            source="Manual"
            x={62}
            y={72}
          />
        </WorkflowCanvas>
      </section>
    </main>
  )
}
