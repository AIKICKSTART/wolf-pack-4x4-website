import {
  Activity,
  CheckSquare,
  GitBranch,
  Hourglass,
  RotateCw,
  Square,
  Zap,
} from "lucide-react"

import {
  STATUS_LABEL,
  STATUS_TONE,
  STEP_KIND_LABEL,
  STEP_KIND_TONE,
  type EngineStatus,
  type EngineStepKind,
  type EngineTone,
} from "./workflow-engine-types"
import styles from "./step-node-card.module.css"

/**
 * Step node card — the panel rendered when an individual step is inspected
 * away from the canvas. Compact metadata + ports + status — same vocabulary
 * as the in-canvas node but bigger, scannable, and embeddable in inspectors
 * or template detail screens.
 */
interface StepNodeCardProps {
  kind: EngineStepKind
  title: string
  /** Short context strip — workflow + version. */
  kicker?: string
  /** Sub-line — e.g. "Twilio · sms.send" or "expr: refund > 200". */
  subtitle: string
  status: EngineStatus
  /** Optional list of metric chips — "Last run", "Avg 1.4s", "p95 2.8s". */
  metrics?: ReadonlyArray<{ label: string; value: string }>
  /** Optional list of incoming port names — drives the left rail. */
  inputs?: ReadonlyArray<string>
  /** Optional list of outgoing port names — drives the right rail. */
  outputs?: ReadonlyArray<string>
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

const KIND_GLYPH: Record<EngineStepKind, typeof Activity> = {
  action: Activity,
  decision: GitBranch,
  wait: Hourglass,
  parallel: GitBranch,
  loop: RotateCw,
  approval: CheckSquare,
  trigger: Zap,
  end: Square,
}

export function StepNodeCard({
  kind,
  title,
  kicker,
  subtitle,
  status,
  metrics,
  inputs = ["in"],
  outputs = ["out"],
  className,
}: StepNodeCardProps) {
  const tone = status === "idle" ? STEP_KIND_TONE[kind] : STATUS_TONE[status]
  const Icon = KIND_GLYPH[kind]
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      data-status={status}
      data-kind={kind}
      style={{ "--card-tone": TONE_VAR[tone] } as Record<string, string>}
      aria-label={`Step · ${STEP_KIND_LABEL[kind]} · ${title}`}
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Icon size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          <h4 className={styles.title}>{title}</h4>
          <span className={styles.subtitle}>{subtitle}</span>
        </div>
        <span className={styles.kindChip}>
          {STEP_KIND_LABEL[kind]}
        </span>
      </header>

      <div className={styles.statusRow}>
        <span className={styles.statusChip} aria-label={`Status ${STATUS_LABEL[status]}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          {STATUS_LABEL[status]}
        </span>
        {metrics?.map((metric) => (
          <span key={metric.label} className={styles.metricChip}>
            <span className={styles.metricLabel}>{metric.label}</span>
            <span className={styles.metricValue}>{metric.value}</span>
          </span>
        ))}
      </div>

      <div className={styles.ports} aria-label="Step ports">
        <div className={styles.portCol}>
          <span className={styles.portColLabel}>Inputs</span>
          <ul className={styles.portList}>
            {inputs.map((label) => (
              <li key={`in-${label}`} className={styles.portRow}>
                <span className={styles.portDot} data-side="in" aria-hidden="true" />
                <span className={styles.portName}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.portColRight}>
          <span className={styles.portColLabel}>Outputs</span>
          <ul className={styles.portList}>
            {outputs.map((label) => (
              <li key={`out-${label}`} className={styles.portRowRight}>
                <span className={styles.portName}>{label}</span>
                <span className={styles.portDot} data-side="out" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default StepNodeCard
