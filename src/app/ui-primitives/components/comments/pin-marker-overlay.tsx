"use client"

import type { ReactNode } from "react"

import styles from "./pin-marker-overlay.module.css"
import type { AnnotationPinRecord } from "./comment-types"
import { AnnotationPin } from "./annotation-pin"

interface PinMarkerOverlayProps {
  /** Target surface rendered behind the pin layer (image, SVG, canvas). */
  target: ReactNode
  /** Annotation pin records placed on the surface. */
  pins: ReadonlyArray<AnnotationPinRecord>
  /** Id of the pin currently selected (for highlight). */
  selectedPinId?: string
  /** Show overlaid coordinate grid. Defaults to true. */
  showGrid?: boolean
  /** Optional accessible label for the overlay region. */
  label?: string
  /** Optional caption rendered in the bottom-left corner. */
  caption?: string
  onPinClick?: (pin: AnnotationPinRecord) => void
  className?: string
}

export function PinMarkerOverlay({
  target,
  pins,
  selectedPinId,
  showGrid = true,
  label,
  caption,
  onPinClick,
  className,
}: PinMarkerOverlayProps) {
  const classes = [styles.overlay, className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      role="region"
      aria-label={label ?? `Annotation overlay with ${pins.length} pins`}
    >
      <div className={styles.target}>{target}</div>
      {showGrid ? <span className={styles.gridLayer} aria-hidden="true" /> : null}
      <div className={styles.pins} aria-hidden={false}>
        {pins.map((pin) => (
          <AnnotationPin
            key={pin.id}
            number={pin.number}
            position={pin.position}
            status={pin.status}
            selected={selectedPinId === pin.id}
            tooltip={pin.label}
            onClick={() => onPinClick?.(pin)}
          />
        ))}
      </div>
      {caption ? <span className={styles.caption}>{caption}</span> : null}
    </div>
  )
}

export default PinMarkerOverlay
