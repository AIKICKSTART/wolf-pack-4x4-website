import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./brake-rotor.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function BrakeRotorIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Brake rotor",
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
        <g className={styles.rotor}>
          {/* Outer disc rim */}
          <circle className={styles.outerFill} cx="11.5" cy="12" r="8.6" />
          <circle className={styles.outer} cx="11.5" cy="12" r="8.6" />
          {/* Friction surface ring */}
          <circle className={styles.frictionRing} cx="11.5" cy="12" r="7" />
          <circle className={styles.inner} cx="11.5" cy="12" r="5.6" />
          {/* Internal vanes (cross-drilled / vented) */}
          <circle className={styles.ventHole} cx="11.5" cy="7.2" r="0.6" />
          <circle className={styles.ventHole} cx="11.5" cy="16.8" r="0.6" />
          <circle className={styles.ventHole} cx="6.7" cy="12" r="0.6" />
          <circle className={styles.ventHole} cx="16.3" cy="12" r="0.6" />
          <circle className={styles.ventHole} cx="8.1" cy="8.6" r="0.55" />
          <circle className={styles.ventHole} cx="14.9" cy="8.6" r="0.55" />
          <circle className={styles.ventHole} cx="8.1" cy="15.4" r="0.55" />
          <circle className={styles.ventHole} cx="14.9" cy="15.4" r="0.55" />
          {/* Center hub + 5 lug holes */}
          <circle className={styles.inner} cx="11.5" cy="12" r="2.4" />
          <circle className={styles.hub} cx="11.5" cy="12" r="0.7" />
          <circle className={styles.lug} cx="11.5" cy="10.6" r="0.4" />
          <circle className={styles.lug} cx="12.7" cy="11.5" r="0.4" />
          <circle className={styles.lug} cx="12.3" cy="13" r="0.4" />
          <circle className={styles.lug} cx="10.7" cy="13" r="0.4" />
          <circle className={styles.lug} cx="10.3" cy="11.5" r="0.4" />
        </g>
        {/* Caliper — clamping shape with two pads */}
        <path className={styles.caliper} d="M18.8 7.6h2c.7 0 1.2.5 1.2 1.2v6.4c0 .7-.5 1.2-1.2 1.2h-2c-.7 0-1.2-.5-1.2-1.2v-.6h-.6v-5.2h.6v-.6c0-.7.5-1.2 1.2-1.2z" />
        <rect className={styles.caliperPad} x="17.4" y="9.4" width="0.6" height="5.2" rx="0.1" />
      </svg>
    </span>
  )
}
