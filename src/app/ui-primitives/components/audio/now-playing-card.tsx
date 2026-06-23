"use client"

import { Heart, Pause, Play, SkipBack, SkipForward } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

import type { AudioTrack } from "./audio-types"
import styles from "./now-playing-card.module.css"

interface NowPlayingCardProps {
  track: AudioTrack
  onPrevious?: () => void
  onNext?: () => void
  onLike?: () => void
  liked?: boolean
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

export function NowPlayingCard({
  track,
  onPrevious,
  onNext,
  onLike,
  liked = false,
  className,
}: NowPlayingCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<number | null>(null)
  const hasSrc = typeof track.src === "string" && track.src.length > 0

  const [playing, setPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(track.duration)
  const [trackIdRef, setTrackIdRef] = useState<string>(track.id)

  if (trackIdRef !== track.id) {
    setTrackIdRef(track.id)
    setPlaying(false)
    setCurrentTime(0)
    setDuration(track.duration)
  }

  useEffect(() => {
    if (!playing) {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }
    if (hasSrc) return
    timerRef.current = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.5
        if (next >= duration) {
          setPlaying(false)
          return 0
        }
        return next
      })
    }, 500)
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [playing, hasSrc, duration])

  const togglePlay = useCallback(() => {
    if (hasSrc) {
      const audio = audioRef.current
      if (!audio) return
      if (audio.paused) {
        void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
      } else {
        audio.pause()
        setPlaying(false)
      }
      return
    }
    setPlaying((prev) => !prev)
  }, [hasSrc])

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime)
  }

  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (!audio) return
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration)
    }
  }

  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Now playing — ${track.title}`}>
      {hasSrc ? (
        <audio
          ref={audioRef}
          src={track.src}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setPlaying(false)
            setCurrentTime(0)
          }}
          aria-hidden="true"
        />
      ) : null}

      <div className={styles.cover} aria-hidden="true">
        {track.cover ? (
          <Image
            src={track.cover}
            alt=""
            width={320}
            height={320}
            className={styles.coverImage}
            unoptimized
          />
        ) : (
          <span className={styles.coverGlyph}>{track.title.slice(0, 2).toUpperCase()}</span>
        )}
        <span className={styles.coverGlow} />
      </div>

      <div className={styles.body}>
        <span className={styles.kicker}>Now playing</span>
        <h2 className={styles.title}>{track.title}</h2>
        {track.artist ? <p className={styles.artist}>{track.artist}</p> : null}
        {track.album ? <p className={styles.album}>{track.album}</p> : null}

        <div className={styles.progressRow}>
          <div className={styles.progressTrack} aria-hidden="true">
            <span
              className={styles.progressFill}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className={styles.timeRow}>
            <output aria-live="polite" className={styles.time}>
              {formatTime(currentTime)}
            </output>
            <output className={styles.time}>{formatTime(duration)}</output>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onPrevious}
            disabled={!onPrevious}
            aria-label="Previous track"
          >
            <SkipBack size={18} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className={styles.playBtn}
            onClick={togglePlay}
            aria-pressed={playing}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause size={22} strokeWidth={2.6} />
            ) : (
              <Play size={22} strokeWidth={2.6} />
            )}
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onNext}
            disabled={!onNext}
            aria-label="Next track"
          >
            <SkipForward size={18} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.likeBtn} ${liked ? styles.liked : ""}`}
            onClick={onLike}
            aria-pressed={liked}
            aria-label={liked ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart
              size={16}
              strokeWidth={2.2}
              fill={liked ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </article>
  )
}

export default NowPlayingCard
