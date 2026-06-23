"use client"

import { LayoutGrid } from "lucide-react"
import { useState, type DragEvent } from "react"

import type { Block } from "../model"
import { CanvasBlock } from "./canvas-block"
import styles from "./canvas.module.css"
import { CANVAS_DRAG_MIME, PALETTE_DRAG_MIME } from "./drag-mime"

interface CanvasSurfaceProps {
  blocks: readonly Block[]
  selectedId: string | null
  /** True while a palette drag is in flight (drop zones become visible). */
  dragging: boolean
  onSelect: (id: string | null) => void
  /** Insert the dragged palette manifest at `index`. */
  onDropPalette: (manifestType: string, index: number) => void
  /** Move an existing block to `index`. */
  onReorder: (blockId: string, index: number) => void
  onDragStartBlock: (id: string) => void
  onDragEndBlock: () => void
  onDuplicate: (id: string) => void
  onToggleVisibility: (id: string) => void
  onDelete: (id: string) => void
  onMoveByKeyboard: (id: string, direction: -1 | 1) => void
}

/** Reads the drop intent (palette insert vs. canvas reorder) from a drag event. */
function readDrop(event: DragEvent): { kind: "palette" | "canvas"; value: string } | null {
  const palette = event.dataTransfer.getData(PALETTE_DRAG_MIME)
  if (palette) return { kind: "palette", value: palette }
  const canvas = event.dataTransfer.getData(CANVAS_DRAG_MIME)
  if (canvas) return { kind: "canvas", value: canvas }
  return null
}

/**
 * The drop surface holding the ordered root blocks. Drop zones sit before each
 * block and after the last; hovering one highlights it. A palette drop inserts;
 * a canvas drop reorders. Clicking empty space clears the selection.
 */
export function CanvasSurface(props: CanvasSurfaceProps) {
  const { blocks, selectedId, dragging } = props
  const [activeZone, setActiveZone] = useState<number | null>(null)

  function allowDrop(event: DragEvent): void {
    // Only accept our own drag types.
    if (
      event.dataTransfer.types.includes(PALETTE_DRAG_MIME) ||
      event.dataTransfer.types.includes(CANVAS_DRAG_MIME)
    ) {
      event.preventDefault()
    }
  }

  function handleDrop(event: DragEvent, index: number): void {
    event.preventDefault()
    setActiveZone(null)
    const intent = readDrop(event)
    if (!intent) return
    if (intent.kind === "palette") {
      props.onDropPalette(intent.value, index)
    } else {
      props.onReorder(intent.value, index)
    }
  }

  const dropZone = (index: number) => (
    <div
      key={`zone-${index}`}
      className={[
        styles.dropZone,
        dragging ? styles.dropZoneArmed : "",
        activeZone === index ? styles.dropZoneActive : "",
      ].join(" ")}
      onDragOver={(event) => {
        allowDrop(event)
        setActiveZone(index)
      }}
      onDragLeave={() => setActiveZone((current) => (current === index ? null : current))}
      onDrop={(event) => handleDrop(event, index)}
      aria-hidden
    />
  )

  return (
    <div
      className={styles.surfaceScroll}
      onClick={(event) => {
        if (event.target === event.currentTarget) props.onSelect(null)
      }}
    >
      <div
        className={styles.surface}
        role="list"
        aria-label="Page canvas"
        onDragOver={allowDrop}
        onDrop={(event) => handleDrop(event, blocks.length)}
      >
        {blocks.length === 0 ? (
          <div
            className={styles.empty}
            onDragOver={allowDrop}
            onDrop={(event) => handleDrop(event, 0)}
          >
            <LayoutGrid
              style={{
                width: "var(--primitive-icon-xl)",
                height: "var(--primitive-icon-xl)",
                strokeWidth: "var(--primitive-icon-stroke)",
              }}
              aria-hidden
            />
            <p className={styles.emptyTitle}>Blank canvas</p>
            <p className={styles.emptyBody}>
              Drag a block from the palette, or select one and press Enter to add it here.
            </p>
          </div>
        ) : (
          <>
            {dropZone(0)}
            {blocks.map((block, index) => (
              <div key={block.id} className={styles.blockRow}>
                <CanvasBlock
                  block={block}
                  index={index}
                  total={blocks.length}
                  selected={block.id === selectedId}
                  onSelect={props.onSelect}
                  onDragStart={props.onDragStartBlock}
                  onDragEnd={props.onDragEndBlock}
                  onDuplicate={props.onDuplicate}
                  onToggleVisibility={props.onToggleVisibility}
                  onDelete={props.onDelete}
                  onMoveByKeyboard={props.onMoveByKeyboard}
                />
                {dropZone(index + 1)}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
