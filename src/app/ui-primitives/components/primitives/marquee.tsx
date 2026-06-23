import type { CSSProperties, ReactNode } from "react"

import styles from "./marquee.module.css"

export type MarqueeDirection = "left" | "right" | "up" | "down"

interface MarqueeProps {
  children: ReactNode
  direction?: MarqueeDirection
  speed?: number
  pauseOnHover?: boolean
  gap?: number
  fadeEdges?: boolean
  className?: string
  ariaLabel?: string
}

const DIRECTION_CLASS: Record<MarqueeDirection, string> = {
  left: styles.dirLeft,
  right: styles.dirRight,
  up: styles.dirUp,
  down: styles.dirDown,
}

export function Marquee({
  children,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  gap = 32,
  fadeEdges = true,
  className,
  ariaLabel,
}: MarqueeProps) {
  const duration = Math.max(2, 200 / Math.max(speed, 4))
  const classes = [
    styles.marquee,
    DIRECTION_CLASS[direction],
    pauseOnHover && styles.pauseOnHover,
    fadeEdges && styles.fadeEdges,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-gap": `${gap}px`,
  } as CSSProperties

  return (
    <div
      className={classes}
      style={style}
      role={ariaLabel ? "marquee" : "presentation"}
      aria-label={ariaLabel}
    >
      <div className={styles.track}>
        <div className={styles.row}>{children}</div>
        <div className={styles.row} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Marquee
