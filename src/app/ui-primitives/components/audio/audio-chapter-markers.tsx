"use client"

import { QuoteBubble } from "../primitives/quote-bubble"
import type { AudioChapter } from "./audio-types"
import styles from "./audio-chapter-markers.module.css"

interface AudioChapterMarkersProps {
  chapters: ReadonlyArray<AudioChapter>
  /** Total track duration in seconds. */
  duration: number
  /** Optional current playhead in seconds. */
  currentTime?: number
  onJumpToChapter?: (chapter: AudioChapter) => void
  className?: string
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00"
  }
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function AudioChapterMarkers({
  chapters,
  duration,
  currentTime = 0,
  onJumpToChapter,
  className,
}: AudioChapterMarkersProps) {
  const safeDuration = Math.max(duration, 1)
  const playhead = Math.max(0, Math.min(currentTime, safeDuration))
  const progress = (playhead / safeDuration) * 100

  const classes = [styles.markers, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="group" aria-label="Chapter markers">
      <div className={styles.rail} aria-hidden="true">
        <span
          className={styles.playhead}
          style={{ left: `${progress}%` }}
        />
        {chapters.map((chapter) => {
          const offset = (chapter.start / safeDuration) * 100
          const width = Math.max(
            ((chapter.end - chapter.start) / safeDuration) * 100,
            2,
          )
          return (
            <span
              key={chapter.id}
              className={styles.segment}
              style={{ left: `${offset}%`, width: `${width}%` }}
            />
          )
        })}
      </div>
      <ul className={styles.list}>
        {chapters.map((chapter) => {
          const offset = (chapter.start / safeDuration) * 100
          const isActive =
            playhead >= chapter.start && playhead < chapter.end
          return (
            <li
              key={chapter.id}
              className={styles.marker}
              style={{ left: `${offset}%` }}
            >
              <button
                type="button"
                className={isActive ? styles.markerDotActive : styles.markerDot}
                onClick={() => onJumpToChapter?.(chapter)}
                aria-label={`Jump to chapter — ${chapter.title} at ${formatTime(chapter.start)}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className={styles.bubbleWrap}>
                  <QuoteBubble side="top" tone="obsidian">
                    <strong className={styles.bubbleTitle}>{chapter.title}</strong>
                    <span className={styles.bubbleTime}>
                      {formatTime(chapter.start)}
                    </span>
                  </QuoteBubble>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AudioChapterMarkers
