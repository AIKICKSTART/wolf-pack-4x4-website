"use client"

import { useId, useMemo, useState } from "react"

import { ProgressLinear } from "../primitives/progress-linear"
import { isRtlTag } from "../localization/localization-types"

import styles from "./mt-preview-card.module.css"
import {
  MT_ENGINE_LABEL,
  type MachineTranslationEngine,
} from "./localization-deep-types"

export interface MtPreviewVariant {
  /** Engine that produced this variant. */
  engine: MachineTranslationEngine
  /** Suggested target string. */
  value: string
  /** Confidence 0–1. */
  confidence: number
  /** Optional latency in ms for display. */
  latencyMs?: number
}

export interface MtPreviewCardProps {
  /** Source string the engines were translating. */
  sourceString: string
  /** Source locale tag, e.g. "en-AU". */
  sourceLocale: string
  /** Target locale tag, e.g. "zh-CN". */
  targetLocale: string
  /** Per-engine variants. */
  variants: ReadonlyArray<MtPreviewVariant>
  /** Optional initially-selected engine. Defaults to highest confidence. */
  initialEngine?: MachineTranslationEngine
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}

function toneFor(confidence: number): "green" | "amber" | "red" {
  if (confidence >= 0.85) return "green"
  if (confidence >= 0.6) return "amber"
  return "red"
}

export function MtPreviewCard({
  sourceString,
  sourceLocale,
  targetLocale,
  variants,
  initialEngine,
}: MtPreviewCardProps) {
  const groupId = useId()
  const sorted = useMemo(
    () => [...variants].sort((a, b) => b.confidence - a.confidence),
    [variants],
  )
  const defaultEngine = initialEngine ?? sorted[0]?.engine ?? "deepl"
  const [engine, setEngine] = useState<MachineTranslationEngine>(defaultEngine)

  const active = sorted.find((variant) => variant.engine === engine) ?? sorted[0]

  if (!active) {
    return null
  }

  const sourceDir = isRtlTag(sourceLocale) ? "rtl" : "ltr"
  const targetDir = isRtlTag(targetLocale) ? "rtl" : "ltr"
  const tone = toneFor(active.confidence)

  return (
    <article className={styles.wrap} aria-labelledby={`${groupId}-title`}>
      <header className={styles.head}>
        <span className={styles.kicker}>MT preview</span>
        <h3 id={`${groupId}-title`} className={styles.title}>
          {sourceLocale} <span className={styles.arrow} aria-hidden="true">→</span> {targetLocale}
        </h3>
      </header>

      <section className={styles.sourceBlock} aria-label="Source string">
        <span className={styles.sourceTag}>{sourceLocale}</span>
        <p className={styles.source} dir={sourceDir}>
          {sourceString}
        </p>
      </section>

      <div className={styles.engineBar} role="radiogroup" aria-label="Choose MT engine">
        {sorted.map((variant) => {
          const selected = variant.engine === engine
          return (
            <button
              key={variant.engine}
              type="button"
              role="radio"
              aria-checked={selected}
              className={styles.engineChip}
              data-selected={selected}
              onClick={() => setEngine(variant.engine)}
            >
              <span className={styles.engineName}>
                {MT_ENGINE_LABEL[variant.engine]}
              </span>
              <span className={styles.engineConfidence} data-tone={toneFor(variant.confidence)}>
                {formatPercent(variant.confidence)}
              </span>
            </button>
          )
        })}
      </div>

      <section className={styles.targetBlock} aria-label="Target preview">
        <header className={styles.targetHead}>
          <span className={styles.targetTag}>{targetLocale}</span>
          {active.latencyMs !== undefined ? (
            <span className={styles.latency}>{active.latencyMs} ms</span>
          ) : null}
        </header>
        <p className={styles.target} dir={targetDir}>
          {active.value}
        </p>
        <ProgressLinear
          value={Math.round(active.confidence * 100)}
          max={100}
          tone={tone}
          variant="solid"
          label={`${MT_ENGINE_LABEL[active.engine]} confidence`}
          showLabel
        />
      </section>
    </article>
  )
}

export default MtPreviewCard
