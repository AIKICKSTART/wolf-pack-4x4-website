import { GlassSurface } from "../surfaces/glass-surface"
import { ProgressRadial } from "../primitives/progress-radial"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import type { ProgressRadialTone } from "../primitives/progress-radial"
import type { StatusTone } from "../status-page/status-types"

import styles from "./slo-card.module.css"

export type SloHealth = "healthy" | "at-risk" | "breached"

export interface SloCardProps {
  /** Short SLO name, e.g. "P95 < 300ms". */
  title: string
  service: string
  /** Objective in percent, e.g. 99.95. */
  objective: number
  /** Actual achieved in percent. */
  actual: number
  /** Window label. */
  window: "7d" | "30d" | "90d"
  /** Budget remaining 0..1. */
  budgetRemaining: number
  /** Description of what the SLO measures. */
  description?: string
  className?: string
}

const HEALTH_LABEL: Record<SloHealth, string> = {
  healthy: "Healthy",
  "at-risk": "At risk",
  breached: "Breached",
}

const HEALTH_TONE: Record<SloHealth, StatusTone> = {
  healthy: "green",
  "at-risk": "amber",
  breached: "red",
}

const TONE_CHIP: Record<StatusTone, ChipTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
  violet: "teal",
}

const TONE_RADIAL: Record<StatusTone, ProgressRadialTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "teal",
  violet: "teal",
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

function deriveHealth(actual: number, objective: number, budgetRemaining: number): SloHealth {
  if (actual < objective) return "breached"
  if (budgetRemaining < 0.25) return "at-risk"
  return "healthy"
}

export function SloCard({
  title,
  service,
  objective,
  actual,
  window,
  budgetRemaining,
  description,
  className,
}: SloCardProps) {
  const health = deriveHealth(actual, objective, budgetRemaining)
  const tone: StatusTone = HEALTH_TONE[health]
  const classes = [styles.card, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <article aria-label={`SLO ${title} for ${service}`} data-health={health}>
        <header className={styles.head}>
          <div className={styles.identity}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.service}>{service}</span>
            {description ? <span className={styles.description}>{description}</span> : null}
          </div>
          <Chip label={HEALTH_LABEL[health]} tone={TONE_CHIP[tone]} selected />
        </header>

        <div className={styles.body}>
          <div className={styles.gauge}>
            <ProgressRadial
              value={budgetRemaining * 100}
              tone={TONE_RADIAL[tone]}
              size="lg"
              label="Budget"
              showLabel
            />
          </div>
          <dl className={styles.metrics}>
            <div className={styles.cell}>
              <dt className={styles.cellLabel}>Objective</dt>
              <dd className={styles.cellValue}>
                {objective.toFixed(objective >= 99 ? 3 : 2)}
                <em className={styles.cellUnit}>%</em>
              </dd>
            </div>
            <div className={styles.cell}>
              <dt className={styles.cellLabel}>Actual</dt>
              <dd className={styles.cellValue}>
                {actual.toFixed(actual >= 99 ? 3 : 2)}
                <em className={styles.cellUnit}>%</em>
              </dd>
            </div>
            <div className={styles.cell}>
              <dt className={styles.cellLabel}>Window</dt>
              <dd className={styles.cellValue}>{window}</dd>
            </div>
            <div className={styles.cell}>
              <dt className={styles.cellLabel}>Budget left</dt>
              <dd className={styles.cellValue}>
                {Math.round(budgetRemaining * 100)}
                <em className={styles.cellUnit}>%</em>
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </GlassSurface>
  )
}

export default SloCard
