import type { CSSProperties, ReactNode } from "react"

import styles from "./workflow-canvas.module.css"

interface WorkflowCanvasProps {
  /** Aria label describing the canvas region. */
  ariaLabel: string
  /** Visual zoom-out factor (1 = 100%). Defaults to 1. */
  zoom?: number
  /** Optional fixed pixel height — defaults to 520px. */
  height?: number
  /** Status caption rendered in the bottom-right corner badge. */
  zoomLabel?: string
  className?: string
  children?: ReactNode
}

export function WorkflowCanvas({
  ariaLabel,
  zoom = 1,
  height,
  zoomLabel,
  className,
  children,
}: WorkflowCanvasProps) {
  const styleVars = {
    "--workflow-canvas-zoom": zoom,
    "--workflow-canvas-height": height ? `${height}px` : undefined,
  } as CSSProperties

  const classes = [styles.canvas, className].filter(Boolean).join(" ")
  const caption = zoomLabel ?? `${Math.round(zoom * 100)}%`

  return (
    <div
      className={classes}
      role="region"
      aria-label={ariaLabel}
      style={styleVars}
    >
      <div className={styles.gridFine} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.viewport}>{children}</div>
      <div className={styles.miniCorner} aria-hidden="true">
        <span>{caption}</span>
      </div>
    </div>
  )
}
