import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./rolling-road.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function RollingRoadIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Rolling road dyno",
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
        {/* Car silhouette sitting on rollers */}
        <path
          className={styles.car}
          d="M3.4 13.2l.4-1.8c.2-.6.7-1 1.4-1.1l1.2-.2 2-2.6c.4-.5 1-.9 1.7-.9h5.4c.6 0 1.2.2 1.6.6l1.2 1c.4.4.8.6 1.4.7l1.2.2c.6.1 1 .6 1 1.2v1.2c0 .4-.3.7-.7.7"
        />
        <path
          className={styles.carStroke}
          d="M3.4 13.2l.4-1.8c.2-.6.7-1 1.4-1.1l1.2-.2 2-2.6c.4-.5 1-.9 1.7-.9h5.4c.6 0 1.2.2 1.6.6l1.2 1c.4.4.8.6 1.4.7l1.2.2c.6.1 1 .6 1 1.2v1.2c0 .4-.3.7-.7.7M3.4 13.2h6.4M14.6 13.2h5.8"
        />
        {/* Car windows */}
        <path className={styles.window} d="M8.6 10.2l1.4-2.4h2.4z" />
        <path className={styles.window} d="M12.8 7.8h1.4c.4 0 .8.2 1.2.5l1.6 1.4-1.6.5h-2.6z" />
        {/* Twin roller drums (large cylinders) */}
        <ellipse className={styles.rollerShadow} cx="7.4" cy="17.6" rx="3.8" ry="3.2" />
        <ellipse className={styles.rollerShadow} cx="16.6" cy="17.6" rx="3.8" ry="3.2" />
        <g className={styles.rollerFrontGroup}>
          <ellipse className={styles.roller} cx="7.4" cy="17.6" rx="3.4" ry="2.8" />
          <ellipse className={styles.rollerInner} cx="7.4" cy="17.6" rx="2" ry="1.7" />
          <ellipse className={styles.rollerInner} cx="7.4" cy="17.6" rx="1" ry="0.85" />
          <ellipse className={styles.roller} cx="16.6" cy="17.6" rx="3.4" ry="2.8" />
          <ellipse className={styles.rollerInner} cx="16.6" cy="17.6" rx="2" ry="1.7" />
          <ellipse className={styles.rollerInner} cx="16.6" cy="17.6" rx="1" ry="0.85" />
        </g>
        {/* Tire footprints on rollers (smaller circles where tires meet) */}
        <ellipse className={styles.tirePrint} cx="7.4" cy="14.4" rx="2.1" ry="0.6" />
        <ellipse className={styles.tirePrint} cx="16.6" cy="14.4" rx="2.1" ry="0.6" />
        {/* Floor */}
        <line className={styles.floor} x1="1.4" y1="21.4" x2="22.6" y2="21.4" />
        {/* Speed motion arrows behind */}
        <path className={styles.motionLine} data-l="1" d="M22 16h-1.4" />
        <path className={styles.motionLine} data-l="2" d="M22 14h-2" />
      </svg>
    </span>
  )
}
