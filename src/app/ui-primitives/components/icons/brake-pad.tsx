import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./brake-pad.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function BrakePadIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Brake pad",
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
        {/* Backing plate (steel) — slightly trapezoidal */}
        <path
          className={styles.backing}
          d="M2.6 9c0-.6.5-1.1 1.1-1.1h16.6c.6 0 1.1.5 1.1 1.1v4.4c0 .6-.5 1.1-1.1 1.1H3.7c-.6 0-1.1-.5-1.1-1.1z"
        />
        <path
          className={styles.backingStroke}
          d="M2.6 9c0-.6.5-1.1 1.1-1.1h16.6c.6 0 1.1.5 1.1 1.1v4.4c0 .6-.5 1.1-1.1 1.1H3.7c-.6 0-1.1-.5-1.1-1.1z"
        />
        {/* Mounting ear tabs */}
        <rect className={styles.earTab} x="1.4" y="9.6" width="1.2" height="3" rx="0.2" />
        <rect className={styles.earTab} x="21.4" y="9.6" width="1.2" height="3" rx="0.2" />
        <circle className={styles.earHole} cx="2" cy="11.1" r="0.4" />
        <circle className={styles.earHole} cx="22" cy="11.1" r="0.4" />
        {/* Friction material on top — slightly raised */}
        <path
          className={styles.friction}
          d="M3.6 7.9h16.8c.5 0 1-.4 1-.9V4.6c0-.5-.4-1-1-1H3.6c-.5 0-1 .4-1 1V7c0 .5.4.9 1 .9z"
        />
        <path
          className={styles.frictionStroke}
          d="M3.6 7.9h16.8c.5 0 1-.4 1-.9V4.6c0-.5-.4-1-1-1H3.6c-.5 0-1 .4-1 1V7c0 .5.4.9 1 .9z"
        />
        {/* Center groove (slot for heat dissipation) */}
        <rect className={styles.groove} x="10" y="4.4" width="4" height="2.6" rx="0.3" />
        {/* Friction texture lines */}
        <line className={styles.texture} x1="4.4" y1="5.4" x2="9.4" y2="5.4" strokeWidth="0.4" />
        <line className={styles.texture} x1="4.4" y1="6.2" x2="9.4" y2="6.2" strokeWidth="0.4" />
        <line className={styles.texture} x1="14.6" y1="5.4" x2="19.6" y2="5.4" strokeWidth="0.4" />
        <line className={styles.texture} x1="14.6" y1="6.2" x2="19.6" y2="6.2" strokeWidth="0.4" />
        {/* Wear indicator */}
        <rect className={styles.wearTab} x="11" y="14.6" width="2" height="2" rx="0.2" />
        <line className={styles.wearWire} x1="12" y1="16.6" x2="12" y2="20" strokeWidth="0.7" />
        {/* Friction surface ridges at top */}
        <line className={styles.frictionEdge} x1="3" y1="3.6" x2="21" y2="3.6" strokeWidth="0.6" strokeDasharray="0.7 0.6" />
      </svg>
    </span>
  )
}
