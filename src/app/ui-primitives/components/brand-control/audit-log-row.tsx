import {
  CloudUpload,
  Edit3,
  GitBranch,
  Megaphone,
  RotateCcw,
} from "lucide-react"
import type { ReactNode } from "react"

import type { AuditAction, AuditLogEntry } from "./brand-control-types"
import styles from "./brand-control.module.css"

interface AuditLogRowProps {
  entry: AuditLogEntry
  className?: string
}

const ACTION_ICON: Record<AuditAction, ReactNode> = {
  edit: <Edit3 size={12} aria-hidden="true" />,
  upload: <CloudUpload size={12} aria-hidden="true" />,
  publish: <Megaphone size={12} aria-hidden="true" />,
  deploy: <GitBranch size={12} aria-hidden="true" />,
  rollback: <RotateCcw size={12} aria-hidden="true" />,
}

const ACTION_TONE: Record<AuditAction, string> = {
  edit: styles.tagAmber,
  upload: styles.tagTeal,
  publish: styles.tagGreen,
  deploy: styles.tagTeal,
  rollback: styles.tagRed,
}

const ACTION_LABEL: Record<AuditAction, string> = {
  edit: "Edit",
  upload: "Upload",
  publish: "Publish",
  deploy: "Deploy",
  rollback: "Rollback",
}

function relativeTime(timestamp: string): string {
  const now = new Date("2026-05-29T12:00:00Z").getTime()
  const then = new Date(timestamp).getTime()
  const diffMs = now - then
  const minute = 60_000
  const hour = 60 * minute
  const day = 24 * hour
  if (diffMs < hour) return `${Math.max(1, Math.round(diffMs / minute))}m ago`
  if (diffMs < day) return `${Math.round(diffMs / hour)}h ago`
  if (diffMs < 7 * day) return `${Math.round(diffMs / day)}d ago`
  return new Date(timestamp).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
  })
}

/**
 * Single audit log row — actor + action + resource + relative time, with
 * an optional before/after diff strip. Compact enough to stack into a feed.
 */
export function AuditLogRow({ entry, className }: AuditLogRowProps) {
  return (
    <article
      className={[styles.card, styles.cardCompact, className].filter(Boolean).join(" ")}
      aria-label={`Audit entry — ${entry.actor} ${ACTION_LABEL[entry.action]}`}
    >
      <div className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <span className={`${styles.tag} ${ACTION_TONE[entry.action]}`}>
              {ACTION_ICON[entry.action]}
              {ACTION_LABEL[entry.action]}
            </span>
          </span>
          <h4 className={styles.title} style={{ fontSize: 14 }}>
            {entry.actor}{" "}
            <span style={{ color: "var(--primitive-muted)", fontFamily: "var(--primitive-font-body)" }}>
              · {entry.resource}
            </span>
          </h4>
          <p className={styles.subtitle} style={{ fontSize: 12 }}>
            <code className={styles.mono}>{entry.resourceLabel}</code>
          </p>
        </div>
        <time
          className={styles.tinyLabel}
          dateTime={entry.timestamp}
          title={new Date(entry.timestamp).toLocaleString("en-AU")}
        >
          {relativeTime(entry.timestamp)}
        </time>
      </div>

      {entry.diff && (
        <div className={styles.diff} role="group" aria-label="Change diff">
          <span className={styles.diffBefore}>{entry.diff.before}</span>
          <span className={styles.diffArrow} aria-hidden="true">
            →
          </span>
          <span className={styles.diffAfter}>{entry.diff.after}</span>
        </div>
      )}
    </article>
  )
}

export default AuditLogRow
