import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StatCounterRow, type StatCounterEntry } from "../../components/marketing/stat-counter-row"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Stat counter row | Marketing Blocks",
  description:
    "Primitive 08 — row of four big stat counters with count-up animation on view.",
}

const STATS: ReadonlyArray<StatCounterEntry> = [
  {
    id: "years",
    value: 58,
    label: "Years on Central Ave",
    body: "Welding catbacks since 1968 — same shed, same pit.",
    tone: "red",
  },
  {
    id: "rigs",
    value: 14200,
    label: "Utes & rigs fitted",
    body: "Logged in the workshop book across five Mufflermen generations.",
    tone: "amber",
    suffix: "+",
  },
  {
    id: "suburbs",
    value: 12,
    label: "Illawarra suburbs",
    body: "Mobile-bay coverage Wollongong to Gerroa.",
    tone: "teal",
  },
  {
    id: "warranty",
    value: 100,
    label: "Lifetime weld",
    body: "Every joint we lay carries a lifetime crack guarantee.",
    tone: "green",
    suffix: "%",
  },
]

export default function StatCounterRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Stat counter row"
        title="Stat counter row"
        description="Four large stat counters in a contained row. CountUpWatcher gates the animation until the row enters the viewport."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Stat counter row" },
        ]}
      />

      <StatCounterRow
        kicker="Mufflermen, by the numbers"
        heading="58 years. 14,200 utes. One pit on Central Ave."
        body="The South Coast workshop, weighed and measured. Scroll once and watch the counters tick up."
        entries={STATS}
      />
    </main>
  )
}
