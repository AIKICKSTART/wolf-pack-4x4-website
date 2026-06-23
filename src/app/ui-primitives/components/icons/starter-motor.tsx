import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./starter-motor.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function StarterMotorIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Starter motor",
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
        {/* Main motor cylinder */}
        <rect className={styles.body} x="2.4" y="6" width="10" height="11.4" rx="1.6" />
        <rect className={styles.bodyStroke} x="2.4" y="6" width="10" height="11.4" rx="1.6" />
        {/* End cap with brush inspection */}
        <line className={styles.endCap} x1="2.4" y1="8" x2="12.4" y2="8" strokeWidth="1.1" />
        <line className={styles.endCap} x1="2.4" y1="15.4" x2="12.4" y2="15.4" strokeWidth="1.1" />
        {/* Cooling vents */}
        <line className={styles.vent} x1="4" y1="9.2" x2="4" y2="14.2" />
        <line className={styles.vent} x1="5.2" y1="9.2" x2="5.2" y2="14.2" />
        <line className={styles.vent} x1="6.4" y1="9.2" x2="6.4" y2="14.2" />
        <line className={styles.vent} x1="7.6" y1="9.2" x2="7.6" y2="14.2" />
        <line className={styles.vent} x1="8.8" y1="9.2" x2="8.8" y2="14.2" />
        <line className={styles.vent} x1="10" y1="9.2" x2="10" y2="14.2" />
        {/* Solenoid (smaller cylinder on top) */}
        <rect className={styles.solenoid} x="4" y="2.6" width="6.6" height="3.4" rx="0.6" />
        <rect className={styles.solenoidStroke} x="4" y="2.6" width="6.6" height="3.4" rx="0.6" />
        {/* Battery cable post */}
        <circle className={styles.cablePost} cx="10" cy="4.3" r="0.6" />
        {/* Drive shaft housing extending right */}
        <rect className={styles.driveHousing} x="12.4" y="10" width="2.4" height="3.4" rx="0.4" />
        {/* Pinion (Bendix) gear */}
        <g className={styles.gearGroup}>
          <circle className={styles.gearBody} cx="18.4" cy="11.7" r="3.2" />
          <circle className={styles.gearInner} cx="18.4" cy="11.7" r="1.6" />
          {/* Gear teeth */}
          <path
            className={styles.gearTeeth}
            d="M18.4 8.1v0.8M18.4 14.5v0.8M14.8 11.7h0.8M21.2 11.7h0.8M15.9 9.2l0.6 0.6M20.3 14.2l0.6 0.6M21 9.2l-0.6 0.6M15.9 14.2l-0.6 0.6"
            strokeWidth="0.9"
          />
          {/* Square drive */}
          <rect className={styles.gearDrive} x="17.6" y="10.9" width="1.6" height="1.6" rx="0.2" transform="rotate(45 18.4 11.7)" />
        </g>
      </svg>
    </span>
  )
}
