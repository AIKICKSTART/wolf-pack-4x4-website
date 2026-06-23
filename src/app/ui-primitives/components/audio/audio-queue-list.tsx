"use client"

import { GripVertical, X } from "lucide-react"

import type { AudioTrack } from "./audio-types"
import styles from "./audio-queue-list.module.css"

interface AudioQueueListProps {
  tracks: ReadonlyArray<AudioTrack>
  /** Id of the currently playing track — receives an active style. */
  activeTrackId?: string
  onSelectTrack?: (track: AudioTrack) => void
  onRemoveTrack?: (track: AudioTrack) => void
  /** Optional title rendered above the list. */
  title?: string
  className?: string
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "—:—"
  }
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function AudioQueueList({
  tracks,
  activeTrackId,
  onSelectTrack,
  onRemoveTrack,
  title = "Up next",
  className,
}: AudioQueueListProps) {
  const classes = [styles.queue, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.kicker}>{title}</span>
        <span className={styles.count}>{tracks.length} tracks</span>
      </header>
      <ol className={styles.list}>
        {tracks.map((track, index) => {
          const isActive = track.id === activeTrackId
          return (
            <li
              key={track.id}
              className={`${styles.row} ${isActive ? styles.rowActive : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className={styles.drag} aria-hidden="true">
                <GripVertical size={14} strokeWidth={2.2} />
              </span>
              <span className={styles.index}>
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <button
                type="button"
                className={styles.body}
                onClick={() => onSelectTrack?.(track)}
                disabled={!onSelectTrack}
                aria-label={`Play ${track.title}${
                  track.artist ? ` by ${track.artist}` : ""
                }`}
              >
                <span className={styles.title}>{track.title}</span>
                {track.artist ? (
                  <span className={styles.artist}>{track.artist}</span>
                ) : null}
              </button>
              <span className={styles.duration}>
                {formatDuration(track.duration)}
              </span>
              {onRemoveTrack ? (
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => onRemoveTrack(track)}
                  aria-label={`Remove ${track.title} from queue`}
                >
                  <X size={12} strokeWidth={2.4} />
                </button>
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default AudioQueueList
