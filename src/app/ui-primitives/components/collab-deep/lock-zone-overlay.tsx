import type { CSSProperties, ReactNode } from "react"

import { Avatar } from "../primitives/avatar"
import type { CollabUser, CursorTone, LockZone } from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX, LOCK_REASON_LABEL } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./lock-zone-overlay.module.css"

interface LockZoneOverlayProps {
  /** Lock state on this zone — pass `null` for unlocked. */
  lock: LockZone
  /** Optional ribbon hint (top-right) e.g. "Auto-unlock in 12s". */
  hint?: string
  /** Optional content the zone wraps. */
  children?: ReactNode
  className?: string
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

/** Translucent overlay placed over a section locked by another collaborator. */
export function LockZoneOverlay({
  lock,
  hint,
  children,
  className,
}: LockZoneOverlayProps) {
  const classes = [styles.zone, className].filter(Boolean).join(" ")
  const tint = toneHex(lock.holder)
  const style: CSSProperties = {
    "--lock-tint": tint,
  } as CSSProperties

  const ariaLabel = `${lock.label} locked by ${lock.holder.name}, ${LOCK_REASON_LABEL[lock.reason]}`

  return (
    <div className={classes} style={style} role="region" aria-label={ariaLabel}>
      {children && <div className={styles.muted} aria-hidden="true">{children}</div>}
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.bar}>
        <div className={styles.barAvatar}>
          <Avatar
            name={lock.holder.name}
            src={lock.holder.avatar}
            size="sm"
            tone={lock.holder.tone ?? "obsidian"}
          />
        </div>
        <div className={styles.barCopy}>
          <span className={styles.barLabel}>
            <span className={styles.barReason}>{LOCK_REASON_LABEL[lock.reason]}</span>
            {lock.label}
          </span>
          <span className={styles.barMeta}>
            {lock.holder.name}
            {lock.since && (
              <>
                <span aria-hidden="true">·</span>
                <span className={styles.since}>{lock.since}</span>
              </>
            )}
          </span>
        </div>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
    </div>
  )
}

export default LockZoneOverlay
