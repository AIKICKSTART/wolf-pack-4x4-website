import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./car-side.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function CarSideIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Car side profile",
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
        {/* Sedan body — classic profile with sloped roof + boot deck */}
        <path
          className={styles.body}
          d="M1.6 16.4l.5-2c.2-.7.8-1.2 1.6-1.3l1.4-.2 2.2-3.4c.5-.7 1.2-1.1 2-1.2l5.8-.2c.7 0 1.4.2 2 .6l3 2c.2.2.5.3.8.4l1.4.4c.7.2 1.2.8 1.2 1.5v1.4c0 .4-.3.7-.7.7h-1.2"
        />
        <path
          className={styles.bodyStroke}
          d="M1.6 16.4l.5-2c.2-.7.8-1.2 1.6-1.3l1.4-.2 2.2-3.4c.5-.7 1.2-1.1 2-1.2l5.8-.2c.7 0 1.4.2 2 .6l3 2c.2.2.5.3.8.4l1.4.4c.7.2 1.2.8 1.2 1.5v1.4c0 .4-.3.7-.7.7h-1.2"
        />
        {/* Bottom rocker line */}
        <path className={styles.bodyStroke} d="M2 16.4h8.2M14 16.4h7.8" />
        {/* Greenhouse — front windscreen + rear glass with B-pillar */}
        <path className={styles.window} d="M7.8 13l1.5-2.6c.3-.5.8-.8 1.4-.8h2.4z" />
        <path className={styles.window} d="M13.6 9.6h.6c.5 0 1 .2 1.4.4l3 1.8c.3.2.5.4.6.8l.2.5h-5.8z" />
        <line className={styles.bPillar} x1="13.4" y1="9.6" x2="13.4" y2="13" strokeWidth="0.9" />
        {/* Door line */}
        <line className={styles.doorLine} x1="11" y1="13.2" x2="11" y2="16" />
        {/* Door handle */}
        <line className={styles.handle} x1="12.6" y1="14.6" x2="14" y2="14.6" />
        {/* Wheels with hubcap */}
        <circle className={styles.wheel} cx="6.8" cy="17.4" r="2.4" />
        <circle className={styles.tire} cx="6.8" cy="17.4" r="2.4" />
        <circle className={styles.rim} cx="6.8" cy="17.4" r="1.3" />
        <circle className={styles.hubCap} cx="6.8" cy="17.4" r="0.4" />
        <circle className={styles.wheel} cx="17.2" cy="17.4" r="2.4" />
        <circle className={styles.tire} cx="17.2" cy="17.4" r="2.4" />
        <circle className={styles.rim} cx="17.2" cy="17.4" r="1.3" />
        <circle className={styles.hubCap} cx="17.2" cy="17.4" r="0.4" />
        {/* Headlight + tail light hints */}
        <ellipse className={styles.headlight} cx="21.4" cy="14.4" rx="0.6" ry="0.4" />
        <ellipse className={styles.taillight} cx="2.2" cy="14.4" rx="0.5" ry="0.4" />
        {/* Speed lines */}
        <path className={styles.lineRun} d="M22 12.8h-2M22 11h-3" />
      </svg>
    </span>
  )
}
