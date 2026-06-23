import type { Metadata } from "next"

import { BayScheduler } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"

import {
  BAY_BOOKINGS,
  BAY_HOURS,
  BAY_STATES,
  MECHANICS,
} from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Bay scheduler | Workshop ops",
  description:
    "Primitive 02 — day × bay scheduling grid with draggable bookings and bay status — three states.",
}

const QUIET_BAY_STATES = BAY_STATES.map((state) =>
  state.bayId === "bay-2"
    ? { ...state, state: "free" as const }
    : state.bayId === "bay-6-dyno"
      ? { ...state, state: "dirty" as const }
      : state,
)

const BLOCKED_BAY_STATES = BAY_STATES.map((state) =>
  state.bayId === "bay-1"
    ? { ...state, state: "blocked" as const, note: "Awaiting compressor service" }
    : state.bayId === "bay-5-alignment"
      ? { ...state, state: "blocked" as const, note: "Hunter rack calibration" }
      : state,
)

const QUIET_BOOKINGS = BAY_BOOKINGS.slice(0, 3)

export default function BaySchedulerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Bay scheduler"
        title="Day × bay scheduling grid"
        description="Day × bay grid covering Mon–Fri 7:30–17:30 and Sat 8–13. Bookings are draggable, bays report state (free, in-use, dirty, blocked). Three states — busy Tuesday with VIP pinned, a quiet Sunday-style morning, and a Bay 1 + Bay 5 blocked maintenance window."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Bay scheduler" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <BayScheduler
            dayLabel="Tuesday 26 May"
            hourTicks={BAY_HOURS}
            bookings={BAY_BOOKINGS}
            bayStates={BAY_STATES}
            mechanics={MECHANICS}
          />
          <BayScheduler
            dayLabel="Sunday 31 May · quiet day"
            hourTicks={BAY_HOURS}
            bookings={QUIET_BOOKINGS}
            bayStates={QUIET_BAY_STATES}
            mechanics={MECHANICS}
          />
          <BayScheduler
            dayLabel="Wednesday 27 May · maintenance"
            hourTicks={BAY_HOURS}
            bookings={BAY_BOOKINGS.slice(2, 6)}
            bayStates={BLOCKED_BAY_STATES}
            mechanics={MECHANICS}
          />
        </div>
      </section>
    </main>
  )
}
