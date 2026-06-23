import {
  CONNECTOR_AUDIT_ACTION_LABEL,
  CONNECTOR_AUDIT_ACTION_TONE,
  type ConnectorAuditAction,
} from "./connectors-types"
import type { StatusTone } from "../status-page/status-types"
import styles from "./audit-trail-row.module.css"

export interface AuditTrailRowProps {
  /** Action category. */
  action: ConnectorAuditAction
  /** Connector display name, e.g. "Stripe", "Replicate". */
  connector: string
  /** Actor display name, e.g. "Daniel F.", "Hermes Bot". */
  actor: string
  /** Actor 2-letter avatar, e.g. "DF". */
  actorInitials: string
  /** Optional remote IP address. */
  ip?: string
  /** ISO timestamp. */
  occurredAt: string
  /** Free-text additional context. */
  note?: string
  className?: string
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

export function AuditTrailRow({
  action,
  connector,
  actor,
  actorInitials,
  ip,
  occurredAt,
  note,
  className,
}: AuditTrailRowProps) {
  const tone = CONNECTOR_AUDIT_ACTION_TONE[action]
  const actionLabel = CONNECTOR_AUDIT_ACTION_LABEL[action]
  const classes = [styles.row, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${actor} ${actionLabel.toLowerCase()} ${connector} at ${occurredAt}`}
    >
      <div className={styles.gutter} aria-hidden="true">
        <span className={styles.bullet} />
        <span className={styles.spine} />
      </div>

      <div className={styles.body}>
        <header className={styles.head}>
          <span className={[styles.actionChip, TONE_CLASS[tone]].join(" ")}>{actionLabel}</span>
          <span className={styles.connector}>{connector}</span>
          <time className={styles.time} dateTime={occurredAt}>
            {occurredAt}
          </time>
        </header>

        <div className={styles.actor}>
          <span className={styles.avatar} aria-hidden="true">
            {actorInitials}
          </span>
          <span className={styles.actorName}>{actor}</span>
          {ip ? <code className={styles.ip}>{ip}</code> : null}
        </div>

        {note ? <p className={styles.note}>{note}</p> : null}
      </div>
    </article>
  )
}

export default AuditTrailRow
