import { isRtlTag } from "../localization/localization-types"

import styles from "./style-guide-card.module.css"
import {
  type Formality,
  type StyleTone,
} from "./localization-deep-types"

export interface StyleGuideExample {
  /** Source string or context for the example. */
  context: string
  /** Recommended phrasing. */
  good: string
  /** Discouraged phrasing. */
  bad: string
}

export interface StyleGuideCardProps {
  /** Locale this style guide governs. */
  locale: string
  /** Optional friendly locale label, e.g. "English (Australia)". */
  label?: string
  /** Tone bucket — casual / neutral / formal / playful. */
  tone: StyleTone
  /** Formality bucket. */
  formality: Formality
  /** Personality summary in 1–2 sentences. */
  voiceSummary: string
  /** Key terms / quirks list. */
  quirks: ReadonlyArray<string>
  /** Concrete do / don't examples. */
  examples: ReadonlyArray<StyleGuideExample>
}

const TONE_LABEL: Record<StyleTone, string> = {
  casual: "Casual",
  neutral: "Neutral",
  formal: "Formal",
  playful: "Playful",
}

const FORMALITY_LABEL: Record<Formality, string> = {
  informal: "Informal",
  neutral: "Neutral",
  formal: "Formal",
}

const TONE_HUE: Record<StyleTone, "amber" | "teal" | "green" | "red"> = {
  casual: "amber",
  neutral: "teal",
  formal: "green",
  playful: "red",
}

export function StyleGuideCard({
  locale,
  label,
  tone,
  formality,
  voiceSummary,
  quirks,
  examples,
}: StyleGuideCardProps) {
  const dir = isRtlTag(locale) ? "rtl" : "ltr"
  const hue = TONE_HUE[tone]

  return (
    <article className={styles.wrap} data-tone={hue} aria-label={`Style guide for ${locale}`}>
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Style guide</span>
          <h3 className={styles.title}>{label ?? locale}</h3>
          <span className={styles.locale}>{locale}</span>
        </div>
        <div className={styles.chips}>
          <span className={styles.chip} data-tone="amber">
            {TONE_LABEL[tone]}
          </span>
          <span className={styles.chip} data-tone="teal">
            {FORMALITY_LABEL[formality]}
          </span>
        </div>
      </header>

      <p className={styles.voice} dir={dir}>
        {voiceSummary}
      </p>

      {quirks.length > 0 ? (
        <section className={styles.section} aria-label="Quirks and key terms">
          <span className={styles.sectionKicker}>Quirks &amp; key terms</span>
          <ul className={styles.quirks}>
            {quirks.map((quirk) => (
              <li key={quirk} className={styles.quirk}>
                {quirk}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className={styles.section} aria-label="Examples">
        <span className={styles.sectionKicker}>Examples</span>
        <ul className={styles.examples}>
          {examples.map((example) => (
            <li key={example.context} className={styles.example}>
              <span className={styles.exampleContext}>{example.context}</span>
              <div className={styles.exampleRow}>
                <div className={styles.examplePair} data-good="true">
                  <span className={styles.exampleTag}>Do</span>
                  <p className={styles.exampleText} dir={dir}>
                    {example.good}
                  </p>
                </div>
                <div className={styles.examplePair} data-good="false">
                  <span className={styles.exampleTag}>Don&apos;t</span>
                  <p className={styles.exampleText} dir={dir}>
                    {example.bad}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default StyleGuideCard
