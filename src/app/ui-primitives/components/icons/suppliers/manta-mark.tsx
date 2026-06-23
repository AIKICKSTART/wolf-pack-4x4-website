import type { IconMotion, IconProps } from "../icon-types"
import { TONE_VALUES } from "../icon-types"
import styles from "./manta-mark.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function MantaMarkIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Manta brand mark",
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
        {/* Manta ray-inspired flat wings */}
        <path
          className={styles.wing}
          d="M2 12c4-4 8-6 10-6s6 2 10 6c-4 4-8 6-10 6s-6-2-10-6z"
        />
        <path
          className={styles.wingStroke}
          d="M2 12c4-4 8-6 10-6s6 2 10 6c-4 4-8 6-10 6s-6-2-10-6z"
        />
        {/* Body band */}
        <path className={styles.body} d="M9 12h6" strokeWidth="2.2" />
        {/* Eyes */}
        <circle className={styles.eye} cx="9.6" cy="11" r="0.6" />
        <circle className={styles.eye} cx="14.4" cy="11" r="0.6" />
      </svg>
    </span>
  )
}
