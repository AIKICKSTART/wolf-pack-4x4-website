"use client"

import type { CSSProperties } from "react"

import { Kbd } from "../primitives/kbd"

import { PALETTE_TOOLS } from "./photo-editor-types"
import type { ToolId } from "./photo-editor-types"
import styles from "./tool-palette.module.css"

interface ToolPaletteProps {
  /** Currently selected tool id. */
  activeTool: ToolId
  /** Optional subset override — defaults to all 8 tools in canonical order. */
  tools?: ReadonlyArray<ToolId>
  /** Optional callback when a palette tool is clicked. */
  onToolSelect?: (tool: ToolId) => void
  /** Foreground colour swatch hex. Defaults to `#f5f6fa`. */
  foregroundHex?: string
  /** Background colour swatch hex. Defaults to `#0b0c12`. */
  backgroundHex?: string
}

export function ToolPalette({
  activeTool,
  tools,
  onToolSelect,
  foregroundHex = "#f5f6fa",
  backgroundHex = "#0b0c12",
}: ToolPaletteProps) {
  const visibleTools = tools
    ? PALETTE_TOOLS.filter((tool) => tools.includes(tool.id))
    : PALETTE_TOOLS

  const colourVars: CSSProperties = {
    "--colour-fg": foregroundHex,
    "--colour-bg": backgroundHex,
  } as CSSProperties

  return (
    <aside
      className={styles.palette}
      role="toolbar"
      aria-label="Photo editor tools"
      aria-orientation="vertical"
    >
      <span className={styles.kicker}>Tools</span>
      <div className={styles.list} role="presentation">
        {visibleTools.map((tool) => {
          const isActive = tool.id === activeTool
          return (
            <button
              key={tool.id}
              type="button"
              className={[styles.tool, isActive ? styles.toolActive : ""].join(" ")}
              aria-pressed={isActive}
              aria-label={`${tool.label} · ${tool.description} · shortcut ${tool.shortcut}`}
              title={`${tool.label} (${tool.shortcut})`}
              onClick={() => onToolSelect?.(tool.id)}
            >
              <span className={styles.glyph} aria-hidden="true">
                {tool.glyph}
              </span>
              <span className={styles.shortcut} aria-hidden="true">
                <Kbd size="sm">{tool.shortcut}</Kbd>
              </span>
            </button>
          )
        })}
      </div>
      <div className={styles.divider} aria-hidden="true" />
      <footer className={styles.foot} style={colourVars}>
        <span
          className={styles.colourSlot}
          role="img"
          aria-label={`Foreground ${foregroundHex} · Background ${backgroundHex}`}
        />
      </footer>
    </aside>
  )
}
