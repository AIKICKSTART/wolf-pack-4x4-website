import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./fuel-pump.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function FuelPumpIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Fuel pump",
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
        {/* Pump body — chunky filling-station pump */}
        <rect className={styles.body} x="3" y="5.2" width="11" height="15.6" rx="1.6" />
        <rect className={styles.bodyStroke} x="3" y="5.2" width="11" height="15.6" rx="1.6" />
        {/* Display screen */}
        <rect className={styles.screen} x="4.6" y="7" width="7.8" height="3.6" rx="0.4" />
        <line className={styles.digit} x1="5.6" y1="9.2" x2="7" y2="9.2" strokeWidth="1" />
        <line className={styles.digit} x1="7.6" y1="9.2" x2="9" y2="9.2" strokeWidth="1" />
        <line className={styles.digit} x1="9.6" y1="9.2" x2="11" y2="9.2" strokeWidth="1" />
        <text className={styles.fuelLabel} x="8.5" y="13.4" textAnchor="middle">$</text>
        {/* Buttons */}
        <rect className={styles.button} x="4.6" y="14.6" width="3.4" height="1.6" rx="0.3" />
        <rect className={styles.button} x="9" y="14.6" width="3.4" height="1.6" rx="0.3" />
        <rect className={styles.button} x="4.6" y="16.8" width="3.4" height="1.6" rx="0.3" />
        <rect className={styles.button} x="9" y="16.8" width="3.4" height="1.6" rx="0.3" />
        {/* Base */}
        <rect className={styles.base} x="2.4" y="20.4" width="12.2" height="1.4" rx="0.3" />
        {/* Hose loop */}
        <path className={styles.hose} d="M14 8c2.4 0 3.6 1.6 3.6 3.4v6.8c0 .8.6 1.4 1.4 1.4" />
        {/* Nozzle handle (pistol grip) */}
        <path className={styles.nozzleBody} d="M19 19.2h2.6c.4 0 .8.4.8.8v1.6c0 .4-.4.8-.8.8H19c-.4 0-.8-.4-.8-.8V20c0-.4.4-.8.8-.8z" />
        {/* Nozzle barrel */}
        <rect className={styles.nozzleBarrel} x="20.4" y="16.4" width="1.6" height="3.2" rx="0.2" />
        {/* Trigger */}
        <path className={styles.trigger} d="M18.4 21.2c-.8 0-1.4-.4-1.4-1.2" />
      </svg>
    </span>
  )
}
