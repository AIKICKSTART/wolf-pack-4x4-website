import type { Metadata } from "next"

import { SegmentChip } from "../../components/crm"
import { PageHeader } from "../../components/page-header"
import { SegmentChipFilterDemo } from "./segment-chip-filter-demo"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Segment chip | CRM",
  description:
    "Primitive 11 — customer segment chip — Fleet, Performance, DIY, Trade, Retail — with tone and tiny glyph. Optionally togglable.",
}

export default function SegmentChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Segment chip"
        title="Segment chip"
        description="Tone-coded segment chip with a tiny glyph. Used statically on profiles, or as a toggle group in filter rails."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Segment chip" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Static — one per segment</span>
        <div className={styles.demoInline}>
          <SegmentChip segment="fleet" />
          <SegmentChip segment="performance" />
          <SegmentChip segment="diy" />
          <SegmentChip segment="trade" />
          <SegmentChip segment="retail" />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Filter group — toggles selected</span>
        <SegmentChipFilterDemo />
      </section>
    </main>
  )
}
