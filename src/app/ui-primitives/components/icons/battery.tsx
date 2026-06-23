import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./battery.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function BatteryIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Car battery",
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
        {/* Positive terminal post */}
        <rect className={styles.terminalPos} x="5.6" y="3.4" width="2.4" height="2" rx="0.3" />
        <rect className={styles.terminalPosCap} x="6.2" y="2.2" width="1.2" height="1.2" rx="0.2" />
        {/* Negative terminal post */}
        <rect className={styles.terminalNeg} x="16" y="3.4" width="2.4" height="2" rx="0.3" />
        <rect className={styles.terminalNegCap} x="16.6" y="2.2" width="1.2" height="1.2" rx="0.2" />
        {/* Main body */}
        <rect className={styles.body} x="3" y="5.4" width="18" height="15" rx="1.4" />
        <rect className={styles.bodyStroke} x="3" y="5.4" width="18" height="15" rx="1.4" />
        {/* Top trim band */}
        <line className={styles.topTrim} x1="3" y1="7" x2="21" y2="7" strokeWidth="1.2" />
        {/* Cell caps — 6 cells (12V battery) */}
        <circle className={styles.cellCap} cx="5.4" cy="9.2" r="0.7" />
        <circle className={styles.cellCap} cx="8.6" cy="9.2" r="0.7" />
        <circle className={styles.cellCap} cx="11.8" cy="9.2" r="0.7" />
        <circle className={styles.cellCap} cx="14.6" cy="9.2" r="0.7" />
        <circle className={styles.cellCap} cx="17.8" cy="9.2" r="0.7" />
        {/* +/- labels */}
        <line className={styles.posMark} x1="6.8" y1="14" x2="6.8" y2="16" />
        <line className={styles.posMark} x1="5.8" y1="15" x2="7.8" y2="15" />
        <line className={styles.negMark} x1="16.2" y1="15" x2="18.2" y2="15" />
        {/* Voltage label */}
        <text className={styles.voltLabel} x="12" y="17" textAnchor="middle">12V</text>
        {/* Charge indicator */}
        <rect className={styles.chargeBar} x="9.8" y="18.6" width="4.4" height="0.8" rx="0.2" />
        <rect className={styles.chargeFill} x="9.8" y="18.6" width="3" height="0.8" rx="0.2" />
      </svg>
    </span>
  )
}
