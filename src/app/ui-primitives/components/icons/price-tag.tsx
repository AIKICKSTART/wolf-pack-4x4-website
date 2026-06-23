import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./price-tag.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function PriceTagIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Price tag",
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
        {/* String attaching to source */}
        <path className={styles.string} d="M3.6 3.6L1.6 1.6" />
        <circle className={styles.stringEnd} cx="1.2" cy="1.2" r="0.4" />
        <g className={styles.tagGroup}>
          {/* Tag silhouette — proper trapezoid shape with pointed left edge */}
          <path
            className={styles.tag}
            d="M3.4 3.4l7.6-.3c.7-.04 1.5.24 2 .76l7.6 7.6c.8.8.8 2.1 0 2.9l-6.5 6.5c-.8.8-2.1.8-2.9 0l-7.6-7.6a2 2 0 01-.74-1.93z"
          />
          <path
            className={styles.tagStroke}
            d="M3.4 3.4l7.6-.3c.7-.04 1.5.24 2 .76l7.6 7.6c.8.8.8 2.1 0 2.9l-6.5 6.5c-.8.8-2.1.8-2.9 0l-7.6-7.6a2 2 0 01-.74-1.93z"
          />
          {/* Eyelet hole */}
          <circle className={styles.eyelet} cx="6.8" cy="6.8" r="1.6" />
          <circle className={styles.hole} cx="6.8" cy="6.8" r="1" />
          {/* Bottom divider line */}
          <line className={styles.divider} x1="11.8" y1="13.4" x2="16" y2="17.6" strokeWidth="0.7" />
          {/* Dollar sign */}
          <text className={styles.dollar} x="13.2" y="16" textAnchor="middle">$</text>
        </g>
      </svg>
    </span>
  )
}
