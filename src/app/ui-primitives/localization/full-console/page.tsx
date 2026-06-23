import type { Metadata } from "next"

import {
  GlossaryCard,
  LanguageSwitcher,
  TimeZoneDisplay,
  TranslationKeyRow,
  TranslationMemoryCard,
  TranslationProgressMeter,
} from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import {
  GLOSSARY_TRANSLATIONS,
  KEY_TARGETS,
  LANGUAGES,
  MEMORY_HITS,
  PROGRESS_ENTRIES,
  TIME_ZONES,
} from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Full translation console | Localization",
  description:
    "Composition — a translation manager workspace composing the language switcher, translation progress meter, a translation key row, a glossary card, a translation memory card, and a multi-zone time strip.",
}

export default function FullConsoleScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full translation console"
        title="Full translation console"
        description="A composed translation manager workspace for the Mufflermen workshop. The left column holds the language switcher and the multi-zone clock; the right column holds the progress meter, the active translation key under edit, a translation memory card with reuse-ready suggestions, and the glossary card holding brand vocabulary."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Full console" },
        ]}
      />

      <section className={styles.consoleStage} aria-label="Translation console">
        <header className={styles.consoleHead}>
          <span className={styles.consoleSectionLabel}>Workshop translation console</span>
          <span className={styles.consoleSectionLabel}>9 locales · 1,840 keys</span>
        </header>

        <div className={styles.consoleColumns}>
          <aside className={styles.consoleColumn}>
            <span className={styles.consoleSectionLabel}>Operator</span>
            <LanguageSwitcher languages={LANGUAGES} value="en-AU" label="Operator language" />
            <TimeZoneDisplay zones={TIME_ZONES} />
          </aside>

          <div className={styles.consoleColumn}>
            <span className={styles.consoleSectionLabel}>Catalogue · coverage</span>
            <TranslationProgressMeter
              entries={PROGRESS_ENTRIES}
              title="Workshop catalogue coverage"
            />

            <span className={styles.consoleSectionLabel}>Active key</span>
            <TranslationKeyRow
              translationKey="workshop.booking.cta.primary"
              sourceString="Book a muffler service"
              sourceLocale="en-AU"
              targets={KEY_TARGETS}
            />

            <span className={styles.consoleSectionLabel}>Translation memory</span>
            <TranslationMemoryCard
              sourceString="Book a muffler service"
              sourceLocale="en-AU"
              hits={MEMORY_HITS}
            />

            <span className={styles.consoleSectionLabel}>Glossary</span>
            <GlossaryCard
              term="Muffler"
              sourceLocale="en-AU"
              partOfSpeech="noun"
              translations={GLOSSARY_TRANSLATIONS}
              usageNote="In en-GB use 'Silencer'. The brand 'Mufflermen' is never translated; transliterate only when the script requires."
              initialLocked={true}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
