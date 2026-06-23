import {
  INCIDENT_SEVERITY_LABEL,
  INCIDENT_SEVERITY_TONE,
  INCIDENT_STAGE_LABEL,
  type IncidentSeverity,
  type IncidentStage,
  type StatusTone,
} from "./status-types"
import styles from "./incident-card.module.css"

export interface IncidentUpdate {
  stage: IncidentStage
  /** Human time, e.g. "14:32 AEST". */
  time: string
  message: string
}

export interface IncidentCardProps {
  title: string
  severity: IncidentSeverity
  currentStage: IncidentStage
  /** Affected services / regions, plain strings. */
  scope: ReadonlyArray<string>
  updates: ReadonlyArray<IncidentUpdate>
  startedAt: string
  subscribeHref?: string
  className?: string
}

const ORDER: ReadonlyArray<IncidentStage> = [
  "investigating",
  "identified",
  "monitoring",
  "resolved",
]

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

export function IncidentCard({
  title,
  severity,
  currentStage,
  scope,
  updates,
  startedAt,
  subscribeHref,
  className,
}: IncidentCardProps) {
  const severityTone = INCIDENT_SEVERITY_TONE[severity]
  const currentIndex = ORDER.indexOf(currentStage)
  const classes = [styles.card, TONE_CLASS[severityTone], className]
    .filter(Boolean)
    .join(" ")
  const lastUpdate = updates[updates.length - 1]

  return (
    <article className={classes} aria-label={`Incident — ${title}`}>
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={[styles.chip, TONE_CLASS[severityTone]].join(" ")}>
            {INCIDENT_SEVERITY_LABEL[severity]}
          </span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <span className={styles.startedAt}>Started {startedAt}</span>
      </header>

      <ol
        className={styles.timeline}
        role="status"
        aria-live="polite"
        aria-label="Incident stage timeline"
      >
        {ORDER.map((stage, index) => {
          const reached = index <= currentIndex
          const active = index === currentIndex
          const cls = [
            styles.step,
            reached ? styles.stepReached : "",
            active ? styles.stepActive : "",
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <li key={stage} className={cls}>
              <span className={styles.stepDot} aria-hidden="true" />
              <span className={styles.stepLabel}>{INCIDENT_STAGE_LABEL[stage]}</span>
            </li>
          )
        })}
      </ol>

      <div className={styles.scope}>
        <span className={styles.scopeLabel}>Affected</span>
        <ul className={styles.scopeList}>
          {scope.map((s) => (
            <li key={s} className={styles.scopeChip}>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {lastUpdate ? (
        <div className={styles.lastUpdate}>
          <span className={styles.lastUpdateMeta}>
            {INCIDENT_STAGE_LABEL[lastUpdate.stage]} · {lastUpdate.time}
          </span>
          <p className={styles.lastUpdateMessage}>{lastUpdate.message}</p>
        </div>
      ) : null}

      {subscribeHref ? (
        <footer className={styles.foot}>
          <a className={styles.subscribe} href={subscribeHref}>
            Subscribe to updates <span aria-hidden="true">→</span>
          </a>
        </footer>
      ) : null}
    </article>
  )
}

export default IncidentCard
