import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./ute-side.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function UteSideIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Ute side profile",
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
        {/* Bonnet + front fender */}
        <path
          className={styles.body}
          d="M1.6 16.4l.5-2c.2-.7.8-1.2 1.6-1.3l1-.2 1.4-2.8c.4-.9 1.2-1.4 2.2-1.5l2.6-.2c.7 0 1.4.2 1.9.6l1 .8h11.6c.3 0 .6.3.6.6v3.6c0 .3-.3.6-.6.6h-1.4"
        />
        <path
          className={styles.bodyStroke}
          d="M1.6 16.4l.5-2c.2-.7.8-1.2 1.6-1.3l1-.2 1.4-2.8c.4-.9 1.2-1.4 2.2-1.5l2.6-.2c.7 0 1.4.2 1.9.6l1 .8h7c.3 0 .6.3.6.6v3.6c0 .3-.3.6-.6.6h-1.4M2 16.4h8.2M14.6 16.4h7.4"
        />
        {/* Single cab — short windscreen + side window */}
        <path className={styles.cab} d="M6.2 12.6l1.3-2.2c.3-.5.8-.8 1.4-.8h3v3z" />
        <path className={styles.window} d="M6.2 12.6l1.3-2.2c.3-.5.8-.8 1.4-.8h3v3z" />
        <line className={styles.bPillar} x1="11.6" y1="9.6" x2="11.6" y2="12.6" strokeWidth="0.9" />
        {/* Tray edge */}
        <path className={styles.tray} d="M12 9.8h10.4v3.2" strokeWidth="1.3" />
        <path className={styles.trayBack} d="M21.4 9.8v3.4" strokeWidth="1.1" />
        <line className={styles.trayLine} x1="14" y1="11.5" x2="20" y2="11.5" strokeWidth="0.7" />
        {/* Wheels with rim */}
        <circle className={styles.wheel} cx="6.8" cy="17.4" r="2.4" />
        <circle className={styles.tire} cx="6.8" cy="17.4" r="2.4" />
        <circle className={styles.rim} cx="6.8" cy="17.4" r="1.3" />
        <circle className={styles.hubCap} cx="6.8" cy="17.4" r="0.4" />
        <circle className={styles.wheel} cx="17.6" cy="17.4" r="2.4" />
        <circle className={styles.tire} cx="17.6" cy="17.4" r="2.4" />
        <circle className={styles.rim} cx="17.6" cy="17.4" r="1.3" />
        <circle className={styles.hubCap} cx="17.6" cy="17.4" r="0.4" />
        {/* Door + handle */}
        <line className={styles.doorLine} x1="9.6" y1="13" x2="9.6" y2="16" />
        <ellipse className={styles.headlight} cx="21.5" cy="14.4" rx="0.5" ry="0.4" />
        <path className={styles.lineRun} d="M22 12.8h-2M22 11h-3" />
      </svg>
    </span>
  )
}
