import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./exhaust-pipe.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function ExhaustPipeIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Exhaust pipe",
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
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-variant={variant}
        aria-hidden="true"
      >
        <title>{title}</title>
        {/* Mounting flange */}
        <rect className={styles.flange} x="2.2" y="7.6" width="1.6" height="8.8" rx="0.3" />
        <circle className={styles.flangeBolt} cx="3" cy="9.4" r="0.4" />
        <circle className={styles.flangeBolt} cx="3" cy="14.6" r="0.4" />
        {/* Pipe body curving up then back down to tip */}
        <path className={styles.pipeFill} d="M3.8 8.4c4.5 0 6.8-3.2 10.4-3.2 3 0 5.4 1.8 5.4 4.8 0 2-1 3.4-2.4 4.4-1.8 1.4-3.6 2-6 2H3.8z" />
        <path className={styles.pipeBody} d="M3.8 8.4c4.5 0 6.8-3.2 10.4-3.2 3 0 5.4 1.8 5.4 4.8 0 2-1 3.4-2.4 4.4-1.8 1.4-3.6 2-6 2H3.8z" />
        {/* Inner pipe shadow line — depth */}
        <path className={styles.innerSeam} d="M5 11.2c3.2 0 5-2.4 9-2.4 2 0 3.2 1 3.2 2.4" />
        {/* Tip flare */}
        <path className={styles.tipFlare} d="M16.2 13.4c.9-.4 2.2-.4 3.8 0v3c-1.6.4-2.9.4-3.8 0z" />
        <ellipse className={styles.tipMouth} cx="20" cy="14.9" rx="0.4" ry="1.6" />
        {/* Smoke puffs */}
        <circle className={styles.smokePuff} data-puff="1" cx="21.2" cy="14.9" r="1.4" />
        <circle className={styles.smokePuff} data-puff="2" cx="21.2" cy="14.9" r="1.1" />
        <circle className={styles.smokePuff} data-puff="3" cx="21.2" cy="14.9" r="0.9" />
      </svg>
    </span>
  )
}
