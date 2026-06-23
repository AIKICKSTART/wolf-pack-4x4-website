"use client"

import { ProgressLinear } from "../primitives/progress-linear"

import type { EftposStatus } from "./pos-checkout-types"
import styles from "./eftpos-terminal-panel.module.css"

export type EftposProvider = "tyro" | "square" | "stripe"

interface EftposTerminalPanelProps {
  /** Terminal provider — drives the kicker label. */
  provider?: EftposProvider
  /** Lane / terminal id. */
  terminalId?: string
  /** Total inc GST in AUD. */
  amount: number
  /** Customer tip / surcharge if any. */
  surcharge?: number
  /** Current status of the terminal. */
  status: EftposStatus
  /** Recent prompt messages (most recent last). */
  messages: ReadonlyArray<string>
  /** Fires when the operator presses retry. */
  onRetry?: () => void
  /** Fires when the operator cancels the in-progress transaction. */
  onCancel?: () => void
}

const PROVIDER_LABEL: Record<EftposProvider, string> = {
  tyro: "Tyro EFTPOS",
  square: "Square Terminal",
  stripe: "Stripe Terminal",
}

const STATUS_LABEL: Record<EftposStatus, string> = {
  idle: "Idle",
  waiting: "Waiting for card",
  approved: "Approved",
  declined: "Declined",
  cancelled: "Cancelled",
  offline: "Terminal offline",
}

const STATUS_DOT_CLASS: Record<EftposStatus, string> = {
  idle: styles.dotIdle,
  waiting: styles.dotWaiting,
  approved: styles.dotApproved,
  declined: styles.dotDeclined,
  cancelled: styles.dotCancelled,
  offline: styles.dotOffline,
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function EftposTerminalPanel({
  provider = "tyro",
  terminalId = "TYRO-OFM-01",
  amount,
  surcharge = 0,
  status,
  messages,
  onRetry,
  onCancel,
}: EftposTerminalPanelProps) {
  const total = amount + surcharge
  const isWaiting = status === "waiting"
  const isResolved = status === "approved" || status === "declined" || status === "cancelled"

  return (
    <section className={styles.panel} aria-label={`${PROVIDER_LABEL[provider]} prompt`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>{PROVIDER_LABEL[provider]}</span>
          <h2 className={styles.title}>Terminal prompt</h2>
        </div>
        <span className={styles.meta}>{terminalId}</span>
      </header>

      <div className={styles.amount}>
        <span className={styles.amountLabel}>Charge inc GST</span>
        <span className={styles.amountValue}>{formatAud(total)}</span>
        {surcharge > 0 && (
          <div className={styles.amountSplit}>
            <span>
              Items <strong>{formatAud(amount)}</strong>
            </span>
            <span>
              Surcharge <strong>{formatAud(surcharge)}</strong>
            </span>
          </div>
        )}
      </div>

      <div className={styles.statusRow} role="status" aria-live="polite">
        <span className={`${styles.dot} ${STATUS_DOT_CLASS[status]}`} aria-hidden="true" />
        <span className={styles.statusLabel}>{STATUS_LABEL[status]}</span>
      </div>

      {isWaiting && (
        <ProgressLinear
          variant="indeterminate"
          tone="amber"
          label="Awaiting card insert / tap"
          showLabel={false}
        />
      )}

      {messages.length > 0 && (
        <ul className={styles.statusMessages} role="log" aria-live="polite">
          {messages.map((line, index) => (
            <li key={`${index}-${line.slice(0, 8)}`}>{line}</li>
          ))}
        </ul>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.cta} ${styles.ctaCancel}`}
          onClick={() => onCancel?.()}
          disabled={!isWaiting}
        >
          Cancel
        </button>
        <button
          type="button"
          className={styles.cta}
          onClick={() => onRetry?.()}
          disabled={!isResolved}
        >
          Retry
        </button>
      </div>
    </section>
  )
}

export default EftposTerminalPanel
