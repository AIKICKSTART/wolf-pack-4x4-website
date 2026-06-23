import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./extractor-headers.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function ExtractorHeadersIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Extractor headers",
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
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-variant={variant}
        aria-hidden="true"
      >
        <title>{title}</title>
        {/* Cylinder head flange — 4 ports */}
        <rect className={styles.flange} x="2" y="3" width="2.4" height="18" rx="0.4" />
        <circle className={styles.port} cx="3.2" cy="5.4" r="0.55" />
        <circle className={styles.port} cx="3.2" cy="10" r="0.55" />
        <circle className={styles.port} cx="3.2" cy="14" r="0.55" />
        <circle className={styles.port} cx="3.2" cy="18.6" r="0.55" />
        {/* 4 primary tubes sweeping into the 4-into-1 collector */}
        <path className={styles.glow} strokeWidth="3" d="M4.4 5.4c4 0 5.2 5 9.4 5.6M4.4 10c3.4 0 4.4 1.2 7 1.4M4.4 14c3.4 0 4.4-1.2 7-1.4M4.4 18.6c4 0 5.2-5 9.4-5.6" />
        <path className={styles.primary} d="M4.4 5.4c4 0 5.2 5 9.4 5.6" />
        <path className={styles.primary} d="M4.4 10c3.4 0 4.4 1.2 7 1.4" />
        <path className={styles.primary} d="M4.4 14c3.4 0 4.4-1.2 7-1.4" />
        <path className={styles.primary} d="M4.4 18.6c4 0 5.2-5 9.4-5.6" />
        {/* Collector cone */}
        <path className={styles.collector} d="M13.6 10.6c1.2.4 2 1 2 1.4s-.8 1-2 1.4z" />
        <path className={styles.collectorStroke} d="M13.6 10.6c1.2.4 2 1 2 1.4s-.8 1-2 1.4" />
        {/* Single outlet pipe */}
        <path className={styles.outlet} d="M15.6 11h6M15.6 13h6" />
        {/* Flow ticks pulsing through */}
        <path className={styles.flow} strokeWidth="1.1" d="M16.5 12h5" />
      </svg>
    </span>
  )
}
