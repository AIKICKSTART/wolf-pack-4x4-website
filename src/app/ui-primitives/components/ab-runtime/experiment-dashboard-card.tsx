import { Chip, type ChipTone } from "../primitives/chip"

import {
  ARM_ROLE_LABEL,
  STATUS_LABEL,
  STATUS_TONE,
  formatLiftPercent,
  formatPercent,
  formatSampleSize,
  type AbExperimentArmSummary,
  type AbExperimentStatus,
  type AbRuntimeTone,
} from "./ab-runtime-types"

import styles from "./experiment-dashboard-card.module.css"

const TONE_TO_CHIP: Record<AbRuntimeTone, ChipTone> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

export interface ExperimentDashboardCardProps {
  experimentId: string
  name: string
  hypothesis?: string
  status: AbExperimentStatus
  arms: ReadonlyArray<AbExperimentArmSummary>
  /** Total exposed subjects across all arms. */
  exposed: number
  /** Primary metric label, e.g. "Quote-accept rate". */
  primaryMetricLabel: string
  /** Treatment lift over control, percent. */
  lift?: number
  /** Region tag, e.g. "AU+NZ" or "AU". */
  region?: string
  /** Days elapsed since launch. */
  daysRunning?: number
  className?: string
}

export function ExperimentDashboardCard({
  experimentId,
  name,
  hypothesis,
  status,
  arms,
  exposed,
  primaryMetricLabel,
  lift,
  region,
  daysRunning,
  className,
}: ExperimentDashboardCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const statusTone = TONE_TO_CHIP[STATUS_TONE[status]]
  const liftTone: ChipTone =
    lift === undefined ? "neutral" : lift > 0 ? "green" : lift < 0 ? "red" : "neutral"

  return (
    <section
      className={classes}
      role="region"
      aria-labelledby={`${experimentId}-title`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>
          <span aria-hidden="true">{experimentId}</span>
          <span aria-hidden="true">·</span>
          <span>{STATUS_LABEL[status]}</span>
          {region ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{region}</span>
            </>
          ) : null}
        </span>
        <h2 className={styles.title} id={`${experimentId}-title`}>
          {name}
        </h2>
        {hypothesis ? <p className={styles.hypothesis}>{hypothesis}</p> : null}
      </header>

      <ol
        className={styles.armsList}
        aria-label={`Arms for experiment ${name}`}
      >
        {arms.map((arm) => (
          <li
            key={arm.id}
            className={[styles.arm, arm.isWinner ? styles.armWinner : null]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={styles.armName}>
              {arm.isWinner ? (
                <span
                  className={styles.armWinnerGlyph}
                  aria-label="Current winner"
                >
                  ★
                </span>
              ) : null}
              <span>{arm.name}</span>
              <span className={styles.armRole}>· {ARM_ROLE_LABEL[arm.role]}</span>
            </span>
            <span className={styles.armMetric}>
              {arm.conversionRate !== undefined
                ? formatPercent(arm.conversionRate, 2)
                : "—"}
            </span>
            <span className={styles.armAllocation}>
              {formatPercent(arm.allocation, 0)}
            </span>
          </li>
        ))}
      </ol>

      <div className={styles.chipStrip} aria-label="Experiment chips">
        <Chip
          label={STATUS_LABEL[status]}
          tone={statusTone}
          selected
        />
        <Chip
          label={`Exposed ${formatSampleSize(exposed)}`}
          tone="teal"
        />
        <Chip label={primaryMetricLabel} tone="neutral" />
        {lift !== undefined ? (
          <Chip label={`Lift ${formatLiftPercent(lift)}`} tone={liftTone} />
        ) : null}
        {daysRunning !== undefined ? (
          <Chip label={`Day ${daysRunning}`} tone="neutral" />
        ) : null}
      </div>
    </section>
  )
}

export default ExperimentDashboardCard
