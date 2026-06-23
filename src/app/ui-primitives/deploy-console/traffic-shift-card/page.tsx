import type { Metadata } from "next"

import { TrafficShiftCard } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import {
  TRAFFIC_SHIFT_BLUE,
  TRAFFIC_SHIFT_CANARY,
  TRAFFIC_SHIFT_GREEN,
} from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Traffic shift card | Deploy console",
  description:
    "Primitive 14 — blue/green traffic shift slider with session stickiness.",
}

export default function TrafficShiftCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Card"
        title="Traffic shift card"
        description="Blue / green traffic shift. The split bar shows live percentages, the range slider steers from 100/0 through 0/100, snap buttons jump to common splits and the stickiness toggle controls whether returning visitors stay on the colour they first hit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Traffic shift card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · 100% blue · v3.42.6 still serving all traffic</span>
        <TrafficShiftCard initial={TRAFFIC_SHIFT_BLUE} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · 75/25 canary · v3.42.7 mid burn-in</span>
        <TrafficShiftCard initial={TRAFFIC_SHIFT_CANARY} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · 100% green · cutover complete, stickiness off</span>
        <TrafficShiftCard initial={TRAFFIC_SHIFT_GREEN} />
      </section>
    </main>
  )
}
