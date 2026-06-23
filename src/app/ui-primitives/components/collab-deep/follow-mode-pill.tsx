"use client"

import type { CSSProperties } from "react"

import { Avatar } from "../primitives/avatar"
import type { CollabUser, CursorTone } from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./follow-mode-pill.module.css"

interface FollowModePillProps {
  /** Collaborator the viewer is following. */
  user: CollabUser
  /** Optional sub-label e.g. "tracking cursor" or "Bay 3". */
  detail?: string
  /** "Stop following" handler. */
  onStop?: () => void
  className?: string
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

/** Floating pill: "Following Mia P." with a stop-following affordance. */
export function FollowModePill({
  user,
  detail,
  onStop,
  className,
}: FollowModePillProps) {
  const classes = [styles.pill, className].filter(Boolean).join(" ")
  const style: CSSProperties = {
    "--follow-tint": toneHex(user),
  } as CSSProperties

  return (
    <div
      className={classes}
      style={style}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className={styles.kicker} aria-hidden="true">
        <span className={styles.eye} />
        Follow
      </span>
      <div className={styles.avatarSlot}>
        <Avatar
          name={user.name}
          src={user.avatar}
          size="sm"
          tone={user.tone ?? "obsidian"}
        />
      </div>
      <div className={styles.copy}>
        <span className={styles.line}>
          <span className={styles.lead}>Following</span>{" "}
          <strong className={styles.name}>{user.name}</strong>
        </span>
        {detail && <span className={styles.detail}>{detail}</span>}
      </div>
      <button
        type="button"
        className={styles.stop}
        onClick={onStop}
        aria-label={`Stop following ${user.name}`}
      >
        Stop
      </button>
    </div>
  )
}

export default FollowModePill
