"use client"

import type { ChangeEvent } from "react"

import type { AbnDetails } from "./pos-checkout-types"
import styles from "./tax-summary-tile.module.css"

interface TaxSummaryTileProps {
  /** GST-inclusive subtotal in AUD. */
  totalIncGst: number
  /** Default GST rate (0.10 in AU). */
  gstRate?: number
  /** ABN form state. */
  abn: AbnDetails
  /** Fires when ABN form fields change. */
  onAbnChange?: (next: AbnDetails) => void
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function isValidAbn(raw: string): boolean {
  const digits = raw.replace(/\s/g, "")
  return digits.length === 11 && /^\d+$/.test(digits)
}

function formatAbnDisplay(raw: string): string {
  const digits = raw.replace(/\s/g, "")
  if (digits.length !== 11) return raw
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`
}

export function TaxSummaryTile({
  totalIncGst,
  gstRate = 0.1,
  abn,
  onAbnChange,
}: TaxSummaryTileProps) {
  const exGst = totalIncGst / (1 + gstRate)
  const gst = totalIncGst - exGst
  const validAbn = isValidAbn(abn.abn)

  const handleAbn = (event: ChangeEvent<HTMLInputElement>) => {
    onAbnChange?.({ ...abn, abn: event.target.value })
  }

  const handleTradingName = (event: ChangeEvent<HTMLInputElement>) => {
    onAbnChange?.({ ...abn, tradingName: event.target.value })
  }

  return (
    <section className={styles.tile} aria-label="GST tax summary">
      <header className={styles.head}>
        <span className={styles.kicker}>Tax · AU GST</span>
        <h2 className={styles.title}>Tax summary</h2>
      </header>

      <div className={styles.grid}>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>Ex GST</span>
          <span className={styles.cellValue}>{formatAud(exGst)}</span>
          <span className={styles.cellMeta}>{Math.round((1 - gstRate / (1 + gstRate)) * 1000) / 10}% of inc</span>
        </div>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>GST {Math.round(gstRate * 100)}%</span>
          <span className={styles.cellValue}>{formatAud(gst)}</span>
          <span className={styles.cellMeta}>Item GST collected</span>
        </div>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>Inc GST</span>
          <span className={styles.cellValue}>{formatAud(totalIncGst)}</span>
          <span className={styles.cellMeta}>Customer-facing total</span>
        </div>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>BAS bucket</span>
          <span className={styles.cellValue}>1A</span>
          <span className={styles.cellMeta}>Sales · GST on sales</span>
        </div>
      </div>

      <form className={styles.abnForm} onSubmit={(event) => event.preventDefault()}>
        <header className={styles.abnHead}>
          <h3 className={styles.abnTitle}>Tax invoice ABN</h3>
          <span className={styles.cellMeta}>Optional · trade only</span>
        </header>
        <div className={styles.abnRow}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>ABN</span>
            <input
              className={styles.input}
              type="text"
              inputMode="numeric"
              placeholder="12 345 678 901"
              value={abn.abn}
              onChange={handleAbn}
              aria-invalid={abn.abn.length > 0 && !validAbn}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Trading name</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Oak Flats Mufflermen Pty Ltd"
              value={abn.tradingName}
              onChange={handleTradingName}
            />
          </label>
        </div>
        {abn.abn.length > 0 && (
          <div className={styles.preview}>
            <span>Preview</span>
            <strong>ABN {formatAbnDisplay(abn.abn)}</strong>
            <span className={validAbn ? "" : styles.warn}>
              {validAbn ? "Valid format" : "Need 11 digits"}
            </span>
          </div>
        )}
      </form>
    </section>
  )
}

export default TaxSummaryTile
