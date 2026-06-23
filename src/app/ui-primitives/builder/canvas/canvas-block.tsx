"use client"

import {
  Copy,
  Eye,
  EyeOff,
  GripVertical,
  Trash2,
} from "lucide-react"
import { type DragEvent, type KeyboardEvent } from "react"

import type { Block } from "../model"
import { BlockRender } from "./block-render"
import styles from "./canvas.module.css"
import { CANVAS_DRAG_MIME } from "./drag-mime"

interface CanvasBlockProps {
  block: Block
  index: number
  total: number
  selected: boolean
  onSelect: (id: string) => void
  onDragStart: (id: string) => void
  onDragEnd: () => void
  onDuplicate: (id: string) => void
  onToggleVisibility: (id: string) => void
  onDelete: (id: string) => void
  onMoveByKeyboard: (id: string, direction: -1 | 1) => void
}

// Lucide writes `size` to the SVG width/height *attribute*, which rejects
// `var()`. Sizing via `style` lets the central `--primitive-icon-*` tokens
// resolve through CSS (which wins over the presentation attribute).
const ICON_STYLE = {
  width: "var(--primitive-icon-sm)",
  height: "var(--primitive-icon-sm)",
  strokeWidth: "var(--primitive-icon-stroke)",
}

/**
 * One placed block on the canvas: a selectable, draggable wrapper around the
 * token-driven {@link BlockRender}. Keyboard: Enter/Space selects; Alt+Arrow
 * reorders without a pointer. A floating toolbar exposes duplicate / hide /
 * delete when selected.
 */
export function CanvasBlock({
  block,
  index,
  total,
  selected,
  onSelect,
  onDragStart,
  onDragEnd,
  onDuplicate,
  onToggleVisibility,
  onDelete,
  onMoveByKeyboard,
}: CanvasBlockProps) {
  function handleDragStart(event: DragEvent<HTMLDivElement>): void {
    event.dataTransfer.setData(CANVAS_DRAG_MIME, block.id)
    event.dataTransfer.effectAllowed = "move"
    onDragStart(block.id)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSelect(block.id)
      return
    }
    if (event.altKey && event.key === "ArrowUp") {
      event.preventDefault()
      onMoveByKeyboard(block.id, -1)
      return
    }
    if (event.altKey && event.key === "ArrowDown") {
      event.preventDefault()
      onMoveByKeyboard(block.id, 1)
    }
  }

  return (
    <div
      role="listitem"
      tabIndex={0}
      aria-current={selected ? "true" : undefined}
      aria-label={`${block.name}, block ${index + 1} of ${total}${block.hidden ? ", hidden" : ""}`}
      className={[
        styles.canvasBlock,
        selected ? styles.canvasBlockSelected : "",
        block.hidden ? styles.canvasBlockHidden : "",
      ].join(" ")}
      data-block-id={block.id}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={() => onSelect(block.id)}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.blockChrome} aria-hidden={!selected}>
        <span className={styles.blockGrip} title="Drag to reorder">
          <GripVertical style={ICON_STYLE} aria-hidden />
        </span>
        <span className={styles.blockLabel}>{block.name}</span>
        <span className={styles.blockToolbar}>
          <button
            type="button"
            className={styles.blockTool}
            onClick={(event) => {
              event.stopPropagation()
              onToggleVisibility(block.id)
            }}
            aria-label={block.hidden ? `Show ${block.name}` : `Hide ${block.name}`}
            tabIndex={selected ? 0 : -1}
          >
            {block.hidden ? (
              <EyeOff style={ICON_STYLE} aria-hidden />
            ) : (
              <Eye style={ICON_STYLE} aria-hidden />
            )}
          </button>
          <button
            type="button"
            className={styles.blockTool}
            onClick={(event) => {
              event.stopPropagation()
              onDuplicate(block.id)
            }}
            aria-label={`Duplicate ${block.name}`}
            tabIndex={selected ? 0 : -1}
          >
            <Copy style={ICON_STYLE} aria-hidden />
          </button>
          <button
            type="button"
            className={`${styles.blockTool} ${styles.blockToolDanger}`}
            onClick={(event) => {
              event.stopPropagation()
              onDelete(block.id)
            }}
            aria-label={`Delete ${block.name}`}
            tabIndex={selected ? 0 : -1}
          >
            <Trash2 style={ICON_STYLE} aria-hidden />
          </button>
        </span>
      </div>
      <div className={styles.blockBody}>
        <BlockRender block={block} />
        {block.hidden ? <span className={styles.hiddenTag}>Hidden on page</span> : null}
      </div>
    </div>
  )
}
