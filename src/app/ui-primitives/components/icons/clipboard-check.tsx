import type { IconMotion, IconProps } from "./icon-types"
import { TONE_VALUES } from "./icon-types"
import styles from "./clipboard-check.module.css"

const MOTION_CLASS: Record<IconMotion, string | undefined> = {
  pulse: styles.motionPulse,
  rotate: styles.motionRotate,
  wiggle: styles.motionWiggle,
  drift: styles.motionDrift,
  draw: styles.motionDraw,
  spark: styles.motionSpark,
  none: undefined,
}

export function ClipboardCheckIcon({
  size = 24,
  tone = "currentColor",
  motion = "none",
  variant = "monoline",
  title = "Clipboard check",
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
        {/* Board with corner-rounded edges */}
        <rect className={styles.boardFill} x="4.4" y="4.4" width="15.2" height="17.2" rx="2" />
        <rect className={styles.board} x="4.4" y="4.4" width="15.2" height="17.2" rx="2" />
        {/* Tab where clip mounts */}
        <path className={styles.tab} d="M8.4 4.4h7.2v2.6H8.4z" />
        {/* Spring clip */}
        <rect className={styles.clipBack} x="8.6" y="2.6" width="6.8" height="3.8" rx="0.6" />
        <rect className={styles.clipFront} x="9.4" y="3" width="5.2" height="2.4" rx="0.4" />
        <line className={styles.clipDetail} x1="11" y1="4" x2="13" y2="4" strokeWidth="0.7" />
        {/* Lines representing form fields */}
        <line className={styles.fieldLabel} x1="7" y1="10.4" x2="9.4" y2="10.4" strokeWidth="0.9" />
        <line className={styles.fieldFill} x1="9.8" y1="10.4" x2="16.8" y2="10.4" strokeWidth="0.9" />
        <line className={styles.fieldLabel} x1="7" y1="12.8" x2="9" y2="12.8" strokeWidth="0.9" />
        <line className={styles.fieldFill} x1="9.4" y1="12.8" x2="14.4" y2="12.8" strokeWidth="0.9" />
        {/* Checkbox + tick */}
        <rect className={styles.checkbox} x="6.6" y="15.6" width="2.4" height="2.4" rx="0.4" />
        <path className={styles.check} d="M7 16.8l1.2 1.2 2-2" />
        <line className={styles.itemLine} x1="10" y1="16.8" x2="16.6" y2="16.8" strokeWidth="0.9" />
        <rect className={styles.checkbox} x="6.6" y="18.6" width="2.4" height="2.4" rx="0.4" />
        <line className={styles.itemLine} x1="10" y1="19.8" x2="14.4" y2="19.8" strokeWidth="0.9" />
      </svg>
    </span>
  )
}
