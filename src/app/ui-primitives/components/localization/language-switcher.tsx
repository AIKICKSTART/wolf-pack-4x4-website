"use client"

import { useId, useMemo, useState } from "react"

import styles from "./language-switcher.module.css"
import { isRtlTag, type LocaleSummary } from "./localization-types"

export interface LanguageSwitcherProps {
  languages: ReadonlyArray<LocaleSummary>
  value: string
  onChange?: (tag: string) => void
  /** Optional label shown above the trigger. */
  label?: string
}

const REGION_FLAG: Record<string, string> = {
  AU: "🇦🇺",
  US: "🇺🇸",
  GB: "🇬🇧",
  DE: "🇩🇪",
  JP: "🇯🇵",
  SA: "🇸🇦",
  FR: "🇫🇷",
  ES: "🇪🇸",
  IT: "🇮🇹",
  CN: "🇨🇳",
  TW: "🇹🇼",
  KR: "🇰🇷",
  IN: "🇮🇳",
  BR: "🇧🇷",
  MX: "🇲🇽",
  NL: "🇳🇱",
  NZ: "🇳🇿",
  IL: "🇮🇱",
  IR: "🇮🇷",
  PK: "🇵🇰",
  EG: "🇪🇬",
  CA: "🇨🇦",
}

function flagFor(region: string): string {
  return REGION_FLAG[region.toUpperCase()] ?? "🌐"
}

export function LanguageSwitcher({
  languages,
  value,
  onChange,
  label = "Interface language",
}: LanguageSwitcherProps) {
  const triggerId = useId()
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const current = useMemo(
    () => languages.find((l) => l.tag === value) ?? languages[0],
    [languages, value],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return languages
    return languages.filter(
      (l) =>
        l.label.toLowerCase().includes(q) ||
        l.tag.toLowerCase().includes(q) ||
        (l.endonym?.toLowerCase().includes(q) ?? false),
    )
  }, [languages, query])

  const handleSelect = (tag: string) => {
    onChange?.(tag)
    setOpen(false)
  }

  return (
    <div className={styles.root}>
      <label htmlFor={triggerId} className={styles.label}>
        {label}
      </label>
      <button
        id={triggerId}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.flag} aria-hidden="true">
          {current ? flagFor(current.region) : "🌐"}
        </span>
        <span className={styles.triggerText}>
          <span className={styles.triggerLabel}>{current?.label ?? "Select language"}</span>
          <span className={styles.triggerTag}>{current?.tag ?? ""}</span>
        </span>
        <span className={styles.chevron} aria-hidden="true" data-open={open}>
          ▾
        </span>
      </button>

      {open ? (
        <div className={styles.popover} role="presentation">
          <input
            type="search"
            inputMode="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search languages"
            className={styles.search}
            aria-label="Search languages"
          />
          <ul
            id={listId}
            role="listbox"
            aria-label="Language options"
            className={styles.list}
          >
            {filtered.map((language) => {
              const selected = language.tag === current?.tag
              const rtl = isRtlTag(language.tag)
              return (
                <li key={language.tag}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={`${styles.option} ${selected ? styles.optionActive : ""}`}
                    onClick={() => handleSelect(language.tag)}
                  >
                    <span className={styles.flag} aria-hidden="true">
                      {flagFor(language.region)}
                    </span>
                    <span className={styles.optionText}>
                      <span className={styles.optionLabel}>{language.label}</span>
                      {language.endonym ? (
                        <span
                          className={styles.optionEndonym}
                          dir={rtl ? "rtl" : "ltr"}
                        >
                          {language.endonym}
                        </span>
                      ) : null}
                    </span>
                    {rtl ? <span className={styles.rtlChip}>RTL</span> : null}
                    <span className={styles.optionTag}>{language.tag}</span>
                  </button>
                </li>
              )
            })}
            {filtered.length === 0 ? (
              <li className={styles.empty}>No languages match</li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default LanguageSwitcher
