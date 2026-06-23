import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SafetyMessageTile } from "../../components/bay-display"
import { SAFETY_MESSAGES } from "../bay-display-mock"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Safety message tile | UI Primitives — Bay Display",
}

export default function SafetyMessageTilePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.12 / Bay display"
        title="Safety message tile"
        description="Rotating safety message — PPE, escort rules, hot-exhaust warning. Tone drives a teal/amber/red wash, hard-hat badge and dot indicators."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Safety message tile" },
        ]}
      />
      <section className={styles.canvas}>
        <SafetyMessageTile messages={SAFETY_MESSAGES} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Rotation defaults to 7 s; intervalMs 0 disables rotation. When
            prefers-reduced-motion is set, cadence doubles so each message
            holds longer before swapping. Dots underneath show progress and
            mark the active item.
          </p>
        </div>
      </section>
    </main>
  )
}
