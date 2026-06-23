import styles from "./profile-completion-meter.module.css"

export interface ProfileField {
  id: string
  /** Short label, e.g. "ABN". */
  label: string
  /** Whether the field is filled. */
  filled: boolean
}

export type MeterOrientation = "vertical" | "horizontal"

interface ProfileCompletionMeterProps {
  /** Eyebrow label. */
  kicker?: string
  /** Big headline / title. */
  title: string
  fields: ReadonlyArray<ProfileField>
  /** Layout direction. */
  orientation?: MeterOrientation
  /** Optional CTA for the "complete remaining" button. */
  completeHref?: string
  /** Optional CTA label. */
  completeLabel?: string
  className?: string
}

function computeCounts(fields: ReadonlyArray<ProfileField>): {
  filled: number
  total: number
  percent: number
  missing: ReadonlyArray<ProfileField>
} {
  const total = fields.length
  const filled = fields.filter((f) => f.filled).length
  const percent = total > 0 ? Math.round((filled / total) * 100) : 0
  const missing = fields.filter((f) => !f.filled)
  return { filled, total, percent, missing }
}

export function ProfileCompletionMeter({
  kicker = "Profile",
  title,
  fields,
  orientation = "horizontal",
  completeHref,
  completeLabel = "Complete profile",
  className,
}: ProfileCompletionMeterProps) {
  const { filled, total, percent, missing } = computeCounts(fields)
  const classes = [
    styles.card,
    orientation === "vertical" ? styles.vertical : styles.horizontal,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>
          <strong>{filled}</strong>
          <span aria-hidden="true">/</span>
          <span>{total} fields</span>
        </p>
      </header>

      <div
        className={styles.meterTrack}
        role="progressbar"
        aria-label={`${title} — ${percent}% complete`}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span
          className={styles.meterFill}
          style={
            orientation === "vertical"
              ? { height: `${percent}%` }
              : { width: `${percent}%` }
          }
          aria-hidden="true"
        />
        <span className={styles.meterValue}>{percent}%</span>
      </div>

      {missing.length > 0 ? (
        <div className={styles.missingWrap}>
          <span className={styles.missingLabel}>Still missing</span>
          <ul className={styles.missingList}>
            {missing.map((field) => (
              <li key={field.id} className={styles.missingChip}>
                {field.label}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.allDone}>All fields complete — nice work.</p>
      )}

      {missing.length > 0 && completeHref ? (
        <a className={styles.completeCta} href={completeHref}>
          {completeLabel}
          <span aria-hidden="true">→</span>
        </a>
      ) : null}
    </section>
  )
}

export default ProfileCompletionMeter
