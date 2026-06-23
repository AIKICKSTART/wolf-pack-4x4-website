import type { ReactNode } from "react"

import type { CanvasPoint } from "./whiteboard-types"
import { positionLabel, zoomLabel } from "./whiteboard-types"
import styles from "./whiteboard-canvas.module.css"

export interface WhiteboardCanvasProps {
  /** Display name for the board — shown in top-left chip. */
  boardName: string
  /** Current zoom level (1 = 100%). */
  zoom: number
  /** Current pan position in canvas coordinates. */
  position: CanvasPoint
  /** Optional: hide the dotted background pattern (for a clean stage). */
  hideGrid?: boolean
  /** Optional: dim the position/zoom chips. */
  hideChrome?: boolean
  /** Canvas content — stickies, frames, arrows go in here. */
  children?: ReactNode
  /** Optional className passthrough. */
  className?: string
}

export function WhiteboardCanvas({
  boardName,
  zoom,
  position,
  hideGrid = false,
  hideChrome = false,
  children,
  className,
}: WhiteboardCanvasProps) {
  const classes = [
    styles.canvas,
    hideGrid ? styles.flat : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const ariaLabel = `Whiteboard canvas — ${boardName}`

  return (
    <section
      role="application"
      aria-roledescription="whiteboard"
      aria-label={ariaLabel}
      className={classes}
    >
      {!hideGrid ? <div className={styles.dots} aria-hidden="true" /> : null}
      {!hideChrome ? (
        <header className={styles.headChips} aria-hidden="true">
          <span className={styles.boardChip}>
            <span className={styles.boardDot} />
            {boardName}
          </span>
          <span className={styles.spacer} />
          <span className={styles.zoomChip}>{zoomLabel(zoom)}</span>
          <span className={styles.posChip}>{positionLabel(position)}</span>
        </header>
      ) : null}
      <div className={styles.surface}>{children}</div>
    </section>
  )
}

export default WhiteboardCanvas
