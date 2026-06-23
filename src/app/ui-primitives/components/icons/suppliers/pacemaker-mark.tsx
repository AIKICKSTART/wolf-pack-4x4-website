import type { IconMotion, IconProps } from "../icon-types"
import { TONE_VALUES } from "../icon-types"
import styles from "./pacemaker-mark.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function PacemakerMarkIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Pacemaker brand mark",
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
        {/* Speed-stripe shield */}
        <path
          className={styles.shield}
          d="M4 4h12l4 4v8l-4 4H4z"
        />
        <path
          className={styles.shieldStroke}
          d="M4 4h12l4 4v8l-4 4H4z"
        />
        {/* Pulse waveform inside */}
        <path className={styles.wave} d="M5 12h3l1.6-4 2.6 8 2-4h3" strokeWidth="1.6" />
      </svg>
    </span>
  )
}
