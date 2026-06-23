"use client"

import { useId, useMemo, useState } from "react"

import { isRtlTag } from "../localization/localization-types"
import type { ReviewerState, TranslationStatus } from "../localization/localization-types"
import { REVIEWER_STATE_LABEL, STATUS_LABEL } from "../localization/localization-types"
import { Chip } from "../primitives/chip"

import styles from "./translation-editor.module.css"
import { MT_ENGINE_LABEL, type MachineTranslationEngine } from "./localization-deep-types"

export interface TranslationEditorMtSuggestion {
  /** Engine that produced the suggestion. */
  engine: MachineTranslationEngine
  /** Suggested target string. */
  value: string
  /** Confidence 0–1. */
  confidence: number
}

export interface TranslationEditorProps {
  /** Source key, e.g. "checkout.cta.confirm". */
  translationKey: string
  /** Source locale, e.g. "en-AU". */
  sourceLocale: string
  /** Target locale, e.g. "zh-CN". */
  targetLocale: string
  /** Source string the translator is working from. */
  sourceString: string
  /** Initial target string — controlled outside or seeded here. */
  initialTarget?: string
  /** Translator note / contextual instruction. */
  contextNote?: string
  /** Recommended max characters for the target — UI flags overflow. */
  maxChars?: number
  /** Translation lifecycle status. */
  status: TranslationStatus
  /** Reviewer assignment state. */
  reviewer: ReviewerState
  /** Optional MT suggestions — translator can "Apply" one. */
  suggestions?: ReadonlyArray<TranslationEditorMtSuggestion>
  /** Optional callback when translator clicks "Save". */
  onSave?: (target: string) => void
}

const TONE_FOR_STATUS: Record<TranslationStatus, "neutral" | "amber" | "teal" | "green" | "red"> = {
  translated: "green",
  approved: "green",
  missing: "red",
  stale: "amber",
  fuzzy: "amber",
  "pending-review": "teal",
}

const TONE_FOR_REVIEWER: Record<ReviewerState, "neutral" | "amber" | "teal" | "green" | "red"> = {
  unassigned: "neutral",
  pending: "amber",
  approved: "green",
  rejected: "red",
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}

export function TranslationEditor({
  translationKey,
  sourceLocale,
  targetLocale,
  sourceString,
  initialTarget = "",
  contextNote,
  maxChars = 140,
  status,
  reviewer,
  suggestions,
  onSave,
}: TranslationEditorProps) {
  const editorId = useId()
  const noteId = useId()
  const [target, setTarget] = useState(initialTarget)

  const charCount = target.length
  const overflow = charCount > maxChars
  const sourceCount = sourceString.length
  const lengthRatio = sourceCount > 0 ? charCount / sourceCount : 0

  const sourceDir = isRtlTag(sourceLocale) ? "rtl" : "ltr"
  const targetDir = isRtlTag(targetLocale) ? "rtl" : "ltr"

  const meterTone = useMemo<"green" | "amber" | "red">(() => {
    if (overflow) return "red"
    if (lengthRatio < 0.4 || lengthRatio > 1.4) return "amber"
    return "green"
  }, [overflow, lengthRatio])

  const handleApply = (suggestion: TranslationEditorMtSuggestion) => {
    setTarget(suggestion.value)
  }

  return (
    <article className={styles.wrap} aria-labelledby={`${editorId}-title`}>
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Translation editor</span>
          <h3 id={`${editorId}-title`} className={styles.title}>
            <code className={styles.key}>{translationKey}</code>
          </h3>
        </div>
        <div className={styles.headChips}>
          <Chip
            label={STATUS_LABEL[status]}
            tone={TONE_FOR_STATUS[status]}
          />
          <Chip
            label={`Review: ${REVIEWER_STATE_LABEL[reviewer]}`}
            tone={TONE_FOR_REVIEWER[reviewer]}
          />
        </div>
      </header>

      {contextNote ? (
        <p id={noteId} className={styles.note}>
          <span className={styles.noteKicker}>Context</span>
          <span>{contextNote}</span>
        </p>
      ) : null}

      <div className={styles.panels}>
        <section
          className={styles.panel}
          aria-label={`Source ${sourceLocale}`}
        >
          <header className={styles.panelHead}>
            <span className={styles.panelTag}>{sourceLocale}</span>
            <span className={styles.panelMeta}>{sourceCount} chars</span>
          </header>
          <p className={styles.source} dir={sourceDir}>
            {sourceString}
          </p>
        </section>

        <section
          className={styles.panel}
          aria-label={`Target ${targetLocale}`}
        >
          <header className={styles.panelHead}>
            <span className={styles.panelTag}>{targetLocale}</span>
            <span
              className={styles.panelMeta}
              data-tone={meterTone}
              data-overflow={overflow ? "true" : "false"}
            >
              {charCount} / {maxChars}
            </span>
          </header>
          <label htmlFor={editorId} className={styles.srOnly}>
            Translation target for {translationKey}
          </label>
          <textarea
            id={editorId}
            className={styles.editor}
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            dir={targetDir}
            aria-describedby={contextNote ? noteId : undefined}
            aria-invalid={overflow}
            rows={3}
            spellCheck
          />
        </section>
      </div>

      {suggestions && suggestions.length > 0 ? (
        <section className={styles.suggestions} aria-label="Machine translation suggestions">
          <span className={styles.suggestionsKicker}>MT suggestions</span>
          <ul className={styles.suggestionList}>
            {suggestions.map((suggestion) => (
              <li key={suggestion.engine} className={styles.suggestion}>
                <div className={styles.suggestionMeta}>
                  <span className={styles.suggestionEngine}>
                    {MT_ENGINE_LABEL[suggestion.engine]}
                  </span>
                  <span className={styles.suggestionConfidence}>
                    {formatPercent(suggestion.confidence)}
                  </span>
                </div>
                <p className={styles.suggestionValue} dir={targetDir}>
                  {suggestion.value}
                </p>
                <button
                  type="button"
                  className={styles.suggestionApply}
                  onClick={() => handleApply(suggestion)}
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className={styles.actions}>
        <span className={styles.lengthHint} data-tone={meterTone}>
          Length ratio {formatPercent(lengthRatio)}
        </span>
        <button
          type="button"
          className={styles.save}
          onClick={() => onSave?.(target)}
        >
          Save translation
        </button>
      </footer>
    </article>
  )
}

export default TranslationEditor
