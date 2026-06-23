"use client"

import { Eye, Play, Share2 } from "lucide-react"

import styles from "./replay-card.module.css"
import type { ReplayBroadcast } from "./live-broadcast-types"

interface ReplayCardProps {
  replay: ReplayBroadcast
  /** Optional handler when chapter row is clicked. */
  onSeek?: (chapterId: string) => void
  /** Optional handler when share is clicked. */
  onShare?: () => void
  className?: string
}

function formatViewCount(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toLocaleString("en-AU")
}

export function ReplayCard({ replay, onSeek, onShare, className }: ReplayCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Replay: ${replay.title}`}>
      <div
        className={styles.poster}
        style={replay.posterSrc ? { backgroundImage: `url(${replay.posterSrc})` } : undefined}
      >
        <span className={styles.posterScrim} aria-hidden="true" />
        <button type="button" className={styles.playOverlay} aria-label={`Play replay: ${replay.title}`}>
          <span className={styles.playGlyph} aria-hidden="true">
            <Play size={20} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </button>
        <span className={styles.replayChip}>Replay · {replay.runtimeLabel}</span>
        <span className={styles.viewCount}>
          <Eye size={11} strokeWidth={2.4} aria-hidden="true" />
          <span className={styles.viewCountValue}>{formatViewCount(replay.viewCount)}</span>
          <span className={styles.viewCountLabel}>views</span>
        </span>
      </div>

      <header className={styles.head}>
        <h3 className={styles.title}>{replay.title}</h3>
        <span className={styles.meta}>
          {replay.host.name} · {replay.airedLabel}
        </span>
      </header>

      {replay.chapters.length > 0 ? (
        <div className={styles.chapters}>
          <span className={styles.chaptersLabel}>Chapters</span>
          <ul className={styles.chapterList}>
            {replay.chapters.map((chapter) => (
              <li key={chapter.id}>
                <button
                  type="button"
                  className={styles.chapterRow}
                  onClick={() => onSeek?.(chapter.id)}
                  aria-label={`Jump to ${chapter.title} at ${chapter.startLabel}`}
                >
                  <span className={styles.chapterTime}>{chapter.startLabel}</span>
                  <span className={styles.chapterTitle}>{chapter.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <footer className={styles.footer}>
        <button type="button" className={styles.share} onClick={onShare} aria-label="Share replay">
          <Share2 size={13} strokeWidth={2.2} aria-hidden="true" />
          Share
        </button>
      </footer>
    </article>
  )
}

export default ReplayCard
