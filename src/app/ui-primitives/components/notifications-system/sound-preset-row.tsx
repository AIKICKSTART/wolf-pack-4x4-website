"use client"

import { Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useRef, useState } from "react"

import type { NotificationSoundPreset } from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface SoundPresetRowProps {
  preset: NotificationSoundPreset
  selected: boolean
  onSelect?: (id: string) => void
  className?: string
}

export function SoundPresetRow({
  preset,
  selected,
  onSelect,
  className,
}: SoundPresetRowProps) {
  const [playing, setPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isSilent = !preset.src

  // Preview NEVER auto-plays. The button is only active on user click.
  const handlePreview = () => {
    if (isSilent) {
      return
    }
    const audio = audioRef.current
    if (!audio) {
      return
    }
    if (playing) {
      audio.pause()
      audio.currentTime = 0
      setPlaying(false)
      return
    }
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }

  const handleEnded = () => {
    setPlaying(false)
  }

  const classes = [styles.soundRow, selected ? styles.soundRowOn : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes}>
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        aria-label={`Select ${preset.label} sound`}
        className={styles.soundSelect}
        onClick={() => onSelect?.(preset.id)}
      >
        <span className={styles.soundRadio} aria-hidden="true">
          <span className={styles.soundRadioDot} />
        </span>
        <span className={styles.soundLabels}>
          <span className={styles.soundLabel}>{preset.label}</span>
          <span className={styles.soundHint}>{preset.hint}</span>
        </span>
      </button>

      <button
        type="button"
        className={styles.soundPreview}
        onClick={handlePreview}
        disabled={isSilent}
        aria-label={isSilent ? `${preset.label} is silent` : `Preview ${preset.label}`}
        aria-pressed={playing}
      >
        {isSilent ? (
          <VolumeX size={14} strokeWidth={2.2} aria-hidden="true" />
        ) : playing ? (
          <Pause size={14} strokeWidth={2.4} aria-hidden="true" />
        ) : (
          <Play size={14} strokeWidth={2.4} aria-hidden="true" />
        )}
        <span>{isSilent ? "Silent" : playing ? "Stop" : "Preview"}</span>
      </button>

      <Volume2
        size={14}
        strokeWidth={2}
        aria-hidden="true"
        className={styles.soundDecor}
      />

      {preset.src && (
        <audio
          ref={audioRef}
          src={preset.src}
          onEnded={handleEnded}
          preload="none"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default SoundPresetRow
