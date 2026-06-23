"use client"

import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"
import { GlassSurface } from "../surfaces/glass-surface"

import type { BlendMode, PhotoLayer } from "./photo-editor-types"
import { clamp01, formatPct } from "./photo-editor-types"
import styles from "./layers-panel.module.css"

interface LayersPanelProps {
  /** Layers in render order, top-most first. */
  layers: ReadonlyArray<PhotoLayer>
  /** Id of the currently selected layer. */
  selectedLayerId?: string
  /** Active blend mode for the selected layer (shown in the blend bar). */
  selectedBlend?: BlendMode
  /** Selected layer opacity (0 – 1) shown in the blend bar. */
  selectedOpacity?: number
  /** Optional select callback. */
  onLayerSelect?: (id: string) => void
}

const KIND_TINT: Record<PhotoLayer["kind"], string> = {
  image: "rgba(64, 188, 255, 0.32)",
  adjustment: "rgba(255, 193, 79, 0.32)",
  text: "rgba(55, 214, 122, 0.28)",
  shape: "rgba(230, 32, 40, 0.24)",
  mask: "rgba(255, 255, 255, 0.18)",
  group: "rgba(180, 140, 255, 0.32)",
}

const KIND_LABEL: Record<PhotoLayer["kind"], string> = {
  image: "Image",
  adjustment: "Adjust",
  text: "Text",
  shape: "Shape",
  mask: "Mask",
  group: "Group",
}

const DEPTH_CLASS: Record<0 | 1 | 2, string> = {
  0: "",
  1: "depth1",
  2: "depth2",
}

function ThumbClass(kind: PhotoLayer["kind"]): string {
  if (kind === "adjustment") return styles.thumbAdjustment
  if (kind === "text") return styles.thumbText
  return ""
}

export function LayersPanel({
  layers,
  selectedLayerId,
  selectedBlend = "normal",
  selectedOpacity = 1,
  onLayerSelect,
}: LayersPanelProps) {
  const safeOpacity = clamp01(selectedOpacity)

  return (
    <aside className={styles.panel} aria-label="Layers panel">
      <header className={styles.head}>
        <span className={styles.title}>Layers</span>
        <span className={styles.kicker}>{layers.length} layers</span>
      </header>

      <GlassSurface
        tone="obsidian"
        intensity="low"
        className={styles.blendBarSurface}
      >
        <div className={styles.blendBar} role="group" aria-label="Selected layer blend and opacity">
          <Chip label={selectedBlend.replace("-", " ")} tone="teal" selected />
          <span
            className={styles.opacityTrack}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(safeOpacity * 100)}
            aria-label={`Opacity ${formatPct(safeOpacity)}`}
          >
            <span
              className={styles.opacityFill}
              style={{ width: `${safeOpacity * 100}%` } as CSSProperties}
            />
          </span>
        </div>
      </GlassSurface>

      <ul className={styles.list} role="listbox" aria-label="Layer list">
        {layers.map((layer) => {
          const isSelected = layer.id === selectedLayerId
          const depthKey = (Math.min(layer.depth ?? 0, 2)) as 0 | 1 | 2
          const depthClassName = DEPTH_CLASS[depthKey]
          const rowClasses = [
            styles.row,
            isSelected ? styles.rowSelected : "",
            depthClassName ? styles[depthClassName] : "",
          ]
            .filter(Boolean)
            .join(" ")
          const thumbClasses = [styles.thumb, ThumbClass(layer.kind)]
            .filter(Boolean)
            .join(" ")
          const tintVar: CSSProperties = {
            "--layer-tint": KIND_TINT[layer.kind],
            "--miniopacity": `${clamp01(layer.opacity) * 100}%`,
          } as CSSProperties

          return (
            <li
              key={layer.id}
              className={rowClasses}
              role="option"
              aria-selected={isSelected}
              tabIndex={0}
              onClick={() => onLayerSelect?.(layer.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onLayerSelect?.(layer.id)
                }
              }}
              style={tintVar}
            >
              <span
                className={[styles.eye, layer.visible ? "" : styles.eyeOff].join(" ")}
                aria-label={layer.visible ? "Visible" : "Hidden"}
                role="img"
              >
                {layer.visible ? "◉" : "○"}
              </span>
              <span
                className={thumbClasses}
                aria-hidden="true"
              >
                {layer.kind === "text" ? "T" : null}
              </span>
              <div className={styles.body}>
                <span className={styles.name}>{layer.name}</span>
                <span className={styles.meta}>
                  <span>{KIND_LABEL[layer.kind]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{layer.blend.replace("-", " ")}</span>
                </span>
                <span className={styles.miniOpacity} aria-hidden="true">
                  <span className={styles.miniLabel}>OP</span>
                  <span className={styles.miniTrack}>
                    <span className={styles.miniFill} />
                  </span>
                  <span className={styles.miniLabel}>{formatPct(layer.opacity)}</span>
                </span>
              </div>
              <div className={styles.actions}>
                <span
                  className={[styles.toggle, layer.locked ? styles.toggleOn : ""].join(" ")}
                  role="img"
                  aria-label={layer.locked ? "Locked" : "Unlocked"}
                >
                  {layer.locked ? "L" : "U"}
                </span>
                <span
                  className={styles.toggle}
                  role="img"
                  aria-label={layer.maskLabel ? `Mask: ${layer.maskLabel}` : "No mask"}
                >
                  {layer.maskLabel ? "M" : "—"}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      <footer className={styles.foot} aria-label="Layer actions">
        <button type="button" className={styles.footBtn}>FX</button>
        <button type="button" className={styles.footBtn}>Mask</button>
        <button type="button" className={styles.footBtn}>Group</button>
        <button type="button" className={styles.footBtn}>+ Layer</button>
        <button type="button" className={styles.footBtn}>Delete</button>
      </footer>
    </aside>
  )
}
