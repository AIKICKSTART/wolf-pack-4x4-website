import styles from "./srm-warning-banner.module.css"

export type SrmSeverity = "warning" | "critical"

export interface SrmArmObservation {
  id: string
  name: string
  /** Allocation expected, percent. */
  expectedPct: number
  /** Observed share, percent. */
  observedPct: number
  /** Observed sample. */
  observed: number
}

export interface SrmWarningBannerProps {
  /** Computed chi-square p-value comparing observed vs expected splits. */
  pValue: number
  /** Per-arm observed vs expected. */
  arms: ReadonlyArray<SrmArmObservation>
  /** Severity bucket — critical paints red, warning paints amber. */
  severity?: SrmSeverity
  /** Optional override for the headline title. */
  title?: string
  /** Optional override for the detail sentence. */
  detail?: string
  className?: string
}

function defaultTitle(severity: SrmSeverity, pValue: number): string {
  return severity === "critical"
    ? `Critical SRM detected · p = ${pValue.toExponential(1)}`
    : `Possible SRM · p = ${pValue.toFixed(3)}`
}

function defaultDetail(arms: ReadonlyArray<SrmArmObservation>): string {
  const worst = arms.reduce<SrmArmObservation | null>((acc, arm) => {
    if (!acc) return arm
    const accDelta = Math.abs(acc.observedPct - acc.expectedPct)
    const armDelta = Math.abs(arm.observedPct - arm.expectedPct)
    return armDelta > accDelta ? arm : acc
  }, null)
  if (!worst) return "Observed allocation diverges from expected."
  const delta = worst.observedPct - worst.expectedPct
  const direction = delta >= 0 ? "over" : "under"
  return `${worst.name} arm is ${Math.abs(delta).toFixed(1)} pp ${direction} expected. Investigate routing or bot filtering.`
}

export function SrmWarningBanner({
  pValue,
  arms,
  severity = "warning",
  title,
  detail,
  className,
}: SrmWarningBannerProps) {
  const isCritical = severity === "critical"
  const classes = [
    styles.banner,
    isCritical ? null : styles.bannerSoft,
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const iconClasses = [styles.icon, isCritical ? null : styles.iconSoft]
    .filter(Boolean)
    .join(" ")
  const kickerClasses = [styles.kicker, isCritical ? null : styles.kickerSoft]
    .filter(Boolean)
    .join(" ")

  const resolvedTitle = title ?? defaultTitle(severity, pValue)
  const resolvedDetail = detail ?? defaultDetail(arms)

  return (
    <aside
      className={classes}
      role="alert"
      aria-live={isCritical ? "assertive" : "polite"}
    >
      <span className={iconClasses} aria-hidden="true">
        !
      </span>
      <div className={styles.body}>
        <span className={kickerClasses}>
          Sample ratio mismatch · {isCritical ? "Critical" : "Warning"}
        </span>
        <p className={styles.title}>{resolvedTitle}</p>
        <p className={styles.detail}>{resolvedDetail}</p>
      </div>
      <div className={styles.stats} aria-label="Observed vs expected">
        {arms.map((arm) => (
          <div key={arm.id} className={styles.stat}>
            <span className={styles.statLabel}>{arm.name}</span>
            <span className={styles.statValue}>
              {arm.observedPct.toFixed(1)}% / {arm.expectedPct.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SrmWarningBanner
