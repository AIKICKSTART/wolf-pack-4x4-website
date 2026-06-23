import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./checkered-flag.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function CheckeredFlagIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Checkered flag",
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
        {/* Pole — slight taper */}
        <line className={styles.pole} x1="4.6" y1="3" x2="4.6" y2="22" />
        <circle className={styles.poleCap} cx="4.6" cy="2.6" r="0.6" />
        {/* Flag — waving rectangular shape — uses curve top + bottom to suggest wave */}
        <path
          className={styles.flag}
          d="M4.6 4l5 1 5-1 5 1v9l-5-1-5 1-5-1z"
        />
        <path
          className={styles.flagOutline}
          d="M4.6 4l5 1 5-1 5 1v9l-5-1-5 1-5-1z"
        />
        {/* 4x3 checkered pattern within the flag using clip-path approach via rectangles aligned with wave */}
        <g className={styles.tiles}>
          {/* Row 1 */}
          <path className={styles.tileFill} d="M4.6 4l5 1v3l-5-1z" />
          <path className={styles.tileFill} d="M9.6 5l5-1v3l-5 1z" />
          {/* Row 2 */}
          <path className={styles.tileFill} d="M9.6 8l5-1v3l-5 1z" />
          <path className={styles.tileFill} d="M14.6 4l5 1v3l-5-1z" />
          {/* Row 3 */}
          <path className={styles.tileFill} d="M4.6 7l5 1v3l-5-1z" />
          <path className={styles.tileFill} d="M14.6 7l5 1v3l-5-1z" />
          {/* Row 4 */}
          <path className={styles.tileFill} d="M9.6 11l5-1v3l-5 1z" />
          <path className={styles.tileFill} d="M4.6 10l5 1v2l-5-1z" />
          <path className={styles.tileFill} d="M14.6 10l5 1v2l-5-1z" />
        </g>
        {/* Base */}
        <ellipse className={styles.base} cx="4.6" cy="22" rx="2.2" ry="0.6" />
      </svg>
    </span>
  )
}
