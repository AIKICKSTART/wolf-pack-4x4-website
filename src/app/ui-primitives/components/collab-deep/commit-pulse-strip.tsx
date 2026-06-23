import type { CSSProperties } from "react"

import { Avatar } from "../primitives/avatar"
import type {
  CollabUser,
  CommitPulseEvent,
  CursorTone,
} from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./commit-pulse-strip.module.css"

interface CommitPulseStripProps {
  /** Recent commit / save events, oldest → newest. */
  events: ReadonlyArray<CommitPulseEvent>
  /** Optional caption above the strip. */
  caption?: string
  /** Optional overall stat string e.g. "12 saves last 5m". */
  totalLabel?: string
  className?: string
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

/** Horizontal strip showing recent commits / saves with pulsing dots. */
export function CommitPulseStrip({
  events,
  caption,
  totalLabel,
  className,
}: CommitPulseStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={caption ?? "Recent saves and edits"}
    >
      <header className={styles.head}>
        {caption && <span className={styles.caption}>{caption}</span>}
        {totalLabel && <span className={styles.total}>{totalLabel}</span>}
      </header>
      <ol className={styles.list}>
        {events.map((event, index) => {
          const tint = toneHex(event.user)
          const isLatest = index === events.length - 1
          return (
            <li
              key={event.id}
              className={[styles.event, isLatest ? styles.eventLatest : ""]
                .filter(Boolean)
                .join(" ")}
              style={{ "--event-tint": tint } as CSSProperties}
            >
              <span
                className={[styles.dot, isLatest ? styles.dotLatest : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden="true"
              />
              <span className={styles.avatar}>
                <Avatar
                  name={event.user.name}
                  src={event.user.avatar}
                  size="sm"
                  tone={event.user.tone ?? "obsidian"}
                />
              </span>
              <span className={styles.copy}>
                <span className={styles.eventLabel}>{event.label}</span>
                <span className={styles.meta}>
                  <span className={styles.author}>{event.user.name}</span>
                  <span aria-hidden="true">·</span>
                  <time className={styles.time}>{event.timestamp}</time>
                  {event.delta && (
                    <span className={styles.delta}>{event.delta}</span>
                  )}
                </span>
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default CommitPulseStrip
