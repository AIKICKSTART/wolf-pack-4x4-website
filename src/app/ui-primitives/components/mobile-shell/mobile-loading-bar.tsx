import styles from "./mobile-loading-bar.module.css"

export type LoadingBarMode = "indeterminate" | "determinate"

interface MobileLoadingBarProps {
  active: boolean
  mode?: LoadingBarMode
  progress?: number
  tone?: "red" | "amber" | "teal"
  className?: string
}

const TONE_CLASS: Record<NonNullable<MobileLoadingBarProps["tone"]>, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
}

export function MobileLoadingBar({
  active,
  mode = "indeterminate",
  progress = 0,
  tone = "red",
  className,
}: MobileLoadingBarProps) {
  const clamped = Math.max(0, Math.min(1, progress))
  const classes = [
    styles.bar,
    TONE_CLASS[tone],
    active ? styles.active : "",
    mode === "indeterminate" ? styles.indeterminate : styles.determinate,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      className={classes}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={mode === "determinate" ? Math.round(clamped * 100) : undefined}
      aria-label={mode === "determinate" ? "Loading progress" : "Loading"}
    >
      <span
        className={styles.fill}
        style={mode === "determinate" ? { transform: `scaleX(${clamped})` } : undefined}
      />
    </div>
  )
}

export default MobileLoadingBar
