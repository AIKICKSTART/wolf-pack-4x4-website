import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./crankshaft.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function CrankshaftIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Crankshaft",
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
        {/* Main shaft journals (left + right) — extended shaft sticks out */}
        <rect className={styles.shaftSolid} x="1.4" y="11.2" width="3.6" height="1.6" rx="0.3" />
        <rect className={styles.shaftSolid} x="19" y="11.2" width="3.6" height="1.6" rx="0.3" />
        {/* Main bearing journals — round bushings */}
        <circle className={styles.mainBearing} cx="5.6" cy="12" r="2.2" />
        <circle className={styles.mainBearingInner} cx="5.6" cy="12" r="0.6" />
        <circle className={styles.mainBearing} cx="18.4" cy="12" r="2.2" />
        <circle className={styles.mainBearingInner} cx="18.4" cy="12" r="0.6" />
        {/* Crank web + counterweights — characteristic teardrop counterweight */}
        <g className={styles.lobeGroup}>
          <path
            className={styles.counterweight}
            d="M7.6 7.4c0-1.3 1-2.4 2.4-2.4h4c1.3 0 2.4 1 2.4 2.4v.6c0 .9-.7 1.6-1.6 1.6H9.2c-.9 0-1.6-.7-1.6-1.6z"
          />
          <path
            className={styles.counterweightStroke}
            d="M7.6 7.4c0-1.3 1-2.4 2.4-2.4h4c1.3 0 2.4 1 2.4 2.4v.6c0 .9-.7 1.6-1.6 1.6H9.2c-.9 0-1.6-.7-1.6-1.6z"
          />
          <path
            className={styles.counterweight}
            d="M7.6 16.6c0-1.3 1-2.4 2.4-2.4h4c1.3 0 2.4 1 2.4 2.4v.6c0 .9-.7 1.6-1.6 1.6H9.2c-.9 0-1.6-.7-1.6-1.6z"
            transform="rotate(180 12 16.7)"
          />
          <path
            className={styles.counterweightStroke}
            d="M7.6 16.6c0-1.3 1-2.4 2.4-2.4h4c1.3 0 2.4 1 2.4 2.4v.6c0 .9-.7 1.6-1.6 1.6H9.2c-.9 0-1.6-.7-1.6-1.6z"
            transform="rotate(180 12 16.7)"
          />
          {/* Web connecting top + bottom */}
          <rect className={styles.web} x="9.8" y="9.2" width="4.4" height="5.6" />
          <rect className={styles.webStroke} x="9.8" y="9.2" width="4.4" height="5.6" />
          {/* Rod journal pins */}
          <circle className={styles.pin} cx="12" cy="8.6" r="1.3" />
          <circle className={styles.pinHole} cx="12" cy="8.6" r="0.5" />
          <circle className={styles.pin} cx="12" cy="15.4" r="1.3" />
          <circle className={styles.pinHole} cx="12" cy="15.4" r="0.5" />
        </g>
      </svg>
    </span>
  )
}
