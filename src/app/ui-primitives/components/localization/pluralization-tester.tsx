"use client"

import { useId, useMemo, useState } from "react"

import styles from "./pluralization-tester.module.css"

export type PluralCategory = "zero" | "one" | "two" | "few" | "many" | "other"

const ALL_FORMS: ReadonlyArray<PluralCategory> = [
  "zero",
  "one",
  "two",
  "few",
  "many",
  "other",
]

export interface PluralLocaleEntry {
  locale: string
  label: string
  /**
   * Optional template per plural category — `{count}` is interpolated with the active
   * count. Categories the locale doesn't support can be omitted.
   */
  templates?: Partial<Record<PluralCategory, string>>
}

export interface PluralizationTesterProps {
  /** Default starting count. */
  initialCount?: number
  /** Locales to test. */
  locales: ReadonlyArray<PluralLocaleEntry>
}

function safeCategory(value: number, locale: string): PluralCategory {
  try {
    const rules = new Intl.PluralRules(locale, { type: "cardinal" })
    const result = rules.select(value) as PluralCategory
    return result
  } catch {
    return "other"
  }
}

function fillTemplate(template: string | undefined, count: number): string {
  if (!template) return "—"
  return template.replace(/\{count\}/g, String(count))
}

export function PluralizationTester({
  initialCount = 1,
  locales,
}: PluralizationTesterProps) {
  const inputId = useId()
  const [count, setCount] = useState(initialCount)

  const rows = useMemo(() => {
    return locales.map((entry) => {
      const active = safeCategory(count, entry.locale)
      return { entry, active }
    })
  }, [count, locales])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value)
    if (Number.isFinite(next)) {
      setCount(next)
    }
  }

  return (
    <section className={styles.root} aria-label="Pluralization tester">
      <header className={styles.head}>
        <span className={styles.kicker}>Intl.PluralRules · cardinal</span>
        <h3 className={styles.title}>Pluralization tester</h3>
        <p className={styles.body}>
          Pick a count and watch each locale resolve to its CLDR plural category.
        </p>
      </header>

      <div className={styles.controls}>
        <label htmlFor={inputId} className={styles.inputLabel}>
          Count
        </label>
        <input
          id={inputId}
          type="number"
          min={0}
          step={1}
          value={count}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <ol className={styles.list}>
        {rows.map(({ entry, active }) => (
          <li key={entry.locale} className={styles.row}>
            <div className={styles.rowHead}>
              <span className={styles.localeTag}>{entry.locale}</span>
              <span className={styles.localeLabel}>{entry.label}</span>
              <span className={styles.activeChip}>{active}</span>
            </div>
            <ul className={styles.forms}>
              {ALL_FORMS.map((form) => {
                const isActive = form === active
                const supported = entry.templates ? Boolean(entry.templates[form]) : false
                return (
                  <li
                    key={form}
                    className={`${styles.form} ${isActive ? styles.formActive : ""} ${
                      supported ? "" : styles.formUnsupported
                    }`}
                  >
                    <span className={styles.formLabel}>{form}</span>
                    <span className={styles.formValue}>
                      {fillTemplate(entry.templates?.[form], count)}
                    </span>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default PluralizationTester
