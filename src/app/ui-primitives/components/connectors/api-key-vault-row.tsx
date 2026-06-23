"use client"

import { useState } from "react"

import {
  CONNECTOR_STATUS_LABEL,
  CONNECTOR_STATUS_TONE,
  maskSecret,
  type ApiKeyProviderId,
  type ConnectorStatus,
} from "./connectors-types"
import type { StatusTone } from "../status-page/status-types"
import styles from "./api-key-vault-row.module.css"

export interface ApiKeyVaultRowProps {
  provider: ApiKeyProviderId
  providerName: string
  /** Symbolic key name, e.g. STRIPE_KEY. */
  keyName: string
  /** Raw secret — masked by default, revealed only when toggled. */
  secret: string
  status: ConnectorStatus
  /** Rotation cadence label, e.g. "Rotate every 90 days". */
  rotationCadence: string
  /** Days until next rotation due. */
  daysUntilRotation: number
  /** ISO date of last rotation. */
  lastRotatedAt: string
  onRotate?: () => void
  onCopy?: () => void
  /** Fires on every reveal/hide toggle so the host can audit. */
  onRevealChange?: (revealed: boolean) => void
  className?: string
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

export function ApiKeyVaultRow({
  provider,
  providerName,
  keyName,
  secret,
  status,
  rotationCadence,
  daysUntilRotation,
  lastRotatedAt,
  onRotate,
  onCopy,
  onRevealChange,
  className,
}: ApiKeyVaultRowProps) {
  const [revealed, setRevealed] = useState(false)
  const tone = CONNECTOR_STATUS_TONE[status]
  const masked = maskSecret(secret, 4)
  const rotationTone: StatusTone =
    daysUntilRotation < 0 ? "red" : daysUntilRotation < 14 ? "amber" : "green"

  const classes = [styles.row, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  const toggleReveal = () => {
    const next = !revealed
    setRevealed(next)
    onRevealChange?.(next)
  }

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${keyName} secret — ${CONNECTOR_STATUS_LABEL[status]}`}
      data-provider={provider}
    >
      <div className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.providerKicker}>{providerName}</span>
          <code className={styles.keyName}>{keyName}</code>
        </div>
        <span className={[styles.chip, TONE_CLASS[tone]].join(" ")}>
          <span className={styles.chipDot} aria-hidden="true" />
          {CONNECTOR_STATUS_LABEL[status]}
        </span>
      </div>

      <div className={styles.secretRow}>
        <code
          className={[styles.secret, revealed ? styles.secretRevealed : ""].join(" ")}
          aria-label={revealed ? `${keyName} value revealed` : `${keyName} value masked`}
        >
          {revealed ? secret : masked}
        </code>
        <div className={styles.secretActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleReveal}
            aria-pressed={revealed}
            aria-label={revealed ? `Hide ${keyName}` : `Reveal ${keyName}`}
          >
            {revealed ? "Hide" : "Reveal"}
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onCopy}
            aria-label={`Copy ${keyName} to clipboard`}
          >
            Copy
          </button>
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Cadence</span>
          <span className={styles.metaValue}>{rotationCadence}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Last rotated</span>
          <span className={styles.metaValue}>{lastRotatedAt}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Next due</span>
          <span className={[styles.metaValue, styles.metaCountdown, TONE_CLASS[rotationTone]].join(" ")}>
            {daysUntilRotation < 0
              ? `${Math.abs(daysUntilRotation)}d overdue`
              : `${daysUntilRotation}d`}
          </span>
        </div>
        <button
          type="button"
          className={styles.rotateBtn}
          onClick={onRotate}
          aria-label={`Rotate ${keyName} now`}
        >
          Rotate now
        </button>
      </div>
    </article>
  )
}

export default ApiKeyVaultRow
