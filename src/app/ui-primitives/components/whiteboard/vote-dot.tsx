import type { StickyTone } from "./whiteboard-types"
import styles from "./vote-dot.module.css"

export type VoteDotSize = "sm" | "md" | "lg"

export interface VoteDotProps {
  /** Vote count shown inside the dot. */
  count: number
  /** Dot size. */
  size?: VoteDotSize
  /** Tone — drives dot colour. */
  tone?: StickyTone | "red" | "amber" | "teal"
  /** Show a small pulse halo for "new vote" state. */
  pulse?: boolean
  /** Optional className passthrough. */
  className?: string
  /** Optional accessible label override. */
  ariaLabel?: string
}

const TONE_CLASS: Record<NonNullable<VoteDotProps["tone"]>, string> = {
  yellow: styles.toneYellow,
  pink: styles.tonePink,
  blue: styles.toneBlue,
  green: styles.toneGreen,
  purple: styles.tonePurple,
  orange: styles.toneOrange,
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
}

const SIZE_CLASS: Record<VoteDotSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

export function VoteDot({
  count,
  size = "md",
  tone = "red",
  pulse = false,
  className,
  ariaLabel,
}: VoteDotProps) {
  const classes = [
    styles.dot,
    SIZE_CLASS[size],
    TONE_CLASS[tone],
    pulse ? styles.pulse : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const label = ariaLabel ?? `${count} vote${count === 1 ? "" : "s"}`

  return (
    <span role="img" aria-label={label} className={classes} data-tone={tone}>
      <span className={styles.count}>{count}</span>
    </span>
  )
}

export default VoteDot
