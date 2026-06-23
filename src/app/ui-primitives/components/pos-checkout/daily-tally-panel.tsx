"use client"

import type { ChangeEvent } from "react"

import type { DenominationCount } from "./pos-checkout-types"
import styles from "./daily-tally-panel.module.css"

export type TallyMode = "open" | "close"

interface DailyTallyPanelProps {
  /** Whether the operator is opening or closing the drawer. */
  mode: TallyMode
  /** Drawer label, e.g. "Bay 1 drawer". */
  drawerLabel?: string
  /** Operator counting. */
  operator: string
  /** Denominations the operator is counting. */
  denominations: ReadonlyArray<DenominationCount>
  /** Amount system says is in the drawer. */
  systemAmount: number
  /** Fires when a denomination count changes. */
  onCountChange?: (denomination: number, count: number) => void
  /** Fires when the mode toggles. */
  onModeChange?: (mode: TallyMode) => void
  /** Fires when the operator confirms. */
  onCommit?: () => void
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDenomLabel(value: number): string {
  if (value < 5) {
    return `${(value * 100).toFixed(0)}¢`
  }
  return `$${value.toFixed(0)}`
}

export function DailyTallyPanel({
  mode,
  drawerLabel = "Bay 1 drawer",
  operator,
  denominations,
  systemAmount,
  onCountChange,
  onModeChange,
  onCommit,
}: DailyTallyPanelProps) {
  const declared = denominations.reduce(
    (acc, entry) => acc + entry.denomination * entry.count,
    0,
  )
  const delta = declared - systemAmount

  const deltaClass =
    Math.abs(delta) < 0.005
      ? styles.deltaGood
      : delta < 0
      ? styles.deltaShort
      : styles.deltaOver

  const deltaLabel =
    Math.abs(delta) < 0.005
      ? "Reconciled"
      : delta < 0
      ? `Short ${formatAud(Math.abs(delta))}`
      : `Over ${formatAud(delta)}`

  const handleCount = (denom: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value.replace(/[^0-9]/g, "")
    const next = raw === "" ? 0 : Number.parseInt(raw, 10)
    onCountChange?.(denom, Number.isFinite(next) ? next : 0)
  }

  return (
    <section className={styles.panel} aria-label={`${drawerLabel} ${mode}`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Cash drawer</span>
          <h2 className={styles.title}>{drawerLabel}</h2>
        </div>
        <span className={styles.meta}>Counter · {operator}</span>
      </header>

      <div className={styles.modeSwitch} role="tablist" aria-label="Drawer mode">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "open"}
          className={`${styles.modeBtn}${mode === "open" ? ` ${styles.modeBtnActive}` : ""}`}
          onClick={() => onModeChange?.("open")}
        >
          Opening float
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "close"}
          className={`${styles.modeBtn}${mode === "close" ? ` ${styles.modeBtnActive}` : ""}`}
          onClick={() => onModeChange?.("close")}
        >
          End of day
        </button>
      </div>

      <div className={styles.grid}>
        {denominations.map((entry) => (
          <label key={entry.denomination} className={styles.denom}>
            <span className={styles.denomLabel}>{formatDenomLabel(entry.denomination)}</span>
            <input
              className={styles.denomInput}
              type="text"
              inputMode="numeric"
              value={entry.count.toString()}
              onChange={handleCount(entry.denomination)}
              aria-label={`${formatDenomLabel(entry.denomination)} count`}
            />
          </label>
        ))}
      </div>

      <div className={styles.totals}>
        <div className={styles.totalsRow}>
          <span>Declared</span>
          <span>{formatAud(declared)}</span>
        </div>
        <div className={styles.totalsRow}>
          <span>System</span>
          <span>{formatAud(systemAmount)}</span>
        </div>
        <div className={`${styles.totalsRow} ${styles.totalsRowGrand}`}>
          <span>Variance</span>
          <span className={`${styles.delta} ${deltaClass}`}>{deltaLabel}</span>
        </div>
      </div>

      <button type="button" className={styles.cta} onClick={() => onCommit?.()}>
        {mode === "open" ? "Open drawer" : "Close drawer"}
      </button>
    </section>
  )
}

export default DailyTallyPanel
