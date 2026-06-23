import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SearchAnalyticsCard } from "../../components/search"
import type { SearchAnalyticsRow } from "../../components/search"
import styles from "../search.module.css"

export const metadata: Metadata = {
  title: "Search analytics | UI Primitives — Search",
}

const ROWS: ReadonlyArray<SearchAnalyticsRow> = [
  { id: "q1", query: "ba falcon catback", searches: 1284, clickThroughRate: 68.4, trend: "up" },
  { id: "q2", query: "magnaflow muffler", searches: 962, clickThroughRate: 52.1, trend: "up" },
  { id: "q3", query: "ve commodore exhaust", searches: 884, clickThroughRate: 47.6, trend: "flat" },
  { id: "q4", query: "redback headers", searches: 712, clickThroughRate: 39.2, trend: "down" },
  { id: "q5", query: "3 inch midpipe", searches: 656, clickThroughRate: 41.8, trend: "up" },
  { id: "q6", query: "adr exhaust tip", searches: 542, clickThroughRate: 28.4, trend: "flat" },
  { id: "q7", query: "dpf delete kit", searches: 488, clickThroughRate: 12.6, trend: "down" },
]

const TREND_POINTS: ReadonlyArray<number> = [
  220, 232, 248, 264, 251, 278, 290, 305, 298, 312, 326, 342, 358, 374,
]

export default function AnalyticsPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 14"
        title="Search analytics card"
        description="Admin-side analytics card composing the existing DataTable primitive with a Sparkline 14-day trend. Surfaces top queries, click-through rates, the zero-result rate, and a search-volume trend at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Analytics card" },
        ]}
      />
      <section className={styles.canvas} aria-label="Search analytics card demo">
        <div className={styles.note}>
          <span>Composition</span>
          <p>
            This card composes existing primitives — the Sparkline from{" "}
            <code>components/charts</code> for the trend, and the DataTable from{" "}
            <code>components/data-display</code> for the top queries. Sortable columns and search
            volume are wired to the table&apos;s built-in sort affordance.
          </p>
        </div>
        <div className={styles.stage}>
          <SearchAnalyticsCard
            title="Top queries · last 14 days"
            range="May 14 — May 27"
            totalSearches={12842}
            zeroResultRate={4.6}
            trendPoints={TREND_POINTS}
            rows={ROWS}
          />
        </div>
      </section>
    </main>
  )
}
