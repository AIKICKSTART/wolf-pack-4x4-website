import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./signal-pulse.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function SignalPulseIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Signal pulse",
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
        {/* Reference crosshair */}
        <path className={styles.cross} d="M12 2.4v3.6M12 18v3.6M2.4 12h3.6M18 12h3.6" />
        {/* Concentric expanding rings (4 layers) */}
        <circle className={styles.ringStatic} cx="12" cy="12" r="3.4" />
        <circle className={styles.ringStatic} cx="12" cy="12" r="6" />
        <circle className={styles.ring} data-r="1" cx="12" cy="12" r="4.4" />
        <circle className={styles.ring} data-r="2" cx="12" cy="12" r="4.4" />
        <circle className={styles.ring} data-r="3" cx="12" cy="12" r="4.4" />
        {/* Core */}
        <circle className={styles.coreGlow} cx="12" cy="12" r="2.4" />
        <circle className={styles.core} cx="12" cy="12" r="1.6" />
        <circle className={styles.coreCenter} cx="12" cy="12" r="0.6" />
      </svg>
    </span>
  )
}
