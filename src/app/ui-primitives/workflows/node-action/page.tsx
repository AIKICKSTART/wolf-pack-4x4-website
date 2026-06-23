import type { Metadata } from "next"

import { NodeAction, WorkflowCanvas } from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Action node | Workflows",
  description:
    "Primitive 03 — Action node card. Teal tone, cog icon, name, optional service meta, input + output ports, optional running spinner chip.",
}

export default function NodeActionScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Node · Action"
        title="Action node"
        description="A teal-toned action card. Includes a cog icon, name, optional service meta, an input port on the left and an output port on the right, and an optional running spinner chip in the header when the node is mid-flight."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Action node" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — variants</span>
        <WorkflowCanvas
          ariaLabel="Action node variants"
          height={420}
          zoomLabel="Variants"
        >
          <NodeAction
            name="Send confirmation SMS"
            service="Twilio · sms.send"
            x={22}
            y={26}
          />
          <NodeAction
            name="Sync to QuickBooks"
            service="QuickBooks · invoice.create"
            x={62}
            y={26}
            running
          />
          <NodeAction
            name="Email fitment checklist"
            service="Postmark · transactional"
            x={22}
            y={72}
          />
          <NodeAction
            name="Notify mechanic"
            service="Slack · #floor"
            x={62}
            y={72}
          />
        </WorkflowCanvas>
      </section>
    </main>
  )
}
