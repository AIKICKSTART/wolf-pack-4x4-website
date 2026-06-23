"use client"

import {
  OPERATOR_STATUS_HINT,
  OPERATOR_STATUS_LABEL,
  OPERATOR_STATUS_TONE,
  type OperatorStatus,
} from "./live-chat-types"
import styles from "./operator-status-pill.module.css"

interface OperatorStatusPillProps {
  status: OperatorStatus
  /** Operator display name shown beside the status label. */
  operatorName?: string
  /** Hide the auxiliary one-liner hint. */
  hideHint?: boolean
  /** Triggered when the pill is activated (e.g. open status menu). */
  onPress?: () => void
  className?: string
}

const TONE_CLASS: Record<string, string> = {
  green: styles.toneGreen,
  amber: styles.toneAmber,
  red: styles.toneRed,
  violet: styles.toneViolet,
  neutral: styles.toneNeutral,
  teal: styles.toneGreen,
}

const STATUS_PULSES: Record<OperatorStatus, boolean> = {
  available: true,
  away: false,
  "in-wrap": true,
  busy: true,
  offline: false,
}

export function OperatorStatusPill({
  status,
  operatorName,
  hideHint = false,
  onPress,
  className,
}: OperatorStatusPillProps) {
  const tone = OPERATOR_STATUS_TONE[status]
  const toneClass = TONE_CLASS[tone] ?? styles.toneNeutral
  const label = OPERATOR_STATUS_LABEL[status]
  const hint = OPERATOR_STATUS_HINT[status]
  const announcement = operatorName
    ? `${operatorName} is ${label}. ${hint}.`
    : `${label}. ${hint}.`

  return (
    <button
      type="button"
      className={[styles.pill, toneClass, className]
        .filter(Boolean)
        .join(" ")}
      onClick={onPress}
      aria-label={announcement}
      aria-haspopup={onPress ? "menu" : undefined}
    >
      <span className={styles.dotShell} aria-hidden="true">
        <span className={styles.dot} />
        {STATUS_PULSES[status] ? (
          <span className={styles.dotPulse} />
        ) : null}
      </span>
      <span className={styles.label}>{label}</span>
      {!hideHint ? <span className={styles.hint}>{hint}</span> : null}
      {onPress ? <span className={styles.caret} aria-hidden="true" /> : null}
    </button>
  )
}

export default OperatorStatusPill
