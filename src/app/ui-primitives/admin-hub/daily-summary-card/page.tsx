import type { Metadata } from "next"

import { DailySummaryCard } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { DAILY_SUMMARY } from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Daily summary card | Admin hub",
  description:
    "Primitive 14 — yesterday's recap card with highlights + watch-outs and the today outlook line. Three states — busy day, clean day no warnings, all-warnings rough day.",
}

const CLEAN_DAY = {
  ...DAILY_SUMMARY,
  dateLabel: "Wednesday 27 May",
  warnings: [],
  outlook: "Calm Friday ahead. Two scheduled installs in Bay 2 + Bay 4.",
}

const ROUGH_DAY = {
  ...DAILY_SUMMARY,
  dateLabel: "Tuesday 26 May",
  highlights: DAILY_SUMMARY.highlights.slice(0, 1),
  warnings: [
    ...DAILY_SUMMARY.warnings,
    {
      id: "w-3",
      label: "Tyro reconciliation gap",
      value: "$420",
      detail: "Bay 1 batch close mismatch — Daniel to investigate AM.",
      tone: "red" as const,
    },
    {
      id: "w-4",
      label: "Manta delivery missed",
      value: "1",
      unit: "shipment",
      detail: "ETA pushed to Thu 14:00.",
      tone: "amber" as const,
    },
  ],
  outlook:
    "Tyro reconciliation needs morning attention. Manta delivery confirmed Thu — buffer Bay 3 dyno window.",
}

export default function DailySummaryCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Daily summary card"
        title="Yesterday recap card"
        description="Hermes-drafted yesterday recap — highlights column, watch-outs column, plus a today outlook. Three states — typical Thursday recap with one incident, a clean Wednesday, and a rough Tuesday with two warnings."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Daily summary card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · busy day with one watch-out</span>
            <DailySummaryCard summary={DAILY_SUMMARY} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · clean day · no warnings</span>
            <DailySummaryCard summary={CLEAN_DAY} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · rough day · multiple warnings</span>
            <DailySummaryCard summary={ROUGH_DAY} />
          </div>
        </div>
      </section>
    </main>
  )
}
