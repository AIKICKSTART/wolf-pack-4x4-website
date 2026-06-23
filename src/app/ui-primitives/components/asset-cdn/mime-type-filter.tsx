"use client"

import { useState, type FormEvent } from "react"

import { formatBytes, type MimeRule } from "./asset-cdn-types"

import styles from "./mime-type-filter.module.css"

interface MimeTypeFilterProps {
  defaultRules?: ReadonlyArray<MimeRule>
  onChange?: (rules: ReadonlyArray<MimeRule>) => void
  className?: string
}

const DEFAULT_RULES: ReadonlyArray<MimeRule> = [
  { id: "r1", pattern: "image/*", allow: true, maxBytes: 20_000_000, note: "Brand assets, vehicle frames" },
  { id: "r2", pattern: "video/mp4", allow: true, maxBytes: 500_000_000, note: "Dyno videos, hero loops" },
  { id: "r3", pattern: "video/quicktime", allow: false, note: "Reject — too large for delivery" },
  { id: "r4", pattern: "application/pdf", allow: true, maxBytes: 10_000_000, note: "Service manuals" },
  { id: "r5", pattern: "application/x-shockwave-flash", allow: false },
]

export function MimeTypeFilter({
  defaultRules = DEFAULT_RULES,
  onChange,
  className,
}: MimeTypeFilterProps) {
  const [rules, setRules] = useState<ReadonlyArray<MimeRule>>(defaultRules)
  const [pattern, setPattern] = useState<string>("")

  const emit = (next: ReadonlyArray<MimeRule>) => {
    setRules(next)
    onChange?.(next)
  }

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleaned = pattern.trim()
    if (!cleaned) return
    const id = `r${Date.now()}`
    emit([...rules, { id, pattern: cleaned, allow: true }])
    setPattern("")
  }

  const handleToggle = (id: string) => {
    emit(rules.map((rule) => (rule.id === id ? { ...rule, allow: !rule.allow } : rule)))
  }

  const handleRemove = (id: string) => {
    emit(rules.filter((rule) => rule.id !== id))
  }

  return (
    <section
      className={[styles.panel, className].filter(Boolean).join(" ")}
      aria-label="MIME type allow-list"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>CDN · Upload firewall</span>
        <h3 className={styles.title}>MIME allow-list</h3>
      </header>

      <form className={styles.addForm} onSubmit={handleAdd}>
        <label className={styles.addLabel} htmlFor="cdn-mime-input">
          Add pattern
        </label>
        <input
          id="cdn-mime-input"
          className={styles.addInput}
          type="text"
          value={pattern}
          placeholder="e.g. image/heic"
          onChange={(event) => setPattern(event.target.value)}
        />
        <button type="submit" className={styles.addBtn}>
          Add
        </button>
      </form>

      <ul className={styles.list}>
        {rules.map((rule) => (
          <li
            key={rule.id}
            className={[styles.row, rule.allow ? styles.rowAllow : styles.rowDeny].join(" ")}
          >
            <button
              type="button"
              className={styles.toggle}
              onClick={() => handleToggle(rule.id)}
              aria-pressed={rule.allow}
              aria-label={`${rule.allow ? "Allowing" : "Blocking"} ${rule.pattern}`}
            >
              <span className={styles.toggleDot} aria-hidden="true" />
              <span className={styles.toggleLabel}>{rule.allow ? "Allow" : "Block"}</span>
            </button>

            <code className={styles.pattern}>{rule.pattern}</code>

            <span className={styles.note}>
              {rule.maxBytes !== undefined ? (
                <span className={styles.maxBytes}>{formatBytes(rule.maxBytes)} max</span>
              ) : null}
              {rule.note ? <span className={styles.noteText}>{rule.note}</span> : null}
            </span>

            <button
              type="button"
              className={styles.remove}
              onClick={() => handleRemove(rule.id)}
              aria-label={`Remove rule ${rule.pattern}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default MimeTypeFilter
