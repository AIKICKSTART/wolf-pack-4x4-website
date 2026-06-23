import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./radio-tower.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function RadioTowerIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Radio tower",
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
        {/* Antenna mast on top */}
        <line className={styles.mast} x1="12" y1="3" x2="12" y2="6.4" />
        <circle className={styles.tip} cx="12" cy="5.4" r="0.8" />
        <line className={styles.tipBlink} x1="12" y1="3" x2="12" y2="3.6" />
        {/* Tower lattice — A-frame with horizontal crossbars + diagonal X bracing */}
        <line className={styles.leg} x1="12" y1="6.4" x2="7.4" y2="21" />
        <line className={styles.leg} x1="12" y1="6.4" x2="16.6" y2="21" />
        {/* Horizontal cross-bars at multiple heights */}
        <line className={styles.cross} x1="10.4" y1="11.5" x2="13.6" y2="11.5" />
        <line className={styles.cross} x1="9.4" y1="14.5" x2="14.6" y2="14.5" />
        <line className={styles.cross} x1="8.4" y1="17.5" x2="15.6" y2="17.5" />
        {/* Diagonal X-braces between cross-bars */}
        <line className={styles.brace} x1="10.4" y1="11.5" x2="14.6" y2="14.5" />
        <line className={styles.brace} x1="13.6" y1="11.5" x2="9.4" y2="14.5" />
        <line className={styles.brace} x1="9.4" y1="14.5" x2="15.6" y2="17.5" />
        <line className={styles.brace} x1="14.6" y1="14.5" x2="8.4" y2="17.5" />
        {/* Base concrete pads */}
        <rect className={styles.pad} x="6.4" y="20.6" width="2.4" height="1.4" rx="0.2" />
        <rect className={styles.pad} x="15.2" y="20.6" width="2.4" height="1.4" rx="0.2" />
        <line className={styles.ground} x1="5" y1="21.8" x2="19" y2="21.8" strokeWidth="0.8" />
        {/* Signal waves emanating from tip */}
        <path className={styles.wave} data-w="1l" d="M9.4 4.4c-1.2.4-2 1.4-2.2 2.8" />
        <path className={styles.wave} data-w="1r" d="M14.6 4.4c1.2.4 2 1.4 2.2 2.8" />
        <path className={styles.wave} data-w="2l" d="M7.4 3c-2.4 1-3.6 3.4-3.6 6" />
        <path className={styles.wave} data-w="2r" d="M16.6 3c2.4 1 3.6 3.4 3.6 6" />
        <path className={styles.wave} data-w="3l" d="M5 1.6c-3 1.8-4.6 5-4.6 9" />
        <path className={styles.wave} data-w="3r" d="M19 1.6c3 1.8 4.6 5 4.6 9" />
      </svg>
    </span>
  )
}
