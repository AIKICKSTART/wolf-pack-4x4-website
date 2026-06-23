import styles from "./frozen-row-col-divider.module.css"

export type FrozenDividerOrientation = "row" | "column"
export type FrozenDividerTone = "amber" | "teal" | "red"

export interface FrozenRowColDividerProps {
  orientation: FrozenDividerOrientation
  tone?: FrozenDividerTone
  /** Optional label shown on the divider plate (e.g. "Frozen · 2 rows"). */
  label?: string
  /** Pixel length of the divider (height for column, width for row). */
  length?: number
}

const TONE_CLASS: Record<FrozenDividerTone, string> = {
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  red: styles.toneRed,
}

export function FrozenRowColDivider({
  orientation,
  tone = "amber",
  label,
  length,
}: FrozenRowColDividerProps) {
  const orientationClass =
    orientation === "row" ? styles.row : styles.column
  const classes = [styles.divider, orientationClass, TONE_CLASS[tone]]
    .filter(Boolean)
    .join(" ")

  const style: React.CSSProperties = length
    ? orientation === "row"
      ? { width: length }
      : { height: length }
    : {}

  return (
    <div
      className={classes}
      role="separator"
      aria-orientation={orientation === "row" ? "horizontal" : "vertical"}
      aria-label={label ?? (orientation === "row" ? "Frozen rows boundary" : "Frozen columns boundary")}
      style={style}
    >
      <span className={styles.line} aria-hidden="true" />
      {label ? <span className={styles.plate}>{label}</span> : null}
    </div>
  )
}

export default FrozenRowColDivider
