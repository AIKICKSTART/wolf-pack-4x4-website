import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./dyno-curve.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function DynoCurveIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Dyno power curve",
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
        {/* Grid */}
        <line className={styles.axis} x1="3" y1="20" x2="21" y2="20" strokeWidth="1.2" />
        <line className={styles.axis} x1="3" y1="3.4" x2="3" y2="20" strokeWidth="1.2" />
        <line className={styles.grid} x1="3" y1="16" x2="21" y2="16" />
        <line className={styles.grid} x1="3" y1="12" x2="21" y2="12" />
        <line className={styles.grid} x1="3" y1="8" x2="21" y2="8" />
        <line className={styles.grid} x1="7.5" y1="3.4" x2="7.5" y2="20" />
        <line className={styles.grid} x1="12" y1="3.4" x2="12" y2="20" />
        <line className={styles.grid} x1="16.5" y1="3.4" x2="16.5" y2="20" />
        {/* Axis labels */}
        <text className={styles.axisLabel} x="2.6" y="6" textAnchor="end">HP</text>
        <text className={styles.axisLabel} x="22" y="21.6" textAnchor="end">RPM</text>
        {/* Torque curve (background) — peaks earlier */}
        <path className={styles.torque} d="M3 18 Q 8 14 11 8.4 T 20 12" />
        {/* Power curve — main peak, rises and tapers */}
        <path className={styles.power} d="M3 18 C 6 16, 9 11, 13 6.4 S 18 5.4, 20 7.4" />
        {/* Peak marker */}
        <circle className={styles.peakHalo} cx="13" cy="6.4" r="2.4" />
        <circle className={styles.peakDot} cx="13" cy="6.4" r="1" />
        <line className={styles.peakLine} x1="13" y1="6.4" x2="13" y2="20" strokeDasharray="1.6 1.6" />
      </svg>
    </span>
  )
}
