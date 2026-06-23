import type { IconMotion, IconProps } from "../icon-types"
import { TONE_VALUES } from "../icon-types"
import styles from "./magnaflow-mark.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function MagnaflowMarkIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Magnaflow brand mark",
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
        {/* Three offset chevrons suggesting flow */}
        <path className={styles.chevron} d="M3 8l4 4-4 4" strokeWidth="2.2" />
        <path className={styles.chevron} d="M9 8l4 4-4 4" strokeWidth="2.2" />
        <path className={styles.chevron} d="M15 8l4 4-4 4" strokeWidth="2.2" />
        {/* Top underline */}
        <line className={styles.bar} x1="3" y1="4.4" x2="21" y2="4.4" strokeWidth="1.4" />
        {/* Bottom underline */}
        <line className={styles.bar} x1="3" y1="19.6" x2="21" y2="19.6" strokeWidth="1.4" />
      </svg>
    </span>
  )
}
