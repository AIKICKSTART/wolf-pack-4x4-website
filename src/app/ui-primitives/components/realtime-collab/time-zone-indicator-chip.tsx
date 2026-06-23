import { Globe } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import type { CollabUser } from "./realtime-collab-types"
import styles from "./time-zone-indicator-chip.module.css"

interface TimeZoneIndicatorChipProps {
  /** Person whose timezone is rendered. */
  user: CollabUser
  /** Their localised current time e.g. "14:32". */
  localTime: string
  /** Their timezone shortname e.g. "AEST". */
  timezoneLabel: string
  /** Relative offset to viewer e.g. "+3h" or "-30m" or "Same TZ". */
  offsetFromMe: string
  /** Optional avatar visibility — defaults to true. */
  showAvatar?: boolean
  className?: string
}

export function TimeZoneIndicatorChip({
  user,
  localTime,
  timezoneLabel,
  offsetFromMe,
  showAvatar = true,
  className,
}: TimeZoneIndicatorChipProps) {
  const classes = [styles.chip, className].filter(Boolean).join(" ")
  const ariaLabel = `${user.name} local time ${localTime} ${timezoneLabel}, ${offsetFromMe} from you`

  return (
    <span className={classes} role="img" aria-label={ariaLabel}>
      {showAvatar ? (
        <span className={styles.avatar}>
          <Avatar
            name={user.name}
            src={user.avatar}
            size="sm"
            tone={user.tone ?? "obsidian"}
          />
        </span>
      ) : (
        <span className={styles.iconWrap} aria-hidden="true">
          <Globe size={12} strokeWidth={2.4} />
        </span>
      )}
      <span className={styles.copy}>
        <span className={styles.name}>{user.name}</span>
        <span className={styles.time}>
          <strong>{localTime}</strong>
          <span className={styles.tz}>{timezoneLabel}</span>
        </span>
      </span>
      <span className={styles.offset} aria-hidden="true">
        {offsetFromMe}
      </span>
    </span>
  )
}

export default TimeZoneIndicatorChip
