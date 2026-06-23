import {
  CheckSquare,
  CircleSlash,
  History,
  PencilLine,
  Sparkles,
  Undo2,
} from "lucide-react"

import {
  AUDIT_EVENT_LABEL,
  AUDIT_EVENT_TONE,
  type EngineAuditEvent,
  type EngineTone,
} from "./workflow-engine-types"
import styles from "./audit-trail-rail.module.css"

/** A single audit entry rendered on the rail. */
export interface AuditTrailEntry {
  id: string
  /** Event kind discriminator. */
  event: EngineAuditEvent
  /** Actor display name — operator who took the action. */
  actor: string
  /** Actor role / team. */
  actorRole: string
  /** Timestamp label — e.g. "2026-05-28 16:42 AEST". */
  timestamp: string
  /** Short human-friendly description of what happened. */
  summary: string
  /** Optional version tag. */
  versionTag?: string
}

interface AuditTrailRailProps {
  title?: string
  /** Optional kicker — workflow scope. */
  kicker?: string
  /** Chronologically ordered entries (most recent first). */
  entries: ReadonlyArray<AuditTrailEntry>
  className?: string
}

const TONE_VAR: Record<EngineTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-violet)",
}

const EVENT_ICON: Record<EngineAuditEvent, typeof Sparkles> = {
  created: Sparkles,
  edited: PencilLine,
  published: Sparkles,
  disabled: CircleSlash,
  approved: CheckSquare,
  reverted: Undo2,
}

export function AuditTrailRail({
  title = "Audit trail",
  kicker = "Workflow history",
  entries,
  className,
}: AuditTrailRailProps) {
  const classes = [styles.rail, className].filter(Boolean).join(" ")
  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <History size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.countChip}>
          {entries.length} entr{entries.length === 1 ? "y" : "ies"}
        </span>
      </header>

      <ol className={styles.entries} aria-label="Audit entries">
        {entries.map((entry, idx) => {
          const tone = AUDIT_EVENT_TONE[entry.event]
          const Icon = EVENT_ICON[entry.event]
          const isLast = idx === entries.length - 1
          return (
            <li
              key={entry.id}
              className={styles.entry}
              data-last={isLast ? "true" : "false"}
              style={
                {
                  "--entry-tone": TONE_VAR[tone],
                } as Record<string, string>
              }
            >
              <span className={styles.rule} aria-hidden="true" />
              <span className={styles.bullet} aria-hidden="true">
                <Icon size={11} strokeWidth={2.4} />
              </span>
              <div className={styles.entryBody}>
                <header className={styles.entryHead}>
                  <span className={styles.eventChip}>
                    {AUDIT_EVENT_LABEL[entry.event]}
                  </span>
                  {entry.versionTag ? (
                    <span className={styles.versionTag}>
                      {entry.versionTag}
                    </span>
                  ) : null}
                  <span className={styles.timestamp}>{entry.timestamp}</span>
                </header>
                <p className={styles.summary}>{entry.summary}</p>
                <footer className={styles.actor}>
                  <span className={styles.actorName}>{entry.actor}</span>
                  <span className={styles.actorRole}>{entry.actorRole}</span>
                </footer>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default AuditTrailRail
