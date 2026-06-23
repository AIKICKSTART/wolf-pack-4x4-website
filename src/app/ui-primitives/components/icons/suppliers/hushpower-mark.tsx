import type { IconMotion, IconProps } from "../icon-types"
import { TONE_VALUES } from "../icon-types"
import styles from "./hushpower-mark.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function HushpowerMarkIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Hushpower brand mark",
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
        {/* Sound waves attenuating */}
        <path className={styles.waveBig} d="M3 6c4 0 7 2.7 7 6s-3 6-7 6" strokeWidth="1.8" />
        <path className={styles.waveMid} d="M3 9c2.5 0 4.4 1.4 4.4 3s-1.9 3-4.4 3" strokeWidth="1.6" />
        <path className={styles.waveSmall} d="M3 11c1.4 0 1.8.5 1.8 1s-.4 1-1.8 1" strokeWidth="1.4" />
        {/* Silence circle — diagonal slash through mute symbol */}
        <circle className={styles.circle} cx="16" cy="12" r="5.4" />
        <line className={styles.slash} x1="12.4" y1="8.4" x2="19.6" y2="15.6" strokeWidth="2.4" />
      </svg>
    </span>
  )
}
