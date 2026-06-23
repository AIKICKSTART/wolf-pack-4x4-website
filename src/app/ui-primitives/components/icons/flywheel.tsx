import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./flywheel.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function FlywheelIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Flywheel with ring gear",
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
        <g className={styles.wheelGroup}>
          {/* Outer ring gear with teeth — many small ticks around perimeter */}
          <circle className={styles.outer} cx="12" cy="12" r="9.6" />
          {/* Ring gear teeth */}
          <g className={styles.teethGroup}>
            <line className={styles.toothTick} x1="12" y1="2.2" x2="12" y2="3.2" />
            <line className={styles.toothTick} x1="12" y1="20.8" x2="12" y2="21.8" />
            <line className={styles.toothTick} x1="2.2" y1="12" x2="3.2" y2="12" />
            <line className={styles.toothTick} x1="20.8" y1="12" x2="21.8" y2="12" />
            <line className={styles.toothTick} x1="5.05" y1="5.05" x2="5.7" y2="5.7" />
            <line className={styles.toothTick} x1="18.3" y1="18.3" x2="18.95" y2="18.95" />
            <line className={styles.toothTick} x1="18.95" y1="5.05" x2="18.3" y2="5.7" />
            <line className={styles.toothTick} x1="5.7" y1="18.3" x2="5.05" y2="18.95" />
            <line className={styles.toothTick} x1="8.4" y1="3" x2="8.6" y2="4" />
            <line className={styles.toothTick} x1="15.4" y1="20" x2="15.6" y2="21" />
            <line className={styles.toothTick} x1="15.4" y1="3" x2="15.6" y2="4" />
            <line className={styles.toothTick} x1="8.4" y1="20" x2="8.6" y2="21" />
            <line className={styles.toothTick} x1="3" y1="8.4" x2="4" y2="8.6" />
            <line className={styles.toothTick} x1="20" y1="15.4" x2="21" y2="15.6" />
            <line className={styles.toothTick} x1="3" y1="15.4" x2="4" y2="15.6" />
            <line className={styles.toothTick} x1="20" y1="8.4" x2="21" y2="8.6" />
          </g>
          {/* Friction face — inner mass */}
          <circle className={styles.frictionFace} cx="12" cy="12" r="7.4" />
          <circle className={styles.frictionFaceStroke} cx="12" cy="12" r="7.4" />
          {/* Bolt circle (6 bolts) */}
          <circle className={styles.bolt} cx="12" cy="6.8" r="0.6" />
          <circle className={styles.bolt} cx="16.5" cy="9.4" r="0.6" />
          <circle className={styles.bolt} cx="16.5" cy="14.6" r="0.6" />
          <circle className={styles.bolt} cx="12" cy="17.2" r="0.6" />
          <circle className={styles.bolt} cx="7.5" cy="14.6" r="0.6" />
          <circle className={styles.bolt} cx="7.5" cy="9.4" r="0.6" />
          {/* Center hub */}
          <circle className={styles.centerHub} cx="12" cy="12" r="2.8" />
          <circle className={styles.centerHole} cx="12" cy="12" r="1.4" />
          <path className={styles.centerSpline} d="M11 12h2M12 11v2" strokeWidth="0.7" />
        </g>
      </svg>
    </span>
  )
}
