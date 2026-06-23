import { Chip } from "../primitives/chip"

import {
  formatAud,
  formatAudCompact,
  type AgeingBucket,
} from "./accounting-types"
import styles from "./aged-payables-grid.module.css"

export interface AgedSupplierRow {
  id: string
  name: string
  /** Optional subtitle, e.g. supplier ABN. */
  subtitle?: string
  current: number
  thirty: number
  sixty: number
  ninetyPlus: number
}

export interface AgedPayablesGridProps {
  asOfLabel: string
  rows: ReadonlyArray<AgedSupplierRow>
  className?: string
}

const BUCKET_HEAD: ReadonlyArray<{ id: AgeingBucket; label: string }> = [
  { id: "current", label: "Not due" },
  { id: "thirty", label: "1–30 days" },
  { id: "sixty", label: "31–60 days" },
  { id: "ninetyPlus", label: "60+ days" },
]

function rowTotal(row: AgedSupplierRow): number {
  return row.current + row.thirty + row.sixty + row.ninetyPlus
}

function bucketTotal(rows: ReadonlyArray<AgedSupplierRow>, bucket: AgeingBucket): number {
  return rows.reduce((sum, row) => sum + row[bucket], 0)
}

export function AgedPayablesGrid({
  asOfLabel,
  rows,
  className,
}: AgedPayablesGridProps) {
  const totals = {
    current: bucketTotal(rows, "current"),
    thirty: bucketTotal(rows, "thirty"),
    sixty: bucketTotal(rows, "sixty"),
    ninetyPlus: bucketTotal(rows, "ninetyPlus"),
  }
  const grandTotal =
    totals.current + totals.thirty + totals.sixty + totals.ninetyPlus

  return (
    <section
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Aged payables as of ${asOfLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Payables ageing</span>
          <h3 className={styles.title}>Aged creditors</h3>
          <Chip label={`As of ${asOfLabel}`} tone="amber" />
        </div>
        <div className={styles.headRight}>
          <span className={styles.headRightLabel}>Owing</span>
          <span className={styles.headRightValue}>{formatAudCompact(grandTotal)}</span>
        </div>
      </header>

      <div className={styles.scroller}>
        <table className={styles.table}>
          <caption className={styles.sr}>Aged payables</caption>
          <thead>
            <tr>
              <th scope="col" className={styles.supplierCol}>Supplier</th>
              {BUCKET_HEAD.map((b, idx) => (
                <th
                  key={b.id}
                  scope="col"
                  className={styles.amountCol}
                  data-bucket-index={idx}
                >
                  {b.label}
                </th>
              ))}
              <th scope="col" className={styles.amountCol}>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const total = rowTotal(row)
              const overdue = row.sixty + row.ninetyPlus > 0
              return (
                <tr
                  key={row.id}
                  className={styles.row}
                  {...(row.ninetyPlus > 0 ? { role: "alert" } : {})}
                >
                  <th scope="row" className={styles.supplier}>
                    <span className={styles.supplierName}>{row.name}</span>
                    {row.subtitle ? (
                      <span className={styles.supplierSub}>{row.subtitle}</span>
                    ) : null}
                  </th>
                  <td className={styles.amount}>{formatAud(row.current)}</td>
                  <td className={`${styles.amount} ${row.thirty > 0 ? styles.amountAmber : ""}`}>
                    {formatAud(row.thirty)}
                  </td>
                  <td className={`${styles.amount} ${row.sixty > 0 ? styles.amountAmber : ""}`}>
                    {formatAud(row.sixty)}
                  </td>
                  <td className={`${styles.amount} ${row.ninetyPlus > 0 ? styles.amountRed : ""}`}>
                    {formatAud(row.ninetyPlus)}
                  </td>
                  <td className={`${styles.totalCell} ${overdue ? styles.totalAlert : ""}`}>
                    {formatAud(total)}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className={styles.footLabel}>Totals</th>
              <td className={styles.footTotal}>{formatAud(totals.current)}</td>
              <td className={styles.footTotal}>{formatAud(totals.thirty)}</td>
              <td className={styles.footTotal}>{formatAud(totals.sixty)}</td>
              <td className={styles.footTotal}>{formatAud(totals.ninetyPlus)}</td>
              <td className={styles.footGrand}>{formatAud(grandTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export default AgedPayablesGrid
