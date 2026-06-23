"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useId, type ChangeEvent } from "react"

import styles from "./volume-slider.module.css"

export type VolumeSliderOrientation = "horizontal" | "vertical"

interface VolumeSliderProps {
  /** Volume value in 0–1 range. */
  value: number
  onValueChange: (value: number) => void
  /** When true the embedded mute toggle is shown. */
  showMuteToggle?: boolean
  muted?: boolean
  onMuteChange?: (muted: boolean) => void
  orientation?: VolumeSliderOrientation
  disabled?: boolean
  ariaLabel?: string
  className?: string
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

export function VolumeSlider({
  value,
  onValueChange,
  showMuteToggle = false,
  muted = false,
  onMuteChange,
  orientation = "horizontal",
  disabled = false,
  ariaLabel = "Volume",
  className,
}: VolumeSliderProps) {
  const inputId = useId()
  const safeValue = clamp01(value)
  const percent = `${Math.round(safeValue * 100)}%`

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value)
    onValueChange(next)
  }

  const handleMute = () => {
    if (!onMuteChange) return
    onMuteChange(!muted)
  }

  const classes = [
    styles.wrapper,
    orientation === "vertical" ? styles.vertical : styles.horizontal,
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes}>
      {showMuteToggle ? (
        <button
          type="button"
          className={styles.muteBtn}
          onClick={handleMute}
          disabled={disabled}
          aria-pressed={muted}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted || safeValue === 0 ? (
            <VolumeX size={14} strokeWidth={2.4} />
          ) : (
            <Volume2 size={14} strokeWidth={2.4} />
          )}
        </button>
      ) : null}
      <label htmlFor={inputId} className={styles.label}>
        {ariaLabel}
      </label>
      <input
        id={inputId}
        className={styles.input}
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={safeValue}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={safeValue}
        aria-orientation={orientation}
        style={{ "--vol-progress": percent } as React.CSSProperties}
      />
      <span className={styles.valueChip} aria-hidden="true">
        {Math.round(safeValue * 100)}
      </span>
    </div>
  )
}

export default VolumeSlider
