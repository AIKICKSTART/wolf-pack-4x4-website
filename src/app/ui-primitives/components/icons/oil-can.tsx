import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./oil-can.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function OilCanIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Oil can",
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
        {/* Round main can body */}
        <ellipse className={styles.bodyTop} cx="8.4" cy="11.4" rx="5.4" ry="1.4" />
        <path
          className={styles.body}
          d="M3 11.4v6.8c0 1.6 2.4 2.8 5.4 2.8s5.4-1.2 5.4-2.8v-6.8c0 1.4-2.4 2.4-5.4 2.4s-5.4-1-5.4-2.4z"
        />
        <path
          className={styles.bodyStroke}
          d="M3 11.4v6.8c0 1.6 2.4 2.8 5.4 2.8s5.4-1.2 5.4-2.8v-6.8M3 11.4c0 1.4 2.4 2.4 5.4 2.4s5.4-1 5.4-2.4-2.4-2.4-5.4-2.4-5.4 1-5.4 2.4z"
        />
        {/* Top spout neck */}
        <path className={styles.spoutNeck} d="M7.4 9c0-.4.3-.7.7-.7h.6c.4 0 .7.3.7.7v1.6h-2z" />
        {/* Long curved spout */}
        <path
          className={styles.spoutLine}
          d="M9.4 8.4c2.4-.6 5-2 8-4.4"
          strokeWidth="1.6"
        />
        <path
          className={styles.spoutLine}
          d="M10.4 7.8c2.2-.4 4.6-1.6 6.8-3.4"
          strokeWidth="1.1"
        />
        {/* Spout opening flare */}
        <path className={styles.spoutTip} d="M17 4l1.6-.8.5.9-1.6.8z" />
        {/* Handle on side */}
        <path
          className={styles.handle}
          d="M13.8 13.6c1.4-.2 2.6.2 2.6 1.6v3.6c0 .6-.4 1-1 1h-.6"
        />
        {/* Drops */}
        <circle className={styles.drop} data-d="1" cx="19.4" cy="5" r="0.5" />
        <circle className={styles.drop} data-d="2" cx="20.4" cy="6.2" r="0.4" />
        <circle className={styles.drop} data-d="3" cx="21.2" cy="7.4" r="0.35" />
      </svg>
    </span>
  )
}
