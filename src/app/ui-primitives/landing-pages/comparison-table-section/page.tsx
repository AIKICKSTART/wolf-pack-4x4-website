import type { Metadata } from "next"

import { ComparisonTableSection } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import { COMPARISON_AXES, COMPARISON_ROWS } from "../_mock-data"
import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Comparison table section | Landing Pages",
  description: "Primitive 07 — vs-competitor comparison matrix with highlighted self column.",
}

const COMPACT_ROWS = COMPARISON_ROWS.slice(0, 3)
const SHORT_AXES = COMPARISON_AXES.slice(0, 2)
const SHORT_ROWS = COMPARISON_ROWS.map((row) => ({
  ...row,
  values: row.values.slice(0, 2),
}))

export default function ComparisonTableSectionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Comparison"
        title="Comparison table section"
        description="Vs-competitor matrix. Three states: full 6-row × 3-axis comparison, compact 3-row, and a focused 2-axis duel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Comparison table section" },
        ]}
      />

      <span className={styles.stageCaption}>State · Full comparison</span>
      <ComparisonTableSection
        kicker="Compare options"
        heading="Mufflermen vs the chains vs mobile-only fitters"
        body="What you get with a Mufflermen install versus the alternatives on the South Coast."
        axes={COMPARISON_AXES}
        rows={COMPARISON_ROWS}
        selfAxisId="mufflermen"
      />

      <span className={styles.stageCaption}>State · Compact 3-row</span>
      <ComparisonTableSection
        heading="Top-three differentiators"
        axes={COMPARISON_AXES}
        rows={COMPACT_ROWS}
        selfAxisId="mufflermen"
      />

      <span className={styles.stageCaption}>State · Focused 2-axis duel</span>
      <ComparisonTableSection
        kicker="Head-to-head"
        heading="Mufflermen vs national chain franchise"
        axes={SHORT_AXES}
        rows={SHORT_ROWS}
        selfAxisId="mufflermen"
      />
    </main>
  )
}
