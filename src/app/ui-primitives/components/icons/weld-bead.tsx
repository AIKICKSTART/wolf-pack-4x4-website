import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./weld-bead.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function WeldBeadIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Weld bead",
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
        {/* Two metal plates being joined — top and bottom */}
        <rect className={styles.plateTop} x="2" y="6" width="20" height="4" rx="0.3" />
        <rect className={styles.plateBottom} x="2" y="14" width="20" height="4" rx="0.3" />
        {/* Plate edge lines (joint) */}
        <line className={styles.plateEdge} x1="2" y1="10" x2="22" y2="10" strokeWidth="0.6" />
        <line className={styles.plateEdge} x1="2" y1="14" x2="22" y2="14" strokeWidth="0.6" />
        {/* Weld bead — zigzag stacked-dimes pattern */}
        <path
          className={styles.beadHalo}
          d="M2.6 12c0-.6 1-1.4 1.4-1.4s.4.8 1.4.8.4-.8 1.4-.8 1.4 1.4 1.4 1.4-1 1.4-1.4 1.4-.4-.8-1.4-.8-.4.8-1.4.8-1.4-1.4-1.4-1.4z"
          strokeWidth="2"
        />
        <g className={styles.beadGroup}>
          {/* Series of overlapping arcs creating stacked-dimes look */}
          <path className={styles.beadArc} d="M2.6 12.4l1.6-1.8 1.6 1.8" />
          <path className={styles.beadArc} d="M4.2 12.4l1.6-1.8 1.6 1.8" />
          <path className={styles.beadArc} d="M5.8 12.4l1.6-1.8 1.6 1.8" />
          <path className={styles.beadArc} d="M7.4 12.4l1.6-1.8 1.6 1.8" />
          <path className={styles.beadArc} d="M9 12.4l1.6-1.8 1.6 1.8" />
          <path className={styles.beadArc} d="M10.6 12.4l1.6-1.8 1.6 1.8" />
          <path className={styles.beadArc} d="M12.2 12.4l1.6-1.8 1.6 1.8" />
          <path className={styles.beadArc} d="M13.8 12.4l1.6-1.8 1.6 1.8" />
          <path className={styles.beadArc} d="M15.4 12.4l1.6-1.8 1.6 1.8" />
          <path className={styles.beadArc} d="M17 12.4l1.6-1.8 1.6 1.8" />
          <path className={styles.beadArc} d="M18.6 12.4l1.6-1.8 1.6 1.8" />
        </g>
        {/* Bead body underline (toe lines) */}
        <line className={styles.beadToe} x1="2.6" y1="12.6" x2="21.8" y2="12.6" />
        <line className={styles.beadCrown} x1="3.6" y1="10.8" x2="20.8" y2="10.8" strokeDasharray="0.8 0.8" />
      </svg>
    </span>
  )
}
