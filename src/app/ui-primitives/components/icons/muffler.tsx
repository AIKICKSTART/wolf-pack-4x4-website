import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./muffler.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function MufflerIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Muffler",
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
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-variant={variant}
        aria-hidden="true"
      >
        <title>{title}</title>
        {/* Inlet pipe */}
        <path className={styles.inlet} d="M2.5 12h3.6" strokeWidth="1.6" />
        {/* Cylindrical body — slightly rounded caps suggest cylinder */}
        <rect className={styles.body} x="6" y="7.6" width="11" height="8.8" rx="2.2" />
        <rect className={styles.stroke} x="6" y="7.6" width="11" height="8.8" rx="2.2" />
        {/* End cap rings — depth on left & right */}
        <ellipse className={styles.endCap} cx="6.2" cy="12" rx="0.6" ry="4.4" />
        <ellipse className={styles.endCap} cx="16.8" cy="12" rx="0.6" ry="4.4" />
        {/* Body seam */}
        <path className={styles.seam} d="M9 7.8v8.4M13 7.8v8.4" />
        {/* Perforation dots — hint of sound damping */}
        <circle className={styles.perf} cx="9.5" cy="10" r="0.32" />
        <circle className={styles.perf} cx="11" cy="10" r="0.32" />
        <circle className={styles.perf} cx="12.5" cy="10" r="0.32" />
        <circle className={styles.perf} cx="9.5" cy="12" r="0.32" />
        <circle className={styles.perf} cx="11" cy="12" r="0.32" />
        <circle className={styles.perf} cx="12.5" cy="12" r="0.32" />
        <circle className={styles.perf} cx="9.5" cy="14" r="0.32" />
        <circle className={styles.perf} cx="11" cy="14" r="0.32" />
        <circle className={styles.perf} cx="12.5" cy="14" r="0.32" />
        {/* Outlet pipe and tip */}
        <path className={styles.stroke} d="M17 10.4h2.2c.8 0 1.4.5 1.4 1.3v.6c0 .8-.6 1.3-1.4 1.3H17" />
        {/* Heat shimmer */}
        <circle className={styles.heat} data-h="1" cx="21.4" cy="12" r="1.2" />
        <circle className={styles.heat} data-h="2" cx="21.4" cy="12" r="0.9" />
        <circle className={styles.heat} data-h="3" cx="21.4" cy="12" r="0.7" />
      </svg>
    </span>
  )
}
