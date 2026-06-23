import { SlaTimerChip } from "../support/sla-timer-chip"

import styles from "./chat-sla-timer-chip.module.css"

type SlaKind = "first-response" | "next-response" | "resolution"

const KIND_LABEL: Record<SlaKind, string> = {
  "first-response": "First reply",
  "next-response": "Next reply",
  resolution: "Resolve",
}

interface ChatSlaTimerChipProps {
  /** Remaining minutes until SLA breach. Negative = breached. */
  remainingMinutes: number
  /** Type of SLA being tracked. */
  kind?: SlaKind
  /** Optional override label override on top of the kind. */
  context?: string
  className?: string
}

export function ChatSlaTimerChip({
  remainingMinutes,
  kind = "next-response",
  context,
  className,
}: ChatSlaTimerChipProps) {
  const label = KIND_LABEL[kind]
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <span className={classes}>
      {context ? <span className={styles.kicker}>{context}</span> : null}
      <SlaTimerChip remainingMinutes={remainingMinutes} label={label} />
    </span>
  )
}

export default ChatSlaTimerChip
