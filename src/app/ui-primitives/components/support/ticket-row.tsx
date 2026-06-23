import { Avatar } from "../primitives/avatar"

import { SlaTimerChip } from "./sla-timer-chip"
import {
  TICKET_STATUS_LABEL,
  TICKET_STATUS_TONE,
  type SupportTone,
  type TicketPriority,
  type TicketStatus,
} from "./support-types"
import { TicketPriorityChip } from "./ticket-priority-chip"
import styles from "./ticket-row.module.css"

export interface TicketRowProps {
  /** Public ticket identifier, e.g. "MM-4187". */
  id: string
  subject: string
  customerName: string
  /** Optional avatar image; falls back to initials. */
  customerAvatarSrc?: string
  status: TicketStatus
  priority: TicketPriority
  /** Display name of assignee, or "Unassigned". */
  assignee?: string
  /** Human last-update timestamp, e.g. "3m ago". */
  lastUpdate: string
  /** Minutes remaining on the active SLA timer. */
  slaRemainingMinutes: number
  /** Optional SLA prefix, e.g. "First response". */
  slaLabel?: string
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

export function TicketRow({
  id,
  subject,
  customerName,
  customerAvatarSrc,
  status,
  priority,
  assignee,
  lastUpdate,
  slaRemainingMinutes,
  slaLabel,
  className,
}: TicketRowProps) {
  const statusTone = TICKET_STATUS_TONE[status]
  const classes = [styles.row, TONE_CLASS[statusTone], className]
    .filter(Boolean)
    .join(" ")
  const assigneeText = assignee ?? "Unassigned"

  return (
    <article
      className={classes}
      aria-label={`Ticket ${id} — ${subject} — ${TICKET_STATUS_LABEL[status]}`}
    >
      <header className={styles.head}>
        <span className={styles.id}>{id}</span>
        <span className={[styles.statusChip, TONE_CLASS[statusTone]].join(" ")}>
          <span className={styles.statusDot} aria-hidden="true" />
          {TICKET_STATUS_LABEL[status]}
        </span>
      </header>

      <div className={styles.body}>
        <Avatar name={customerName} src={customerAvatarSrc} size="md" tone="obsidian" />
        <div className={styles.identity}>
          <h3 className={styles.subject}>{subject}</h3>
          <p className={styles.customer}>{customerName}</p>
        </div>
      </div>

      <footer className={styles.foot}>
        <div className={styles.chips}>
          <TicketPriorityChip priority={priority} />
          <SlaTimerChip
            remainingMinutes={slaRemainingMinutes}
            label={slaLabel}
          />
        </div>
        <div className={styles.meta}>
          <span className={styles.metaLabel}>Assigned</span>
          <span className={styles.metaValue}>{assigneeText}</span>
          <span className={styles.metaSep} aria-hidden="true">
            ·
          </span>
          <span className={styles.metaLabel}>Updated</span>
          <span className={styles.metaValue}>{lastUpdate}</span>
        </div>
      </footer>
    </article>
  )
}

export default TicketRow
