"use client"

import {
  Eraser,
  Hand,
  Highlighter,
  Move,
  PencilLine,
  Shapes,
  Spline,
  StickyNote,
  Type,
} from "lucide-react"
import type { ComponentType } from "react"

import type { DrawingToolKind } from "./whiteboard-types"
import styles from "./drawing-tool-palette.module.css"

export interface DrawingToolPaletteProps {
  /** Active tool — highlighted. */
  activeTool: DrawingToolKind
  /** Called when the user picks a tool. */
  onSelect?: (tool: DrawingToolKind) => void
  /** Optional className passthrough. */
  className?: string
  /** Optional aria-label override. */
  ariaLabel?: string
}

interface ToolEntry {
  id: DrawingToolKind
  label: string
  hint: string
  icon: ComponentType<{ "aria-hidden"?: boolean }>
}

const TOOL_ICON_MOVE: ComponentType<{ "aria-hidden"?: boolean }> = Move

const TOOLS: ReadonlyArray<ToolEntry> = [
  { id: "hand", label: "Hand", hint: "H", icon: Hand },
  { id: "pen", label: "Pen", hint: "P", icon: PencilLine },
  { id: "highlighter", label: "Highlighter", hint: "L", icon: Highlighter },
  { id: "eraser", label: "Eraser", hint: "E", icon: Eraser },
  { id: "shape", label: "Shape", hint: "S", icon: Shapes },
  { id: "sticky", label: "Sticky", hint: "N", icon: StickyNote },
  { id: "text", label: "Text", hint: "T", icon: Type },
  { id: "connector", label: "Connector", hint: "C", icon: Spline },
]

export function DrawingToolPalette({
  activeTool,
  onSelect,
  className,
  ariaLabel = "Whiteboard drawing tools",
}: DrawingToolPaletteProps) {
  const classes = [styles.palette, className].filter(Boolean).join(" ")

  return (
    <div
      role="toolbar"
      aria-orientation="vertical"
      aria-label={ariaLabel}
      className={classes}
    >
      <span className={styles.brand} aria-hidden="true">
        <TOOL_ICON_MOVE aria-hidden={true} />
      </span>
      <ul className={styles.list}>
        {TOOLS.map((tool) => {
          const Icon = tool.icon
          const active = tool.id === activeTool
          return (
            <li key={tool.id} className={styles.item}>
              <button
                type="button"
                className={`${styles.btn} ${active ? styles.active : ""}`}
                aria-pressed={active}
                aria-label={`${tool.label} (${tool.hint})`}
                onClick={() => onSelect?.(tool.id)}
              >
                <Icon aria-hidden={true} />
                <span className={styles.hint} aria-hidden="true">
                  {tool.hint}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DrawingToolPalette
