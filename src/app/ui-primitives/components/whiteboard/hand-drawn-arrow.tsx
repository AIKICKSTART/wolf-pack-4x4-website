import type { HandDrawnStyle } from "./whiteboard-types"
import styles from "./hand-drawn-arrow.module.css"

export type HandDrawnTone = "red" | "amber" | "teal" | "green" | "ink"

export interface HandDrawnArrowProps {
  /** Arrow width in pixels. */
  width?: number
  /** Arrow height in pixels — controls curve amplitude. */
  height?: number
  /** Hand-drawn wobble style (3 variants). */
  style?: HandDrawnStyle
  /** Tone — colour of the stroke. */
  tone?: HandDrawnTone
  /** Stroke width in user units. */
  strokeWidth?: number
  /** Optional className passthrough. */
  className?: string
  /** Optional aria-label override. Defaults to "Hand-drawn arrow". */
  ariaLabel?: string
}

const TONE_COLOR: Record<HandDrawnTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  ink: "var(--primitive-text-strong)",
}

const SHAFT_PATH: Record<HandDrawnStyle, string> = {
  // Slightly loose wobble — sine-ish freehand
  loose:
    "M 4 30 C 26 16, 56 44, 86 22 S 142 38, 168 24 C 192 14, 220 30, 246 18",
  // Scratchy — small jitter peaks
  scratchy:
    "M 4 28 L 22 24 L 42 32 L 64 22 L 86 30 L 108 20 L 132 28 L 158 22 L 186 30 L 212 22 L 244 26",
  // Marker — thick smooth arc
  marker:
    "M 4 32 C 60 4, 140 56, 246 16",
}

const ARROW_HEAD: Record<HandDrawnStyle, string> = {
  loose: "M 246 18 L 232 8 M 246 18 L 230 28",
  scratchy: "M 244 26 L 228 14 M 244 26 L 226 34",
  marker: "M 246 16 L 230 4 M 246 16 L 228 26",
}

export function HandDrawnArrow({
  width = 240,
  height = 60,
  style = "loose",
  tone = "ink",
  strokeWidth = 3,
  className,
  ariaLabel = "Hand-drawn arrow",
}: HandDrawnArrowProps) {
  const classes = [styles.arrow, className].filter(Boolean).join(" ")
  const color = TONE_COLOR[tone]
  const shaft = SHAFT_PATH[style]
  const head = ARROW_HEAD[style]

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      className={classes}
      width={width}
      height={height}
      viewBox="0 0 250 50"
      data-style={style}
      data-tone={tone}
    >
      <g
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={shaft} />
        <path d={head} />
      </g>
    </svg>
  )
}

export default HandDrawnArrow
