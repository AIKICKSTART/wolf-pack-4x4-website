"use client"

import type { CSSProperties, ReactNode } from "react"

import styles from "./canvas.module.css"
import { PREVIEW_WIDTHS, type PreviewWidth } from "./types"

interface PreviewFrameProps {
  width: PreviewWidth
  children: ReactNode
}

/**
 * Constrains its children to a device-width preview frame. The max-width is a
 * layout constraint (a device viewport), not a design value, so it is set
 * inline — the tokenization contract allowlists `100%`/viewport sizing and
 * numeric layout widths as non-hardcodes.
 */
export function PreviewFrame({ width, children }: PreviewFrameProps) {
  const px = PREVIEW_WIDTHS[width]
  const style: CSSProperties = px === null ? {} : { maxWidth: `${px}px` }
  return (
    <div className={styles.previewFrame} data-preview-width={width} style={style}>
      {children}
    </div>
  )
}
