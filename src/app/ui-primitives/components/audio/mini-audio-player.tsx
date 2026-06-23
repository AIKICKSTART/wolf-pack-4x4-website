"use client"

import { Pause, Play } from "lucide-react"
import { useCallback, useRef, useState } from "react"

import type { AudioTrack } from "./audio-types"
import { AudioWaveform } from "./audio-waveform"
import styles from "./mini-audio-player.module.css"

interface MiniAudioPlayerProps {
  track: AudioTrack
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

export function MiniAudioPlayer({ track, className }: MiniAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
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

  const togglePlay = useCallback(() => {
    if (!hasSrc) return
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      audio.pause()
      setPlaying(false)
    }
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

  const progress = duration > 0 ? currentTime / duration : 0
  const classes = [styles.mini, className].filter(Boolean).join(" ")

  return (
    <div className={classes} aria-label={`Mini player — ${track.title}`}>
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
      <button
        type="button"
        className={styles.playBtn}
        onClick={togglePlay}
        disabled={!hasSrc}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
      >
        {playing ? (
          <Pause size={14} strokeWidth={2.6} />
        ) : (
          <Play size={14} strokeWidth={2.6} />
        )}
      </button>
      <div className={styles.body}>
        <span className={styles.title} title={track.title}>
          {track.title}
        </span>
        <div className={styles.waveformWrap} aria-hidden="true">
          <AudioWaveform
            samples={track.waveform}
            progress={progress}
            variant="compact"
            tone={track.tone ?? "red"}
          />
        </div>
      </div>
      <span className={styles.duration}>
        <output aria-live="polite">{formatTime(currentTime)}</output>
        <span aria-hidden="true">/</span>
        <span>{formatTime(duration)}</span>
      </span>
    </div>
  )
}

export default MiniAudioPlayer
