import { Avatar, type AvatarTone } from "../primitives/avatar"
import styles from "./audit-log-row.module.css"

export type AuditEventTone = "info" | "warn" | "success" | "danger"

export interface AuditLogRowItem {
  id: string
  actorName: string
  actorEmail?: string
  actorAvatarSrc?: string
  actorTone?: AvatarTone
  action: string
  objectLabel: string
  objectKind?: string
  ip?: string
  timestamp: string
  tone?: AuditEventTone
}

interface AuditLogRowProps {
  entry: AuditLogRowItem
  className?: string
}

const TONE_CLASS: Record<AuditEventTone, string> = {
  info: styles.toneInfo,
  warn: styles.toneWarn,
  success: styles.toneSuccess,
  danger: styles.toneDanger,
}

export function AuditLogRow({ entry, className }: AuditLogRowProps) {
  const tone = entry.tone ?? "info"
  const classes = [styles.row, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="listitem">
      <span className={styles.dot} aria-hidden="true" />

      <div className={styles.actor}>
        <Avatar
          name={entry.actorName}
          src={entry.actorAvatarSrc}
          tone={entry.actorTone ?? "obsidian"}
          size="sm"
        />
        <div className={styles.actorText}>
          <span className={styles.actorName}>{entry.actorName}</span>
          {entry.actorEmail && <span className={styles.actorEmail}>{entry.actorEmail}</span>}
        </div>
      </div>

      <div className={styles.event}>
        <span className={styles.action}>{entry.action}</span>
        <span className={styles.object}>
          {entry.objectKind && <span className={styles.objectKind}>{entry.objectKind}</span>}
          <span className={styles.objectLabel}>{entry.objectLabel}</span>
        </span>
      </div>

      <dl className={styles.meta}>
        {entry.ip && (
          <div>
            <dt>IP</dt>
            <dd>
              <code>{entry.ip}</code>
            </dd>
          </div>
        )}
        <div>
          <dt>When</dt>
          <dd>
            <time>{entry.timestamp}</time>
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default AuditLogRow
