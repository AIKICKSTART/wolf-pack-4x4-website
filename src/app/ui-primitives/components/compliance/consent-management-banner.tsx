"use client"

import { useCallback, useState } from "react"

import styles from "./consent-management-banner.module.css"

export type ConsentCategoryKey =
  | "essential"
  | "functional"
  | "analytics"
  | "marketing"
  | "sale-of-data"

export interface ConsentCategory {
  key: ConsentCategoryKey
  label: string
  description: string
  /** Locked categories cannot be toggled (Essential). */
  locked?: boolean
  /** Initial granted state. */
  defaultGranted: boolean
}

export interface ConsentState {
  granted: ReadonlyArray<ConsentCategoryKey>
}

export interface ConsentManagementBannerProps {
  title: string
  body: string
  categories: ReadonlyArray<ConsentCategory>
  /** Preference center link. */
  preferenceCenterHref: string
  preferenceCenterLabel?: string
  acceptAllLabel?: string
  rejectAllLabel?: string
  savePreferencesLabel?: string
  onSave?: (state: ConsentState) => void
  onAcceptAll?: () => void
  onRejectAll?: () => void
  className?: string
}

export function ConsentManagementBanner({
  title,
  body,
  categories,
  preferenceCenterHref,
  preferenceCenterLabel = "Open preference center",
  acceptAllLabel = "Accept all",
  rejectAllLabel = "Reject non-essential",
  savePreferencesLabel = "Save preferences",
  onSave,
  onAcceptAll,
  onRejectAll,
  className,
}: ConsentManagementBannerProps) {
  const [granted, setGranted] = useState<ReadonlyArray<ConsentCategoryKey>>(
    () =>
      categories
        .filter((c) => c.defaultGranted || c.locked)
        .map((c) => c.key),
  )

  const toggle = useCallback(
    (key: ConsentCategoryKey) => {
      const target = categories.find((c) => c.key === key)
      if (target?.locked) return
      setGranted((current) => {
        if (current.includes(key)) {
          return current.filter((k) => k !== key)
        }
        return [...current, key]
      })
    },
    [categories],
  )

  const acceptAll = () => {
    const allKeys = categories.map((c) => c.key)
    setGranted(allKeys)
    onAcceptAll?.()
  }

  const rejectAll = () => {
    const lockedOnly = categories.filter((c) => c.locked).map((c) => c.key)
    setGranted(lockedOnly)
    onRejectAll?.()
  }

  const save = () => {
    onSave?.({ granted })
  }

  return (
    <section
      className={[styles.surface, className].filter(Boolean).join(" ")}
      role="region"
      aria-label="Consent management"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Consent management · Privacy Act 1988</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
      </header>

      <ul className={styles.categories}>
        {categories.map((cat) => {
          const isGranted = granted.includes(cat.key) || cat.locked === true
          return (
            <li
              key={cat.key}
              className={styles.category}
              data-locked={cat.locked ? "true" : "false"}
            >
              <div className={styles.categoryName}>
                <span className={styles.categoryLabel}>{cat.label}</span>
                <span className={styles.categoryKey}>{cat.key}</span>
              </div>
              <span className={styles.categoryBody}>{cat.description}</span>
              <button
                type="button"
                role="switch"
                aria-checked={isGranted}
                aria-label={`Toggle ${cat.label} cookies`}
                className={styles.toggle}
                onClick={() => toggle(cat.key)}
                disabled={cat.locked}
              >
                <span className={styles.toggleTrack} aria-hidden="true">
                  <span className={styles.toggleThumb} />
                </span>
                <span>
                  {cat.locked ? "ALWAYS" : isGranted ? "ALLOW" : "BLOCK"}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <footer className={styles.foot}>
        <a href={preferenceCenterHref} className={styles.prefLink}>
          {preferenceCenterLabel} →
        </a>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionSecondary}
            onClick={rejectAll}
          >
            {rejectAllLabel}
          </button>
          <button
            type="button"
            className={styles.actionSecondary}
            onClick={save}
          >
            {savePreferencesLabel}
          </button>
          <button
            type="button"
            className={styles.actionPrimary}
            onClick={acceptAll}
          >
            {acceptAllLabel}
          </button>
        </div>
      </footer>
    </section>
  )
}

export default ConsentManagementBanner
