import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./lambda-sensor.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function LambdaSensorIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Lambda O2 sensor",
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
        {/* Connector plug at top */}
        <rect className={styles.connector} x="8.6" y="2.4" width="6.8" height="2.6" rx="0.4" />
        <line className={styles.pin} x1="10.4" y1="2.4" x2="10.4" y2="1.4" />
        <line className={styles.pin} x1="12" y1="2.4" x2="12" y2="1.4" />
        <line className={styles.pin} x1="13.6" y1="2.4" x2="13.6" y2="1.4" />
        {/* Cable shroud (4-wire bundle) */}
        <path className={styles.cable} d="M12 5v3" strokeWidth="2.4" />
        <path className={styles.cableInner} d="M12 5v3" />
        {/* Heat shield boot */}
        <path className={styles.boot} d="M9.6 8.4h4.8c.4 0 .6.4.4.7l-1 1.4h-3.6l-1-1.4c-.2-.3 0-.7.4-.7z" />
        {/* Hex bolt mount nut */}
        <path
          className={styles.hex}
          d="M8 11.4h8l1.6 2.4-1.6 2.4H8l-1.6-2.4z"
        />
        <path
          className={styles.hexStroke}
          d="M8 11.4h8l1.6 2.4-1.6 2.4H8l-1.6-2.4z"
        />
        {/* Probe body (threaded section) */}
        <rect className={styles.probe} x="9.4" y="16.6" width="5.2" height="3.4" rx="0.3" />
        <line className={styles.threads} x1="9.6" y1="17.4" x2="14.4" y2="17.4" strokeWidth="0.6" />
        <line className={styles.threads} x1="9.6" y1="18.2" x2="14.4" y2="18.2" strokeWidth="0.6" />
        <line className={styles.threads} x1="9.6" y1="19" x2="14.4" y2="19" strokeWidth="0.6" />
        <line className={styles.threads} x1="9.6" y1="19.8" x2="14.4" y2="19.8" strokeWidth="0.6" />
        {/* Sensing tip with vent holes */}
        <path className={styles.tip} d="M9.6 20h4.8l-1 2H10.6z" />
        <circle className={styles.vent} cx="11.2" cy="21" r="0.25" />
        <circle className={styles.vent} cx="12" cy="21.4" r="0.25" />
        <circle className={styles.vent} cx="12.8" cy="21" r="0.25" />
        {/* Lambda character */}
        <text className={styles.lambdaSymbol} x="20.4" y="14.6" textAnchor="middle">λ</text>
      </svg>
    </span>
  )
}
