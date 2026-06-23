import { Check } from "lucide-react"

import styles from "./author-chip.module.css"

export interface AuthorChipProps {
  name: string
  profileHref?: string
  verified?: boolean
  avatarInitials?: string
  className?: string
}

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function AuthorChip({
  name,
  profileHref,
  verified = false,
  avatarInitials,
  className,
}: AuthorChipProps) {
  const classes = [styles.chip, className].filter(Boolean).join(" ")
  const initials = avatarInitials ?? initialsFromName(name)
  const ariaLabel = verified ? `${name}, verified author profile` : `${name} author profile`

  const content = (
    <>
      <span className={styles.avatar} aria-hidden="true">
        {initials}
      </span>
      <span className={styles.label}>
        {name}
        {verified && (
          <span className={styles.verified} aria-label="Verified" title="Verified author">
            <Check size={9} strokeWidth={3} aria-hidden="true" />
          </span>
        )}
      </span>
    </>
  )

  if (profileHref) {
    return (
      <a className={classes} href={profileHref} aria-label={ariaLabel}>
        {content}
      </a>
    )
  }

  return (
    <span className={classes} aria-label={ariaLabel}>
      {content}
    </span>
  )
}

export default AuthorChip
