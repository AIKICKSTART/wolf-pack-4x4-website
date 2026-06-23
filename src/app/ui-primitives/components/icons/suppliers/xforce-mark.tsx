import type { IconMotion, IconProps } from "../icon-types"
import { TONE_VALUES } from "../icon-types"
import styles from "./xforce-mark.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function XforceMarkIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "XForce brand mark",
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
        {/* Bold X — formed from two angled trapezoids */}
        <path
          className={styles.xLeft}
          d="M3 3.2h4l5 7-5 7H3l5-7z"
        />
        <path
          className={styles.xLeftStroke}
          d="M3 3.2h4l5 7-5 7H3l5-7z"
        />
        <path
          className={styles.xRight}
          d="M21 3.2h-4l-5 7 5 7h4l-5-7z"
        />
        <path
          className={styles.xRightStroke}
          d="M21 3.2h-4l-5 7 5 7h4l-5-7z"
        />
        {/* Speed lines below */}
        <line className={styles.speedLine} x1="6" y1="20.4" x2="18" y2="20.4" strokeWidth="1.6" />
        <line className={styles.speedLine} x1="8" y1="22" x2="16" y2="22" strokeWidth="1.4" />
      </svg>
    </span>
  )
}
