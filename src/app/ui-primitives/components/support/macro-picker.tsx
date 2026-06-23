"use client"

import { useId, useMemo, useState } from "react"

import styles from "./macro-picker.module.css"

export interface MacroVariable {
  /** Token surface, e.g. "{{customer.firstName}}". */
  token: string
  /** Human label, e.g. "Customer first name". */
  label: string
}

export interface MacroEntry {
  id: string
  /** Short macro title, e.g. "Booking confirmation". */
  title: string
  /** Optional shortcut, e.g. "/book-ok". */
  shortcut?: string
  /** Body preview with {{variable}} placeholders. */
  body: string
  /** Variable placeholders used in the body. */
  variables?: ReadonlyArray<MacroVariable>
  /** Optional topic, e.g. "Bookings", "Quotes". */
  category?: string
}

export interface MacroPickerProps {
  macros: ReadonlyArray<MacroEntry>
  /** Triggered when the user clicks "Insert" on a macro. */
  onInsert?: (macro: MacroEntry) => void
  className?: string
}

function highlightMatch(text: string, query: string): string {
  return query.length > 0 ? text : text
}

export function MacroPicker({ macros, onInsert, className }: MacroPickerProps) {
  const [query, setQuery] = useState<string>("")
  const [previewId, setPreviewId] = useState<string>(
    macros.length > 0 ? macros[0].id : "",
  )
  const [insertedId, setInsertedId] = useState<string | null>(null)
  const queryId = useId()

  const filtered = useMemo<ReadonlyArray<MacroEntry>>(() => {
    const q = query.trim().toLowerCase()
    if (q.length === 0) return macros
    return macros.filter((m) => {
      const haystack = `${m.title} ${m.shortcut ?? ""} ${m.category ?? ""} ${m.body}`
      return haystack.toLowerCase().includes(q)
    })
  }, [macros, query])

  const preview = filtered.find((m) => m.id === previewId) ?? filtered[0] ?? null

  const handleInsert = (macro: MacroEntry) => {
    setInsertedId(macro.id)
    onInsert?.(macro)
  }

  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Macro picker">
      <header className={styles.head}>
        <label htmlFor={queryId} className={styles.label}>
          Macros
        </label>
        <input
          id={queryId}
          className={styles.search}
          type="search"
          placeholder="Search macros…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className={styles.count}>{filtered.length}</span>
      </header>

      <div className={styles.body}>
        <ul className={styles.list} aria-label="Macro list">
          {filtered.map((macro) => {
            const active = macro.id === preview?.id
            return (
              <li key={macro.id}>
                <button
                  type="button"
                  className={[styles.macroBtn, active ? styles.active : ""].join(" ")}
                  onMouseEnter={() => setPreviewId(macro.id)}
                  onFocus={() => setPreviewId(macro.id)}
                  onClick={() => setPreviewId(macro.id)}
                >
                  <span className={styles.macroTitle}>
                    {highlightMatch(macro.title, query)}
                  </span>
                  {macro.shortcut ? (
                    <span className={styles.macroShortcut}>{macro.shortcut}</span>
                  ) : null}
                  {macro.category ? (
                    <span className={styles.macroCategory}>{macro.category}</span>
                  ) : null}
                </button>
              </li>
            )
          })}
          {filtered.length === 0 ? (
            <li className={styles.empty}>No macros match {`"${query}"`}.</li>
          ) : null}
        </ul>

        <aside className={styles.preview}>
          {preview ? (
            <>
              <header className={styles.previewHead}>
                <h4 className={styles.previewTitle}>{preview.title}</h4>
                {preview.shortcut ? (
                  <span className={styles.previewShortcut}>{preview.shortcut}</span>
                ) : null}
              </header>
              <pre className={styles.previewBody}>{preview.body}</pre>
              {preview.variables && preview.variables.length > 0 ? (
                <div
                  className={styles.variables}
                  aria-label="Variable placeholders"
                >
                  {preview.variables.map((variable) => (
                    <span key={variable.token} className={styles.variableChip}>
                      <code className={styles.variableToken}>{variable.token}</code>
                      <span className={styles.variableLabel}>{variable.label}</span>
                    </span>
                  ))}
                </div>
              ) : null}
              <button
                type="button"
                className={styles.insertBtn}
                onClick={() => handleInsert(preview)}
                aria-pressed={insertedId === preview.id}
              >
                {insertedId === preview.id ? "Inserted ✓" : "Use macro"}
              </button>
            </>
          ) : (
            <p className={styles.empty}>Pick a macro to preview it here.</p>
          )}
        </aside>
      </div>
    </section>
  )
}

export default MacroPicker
