import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./piston.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function PistonIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Piston",
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
        {/* Cylinder walls — open at top */}
        <path className={styles.cyl} d="M6 3v18M18 3v18" strokeWidth="1.4" />
        <path className={styles.cylTop} d="M6 3h12" strokeWidth="1.4" />
        {/* Piston crown (top dome with valve reliefs) */}
        <g className={styles.pistonGroup}>
          <path className={styles.head} d="M6.6 6.6h10.8v3.4c0 .4-.3.7-.7.7H7.3c-.4 0-.7-.3-.7-.7z" />
          <path className={styles.crownTop} d="M6.6 6.6c0-.6 1.2-1.4 5.4-1.4s5.4.8 5.4 1.4z" />
          {/* Valve reliefs on crown */}
          <ellipse className={styles.valveRelief} cx="9.4" cy="6.3" rx="1.2" ry="0.4" />
          <ellipse className={styles.valveRelief} cx="14.6" cy="6.3" rx="1.2" ry="0.4" />
          {/* Compression rings (3) */}
          <path className={styles.ring} d="M6.6 8.2h10.8M6.6 9.2h10.8M6.6 10.2h10.8" strokeWidth="0.8" />
          {/* Skirt */}
          <path className={styles.skirt} d="M7 10.7v3.2c0 1 .8 1.8 1.8 1.8h6.4c1 0 1.8-.8 1.8-1.8v-3.2z" />
          {/* Wrist pin */}
          <circle className={styles.pinHole} cx="12" cy="12.4" r="1.4" />
          <circle className={styles.pinInner} cx="12" cy="12.4" r="0.7" />
        </g>
        {/* Connecting rod */}
        <path className={styles.rod} d="M10.8 15.6h2.4v3.4c0 .7-.5 1.2-1.2 1.2s-1.2-.5-1.2-1.2z" />
        <circle className={styles.bigEnd} cx="12" cy="20.4" r="1.5" />
        <circle className={styles.bigEndInner} cx="12" cy="20.4" r="0.6" />
      </svg>
    </span>
  )
}
