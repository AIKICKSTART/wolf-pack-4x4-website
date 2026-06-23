import {
  SERVICE_STATUS_LABEL,
  SERVICE_STATUS_TONE,
  type ServiceStatus,
  type StatusTone,
} from "./status-types"
import styles from "./service-status-row.module.css"

export interface UptimeDay {
  /** ISO date string, e.g. "2026-05-27". */
  date: string
  /** 0..1 fraction of the day spent in a healthy state. */
  uptime: number
  status: ServiceStatus
}

export interface ServiceStatusRowProps {
  name: string
  description?: string
  status: ServiceStatus
  /** Most recent 90 days, oldest first. */
  days: ReadonlyArray<UptimeDay>
  /** Pre-computed 90-day uptime percentage, e.g. 99.987. */
  uptimePercent: number
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

function formatUptime(percent: number): string {
  if (percent >= 99.99) return `${percent.toFixed(3)}%`
  if (percent >= 99) return `${percent.toFixed(2)}%`
  return `${percent.toFixed(1)}%`
}

export function ServiceStatusRow({
  name,
  description,
  status,
  days,
  uptimePercent,
  className,
}: ServiceStatusRowProps) {
  const statusTone = SERVICE_STATUS_TONE[status]
  const classes = [styles.row, TONE_CLASS[statusTone], className]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${name} status — ${SERVICE_STATUS_LABEL[status]}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <h3 className={styles.name}>{name}</h3>
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </div>
        <span className={[styles.chip, TONE_CLASS[statusTone]].join(" ")}>
          <span className={styles.chipDot} aria-hidden="true" />
          {SERVICE_STATUS_LABEL[status]}
        </span>
      </header>

      <div
        className={styles.gridWrap}
        aria-label={`90-day uptime for ${name}: ${formatUptime(uptimePercent)}`}
      >
        <ol className={styles.dayGrid}>
          {days.map((day) => {
            const tone = SERVICE_STATUS_TONE[day.status]
            return (
              <li
                key={day.date}
                className={[styles.day, TONE_CLASS[tone]].join(" ")}
                title={`${day.date} · ${SERVICE_STATUS_LABEL[day.status]} · ${(day.uptime * 100).toFixed(2)}%`}
              />
            )
          })}
        </ol>
        <div className={styles.gridFoot}>
          <span className={styles.gridFootLabel}>90 days ago</span>
          <span className={styles.gridFootMeta}>{formatUptime(uptimePercent)} uptime</span>
          <span className={styles.gridFootLabel}>Today</span>
        </div>
      </div>
    </article>
  )
}

export default ServiceStatusRow
