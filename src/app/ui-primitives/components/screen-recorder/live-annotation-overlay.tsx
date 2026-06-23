"use client"

import styles from "./live-annotation-overlay.module.css"

import type { AnnotationTool } from "./screen-recorder-types"

interface LiveAnnotationOverlayProps {
  /** Currently active annotation tool. */
  activeTool: AnnotationTool
  /** Current swatch colour, expected to be a valid CSS colour. */
  activeColor: string
  /** Available swatch options — defaults to the Mufflermen palette. */
  swatches?: ReadonlyArray<string>
  /** Tool change handler. */
  onToolChange?: (next: AnnotationTool) => void
  /** Colour change handler. */
  onColorChange?: (next: string) => void
  /** Clear frame handler. */
  onClearFrame?: () => void
}

const TOOLS: ReadonlyArray<{ key: AnnotationTool; label: string; glyph: string }> = [
  { key: "pen", label: "Pen", glyph: "✎" },
  { key: "arrow", label: "Arrow", glyph: "→" },
  { key: "box", label: "Box", glyph: "▢" },
  { key: "text", label: "Text", glyph: "T" },
]

const DEFAULT_SWATCHES: ReadonlyArray<string> = [
  "var(--primitive-red)",
  "var(--primitive-amber)",
  "var(--primitive-teal)",
  "var(--primitive-green)",
  "var(--primitive-text-strong)",
]

export function LiveAnnotationOverlay({
  activeTool,
  activeColor,
  swatches = DEFAULT_SWATCHES,
  onToolChange,
  onColorChange,
  onClearFrame,
}: LiveAnnotationOverlayProps) {
  return (
    <div className={styles.wrap} aria-label="Live annotation overlay">
      <div className={styles.canvas} role="img" aria-label="Recording canvas preview">
        <span className={styles.scene} aria-hidden="true">
          <span className={styles.sceneBar} style={{ width: "62%" }} />
          <span className={styles.sceneBar} style={{ width: "44%" }} />
          <span className={styles.sceneBar} style={{ width: "78%" }} />
        </span>

        <svg className={styles.annotations} aria-hidden="true" viewBox="0 0 600 360">
          <defs>
            <marker
              id="arrow-head"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill={activeColor} />
            </marker>
          </defs>

          <path
            d="M 60 60 Q 120 30 200 80 T 360 110"
            fill="none"
            stroke={activeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <rect
            x="120"
            y="170"
            width="220"
            height="100"
            fill="none"
            stroke={activeColor}
            strokeWidth="2.5"
            rx="6"
          />

          <line
            x1="380"
            y1="220"
            x2="540"
            y2="160"
            stroke={activeColor}
            strokeWidth="3"
            strokeLinecap="round"
            markerEnd="url(#arrow-head)"
          />

          <text
            x="120"
            y="158"
            fill={activeColor}
            fontFamily="var(--primitive-font-mono)"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            BAY 2 — ADR PIPE
          </text>
        </svg>
      </div>

      <div className={styles.toolbar} role="toolbar" aria-label="Annotation tools">
        <div className={styles.tools} role="radiogroup" aria-label="Tool">
          {TOOLS.map((tool) => {
            const selected = tool.key === activeTool
            return (
              <button
                key={tool.key}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={tool.label}
                className={[styles.tool, selected ? styles.toolActive : ""].join(" ")}
                onClick={() => onToolChange?.(tool.key)}
              >
                <span className={styles.toolGlyph} aria-hidden="true">{tool.glyph}</span>
                <span>{tool.label}</span>
              </button>
            )
          })}
        </div>

        <div className={styles.swatches} role="radiogroup" aria-label="Annotation colour">
          {swatches.map((swatch) => {
            const selected = swatch === activeColor
            return (
              <button
                key={swatch}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`Colour ${swatch}`}
                className={[styles.swatch, selected ? styles.swatchActive : ""].join(" ")}
                style={{ background: swatch }}
                onClick={() => onColorChange?.(swatch)}
              />
            )
          })}
        </div>

        <button
          type="button"
          className={styles.clear}
          onClick={onClearFrame}
        >
          <span aria-hidden="true">⌫</span> Clear frame
        </button>
      </div>
    </div>
  )
}
