"use client"

import { Chip } from "../primitives/chip"
import { Sparkline } from "../charts/sparkline"
import { DataTable, type DataTableColumn } from "../data-display/data-table"

import {
  formatAud,
  formatAudCompact,
  type ChargebackRow,
} from "./cloud-costs-types"
import styles from "./chargeback-report.module.css"

export interface ChargebackReportProps {
  /** Period label e.g. "May 2026". */
  periodLabel: string
  /** Per-team chargeback rows. */
  rows: ReadonlyArray<ChargebackRow>
  className?: string
}

export function ChargebackReport({
  periodLabel,
  rows,
  className,
}: ChargebackReportProps) {
  const total = rows.reduce((sum, row) => sum + row.spend, 0)

  const columns: ReadonlyArray<DataTableColumn<ChargebackRow>> = [
    {
      id: "team",
      header: "Team",
      cell: (row) => (
        <div className={styles.teamCell}>
          <span className={styles.teamName}>{row.team}</span>
          <span className={styles.teamContact}>{row.contact}</span>
        </div>
      ),
    },
    {
      id: "allocation",
      header: "Allocation",
      cell: (row) => (
        <div className={styles.allocCell}>
          <span className={styles.allocBarOuter} aria-hidden="true">
            <span
              className={styles.allocBarFill}
              style={{ width: `${Math.min(100, row.allocationPct).toFixed(1)}%` }}
            />
          </span>
          <span className={styles.allocPct}>{row.allocationPct.toFixed(1)}%</span>
        </div>
      ),
    },
    {
      id: "trend",
      header: "Trend",
      cell: (row) => (
        <div className={styles.trendCell}>
          <Sparkline
            points={[...row.trend]}
            tone="teal"
            ariaLabel={`Spend trend for ${row.team}`}
          />
        </div>
      ),
    },
    {
      id: "spend",
      header: "Spend",
      align: "right",
      cell: (row) => <span className={styles.spend}>{formatAud(row.spend)}</span>,
    },
  ]

  return (
    <section
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Chargeback report for ${periodLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Chargeback · {periodLabel}</span>
          <h3 className={styles.title}>Per-team chargeback</h3>
        </div>
        <div className={styles.headRight}>
          <Chip label={`${rows.length} teams`} tone="neutral" />
          <span className={styles.totalLabel}>Total invoiced</span>
          <span className={styles.totalValue}>{formatAudCompact(total)}</span>
        </div>
      </header>

      <DataTable
        columns={columns}
        rows={[...rows]}
        getRowId={(row) => row.id}
        density="comfortable"
        caption={`Chargeback report for ${periodLabel}`}
      />
    </section>
  )
}

export default ChargebackReport
