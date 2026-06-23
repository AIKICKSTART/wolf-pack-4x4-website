import type { ReactNode } from "react"

import type { RoleTone } from "./permission-types"
import styles from "./role-badge.module.css"

export type RoleBadgeSize = "sm" | "md" | "lg"

interface RoleBadgeProps {
  /** Role label rendered uppercase. */
  label: string
  /** Optional shortcode like "WM" or "PR" placed before the label. */
  shortCode?: string
  tone?: RoleTone
  size?: RoleBadgeSize
  /** Optional small description rendered under the label. */
  description?: string
  className?: string
}

const TONE_CLASS: Record<RoleTone, string> = {
  owner: styles.toneOwner,
  admin: styles.toneAdmin,
  member: styles.toneMember,
  viewer: styles.toneViewer,
  billing: styles.toneBilling,
  workshop: styles.toneWorkshop,
  guest: styles.toneGuest,
}

const SIZE_CLASS: Record<RoleBadgeSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

function Crown() {
  return (
    <svg viewBox="0 0 18 14" aria-hidden="true">
      <path
        d="M1 12h16M2 3l3 4 4-6 4 6 3-4 1 9H1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Cog() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 1.6v2.2M9 14.2v2.2M3.8 3.8l1.5 1.5M12.7 12.7l1.5 1.5M1.6 9h2.2M14.2 9h2.2M3.8 14.2l1.5-1.5M12.7 5.3l1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Eye() {
  return (
    <svg viewBox="0 0 18 12" aria-hidden="true">
      <path
        d="M1 6s2.8-5 8-5 8 5 8 5-2.8 5-8 5S1 6 1 6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="6" r="2" fill="currentColor" />
    </svg>
  )
}

function Coin() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 5.4v7.2M11 6.8c-.4-.7-1.1-1.2-2-1.2-1.4 0-2.2 1-2.2 1.8s.5 1.4 2.2 1.6c1.7.2 2.2.8 2.2 1.6s-.8 1.8-2.2 1.8c-.9 0-1.6-.5-2-1.2"
        fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function Wrench() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M10.8 4.6a3.4 3.4 0 0 0 4.2 4.2L9.2 14.6 7.4 16.4l-2.4-2.4 1.8-1.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M10.8 4.6a3.4 3.4 0 0 1 4.2 4.2L13 7l-1.4 1.4z"
        fill="currentColor"
      />
    </svg>
  )
}

function Person() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="6.2" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 15.4c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5"
        fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function Ghost() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3.5 15V8a5.5 5.5 0 0 1 11 0v7l-1.8-1.4-1.6 1.4-1.6-1.4L7.9 15l-1.6-1.4L4.7 15z"
        fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="7.4" cy="7.8" r="0.9" fill="currentColor" />
      <circle cx="10.6" cy="7.8" r="0.9" fill="currentColor" />
    </svg>
  )
}

const TONE_ICON: Record<RoleTone, () => ReactNode> = {
  owner: Crown,
  admin: Cog,
  member: Person,
  viewer: Eye,
  billing: Coin,
  workshop: Wrench,
  guest: Ghost,
}

export function RoleBadge({
  label,
  shortCode,
  tone = "member",
  size = "md",
  description,
  className,
}: RoleBadgeProps) {
  const Icon = TONE_ICON[tone]
  const classes = [styles.badge, TONE_CLASS[tone], SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={classes} role="img" aria-label={`Role: ${label}`}>
      <span className={styles.iconWrap} aria-hidden="true">
        <Icon />
      </span>
      <span className={styles.body}>
        {shortCode && <span className={styles.code}>{shortCode}</span>}
        <span className={styles.label}>{label}</span>
      </span>
      {description && <span className={styles.description}>{description}</span>}
    </span>
  )
}

export default RoleBadge
