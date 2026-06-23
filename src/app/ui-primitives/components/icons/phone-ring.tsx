import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./phone-ring.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function PhoneRingIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Ringing phone",
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
        <g className={styles.phoneGroup}>
          {/* Classic curved handset — earpiece, mouthpiece, curved bar */}
          <path
            className={styles.handset}
            d="M4.6 4.2c.5-.6 1.4-.8 2.1-.2l2.3 2.2c.5.5.6 1.3.2 1.9L7.4 10.4c1 2 2.4 3.6 4.4 4.6l2.3-1.8c.6-.4 1.4-.3 1.9.2l2.2 2.3c.6.7.5 1.6-.2 2.1l-2.3 1.7c-.9.6-2 .8-3 .4-4.6-1.5-7.8-4.7-9.4-9.4-.4-1-.2-2.1.4-3z"
          />
          <path
            className={styles.handsetStroke}
            d="M4.6 4.2c.5-.6 1.4-.8 2.1-.2l2.3 2.2c.5.5.6 1.3.2 1.9L7.4 10.4c1 2 2.4 3.6 4.4 4.6l2.3-1.8c.6-.4 1.4-.3 1.9.2l2.2 2.3c.6.7.5 1.6-.2 2.1l-2.3 1.7c-.9.6-2 .8-3 .4-4.6-1.5-7.8-4.7-9.4-9.4-.4-1-.2-2.1.4-3z"
          />
          {/* Earpiece + mouthpiece grilles */}
          <circle className={styles.dot} cx="6.6" cy="6.6" r="0.4" />
          <circle className={styles.dot} cx="7.4" cy="7.4" r="0.3" />
          <circle className={styles.dot} cx="16" cy="17" r="0.4" />
          <circle className={styles.dot} cx="15.2" cy="16.2" r="0.3" />
        </g>
        {/* Ring waves emanating from top-right */}
        <path className={styles.ring} data-r="1" d="M16.6 6.6c1.4.4 2.5 1.4 2.9 2.9" />
        <path className={styles.ring} data-r="2" d="M15.8 4c2.8.6 5 2.8 5.6 5.6" />
        <path className={styles.ring} data-r="3" d="M15 1.4c4.2.6 7.4 3.8 8 8" />
      </svg>
    </span>
  )
}
