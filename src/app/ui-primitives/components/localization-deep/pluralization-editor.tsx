"use client"

import { useId, useMemo, useState } from "react"

import { isRtlTag } from "../localization/localization-types"

import styles from "./pluralization-editor.module.css"
import {
  CLDR_PLURAL_LABEL,
  type CldrPluralCategory,
} from "./localization-deep-types"

export interface PluralizationEditorForm {
  /** CLDR category for this form. */
  category: CldrPluralCategory
  /** Translation template using {count} interpolation. */
  template: string
}

export interface PluralizationEditorProps {
  /** Target locale, e.g. "en-AU" or "zh-CN". */
  locale: string
  /** Translation key being edited. */
  translationKey: string
  /** Supported CLDR plural categories for the locale in display order. */
  supportedCategories: ReadonlyArray<CldrPluralCategory>
  /** Initial form templates. Missing categories render as empty. */
  initialForms: ReadonlyArray<PluralizationEditorForm>
  /** Default sample count for the preview ticker. */
  initialCount?: number
  /** CLDR selector that maps a count to a category for this locale. */
  selectCategory: (count: number) => CldrPluralCategory
  /** Optional save handler. */
  onSave?: (forms: ReadonlyArray<PluralizationEditorForm>) => void
}

function fillTemplate(template: string, count: number): string {
  return template.replace(/\{count\}/g, String(count))
}

export function PluralizationEditor({
  locale,
  translationKey,
  supportedCategories,
  initialForms,
  initialCount = 1,
  selectCategory,
  onSave,
}: PluralizationEditorProps) {
  const groupId = useId()
  const [forms, setForms] = useState<ReadonlyArray<PluralizationEditorForm>>(initialForms)
  const [count, setCount] = useState(initialCount)

  const formMap = useMemo(() => {
    const map = new Map<CldrPluralCategory, string>()
    for (const form of forms) {
      map.set(form.category, form.template)
    }
    return map
  }, [forms])

  const activeCategory = selectCategory(count)
  const previewTemplate = formMap.get(activeCategory) ?? formMap.get("other") ?? ""
  const previewText = fillTemplate(previewTemplate, count)
  const dir = isRtlTag(locale) ? "rtl" : "ltr"

  const updateForm = (category: CldrPluralCategory, template: string) => {
    const exists = forms.some((form) => form.category === category)
    const next: ReadonlyArray<PluralizationEditorForm> = exists
      ? forms.map((form) =>
          form.category === category ? { ...form, template } : form,
        )
      : [...forms, { category, template }]
    setForms(next)
  }

  return (
    <article className={styles.wrap} aria-labelledby={`${groupId}-title`}>
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>CLDR pluralisation</span>
          <h3 id={`${groupId}-title`} className={styles.title}>
            <code className={styles.key}>{translationKey}</code>
          </h3>
        </div>
        <span className={styles.locale}>{locale}</span>
      </header>

      <section className={styles.preview} aria-label="Pluralisation preview">
        <div className={styles.previewHead}>
          <span className={styles.previewKicker}>Preview</span>
          <span className={styles.previewCategory}>
            count = {count} <span className={styles.arrow} aria-hidden="true">→</span> {CLDR_PLURAL_LABEL[activeCategory]}
          </span>
        </div>
        <p className={styles.previewText} dir={dir}>
          {previewText || "— no template defined —"}
        </p>
        <div className={styles.previewControls}>
          <label htmlFor={`${groupId}-count`} className={styles.previewLabel}>
            Sample count
          </label>
          <input
            id={`${groupId}-count`}
            type="number"
            min={0}
            inputMode="numeric"
            className={styles.previewInput}
            value={count}
            onChange={(event) => {
              const next = Number(event.target.value)
              setCount(Number.isFinite(next) ? next : 0)
            }}
          />
          <div className={styles.previewChips}>
            {[0, 1, 2, 5, 11, 25, 100].map((sample) => (
              <button
                key={sample}
                type="button"
                className={styles.previewChip}
                data-active={sample === count}
                onClick={() => setCount(sample)}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.forms} aria-label="Plural forms">
        {supportedCategories.map((category) => {
          const template = formMap.get(category) ?? ""
          const isActive = category === activeCategory
          const inputId = `${groupId}-${category}`
          return (
            <div
              key={category}
              className={styles.form}
              data-active={isActive ? "true" : "false"}
            >
              <label htmlFor={inputId} className={styles.formLabel}>
                <span className={styles.formCategory}>
                  {CLDR_PLURAL_LABEL[category]}
                </span>
                <span className={styles.formHint}>{category}</span>
              </label>
              <textarea
                id={inputId}
                className={styles.formInput}
                value={template}
                onChange={(event) => updateForm(category, event.target.value)}
                dir={dir}
                rows={2}
                placeholder={`Template for ${category}`}
                spellCheck
              />
            </div>
          )
        })}
      </section>

      <footer className={styles.actions}>
        <span className={styles.hint}>
          Use <code>{"{count}"}</code> as the interpolation token.
        </span>
        <button
          type="button"
          className={styles.save}
          onClick={() => onSave?.(forms)}
        >
          Save plural forms
        </button>
      </footer>
    </article>
  )
}

export default PluralizationEditor
