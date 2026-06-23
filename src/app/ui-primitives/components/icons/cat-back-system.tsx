import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./cat-back-system.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function CatBackSystemIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Cat-back exhaust system",
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
        {/* Cat (catalytic converter) on left */}
        <rect className={styles.cat} x="1.6" y="9.6" width="4.6" height="4.8" rx="0.8" />
        <line className={styles.catGrid} x1="2.4" y1="10.4" x2="2.4" y2="13.6" />
        <line className={styles.catGrid} x1="3.2" y1="10.4" x2="3.2" y2="13.6" />
        <line className={styles.catGrid} x1="4" y1="10.4" x2="4" y2="13.6" />
        <line className={styles.catGrid} x1="4.8" y1="10.4" x2="4.8" y2="13.6" />
        <line className={styles.catGrid} x1="5.6" y1="10.4" x2="5.6" y2="13.6" />
        {/* Mid pipe connector */}
        <path className={styles.pipe} d="M6.2 11h2v2h-2z" />
        {/* Resonator */}
        <rect className={styles.resonator} x="8.2" y="10.4" width="3.4" height="3.2" rx="0.6" />
        {/* Mid pipe */}
        <path className={styles.pipe} d="M11.6 11h1.6v2h-1.6z" />
        {/* Main muffler */}
        <rect className={styles.muffler} x="13.2" y="9.8" width="5.4" height="4.4" rx="1.6" />
        {/* Tail pipe */}
        <path className={styles.tail} d="M18.6 11h2.4v2h-2.4z" />
        <path className={styles.tip} d="M21 10.2h1.6c.3 0 .4.2.4.4v2.8c0 .2-.2.4-.4.4H21z" />
        {/* Hangers */}
        <line className={styles.hanger} x1="3.8" y1="9.6" x2="3.8" y2="7.6" />
        <line className={styles.hanger} x1="10" y1="10.4" x2="10" y2="7.6" />
        <line className={styles.hanger} x1="16" y1="9.8" x2="16" y2="7.6" />
        <line className={styles.hanger} x1="20" y1="11" x2="20" y2="7.6" />
        {/* Flow indicator */}
        <path className={styles.flow} d="M6 12h12" strokeDasharray="2 1.4" />
      </svg>
    </span>
  )
}
