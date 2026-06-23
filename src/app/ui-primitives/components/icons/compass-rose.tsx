import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./compass-rose.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function CompassRoseIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Compass rose",
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
        {/* Outer bezel */}
        <circle className={styles.face} cx="12" cy="12" r="9.4" />
        <circle className={styles.outer} cx="12" cy="12" r="9.4" />
        <circle className={styles.innerCircle} cx="12" cy="12" r="6.4" />
        {/* Cardinal letters */}
        <text className={styles.cardinal} x="12" y="5.4" textAnchor="middle">N</text>
        <text className={styles.cardinal} x="12" y="20.4" textAnchor="middle">S</text>
        <text className={styles.cardinal} x="19.4" y="12.9" textAnchor="middle">E</text>
        <text className={styles.cardinal} x="4.6" y="12.9" textAnchor="middle">W</text>
        {/* Cardinal tick marks */}
        <line className={styles.tick} x1="12" y1="3.4" x2="12" y2="4.6" strokeWidth="1.2" />
        <line className={styles.tick} x1="12" y1="19.4" x2="12" y2="20.6" strokeWidth="1.2" />
        <line className={styles.tick} x1="3.4" y1="12" x2="4.6" y2="12" strokeWidth="1.2" />
        <line className={styles.tick} x1="19.4" y1="12" x2="20.6" y2="12" strokeWidth="1.2" />
        {/* Intercardinal small ticks */}
        <line className={styles.tickHalf} x1="6.4" y1="6.4" x2="7" y2="7" />
        <line className={styles.tickHalf} x1="17.6" y1="6.4" x2="17" y2="7" />
        <line className={styles.tickHalf} x1="6.4" y1="17.6" x2="7" y2="17" />
        <line className={styles.tickHalf} x1="17.6" y1="17.6" x2="17" y2="17" />
        {/* 8-point star — N, E, S, W blades + 4 secondary blades */}
        <g className={styles.needle}>
          <path className={styles.northBlade} d="M12 5.6l2.4 6.4h-4.8z" />
          <path className={styles.southBlade} d="M12 18.4l2.4-6.4h-4.8z" />
          <path className={styles.westBlade} d="M5.6 12l6.4 2.4v-4.8z" />
          <path className={styles.eastBlade} d="M18.4 12l-6.4 2.4v-4.8z" />
          <path className={styles.minorBlade} d="M12 12l-3.4-3.4 3.4 1.2z" />
          <path className={styles.minorBlade} d="M12 12l3.4-3.4-3.4 1.2z" />
          <path className={styles.minorBlade} d="M12 12l-3.4 3.4 3.4-1.2z" />
          <path className={styles.minorBlade} d="M12 12l3.4 3.4-3.4-1.2z" />
        </g>
        <circle className={styles.hubRing} cx="12" cy="12" r="1.4" />
        <circle className={styles.hub} cx="12" cy="12" r="0.7" />
      </svg>
    </span>
  )
}
