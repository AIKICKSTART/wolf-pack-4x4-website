import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./workshop-bay.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function WorkshopBayIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Workshop bay",
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
        {/* Bay walls + roof — industrial shed silhouette */}
        <path className={styles.shed} d="M2 6.4l10-3.4 10 3.4v14.4H2z" />
        <path className={styles.shedStroke} d="M2 6.4l10-3.4 10 3.4v14.4H2zM2 6.4h20" />
        {/* Roller door / overhead garage door (with horizontal seams) */}
        <rect className={styles.door} x="6.4" y="10.4" width="11.2" height="9" rx="0.4" />
        <line className={styles.doorSeam} x1="6.4" y1="11.6" x2="17.6" y2="11.6" strokeWidth="0.6" />
        <line className={styles.doorSeam} x1="6.4" y1="13" x2="17.6" y2="13" strokeWidth="0.6" />
        <line className={styles.doorSeam} x1="6.4" y1="14.4" x2="17.6" y2="14.4" strokeWidth="0.6" />
        <line className={styles.doorSeam} x1="6.4" y1="15.8" x2="17.6" y2="15.8" strokeWidth="0.6" />
        <line className={styles.doorSeam} x1="6.4" y1="17.2" x2="17.6" y2="17.2" strokeWidth="0.6" />
        <line className={styles.doorSeam} x1="6.4" y1="18.6" x2="17.6" y2="18.6" strokeWidth="0.6" />
        {/* Hoist column inside (visible behind door) */}
        <rect className={styles.hoistPost} x="8.4" y="11" width="0.8" height="8" rx="0.1" />
        <rect className={styles.hoistArmLeft} x="9.2" y="14.6" width="2.6" height="0.6" rx="0.1" />
        <rect className={styles.hoistPost} x="15" y="11" width="0.8" height="8" rx="0.1" />
        <rect className={styles.hoistArmRight} x="12.4" y="14.6" width="2.6" height="0.6" rx="0.1" />
        {/* Bay number sign */}
        <rect className={styles.signBg} x="9.6" y="7.4" width="4.8" height="2.4" rx="0.3" />
        <text className={styles.signNumber} x="12" y="9.2" textAnchor="middle">1</text>
        {/* Tool board on right wall (pegboard) */}
        <rect className={styles.toolBoard} x="18.4" y="11" width="2.4" height="6" rx="0.2" />
        <circle className={styles.peg} cx="19.2" cy="12" r="0.18" />
        <circle className={styles.peg} cx="20" cy="12" r="0.18" />
        <circle className={styles.peg} cx="19.2" cy="13" r="0.18" />
        <circle className={styles.peg} cx="20" cy="13" r="0.18" />
        <circle className={styles.peg} cx="19.2" cy="14" r="0.18" />
        <circle className={styles.peg} cx="20" cy="14" r="0.18" />
        {/* Floor seam line */}
        <line className={styles.floorLine} x1="2" y1="20.4" x2="22" y2="20.4" strokeWidth="0.9" />
      </svg>
    </span>
  )
}
