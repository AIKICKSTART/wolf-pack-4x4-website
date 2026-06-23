import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./mig-welder.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function MigWelderIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "MIG welder",
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
        {/* Pistol-style MIG gun — handle grip */}
        <path
          className={styles.gun}
          d="M2.6 4.4h7c.7 0 1.2.5 1.2 1.2v2.4c0 .7-.5 1.2-1.2 1.2H7.4l-2.2 6c-.2.5-.7.8-1.2.8H3.4c-.6 0-1-.4-1-1V5.6c0-.6.4-1.2.4-1.2z"
        />
        <path
          className={styles.gunStroke}
          d="M2.6 4.4h7c.7 0 1.2.5 1.2 1.2v2.4c0 .7-.5 1.2-1.2 1.2H7.4l-2.2 6c-.2.5-.7.8-1.2.8H3.4c-.6 0-1-.4-1-1z"
        />
        {/* Trigger */}
        <path className={styles.trigger} d="M5.4 9.2h2.2c.3 0 .5.2.5.5v1.2h-2.7z" />
        {/* Gun neck — curved swan neck */}
        <path className={styles.neck} d="M10.8 6.4c1.6 0 3 .8 3.8 2.2" strokeWidth="1.8" />
        {/* Contact tip + nozzle */}
        <rect className={styles.nozzle} x="14" y="7.6" width="3.4" height="3.2" rx="0.3" transform="rotate(35 15.7 9.2)" />
        <rect className={styles.contactTip} x="14.4" y="9" width="2" height="0.8" rx="0.1" transform="rotate(35 15.4 9.4)" />
        {/* Wire feed coming out */}
        <line className={styles.wire} x1="17.4" y1="11.4" x2="19.6" y2="13.6" />
        {/* Cable */}
        <path className={styles.cable} d="M8 12c2 1 3.5 2.5 4.5 4.5 1 2 1.5 4 1.5 4" />
        {/* Arc + spatter */}
        <circle className={styles.arc} data-a="1" cx="19.8" cy="14" r="1.2" />
        <circle className={styles.arc} data-a="2" cx="19.8" cy="14" r="0.8" />
        <circle className={styles.arc} data-a="3" cx="19.8" cy="14" r="1.6" />
        <circle className={styles.spatter} data-s="1" cx="21.6" cy="14.4" r="0.4" />
        <circle className={styles.spatter} data-s="2" cx="18.4" cy="15.8" r="0.35" />
        {/* Work surface */}
        <line className={styles.workSurface} x1="16" y1="18" x2="22.4" y2="18" strokeWidth="1.4" />
      </svg>
    </span>
  )
}
