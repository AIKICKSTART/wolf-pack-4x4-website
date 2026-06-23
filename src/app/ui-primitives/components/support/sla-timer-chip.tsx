import {
  SLA_BUCKET_LABEL,
  SLA_BUCKET_TONE,
  bucketForRemainingMinutes,
  type SlaBucket,
  type SupportTone,
} from "./support-types"
import styles from "./sla-timer-chip.module.css"

export interface SlaTimerChipProps {
  /** Remaining minutes until SLA deadline. Negative values are treated as breached. */
  remainingMinutes: number
  /** Override the auto-detected bucket. */
  bucket?: SlaBucket
  /** Optional label prefix, e.g. "First response". Defaults to "SLA". */
  label?: string
  className?: string
}

const TONE_CLASS: Record<SupportTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

function formatRemaining(minutes: number): string {
  if (minutes <= 0) {
    const overdue = Math.abs(minutes)
    if (overdue >= 60) {
      const hours = Math.floor(overdue / 60)
      const mins = overdue % 60
      return mins > 0 ? `Breached ${hours}h ${mins}m` : `Breached ${hours}h`
    }
    return `Breached ${overdue}m`
  }
  if (minutes >= 60 * 24) {
    const days = Math.floor(minutes / (60 * 24))
    const remHours = Math.floor((minutes % (60 * 24)) / 60)
    return remHours > 0 ? `${days}d ${remHours}h left` : `${days}d left`
  }
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m left` : `${hours}h left`
  }
  return `${minutes}m left`
}

export function SlaTimerChip({
  remainingMinutes,
  bucket,
  label = "SLA",
  className,
}: SlaTimerChipProps) {
  const resolvedBucket = bucket ?? bucketForRemainingMinutes(remainingMinutes)
  const tone = SLA_BUCKET_TONE[resolvedBucket]
  const remainingText = formatRemaining(remainingMinutes)
  const announcement = `${label} ${SLA_BUCKET_LABEL[resolvedBucket]}, ${remainingText}.`
  const classes = [
    styles.chip,
    TONE_CLASS[tone],
    resolvedBucket === "breached" ? styles.breached : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <span
      className={classes}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={announcement}
    >
      <span className={styles.glyph} aria-hidden="true">
        ⏱
      </span>
      <span className={styles.kicker}>{label}</span>
      <span className={styles.value}>{remainingText}</span>
    </span>
  )
}

export default SlaTimerChip
