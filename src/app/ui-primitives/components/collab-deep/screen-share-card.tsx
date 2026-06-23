"use client"

import type { CSSProperties } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { CollabUser, CursorTone } from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./screen-share-card.module.css"

interface ScreenShareCardProps {
  /** Collaborator initiating the share. */
  presenter: CollabUser
  /** Label of what they are sharing, e.g. "Falcon parts CMS — Description". */
  sharing: string
  /** Optional sub-label e.g. "Window · Chrome". */
  source?: string
  /** Live viewer count. */
  viewers: number
  /** Optional small list of viewer avatars (first 4 rendered). */
  viewerSample?: ReadonlyArray<CollabUser>
  /** Whether the share is live or pending. */
  state?: "live" | "starting" | "paused"
  /** Optional human duration e.g. "08:12". */
  durationLabel?: string
  /** Optional Join / View handler. */
  onJoin?: () => void
  className?: string
}

const STATE_TONE: Record<NonNullable<ScreenShareCardProps["state"]>, "red" | "amber" | "teal"> = {
  live: "red",
  starting: "amber",
  paused: "teal",
}

const STATE_LABEL: Record<NonNullable<ScreenShareCardProps["state"]>, string> = {
  live: "Live share",
  starting: "Starting",
  paused: "Paused",
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

/** Card surfacing an in-progress screen share + viewer roster. */
export function ScreenShareCard({
  presenter,
  sharing,
  source,
  viewers,
  viewerSample = [],
  state = "live",
  durationLabel,
  onJoin,
  className,
}: ScreenShareCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const tint = toneHex(presenter)
  const style: CSSProperties = {
    "--share-tint": tint,
  } as CSSProperties

  const visibleViewers = viewerSample.slice(0, 4)
  const ariaLabel = `${presenter.name} sharing ${sharing}, ${viewers} viewer${viewers === 1 ? "" : "s"}, ${STATE_LABEL[state]}`

  return (
    <article
      className={classes}
      style={style}
      role="region"
      aria-label={ariaLabel}
    >
      <div className={styles.preview} aria-hidden="true">
        <span className={styles.previewKicker}>{STATE_LABEL[state]}</span>
        <div className={styles.previewWindow}>
          <span className={styles.windowDot} />
          <span className={styles.windowDot} />
          <span className={styles.windowDot} />
          <span className={styles.windowLabel}>{sharing}</span>
        </div>
        <div className={styles.previewBody}>
          <span className={styles.previewLine} style={{ width: "76%" }} />
          <span className={styles.previewLine} style={{ width: "52%" }} />
          <span className={styles.previewLine} style={{ width: "84%" }} />
        </div>
        {durationLabel && (
          <span className={styles.previewDuration}>{durationLabel}</span>
        )}
      </div>

      <header className={styles.head}>
        <div className={styles.presenter}>
          <span className={styles.presenterRing}>
            <Avatar
              name={presenter.name}
              src={presenter.avatar}
              size="md"
              tone={presenter.tone ?? "obsidian"}
            />
          </span>
          <div className={styles.presenterMeta}>
            <span className={styles.presenterName}>{presenter.name}</span>
            <span className={styles.presenterShare}>
              sharing <strong className={styles.shareTarget}>{sharing}</strong>
            </span>
            {source && <span className={styles.source}>{source}</span>}
          </div>
        </div>
        <Chip
          tone={STATE_TONE[state]}
          label={STATE_LABEL[state]}
          icon={<span className={styles.stateDot} aria-hidden="true" />}
          className={styles.stateChip}
        />
      </header>

      <footer className={styles.footer}>
        <div className={styles.viewers}>
          <div className={styles.viewerStack} aria-hidden="true">
            {visibleViewers.map((viewer, i) => (
              <span
                key={viewer.id}
                className={styles.viewerSlot}
                style={{ zIndex: visibleViewers.length - i }}
              >
                <Avatar
                  name={viewer.name}
                  src={viewer.avatar}
                  size="sm"
                  tone={viewer.tone ?? "obsidian"}
                />
              </span>
            ))}
          </div>
          <span className={styles.viewerCount}>
            <strong className={styles.viewerNumber}>{viewers}</strong> watching
          </span>
        </div>
        <button
          type="button"
          className={styles.join}
          onClick={onJoin}
          aria-label={`Join ${presenter.name}'s screen share`}
        >
          Join share
        </button>
      </footer>
    </article>
  )
}

export default ScreenShareCard
