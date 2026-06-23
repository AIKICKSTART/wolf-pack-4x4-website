import type { IconMotion, IconProps } from "../icon-types"
import { TONE_VALUES } from "../icon-types"
import styles from "./beaudesert-mark.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function BeaudesertMarkIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Beaudesert brand mark",
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
        {/* Outback sun + horizon */}
        <path
          className={styles.diamond}
          d="M12 2.6l9.4 9.4-9.4 9.4L2.6 12z"
        />
        <path
          className={styles.diamondStroke}
          d="M12 2.6l9.4 9.4-9.4 9.4L2.6 12z"
        />
        {/* Inner diamond */}
        <path
          className={styles.innerDiamond}
          d="M12 6.4l5.6 5.6L12 17.6 6.4 12z"
        />
        {/* Center wordmark "B" simplified */}
        <path className={styles.letter} d="M10.6 9.2h2.2c.8 0 1.4.5 1.4 1.2 0 .5-.2.8-.6 1.1.5.2.7.6.7 1.2 0 .8-.7 1.4-1.5 1.4h-2.2z" />
      </svg>
    </span>
  )
}
