import type { CSSProperties } from "react"

import type {
  CollabUser,
  CursorTone,
  RemoteSelection,
} from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./selection-highlight-bar.module.css"

interface SelectionHighlightBarProps {
  /** The remote selection being shown. */
  selection: RemoteSelection
  /** Optional anchor field label rendered above the bar. */
  contextLabel?: string
  className?: string
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

/** Tinted highlight bar that shows what a remote collaborator has selected. */
export function SelectionHighlightBar({
  selection,
  contextLabel,
  className,
}: SelectionHighlightBarProps) {
  const tint = toneHex(selection.user)
  const classes = [styles.bar, className].filter(Boolean).join(" ")
  const style: CSSProperties = {
    "--selection-tint": tint,
  } as CSSProperties

  return (
    <div
      className={classes}
      style={style}
      role="status"
      aria-label={`${selection.user.name} selected: ${selection.selectionLabel}`}
    >
      {contextLabel && <span className={styles.context}>{contextLabel}</span>}
      <div className={styles.row}>
        <span className={styles.flag}>
          <span className={styles.flagName}>{selection.user.name}</span>
        </span>
        <span className={styles.selection}>
          <span className={styles.selectionText}>{selection.selectionLabel}</span>
          {typeof selection.charCount === "number" && (
            <span className={styles.count}>{selection.charCount} chars</span>
          )}
        </span>
      </div>
    </div>
  )
}

export default SelectionHighlightBar
