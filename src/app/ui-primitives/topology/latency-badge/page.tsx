import type { Metadata } from "next"

import { LatencyBadge } from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Latency badge | Topology",
  description:
    "Primitive 06 — p50 / p99 latency badge with tone shifting against an SLO threshold and a tiny sparkline.",
}

export default function LatencyBadgeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Latency badge"
        title="Latency badge"
        description="A compact mono chip showing p50 + p99 latency in ms, a tiny sparkline of recent samples, and tone that shifts based on the p99 against an SLO threshold."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Latency badge" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Within SLO (p99 &lt; 250ms)</span>
        <div className={styles.miniRow}>
          <LatencyBadge
            sample={{ p50: 38, p99: 92, trend: [60, 72, 64, 58, 70, 92, 84] }}
            sloP99={250}
          />
          <LatencyBadge
            sample={{ p50: 12, p99: 48, trend: [40, 38, 42, 36, 44, 48, 41] }}
            sloP99={250}
            size="sm"
          />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Pressing SLO + breached</span>
        <div className={styles.miniRow}>
          <LatencyBadge
            sample={{ p50: 80, p99: 220, trend: [180, 190, 210, 230, 220, 240, 220] }}
            sloP99={250}
          />
          <LatencyBadge
            sample={{ p50: 140, p99: 380, trend: [220, 260, 320, 380, 340, 400, 380] }}
            sloP99={250}
          />
          <LatencyBadge
            sample={{ p50: 280, p99: 820, trend: [320, 420, 600, 740, 880, 800, 820] }}
            sloP99={250}
          />
        </div>
      </section>
    </main>
  )
}
