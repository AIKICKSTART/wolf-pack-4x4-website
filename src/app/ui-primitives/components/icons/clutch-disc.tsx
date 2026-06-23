import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./clutch-disc.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function ClutchDiscIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Clutch friction disc",
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
        {/* Outer friction surface disc */}
        <circle className={styles.disc} cx="12" cy="12" r="9.4" />
        <circle className={styles.discStroke} cx="12" cy="12" r="9.4" />
        {/* Friction material pads — alternating radial pattern (5 pads visible) */}
        <g className={styles.frictionGroup}>
          <path className={styles.pad} d="M12 2.6c1.4 0 2.6.4 3.7 1.2l-1.4 4.4c-.7-.4-1.5-.6-2.3-.6z" />
          <path className={styles.pad} d="M12 2.6c-1.4 0-2.6.4-3.7 1.2l1.4 4.4c.7-.4 1.5-.6 2.3-.6z" transform="rotate(72 12 12)" />
          <path className={styles.pad} d="M12 2.6c-1.4 0-2.6.4-3.7 1.2l1.4 4.4c.7-.4 1.5-.6 2.3-.6z" transform="rotate(144 12 12)" />
          <path className={styles.pad} d="M12 2.6c-1.4 0-2.6.4-3.7 1.2l1.4 4.4c.7-.4 1.5-.6 2.3-.6z" transform="rotate(216 12 12)" />
          <path className={styles.pad} d="M12 2.6c-1.4 0-2.6.4-3.7 1.2l1.4 4.4c.7-.4 1.5-.6 2.3-.6z" transform="rotate(288 12 12)" />
        </g>
        {/* Inner hub circle */}
        <circle className={styles.hub} cx="12" cy="12" r="5" />
        <circle className={styles.hubInner} cx="12" cy="12" r="3" />
        {/* Springs around hub (torsional damper) */}
        <g className={styles.springGroup}>
          <rect className={styles.spring} x="11.4" y="6.8" width="1.2" height="1.6" rx="0.2" />
          <line className={styles.springCoil} x1="11.4" y1="7" x2="12.6" y2="7" />
          <line className={styles.springCoil} x1="11.4" y1="7.4" x2="12.6" y2="7.4" />
          <line className={styles.springCoil} x1="11.4" y1="7.8" x2="12.6" y2="7.8" />
          <line className={styles.springCoil} x1="11.4" y1="8.2" x2="12.6" y2="8.2" />
          <rect className={styles.spring} x="11.4" y="6.8" width="1.2" height="1.6" rx="0.2" transform="rotate(120 12 12)" />
          <line className={styles.springCoil} x1="11.4" y1="7" x2="12.6" y2="7" transform="rotate(120 12 12)" />
          <line className={styles.springCoil} x1="11.4" y1="7.4" x2="12.6" y2="7.4" transform="rotate(120 12 12)" />
          <line className={styles.springCoil} x1="11.4" y1="7.8" x2="12.6" y2="7.8" transform="rotate(120 12 12)" />
          <line className={styles.springCoil} x1="11.4" y1="8.2" x2="12.6" y2="8.2" transform="rotate(120 12 12)" />
          <rect className={styles.spring} x="11.4" y="6.8" width="1.2" height="1.6" rx="0.2" transform="rotate(240 12 12)" />
          <line className={styles.springCoil} x1="11.4" y1="7" x2="12.6" y2="7" transform="rotate(240 12 12)" />
          <line className={styles.springCoil} x1="11.4" y1="7.4" x2="12.6" y2="7.4" transform="rotate(240 12 12)" />
          <line className={styles.springCoil} x1="11.4" y1="7.8" x2="12.6" y2="7.8" transform="rotate(240 12 12)" />
          <line className={styles.springCoil} x1="11.4" y1="8.2" x2="12.6" y2="8.2" transform="rotate(240 12 12)" />
        </g>
        {/* Splined center hub */}
        <circle className={styles.splineRing} cx="12" cy="12" r="1.8" />
        <circle className={styles.spline} cx="12" cy="12" r="1.1" />
        <path className={styles.splineMark} d="M12 11v2M11 12h2" />
      </svg>
    </span>
  )
}
