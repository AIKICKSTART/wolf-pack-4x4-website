"use client"

import { Chip, type ChipTone } from "../primitives/chip"
import { DataTable, type DataTableColumn } from "../data-display/data-table"
import { PriceTag } from "../commerce/price-tag"

import { PAYOUT_LABEL, type PayoutMethod } from "./loyalty-types"
import styles from "./affiliate-payout-history.module.css"

export type PayoutStatus = "paid" | "processing" | "failed" | "scheduled"

export interface AffiliatePayoutRow {
  /** Unique id of the payout row. */
  id: string
  /** ISO date for the payout. */
  dateISO: string
  /** Amount in AUD. */
  amountAud: number
  /** Method used for payout. */
  method: PayoutMethod
  /** Status of the payout. */
  status: PayoutStatus
  /** Optional reference number. */
  reference?: string
}

interface AffiliatePayoutHistoryProps {
  rows: ReadonlyArray<AffiliatePayoutRow>
  caption?: string
  period?: string
  className?: string
}

const STATUS_TONE: Record<PayoutStatus, ChipTone> = {
  paid: "green",
  processing: "amber",
  failed: "red",
  scheduled: "teal",
}

const STATUS_LABEL: Record<PayoutStatus, string> = {
  paid: "Paid",
  processing: "Processing",
  failed: "Failed",
  scheduled: "Scheduled",
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "2-digit" }).format(date)
}

export function AffiliatePayoutHistory({
  rows,
  caption = "Affiliate payout history",
  period,
  className,
}: AffiliatePayoutHistoryProps) {
  const columns: ReadonlyArray<DataTableColumn<AffiliatePayoutRow>> = [
    {
      id: "date",
      header: "Date",
      width: "104px",
      sortable: true,
      cell: (row) => (
        <time className={styles.date} dateTime={row.dateISO}>
          {formatDate(row.dateISO)}
        </time>
      ),
    },
    {
      id: "amount",
      header: "Amount",
      sortable: true,
      cell: (row) => <PriceTag amount={row.amountAud} currency="AUD" size="sm" />,
    },
    {
      id: "method",
      header: "Method",
      cell: (row) => (
        <span className={styles.method}>
          <strong>{PAYOUT_LABEL[row.method]}</strong>
          {row.reference ? <span className={styles.reference}>{row.reference}</span> : null}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      align: "right",
      cell: (row) => <Chip label={STATUS_LABEL[row.status]} tone={STATUS_TONE[row.status]} />,
    },
  ]

  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <section className={classes} role="region" aria-label={caption}>
      <DataTable
        rows={rows.slice()}
        columns={columns}
        getRowId={(row) => row.id}
        density="comfortable"
        zebra
        kicker={period}
        caption={caption}
      />
    </section>
  )
}

export default AffiliatePayoutHistory
