"use client"

import { ChevronDown, Clock, Headphones, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import type { AudioChapter } from "./audio-types"
import styles from "./podcast-episode-card.module.css"

export interface PodcastEpisode {
  id: string
  title: string
  show: string
  durationSeconds: number
  publishedRelative: string
  description?: string
  cover?: string
  chapters?: ReadonlyArray<AudioChapter>
}

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode
  onAddToQueue?: (episode: PodcastEpisode) => void
  className?: string
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "—"
  }
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60)
    const remaining = mins % 60
    return `${hrs}h ${remaining.toString().padStart(2, "0")}m`
  }
  const secs = total % 60
  return `${mins}m ${secs.toString().padStart(2, "0")}s`
}

function formatChapterTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00"
  }
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function PodcastEpisodeCard({
  episode,
  onAddToQueue,
  className,
}: PodcastEpisodeCardProps) {
  const [chaptersOpen, setChaptersOpen] = useState<boolean>(false)
  const hasChapters = (episode.chapters?.length ?? 0) > 0
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Episode — ${episode.title}`}>
      <div className={styles.thumb} aria-hidden="true">
        {episode.cover ? (
          <Image
            src={episode.cover}
            alt=""
            width={140}
            height={140}
            className={styles.thumbImage}
            unoptimized
          />
        ) : (
          <span className={styles.thumbGlyph}>
            <Headphones size={28} strokeWidth={2.2} />
          </span>
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.show}>{episode.show}</span>
        <h3 className={styles.title}>{episode.title}</h3>
        {episode.description ? (
          <p className={styles.description}>{episode.description}</p>
        ) : null}
        <div className={styles.metaRow}>
          <span className={styles.chip}>
            <Clock size={12} strokeWidth={2.2} aria-hidden="true" />
            {formatDuration(episode.durationSeconds)}
          </span>
          <span className={styles.chipMuted}>{episode.publishedRelative}</span>
          {onAddToQueue ? (
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => onAddToQueue(episode)}
              aria-label={`Add ${episode.title} to queue`}
            >
              <Plus size={14} strokeWidth={2.4} aria-hidden="true" />
              <span>Add to queue</span>
            </button>
          ) : null}
        </div>

        {hasChapters ? (
          <div className={styles.chapters}>
            <button
              type="button"
              className={styles.chaptersToggle}
              onClick={() => setChaptersOpen((prev) => !prev)}
              aria-expanded={chaptersOpen}
              aria-controls={`chapters-${episode.id}`}
            >
              <span>
                Chapters
                <span className={styles.chaptersCount}>
                  {episode.chapters?.length ?? 0}
                </span>
              </span>
              <ChevronDown
                size={14}
                strokeWidth={2.4}
                className={chaptersOpen ? styles.chevronOpen : styles.chevron}
                aria-hidden="true"
              />
            </button>
            {chaptersOpen ? (
              <ol
                id={`chapters-${episode.id}`}
                className={styles.chapterList}
                aria-label={`Chapters for ${episode.title}`}
              >
                {episode.chapters?.map((chapter, index) => (
                  <li key={chapter.id} className={styles.chapterRow}>
                    <span className={styles.chapterIndex}>
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className={styles.chapterTitle}>{chapter.title}</span>
                    <span className={styles.chapterTime}>
                      {formatChapterTime(chapter.start)}
                    </span>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default PodcastEpisodeCard
