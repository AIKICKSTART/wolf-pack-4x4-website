import Image from "next/image"

import styles from "./avatar.module.css"

export type AvatarSize = "sm" | "md" | "lg" | "xl"
export type AvatarTone = "red" | "amber" | "teal" | "green" | "obsidian"
export type AvatarStatus = "online" | "away" | "busy" | "offline"

interface AvatarProps {
  name: string
  src?: string
  size?: AvatarSize
  tone?: AvatarTone
  status?: AvatarStatus
  className?: string
}

const SIZE_CLASS: Record<AvatarSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
}

const TONE_CLASS: Record<AvatarTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  obsidian: styles.toneObsidian,
}

const STATUS_CLASS: Record<AvatarStatus, string> = {
  online: styles.statusOnline,
  away: styles.statusAway,
  busy: styles.statusBusy,
  offline: styles.statusOffline,
}

const STATUS_LABEL: Record<AvatarStatus, string> = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
}

const SIZE_PX: Record<AvatarSize, number> = {
  sm: 28,
  md: 40,
  lg: 56,
  xl: 80,
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return "?"
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function Avatar({
  name,
  src,
  size = "md",
  tone = "obsidian",
  status,
  className,
}: AvatarProps) {
  const classes = [styles.avatar, SIZE_CLASS[size], TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")
  const dimension = SIZE_PX[size]

  return (
    <span className={classes} role="img" aria-label={status ? `${name}, ${STATUS_LABEL[status]}` : name}>
      {src ? (
        <Image
          src={src}
          alt=""
          width={dimension}
          height={dimension}
          className={styles.image}
          unoptimized
        />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {initialsOf(name)}
        </span>
      )}
      {status && (
        <span
          className={`${styles.statusDot} ${STATUS_CLASS[status]}`}
          aria-hidden="true"
        />
      )}
    </span>
  )
}

export default Avatar
