import {
  REGION_LABEL,
  REGION_SHORT,
  SYNTHETIC_OUTCOME_TONE,
  type RegionId,
  type StatusTone,
  type SyntheticCheckOutcome,
} from "./status-types"
import styles from "./synthetic-check-timeline.module.css"

export interface SyntheticCheckPoint {
  /** Hour 0..23 */
  hour: number
  outcome: SyntheticCheckOutcome
}

export interface SyntheticRegionTrack {
  region: RegionId
  /** One point per hour, ordered. */
  points: ReadonlyArray<SyntheticCheckPoint>
}

export interface SyntheticCheckTimelineProps {
  checkName: string
  tracks: ReadonlyArray<SyntheticRegionTrack>
  className?: string
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

const OUTCOME_LABEL: Record<SyntheticCheckOutcome, string> = {
  pass: "pass",
  fail: "fail",
  timeout: "timeout",
}

export function SyntheticCheckTimeline({
  checkName,
  tracks,
  className,
}: SyntheticCheckTimelineProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Synthetic check timeline — ${checkName}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Synthetic check · 24h</span>
        <h3 className={styles.title}>{checkName}</h3>
      </header>
      <div className={styles.body}>
        <ul className={styles.tracks}>
          {tracks.map((track) => (
            <li key={track.region} className={styles.track}>
              <span className={styles.region}>{REGION_SHORT[track.region]}</span>
              <ol className={styles.row}>
                {track.points.map((p) => {
                  const tone = SYNTHETIC_OUTCOME_TONE[p.outcome]
                  return (
                    <li
                      key={`${track.region}-${p.hour}`}
                      className={[styles.dot, TONE_CLASS[tone]].join(" ")}
                      title={`${REGION_LABEL[track.region]} · ${String(p.hour).padStart(2, "0")}:00 · ${OUTCOME_LABEL[p.outcome]}`}
                    />
                  )
                })}
              </ol>
            </li>
          ))}
        </ul>
        <div className={styles.axis} aria-hidden="true">
          <span className={styles.region}>Hour</span>
          <div className={styles.axisLabels}>
            <span>00</span>
            <span>06</span>
            <span>12</span>
            <span>18</span>
            <span>24</span>
          </div>
        </div>
      </div>
      <footer className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={[styles.dot, styles.toneGreen, styles.legendDot].join(" ")} />
          Pass
        </span>
        <span className={styles.legendItem}>
          <span className={[styles.dot, styles.toneRed, styles.legendDot].join(" ")} />
          Fail
        </span>
        <span className={styles.legendItem}>
          <span className={[styles.dot, styles.toneAmber, styles.legendDot].join(" ")} />
          Timeout
        </span>
      </footer>
    </section>
  )
}

export default SyntheticCheckTimeline
