"use client"

import { useId, useState } from "react"

import styles from "./glossary-card.module.css"
import { isRtlTag } from "./localization-types"

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "phrase"
  | "abbreviation"

export interface GlossaryTranslation {
  locale: string
  value: string
}

export interface GlossaryCardProps {
  /** Source term in the canonical locale. */
  term: string
  /** Canonical source locale, e.g. "en-AU". */
  sourceLocale: string
  partOfSpeech: PartOfSpeech
  /** Translations for the term. */
  translations: ReadonlyArray<GlossaryTranslation>
  /** Usage notes shown under the chips. */
  usageNote: string
  /** Whether the term is locked (no edits permitted) on first render. */
  initialLocked?: boolean
  onLockChange?: (locked: boolean) => void
}

const POS_LABEL: Record<PartOfSpeech, string> = {
  noun: "Noun",
  verb: "Verb",
  adjective: "Adjective",
  adverb: "Adverb",
  phrase: "Phrase",
  abbreviation: "Abbreviation",
}

export function GlossaryCard({
  term,
  sourceLocale,
  partOfSpeech,
  translations,
  usageNote,
  initialLocked = false,
  onLockChange,
}: GlossaryCardProps) {
  const headingId = useId()
  const [locked, setLocked] = useState(initialLocked)

  const toggleLock = () => {
    setLocked((prev) => {
      const next = !prev
      onLockChange?.(next)
      return next
    })
  }

  return (
    <article
      className={styles.card}
      aria-labelledby={headingId}
      data-locked={locked}
    >
      <header className={styles.head}>
        <div className={styles.titleBlock}>
          <span className={styles.kicker}>Term · {sourceLocale}</span>
          <h3 id={headingId} className={styles.term}>
            {term}
          </h3>
          <span className={styles.pos}>{POS_LABEL[partOfSpeech]}</span>
        </div>
        <button
          type="button"
          className={styles.lockButton}
          aria-pressed={locked}
          onClick={toggleLock}
        >
          <span aria-hidden="true">{locked ? "🔒" : "🔓"}</span>
          <span>{locked ? "Locked" : "Unlocked"}</span>
        </button>
      </header>

      <dl className={styles.translations}>
        {translations.map((translation) => {
          const rtl = isRtlTag(translation.locale)
          return (
            <div key={translation.locale} className={styles.translation}>
              <dt className={styles.translationLocale}>{translation.locale}</dt>
              <dd className={styles.translationValue} dir={rtl ? "rtl" : "ltr"}>
                {translation.value}
              </dd>
            </div>
          )
        })}
      </dl>

      <footer className={styles.note}>
        <span className={styles.noteLabel}>Usage</span>
        <p className={styles.noteBody}>{usageNote}</p>
      </footer>
    </article>
  )
}

export default GlossaryCard
