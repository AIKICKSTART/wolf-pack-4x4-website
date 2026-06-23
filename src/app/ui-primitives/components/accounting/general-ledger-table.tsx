"use client"

import { Chip } from "../primitives/chip"
import { DataTable, type DataTableColumn } from "../data-display/data-table"

import {
  formatAud,
  formatLedgerDate,
  type LedgerLine,
} from "./accounting-types"
import styles from "./general-ledger-table.module.css"

interface GeneralLedgerTableProps {
  /** Account name shown above the table (e.g. "Cash at bank — Bendigo"). */
  accountName: string
  /** Account code (e.g. "1000"). */
  accountCode: string
  /** Opening balance for the period. */
  openingBalance: number
  /** Closing balance for the period. */
  closingBalance: number
  /** Period label, e.g. "Apr 2026". */
  periodLabel: string
  /** Ordered ledger lines. */
  lines: ReadonlyArray<LedgerLine>
  className?: string
}

const COLUMNS: ReadonlyArray<DataTableColumn<LedgerLine>> = [
  {
    id: "date",
    header: "Date",
    width: "110px",
    cell: (row) => (
      <span className={styles.cellMono}>{formatLedgerDate(row.dateISO)}</span>
    ),
  },
  {
    id: "ref",
    header: "Reference",
    width: "120px",
    cell: (row) => <span className={styles.ref}>{row.entryNumber}</span>,
  },
  {
    id: "description",
    header: "Description",
    cell: (row) => (
      <span>
        <span className={styles.cellTitle}>{row.description}</span>
        <span className={styles.cellMeta}>
          {row.account.code} · {row.account.name}
        </span>
      </span>
    ),
  },
  {
    id: "debit",
    header: "Debit",
    align: "right",
    cell: (row) => (
      <span className={styles.amount}>
        {row.debit > 0 ? formatAud(row.debit) : "—"}
      </span>
    ),
  },
  {
    id: "credit",
    header: "Credit",
    align: "right",
    cell: (row) => (
      <span className={styles.amount}>
        {row.credit > 0 ? formatAud(row.credit) : "—"}
      </span>
    ),
  },
  {
    id: "balance",
    header: "Running balance",
    align: "right",
    cell: (row) => (
      <span
        className={`${styles.balance} ${row.runningBalance < 0 ? styles.negative : ""}`}
      >
        {formatAud(row.runningBalance)}
      </span>
    ),
  },
]

export function GeneralLedgerTable({
  accountName,
  accountCode,
  openingBalance,
  closingBalance,
  periodLabel,
  lines,
  className,
}: GeneralLedgerTableProps) {
  const delta = closingBalance - openingBalance
  const direction = delta >= 0 ? "up" : "down"

  return (
    <section
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      aria-label={`General ledger for ${accountName}`}
    >
      <header className={styles.head}>
        <div className={styles.headTitle}>
          <span className={styles.code}>{accountCode}</span>
          <h3 className={styles.name}>{accountName}</h3>
          <Chip label={periodLabel} tone="teal" />
        </div>
        <dl className={styles.summary}>
          <div className={styles.summaryItem}>
            <dt>Opening</dt>
            <dd>{formatAud(openingBalance)}</dd>
          </div>
          <div className={styles.summaryItem}>
            <dt>Closing</dt>
            <dd>{formatAud(closingBalance)}</dd>
          </div>
          <div className={`${styles.summaryItem} ${styles[`delta_${direction}`]}`}>
            <dt>Δ Period</dt>
            <dd>
              {delta >= 0 ? "+" : ""}
              {formatAud(delta)}
            </dd>
          </div>
        </dl>
      </header>

      <DataTable
        rows={[...lines]}
        columns={COLUMNS}
        getRowId={(row) => row.id}
        density="compact"
        zebra
        kicker={`${lines.length} movements`}
        caption={`General ledger — ${accountName}`}
      />
    </section>
  )
}

export default GeneralLedgerTable
