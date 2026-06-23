import type { CSSProperties } from "react"

import { Avatar } from "../primitives/avatar"
import type {
  AwarenessEntry,
  CollabUser,
  CursorTone,
} from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./awareness-strip.module.css"

interface AwarenessStripProps {
  /** Live "who's looking at what" entries, rendered left → right. */
  entries: ReadonlyArray<AwarenessEntry>
  /** Optional kicker label rendered above the strip. */
  caption?: string
  className?: string
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

function strip(entries: ReadonlyArray<AwarenessEntry>): string {
  if (entries.length === 0) {
    return "No collaborators focused right now"
  }
  return entries
    .map((entry) => `${entry.user.name} on ${entry.focus}`)
    .join(", ")
}

/** Horizontal "who is looking at what" strip. */
export function AwarenessStrip({
  entries,
  caption,
  className,
}: AwarenessStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={caption ?? "Live awareness — who is focused where"}
    >
      <span className={styles.live} aria-live="polite" aria-atomic="true">
        {strip(entries)}
      </span>
      {caption && <span className={styles.caption}>{caption}</span>}
      <ul className={styles.list}>
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={styles.entry}
            style={{ "--entry-tint": toneHex(entry.user) } as CSSProperties}
          >
            <Avatar
              name={entry.user.name}
              src={entry.user.avatar}
              size="sm"
              tone={entry.user.tone ?? "obsidian"}
            />
            <div className={styles.copy}>
              <div className={styles.copyRow}>
                <span className={styles.name}>{entry.user.name}</span>
                {entry.qualifier && (
                  <span className={styles.qualifier}>{entry.qualifier}</span>
                )}
              </div>
              <span className={styles.focus}>
                <span className={styles.focusDot} aria-hidden="true" />
                {entry.focus}
              </span>
            </div>
            {entry.durationLabel && (
              <span className={styles.duration}>{entry.durationLabel}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default AwarenessStrip
