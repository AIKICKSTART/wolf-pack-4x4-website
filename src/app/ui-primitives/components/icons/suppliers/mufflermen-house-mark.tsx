import type { IconMotion, IconProps } from "../icon-types"
import { TONE_VALUES } from "../icon-types"
import styles from "./mufflermen-house-mark.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function MufflermenHouseMarkIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Mufflermen house brand mark",
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
        {/* Roof/house silhouette */}
        <path
          className={styles.roof}
          d="M2 12l10-9 10 9v9H2z"
        />
        <path
          className={styles.roofStroke}
          d="M2 12l10-9 10 9v9H2z"
        />
        {/* Inner cylinder muffler hint */}
        <rect className={styles.muffler} x="6.4" y="13" width="11.2" height="5" rx="1.4" />
        {/* Twin pipes coming out */}
        <line className={styles.pipe} x1="6.4" y1="14.4" x2="3" y2="14.4" strokeWidth="1.6" />
        <line className={styles.pipe} x1="6.4" y1="16.6" x2="3" y2="16.6" strokeWidth="1.6" />
        <line className={styles.pipe} x1="17.6" y1="14.4" x2="21" y2="14.4" strokeWidth="1.6" />
        <line className={styles.pipe} x1="17.6" y1="16.6" x2="21" y2="16.6" strokeWidth="1.6" />
        {/* OFM star above roof */}
        <path className={styles.star} d="M12 6l.7 1.5 1.6.2-1.2 1.1.3 1.6L12 9.6l-1.4.8.3-1.6-1.2-1.1 1.6-.2z" />
      </svg>
    </span>
  )
}
