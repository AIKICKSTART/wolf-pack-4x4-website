import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./dyno-strap.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function DynoStrapIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Dyno tie-down strap",
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
        {/* Ratchet handle body */}
        <path className={styles.handle} d="M7 4.4h7.4c.7 0 1.2.5 1.2 1.2v3.6c0 .7-.5 1.2-1.2 1.2H7c-.7 0-1.2-.5-1.2-1.2V5.6c0-.7.5-1.2 1.2-1.2z" />
        <path className={styles.handleStroke} d="M7 4.4h7.4c.7 0 1.2.5 1.2 1.2v3.6c0 .7-.5 1.2-1.2 1.2H7c-.7 0-1.2-.5-1.2-1.2V5.6c0-.7.5-1.2 1.2-1.2z" />
        {/* Grip ridges */}
        <line className={styles.gripRib} x1="7.4" y1="5.4" x2="7.4" y2="9.4" />
        <line className={styles.gripRib} x1="8.6" y1="5.4" x2="8.6" y2="9.4" />
        <line className={styles.gripRib} x1="9.8" y1="5.4" x2="9.8" y2="9.4" />
        <line className={styles.gripRib} x1="11" y1="5.4" x2="11" y2="9.4" />
        <line className={styles.gripRib} x1="12.2" y1="5.4" x2="12.2" y2="9.4" />
        <line className={styles.gripRib} x1="13.4" y1="5.4" x2="13.4" y2="9.4" />
        {/* Ratchet spool drum on right */}
        <circle className={styles.spool} cx="17.4" cy="7.4" r="2.6" />
        <circle className={styles.spoolInner} cx="17.4" cy="7.4" r="1.4" />
        {/* Pawl teeth */}
        <path className={styles.pawl} d="M17.4 4.8v0.6M17.4 9.4v0.6M14.8 7.4h0.6M19.4 7.4h0.6M15.6 5.6l0.4 0.4M19.2 9.2l0.4 0.4M19.2 5.6l-0.4 0.4M15.6 9.2l-0.4 0.4" />
        {/* Webbing strap winding off bottom */}
        <path className={styles.strap} d="M5.8 10.4h11.6" strokeWidth="1.6" />
        <path className={styles.strap} d="M5.4 12h12.2" strokeWidth="1.6" />
        <path className={styles.strap} d="M5 13.6h12.6" strokeWidth="1.6" />
        {/* Stitching line on strap */}
        <line className={styles.stitch} x1="6.4" y1="11.2" x2="17" y2="11.2" strokeDasharray="1 1" strokeWidth="0.5" />
        <line className={styles.stitch} x1="6" y1="12.8" x2="17.4" y2="12.8" strokeDasharray="1 1" strokeWidth="0.5" />
        {/* Hook at bottom */}
        <path className={styles.hook} d="M11 15c0 2 1.2 3.4 2.6 4 1.4-.6 2.6-2 2.6-4" />
        <path className={styles.hookTip} d="M11.4 19c-.4 1 .2 2.2 1.4 2" />
        <path className={styles.hookTip} d="M16.2 19c.4 1-.2 2.2-1.4 2" />
      </svg>
    </span>
  )
}
