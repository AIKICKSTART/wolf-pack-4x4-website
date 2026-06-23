import type { Metadata } from "next"

import { PointInTimeRecoverySlider } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { PITR_WINDOW } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Point-in-time recovery slider | Backups",
  description:
    "Primitive 08 — Continuous time-axis slider for choosing a point-in-time restore target with selected-timestamp chip and replication-lag warning.",
}

export default function PitrSliderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / PITR slider"
        title="Point-in-time recovery slider"
        description="A continuous time axis bounded by the earliest restorable point and the latest replicated point. The selected timestamp chip updates as you slide, and a lag chip flips to alert if replication has fallen behind."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "PITR slider" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote DB · last 7 days replicated</span>
        <PointInTimeRecoverySlider window={PITR_WINDOW} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Lag warning state</span>
        <PointInTimeRecoverySlider
          window={{
            earliest: "2026-05-21T06:00:00Z",
            latest: "2026-05-28T06:00:00Z",
            lagSec: 1_820,
          }}
        />
      </section>
    </main>
  )
}
