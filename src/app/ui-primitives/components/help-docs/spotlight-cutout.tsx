"use client"

import { useId, type CSSProperties } from "react"

import styles from "./spotlight-cutout.module.css"

export interface SpotlightCutoutTarget {
  top: number
  left: number
  width: number
  height: number
}

interface SpotlightCutoutProps {
  target: SpotlightCutoutTarget
  cornerRadius?: number
  dimAlpha?: number
  className?: string
  ariaLabel?: string
}

export function SpotlightCutout({
  target,
  cornerRadius = 12,
  dimAlpha = 0.74,
  className,
  ariaLabel = "Guided tour spotlight",
}: SpotlightCutoutProps) {
  const maskId = useId()
  const classes = [styles.spotlight, className].filter(Boolean).join(" ")

  return (
    <svg
      className={classes}
      role="presentation"
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect
            x={target.left}
            y={target.top}
            width={target.width}
            height={target.height}
            rx={cornerRadius}
            ry={cornerRadius}
            fill="black"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        className={styles.scrim}
        style={{ "--spotlight-dim-alpha": dimAlpha } as CSSProperties}
        mask={`url(#${maskId})`}
      />
      <rect
        x={target.left - 1}
        y={target.top - 1}
        width={target.width + 2}
        height={target.height + 2}
        rx={cornerRadius + 1}
        ry={cornerRadius + 1}
        className={styles.ring}
      />
    </svg>
  )
}

export default SpotlightCutout
