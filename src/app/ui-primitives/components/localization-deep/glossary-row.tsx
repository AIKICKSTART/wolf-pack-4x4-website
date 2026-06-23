import { Chip } from "../primitives/chip"
import { isRtlTag } from "../localization/localization-types"

import styles from "./glossary-row.module.css"
import {
  GLOSSARY_POS_LABEL,
  type GlossaryPartOfSpeech,
} from "./localization-deep-types"

export interface GlossaryRowTranslation {
  /** BCP-47 target tag, e.g. "zh-CN". */
  locale: string
  /** Translation for this term in the target locale. */
  value: string
}

export interface GlossaryRowProps {
  /** Source term. */
  term: string
  /** Source locale, e.g. "en-AU". */
  sourceLocale: string
  /** Part of speech bucket. */
  partOfSpeech: GlossaryPartOfSpeech
  /** Optional definition / usage note. */
  definition?: string
  /** Translations for non-source locales. */
  translations: ReadonlyArray<GlossaryRowTranslation>
  /** True when this term must not be translated (brand, suburb, model). */
  doNotTranslate?: boolean
  /** True when the term is case-sensitive. */
  caseSensitive?: boolean
}

export function GlossaryRow({
  term,
  sourceLocale,
  partOfSpeech,
  definition,
  translations,
  doNotTranslate = false,
  caseSensitive = false,
}: GlossaryRowProps) {
  const sourceDir = isRtlTag(sourceLocale) ? "rtl" : "ltr"

  return (
    <article
      className={styles.row}
      data-locked={doNotTranslate ? "true" : "false"}
      aria-label={`Glossary term ${term}`}
    >
      <div className={styles.identity}>
        <div className={styles.head}>
          <span className={styles.kicker}>{sourceLocale}</span>
          <span className={styles.posChip}>{GLOSSARY_POS_LABEL[partOfSpeech]}</span>
        </div>
        <p className={styles.term} dir={sourceDir}>
          {term}
        </p>
        {definition ? <p className={styles.definition}>{definition}</p> : null}
        <div className={styles.flags}>
          {doNotTranslate ? (
            <Chip label="Do not translate" tone="red" />
          ) : null}
          {caseSensitive ? (
            <Chip label="Case sensitive" tone="amber" />
          ) : null}
        </div>
      </div>

      <ul className={styles.translations}>
        {translations.map((translation) => {
          const rtl = isRtlTag(translation.locale)
          const empty = translation.value.trim().length === 0
          return (
            <li key={translation.locale} className={styles.translation}>
              <span className={styles.translationTag}>{translation.locale}</span>
              {doNotTranslate ? (
                <p className={styles.translationValue} data-locked="true">
                  {term}
                </p>
              ) : (
                <p
                  className={styles.translationValue}
                  dir={rtl ? "rtl" : "ltr"}
                  data-empty={empty}
                >
                  {empty ? "— Awaiting term —" : translation.value}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default GlossaryRow
