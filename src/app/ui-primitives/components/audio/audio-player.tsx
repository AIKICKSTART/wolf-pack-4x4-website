"use client"

import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Speaker,
  Volume2,
  VolumeX,
} from "lucide-react"
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"

import type { AudioOutputDevice, AudioTrack } from "./audio-types"
import { AudioWaveform } from "./audio-waveform"
import { SpeakerSelector } from "./speaker-selector"
import { VolumeSlider } from "./volume-slider"
import styles from "./audio-player.module.css"

interface AudioPlayerProps {
  track: AudioTrack
  /** Optional list of output devices, drives the speaker selector. */
  devices?: ReadonlyArray<AudioOutputDevice>
  /** Active device id. */
  activeDeviceId?: string
  onDeviceChange?: (deviceId: string) => void
  onPrevious?: () => void
  onNext?: () => void
  /** Whether previous / next controls should render. Default true. */
  enableSkip?: boolean
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

export function AudioPlayer({
  track,
  devices,
  activeDeviceId,
  onDeviceChange,
  onPrevious,
  onNext,
  enableSkip = true,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const scrubberId = useId()
  const hasSrc = typeof track.src === "string" && track.src.length > 0

  const [playing, setPlaying] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.7)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(track.duration)
  const [trackIdRef, setTrackIdRef] = useState<string>(track.id)

  if (trackIdRef !== track.id) {
    setTrackIdRef(track.id)
    setCurrentTime(0)
    setPlaying(false)
    setDuration(track.duration)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = muted ? 0 : volume
  }, [muted, volume])

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime)
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration)
    }
  }, [])

  const handleEnded = useCallback(() => {
    setPlaying(false)
    setCurrentTime(0)
  }, [])

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

  const handleScrubChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value)
    setCurrentTime(next)
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = next
    }
  }

  const handleVolumeChange = (next: number) => {
    setVolume(next)
    if (muted && next > 0) {
      setMuted(false)
    }
  }

  const toggleMute = () => {
    setMuted((prev) => !prev)
  }

  const handleScrubPointerDown = (event: ReactPointerEvent<HTMLInputElement>) => {
    if (!hasSrc) {
      event.preventDefault()
    }
  }

  const progress = duration > 0 ? currentTime / duration : 0

  const containerClasses = [styles.player, className].filter(Boolean).join(" ")

  return (
    <section
      className={containerClasses}
      aria-label={`Audio player — ${track.title}`}
    >
      {hasSrc ? (
        <audio
          ref={audioRef}
          src={track.src}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          aria-hidden="true"
        />
      ) : null}

      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Now playing</span>
          <h3 className={styles.title}>{track.title}</h3>
          {track.artist ? <p className={styles.artist}>{track.artist}</p> : null}
        </div>
        {devices && devices.length > 0 ? (
          <SpeakerSelector
            devices={devices}
            activeDeviceId={activeDeviceId}
            onDeviceChange={onDeviceChange}
          />
        ) : (
          <span className={styles.noDevice} aria-hidden="true">
            <Speaker size={16} strokeWidth={2} />
            <span>Default output</span>
          </span>
        )}
      </header>

      <div className={styles.scrubArea}>
        <div className={styles.waveformWrap} aria-hidden="true">
          <AudioWaveform
            samples={track.waveform}
            progress={progress}
            variant="detailed"
            tone={track.tone ?? "red"}
          />
        </div>
        <label htmlFor={scrubberId} className={styles.scrubLabel}>
          Seek
        </label>
        <input
          id={scrubberId}
          className={styles.scrubber}
          type="range"
          min={0}
          max={Math.max(1, duration)}
          step={0.1}
          value={currentTime}
          onChange={handleScrubChange}
          onPointerDown={handleScrubPointerDown}
          disabled={!hasSrc}
          aria-label={`Seek through ${track.title}`}
          aria-valuemin={0}
          aria-valuemax={Math.max(1, duration)}
          aria-valuenow={currentTime}
        />
      </div>

      <div className={styles.timeRow}>
        <output className={styles.time} aria-live="polite">
          {formatTime(currentTime)}
        </output>
        <output className={styles.time}>{formatTime(duration)}</output>
      </div>

      <footer className={styles.controls}>
        <div className={styles.transport}>
          {enableSkip ? (
            <button
              type="button"
              className={styles.controlBtn}
              onClick={onPrevious}
              disabled={!onPrevious}
              aria-label="Previous track"
            >
              <SkipBack size={18} strokeWidth={2.2} />
            </button>
          ) : null}
          <button
            type="button"
            className={styles.playBtn}
            onClick={togglePlay}
            disabled={!hasSrc}
            aria-pressed={playing}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause size={20} strokeWidth={2.4} />
            ) : (
              <Play size={20} strokeWidth={2.4} />
            )}
          </button>
          {enableSkip ? (
            <button
              type="button"
              className={styles.controlBtn}
              onClick={onNext}
              disabled={!onNext}
              aria-label="Next track"
            >
              <SkipForward size={18} strokeWidth={2.2} />
            </button>
          ) : null}
        </div>
        <div className={styles.volume}>
          <button
            type="button"
            className={styles.muteBtn}
            onClick={toggleMute}
            disabled={!hasSrc}
            aria-pressed={muted}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted || volume === 0 ? (
              <VolumeX size={16} strokeWidth={2.2} />
            ) : (
              <Volume2 size={16} strokeWidth={2.2} />
            )}
          </button>
          <VolumeSlider
            value={muted ? 0 : volume}
            onValueChange={handleVolumeChange}
            disabled={!hasSrc}
            orientation="horizontal"
            ariaLabel="Volume"
          />
        </div>
      </footer>

      {!hasSrc ? (
        <p className={styles.disabledNotice} role="status">
          No audio source connected — controls disabled.
        </p>
      ) : null}
    </section>
  )
}

export default AudioPlayer
