import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./hoist-arm.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function HoistArmIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Workshop hoist arm",
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
        {/* Vertical post / column */}
        <rect className={styles.column} x="3.4" y="4" width="2.6" height="17" rx="0.4" />
        <rect className={styles.columnFront} x="4" y="4" width="1.4" height="17" rx="0.3" />
        {/* Base plate */}
        <rect className={styles.basePlate} x="2" y="20.6" width="5.4" height="1.4" rx="0.3" />
        {/* Bolt-down anchors */}
        <circle className={styles.anchor} cx="2.6" cy="21.2" r="0.3" />
        <circle className={styles.anchor} cx="6.8" cy="21.2" r="0.3" />
        {/* Pivot joint at top */}
        <circle className={styles.pivot} cx="4.7" cy="6" r="1.2" />
        <circle className={styles.pivotInner} cx="4.7" cy="6" r="0.4" />
        {/* Horizontal arm extending right */}
        <g className={styles.armGroup}>
          <rect className={styles.arm} x="5.8" y="5.2" width="13.6" height="1.6" rx="0.3" />
          <rect className={styles.armUpper} x="5.8" y="5.2" width="13.6" height="0.6" rx="0.2" />
          {/* Arm telescope joint */}
          <line className={styles.armJoint} x1="14" y1="5.2" x2="14" y2="6.8" />
          <line className={styles.armJoint} x1="14.4" y1="5.2" x2="14.4" y2="6.8" />
          {/* Lifting pad on the end */}
          <rect className={styles.padArm} x="19.2" y="6.8" width="0.6" height="2.4" rx="0.2" />
          <ellipse className={styles.padSurface} cx="19.5" cy="9.4" rx="2.4" ry="0.8" />
          <ellipse className={styles.padRubber} cx="19.5" cy="9.4" rx="2.4" ry="0.8" />
          {/* Pad grip pattern */}
          <line className={styles.gripLine} x1="17.6" y1="9.3" x2="21.4" y2="9.3" strokeWidth="0.4" />
          <line className={styles.gripLine} x1="17.6" y1="9.5" x2="21.4" y2="9.5" strokeWidth="0.4" />
        </g>
        {/* Hydraulic cylinder hint on the side */}
        <line className={styles.hydraulic} x1="7.4" y1="6" x2="7.4" y2="11" strokeWidth="1.4" />
        <line className={styles.hydraulicInner} x1="7.4" y1="6.2" x2="7.4" y2="11" />
      </svg>
    </span>
  )
}
