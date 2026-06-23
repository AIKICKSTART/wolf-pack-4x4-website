"use client"

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

import { Sparkline } from "../charts/sparkline"
import { DataTable } from "../data-display/data-table"
import type { DataTableColumn } from "../data-display/data-table"
import styles from "./search-analytics-card.module.css"

export interface SearchAnalyticsRow {
  id: string
  query: string
  searches: number
  clickThroughRate: number
  trend: "up" | "down" | "flat"
}

interface SearchAnalyticsCardProps {
  kicker?: string
  title: string
  range: string
  totalSearches: number
  zeroResultRate: number
  trendPoints: ReadonlyArray<number>
  rows: ReadonlyArray<SearchAnalyticsRow>
  className?: string
}

const TREND_ICON = {
  up: <ArrowUpRight size={12} strokeWidth={2.4} aria-hidden="true" />,
  down: <ArrowDownRight size={12} strokeWidth={2.4} aria-hidden="true" />,
  flat: <Minus size={12} strokeWidth={2.4} aria-hidden="true" />,
} as const

export function SearchAnalyticsCard({
  kicker = "Search analytics",
  title,
  range,
  totalSearches,
  zeroResultRate,
  trendPoints,
  rows,
  className,
}: SearchAnalyticsCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const columns: ReadonlyArray<DataTableColumn<SearchAnalyticsRow>> = [
    {
      id: "query",
      header: "Query",
      cell: (row) => <span className={styles.queryCell}>{row.query}</span>,
      sortable: true,
    },
    {
      id: "searches",
      header: "Searches",
      align: "right",
      sortable: true,
      cell: (row) => (
        <span className={styles.numCell}>{row.searches.toLocaleString()}</span>
      ),
    },
    {
      id: "ctr",
      header: "CTR",
      align: "right",
      sortable: true,
      cell: (row) => (
        <span className={styles.numCell}>{row.clickThroughRate.toFixed(1)}%</span>
      ),
    },
    {
      id: "trend",
      header: "Trend",
      align: "center",
      cell: (row) => (
        <span
          className={styles.trendPill}
          data-tone={row.trend}
          aria-label={`Trend ${row.trend}`}
        >
          {TREND_ICON[row.trend]}
        </span>
      ),
    },
  ]

  return (
    <article className={classes}>
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <div className={styles.headRow}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.range}>{range}</span>
        </div>
        <dl className={styles.statRow}>
          <div>
            <dt>Searches</dt>
            <dd>{totalSearches.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Zero-result rate</dt>
            <dd className={styles.zeroRate}>{zeroResultRate.toFixed(1)}%</dd>
          </div>
          <div className={styles.sparkCell}>
            <dt>Trend · 14 day</dt>
            <dd>
              <Sparkline
                points={trendPoints.slice()}
                tone="teal"
                width={140}
                height={32}
                ariaLabel="Search volume 14-day trend"
              />
            </dd>
          </div>
        </dl>
      </header>
      <div className={styles.tableShell}>
        <DataTable<SearchAnalyticsRow>
          rows={rows.slice()}
          columns={columns}
          getRowId={(row) => row.id}
          density="compact"
          kicker="Top queries"
          caption="Top performing search queries"
        />
      </div>
    </article>
  )
}

export default SearchAnalyticsCard
