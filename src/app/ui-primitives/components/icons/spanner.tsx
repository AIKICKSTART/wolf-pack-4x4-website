import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./spanner.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function SpannerIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Spanner",
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
        {/* Open-end jaw (top-left) — V-shape */}
        <path
          className={styles.body}
          d="M3.4 4.2l3.6 3.6 1.8-1.8-3.6-3.6c-.4-.4-1.1-.4-1.5 0L3 3.7c-.4.4-.4 1.1.4 1.5z"
        />
        <path
          className={styles.openJaw}
          d="M3 3.7l1.4 1.4 2.7 2.7"
        />
        {/* Shaft */}
        <rect className={styles.body} x="7.4" y="6.4" width="9.2" height="2.8" rx="0.5" transform="rotate(45 12 7.8)" />
        {/* Ring-end (bottom-right) — hex outline + outer circle */}
        <circle className={styles.ringOuter} cx="17.4" cy="17.4" r="4.2" />
        <path
          className={styles.hexHole}
          d="M17.4 14.6l2 1.2v2l-2 1.2-2-1.2v-2z"
        />
        {/* Polish glint */}
        <path className={styles.glint} d="M9 9.5l5 5" strokeWidth="0.9" />
        <circle className={styles.bolt} cx="6.4" cy="6.4" r="0.6" />
        <circle className={styles.bolt} cx="17.4" cy="17.4" r="0.6" />
      </svg>
    </span>
  )
}
