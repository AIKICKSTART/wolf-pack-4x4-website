import type { Metadata } from "next"

import { SegmentBreakdownRow } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Segment breakdown row | A/B runtime",
  description:
    "Primitive 08 — per-segment lift row (mobile / desktop / iOS / Android / AU / NZ) with diverging bar.",
}

export default function SegmentBreakdownRowScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Row"
        title="Segment breakdown row"
        description="Per-segment lift row with a diverging bar centred at zero. Designed to drop into a segment table — one row per Mobile, Desktop, iOS, Android, AU and NZ slice."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Segment breakdown row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Quote PDF redesign by segment</span>
        <div className={styles.rowGroup}>
          <SegmentBreakdownRow
            segment="mobile"
            liftPct={14.2}
            sampleSize={9420}
            maxAbsLift={20}
            pTag="p<0.01"
          />
          <SegmentBreakdownRow
            segment="desktop"
            liftPct={8.4}
            sampleSize={4080}
            maxAbsLift={20}
            pTag="p<0.05"
          />
          <SegmentBreakdownRow
            segment="ios"
            liftPct={16.1}
            sampleSize={5210}
            maxAbsLift={20}
            pTag="p<0.001"
          />
          <SegmentBreakdownRow
            segment="android"
            liftPct={11.8}
            sampleSize={4210}
            maxAbsLift={20}
            pTag="p<0.01"
          />
          <SegmentBreakdownRow
            segment="au"
            liftPct={12.6}
            sampleSize={11420}
            maxAbsLift={20}
            pTag="p<0.001"
          />
          <SegmentBreakdownRow
            segment="nz"
            liftPct={-2.1}
            sampleSize={2080}
            maxAbsLift={20}
            pTag="n.s."
          />
        </div>
      </section>
    </main>
  )
}
