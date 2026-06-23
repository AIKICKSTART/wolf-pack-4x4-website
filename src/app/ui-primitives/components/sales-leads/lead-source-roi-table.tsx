"use client"

import { DataTable } from "../data-display/data-table"
import type { DataTableColumn } from "../data-display/data-table"
import { LEAD_SOURCE_LABEL, type LeadSource } from "./sales-leads-types"

import styles from "./lead-source-roi-table.module.css"

export interface SourceRoiRow {
  source: LeadSource
  /** AUD spend for the period. */
  spend: number
  leads: number
  /** Cost per lead — derived but accepted for display fidelity. */
  costPerLead: number
  /** Quote-conversion as a percent 0-100. */
  quoteConversion: number
  closedWon: number
  /** AUD revenue won attributed to the source. */
  revenue: number
}

interface LeadSourceRoiTableProps {
  rows: ReadonlyArray<SourceRoiRow>
  caption?: string
  currency?: string
  className?: string
}

function formatCurrency(amount: number, currency: string): string {
  return `${currency}${amount.toLocaleString("en-AU", {
    maximumFractionDigits: 0,
  })}`
}

function tonePerLead(cost: number): "green" | "amber" | "red" {
  if (cost <= 40) return "green"
  if (cost <= 90) return "amber"
  return "red"
}

function toneConversion(pct: number): "green" | "amber" | "red" {
  if (pct >= 40) return "green"
  if (pct >= 22) return "amber"
  return "red"
}

export function LeadSourceRoiTable({
  rows,
  caption = "Lead source ROI (last 30 days)",
  currency = "$",
  className,
}: LeadSourceRoiTableProps) {
  const columns: ReadonlyArray<DataTableColumn<SourceRoiRow>> = [
    {
      id: "source",
      header: "Source",
      cell: (row) => (
        <span className={styles.sourceCell} data-source={row.source}>
          {LEAD_SOURCE_LABEL[row.source]}
        </span>
      ),
    },
    {
      id: "spend",
      header: "Spend (AUD)",
      align: "right",
      sortable: true,
      cell: (row) => (
        <span className={styles.numCell}>{formatCurrency(row.spend, currency)}</span>
      ),
    },
    {
      id: "leads",
      header: "Leads",
      align: "right",
      sortable: true,
      cell: (row) => <span className={styles.numCell}>{row.leads}</span>,
    },
    {
      id: "cpl",
      header: "Cost/lead",
      align: "right",
      sortable: true,
      cell: (row) => (
        <span className={styles.numCell} data-tone={tonePerLead(row.costPerLead)}>
          {formatCurrency(row.costPerLead, currency)}
        </span>
      ),
    },
    {
      id: "quote",
      header: "→ Quote",
      align: "right",
      sortable: true,
      cell: (row) => (
        <span className={styles.numCell} data-tone={toneConversion(row.quoteConversion)}>
          {Math.round(row.quoteConversion)}%
        </span>
      ),
    },
    {
      id: "won",
      header: "Closed-won",
      align: "right",
      sortable: true,
      cell: (row) => <span className={styles.numCell}>{row.closedWon}</span>,
    },
    {
      id: "revenue",
      header: "Revenue",
      align: "right",
      sortable: true,
      cell: (row) => (
        <span className={styles.revenueCell}>
          {formatCurrency(row.revenue, currency)}
        </span>
      ),
    },
  ]

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <DataTable<SourceRoiRow>
        rows={[...rows]}
        columns={columns}
        getRowId={(row) => row.source}
        density="comfortable"
        zebra
        kicker="ROI"
        caption={caption}
      />
    </div>
  )
}

export default LeadSourceRoiTable
