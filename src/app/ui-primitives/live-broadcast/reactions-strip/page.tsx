import type { Metadata } from "next"

import { ReactionsStrip } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import { REACTION_PULSES } from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Reactions strip | Live broadcast",
  description:
    "Primitive 08 — floating reactions strip with muffler-flame, wrench, dyno, smoke, and Aussie-flag pulses.",
}

const HEAVY_PULSES = [
  ...REACTION_PULSES,
  ...REACTION_PULSES.map((p, i) => ({ ...p, id: `${p.id}-b-${i}` })),
]

const QUIET_PULSES = REACTION_PULSES.slice(0, 3)

export default function ReactionsStripPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Reactions strip"
        title="Reactions strip"
        description="Floating emoji reactions that rise alongside the player. Muffler-flame for hot pulls, wrench for tech love, dyno for graph drops, smoke for diesel coverage, Aussie flag for local pride."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Reactions strip" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoTriple].join(" ")}>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Idle · empty stream</span>
          <ReactionsStrip pulses={[]} />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Quiet trickle · low engagement</span>
          <ReactionsStrip pulses={QUIET_PULSES} />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Peak engagement · supplier launch</span>
          <ReactionsStrip pulses={HEAVY_PULSES} />
        </div>
      </section>
    </main>
  )
}
