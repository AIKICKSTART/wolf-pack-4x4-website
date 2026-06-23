import { CountUp } from "../primitives/count-up"
import { Sparkline } from "../charts/sparkline"
import type { SparklineTone } from "../charts/sparkline"
import styles from "./live-counter-card.module.css"

interface LiveCounterCardProps {
  label: string
  value: number
  unit?: string
  prefix?: string
  decimals?: number
  subhead?: string
  sparkPoints: ReadonlyArray<number>
  sparkTone?: SparklineTone
  meta?: string
  source?: string
  duration?: number
  className?: string
}

export function LiveCounterCard({
  label,
  value,
  unit,
  prefix,
  decimals = 0,
  subhead,
  sparkPoints,
  sparkTone = "teal",
  meta,
  source,
  duration = 1600,
  className,
}: LiveCounterCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes}>
      <header className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.livePill} aria-label="Live data stream">
          <span aria-hidden="true" />
          Live · 1Hz
        </span>
      </header>
      <div>
        <CountUp
          to={value}
          prefix={prefix}
          decimals={decimals}
          duration={duration}
          ariaLabel={`${prefix ?? ""}${value}${unit ? ` ${unit}` : ""}`}
        />
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      {subhead && <p className={styles.subhead}>{subhead}</p>}
      <div className={styles.spark}>
        <Sparkline
          points={[...sparkPoints]}
          tone={sparkTone}
          ariaLabel={`Trend for ${label} over ${sparkPoints.length} samples`}
          width={320}
          height={60}
        />
      </div>
      <div className={styles.footer}>
        {meta && <span>{meta}</span>}
        {source && <span>{source}</span>}
      </div>
    </article>
  )
}

export default LiveCounterCard
