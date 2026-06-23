import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LiveRevenuePulse } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Live revenue pulse | UI Primitives — Workshop Floor Live",
}

// 10 hourly samples: 7am intake → 5pm close. AUD billed cumulative.
const trend: ReadonlyArray<number> = [
  240, 580, 980, 1620, 2440, 3120, 4080, 5160, 6210, 7240,
]

export default function RevenuePulsePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.14 / Workshop floor live"
        title="Live revenue pulse"
        description="Today's AUD billed, jobs completed, vs-yesterday delta and an hour-by-hour trend sparkline. Wired through the shared LiveCounterCard primitive so the counter animates in."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Revenue pulse" },
        ]}
      />
      <section className={styles.canvas}>
        <LiveRevenuePulse
          todayAud={7240}
          jobsCompleted={6}
          yesterdayAud={6480}
          trend={trend}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Sparkline tone shifts green when ahead of yesterday, red when
            behind. The count-up animation respects reduced motion via the
            existing CountUp primitive — no separate motion gate needed.
          </p>
        </div>
      </section>
    </main>
  )
}
