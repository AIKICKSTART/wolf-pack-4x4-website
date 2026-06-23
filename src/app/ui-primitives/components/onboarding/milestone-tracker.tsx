import styles from "./milestone-tracker.module.css"

export type MilestoneStatus = "complete" | "current" | "upcoming"

export interface Milestone {
  id: string
  /** Short label, e.g. "Workshop". */
  label: string
  /** Secondary line below the label. */
  caption: string
  status: MilestoneStatus
}

interface MilestoneTrackerProps {
  /** Eyebrow label, e.g. "Activation". */
  kicker?: string
  /** Bigger heading above the rail. */
  title?: string
  milestones: ReadonlyArray<Milestone>
  /** ARIA label for the progressbar element. */
  progressLabel?: string
  className?: string
}

function computeIndex(milestones: ReadonlyArray<Milestone>): number {
  const currentIndex = milestones.findIndex((m) => m.status === "current")
  if (currentIndex >= 0) {
    return currentIndex
  }
  let lastComplete = -1
  milestones.forEach((m, i) => {
    if (m.status === "complete") {
      lastComplete = i
    }
  })
  return lastComplete
}

function computePercent(milestones: ReadonlyArray<Milestone>): number {
  if (milestones.length <= 1) {
    return milestones[0]?.status === "complete" ? 100 : 0
  }
  const index = computeIndex(milestones)
  if (index < 0) {
    return 0
  }
  return Math.round((index / (milestones.length - 1)) * 100)
}

export function MilestoneTracker({
  kicker,
  title,
  milestones,
  progressLabel = "Activation progress",
  className,
}: MilestoneTrackerProps) {
  const percent = computePercent(milestones)
  const currentIndex = computeIndex(milestones)
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title ?? progressLabel}>
      {(kicker || title) && (
        <header className={styles.head}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          {title ? <h3 className={styles.title}>{title}</h3> : null}
        </header>
      )}
      <div
        className={styles.rail}
        role="progressbar"
        aria-label={progressLabel}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.trackTrack} aria-hidden="true" />
        <div
          className={styles.trackFill}
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
        <ol className={styles.dots}>
          {milestones.map((milestone, index) => {
            const dotClasses = [
              styles.dot,
              styles[`dot_${milestone.status}`],
              index === currentIndex ? styles.dotCurrent : null,
            ]
              .filter(Boolean)
              .join(" ")
            return (
              <li key={milestone.id} className={styles.dotCell}>
                <span className={dotClasses}>
                  <span className={styles.dotInner} aria-hidden="true">
                    {milestone.status === "complete" ? (
                      <svg viewBox="0 0 12 12" width="10" height="10">
                        <path
                          d="M2 6 L5 9 L10 3"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span className={styles.dotNumber}>{index + 1}</span>
                    )}
                  </span>
                </span>
                <span className={styles.dotLabel}>{milestone.label}</span>
                <span className={styles.dotCaption}>{milestone.caption}</span>
                {index === currentIndex ? (
                  <span className={styles.youHere} aria-label="You are here">
                    You are here
                  </span>
                ) : null}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default MilestoneTracker
