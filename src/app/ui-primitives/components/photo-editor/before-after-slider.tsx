import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"

import { clamp01, formatPct } from "./photo-editor-types"
import type { BeforeAfterSource } from "./photo-editor-types"
import styles from "./before-after-slider.module.css"

interface BeforeAfterSliderProps {
  /** Before / after labels + split position. */
  source: BeforeAfterSource
}

export function BeforeAfterSlider({ source }: BeforeAfterSliderProps) {
  const splitT = clamp01(source.splitT)
  const stageVars: CSSProperties = {
    "--split-pct": `${splitT * 100}%`,
  } as CSSProperties

  return (
    <section className={styles.wrap} aria-label="Before / after comparison slider">
      <header className={styles.head}>
        <span className={styles.title}>Before / After</span>
        <Chip label={`${formatPct(splitT)} after`} tone="teal" selected />
      </header>

      <div
        className={styles.stage}
        style={stageVars}
        role="img"
        aria-label={`Before: ${source.beforeLabel}. After: ${source.afterLabel}. Split at ${formatPct(splitT)}.`}
      >
        <div className={styles.before}>{source.beforeLabel}</div>
        <div className={styles.after}>{source.afterLabel}</div>
        <span className={styles.beforeLabel}>Before · {source.beforeLabel}</span>
        <span className={styles.afterLabel}>After · {source.afterLabel}</span>
        <span
          className={styles.divider}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(splitT * 100)}
          aria-label={`Split position ${formatPct(splitT)}`}
        >
          <span className={styles.handle} aria-hidden="true" />
        </span>
      </div>

      <div className={styles.range} style={stageVars}>
        <span className={styles.rangeLabel}>Split</span>
        <span className={styles.rangeBar} aria-hidden="true">
          <span className={styles.rangeFill} />
        </span>
        <span className={styles.rangeValue}>{formatPct(splitT)}</span>
      </div>
    </section>
  )
}
