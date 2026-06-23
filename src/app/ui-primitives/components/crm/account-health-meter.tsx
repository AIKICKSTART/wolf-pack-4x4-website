import type { CSSProperties } from "react"

import styles from "./account-health-meter.module.css"

export interface AccountHealthFactor {
  label: "Recency" | "Frequency" | "Monetary" | "Engagement"
  score: number
}

interface AccountHealthMeterProps {
  score: number
  factors?: ReadonlyArray<AccountHealthFactor>
  className?: string
}

type Tone = "critical" | "watch" | "healthy" | "elite"

function toneOfScore(score: number): Tone {
  if (score < 30) return "critical"
  if (score < 60) return "watch"
  if (score < 90) return "healthy"
  return "elite"
}

const TONE_COLOR: Record<Tone, string> = {
  critical: "var(--primitive-red)",
  watch: "var(--primitive-amber)",
  healthy: "var(--primitive-green)",
  elite: "var(--primitive-teal)",
}

const TONE_LABEL: Record<Tone, string> = {
  critical: "Critical",
  watch: "Watch",
  healthy: "Healthy",
  elite: "Elite",
}

const SIZE = 132
const STROKE = 10
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function AccountHealthMeter({
  score,
  factors,
  className,
}: AccountHealthMeterProps) {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)))
  const tone = toneOfScore(safeScore)
  const ratio = safeScore / 100
  const dashOffset = CIRCUMFERENCE * (1 - ratio)
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <div
        className={styles.meter}
        role="meter"
        aria-valuenow={safeScore}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Account health: ${safeScore} out of 100, ${TONE_LABEL[tone]}`}
        style={{ "--meter-tone": TONE_COLOR[tone] } as CSSProperties}
      >
        <svg
          className={styles.svg}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-hidden="true"
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            className={styles.track}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            className={styles.fill}
          />
        </svg>
        <div className={styles.center}>
          <span className={styles.scoreValue}>{safeScore}</span>
          <span className={styles.scoreScale}>/100</span>
          <span className={styles.toneLabel} data-tone={tone}>
            {TONE_LABEL[tone]}
          </span>
        </div>
      </div>

      {factors && factors.length > 0 ? (
        <ul className={styles.factors}>
          {factors.map((factor) => (
            <li key={factor.label} className={styles.factor}>
              <span className={styles.factorLabel}>{factor.label}</span>
              <span className={styles.factorScore}>{factor.score}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default AccountHealthMeter
