import { LiveCounterCard } from "../data-display/live-counter-card"
import { formatAud } from "./workshop-floor-types"
import styles from "./live-revenue-pulse.module.css"

export interface LiveRevenuePulseProps {
  /** Total AUD billed so far today. */
  todayAud: number
  /** Jobs completed (handed back to customer) today. */
  jobsCompleted: number
  /** Yesterday's equivalent for delta context. */
  yesterdayAud: number
  /** Hour-by-hour trend, ten samples covering 7:00 → 5:00 pm. */
  trend: ReadonlyArray<number>
  className?: string
}

export function LiveRevenuePulse({
  todayAud,
  jobsCompleted,
  yesterdayAud,
  trend,
  className,
}: LiveRevenuePulseProps) {
  const classes = [styles.pulse, className].filter(Boolean).join(" ")
  const delta = todayAud - yesterdayAud
  const deltaPct = yesterdayAud === 0 ? 0 : (delta / yesterdayAud) * 100
  const deltaLabel = `${delta >= 0 ? "+" : "−"}${formatAud(Math.abs(delta), 0)} vs yesterday (${deltaPct.toFixed(1)}%)`

  return (
    <section className={classes} aria-label="Live revenue pulse">
      <LiveCounterCard
        label="Today · AUD billed"
        value={todayAud}
        prefix="$"
        subhead={deltaLabel}
        sparkPoints={trend}
        sparkTone={delta >= 0 ? "green" : "red"}
        meta={`${jobsCompleted} jobs completed`}
        source="POS · invoice stream"
      />
    </section>
  )
}

export default LiveRevenuePulse
