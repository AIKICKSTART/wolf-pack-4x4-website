import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./envelope-trail.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function EnvelopeTrailIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Envelope with trail",
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
        {/* Motion trails behind */}
        <path className={styles.trail} data-t="1" d="M1.4 18h4" strokeWidth="1.4" />
        <path className={styles.trail} data-t="2" d="M2.4 15h5" strokeWidth="1.4" />
        <path className={styles.trail} data-t="3" d="M1.4 21h3" strokeWidth="1.4" />
        <g className={styles.envelopeGroup}>
          {/* Envelope body — proper paper-fold rectangle */}
          <rect className={styles.body} x="7" y="6" width="15" height="11" rx="1.4" />
          <rect className={styles.bodyStroke} x="7" y="6" width="15" height="11" rx="1.4" />
          {/* Open flap on top — V-shape pointing down to middle */}
          <path className={styles.flap} d="M7 7l7.5 5.4L22 7" />
          <path className={styles.flapFill} d="M7 6h15l-7.5 5.4z" />
          {/* Side flaps converging on seal */}
          <path className={styles.foldLine} d="M7 17l5.5-4.2M22 17l-5.5-4.2" />
          {/* Wax seal in center */}
          <circle className={styles.sealGlow} cx="14.5" cy="13" r="2" />
          <circle className={styles.seal} cx="14.5" cy="13" r="1.4" />
          <line className={styles.sealMark} x1="13.6" y1="12.4" x2="15.4" y2="13.6" strokeWidth="0.7" />
        </g>
      </svg>
    </span>
  )
}
