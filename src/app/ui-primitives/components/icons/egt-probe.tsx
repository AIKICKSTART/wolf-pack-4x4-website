import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./egt-probe.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function EgtProbeIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "EGT thermocouple probe",
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
        {/* Probe tip — pointed sensing element */}
        <path className={styles.tip} d="M20.4 2.4l-1.2 3.4-2.6-.6z" />
        <line className={styles.tipHot} x1="20.4" y1="2.4" x2="19.2" y2="5.8" strokeWidth="0.9" />
        {/* Thermocouple stem */}
        <path
          className={styles.stem}
          d="M18 5.4l-7.4 7.4"
          strokeWidth="1.8"
        />
        <path
          className={styles.stemSheath}
          d="M18 5.4l-7.4 7.4"
          strokeWidth="2.6"
        />
        {/* Spring-loaded compression fitting */}
        <rect
          className={styles.fitting}
          x="9.4"
          y="12.4"
          width="3"
          height="3"
          rx="0.3"
          transform="rotate(-45 10.9 13.9)"
        />
        <line className={styles.fittingRib} x1="9.6" y1="12.6" x2="11.6" y2="14.6" strokeWidth="0.4" />
        <line className={styles.fittingRib} x1="10" y1="13" x2="12" y2="15" strokeWidth="0.4" />
        {/* Cable braided shroud */}
        <path
          className={styles.cable}
          d="M9.6 13.4c-3 2-4.4 4.4-5.6 7.6"
          strokeWidth="1.7"
        />
        {/* Cable braid texture */}
        <path
          className={styles.braid}
          d="M9.4 13.6c-3 2-4.4 4.4-5.6 7.6"
          strokeWidth="1.4"
          strokeDasharray="1.4 1.2"
        />
        {/* Connector at base */}
        <rect
          className={styles.connector}
          x="2.6"
          y="19.4"
          width="3.4"
          height="2.6"
          rx="0.4"
          transform="rotate(-35 4.3 20.7)"
        />
        <line className={styles.connectorPin} x1="3.6" y1="22" x2="3" y2="22.6" strokeWidth="0.7" />
        <line className={styles.connectorPin} x1="4.4" y1="22.5" x2="3.8" y2="23" strokeWidth="0.7" />
        {/* Heat shimmer near tip */}
        <path className={styles.heat} data-h="1" d="M22 4c.4-.4.8-.8.8-1.4" />
        <path className={styles.heat} data-h="2" d="M22 5.4c.4-.4.8-.8.8-1.4" />
        <path className={styles.heat} data-h="3" d="M22 6.8c.4-.4.8-.8.8-1.4" />
      </svg>
    </span>
  )
}
