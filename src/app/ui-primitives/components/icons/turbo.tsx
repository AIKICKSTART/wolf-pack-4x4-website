import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./turbo.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function TurboIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Turbo",
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
        {/* Snail housing — spiral volute */}
        <path
          className={styles.shellFill}
          d="M11.5 3.5c4.7 0 8 3.5 8 8 0 2.2-1 4-2.6 5.4l3.4 2.4-1.4 2-3.2-2.4c-1.2.8-2.6 1.2-4 1.2-4.7 0-8-3.5-8-8s3.3-8.6 7.8-8.6z"
        />
        <path
          className={styles.shell}
          d="M11.5 3.5c4.7 0 8 3.5 8 8 0 2.2-1 4-2.6 5.4l3.4 2.4-1.4 2-3.2-2.4c-1.2.8-2.6 1.2-4 1.2-4.7 0-8-3.5-8-8s3.3-8.6 7.8-8.6z"
        />
        {/* Volute spiral interior */}
        <path className={styles.spiral} d="M11.5 18.4c-3.8 0-6.5-3-6.5-6.4 0-2.6 1.6-4.8 4-5.8" />
        {/* Compressor wheel hub center */}
        <circle className={styles.compressor} cx="11.5" cy="11.5" r="4.6" />
        <circle className={styles.compressorRing} cx="11.5" cy="11.5" r="4.6" />
        {/* Fan blades — curved compressor blades */}
        <g className={styles.fan}>
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" />
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" transform="rotate(60 11.5 11.5)" />
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" transform="rotate(120 11.5 11.5)" />
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" transform="rotate(180 11.5 11.5)" />
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" transform="rotate(240 11.5 11.5)" />
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" transform="rotate(300 11.5 11.5)" />
        </g>
        <g className={styles.fanBlur}>
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" />
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" transform="rotate(60 11.5 11.5)" />
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" transform="rotate(120 11.5 11.5)" />
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" transform="rotate(180 11.5 11.5)" />
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" transform="rotate(240 11.5 11.5)" />
          <path className={styles.blade} d="M11.5 7.4c-.4 1.4 0 2.4 1.3 3.2L11.5 11.5z" transform="rotate(300 11.5 11.5)" />
        </g>
        <circle className={styles.hub} cx="11.5" cy="11.5" r="1.4" />
        <circle className={styles.hubInner} cx="11.5" cy="11.5" r="0.5" />
        {/* Intake mouth on left */}
        <path className={styles.intake} d="M3 9.6c0-.6.4-1 1-1h1.4v6H4c-.6 0-1-.4-1-1z" />
      </svg>
    </span>
  )
}
