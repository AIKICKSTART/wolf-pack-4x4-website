import { ShieldCheck } from "lucide-react"

import styles from "./consent-state-tile.module.css"
import {
  CONSENT_LABEL,
  CONSENT_TONE,
  type AutomationTone,
  type ConsentStatus,
} from "./marketing-automation-types"

interface ConsentStateTileProps {
  /** Contact full name. */
  name: string
  /** Contact email. */
  email: string
  /** Consent status. */
  status: ConsentStatus
  /** Original opt-in timestamp. */
  optedInAt?: string
  /** Double-opt-in confirmed timestamp. */
  confirmedAt?: string
  /** Last broadcast received timestamp. */
  lastSentAt?: string
  /** Unsubscribe URL — wired to ESP. */
  unsubscribeHref: string
  /** Optional legal/footnote text. */
  note?: string
  className?: string
}

const STATUS_CLASS: Record<AutomationTone, string> = {
  green: styles.statusGreen,
  teal: styles.statusTeal,
  amber: styles.statusAmber,
  red: styles.statusRed,
  neutral: styles.statusNeutral,
}

export function ConsentStateTile({
  name,
  email,
  status,
  optedInAt,
  confirmedAt,
  lastSentAt,
  unsubscribeHref,
  note,
  className,
}: ConsentStateTileProps) {
  const classes = [styles.tile, className].filter(Boolean).join(" ")
  const tone = CONSENT_TONE[status]
  return (
    <article
      className={classes}
      aria-label={`Consent state for ${name} · ${CONSENT_LABEL[status]}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Marketing consent</span>
          <span className={styles.name}>{name}</span>
          <span className={styles.email}>{email}</span>
        </div>
        <span className={[styles.status, STATUS_CLASS[tone]].join(" ")}>
          <ShieldCheck size={11} strokeWidth={2.4} aria-hidden="true" />
          {CONSENT_LABEL[status]}
        </span>
      </header>

      <div className={styles.timeline}>
        <span className={styles.timelineLabel}>Audit trail</span>
        {optedInAt ? (
          <div className={styles.timelineRow}>
            <span>Opt-in</span>
            <span className={styles.timelineWhen}>{optedInAt}</span>
          </div>
        ) : null}
        {confirmedAt ? (
          <div className={styles.timelineRow}>
            <span>Double-confirm</span>
            <span className={styles.timelineWhen}>{confirmedAt}</span>
          </div>
        ) : null}
        {lastSentAt ? (
          <div className={styles.timelineRow}>
            <span>Last broadcast</span>
            <span className={styles.timelineWhen}>{lastSentAt}</span>
          </div>
        ) : null}
      </div>

      <div className={styles.actions}>
        <a
          className={styles.unsub}
          href={unsubscribeHref}
          rel="nofollow"
          aria-label={`Unsubscribe ${name}`}
        >
          Unsubscribe link
        </a>
        {note ? <span className={styles.note}>{note}</span> : null}
      </div>
    </article>
  )
}

export default ConsentStateTile
