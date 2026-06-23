"use client"

import { Pencil } from "lucide-react"
import type { ReactNode } from "react"

import { Avatar, type AvatarTone } from "../primitives/avatar"
import { Chip, type ChipTone } from "../primitives/chip"
import styles from "./profile-card.module.css"

export interface ProfileStat {
  label: string
  value: string
  tone?: "neutral" | "amber" | "teal" | "green" | "red"
}

interface ProfileCardProps {
  name: string
  role: string
  email: string
  location?: string
  avatarSrc?: string
  avatarTone?: AvatarTone
  roleChipTone?: ChipTone
  stats?: ReadonlyArray<ProfileStat>
  onEdit?: () => void
  editHref?: string
  editLabel?: string
  actions?: ReactNode
  className?: string
}

const STAT_TONE_CLASS: Record<NonNullable<ProfileStat["tone"]>, string> = {
  neutral: "",
  amber: styles.statAmber,
  teal: styles.statTeal,
  green: styles.statGreen,
  red: styles.statRed,
}

export function ProfileCard({
  name,
  role,
  email,
  location,
  avatarSrc,
  avatarTone = "red",
  roleChipTone = "amber",
  stats,
  onEdit,
  editHref,
  editLabel = "Edit profile",
  actions,
  className,
}: ProfileCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const editControl = onEdit ? (
    <button type="button" className={styles.editBtn} onClick={onEdit} aria-label={editLabel}>
      <Pencil size={12} strokeWidth={2.2} aria-hidden="true" />
      <span>{editLabel}</span>
    </button>
  ) : editHref ? (
    <a className={styles.editBtn} href={editHref} aria-label={editLabel}>
      <Pencil size={12} strokeWidth={2.2} aria-hidden="true" />
      <span>{editLabel}</span>
    </a>
  ) : null

  return (
    <article className={classes} aria-label={`${name} profile`}>
      <header className={styles.head}>
        <Avatar name={name} src={avatarSrc} tone={avatarTone} size="xl" status="online" />
        <div className={styles.identity}>
          <span className={styles.kicker}>Account holder</span>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.metaRow}>
            <Chip label={role} tone={roleChipTone} />
            <span className={styles.email}>{email}</span>
            {location && <span className={styles.dot} aria-hidden="true" />}
            {location && <span className={styles.location}>{location}</span>}
          </div>
        </div>
        {editControl}
      </header>

      {stats && stats.length > 0 && (
        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={[styles.stat, STAT_TONE_CLASS[stat.tone ?? "neutral"]].filter(Boolean).join(" ")}
            >
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {actions && <footer className={styles.actions}>{actions}</footer>}
    </article>
  )
}

export default ProfileCard
