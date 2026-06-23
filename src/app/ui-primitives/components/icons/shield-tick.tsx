import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./shield-tick.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function ShieldTickIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Verified shield",
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
        {/* Behind glow */}
        <circle className={styles.glow} cx="12" cy="12" r="5" />
        {/* Heraldic shield — flat top, curved sides, pointed base */}
        <path
          className={styles.shield}
          d="M12 2.4l8.4 2.4v6c0 4.4-3.2 8.6-8.4 10.6-5.2-2-8.4-6.2-8.4-10.6v-6z"
        />
        <path
          className={styles.shieldStroke}
          d="M12 2.4l8.4 2.4v6c0 4.4-3.2 8.6-8.4 10.6-5.2-2-8.4-6.2-8.4-10.6v-6z"
        />
        {/* Inner contour shield line */}
        <path
          className={styles.shieldInner}
          d="M12 4.6l6.2 1.8v4.4c0 3.2-2.4 6.4-6.2 8-3.8-1.6-6.2-4.8-6.2-8V6.4z"
        />
        {/* Tick */}
        <path className={styles.tick} d="M8.2 12l2.6 2.6 5-5.4" />
      </svg>
    </span>
  )
}
