import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./mufflermen-monogram.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function MufflermenMonogramIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Oak Flats Mufflermen monogram",
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
        {/* Outer hex frame badge */}
        <path
          className={styles.badge}
          d="M12 1.6l8.6 5v10.8L12 22.4 3.4 17.4V6.6z"
        />
        <path
          className={styles.badgeStroke}
          d="M12 1.6l8.6 5v10.8L12 22.4 3.4 17.4V6.6z"
        />
        {/* Inner ring */}
        <path
          className={styles.innerRing}
          d="M12 4.4l6.2 3.6v7.8L12 19.4l-6.2-3.6V8z"
        />
        {/* O letter — left half */}
        <path
          className={styles.o}
          d="M7 9.5c0-.4.3-.7.7-.7h2.8v6.4H7.7c-.4 0-.7-.3-.7-.7z"
        />
        {/* F letter — right half */}
        <path
          className={styles.f}
          d="M13 8.8h4.3v1.6h-2.8v1.6h2.4v1.6h-2.4v1.6H13z"
        />
        {/* M base bar / underline */}
        <path className={styles.bar} d="M7 15.8h10" strokeWidth="1.2" />
        {/* Center dot */}
        <circle className={styles.dot} cx="12" cy="12" r="0.45" />
      </svg>
    </span>
  )
}
