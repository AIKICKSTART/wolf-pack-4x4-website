import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./flame-jet.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function FlameJetIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Flame jet",
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
        {/* Outer flame — wide red base, tapered tip with hot-spot lick */}
        <path
          className={styles.outerFlame}
          d="M12 2.4c1.4 2.4 2.2 4 2.4 5.4.6-1 1.4-2 2-2.4-.4 2.6.8 3.8 1.4 5.6.8 2.4.6 4.6-.8 6.6-1.6 2.4-3.6 3-5 3-1.4 0-3.4-.6-5-3-1.4-2-1.6-4.2-.8-6.6.6-1.8 1.8-3 1.4-5.6.6.4 1.4 1.4 2 2.4.2-1.4 1-3 2.4-5.4z"
        />
        {/* Mid flame — orange tongue */}
        <path
          className={styles.midFlame}
          d="M12 5.8c1.2 2 2 4.4 2.4 5.6.6 1.8.4 3.4-.4 4.8-1 1.6-2 2-2 2s-1-.4-2-2c-.8-1.4-1-3-.4-4.8.4-1.2 1.2-3.6 2.4-5.6z"
        />
        {/* Inner flame — yellow/white hot core */}
        <path
          className={styles.innerCore}
          d="M12 9.2c.6 1.4 1.4 2.8 1.6 4 .3 1.4 0 2.6-1.6 3.4-1.6-.8-1.9-2-1.6-3.4.2-1.2 1-2.6 1.6-4z"
        />
        {/* Burner base line */}
        <path className={styles.burner} d="M4 21h16" />
        <rect className={styles.burnerBlock} x="9.5" y="20.1" width="5" height="1.3" rx="0.3" />
        {/* Trailing sparks */}
        <circle className={styles.spark} data-s="1" cx="9.2" cy="6.4" r="0.7" />
        <circle className={styles.spark} data-s="2" cx="14.6" cy="5.2" r="0.6" />
        <circle className={styles.spark} data-s="3" cx="12" cy="2.6" r="0.5" />
      </svg>
    </span>
  )
}
