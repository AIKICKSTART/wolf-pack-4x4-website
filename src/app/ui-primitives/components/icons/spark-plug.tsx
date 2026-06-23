import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./spark-plug.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function SparkPlugIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Spark plug",
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
        {/* Top terminal nut */}
        <rect className={styles.cap} x="10.4" y="1.6" width="3.2" height="2.4" rx="0.4" />
        {/* Wire boot connector */}
        <path className={styles.boot} d="M10 4h4l-.4 1.6h-3.2z" />
        {/* Ceramic insulator — flared bulb shape */}
        <path
          className={styles.insulator}
          d="M10.4 5.6h3.2c.4 0 .7.3.7.7v1.4l1.1.4c.4.2.6.5.6.9v1.4c0 .5-.3.8-.8.9l-.9.3v.4h-4.4v-.4l-.9-.3c-.5-.1-.8-.4-.8-.9V9c0-.4.2-.7.6-.9l1.1-.4V6.3c0-.4.3-.7.7-.7z"
        />
        {/* Insulator ribs (heat dissipation) */}
        <path className={styles.ribs} d="M9.4 8.4h5.2M9.2 9.8h5.6" strokeWidth="0.7" />
        {/* Hex shoulder + metal shell */}
        <path className={styles.hex} d="M9 12h6l.4 1.6H8.6z" />
        <rect className={styles.shell} x="9.2" y="13.6" width="5.6" height="2" rx="0.2" />
        {/* Threaded section */}
        <path className={styles.threads} d="M9.4 15.8h5.2M9.2 16.5h5.6M9.4 17.2h5.2M9.2 17.9h5.6M9.4 18.6h5.2" strokeWidth="0.8" />
        {/* Ground electrode arm — L-shape */}
        <path className={styles.electrode} d="M12 19.4v1.8l1.8-.2" />
        {/* Center electrode — straight pin */}
        <line className={styles.centerElectrode} x1="12" y1="19.4" x2="12" y2="20.8" />
        {/* Spark gap */}
        <path className={styles.sparkBolt} d="M11.6 20.4l.8.4-.4.5.8.4" />
        <circle className={styles.sparkArc} cx="12" cy="20.6" r="1.4" />
      </svg>
    </span>
  )
}
