import type { CSSProperties, ReactNode } from "react"

import styles from "./topology-canvas.module.css"

interface TopologyCanvasProps {
  /** Aria label describing the topology canvas. */
  ariaLabel: string
  /** Visual zoom factor (1 = 100%). Defaults to 1. */
  zoom?: number
  /** Optional fixed pixel height — defaults to 560px. */
  height?: number
  /** Status caption rendered in the bottom-right corner badge. */
  zoomLabel?: string
  /** Optional left/top pan offset in percent — visual hint only. */
  panX?: number
  panY?: number
  className?: string
  children?: ReactNode
}

export function TopologyCanvas({
  ariaLabel,
  zoom = 1,
  height,
  zoomLabel,
  panX = 0,
  panY = 0,
  className,
  children,
}: TopologyCanvasProps) {
  const styleVars = {
    "--topology-canvas-zoom": zoom,
    "--topology-canvas-pan-x": `${panX}%`,
    "--topology-canvas-pan-y": `${panY}%`,
    "--topology-canvas-height": height ? `${height}px` : undefined,
  } as CSSProperties

  const classes = [styles.canvas, className].filter(Boolean).join(" ")
  const caption = zoomLabel ?? `${Math.round(zoom * 100)}%`

  return (
    <div
      className={classes}
      role="img"
      aria-label={ariaLabel}
      style={styleVars}
    >
      <div className={styles.starfield} aria-hidden="true" />
      <div className={styles.gridFine} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.viewport}>{children}</div>
      <div className={styles.frameLabel} aria-hidden="true">
        <span className={styles.frameDot} />
        TOPOLOGY · {caption}
      </div>
      <div className={styles.cornerCompass} aria-hidden="true">
        <span>N</span>
      </div>
    </div>
  )
}
