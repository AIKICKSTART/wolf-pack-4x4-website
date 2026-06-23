import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./alternator.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function AlternatorIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Alternator",
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
        {/* Mounting ear lugs */}
        <rect className={styles.lug} x="2" y="11.2" width="2.4" height="2" rx="0.3" />
        <circle className={styles.lugHole} cx="3.2" cy="12.2" r="0.4" />
        <rect className={styles.lug} x="19.6" y="11.2" width="2.4" height="2" rx="0.3" />
        <circle className={styles.lugHole} cx="20.8" cy="12.2" r="0.4" />
        {/* Cylindrical case — front + rear with cooling fins */}
        <rect className={styles.case} x="4.4" y="5.6" width="15.2" height="13" rx="2.4" />
        <rect className={styles.caseStroke} x="4.4" y="5.6" width="15.2" height="13" rx="2.4" />
        {/* Cooling fin slots */}
        <line className={styles.fin} x1="6" y1="6.8" x2="6" y2="17.4" />
        <line className={styles.fin} x1="7.2" y1="6.8" x2="7.2" y2="17.4" />
        <line className={styles.fin} x1="8.4" y1="6.8" x2="8.4" y2="17.4" />
        <line className={styles.fin} x1="15.6" y1="6.8" x2="15.6" y2="17.4" />
        <line className={styles.fin} x1="16.8" y1="6.8" x2="16.8" y2="17.4" />
        <line className={styles.fin} x1="18" y1="6.8" x2="18" y2="17.4" />
        {/* Center pulley shaft + serpentine pulley */}
        <circle className={styles.pulleyShadow} cx="12" cy="12" r="4.4" />
        <g className={styles.pulleyGroup}>
          <circle className={styles.pulley} cx="12" cy="12" r="4" />
          <circle className={styles.pulleyInner} cx="12" cy="12" r="3" />
          {/* Serpentine belt grooves */}
          <circle className={styles.groove} cx="12" cy="12" r="3.6" />
          <circle className={styles.groove} cx="12" cy="12" r="3.2" />
          {/* Center bolt */}
          <circle className={styles.boltHead} cx="12" cy="12" r="1" />
          <path className={styles.boltStar} d="M11.4 12l.6-.6.6.6.6.6-.6.6-.6.6-.6-.6-.6-.6z" />
        </g>
      </svg>
    </span>
  )
}
