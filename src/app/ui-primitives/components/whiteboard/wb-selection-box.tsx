import type { ReactNode } from "react"

import styles from "./wb-selection-box.module.css"

export interface WbSelectionBoxProps {
  /** Box width in pixels. */
  width: number
  /** Box height in pixels. */
  height: number
  /** Optional content rendered inside the selection box. */
  children?: ReactNode
  /** Show group-objects chip with count. */
  groupCount?: number
  /** Optional rotation hint (e.g. "-7°"). */
  rotationLabel?: string
  /** Hide the 8 resize handles. */
  hideHandles?: boolean
  /** Hide the top rotation handle. */
  hideRotation?: boolean
  /** Optional className passthrough. */
  className?: string
}

const HANDLE_KEYS = ["nw", "n", "ne", "e", "se", "s", "sw", "w"] as const

export function WbSelectionBox({
  width,
  height,
  children,
  groupCount,
  rotationLabel,
  hideHandles = false,
  hideRotation = false,
  className,
}: WbSelectionBoxProps) {
  const classes = [styles.box, className].filter(Boolean).join(" ")
  const ariaLabel =
    groupCount && groupCount > 1
      ? `Selection of ${groupCount} grouped objects`
      : "Selection box"

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={classes}
      style={{ width, height }}
    >
      {children ? <div className={styles.inner}>{children}</div> : null}
      {!hideRotation ? (
        <span className={styles.rotationStem} aria-hidden="true">
          <span className={styles.rotationHandle} />
          {rotationLabel ? (
            <span className={styles.rotationLabel}>{rotationLabel}</span>
          ) : null}
        </span>
      ) : null}
      {!hideHandles ? (
        <>
          {HANDLE_KEYS.map((key) => (
            <span
              key={key}
              className={`${styles.handle} ${styles[`handle-${key}` as keyof typeof styles] ?? ""}`}
              data-handle={key}
              aria-hidden="true"
            />
          ))}
        </>
      ) : null}
      {groupCount && groupCount > 1 ? (
        <span className={styles.groupChip}>Group · {groupCount}</span>
      ) : null}
    </div>
  )
}

export default WbSelectionBox
