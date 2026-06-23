import {
  TICKET_PRIORITY_LABEL,
  TICKET_PRIORITY_SHORT,
  TICKET_PRIORITY_TONE,
  type SupportTone,
  type TicketPriority,
} from "./support-types"
import styles from "./ticket-priority-chip.module.css"

export interface TicketPriorityChipProps {
  priority: TicketPriority
  /** Show short ("P0") or long ("P0 · Critical") label. Defaults to "short". */
  variant?: "short" | "long"
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

export function TicketPriorityChip({
  priority,
  variant = "short",
  className,
}: TicketPriorityChipProps) {
  const tone = TICKET_PRIORITY_TONE[priority]
  const isCritical = priority === "p0"
  const label =
    variant === "long"
      ? TICKET_PRIORITY_LABEL[priority]
      : TICKET_PRIORITY_SHORT[priority]
  const accessibleLabel = TICKET_PRIORITY_LABEL[priority]
  const classes = [
    styles.chip,
    TONE_CLASS[tone],
    isCritical ? styles.critical : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={classes} aria-label={`Priority ${accessibleLabel}`}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </span>
  )
}

export default TicketPriorityChip
