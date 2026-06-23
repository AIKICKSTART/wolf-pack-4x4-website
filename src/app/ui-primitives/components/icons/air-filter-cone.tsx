import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./air-filter-cone.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function AirFilterConeIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Cone air filter",
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
        {/* End cap (closed end of cone) */}
        <ellipse className={styles.endCap} cx="20.4" cy="12" rx="0.9" ry="3.6" />
        {/* Main conical filter body */}
        <path
          className={styles.coneBody}
          d="M5 6.8c0-.4.4-.8.8-.8h.2c.6 0 1 .4 1.2 1l4.2 4.4 8 .6v3.2l-8 .6-4.2 4.4c-.2.6-.6 1-1.2 1H5.8c-.4 0-.8-.4-.8-.8z"
        />
        <path
          className={styles.coneStroke}
          d="M5 6.8c0-.4.4-.8.8-.8h.2c.6 0 1 .4 1.2 1l4.2 4.4 8 .6v3.2l-8 .6-4.2 4.4c-.2.6-.6 1-1.2 1H5.8c-.4 0-.8-.4-.8-.8z"
        />
        {/* Pleats — visible folds */}
        <line className={styles.pleat} x1="8.4" y1="9.4" x2="17.6" y2="11" />
        <line className={styles.pleat} x1="7.6" y1="11" x2="17.6" y2="11.6" />
        <line className={styles.pleat} x1="7.2" y1="12.6" x2="17.6" y2="12.2" />
        <line className={styles.pleat} x1="7.6" y1="14.2" x2="17.6" y2="12.8" />
        <line className={styles.pleat} x1="8.4" y1="15.8" x2="17.6" y2="13.4" />
        <line className={styles.pleat} x1="9.4" y1="17.2" x2="17.6" y2="14" />
        {/* Intake mounting flange + clamp */}
        <rect className={styles.flange} x="2.4" y="9" width="3" height="6" rx="0.4" />
        <line className={styles.clamp} x1="3.4" y1="8.6" x2="3.4" y2="15.4" strokeWidth="0.7" />
        <line className={styles.clamp} x1="4.4" y1="8.6" x2="4.4" y2="15.4" strokeWidth="0.7" />
        {/* Filter wrap (sock cover) line */}
        <path className={styles.wrap} d="M5.4 9c.5 1 1 2 1 3s-.5 2-1 3" strokeDasharray="1.4 1" />
        {/* Air intake arrow */}
        <path className={styles.airArrow} d="M22.4 12h-1.6M21.6 11.2v1.6" strokeLinecap="round" />
        {/* Airflow lines */}
        <path className={styles.airflow} data-a="1" d="M1.6 11h-1.4" strokeLinecap="round" />
        <path className={styles.airflow} data-a="2" d="M1.6 12h-1.6" strokeLinecap="round" />
        <path className={styles.airflow} data-a="3" d="M1.6 13h-1.4" strokeLinecap="round" />
      </svg>
    </span>
  )
}
