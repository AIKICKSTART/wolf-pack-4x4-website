import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import {
  SERVICE_STATUS_LABEL,
  SERVICE_STATUS_TONE,
  formatKm,
  type ServiceItemStatus,
} from "./vehicle-data-types"
import styles from "./service-interval-timeline.module.css"

export interface ServiceInterval {
  id: string
  /** Service item label (e.g. "Engine oil"). */
  label: string
  /** Interval at which the item is replaced (km). */
  intervalKm: number
  /** Current odometer at the time the timeline was drawn. */
  currentOdometerKm: number
  /** Odometer reading at last replacement. */
  lastDoneKm: number
  /** Optional override status (otherwise derived from current vs. interval). */
  status?: ServiceItemStatus
  /** Brand/spec note (e.g. "Penrite 10W-40 full-synthetic"). */
  spec?: string
}

interface ServiceIntervalTimelineProps {
  intervals: ReadonlyArray<ServiceInterval>
  className?: string
}

function deriveStatus(
  interval: ServiceInterval,
): ServiceItemStatus {
  if (interval.status) {
    return interval.status
  }
  const used = Math.max(0, interval.currentOdometerKm - interval.lastDoneKm)
  const ratio = interval.intervalKm > 0 ? used / interval.intervalKm : 0
  if (ratio >= 1) return "due"
  if (ratio >= 0.85) return "soon"
  if (ratio <= 0.05) return "complete"
  return "scheduled"
}

function nextDueAt(interval: ServiceInterval): number {
  return interval.lastDoneKm + interval.intervalKm
}

export function ServiceIntervalTimeline({
  intervals,
  className,
}: ServiceIntervalTimelineProps) {
  const classes = [styles.timeline, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Service interval timeline">
      <header className={styles.head}>
        <span className={styles.kicker}>Service intervals</span>
        <h2 className={styles.title}>Next due by odometer</h2>
      </header>
      <ol className={styles.list}>
        {intervals.map((interval) => {
          const status = deriveStatus(interval)
          const used = Math.max(0, interval.currentOdometerKm - interval.lastDoneKm)
          const remaining = Math.max(0, interval.intervalKm - used)
          const nextDue = nextDueAt(interval)
          const ratio = interval.intervalKm > 0 ? Math.min(1, used / interval.intervalKm) : 0
          return (
            <li key={interval.id} className={styles.item} data-status={status}>
              <span className={styles.marker} aria-hidden="true" />
              <div className={styles.itemHead}>
                <h3 className={styles.itemLabel}>{interval.label}</h3>
                <Chip
                  label={SERVICE_STATUS_LABEL[status]}
                  tone={SERVICE_STATUS_TONE[status]}
                />
              </div>
              <ProgressLinear
                value={ratio}
                max={1}
                tone={
                  status === "due"
                    ? "red"
                    : status === "soon"
                      ? "amber"
                      : status === "complete"
                        ? "green"
                        : "teal"
                }
                variant="solid"
                showLabel={false}
                label={`${formatKm(used)} of ${formatKm(interval.intervalKm)} interval used`}
              />
              <dl className={styles.meta}>
                <div>
                  <dt>Interval</dt>
                  <dd>{formatKm(interval.intervalKm)}</dd>
                </div>
                <div>
                  <dt>Last done</dt>
                  <dd>{formatKm(interval.lastDoneKm)}</dd>
                </div>
                <div>
                  <dt>Next due</dt>
                  <dd>{formatKm(nextDue)}</dd>
                </div>
                <div>
                  <dt>Remaining</dt>
                  <dd>{formatKm(remaining)}</dd>
                </div>
              </dl>
              {interval.spec ? <p className={styles.spec}>{interval.spec}</p> : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default ServiceIntervalTimeline
