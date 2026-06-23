import styles from "./map-pin.module.css"

export type MapPinTone = "red" | "amber" | "teal" | "green"

export interface MapPinProps {
  /** X position as a 0–100 percentage of container width. */
  x: number
  /** Y position as a 0–100 percentage of container height. */
  y: number
  tone?: MapPinTone
  label: string
  active?: boolean
  index?: number
}

const TONE_CLASS: Record<MapPinTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

/**
 * Absolutely positioned map pin. Drops on mount and pulses when `active`.
 * Coordinates are percentages so the pin can ride any container.
 */
export function MapPin({
  x,
  y,
  tone = "red",
  label,
  active = false,
  index,
}: MapPinProps) {
  const classes = [
    styles.pin,
    TONE_CLASS[tone],
    active ? styles.active : null,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <span
      className={classes}
      style={{ left: `${x}%`, top: `${y}%` }}
      role="img"
      aria-label={label}
    >
      {active ? <span className={styles.pulse} aria-hidden="true" /> : null}
      <svg
        className={styles.icon}
        viewBox="0 0 24 32"
        aria-hidden="true"
      >
        <path
          d="M12 0 C5.4 0 0 5.4 0 12 C0 21 12 32 12 32 C12 32 24 21 24 12 C24 5.4 18.6 0 12 0 Z"
          className={styles.head}
        />
        <circle cx="12" cy="12" r="4.4" className={styles.dot} />
      </svg>
      {typeof index === "number" ? (
        <span className={styles.index} aria-hidden="true">
          {index}
        </span>
      ) : null}
    </span>
  )
}

export default MapPin
