"use client"

import { useId, useState } from "react"

import styles from "./palette-extractor.module.css"

export interface PaletteSample {
  id: string
  name: string
  hex: string
  role: string
}

export interface PaletteSource {
  id: string
  label: string
  description: string
  gradient: string
  samples: ReadonlyArray<PaletteSample>
}

export interface PaletteExtractorProps {
  sources: ReadonlyArray<PaletteSource>
}

export function PaletteExtractor({ sources }: PaletteExtractorProps) {
  const [activeId, setActiveId] = useState<string>(sources[0]?.id ?? "")
  const titleId = useId()
  const active = sources.find((entry) => entry.id === activeId) ?? sources[0]

  if (!active) {
    return null
  }

  return (
    <section className={styles.wrapper} aria-labelledby={titleId}>
      <header className={styles.head}>
        <span className={styles.kicker}>Palette extractor</span>
        <h2 id={titleId} className={styles.title}>
          Five colours pulled from the source frame
        </h2>
        <p className={styles.lede}>
          Choose a source frame below — the swatches update with the five most representative colours and the
          semantic role each one carries on the brand surface.
        </p>
      </header>

      <div className={styles.body}>
        <div className={styles.frame} role="img" aria-label={`${active.label} source frame`}>
          <div className={styles.frameInner} style={{ background: active.gradient }}>
            <span className={styles.frameLabel}>{active.label}</span>
            <p className={styles.frameNote}>{active.description}</p>
          </div>
        </div>
        <ul className={styles.swatchList}>
          {active.samples.map((sample) => (
            <li key={sample.id} className={styles.swatch}>
              <span className={styles.swatchChip} style={{ background: sample.hex }} aria-hidden="true" />
              <div className={styles.swatchMeta}>
                <strong>{sample.name}</strong>
                <code>{sample.hex.toUpperCase()}</code>
              </div>
              <span className={styles.swatchRole}>{sample.role}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.sourceRow} role="radiogroup" aria-label="Source frames">
        {sources.map((source) => (
          <button
            key={source.id}
            type="button"
            role="radio"
            aria-checked={source.id === activeId}
            className={`${styles.sourceTile} ${source.id === activeId ? styles.sourceTileActive : ""}`}
            onClick={() => setActiveId(source.id)}
          >
            <span className={styles.sourceTileGradient} style={{ background: source.gradient }} aria-hidden="true" />
            <span className={styles.sourceTileLabel}>{source.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
