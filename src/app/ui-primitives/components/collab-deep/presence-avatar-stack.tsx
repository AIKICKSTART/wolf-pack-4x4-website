import { Avatar } from "../primitives/avatar"
import type { CollabUser, CursorTone } from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./presence-avatar-stack.module.css"

export type DeepStackSize = "sm" | "md" | "lg"

interface DeepPresenceAvatarStackProps {
  /** Online collaborators, left → right in render order. */
  users: ReadonlyArray<CollabUser>
  /** Avatar size. */
  size?: DeepStackSize
  /** Max avatars before overflow chip kicks in. */
  max?: number
  /** Optional caption rendered to the right of the stack. */
  caption?: string
  /** Document title these users are present on (for the live region). */
  docTitle?: string
  className?: string
}

const SIZE_TO_AVATAR: Record<DeepStackSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

function summary(users: ReadonlyArray<CollabUser>, docTitle?: string): string {
  if (users.length === 0) {
    return docTitle
      ? `No collaborators on ${docTitle}`
      : "No collaborators present"
  }
  const names = users.map((u) => u.name).join(", ")
  const head = `${users.length} present: ${names}`
  return docTitle ? `${head} on ${docTitle}` : head
}

/** Deep avatar stack — tinted halos per collaborator, optional caption. */
export function PresenceAvatarStack({
  users,
  size = "md",
  max = 4,
  caption,
  docTitle,
  className,
}: DeepPresenceAvatarStackProps) {
  const visible = users.slice(0, max)
  const overflow = Math.max(users.length - visible.length, 0)
  const classes = [styles.row, styles[`size_${size}`], className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes} role="group" aria-label={summary(users, docTitle)}>
      <span className={styles.live} aria-live="polite" aria-atomic="true">
        {summary(users, docTitle)}
      </span>
      <div className={styles.stack} aria-hidden="true">
        {visible.map((user) => (
          <span
            key={user.id}
            className={styles.slot}
            style={{ "--halo": toneHex(user) } as React.CSSProperties}
            data-name={user.name}
          >
            <Avatar
              name={user.name}
              src={user.avatar}
              size={SIZE_TO_AVATAR[size]}
              tone={user.tone ?? "obsidian"}
            />
          </span>
        ))}
        {overflow > 0 && (
          <span className={styles.overflow}>+{overflow}</span>
        )}
      </div>
      {caption && <span className={styles.caption}>{caption}</span>}
    </div>
  )
}

export default PresenceAvatarStack
