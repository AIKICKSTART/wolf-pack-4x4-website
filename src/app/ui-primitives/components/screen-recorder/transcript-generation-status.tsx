"use client"

import styles from "./transcript-generation-status.module.css"

import type { TranscriptStatus } from "./screen-recorder-types"

interface TranscriptGenerationStatusProps {
  status: TranscriptStatus
  /** Detected language, e.g. "EN-AU". */
  languageLabel?: string
  /** Word count chip shown when status === "ready". */
  wordCount?: number
  /** Estimate of remaining seconds for processing status. */
  etaSec?: number
  /** Error message shown when status === "failed". */
  errorMessage?: string
  onRetry?: () => void
  onOpen?: () => void
}

const STATUS_COPY: Record<TranscriptStatus, { kicker: string; title: string }> = {
  queued: {
    kicker: "Transcript",
    title: "Queued for transcription",
  },
  processing: {
    kicker: "Transcript",
    title: "Transcribing your recording",
  },
  ready: {
    kicker: "Transcript",
    title: "Transcript ready",
  },
  failed: {
    kicker: "Transcript",
    title: "Transcription failed",
  },
}

function formatEta(seconds: number): string {
  const total = Math.max(0, Math.round(seconds))
  if (total < 60) return `${total}s`
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}m ${s.toString().padStart(2, "0")}s`
}

export function TranscriptGenerationStatus({
  status,
  languageLabel = "EN-AU",
  wordCount,
  etaSec,
  errorMessage = "Audio too quiet — recheck mic input.",
  onRetry,
  onOpen,
}: TranscriptGenerationStatusProps) {
  const copy = STATUS_COPY[status]
  return (
    <div
      className={[styles.wrap, styles[`status-${status}`]].join(" ")}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon} aria-hidden="true">
        {status === "queued" ? "◐" : null}
        {status === "processing" ? <span className={styles.spinner} /> : null}
        {status === "ready" ? "✓" : null}
        {status === "failed" ? "!" : null}
      </span>

      <div className={styles.body}>
        <span className={styles.kicker}>{copy.kicker}</span>
        <span className={styles.title}>{copy.title}</span>

        {status === "processing" && etaSec !== undefined ? (
          <span className={styles.detail}>About {formatEta(etaSec)} remaining</span>
        ) : null}
        {status === "queued" ? (
          <span className={styles.detail}>Position 3 of 7 in the queue</span>
        ) : null}
        {status === "failed" ? (
          <span className={styles.detail}>{errorMessage}</span>
        ) : null}

        <div className={styles.chips}>
          <span className={styles.chip}>
            <span className={styles.chipGlyph} aria-hidden="true">⌘</span>
            {languageLabel}
          </span>
          {status === "ready" && wordCount !== undefined ? (
            <span className={[styles.chip, styles.chipReady].join(" ")}>
              {wordCount.toLocaleString()} words
            </span>
          ) : null}
        </div>
      </div>

      {status === "ready" ? (
        <button
          type="button"
          className={[styles.action, styles.actionReady].join(" ")}
          onClick={onOpen}
        >
          Open transcript
        </button>
      ) : null}
      {status === "failed" ? (
        <button
          type="button"
          className={[styles.action, styles.actionRetry].join(" ")}
          onClick={onRetry}
        >
          Retry
        </button>
      ) : null}
    </div>
  )
}
