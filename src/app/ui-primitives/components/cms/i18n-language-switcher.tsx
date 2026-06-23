"use client"

import { AlertTriangle } from "lucide-react"
import { useMemo, useState } from "react"

import { ProgressLinear } from "../primitives"

import type { LocaleCode, LocaleEntry } from "./cms-types"

import styles from "./i18n-language-switcher.module.css"

export interface I18nLanguageSwitcherProps {
  locales: ReadonlyArray<LocaleEntry>
  defaultLocale?: LocaleCode
  loading?: boolean
  error?: string
  onSelect?: (locale: LocaleEntry) => void
  className?: string
}

function toneForCompletion(value: number): "red" | "amber" | "teal" | "green" {
  if (value >= 95) {
    return "green"
  }
  if (value >= 75) {
    return "teal"
  }
  if (value >= 50) {
    return "amber"
  }
  return "red"
}

export function I18nLanguageSwitcher({
  locales,
  defaultLocale,
  loading = false,
  error,
  onSelect,
  className,
}: I18nLanguageSwitcherProps) {
  const [active, setActive] = useState<LocaleCode>(
    defaultLocale ?? locales[0]?.code ?? "en-AU",
  )

  const average = useMemo(() => {
    if (locales.length === 0) {
      return 0
    }
    const sum = locales.reduce((acc, locale) => acc + locale.completion, 0)
    return Math.round(sum / locales.length)
  }, [locales])

  const classes = [styles.switcher, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Locale switcher">
      <header className={styles.header}>
        <div className={styles.title}>
          <span className={styles.kicker}>i18n · {locales.length} locales</span>
          <span className={styles.heading}>Translation coverage</span>
        </div>
        <span className={styles.completionBadge}>Average {average}%</span>
      </header>

      {error ? (
        <div className={styles.error} role="alert">
          <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
          <strong>Translation memory offline</strong>
          <span>{error}</span>
        </div>
      ) : loading ? (
        <div className={styles.empty}>Indexing locales…</div>
      ) : (
        <div className={styles.strip} role="tablist" aria-label="Locales">
          {locales.map((locale) => {
            const isActive = locale.code === active
            const tone = toneForCompletion(locale.completion)
            const pendingClass = [
              styles.pending,
              locale.pending > 0 ? styles.pendingHigh : "",
            ]
              .filter(Boolean)
              .join(" ")
            return (
              <button
                key={locale.code}
                type="button"
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                role="tab"
                aria-selected={isActive}
                aria-label={`Switch to ${locale.label}, ${locale.completion}% complete`}
                onClick={() => {
                  setActive(locale.code)
                  onSelect?.(locale)
                }}
              >
                <div className={styles.tabHead}>
                  <span className={styles.tabCode}>{locale.code}</span>
                  <span>{locale.completion}%</span>
                </div>
                <span className={styles.tabName}>{locale.label}</span>
                <ProgressLinear value={locale.completion} tone={tone} variant="solid" />
                <div className={styles.metaRow}>
                  <span className={pendingClass}>{locale.pending} pending</span>
                  <span>{locale.reviewedAt}</span>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default I18nLanguageSwitcher
