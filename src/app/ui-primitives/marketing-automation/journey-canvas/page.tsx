import type { Metadata } from "next"

import { JourneyCanvas } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import {
  NEW_LEAD_JOURNEY_EDGES,
  NEW_LEAD_JOURNEY_NODES,
} from "../_mock-data"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Journey canvas | Marketing automation",
  description:
    "Primitive 01 — node-and-edge canvas for trigger → branch → action flows with edge labels and a live-count summary.",
}

const STARTER_NODES = [
  {
    id: "trig",
    kind: "trigger" as const,
    title: "Quote abandoned",
    subtitle: "Webhook · quote form",
    col: 1,
    row: 1,
    active: true,
  },
  {
    id: "exit",
    kind: "exit" as const,
    title: "Exit",
    subtitle: "Configure cadence",
    col: 2,
    row: 1,
  },
]
const STARTER_EDGES = [{ from: "trig", to: "exit", kind: "default" as const }]

const COMPLEX_NODES = [
  ...NEW_LEAD_JOURNEY_NODES,
  {
    id: "alt-flow",
    kind: "action" as const,
    title: "Call task · Dazza",
    subtitle: "Lead score > 60",
    col: 4,
    row: 1,
  },
]
const COMPLEX_EDGES = [
  ...NEW_LEAD_JOURNEY_EDGES,
  { from: "act-welcome", to: "alt-flow", kind: "fallback" as const, label: "VIP" },
]

export default function JourneyCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Journey canvas"
        title="Journey canvas"
        description="Curved-edge canvas that lays trigger, wait, condition, action, goal and exit nodes on a grid. Edges encode default / yes / no / fallback semantics. Active node highlighting and a live-count summary are first-class."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Journey canvas" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Starter</h2>
        <JourneyCanvas
          title="Quote abandoned · starter"
          nodes={STARTER_NODES}
          edges={STARTER_EDGES}
          liveCount={0}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Production journey</h2>
        <JourneyCanvas
          title="New lead · 7-day workshop intro"
          nodes={NEW_LEAD_JOURNEY_NODES}
          edges={NEW_LEAD_JOURNEY_EDGES}
          liveCount={184}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Multi-branch with VIP path</h2>
        <JourneyCanvas
          title="New lead · 7-day intro + VIP escalation"
          nodes={COMPLEX_NODES}
          edges={COMPLEX_EDGES}
          liveCount={262}
        />
      </section>
    </main>
  )
}
