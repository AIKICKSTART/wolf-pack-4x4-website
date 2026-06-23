import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WorkshopClockTile } from "../../components/bay-display"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Workshop clock tile | UI Primitives — Bay Display",
}

const SEED = new Date("2026-05-29T11:48:00+10:00")
const ARVO = new Date("2026-05-29T14:35:00+10:00")
const AFTER = new Date("2026-05-29T18:12:00+10:00")

export default function WorkshopClockTilePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.07 / Bay display"
        title="Workshop clock tile"
        description="Combined analog face + digital readout. Tile starts from a server-stable seed and then locks onto the live clock client-side, ticking every 30 s for low compositor cost."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Workshop clock tile" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          <WorkshopClockTile initialTime={SEED} shift="morning" />
          <WorkshopClockTile initialTime={ARVO} shift="afternoon" />
          <WorkshopClockTile initialTime={AFTER} shift="after-hours" />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Hour, minute and tick marks are transform-only rotations on a
            radial face — compositor-friendly. The digital readout uses
            tabular numerics so the seconds don&apos;t jitter. Shift chip recolours
            for morning crew (amber), afternoon (teal) and after-hours (red).
          </p>
        </div>
      </section>
    </main>
  )
}
