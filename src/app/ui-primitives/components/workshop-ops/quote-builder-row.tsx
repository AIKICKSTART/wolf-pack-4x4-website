import { Chip } from "../primitives/chip"
import {
  QUOTE_KIND_LABEL,
  QUOTE_KIND_TONE,
  type QuoteRow,
  formatAud,
  opsToneToChip,
} from "./workshop-ops-types"

import styles from "./quote-builder-row.module.css"

interface QuoteBuilderRowProps {
  rows: ReadonlyArray<QuoteRow>
  /** GST percentage applied to the subtotal. Default 10 (AU). */
  gstPercent?: number
  /** Optional invoice number for header. */
  invoiceNumber?: string
  /** Optional customer label for header. */
  customerLabel?: string
  className?: string
}

function computeLineTotalExGst(row: QuoteRow): number {
  if (row.kind === "labour" && row.hours && row.ratePerHourAud) {
    return row.hours * row.ratePerHourAud
  }
  const base = row.unitAud * row.quantity
  if (row.kind === "part" && row.markupPct) {
    return base * (1 + row.markupPct / 100)
  }
  return base
}

export function QuoteBuilderRow({
  rows,
  gstPercent = 10,
  invoiceNumber,
  customerLabel,
  className,
}: QuoteBuilderRowProps) {
  const classes = [styles.quote, className].filter(Boolean).join(" ")

  let subtotalExGst = 0
  for (const row of rows) {
    subtotalExGst += computeLineTotalExGst(row)
  }
  const gst = subtotalExGst * (gstPercent / 100)
  const grandTotal = subtotalExGst + gst

  return (
    <section className={classes} aria-label="Quote line items">
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Quote builder</span>
          {customerLabel ? (
            <h3 className={styles.title}>{customerLabel}</h3>
          ) : null}
          {invoiceNumber ? (
            <span className={styles.invoice}>{invoiceNumber}</span>
          ) : null}
        </div>
        <span className={styles.gstNote}>GST {gstPercent}%</span>
      </header>

      <div className={styles.table} role="table" aria-label="Quote rows">
        <div className={styles.tableHead} role="row">
          <span role="columnheader">Item</span>
          <span role="columnheader" className={styles.colCenter}>
            Qty / Hrs
          </span>
          <span role="columnheader" className={styles.colRight}>
            Unit
          </span>
          <span role="columnheader" className={styles.colRight}>
            Markup / Rate
          </span>
          <span role="columnheader" className={styles.colRight}>
            Line ex. GST
          </span>
        </div>
        {rows.map((row) => {
          const lineExGst = computeLineTotalExGst(row)
          const qtyOrHours =
            row.kind === "labour"
              ? `${row.hours?.toFixed(1) ?? row.quantity.toFixed(1)}h`
              : `×${row.quantity}`
          const markupOrRate =
            row.kind === "labour"
              ? row.ratePerHourAud
                ? `${formatAud(row.ratePerHourAud, 0)}/h`
                : "—"
              : row.markupPct
                ? `+${row.markupPct.toFixed(0)}%`
                : "—"
          return (
            <div key={row.id} className={styles.row} role="row">
              <div className={styles.itemCell} role="cell">
                <Chip
                  label={QUOTE_KIND_LABEL[row.kind]}
                  tone={opsToneToChip(QUOTE_KIND_TONE[row.kind])}
                />
                <div className={styles.itemMeta}>
                  <span className={styles.itemLabel}>{row.label}</span>
                  {row.notes ? (
                    <span className={styles.itemNotes}>{row.notes}</span>
                  ) : null}
                </div>
              </div>
              <span
                className={[styles.cell, styles.colCenter].join(" ")}
                role="cell"
              >
                {qtyOrHours}
              </span>
              <span
                className={[styles.cell, styles.colRight].join(" ")}
                role="cell"
              >
                {formatAud(row.unitAud)}
              </span>
              <span
                className={[styles.cell, styles.colRight].join(" ")}
                role="cell"
              >
                {markupOrRate}
              </span>
              <span
                className={[styles.cell, styles.colRight, styles.lineTotal].join(" ")}
                role="cell"
              >
                {formatAud(lineExGst)}
              </span>
            </div>
          )
        })}
      </div>

      <footer className={styles.foot}>
        <dl className={styles.totals}>
          <div className={styles.totalRow}>
            <dt>Subtotal ex. GST</dt>
            <dd>{formatAud(subtotalExGst)}</dd>
          </div>
          <div className={styles.totalRow}>
            <dt>GST ({gstPercent}%)</dt>
            <dd>{formatAud(gst)}</dd>
          </div>
          <div className={[styles.totalRow, styles.grand].join(" ")}>
            <dt>Grand total inc. GST</dt>
            <dd>{formatAud(grandTotal)}</dd>
          </div>
        </dl>
      </footer>
    </section>
  )
}

export default QuoteBuilderRow
