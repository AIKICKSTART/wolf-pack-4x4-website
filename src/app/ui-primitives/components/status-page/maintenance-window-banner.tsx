import {
  MAINTENANCE_PHASE_LABEL,
  MAINTENANCE_PHASE_TONE,
  type MaintenancePhase,
  type StatusTone,
} from "./status-types"
import styles from "./maintenance-window-banner.module.css"

export interface MaintenanceWindowBannerProps {
  title: string
  phase: MaintenancePhase
  startsAt: string
  endsAt: string
  impactSummary: string
  /** Optional services that will be affected. */
  affectedServices?: ReadonlyArray<string>
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

export function MaintenanceWindowBanner({
  title,
  phase,
  startsAt,
  endsAt,
  impactSummary,
  affectedServices,
  className,
}: MaintenanceWindowBannerProps) {
  const tone = MAINTENANCE_PHASE_TONE[phase]
  const isActive = phase === "in-progress"
  const classes = [styles.banner, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  return (
    <aside
      className={classes}
      role={isActive ? "alert" : "status"}
      aria-label={`Maintenance window — ${title}`}
    >
      <div className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M14.7 6.3a3.5 3.5 0 0 0-4.6 4.6l-5.4 5.4 2 2 5.4-5.4a3.5 3.5 0 0 0 4.6-4.6l-2 2-2-2 2-2z" />
        </svg>
      </div>
      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.chip}>{MAINTENANCE_PHASE_LABEL[phase]}</span>
          <h3 className={styles.title}>{title}</h3>
        </header>
        <p className={styles.summary}>{impactSummary}</p>
        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt>Starts</dt>
            <dd>{startsAt}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt>Ends</dt>
            <dd>{endsAt}</dd>
          </div>
          {affectedServices && affectedServices.length > 0 ? (
            <div className={styles.metaItem}>
              <dt>Services</dt>
              <dd className={styles.services}>
                {affectedServices.join(" · ")}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </aside>
  )
}

export default MaintenanceWindowBanner
