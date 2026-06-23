import { Sparkline } from "../charts/sparkline"
import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./mileage-tracker.module.css"
import { formatOdometer } from "./vehicles-types"

interface MileageTrackerProps {
  currentOdometerKm: number
  /** Service interval (e.g. 15_000). */
  serviceIntervalKm: number
  /** Last service odometer reading. */
  lastServiceKm: number
  /** Recent monthly km sparkline (12 months, oldest → newest). */
  monthlyKm: ReadonlyArray<number>
  /** Predicted km/month going forward — drives the projection chip. */
  projectedMonthlyKm: number
  className?: string
}

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value))
}

export function MileageTracker({
  currentOdometerKm,
  serviceIntervalKm,
  lastServiceKm,
  monthlyKm,
  projectedMonthlyKm,
  className,
}: MileageTrackerProps) {
  const distanceSinceService = Math.max(0, currentOdometerKm - lastServiceKm)
  const ratio = clampPercent((distanceSinceService / serviceIntervalKm) * 100)
  const remainingKm = Math.max(0, serviceIntervalKm - distanceSinceService)
  const monthsUntilService =
    projectedMonthlyKm > 0 ? Math.max(0, Math.round(remainingKm / projectedMonthlyKm)) : Infinity

  const tone: "green" | "amber" | "red" = ratio > 90 ? "red" : ratio > 70 ? "amber" : "green"
  const classes = [styles.tracker, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Mileage tracker">
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Odometer</span>
          <strong className={styles.value}>{formatOdometer(currentOdometerKm)}</strong>
        </div>
        <Chip
          label={
            monthsUntilService === Infinity
              ? "Idle"
              : monthsUntilService === 0
              ? "Service due"
              : `~${monthsUntilService} mo to service`
          }
          tone={tone}
        />
      </header>

      <ProgressLinear
        value={ratio}
        max={100}
        tone={tone}
        variant="segmented"
        segments={20}
        label={`${formatOdometer(distanceSinceService)} since last service · ${formatOdometer(remainingKm)} remaining`}
        showLabel
      />

      <div className={styles.sparkRow}>
        <Sparkline
          points={monthlyKm.map((km) => km)}
          tone={tone}
          width={240}
          height={56}
          ariaLabel={`Monthly distance, last ${monthlyKm.length} months`}
        />
        <dl className={styles.facts}>
          <div>
            <dt>Projected</dt>
            <dd>{new Intl.NumberFormat("en-AU").format(projectedMonthlyKm)} km/mo</dd>
          </div>
          <div>
            <dt>Last service</dt>
            <dd>{formatOdometer(lastServiceKm)}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default MileageTracker
