import type { CSSProperties } from "react"

import { LicenseChip } from "../asset-library/license-chip"

import type { SwatchEntry } from "./photo-editor-types"
import styles from "./color-swatch-library.module.css"

interface ExtractedSwatch {
  hex: string
  /** Relative weight 0 – 1 — drives the bar segment width. */
  weight: number
}

interface ColorSwatchLibraryProps {
  /** Library swatches saved by the user. */
  library: ReadonlyArray<SwatchEntry>
  /** Optional extracted palette from the current document. */
  extracted?: ReadonlyArray<ExtractedSwatch>
  /** Currently selected swatch id from the library. */
  activeId?: string
  /** Source label shown next to the extracted palette (e.g. "Manta exhaust"). */
  sourceLabel?: string
}

export function ColorSwatchLibrary({
  library,
  extracted = [],
  activeId,
  sourceLabel = "Active document",
}: ColorSwatchLibraryProps) {
  const totalWeight = extracted.reduce((sum, swatch) => sum + Math.max(0, swatch.weight), 0) || 1

  return (
    <section className={styles.wrap} aria-label="Colour swatch library">
      <header className={styles.head}>
        <span className={styles.title}>Swatches</span>
        <span className={styles.kicker}>
          <LicenseChip license="proprietary" />
          <span>{library.length} saved · {extracted.length} extracted</span>
        </span>
      </header>

      {extracted.length > 0 ? (
        <div
          className={styles.extracted}
          aria-label={`Extracted palette · ${sourceLabel}`}
        >
          <div className={styles.extractLabel}>
            <span>Extracted from</span>
            <span style={{ color: "var(--primitive-text-strong)" }}>{sourceLabel}</span>
          </div>
          <div className={styles.extractBar} role="img" aria-label={`${extracted.length} colour palette extracted from ${sourceLabel}`}>
            {extracted.map((swatch) => {
              const flex = Math.max(0.05, swatch.weight / totalWeight)
              const vars: CSSProperties = {
                "--cell-flex": `${flex}`,
                "--cell-color": swatch.hex,
                "--cell-hex": `"${swatch.hex.toUpperCase()}"`,
              } as CSSProperties
              return (
                <span
                  key={swatch.hex}
                  className={styles.extractCell}
                  style={vars}
                  aria-label={swatch.hex.toUpperCase()}
                />
              )
            })}
          </div>
        </div>
      ) : null}

      <div
        className={styles.grid}
        role="listbox"
        aria-label="Saved colour swatches"
      >
        {library.map((swatch) => {
          const isActive = swatch.id === activeId
          return (
            <button
              key={swatch.id}
              type="button"
              role="option"
              aria-selected={isActive}
              className={[styles.cell, isActive ? styles.cellActive : ""].join(" ")}
              aria-label={`${swatch.name} · ${swatch.hex.toUpperCase()}`}
              title={`${swatch.name} ${swatch.hex.toUpperCase()}`}
            >
              <span
                className={styles.swatch}
                style={{ "--swatch-color": swatch.hex } as CSSProperties}
                aria-hidden="true"
              />
              <span className={styles.cellName}>{swatch.name}</span>
              <span className={styles.cellHex}>{swatch.hex.toUpperCase()}</span>
            </button>
          )
        })}
      </div>

      <footer className={styles.foot}>
        <button type="button" className={styles.footBtn}>+ Add</button>
        <button type="button" className={styles.footBtn}>Extract</button>
        <button type="button" className={styles.footBtn}>Export ASE</button>
      </footer>
    </section>
  )
}
