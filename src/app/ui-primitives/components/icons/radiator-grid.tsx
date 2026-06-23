import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./radiator-grid.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function RadiatorGridIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Radiator",
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
        {/* Top hose nozzle */}
        <rect className={styles.hose} x="6" y="2.6" width="2.6" height="2.6" rx="0.3" />
        <ellipse className={styles.hoseCap} cx="7.3" cy="2.6" rx="1.4" ry="0.4" />
        {/* Bottom hose nozzle */}
        <rect className={styles.hose} x="15.4" y="18.8" width="2.6" height="2.6" rx="0.3" />
        <ellipse className={styles.hoseCap} cx="16.7" cy="21.4" rx="1.4" ry="0.4" />
        {/* End tanks (top + bottom) */}
        <rect className={styles.tank} x="2.6" y="5.2" width="18.8" height="2.4" rx="0.6" />
        <rect className={styles.tank} x="2.6" y="16.4" width="18.8" height="2.4" rx="0.6" />
        {/* Core — fin grid */}
        <rect className={styles.core} x="3" y="7.6" width="18" height="8.8" rx="0.3" />
        <rect className={styles.coreStroke} x="3" y="7.6" width="18" height="8.8" rx="0.3" />
        {/* Vertical fin lines (denser pattern) */}
        <line className={styles.fin} x1="4" y1="7.6" x2="4" y2="16.4" />
        <line className={styles.fin} x1="5" y1="7.6" x2="5" y2="16.4" />
        <line className={styles.fin} x1="6" y1="7.6" x2="6" y2="16.4" />
        <line className={styles.fin} x1="7" y1="7.6" x2="7" y2="16.4" />
        <line className={styles.fin} x1="8" y1="7.6" x2="8" y2="16.4" />
        <line className={styles.fin} x1="9" y1="7.6" x2="9" y2="16.4" />
        <line className={styles.fin} x1="10" y1="7.6" x2="10" y2="16.4" />
        <line className={styles.fin} x1="11" y1="7.6" x2="11" y2="16.4" />
        <line className={styles.fin} x1="12" y1="7.6" x2="12" y2="16.4" />
        <line className={styles.fin} x1="13" y1="7.6" x2="13" y2="16.4" />
        <line className={styles.fin} x1="14" y1="7.6" x2="14" y2="16.4" />
        <line className={styles.fin} x1="15" y1="7.6" x2="15" y2="16.4" />
        <line className={styles.fin} x1="16" y1="7.6" x2="16" y2="16.4" />
        <line className={styles.fin} x1="17" y1="7.6" x2="17" y2="16.4" />
        <line className={styles.fin} x1="18" y1="7.6" x2="18" y2="16.4" />
        <line className={styles.fin} x1="19" y1="7.6" x2="19" y2="16.4" />
        <line className={styles.fin} x1="20" y1="7.6" x2="20" y2="16.4" />
        {/* Horizontal core tubes (3 main) */}
        <line className={styles.tube} x1="3" y1="10" x2="21" y2="10" strokeWidth="0.8" />
        <line className={styles.tube} x1="3" y1="12" x2="21" y2="12" strokeWidth="0.8" />
        <line className={styles.tube} x1="3" y1="14" x2="21" y2="14" strokeWidth="0.8" />
        {/* Pressure cap */}
        <circle className={styles.cap} cx="18.6" cy="5" r="1.4" />
        <circle className={styles.capInner} cx="18.6" cy="5" r="0.7" />
      </svg>
    </span>
  )
}
