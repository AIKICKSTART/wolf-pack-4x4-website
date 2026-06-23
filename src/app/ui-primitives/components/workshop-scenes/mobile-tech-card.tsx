import { Clock4, MapPin, MessageSquare, Phone } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import styles from "./mobile-tech-card.module.css"

export type TechStatus = "on-job" | "busy" | "offline"

export interface MobileTechCardProps {
  name: string
  role: string
  avatarSrc?: string
  status: TechStatus
  currentJobNumber: string
  currentJobTitle: string
  /** Address or suburb the tech is heading to / on. */
  currentLocation: string
  /** Minutes until on-site / completion. */
  etaMinutes: number
  /** Distance from depot in km. */
  distanceKm: number
}

const STATUS_LABEL: Record<TechStatus, string> = {
  "on-job": "On job",
  busy: "Travelling",
  offline: "Off shift",
}

const STATUS_STATE_ATTR: Record<TechStatus, string> = {
  "on-job": "on-job",
  busy: "busy",
  offline: "offline",
}

function formatEta(minutes: number): string {
  if (minutes <= 0) return "On site"
  if (minutes < 60) return `ETA ${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (m === 0) return `ETA ${h}h`
  return `ETA ${h}h ${m}m`
}

export function MobileTechCard({
  name,
  role,
  avatarSrc,
  status,
  currentJobNumber,
  currentJobTitle,
  currentLocation,
  etaMinutes,
  distanceKm,
}: MobileTechCardProps) {
  return (
    <article className={styles.card} aria-label={`Mobile tech ${name}`}>
      <header className={styles.head}>
        <Avatar name={name} src={avatarSrc} size="lg" tone="red" />
        <div className={styles.body}>
          <strong className={styles.name}>{name}</strong>
          <span className={styles.role}>{role}</span>
        </div>
        <span
          className={styles.statusPill}
          data-state={STATUS_STATE_ATTR[status]}
        >
          {STATUS_LABEL[status]}
        </span>
      </header>

      <div className={styles.jobBlock}>
        <span className={styles.jobLabel}>Current job · {currentJobNumber}</span>
        <strong className={styles.jobTitle}>{currentJobTitle}</strong>
        <div className={styles.jobMeta}>
          <span className={styles.eta}>
            <Clock4 aria-hidden="true" />
            {formatEta(etaMinutes)}
          </span>
          <span className={styles.distance}>
            <MapPin aria-hidden="true" />
            {distanceKm.toFixed(1)} km · {currentLocation}
          </span>
        </div>
      </div>

      <div className={styles.foot}>
        <button
          type="button"
          className={`${styles.contactBtn} ${styles.contactCall}`}
          aria-label={`Call ${name}`}
        >
          <Phone strokeWidth={2.4} aria-hidden="true" />
          Call
        </button>
        <button
          type="button"
          className={`${styles.contactBtn} ${styles.contactMessage}`}
          aria-label={`Message ${name}`}
        >
          <MessageSquare strokeWidth={2.4} aria-hidden="true" />
          Message
        </button>
      </div>
    </article>
  )
}

export default MobileTechCard
