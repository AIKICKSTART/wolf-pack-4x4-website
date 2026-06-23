import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./ratchet.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function RatchetIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Ratchet",
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
        {/* Handle — rounded with grip ridges */}
        <rect className={styles.handle} x="2.4" y="14" width="13.6" height="3.4" rx="1.7" transform="rotate(-32 9.2 15.7)" />
        {/* Knurled grip pattern */}
        <g className={styles.gripGroup}>
          <line className={styles.grip} x1="4.4" y1="18.2" x2="4.8" y2="20" />
          <line className={styles.grip} x1="5.7" y1="17.4" x2="6.1" y2="19.2" />
          <line className={styles.grip} x1="7" y1="16.6" x2="7.4" y2="18.4" />
          <line className={styles.grip} x1="8.3" y1="15.8" x2="8.7" y2="17.6" />
        </g>
        {/* Direction toggle */}
        <circle className={styles.toggle} cx="13.6" cy="11.2" r="1" />
        {/* Socket head — round body, square drive showing */}
        <g className={styles.headGroup}>
          <circle className={styles.gearFill} cx="17.6" cy="7.4" r="5.2" />
          <circle className={styles.gear} cx="17.6" cy="7.4" r="5.2" />
          {/* Outer teeth — 12 short ticks for ratchet gear */}
          <path
            className={styles.teeth}
            d="M17.6 1.6v1.2M17.6 12v1.2M11.8 7.4h1.2M22.2 7.4h1.2M13.5 3.3l.9.9M21 10.5l.9.9M21.7 3.3l-.9.9M14.4 10.5l-.9.9M19.9 1.9l-.4 1.2M15.3 12.7l-.4 1.2M22.7 9.7l-1.2-.4M13.7 5.1l-1.2-.4"
          />
          {/* Square drive */}
          <rect className={styles.driveSquare} x="16" y="5.8" width="3.2" height="3.2" rx="0.3" transform="rotate(45 17.6 7.4)" />
          <circle className={styles.driveCenter} cx="17.6" cy="7.4" r="0.6" />
        </g>
      </svg>
    </span>
  )
}
