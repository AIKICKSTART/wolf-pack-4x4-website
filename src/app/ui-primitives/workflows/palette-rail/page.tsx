import type { Metadata } from "next"

import {
  NodePaletteRail,
  type WorkflowPaletteSection,
} from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Palette rail | Workflows",
  description:
    "Primitive 09 — Left rail palette with categorised node types: triggers, actions, logic, time, output.",
}

const PALETTE: ReadonlyArray<WorkflowPaletteSection> = [
  {
    id: "triggers",
    title: "Triggers",
    items: [
      {
        id: "webhook",
        name: "Webhook",
        kind: "trigger",
        description: "POST · custom URL",
      },
      {
        id: "schedule",
        name: "Schedule",
        kind: "trigger",
        description: "Cron expression",
      },
      {
        id: "manual",
        name: "Manual run",
        kind: "trigger",
        description: "Button trigger",
      },
    ],
  },
  {
    id: "actions",
    title: "Actions",
    items: [
      {
        id: "sms",
        name: "Send SMS",
        kind: "action",
        description: "Twilio · sms.send",
      },
      {
        id: "email",
        name: "Send email",
        kind: "action",
        description: "Postmark · transactional",
      },
      {
        id: "http",
        name: "HTTP request",
        kind: "action",
        description: "GET · POST · PUT · DELETE",
      },
    ],
  },
  {
    id: "logic",
    title: "Logic",
    items: [
      {
        id: "if",
        name: "If / else",
        kind: "condition",
        description: "Branch on expression",
      },
      {
        id: "loop",
        name: "For each",
        kind: "loop",
        description: "Iterate a collection",
      },
    ],
  },
  {
    id: "time",
    title: "Time",
    items: [
      {
        id: "delay",
        name: "Wait",
        kind: "wait",
        description: "Pause for duration",
      },
      {
        id: "until",
        name: "Wait until",
        kind: "wait",
        description: "Pause until datetime",
      },
    ],
  },
  {
    id: "output",
    title: "Output",
    items: [
      {
        id: "end",
        name: "End",
        kind: "end",
        description: "Close branch",
      },
    ],
  },
]

export default function PaletteRailScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Palette rail"
        title="Node palette rail"
        description="A left-side palette listing the categorised node types — triggers, actions, logic, time, output. Each card is visually draggable and shows a colour-keyed icon, a name, and a one-line description. Includes a header search input."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Palette rail" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoInline}>
          <NodePaletteRail sections={PALETTE} />
        </div>
      </section>
    </main>
  )
}
