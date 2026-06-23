import type { Metadata } from "next"

import { StreamQualityPanel } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import {
  STREAM_HEALTH_CRITICAL,
  STREAM_HEALTH_DEGRADED,
  STREAM_HEALTH_STABLE,
} from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Stream quality panel | Live broadcast",
  description:
    "Primitive 12 — encoder health panel with bitrate, dropped-frame ratio, audio level, and 24-sample bitrate sparkline.",
}

export default function StreamQualityPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Stream quality panel"
        title="Stream quality panel"
        description="OBS-style encoder readout shown in the host backstage and the on-stage stream-health overlay. Sparkline samples come from the last 24 health pings; the badge tone tracks the rolled-up health verdict."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Stream quality panel" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoTriple].join(" ")}>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Stable · 1080p60 · normal evening</span>
          <StreamQualityPanel snapshot={STREAM_HEALTH_STABLE} />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Degraded · dropped to 720p</span>
          <StreamQualityPanel snapshot={STREAM_HEALTH_DEGRADED} />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Critical · upload saturated</span>
          <StreamQualityPanel snapshot={STREAM_HEALTH_CRITICAL} />
        </div>
      </section>
    </main>
  )
}
