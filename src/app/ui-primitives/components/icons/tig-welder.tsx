import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./tig-welder.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function TigWelderIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "TIG welder",
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
        {/* TIG torch — cylindrical handle, finger-grip ribs */}
        <g transform="rotate(40 8 8)">
          <rect className={styles.torch} x="4.6" y="3.2" width="6.8" height="2.6" rx="1.3" />
          <line className={styles.gripRib} x1="6" y1="3.4" x2="6" y2="5.6" />
          <line className={styles.gripRib} x1="7" y1="3.4" x2="7" y2="5.6" />
          <line className={styles.gripRib} x1="8" y1="3.4" x2="8" y2="5.6" />
          <line className={styles.gripRib} x1="9" y1="3.4" x2="9" y2="5.6" />
        </g>
        {/* Hose entry on rear */}
        <path className={styles.cable} d="M2.4 2.6c1 .4 1.6 1.2 2 2.4" strokeWidth="1.4" />
        {/* Torch head — gas lens body */}
        <rect className={styles.head} x="11.4" y="9.2" width="3.4" height="3.4" rx="0.5" transform="rotate(40 13.1 10.9)" />
        {/* Ceramic gas cup */}
        <path className={styles.cup} d="M13.6 13.4l-2 4.8 4.8-2z" />
        <path className={styles.cupStroke} d="M13.6 13.4l-2 4.8 4.8-2z" />
        {/* Tungsten electrode protruding from cup */}
        <line className={styles.tungsten} x1="14.6" y1="16.4" x2="17.4" y2="19.2" />
        <line className={styles.tungstenTip} x1="17.2" y1="19" x2="17.6" y2="19.4" />
        {/* Filler rod approaching from right */}
        <line className={styles.fillerRod} x1="20.4" y1="13" x2="17.8" y2="18.4" />
        {/* Arc glow + gas */}
        <circle className={styles.glow} cx="17.6" cy="19.4" r="1.4" />
        <path className={styles.gas} data-g="1" d="M18.4 16.2l1 1" strokeLinecap="round" />
        <path className={styles.gas} data-g="2" d="M19.6 14.6l1 1" strokeLinecap="round" />
        <path className={styles.gas} data-g="3" d="M20.4 15.6l1 1" strokeLinecap="round" />
      </svg>
    </span>
  )
}
