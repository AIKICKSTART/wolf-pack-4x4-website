import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./tachometer.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function TachometerIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Tachometer",
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
        {/* Gauge bezel + face */}
        <circle className={styles.faceFill} cx="12" cy="14" r="9" />
        <path className={styles.face} d="M3 14a9 9 0 0118 0" />
        {/* Inner sweep arc */}
        <path className={styles.arc} d="M5.6 14a6.4 6.4 0 016.4-6.4" />
        {/* Redline arc on right */}
        <path className={styles.redline} d="M18.4 14a6.4 6.4 0 00-3.4-5.6" strokeWidth="2.1" />
        {/* Major ticks at 0, 1, 2, ... 8 */}
        <line className={styles.majorTick} x1="3.6" y1="14" x2="5" y2="14" />
        <line className={styles.majorTick} x1="4.5" y1="10.5" x2="5.7" y2="11" />
        <line className={styles.majorTick} x1="6.7" y1="7.7" x2="7.6" y2="8.6" />
        <line className={styles.majorTick} x1="10" y1="5.5" x2="10.4" y2="6.7" />
        <line className={styles.majorTick} x1="14" y1="5.5" x2="13.6" y2="6.7" />
        <line className={styles.majorTick} x1="17.3" y1="7.7" x2="16.4" y2="8.6" />
        <line className={styles.majorTick} x1="19.5" y1="10.5" x2="18.3" y2="11" />
        <line className={styles.majorTick} x1="20.4" y1="14" x2="19" y2="14" />
        {/* Minor ticks between majors */}
        <line className={styles.minorTick} x1="3.8" y1="12.3" x2="4.8" y2="12.5" strokeWidth="0.7" />
        <line className={styles.minorTick} x1="5.5" y1="9" x2="6.3" y2="9.6" strokeWidth="0.7" />
        <line className={styles.minorTick} x1="8.2" y1="6.4" x2="8.8" y2="7.2" strokeWidth="0.7" />
        <line className={styles.minorTick} x1="12" y1="5.2" x2="12" y2="6.2" strokeWidth="0.7" />
        <line className={styles.minorTick} x1="15.8" y1="6.4" x2="15.2" y2="7.2" strokeWidth="0.7" />
        <line className={styles.minorTick} x1="18.5" y1="9" x2="17.7" y2="9.6" strokeWidth="0.7" />
        {/* Number labels */}
        <text className={styles.label} x="3.5" y="15.4" textAnchor="start">0</text>
        <text className={styles.label} x="20.5" y="15.4" textAnchor="end">8</text>
        <text className={styles.rpmLabel} x="12" y="18" textAnchor="middle">RPM x1000</text>
        {/* Needle */}
        <line className={styles.needle} x1="12" y1="14" x2="12" y2="6.6" />
        <circle className={styles.center} cx="12" cy="14" r="1.3" />
        <circle className={styles.centerInner} cx="12" cy="14" r="0.5" />
      </svg>
    </span>
  )
}
