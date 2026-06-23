import { Avatar } from "../primitives/avatar"
import type { AvatarTone } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import {
  BAY_LABEL,
  SHIFT_STATUS_LABEL,
  type BayId,
  type ShiftStatus,
} from "./roster-types"
import styles from "./technician-profile-card.module.css"

export interface CertificationChip {
  label: string
  tone?: ChipTone
}

export interface TechnicianProfileCardProps {
  name: string
  role: string
  avatarSrc?: string
  avatarTone?: AvatarTone
  /** Certifications shown as a row of chips. */
  certifications: ReadonlyArray<CertificationChip>
  /** Bays this technician is rostered onto today. */
  bays: ReadonlyArray<BayId>
  status: ShiftStatus
  /** Optional secondary line under the role — e.g. "Apprentice year 3 · 18 mo logged". */
  meta?: string
  className?: string
}

const STATUS_TONE: Record<ShiftStatus, ChipTone> = {
  "on-shift": "green",
  "on-break": "amber",
  "off-shift": "neutral",
  "annual-leave": "teal",
  "sick-leave": "red",
  training: "amber",
}

export function TechnicianProfileCard({
  name,
  role,
  avatarSrc,
  avatarTone = "amber",
  certifications,
  bays,
  status,
  meta,
  className,
}: TechnicianProfileCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Technician profile, ${name}`}>
      <header className={styles.identity}>
        <Avatar name={name} src={avatarSrc} tone={avatarTone} size="lg" status="online" />
        <div className={styles.identityText}>
          <strong className={styles.name}>{name}</strong>
          <span className={styles.role}>{role}</span>
          {meta ? <span className={styles.meta}>{meta}</span> : null}
        </div>
        <Chip label={SHIFT_STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
      </header>

      <section className={styles.section} aria-label="Certifications">
        <span className={styles.sectionKicker}>Certifications</span>
        <div className={styles.chipRow}>
          {certifications.map((cert) => (
            <Chip key={cert.label} label={cert.label} tone={cert.tone ?? "teal"} />
          ))}
        </div>
      </section>

      <section className={styles.section} aria-label="Assigned bays">
        <span className={styles.sectionKicker}>Bays today</span>
        <div className={styles.bayRow}>
          {bays.map((bay) => (
            <span key={bay} className={styles.bayTag}>
              {BAY_LABEL[bay]}
            </span>
          ))}
        </div>
      </section>
    </article>
  )
}

export default TechnicianProfileCard
