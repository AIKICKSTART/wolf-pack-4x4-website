"use client"

import styles from "./razor-split-tool.module.css"

interface RazorSplitToolProps {
  /** Hover position from the left of the track in px. Drives cursor position. */
  hoverLeftPx: number
  /** Visible time at the cursor — e.g. "00:14.6". */
  atDisplay: string
  /** When true the confirmation popover is shown anchored above the cursor. */
  popoverOpen?: boolean
  /** Frame-snap toggle state for the popover. */
  snapToFrames?: boolean
  /** Optional onSnapToggle callback for the snap chip. */
  onSnapToggle?: () => void
}

export function RazorSplitTool({
  hoverLeftPx,
  atDisplay,
  popoverOpen = false,
  snapToFrames = true,
  onSnapToggle,
}: RazorSplitToolProps) {
  return (
    <div
      className={styles.tool}
      style={{ left: `${hoverLeftPx}px` }}
      role="presentation"
    >
      <span className={styles.blade} aria-hidden="true">
        <svg viewBox="0 0 16 22" focusable="false">
          <path d="M2 0 H10 L14 6 V22 H8 L4 16 V0 Z" />
          <path d="M4 2 H8 V12 L6 14 L4 12 Z" fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" />
        </svg>
      </span>
      <span className={styles.dashedLine} aria-hidden="true" />
      <span className={styles.atChip}>{atDisplay}</span>
      {popoverOpen ? (
        <div className={styles.popover} role="dialog" aria-label="Confirm split">
          <span className={styles.popoverTitle}>Split clip</span>
          <span className={styles.popoverBody}>
            Cut at <strong>{atDisplay}</strong>
          </span>
          <button
            type="button"
            className={[styles.snapChip, snapToFrames ? styles.snapOn : ""].join(" ")}
            aria-pressed={snapToFrames}
            onClick={onSnapToggle}
          >
            Snap to frame
          </button>
        </div>
      ) : null}
    </div>
  )
}
