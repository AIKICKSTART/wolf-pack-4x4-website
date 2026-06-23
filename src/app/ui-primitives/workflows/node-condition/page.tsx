import type { Metadata } from "next"

import { NodeCondition, WorkflowCanvas } from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Condition node | Workflows",
  description:
    "Primitive 04 — Condition node. Green branching card with expression chip and labelled true / false ports on top and bottom edges.",
}

export default function NodeConditionScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Node · Condition"
        title="Condition node"
        description="A green-toned branching card. Includes a git-branch icon, name, an optional expression chip, and two output ports — `True` on the top edge and `False` on the bottom edge, both labelled. Drives if/else branching."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Condition node" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — variants</span>
        <WorkflowCanvas
          ariaLabel="Condition node variants"
          height={460}
          zoomLabel="Variants"
        >
          <NodeCondition
            name="Hilux platform?"
            expression="booking.vehicle.platform === 'Hilux'"
            x={26}
            y={36}
          />
          <NodeCondition
            name="VIP customer?"
            expression="customer.tier === 'gold'"
            x={64}
            y={36}
          />
          <NodeCondition
            name="Pre-booking deposit paid?"
            expression="booking.deposit >= 200"
            x={44}
            y={78}
          />
        </WorkflowCanvas>
      </section>
    </main>
  )
}
