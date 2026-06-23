"use client"

import { useState } from "react"

import {
  LAZY_STRATEGY_LABEL,
  type LazyLoadConfig,
  type LazyLoadStrategy,
} from "./asset-cdn-types"

import styles from "./lazy-load-config-card.module.css"

interface LazyLoadConfigCardProps {
  defaultConfig?: LazyLoadConfig
  onChange?: (config: LazyLoadConfig) => void
  className?: string
}

const DEFAULT_CONFIG: LazyLoadConfig = {
  strategy: "lqip",
  blurRadius: 14,
  fadeOpacity: 60,
  rootMarginPx: 220,
  dominantHex: "var(--primitive-red)",
}

const STRATEGY_ORDER: ReadonlyArray<LazyLoadStrategy> = [
  "lqip",
  "blur-up",
  "sketch",
  "dominant-color",
]

const STRATEGY_DESCRIPTION: Record<LazyLoadStrategy, string> = {
  lqip: "Low-quality image placeholder — 24×16 thumbnail upscaled at the edge.",
  "blur-up": "Inline base-64 thumbnail with a CSS blur that fades on hydrate.",
  sketch: "Edge-detected sketch traced from the source, rendered as SVG strokes.",
  "dominant-color": "Solid block of the source's dominant colour while the asset streams.",
}

export function LazyLoadConfigCard({
  defaultConfig = DEFAULT_CONFIG,
  onChange,
  className,
}: LazyLoadConfigCardProps) {
  const [config, setConfig] = useState<LazyLoadConfig>(defaultConfig)

  const emit = (next: LazyLoadConfig) => {
    setConfig(next)
    onChange?.(next)
  }

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label="Lazy-loading configuration"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>CDN · Lazy-load</span>
        <h3 className={styles.title}>Placeholder strategy</h3>
      </header>

      <fieldset className={styles.fieldset}>
        <legend className={styles.fieldLabel}>Strategy</legend>
        <div className={styles.strategyGrid} role="radiogroup" aria-label="Placeholder strategy">
          {STRATEGY_ORDER.map((strategy) => {
            const active = config.strategy === strategy
            return (
              <button
                key={strategy}
                type="button"
                role="radio"
                aria-checked={active}
                className={[styles.strategyBtn, active ? styles.strategyOn : ""].filter(Boolean).join(" ")}
                onClick={() => emit({ ...config, strategy })}
              >
                <span className={styles.strategyLabel}>{LAZY_STRATEGY_LABEL[strategy]}</span>
                <span className={styles.strategyHelp}>{STRATEGY_DESCRIPTION[strategy]}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className={styles.previewRow}>
        <div className={styles.previewCol}>
          <span className={styles.previewLabel}>Placeholder</span>
          <div
            className={styles.preview}
            style={{
              filter: `blur(${config.blurRadius}px)`,
              opacity: 1 - config.fadeOpacity / 200,
              backgroundColor:
                config.strategy === "dominant-color" ? config.dominantHex : undefined,
            }}
            aria-hidden="true"
          >
            <span className={styles.previewGlyph}>{config.strategy === "sketch" ? "✎" : "▢"}</span>
          </div>
        </div>
        <div className={styles.previewCol}>
          <span className={styles.previewLabel}>Resolved</span>
          <div className={styles.previewResolved} aria-hidden="true">
            <span className={styles.previewGlyph}>▣</span>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            Blur radius <em className={styles.value}>{config.blurRadius}px</em>
          </span>
          <input
            type="range"
            min={0}
            max={60}
            value={config.blurRadius}
            className={styles.slider}
            onChange={(event) => emit({ ...config, blurRadius: Number(event.target.value) })}
            aria-label="Blur radius"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            Fade opacity <em className={styles.value}>{config.fadeOpacity}%</em>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={config.fadeOpacity}
            className={styles.slider}
            onChange={(event) => emit({ ...config, fadeOpacity: Number(event.target.value) })}
            aria-label="Fade opacity"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            Root margin <em className={styles.value}>{config.rootMarginPx}px</em>
          </span>
          <input
            type="range"
            min={0}
            max={800}
            step={20}
            value={config.rootMarginPx}
            className={styles.slider}
            onChange={(event) => emit({ ...config, rootMarginPx: Number(event.target.value) })}
            aria-label="Trigger root margin"
          />
        </label>
      </div>
    </section>
  )
}

export default LazyLoadConfigCard
