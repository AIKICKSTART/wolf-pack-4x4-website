import type { Metadata } from "next"
import { Activity, Flame, Gauge, Wrench } from "lucide-react"

import { PageHeader } from "../../components/page-header"
import { DashboardCard } from "../../components/data-display"
import { Sparkline } from "../../components/charts"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Dashboard card | UI Primitives — Data display",
}

const sparkA = [12, 14, 13, 16, 19, 18, 22, 24, 26, 28, 31, 34]
const sparkB = [88, 86, 90, 92, 85, 80, 78, 74, 71, 69, 68, 66]
const sparkC = [4, 7, 12, 18, 21, 19, 22, 26, 30, 34, 38, 42]

export default function DashboardCardShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.02 / Data display"
        title="Dashboard card — KPI tiles"
        description="Three surface treatments (glass / neuo / material) showing the same anatomy: icon, label, big value, delta chip, sparkline slot, optional footer link."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Dashboard card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          <DashboardCard
            surface="glass"
            icon={<Wrench />}
            label="Workshop throughput"
            value="248"
            unit="jobs / wk"
            delta={{ label: "+12.4%", direction: "up" }}
            spark={
              <Sparkline
                points={sparkA}
                tone="teal"
                ariaLabel="Throughput trend over 12 weeks"
                width={260}
                height={44}
              />
            }
            footer={{ label: "Open booking grid", href: "/ui-primitives/data-display" }}
            meta="vs. prev. 12wk"
          />
          <DashboardCard
            surface="neuo"
            icon={<Flame />}
            label="Manifold heat avg"
            value="612"
            unit="°C"
            delta={{ label: "-3.1%", direction: "down" }}
            spark={
              <Sparkline
                points={sparkB}
                tone="amber"
                ariaLabel="Manifold heat trend over 12 weeks"
                width={260}
                height={44}
              />
            }
            footer={{ label: "View telemetry", href: "/ui-primitives/data-display" }}
            meta="Bay 1 · 24h"
          />
          <DashboardCard
            surface="material"
            icon={<Gauge />}
            label="Quote conversion"
            value="42.8"
            unit="%"
            delta={{ label: "+5.2pp", direction: "up" }}
            spark={
              <Sparkline
                points={sparkC}
                tone="green"
                ariaLabel="Quote conversion rate over 12 weeks"
                width={260}
                height={44}
              />
            }
            footer={{ label: "Drill into pipeline", href: "/ui-primitives/data-display" }}
            meta="Sydney / Wollongong"
          />
        </div>

        <div className={styles.row}>
          <DashboardCard
            surface="glass"
            icon={<Activity />}
            label="Active loaner cars"
            value="14"
            unit="vehicles"
            delta={{ label: "flat", direction: "flat" }}
            meta="Sydney depot"
          />
          <DashboardCard
            surface="glass"
            icon={<Wrench />}
            label="Parts on backorder"
            value="36"
            unit="SKUs"
            delta={{ label: "+8 wk-on-wk", direction: "up" }}
            meta="ETA 7-14 days"
          />
          <DashboardCard
            surface="glass"
            icon={<Flame />}
            label="EGT outlier alerts"
            value="3"
            unit="bays"
            delta={{ label: "+1 today", direction: "up" }}
            meta="last 24h"
          />
        </div>
      </section>
    </main>
  )
}
