import type { Metadata } from "next"

import {
  type InspectorField,
  NodeInspectorPane,
} from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Inspector pane | Workflows",
  description:
    "Primitive 10 — Right-side inspector for the selected node. Kind chip, tabs (Config / Test / Notes), advanced expand, delete + test-run buttons.",
}

const CONFIG: ReadonlyArray<InspectorField> = [
  { id: "label", label: "Label", value: "Send confirmation SMS" },
  { id: "service", label: "Service", value: "Twilio · sms.send" },
  { id: "to", label: "Recipient", value: "{{trigger.customer.phone}}", code: true },
  {
    id: "body",
    label: "Body template",
    value:
      "Hi {{customer.first_name}}, your {{vehicle.platform}} booking is confirmed for {{booking.start_at}}.",
  },
]

const ADVANCED: ReadonlyArray<InspectorField> = [
  { id: "retry", label: "Retry policy", value: "3 attempts · exponential backoff" },
  { id: "timeout", label: "Timeout", value: "10 seconds" },
  { id: "from", label: "From number", value: "+61 2 5500 0042", code: true },
]

export default function InspectorPaneScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Inspector"
        title="Node inspector pane"
        description="A right-side inspector for the currently selected node. Includes a kind chip with tone, the node name, tabs (Config / Test / Notes), property fields, an Advanced expand, and a footer with Delete and Test-run actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Inspector pane" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Action node selected</span>
        <div className={styles.demoInline}>
          <NodeInspectorPane
            kind="action"
            name="Send confirmation SMS"
            subtitle="Twilio · sms.send · v3"
            configFields={CONFIG}
            advancedFields={ADVANCED}
          />
        </div>
      </section>
    </main>
  )
}
