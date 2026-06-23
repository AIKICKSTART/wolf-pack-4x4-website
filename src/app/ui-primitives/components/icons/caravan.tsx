import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./caravan.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function CaravanIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Caravan",
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
        {/* Aerodynamic tow-front shape — rounded leading edge */}
        <path
          className={styles.body}
          d="M6.4 7.6h13.4c.9 0 1.6.7 1.6 1.6v7c0 .9-.7 1.6-1.6 1.6H6.4c-.9 0-1.6-.7-1.6-1.6V13L3 12c-.5-.2-.5-1 0-1.2l1.8-.8V9.2c0-.9.7-1.6 1.6-1.6z"
        />
        <path
          className={styles.bodyStroke}
          d="M6.4 7.6h13.4c.9 0 1.6.7 1.6 1.6v7c0 .9-.7 1.6-1.6 1.6H6.4c-.9 0-1.6-.7-1.6-1.6V13L3 12c-.5-.2-.5-1 0-1.2l1.8-.8V9.2c0-.9.7-1.6 1.6-1.6z"
        />
        {/* Rooftop edge with awning bar */}
        <path className={styles.awning} d="M5.8 6.8h14.4" />
        <line className={styles.awningPole} x1="5.8" y1="6.8" x2="5.8" y2="7.6" />
        <line className={styles.awningPole} x1="20.2" y1="6.8" x2="20.2" y2="7.6" />
        {/* Tow hitch */}
        <path className={styles.hitch} d="M3.2 11.4l-1.6-.6M1.6 10.8l-.6.4" />
        <circle className={styles.hitchBall} cx="1.2" cy="11.4" r="0.5" />
        {/* Window with curtains */}
        <rect className={styles.window} x="7.2" y="9.4" width="4.4" height="3.2" rx="0.4" />
        <line className={styles.curtainSplit} x1="9.4" y1="9.4" x2="9.4" y2="12.6" strokeWidth="0.7" />
        {/* Door */}
        <rect className={styles.door} x="13" y="9.4" width="3.4" height="6.6" rx="0.4" />
        <circle className={styles.doorHandle} cx="15.6" cy="12.8" r="0.3" />
        {/* Side panel ribs */}
        <line className={styles.rib} x1="17" y1="9.6" x2="17" y2="15.4" strokeWidth="0.6" />
        <line className={styles.rib} x1="19" y1="9.6" x2="19" y2="15.4" strokeWidth="0.6" />
        {/* Wheels */}
        <circle className={styles.wheel} cx="9" cy="18.4" r="2" />
        <circle className={styles.tire} cx="9" cy="18.4" r="2" />
        <circle className={styles.rim} cx="9" cy="18.4" r="1" />
        <circle className={styles.wheel} cx="17" cy="18.4" r="2" />
        <circle className={styles.tire} cx="17" cy="18.4" r="2" />
        <circle className={styles.rim} cx="17" cy="18.4" r="1" />
        {/* Stabilizer leg */}
        <line className={styles.stabilizer} x1="3.2" y1="17.6" x2="3.2" y2="20.4" />
        <line className={styles.stabilizer} x1="2.4" y1="20.4" x2="4" y2="20.4" />
      </svg>
    </span>
  )
}
