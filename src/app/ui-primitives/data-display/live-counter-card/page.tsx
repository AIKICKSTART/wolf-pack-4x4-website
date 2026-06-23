import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LiveCounterCard } from "../../components/data-display"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Live counter card | UI Primitives — Data display",
}

const throughputSpark = [108, 112, 118, 122, 130, 142, 138, 148, 156, 162, 168, 172, 184, 192]
const tempSpark = [602, 608, 612, 618, 624, 619, 612, 608, 614, 618, 622, 628, 624, 619]
const revenueSpark = [3.2, 3.4, 3.5, 3.7, 3.9, 4.1, 4.0, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9]

export default function LiveCounterCardShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.07 / Data display"
        title="Live counter card — animated big number"
        description="Headline KPI with view-triggered count-up animation, live pulse indicator, and a trailing sparkline. Reduced-motion users see the final value immediately."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Live counter card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          <LiveCounterCard
            label="Jobs running today"
            value={192}
            unit="jobs"
            subhead="Across 4 bays, including 3 same-day walk-ins currently in dyno phase."
            sparkPoints={throughputSpark}
            sparkTone="teal"
            meta="Updated 9s ago"
            source="Workshop core"
          />
          <LiveCounterCard
            label="Manifold heat · Bay 2"
            value={619}
            unit="°C"
            subhead="Steady within design envelope. Cooling fan margin: 14 %."
            sparkPoints={tempSpark}
            sparkTone="amber"
            meta="1Hz · last 14 samples"
            source="Telemetry mesh"
          />
        </div>
        <div className={styles.row}>
          <LiveCounterCard
            label="Quote pipeline value"
            value={4.9}
            decimals={1}
            unit="M AUD"
            prefix="A$"
            subhead="Open quotes weighted by stage. Conversion at 42.8% last 12 weeks."
            sparkPoints={revenueSpark}
            sparkTone="green"
            meta="Updated hourly"
            source="Sales pipeline"
          />
        </div>
      </section>
    </main>
  )
}
