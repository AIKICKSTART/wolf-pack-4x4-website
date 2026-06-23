import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"

import type { TextOverlayState } from "./photo-editor-types"
import styles from "./text-tool-overlay.module.css"

interface TextToolOverlayProps {
  /** Current text overlay configuration. */
  state: TextOverlayState
  /** Available weight presets — defaults to canonical 400/600/700/800/900. */
  weights?: ReadonlyArray<number>
  /** Optional preview surface label — e.g. "Hilux dyno run". */
  surfaceLabel?: string
}

const DEFAULT_WEIGHTS: ReadonlyArray<number> = [400, 600, 700, 800, 900]

export function TextToolOverlay({
  state,
  weights = DEFAULT_WEIGHTS,
  surfaceLabel,
}: TextToolOverlayProps) {
  const previewVars: CSSProperties = {
    "--text-font": state.fontFamily,
    "--text-size": `${state.sizePx}px`,
    "--text-weight": state.weight,
    "--text-color": state.hex,
    "--text-spacing": `${state.letterSpacing}em`,
  } as CSSProperties

  return (
    <section className={styles.wrap} aria-label="Text tool overlay">
      <header className={styles.head}>
        <span className={styles.title}>Text tool</span>
        <Chip
          label={`${state.sizePx}px · ${state.weight}`}
          tone="green"
          selected
        />
      </header>

      <div
        className={styles.canvas}
        role="img"
        aria-label={surfaceLabel
          ? `Text overlay on ${surfaceLabel} · ${state.text}`
          : `Text overlay · ${state.text}`}
      >
        <div className={styles.preview} style={previewVars}>
          {state.text}
          <span className={styles.caret} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.row}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Font</span>
            <span className={styles.fieldValue}>{state.fontFamily}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Size</span>
            <span className={styles.fieldValue}>{state.sizePx} px</span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Weight</span>
            <div className={styles.weights} role="radiogroup" aria-label="Font weight">
              {weights.map((weight) => {
                const isActive = weight === state.weight
                return (
                  <button
                    key={weight}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    className={[styles.weightBtn, isActive ? styles.weightActive : ""].join(" ")}
                  >
                    {weight}
                  </button>
                )
              })}
            </div>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Fill</span>
            <div className={styles.colourField}>
              <span
                className={styles.colourChip}
                style={{ "--colour-hex": state.hex } as CSSProperties}
                role="img"
                aria-label={`Fill colour ${state.hex.toUpperCase()}`}
              />
              <span className={styles.fieldValue}>{state.hex.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
