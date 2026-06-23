"use client"

import { Flame, Pause, Play, Volume2 } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import type { AudioWaveformSamples, AudioWaveformTone } from "./audio-types"
import { AudioWaveform } from "./audio-waveform"
import styles from "./exhaust-sound-preview.module.css"

interface ExhaustSoundPreviewProps {
  /** Headline label, e.g. "GT350 Magnaflow Bypass". */
  label: string
  /** Audio source URL — tolerated if missing. */
  src?: string
  /** Pre-rendered waveform samples for fast first paint. */
  waveform?: AudioWaveformSamples
  /** Loudness reading in dB, e.g. 96. */
  loudnessDb: number
  /** Pipe diameter copy, e.g. "2.5"". */
  pipeDiameter: string
  /** Optional accent tone — defaults to red. */
  tone?: AudioWaveformTone
  className?: string
}

export function ExhaustSoundPreview({
  label,
  src,
  waveform,
  loudnessDb,
  pipeDiameter,
  tone = "red",
  className,
}: ExhaustSoundPreviewProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<number | null>(null)
  const hasSrc = typeof src === "string" && src.length > 0

  const [playing, setPlaying] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!playing) {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }
    if (hasSrc) return
    // Mock progress when no source is wired.
    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.04
        if (next >= 1) {
          setPlaying(false)
          return 0
        }
        return next
      })
    }, 100)
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [playing, hasSrc])

  const togglePlay = useCallback(() => {
    if (!hasSrc) {
      setPlaying((prev) => !prev)
      return
    }
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      setProgress(0)
      void audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    } else {
      audio.pause()
      setPlaying(false)
    }
  }, [hasSrc])

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    const total = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0
    setProgress(total > 0 ? audio.currentTime / total : 0)
  }

  const classes = [
    styles.preview,
    playing ? styles.playing : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`Exhaust sound — ${label}`}>
      {hasSrc ? (
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setPlaying(false)
            setProgress(0)
          }}
          aria-hidden="true"
        />
      ) : null}

      <button
        type="button"
        className={styles.playBtn}
        onClick={togglePlay}
        aria-pressed={playing}
        aria-label={playing ? `Stop ${label} preview` : `Play ${label} preview`}
      >
        {playing ? (
          <Pause size={18} strokeWidth={2.6} />
        ) : (
          <Play size={18} strokeWidth={2.6} />
        )}
      </button>

      <div className={styles.body}>
        <span className={styles.kicker}>Exhaust dyno clip</span>
        <strong className={styles.label}>{label}</strong>
        <div className={styles.waveformWrap} aria-hidden="true">
          <AudioWaveform
            samples={waveform}
            progress={progress}
            variant="compact"
            tone={tone}
          />
        </div>
      </div>

      <div className={styles.chipStack}>
        <span className={styles.chipLoud}>
          <Volume2 size={12} strokeWidth={2.2} aria-hidden="true" />
          <span>{loudnessDb} dB</span>
        </span>
        <span className={styles.chipPipe}>
          <Flame size={12} strokeWidth={2.2} aria-hidden="true" />
          <span>{pipeDiameter}</span>
        </span>
      </div>
    </article>
  )
}

export default ExhaustSoundPreview
