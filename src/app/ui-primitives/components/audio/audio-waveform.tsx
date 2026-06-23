import type { CSSProperties } from "react"

import type {
  AudioWaveformSamples,
  AudioWaveformTone,
  AudioWaveformVariant,
} from "./audio-types"
import styles from "./audio-waveform.module.css"

interface AudioWaveformProps {
  /** Amplitude samples in 0–1 range. When omitted a flat placeholder renders. */
  samples?: AudioWaveformSamples
  /** Playback progress in 0–1 range. Drives the highlighted segment. */
  progress?: number
  /** Visual variant — compact 60px or detailed 96px tall. */
  variant?: AudioWaveformVariant
  /** Accent tone. */
  tone?: AudioWaveformTone
  /** Optional aria label for assistive tech. */
  ariaLabel?: string
  className?: string
}

const PLACEHOLDER_LENGTH = 48
const COMPACT_HEIGHT = 60
const DETAILED_HEIGHT = 96
const BAR_GAP = 2

const TONE_CLASS: Record<AudioWaveformTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) {
    return 0
  }
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

function buildPlaceholderSamples(): AudioWaveformSamples {
  return Array.from({ length: PLACEHOLDER_LENGTH }, (_, index) => {
    const phase = index / PLACEHOLDER_LENGTH
    const wobble = Math.sin(phase * Math.PI * 4) * 0.18
    return Math.max(0.12, 0.32 + wobble)
  })
}

export function AudioWaveform({
  samples,
  progress = 0,
  variant = "compact",
  tone = "red",
  ariaLabel,
  className,
}: AudioWaveformProps) {
  const safeSamples: AudioWaveformSamples =
    samples && samples.length > 0 ? samples : buildPlaceholderSamples()
  const safeProgress = clamp01(progress)
  const height = variant === "detailed" ? DETAILED_HEIGHT : COMPACT_HEIGHT
  const totalBars = safeSamples.length
  const viewWidth = totalBars * 3 + Math.max(0, totalBars - 1) * BAR_GAP
  const playedIndex = Math.floor(safeProgress * totalBars)
  const isPlaceholder = !samples || samples.length === 0

  const classes = [
    styles.waveform,
    TONE_CLASS[tone],
    variant === "detailed" ? styles.detailed : styles.compact,
    isPlaceholder ? styles.placeholder : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const style: CSSProperties = {
    "--wf-progress": `${safeProgress * 100}%`,
  } as CSSProperties

  return (
    <svg
      className={classes}
      viewBox={`0 0 ${viewWidth} ${height}`}
      preserveAspectRatio="none"
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      style={style}
    >
      <g>
        {safeSamples.map((sample, index) => {
          const normalised = clamp01(sample)
          const barHeight = Math.max(2, normalised * (height - 4))
          const x = index * (3 + BAR_GAP)
          const y = (height - barHeight) / 2
          const played = index <= playedIndex
          return (
            <rect
              key={index}
              className={played ? styles.barPlayed : styles.bar}
              x={x}
              y={y}
              width={3}
              height={barHeight}
              rx={1.4}
              ry={1.4}
            />
          )
        })}
      </g>
    </svg>
  )
}

export default AudioWaveform
