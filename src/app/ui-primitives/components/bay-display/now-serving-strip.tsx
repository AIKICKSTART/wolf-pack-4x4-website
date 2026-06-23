import { Wrench } from "lucide-react"

import { Marquee } from "../primitives/marquee"
import { BAY_LABEL } from "../roster/roster-types"
import {
  BAY_STATUS_LABEL,
  type BayDisplayStatus,
  type BayId,
} from "./bay-display-types"
import styles from "./now-serving-strip.module.css"

export interface NowServingJob {
  id: string
  bay: BayId
  vehicle: string
  status: BayDisplayStatus
}

export interface NowServingStripProps {
  jobs: ReadonlyArray<NowServingJob>
  /** Marquee speed — px per second-ish. Lower for distance reading. */
  speed?: number
  className?: string
}

export function NowServingStrip({
  jobs,
  speed = 32,
  className,
}: NowServingStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label="Now serving ticker"
    >
      <span className={styles.label}>
        <Wrench size={18} strokeWidth={2.4} aria-hidden="true" />
        Now serving
      </span>
      <div className={styles.scroll}>
        <Marquee
          speed={speed}
          pauseOnHover
          gap={64}
          fadeEdges={false}
          ariaLabel="Live jobs on the floor"
        >
          {jobs.map((job, index) => (
            <span key={job.id} className={styles.item}>
              <strong className={styles.bay}>{BAY_LABEL[job.bay]}</strong>
              <span className={styles.vehicle}>{job.vehicle}</span>
              <span className={styles.status} data-status={job.status}>
                {BAY_STATUS_LABEL[job.status]}
              </span>
              {index < jobs.length - 1 && (
                <span className={styles.dot} aria-hidden="true">
                  ★
                </span>
              )}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export default NowServingStrip
