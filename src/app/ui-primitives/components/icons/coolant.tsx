import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./coolant.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function CoolantIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Coolant",
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
        {/* Jerrycan cap with breather + handle */}
        <rect className={styles.cap} x="6.2" y="2.4" width="2.6" height="2" rx="0.3" />
        <path className={styles.spout} d="M5.8 4.4h3.4l.6 1.4h-4.6z" />
        <path className={styles.handle} d="M9.4 5.6c1.4 0 1.6.8 1.6 1.6v1.4" />
        {/* Jerrycan main body — flat-sided fuel/coolant can */}
        <path
          className={styles.bottle}
          d="M4.4 5.8h6.2c.4 0 .8.4.8.8v13.2c0 .6-.4 1-1 1H4.6c-.6 0-1-.4-1-1V6.6c0-.4.4-.8.8-.8z"
        />
        {/* Ribbed front face — characteristic jerrycan ridges */}
        <path className={styles.rib} d="M3.6 9.4h7.8M3.6 12.6h7.8M3.6 15.8h7.8" />
        {/* Liquid level fill */}
        <path
          className={styles.fill}
          d="M4 13.4c.8-.4 1.6.4 2.6 0 1-.4 1.8.4 2.6 0 .8-.4 1.6.4 2.6 0v6.4c0 .6-.4 1-1 1H4.6c-.6 0-1-.4-1-1z"
        />
        <path className={styles.wave} d="M3.6 13.4c.8-.4 1.6.4 2.6 0 1-.4 1.8.4 2.6 0 .8-.4 1.6.4 2.6 0" />
        {/* Cold/snowflake — temperature indicator on right side */}
        <g className={styles.flakeGroup}>
          <path className={styles.flake} data-f="1" d="M17 5.4v7M14 8.9h6M15.4 7.3l3.2 3.2M18.6 7.3l-3.2 3.2" />
          <circle className={styles.flake} data-f="2" cx="17" cy="8.9" r="0.9" />
          <path className={styles.flake} data-f="3" d="M19.6 13.4v3M18.4 14.9h2.4M18.8 13.9l1.6 1.6M20.4 13.9l-1.6 1.6" />
        </g>
      </svg>
    </span>
  )
}
