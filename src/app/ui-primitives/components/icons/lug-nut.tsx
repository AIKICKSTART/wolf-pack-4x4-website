import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./lug-nut.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function LugNutIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Lug nut",
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
        {/* Outer hex shape — 6 sides */}
        <path
          className={styles.hexShadow}
          d="M12 2l8 4.6v9.2L12 20.4 4 15.8V6.6z"
        />
        <path
          className={styles.hex}
          d="M12 2l8 4.6v9.2L12 20.4 4 15.8V6.6z"
        />
        <path
          className={styles.hexStroke}
          d="M12 2l8 4.6v9.2L12 20.4 4 15.8V6.6z"
        />
        {/* Inner facets (highlights) */}
        <line className={styles.facet} x1="12" y1="2" x2="12" y2="11.2" />
        <line className={styles.facet} x1="4" y1="6.6" x2="12" y2="11.2" />
        <line className={styles.facet} x1="20" y1="6.6" x2="12" y2="11.2" />
        {/* Conical seat — outer ring + inner bevel */}
        <circle className={styles.seat} cx="12" cy="11.2" r="4.4" />
        <circle className={styles.seatBevel} cx="12" cy="11.2" r="3.2" />
        {/* Threaded center hole */}
        <circle className={styles.threadHole} cx="12" cy="11.2" r="1.8" />
        <circle className={styles.threadInner} cx="12" cy="11.2" r="1" />
        {/* Thread marks */}
        <line className={styles.threadMark} x1="10.6" y1="11.2" x2="13.4" y2="11.2" strokeWidth="0.5" />
        <line className={styles.threadMark} x1="10.6" y1="10.6" x2="13.4" y2="10.6" strokeWidth="0.3" />
        <line className={styles.threadMark} x1="10.6" y1="11.8" x2="13.4" y2="11.8" strokeWidth="0.3" />
        {/* Polished glint on top facet */}
        <path className={styles.glint} d="M5.6 7.6l4.4-2.4" strokeWidth="0.6" />
      </svg>
    </span>
  )
}
