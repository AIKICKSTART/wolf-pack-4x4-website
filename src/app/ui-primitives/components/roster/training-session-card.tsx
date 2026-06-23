import { GraduationCap, Users } from "lucide-react"

import { DashboardCard } from "../data-display/dashboard-card"
import { Chip } from "../primitives/chip"
import styles from "./training-session-card.module.css"

export interface TrainingMaterial {
  label: string
  href: string
}

interface TrainingSessionCardProps {
  topic: string
  /** Trainer's name + role suffix, e.g. "Sophie Tan · Workshop Mgr". */
  trainer: string
  /** Date label, e.g. "Wed 12 Jun · 14:00". */
  dateLabel: string
  /** Number of confirmed attendees. */
  attendeeCount: number
  /** Optional capacity used for the "X / Y attending" line. */
  capacity?: number
  /** Optional list of linked materials. */
  materials?: ReadonlyArray<TrainingMaterial>
  /** Optional secondary detail, e.g. duration or location. */
  detail?: string
  className?: string
}

export function TrainingSessionCard({
  topic,
  trainer,
  dateLabel,
  attendeeCount,
  capacity,
  materials,
  detail,
  className,
}: TrainingSessionCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const attendeeLabel = capacity
    ? `${attendeeCount} / ${capacity} attending`
    : `${attendeeCount} attending`

  return (
    <div className={classes}>
      <DashboardCard
        label="Training"
        value={topic}
        meta={dateLabel}
        icon={<GraduationCap size={18} strokeWidth={2.2} aria-hidden="true" />}
        surface="glass"
      />
      <section className={styles.body}>
        <div className={styles.metaRow}>
          <Chip
            icon={<Users size={11} strokeWidth={2.4} aria-hidden="true" />}
            label={attendeeLabel}
            tone="teal"
          />
          <span className={styles.trainer}>{trainer}</span>
        </div>
        {detail ? <p className={styles.detail}>{detail}</p> : null}
        {materials && materials.length > 0 ? (
          <ul className={styles.materials}>
            {materials.map((material) => (
              <li key={material.href}>
                <a href={material.href} className={styles.material}>
                  {material.label}
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  )
}

export default TrainingSessionCard
