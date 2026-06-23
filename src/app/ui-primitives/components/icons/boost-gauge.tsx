import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./boost-gauge.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function BoostGaugeIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Boost gauge",
  className,
}: IconProps) {
  const classes = [styles.host, MOTION_CLASS[motion], className].filter(Boolean).join(" ")
  const color = TONE_VALUES[tone]

  return (
    <span role="img" aria-label={title} className={classes} style={{ color, width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        data-variant={variant}
        aria-hidden="true"
      >
        <title>{title}</title>
        {/* Round gauge bezel — proper turbo boost gauge silhouette */}
        <circle className={styles.bezelOuter} cx="12" cy="12" r="9.4" />
        <circle className={styles.bezel} cx="12" cy="12" r="9.4" />
        <circle className={styles.face} cx="12" cy="12" r="8" />
        {/* Vacuum side ticks (left) */}
        <line className={styles.minor} x1="4.6" y1="14.3" x2="5.6" y2="13.9" />
        <line className={styles.minor} x1="5.6" y1="11.5" x2="6.7" y2="11.6" />
        <line className={styles.minor} x1="7.7" y1="8.8" x2="8.5" y2="9.4" />
        {/* Boost side ticks (right) — major + red marks */}
        <line className={styles.major} x1="12" y1="4.6" x2="12" y2="5.8" />
        <line className={styles.major} x1="14.6" y1="5.4" x2="14.2" y2="6.5" />
        <line className={styles.major} x1="16.8" y1="7" x2="16" y2="7.9" />
        <line className={styles.major} x1="18.4" y1="9.2" x2="17.4" y2="9.7" />
        <line className={styles.redMark} x1="19.4" y1="12" x2="18.2" y2="12" strokeWidth="2" />
        <line className={styles.redMark} x1="19.2" y1="14.6" x2="18.1" y2="14.2" strokeWidth="1.6" />
        {/* Zero mark at top */}
        <line className={styles.zero} x1="12" y1="4.6" x2="12" y2="6" strokeWidth="2.4" />
        {/* Center labels */}
        <text className={styles.labelMinus} x="6.5" y="13" textAnchor="middle">-</text>
        <text className={styles.labelPlus} x="17.5" y="13" textAnchor="middle">+</text>
        <text className={styles.unit} x="12" y="17.5" textAnchor="middle">PSI</text>
        {/* Needle pointing toward boost (right) */}
        <line className={styles.needle} x1="12" y1="12" x2="16.4" y2="9.5" />
        <circle className={styles.hub} cx="12" cy="12" r="1.2" />
        <circle className={styles.hubInner} cx="12" cy="12" r="0.45" />
      </svg>
    </span>
  )
}
