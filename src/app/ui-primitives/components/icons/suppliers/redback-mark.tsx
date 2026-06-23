import type { IconMotion, IconProps } from "../icon-types"
import { TONE_VALUES } from "../icon-types"
import styles from "./redback-mark.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function RedbackMarkIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Redback brand mark",
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
        {/* Stylized arachnid body — geometric */}
        <ellipse className={styles.body} cx="12" cy="12" rx="4.4" ry="5.6" />
        <ellipse className={styles.bodyStroke} cx="12" cy="12" rx="4.4" ry="5.6" />
        {/* Red stripe down back */}
        <rect className={styles.stripe} x="11.2" y="7.4" width="1.6" height="9.2" rx="0.4" />
        {/* Legs — 4 angled lines on each side */}
        <line className={styles.leg} x1="7.6" y1="9" x2="3.4" y2="6" />
        <line className={styles.leg} x1="7.6" y1="12" x2="2.8" y2="12" />
        <line className={styles.leg} x1="7.6" y1="15" x2="3.4" y2="18" />
        <line className={styles.leg} x1="16.4" y1="9" x2="20.6" y2="6" />
        <line className={styles.leg} x1="16.4" y1="12" x2="21.2" y2="12" />
        <line className={styles.leg} x1="16.4" y1="15" x2="20.6" y2="18" />
      </svg>
    </span>
  )
}
