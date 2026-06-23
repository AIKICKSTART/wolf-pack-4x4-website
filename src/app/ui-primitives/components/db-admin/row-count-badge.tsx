import styles from "./row-count-badge.module.css"

interface RowCountBadgeProps {
  count: number
  /** Optional override label suffix (e.g. "rows"). */
  unit?: string
  className?: string
}

type Tone = "small" | "mid" | "large" | "xl"

function tone(count: number): Tone {
  if (count >= 1_000_000_000) {
    return "xl"
  }
  if (count >= 1_000_000) {
    return "large"
  }
  if (count >= 1_000) {
    return "mid"
  }
  return "small"
}

function format(count: number): { value: string; suffix: string } {
  if (count >= 1_000_000_000) {
    return { value: (count / 1_000_000_000).toFixed(count >= 10_000_000_000 ? 0 : 1), suffix: "B" }
  }
  if (count >= 1_000_000) {
    return { value: (count / 1_000_000).toFixed(count >= 10_000_000 ? 0 : 1), suffix: "M" }
  }
  if (count >= 1_000) {
    return { value: (count / 1_000).toFixed(count >= 10_000 ? 0 : 1), suffix: "K" }
  }
  return { value: count.toLocaleString("en-US"), suffix: "" }
}

const TONE_CLASS: Record<Tone, string> = {
  small: styles.toneSmall,
  mid: styles.toneMid,
  large: styles.toneLarge,
  xl: styles.toneXl,
}

export function RowCountBadge({ count, unit = "rows", className }: RowCountBadgeProps) {
  const { value, suffix } = format(count)
  const classes = [styles.badge, TONE_CLASS[tone(count)], className].filter(Boolean).join(" ")

  return (
    <span
      className={classes}
      aria-label={`${count.toLocaleString("en-US")} ${unit}`}
    >
      {value}
      {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      <span className={styles.suffix}>{unit}</span>
    </span>
  )
}

export default RowCountBadge
