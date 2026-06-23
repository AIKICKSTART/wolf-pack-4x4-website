"use client"

import { AlertTriangle, Copy, Minus, Plus, RotateCcw, Settings2, Trash2 } from "lucide-react"
import { useState, type CSSProperties } from "react"

import {
  BLOCK_CATEGORY_GLYPH,
  BLOCK_CATEGORY_LABEL,
  TONE_HEX,
  type CanvasBlock,
} from "./cms-types"

import styles from "./page-canvas.module.css"

export interface PageCanvasProps {
  pageTitle: string
  pageSlug: string
  blocks: ReadonlyArray<CanvasBlock>
  /** Defaults to 100. Allowed values 50-150 in 10% steps. */
  defaultZoom?: number
  showRulers?: boolean
  showGrid?: boolean
  /** Renders a dashed drop zone before the first block. */
  showDropZone?: boolean
  loading?: boolean
  error?: string
  onSelectBlock?: (block: CanvasBlock) => void
  className?: string
}

const ZOOM_MIN = 50
const ZOOM_MAX = 150
const ZOOM_STEP = 10

export function PageCanvas({
  pageTitle,
  pageSlug,
  blocks,
  defaultZoom = 100,
  showRulers = true,
  showGrid = true,
  showDropZone = true,
  loading = false,
  error,
  onSelectBlock,
  className,
}: PageCanvasProps) {
  const [zoom, setZoom] = useState(defaultZoom)

  const classes = [styles.canvas, className].filter(Boolean).join(" ")

  const stackStyle: CSSProperties = {
    transformOrigin: "top left",
    transform: `scale(${zoom / 100})`,
    width: `${10000 / zoom}%`,
  }

  return (
    <section className={classes} aria-label={`Page canvas — ${pageTitle}`}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.kicker}>Page canvas · /{pageSlug}</span>
          <span className={styles.title}>{pageTitle}</span>
        </div>
        <div className={styles.zoomGroup} role="group" aria-label="Canvas zoom">
          <button
            type="button"
            className={styles.zoomBtn}
            aria-label="Zoom out"
            disabled={zoom <= ZOOM_MIN}
            onClick={() => setZoom((current) => Math.max(ZOOM_MIN, current - ZOOM_STEP))}
          >
            <Minus size={12} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <span className={styles.zoomValue} aria-live="polite">
            {zoom}%
          </span>
          <button
            type="button"
            className={styles.zoomBtn}
            aria-label="Zoom in"
            disabled={zoom >= ZOOM_MAX}
            onClick={() => setZoom((current) => Math.min(ZOOM_MAX, current + ZOOM_STEP))}
          >
            <Plus size={12} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.zoomBtn}
            aria-label="Reset zoom"
            onClick={() => setZoom(100)}
          >
            <RotateCcw size={12} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        className={styles.surface}
        data-grid={showGrid ? "on" : "off"}
        role="application"
        aria-label="Drag-and-drop page canvas"
      >
        {showRulers ? (
          <>
            <div className={styles.rulerCorner} aria-hidden="true">
              px
            </div>
            <div className={styles.rulerH} aria-hidden="true" />
            <div className={styles.rulerV} aria-hidden="true" />
          </>
        ) : null}

        <div className={styles.stack} style={stackStyle}>
          {error ? (
            <div className={styles.error} role="alert">
              <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
              <strong>Canvas failed to render</strong>
              <span>{error}</span>
            </div>
          ) : blocks.length === 0 && !loading ? (
            <div className={styles.empty}>Drop a block to begin</div>
          ) : (
            blocks.map((block) => {
              const tone = TONE_HEX[block.tone]
              const blockClass = [
                styles.block,
                block.selected ? styles.blockSelected : "",
                block.loading || loading ? styles.blockLoading : "",
              ]
                .filter(Boolean)
                .join(" ")
              return (
                <button
                  key={block.id}
                  type="button"
                  className={blockClass}
                  style={{ "--block-tone": tone } as CSSProperties}
                  aria-pressed={block.selected}
                  aria-label={`${BLOCK_CATEGORY_LABEL[block.category]} block — ${block.name}`}
                  onClick={() => onSelectBlock?.(block)}
                  disabled={block.loading || loading}
                >
                  <span className={styles.blockGlyph} aria-hidden="true">
                    {block.glyph ?? BLOCK_CATEGORY_GLYPH[block.category]}
                  </span>
                  <span className={styles.blockMeta}>
                    <span className={styles.blockKicker}>
                      {BLOCK_CATEGORY_LABEL[block.category]}
                    </span>
                    <span className={styles.blockName}>{block.name}</span>
                    {block.summary ? (
                      <p className={styles.blockSummary}>{block.summary}</p>
                    ) : null}
                  </span>
                  <span className={styles.blockActions} aria-hidden="true">
                    <span className={styles.actionBtn}>
                      <Settings2 size={12} strokeWidth={2.2} />
                    </span>
                    <span className={styles.actionBtn}>
                      <Copy size={12} strokeWidth={2.2} />
                    </span>
                    <span className={styles.actionBtn}>
                      <Trash2 size={12} strokeWidth={2.2} />
                    </span>
                  </span>
                </button>
              )
            })
          )}

          {showDropZone && !error ? (
            <div className={styles.dropZone}>Drop block here</div>
          ) : null}
        </div>
      </div>

      <footer className={styles.footer}>
        <span>
          {blocks.length.toString().padStart(2, "0")} blocks{" "}
          <span className={styles.footerNum}>· /{pageSlug}</span>
        </span>
        <span>
          Grid {showGrid ? "on" : "off"} · Rulers {showRulers ? "on" : "off"} · Zoom {zoom}%
        </span>
      </footer>
    </section>
  )
}

export default PageCanvas
