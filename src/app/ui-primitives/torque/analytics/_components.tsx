"use client"

import { useState } from "react"

import { DateRangePresets } from "../../components/reports/date-range-presets"
import { DataTable } from "../../components/data-display/data-table"
import type { DataTableColumn } from "../../components/data-display/data-table"
import { StatusBadge } from "../../components/data-display/status-badge-grid"
import type { StatusBadgeTone } from "../../components/data-display/status-badge-grid"
import { Sparkline } from "../../components/charts/sparkline"
import type { SparklineTone } from "../../components/charts/sparkline"

import styles from "./analytics.module.css"
import {
  BUSINESS_NAME,
  BUSINESS_REGION,
  DATE_RANGES,
  REPORTING_PERIOD,
  type SocialMetric,
  type TopPageRow,
} from "./_demo-data"

const RANGE_NOTE: Record<string, string> = {
  "7d": "Last 7 days — 22–28 May 2026",
  "28d": "This reporting period — 1–28 May 2026",
  qtr: "Autumn quarter — Mar–May FY26",
  ytd: "Year to date — since 1 Jan 2026",
}

/**
 * Analytics header band: placeholder circular Torque avatar (initial "T" on a
 * brand-red gradient — real mascot lands later), business identity, and the
 * live date-range control. The control is interactive client state only; it
 * narrates the chosen window without re-fetching demo fixtures.
 */
export function AnalyticsControlBand() {
  const [rangeId, setRangeId] = useState<string>("28d")
  const note = RANGE_NOTE[rangeId] ?? `Reporting period — ${REPORTING_PERIOD}`

  return (
    <section className={styles.controlBand} aria-label="Reporting period and identity">
      <div className={styles.identity}>
        <span className={styles.torqueAvatar} aria-hidden="true">
          <span>T</span>
        </span>
        <span className={styles.identityText}>
          <span className={styles.torqueName}>Torque · Business analytics</span>
          <span className={styles.bizName}>{BUSINESS_NAME}</span>
          <span className={styles.bizRegion}>{BUSINESS_REGION}</span>
        </span>
      </div>

      <div className={styles.controlGroup}>
        <span className={styles.controlLabel} id="analytics-range-label">
          Reporting period
        </span>
        <DateRangePresets
          presets={DATE_RANGES}
          initialPresetId="28d"
          onSelect={setRangeId}
        />
        <p className={styles.rangeNote} role="status" aria-live="polite">
          {note}
        </p>
      </div>
    </section>
  )
}

const DIRECTION_GLYPH: Record<SocialMetric["direction"], string> = {
  up: "▲",
  down: "▼",
  flat: "—",
}

const DIRECTION_CLASS: Record<SocialMetric["direction"], string> = {
  up: styles.socialUp,
  down: styles.socialDown,
  flat: styles.socialFlat,
}

interface SocialMetricRowsProps {
  metrics: ReadonlyArray<SocialMetric>
}

/** Engagement rows rendered under the social-reach donut. */
export function SocialMetricRows({ metrics }: SocialMetricRowsProps) {
  return (
    <dl className={styles.socialList}>
      {metrics.map((metric) => (
        <div key={metric.id} className={styles.socialRow}>
          <dt className={styles.socialLabel}>{metric.label}</dt>
          <dd className={styles.socialValueRow}>
            <span className={styles.socialValue}>
              {metric.value}
              {metric.unit ? <span className={styles.socialUnit}> {metric.unit}</span> : null}
            </span>
            <span className={`${styles.socialDelta} ${DIRECTION_CLASS[metric.direction]}`}>
              <span aria-hidden="true">{DIRECTION_GLYPH[metric.direction]}</span>
              {metric.delta}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

interface TrendCellProps {
  points: ReadonlyArray<number>
  tone: SparklineTone
  label: string
}

/** Inline sparkline cell for the top-pages table. */
export function TrendCell({ points, tone, label }: TrendCellProps) {
  return (
    <span className={styles.trendCell}>
      <Sparkline
        points={[...points]}
        tone={tone}
        width={96}
        height={28}
        ariaLabel={`${label} traffic trend over the last 7 days`}
      />
    </span>
  )
}

const INTENT_TONE: Record<TopPageRow["intent"], StatusBadgeTone> = {
  Exhaust: "brand",
  Servicing: "info",
  Fabrication: "warn",
  Local: "success",
  Brand: "neutral",
}

const numberFormatter = new Intl.NumberFormat("en-AU")

const TOP_PAGE_COLUMNS: ReadonlyArray<DataTableColumn<TopPageRow>> = [
  {
    id: "page",
    header: "Page",
    cell: (row) => (
      <span className={styles.pageCell}>
        <span className={styles.pageName}>{row.page}</span>
        <span className={styles.pagePath}>{row.path}</span>
      </span>
    ),
  },
  {
    id: "intent",
    header: "Intent",
    cell: (row) => (
      <StatusBadge tone={INTENT_TONE[row.intent]} size="sm" shape="pill" label={row.intent} />
    ),
  },
  {
    id: "views",
    header: "Views",
    align: "right",
    sortable: true,
    cell: (row) => <span className={styles.num}>{numberFormatter.format(row.views)}</span>,
  },
  {
    id: "leads",
    header: "Leads",
    align: "right",
    sortable: true,
    cell: (row) => <span className={styles.num}>{numberFormatter.format(row.leads)}</span>,
  },
  {
    id: "conv",
    header: "Conv.",
    align: "right",
    cell: (row) => <span className={styles.num}>{row.convRate}</span>,
  },
  {
    id: "pos",
    header: "Avg pos.",
    align: "right",
    cell: (row) => <span className={styles.num}>{row.avgPos}</span>,
  },
  {
    id: "trend",
    header: "7d trend",
    align: "right",
    cell: (row) => <TrendCell points={row.trend} tone={row.trendTone} label={row.page} />,
  },
]

interface TopPagesTableProps {
  rows: ReadonlyArray<TopPageRow>
}

export function TopPagesTable({ rows }: TopPagesTableProps) {
  return (
    <DataTable
      rows={[...rows]}
      columns={TOP_PAGE_COLUMNS}
      getRowId={(row) => row.id}
      density="comfortable"
      caption="Top-performing pages on the Oak Flats Muffler Men website"
      kicker="Sorted by views"
      zebra
    />
  )
}
