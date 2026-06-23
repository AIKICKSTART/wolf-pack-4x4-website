import {
  AlertTriangle,
  Bell,
  RotateCw,
  ShieldAlert,
  Sparkles,
} from "lucide-react"

import {
  ERROR_ACTION_LABEL,
  ERROR_ACTION_TONE,
  type EngineErrorAction,
  type EngineTone,
} from "./workflow-engine-types"
import styles from "./error-handler-card.module.css"

/** Single configured handler action with optional target chain. */
export interface ErrorHandlerAction {
  id: string
  /** Action discriminator. */
  kind: EngineErrorAction
  /** Action label, e.g. "Send SMS to Eddie", "Rollback quote create". */
  label: string
  /** Sub-label — service / target / step id. */
  target: string
  /** Optional hit count — drives the trailing chip. */
  hits7d?: number
}

interface ErrorHandlerCardProps {
  title: string
  /** Optional kicker, e.g. "Error · refund step". */
  kicker?: string
  /** Step the handler is attached to. */
  attachedTo: string
  /** Pattern matched, e.g. "TwilioError · 4xx", "any" or "regex /timeout/i". */
  matchPattern: string
  /** Severity tone — drives the icon + chip. */
  severity?: EngineTone
  /** Chain of actions to fire on hit. */
  actions: ReadonlyArray<ErrorHandlerAction>
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

const ACTION_ICON: Record<EngineErrorAction, typeof Sparkles> = {
  catch: ShieldAlert,
  compensate: Sparkles,
  alert: Bell,
  retry: RotateCw,
}

export function ErrorHandlerCard({
  title,
  kicker = "Error handler",
  attachedTo,
  matchPattern,
  severity = "red",
  actions,
  className,
}: ErrorHandlerCardProps) {
  const tone = TONE_VAR[severity]
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      style={{ "--card-tone": tone } as Record<string, string>}
      aria-label={`Error handler · ${title}`}
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <AlertTriangle size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.severityChip}>{severity}</span>
      </header>

      <div className={styles.attachRow}>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Attached to</span>
          <code className={styles.fieldValue}>{attachedTo}</code>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Match</span>
          <code className={styles.fieldValue}>{matchPattern}</code>
        </div>
      </div>

      <ol className={styles.actions} aria-label="Handler action chain">
        {actions.map((action, idx) => {
          const actionTone = ERROR_ACTION_TONE[action.kind]
          const Icon = ACTION_ICON[action.kind]
          return (
            <li
              key={action.id}
              className={styles.action}
              style={
                {
                  "--action-tone": TONE_VAR[actionTone],
                } as Record<string, string>
              }
            >
              <span className={styles.actionIndex}>
                {(idx + 1).toString().padStart(2, "0")}
              </span>
              <span className={styles.actionIcon} aria-hidden="true">
                <Icon size={12} strokeWidth={2.4} />
              </span>
              <div className={styles.actionBody}>
                <span className={styles.actionKind}>
                  {ERROR_ACTION_LABEL[action.kind]}
                </span>
                <span className={styles.actionLabel}>{action.label}</span>
                <span className={styles.actionTarget}>{action.target}</span>
              </div>
              {action.hits7d !== undefined ? (
                <span className={styles.hitsChip}>
                  {action.hits7d.toLocaleString()} hits / 7d
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default ErrorHandlerCard
