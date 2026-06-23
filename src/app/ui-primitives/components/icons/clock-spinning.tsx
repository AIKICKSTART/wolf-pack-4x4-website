import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./clock-spinning.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function ClockSpinningIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Spinning clock",
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
        {/* Bezel + face */}
        <circle className={styles.face} cx="12" cy="12" r="9" />
        <circle className={styles.dial} cx="12" cy="12" r="9" />
        <circle className={styles.innerRing} cx="12" cy="12" r="7.4" />
        {/* Hour ticks (12 positions) */}
        <line className={styles.tick} x1="12" y1="3.4" x2="12" y2="4.8" />
        <line className={styles.tick} x1="12" y1="19.2" x2="12" y2="20.6" />
        <line className={styles.tick} x1="3.4" y1="12" x2="4.8" y2="12" />
        <line className={styles.tick} x1="19.2" y1="12" x2="20.6" y2="12" />
        <line className={styles.tickHalf} x1="7.2" y1="3.6" x2="7.8" y2="4.7" />
        <line className={styles.tickHalf} x1="16.8" y1="3.6" x2="16.2" y2="4.7" />
        <line className={styles.tickHalf} x1="20.4" y1="7.2" x2="19.3" y2="7.8" />
        <line className={styles.tickHalf} x1="20.4" y1="16.8" x2="19.3" y2="16.2" />
        <line className={styles.tickHalf} x1="16.8" y1="20.4" x2="16.2" y2="19.3" />
        <line className={styles.tickHalf} x1="7.2" y1="20.4" x2="7.8" y2="19.3" />
        <line className={styles.tickHalf} x1="3.6" y1="16.8" x2="4.7" y2="16.2" />
        <line className={styles.tickHalf} x1="3.6" y1="7.2" x2="4.7" y2="7.8" />
        {/* 12 / 3 / 6 / 9 numerals */}
        <text className={styles.numeral} x="12" y="6.8" textAnchor="middle">12</text>
        <text className={styles.numeral} x="17.5" y="12.8" textAnchor="middle">3</text>
        <text className={styles.numeral} x="12" y="18.6" textAnchor="middle">6</text>
        <text className={styles.numeral} x="6.5" y="12.8" textAnchor="middle">9</text>
        {/* Hour + minute hands */}
        <line className={styles.hour} x1="12" y1="12" x2="12" y2="7.6" />
        <line className={styles.minute} x1="12" y1="12" x2="16" y2="12" />
        <line className={styles.second} x1="12" y1="12" x2="14.4" y2="9.6" />
        <circle className={styles.center} cx="12" cy="12" r="1.1" />
        <circle className={styles.centerInner} cx="12" cy="12" r="0.4" />
      </svg>
    </span>
  )
}
