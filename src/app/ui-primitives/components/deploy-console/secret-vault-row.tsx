"use client"

import { useState } from "react"

import { ProgressLinear } from "../primitives/progress-linear"

import {
  SECRET_ROTATION_LABEL,
  SECRET_ROTATION_TONE,
  type SecretVaultEntry,
} from "./deploy-console-types"
import styles from "./secret-vault-row.module.css"
import shell from "./deploy-console.module.css"

export interface SecretVaultRowProps {
  entry: SecretVaultEntry
  /** Disable the rotate control. Useful for read-only contexts. */
  readonly?: boolean
  className?: string
}

const TONE_TO_PROGRESS: Record<
  SecretVaultEntry["status"],
  "red" | "amber" | "teal" | "green"
> = {
  fresh: "green",
  ageing: "teal",
  expiring: "amber",
  expired: "red",
}

function maskValue(raw: string): string {
  if (raw.length === 0) return "********"
  const head = raw.slice(0, 4)
  const stars = "*".repeat(Math.min(raw.length - 4, 22))
  return `${head}${stars}`
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="4" y="4" width="9" height="11" rx="1.5" />
      <path d="M3 12H2.5A1.5 1.5 0 0 1 1 10.5v-8A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5V3" />
    </svg>
  )
}

function RevealIcon({ revealed }: { revealed: boolean }) {
  if (revealed) {
    return (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M2 8s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4Z" />
        <circle cx="8" cy="8" r="2" />
        <path d="M2 2l12 12" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M2 8s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4Z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  )
}

function RotateIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M14 3v3h-3" />
      <path d="M2 8a6 6 0 0 1 10.5-4l1.5 2" />
      <path d="M2 13v-3h3" />
      <path d="M14 8a6 6 0 0 1-10.5 4L2 10" />
    </svg>
  )
}

export function SecretVaultRow({
  entry,
  readonly = false,
  className,
}: SecretVaultRowProps) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const toneClass = (() => {
    switch (SECRET_ROTATION_TONE[entry.status]) {
      case "red":
        return shell.toneRed
      case "amber":
        return shell.toneAmber
      case "teal":
        return shell.toneTeal
      case "green":
        return shell.toneGreen
      default:
        return shell.toneNeutral
    }
  })()

  const progressTone = TONE_TO_PROGRESS[entry.status]
  const usedRatio =
    entry.rotationWindowDays > 0
      ? Math.max(
          0,
          Math.min(
            1,
            (entry.rotationWindowDays - entry.rotationDaysRemaining) /
              entry.rotationWindowDays,
          ),
        )
      : 0
  const usedPercent = Math.round(usedRatio * 100)

  const display = revealed ? entry.value : maskValue(entry.value)

  const handleReveal = () => {
    setRevealed((current) => !current)
  }

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(entry.value)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article
      className={[shell.shell, toneClass, styles.row, className]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Secret ${entry.key}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={shell.kicker}>{entry.vendor}</span>
          <h3 className={styles.key}>{entry.key}</h3>
          <span className={styles.meta}>Last accessed {entry.lastAccessedAt}</span>
        </div>
        <span className={[shell.chip, toneClass].join(" ")}>
          {SECRET_ROTATION_LABEL[entry.status]}
        </span>
      </header>

      <div className={styles.valueRow}>
        <code className={styles.value}>{display}</code>
        <div className={shell.rowActions}>
          <button
            type="button"
            className={shell.iconButton}
            onClick={handleReveal}
            aria-pressed={revealed}
            aria-label={revealed ? `Hide ${entry.key}` : `Reveal ${entry.key}`}
          >
            <RevealIcon revealed={revealed} />
          </button>
          <button
            type="button"
            className={shell.iconButton}
            onClick={handleCopy}
            aria-label={copied ? `${entry.key} copied` : `Copy ${entry.key}`}
          >
            <CopyIcon />
          </button>
          <button
            type="button"
            className={shell.iconButton}
            disabled={readonly || !entry.canRotate}
            aria-label={`Rotate ${entry.key}`}
            title={
              entry.canRotate
                ? `Rotate ${entry.key}`
                : `${entry.key} cannot be rotated`
            }
          >
            <RotateIcon />
          </button>
        </div>
      </div>

      <div className={styles.foot}>
        <ProgressLinear
          value={usedPercent}
          max={100}
          tone={progressTone}
          variant="segmented"
          segments={10}
          label={`Rotation window`}
          showLabel
        />
        <div className={styles.countdown}>
          <span className={shell.tabular}>{entry.rotationDaysRemaining}d</span>
          <span className={styles.countdownLabel}>until rotation</span>
        </div>
      </div>
      <span className={styles.copyAnnounce} role="status" aria-live="polite">
        {copied ? `${entry.key} copied to clipboard` : ""}
      </span>
    </article>
  )
}

export default SecretVaultRow
