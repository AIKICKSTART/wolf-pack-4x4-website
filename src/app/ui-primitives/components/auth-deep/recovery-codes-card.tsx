"use client"

import { useId, useState } from "react"

import { Chip } from "../primitives/chip"

import {
  type AuthTone,
  type RecoveryCodeStatus,
} from "./auth-deep-types"
import styles from "./recovery-codes-card.module.css"

export interface RecoveryCodesCardProps {
  /** Owner label, e.g. "Mick Davies". */
  ownerLabel: string
  /** Tenant label. */
  tenantLabel: string
  /** Lifecycle. */
  status: RecoveryCodeStatus
  /** Generated codes — only shown when revealed. */
  codes: ReadonlyArray<string>
  /** Number already consumed. */
  usedCount: number
  /** Generated-at ISO. */
  generatedAtIso: string
  /** True until user explicitly clicks "I have copied/downloaded". */
  awaitingConfirm: boolean
  /** Fires when user clicks Download. */
  onDownload?: () => void
  /** Fires when user clicks Print. */
  onPrint?: () => void
  /** Fires when user confirms saved. */
  onConfirmSaved?: () => void
  /** Fires when user regenerates. */
  onRegenerate?: () => void
}

const STATUS_LABEL: Record<RecoveryCodeStatus, string> = {
  fresh: "Fresh · show once",
  downloaded: "Saved off-device",
  rotated: "Rotated — old codes void",
  exhausted: "Exhausted — regenerate now",
}

const STATUS_TONE: Record<RecoveryCodeStatus, AuthTone> = {
  fresh: "amber",
  downloaded: "green",
  rotated: "teal",
  exhausted: "red",
}

function maskCode(code: string): string {
  if (code.length <= 4) return "•".repeat(code.length)
  return `${code.slice(0, 2)}${"•".repeat(code.length - 4)}${code.slice(-2)}`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
}

export function RecoveryCodesCard({
  ownerLabel,
  tenantLabel,
  status,
  codes,
  usedCount,
  generatedAtIso,
  awaitingConfirm,
  onDownload,
  onPrint,
  onConfirmSaved,
  onRegenerate,
}: RecoveryCodesCardProps) {
  const [revealed, setRevealed] = useState(false)
  const liveId = useId()

  const totalCount = codes.length
  const remaining = Math.max(0, totalCount - usedCount)
  const canDismiss = status === "fresh" && awaitingConfirm

  return (
    <article
      className={styles.wrap}
      aria-label={`Recovery codes for ${ownerLabel}`}
      data-status={status}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>{tenantLabel} · Recovery codes</span>
          <h3 className={styles.title}>{ownerLabel}</h3>
          <p className={styles.meta}>
            Generated · <strong>{formatDate(generatedAtIso)}</strong>
          </p>
        </div>
        <div className={styles.headMeta}>
          <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
          <Chip
            label={`${remaining} of ${totalCount} unused`}
            tone={remaining <= 2 ? "red" : remaining <= 4 ? "amber" : "green"}
          />
        </div>
      </header>

      {canDismiss ? (
        <div className={styles.warn} role="alert">
          <strong>Show once.</strong> These codes will never be shown again.
          Download or print before continuing. Each code works exactly once.
        </div>
      ) : null}

      <div className={styles.codeGrid} aria-label="Recovery codes">
        {codes.map((code, index) => (
          <div
            key={code}
            className={styles.codeCell}
            data-used={index < usedCount}
          >
            <span className={styles.codeIndex}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <code className={styles.code}>
              {revealed ? code : maskCode(code)}
            </code>
            {index < usedCount ? (
              <span className={styles.usedTag}>USED</span>
            ) : null}
          </div>
        ))}
      </div>

      <div className={styles.toolbar} role="toolbar" aria-label="Recovery code actions">
        <button
          type="button"
          className={styles.btnGhost}
          onClick={() => setRevealed((current) => !current)}
          aria-pressed={revealed}
          aria-label={revealed ? "Hide recovery codes" : "Reveal recovery codes"}
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onDownload}
          aria-label="Download recovery codes as a text file"
        >
          Download .txt
        </button>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onPrint}
          aria-label="Print recovery codes"
        >
          Print
        </button>
        <button
          type="button"
          className={styles.btnDanger}
          onClick={onRegenerate}
          aria-label="Regenerate recovery codes — invalidates current set"
        >
          Regenerate
        </button>
      </div>

      {canDismiss ? (
        <footer className={styles.confirmFoot}>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={onConfirmSaved}
            aria-label="Confirm recovery codes saved off-device"
          >
            I have saved my codes — continue
          </button>
        </footer>
      ) : null}

      <span id={liveId} role="status" aria-live="polite" className={styles.srOnly}>
        {STATUS_LABEL[status]} · {remaining} of {totalCount} unused.
      </span>
    </article>
  )
}

export default RecoveryCodesCard
