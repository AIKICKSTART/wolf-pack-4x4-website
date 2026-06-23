import type { Metadata } from "next"

import { MechanicShiftTimeline } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"
import type { ShiftBlock } from "../../components/workshop-ops"

import {
  MECHANICS,
  SHIFT_BLOCKS,
  SHIFT_HOURS,
} from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Mechanic shift timeline | Workshop ops",
  description:
    "Primitive 03 — staff × hour shift grid with shifts, breaks, training, and sick-leave chips — three states.",
}

// Saturday short shift configuration.
const SAT_BLOCKS: ReadonlyArray<ShiftBlock> = [
  { id: "sat-tim-1", mechanicId: "mech-tim", kind: "shift", startHour: 8, durationHours: 5 },
  { id: "sat-brad-1", mechanicId: "mech-brad", kind: "shift", startHour: 8, durationHours: 2.5 },
  { id: "sat-brad-2", mechanicId: "mech-brad", kind: "lunch", startHour: 10.5, durationHours: 0.5 },
  { id: "sat-brad-3", mechanicId: "mech-brad", kind: "shift", startHour: 11, durationHours: 2 },
  { id: "sat-jase-1", mechanicId: "mech-jase", kind: "leave", startHour: 8, durationHours: 5, note: "RDO" },
  { id: "sat-kyla-1", mechanicId: "mech-kyla", kind: "shift", startHour: 9, durationHours: 4 },
]

const SAT_HOURS: ReadonlyArray<number> = [8, 9, 10, 11, 12, 13]

// Public holiday — everyone off.
const HOL_BLOCKS: ReadonlyArray<ShiftBlock> = MECHANICS.map((mech, idx) => ({
  id: `hol-${mech.id}`,
  mechanicId: mech.id,
  kind: idx % 2 === 0 ? "leave" : "leave",
  startHour: 7.5,
  durationHours: 10,
  note: "Queen's Birthday public holiday",
}))

export default function MechanicShiftTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Mechanic shift timeline"
        title="Staff × hour shift grid"
        description="Crew shift timeline for Tim (master tech), Brad (senior fab), Jase (diagnostic), and Kyla (Y2 apprentice). Blocks render shifts, smoko breaks, lunches, sick-leave hatching, dealer training, and full-day leave. Three states — Tuesday with Kyla off sick, a short Saturday with Jase on RDO, and a public-holiday shutdown."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Mechanic shift timeline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <MechanicShiftTimeline
            mechanics={MECHANICS}
            blocks={SHIFT_BLOCKS}
            hourTicks={SHIFT_HOURS}
            dayLabel="Tuesday 26 May · 7:30–17:30"
          />
          <MechanicShiftTimeline
            mechanics={MECHANICS}
            blocks={SAT_BLOCKS}
            hourTicks={SAT_HOURS}
            dayLabel="Saturday 30 May · 8:00–13:00"
          />
          <MechanicShiftTimeline
            mechanics={MECHANICS}
            blocks={HOL_BLOCKS}
            hourTicks={SHIFT_HOURS}
            dayLabel="Monday 8 June · Queen's Birthday"
          />
        </div>
      </section>
    </main>
  )
}
