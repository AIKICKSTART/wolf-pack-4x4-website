import { Avatar } from "../primitives/avatar"
import type { CollabUser, PresenceStatus } from "./realtime-collab-types"
import { PRESENCE_LABEL } from "./realtime-collab-types"
import styles from "./presence-avatar-stack.module.css"

export type PresenceStackSize = "sm" | "md" | "lg"

interface PresenceAvatarStackProps {
  /** Currently-online users, rendered left to right. */
  users: ReadonlyArray<CollabUser>
  /** Max avatars rendered before overflow chip kicks in. */
  max?: number
  /** Avatar size. */
  size?: PresenceStackSize
  /** Accessible label override. */
  ariaLabel?: string
  className?: string
}

const SIZE_TO_AVATAR: Record<PresenceStackSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
}

const TONE_BORDER: Record<PresenceStatus, string> = {
  online: styles.borderOnline,
  idle: styles.borderIdle,
  offline: styles.borderOffline,
  busy: styles.borderBusy,
}

function presenceSummary(users: ReadonlyArray<CollabUser>): string {
  const names = users.map((user) => user.name).join(", ")
  if (users.length === 0) {
    return "No collaborators online"
  }
  return `${users.length} collaborator${users.length === 1 ? "" : "s"} online: ${names}`
}

export function PresenceAvatarStack({
  users,
  max = 4,
  size = "md",
  ariaLabel,
  className,
}: PresenceAvatarStackProps) {
  const visible = users.slice(0, max)
  const overflowCount = Math.max(users.length - visible.length, 0)
  const classes = [styles.stack, styles[`size_${size}`], className]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      className={classes}
      role="group"
      aria-label={ariaLabel ?? presenceSummary(users)}
    >
      <span aria-live="polite" aria-atomic="true" className={styles.live}>
        {presenceSummary(users)}
      </span>
      {visible.map((user) => {
        const status = user.status ?? "online"
        const borderClass = TONE_BORDER[status]
        const title = `${user.name} · ${PRESENCE_LABEL[status]}`
        return (
          <span
            key={user.id}
            className={`${styles.slot} ${borderClass}`}
            title={title}
            data-status={status}
          >
            <Avatar
              name={user.name}
              src={user.avatar}
              size={SIZE_TO_AVATAR[size]}
              tone={user.tone ?? "obsidian"}
            />
          </span>
        )
      })}
      {overflowCount > 0 && (
        <span
          className={`${styles.slot} ${styles.overflow}`}
          aria-label={`${overflowCount} more online`}
        >
          +{overflowCount}
        </span>
      )}
    </div>
  )
}

export default PresenceAvatarStack
