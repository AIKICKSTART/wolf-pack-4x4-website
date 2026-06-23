"use client"

import type { ConfidenceTone } from "./import-types"
import styles from "./field-mapping-suggestion.module.css"

interface FieldMappingSuggestionProps {
  sourceColumn: string
  targetField: string
  confidencePercent: number
  confidenceTone: ConfidenceTone
  reasoning?: string
  onAccept?: () => void
  onReject?: () => void
  className?: string
}

const CONFIDENCE_LABEL: Record<ConfidenceTone, string> = {
  high: "high",
  medium: "medium",
  low: "low",
}

const CONFIDENCE_CLASS: Record<ConfidenceTone, string> = {
  high: styles.confidenceHigh,
  medium: styles.confidenceMedium,
  low: styles.confidenceLow,
}

export function FieldMappingSuggestion({
  sourceColumn,
  targetField,
  confidencePercent,
  confidenceTone,
  reasoning,
  onAccept,
  onReject,
  className,
}: FieldMappingSuggestionProps) {
  return (
    <aside
      className={[styles.banner, className].filter(Boolean).join(" ")}
      role="region"
      aria-label="AI mapping suggestion"
    >
      <span className={styles.glyph} aria-hidden="true">
        ✦
      </span>
      <div className={styles.body}>
        <p className={styles.message}>
          We detected{" "}
          <code className={styles.token}>{sourceColumn}</code> column maps to{" "}
          <code className={styles.token}>{targetField}</code> — accept?
        </p>
        {reasoning && <p className={styles.reasoning}>{reasoning}</p>}
      </div>
      <span
        className={[styles.confidenceChip, CONFIDENCE_CLASS[confidenceTone]].join(
          " ",
        )}
      >
        {confidencePercent}% · {CONFIDENCE_LABEL[confidenceTone]} confidence
      </span>
      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={onAccept}>
          Accept
        </button>
        <button type="button" className={styles.reject} onClick={onReject}>
          Reject
        </button>
      </div>
    </aside>
  )
}

export default FieldMappingSuggestion
