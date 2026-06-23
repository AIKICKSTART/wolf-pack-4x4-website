import type { Metadata } from "next"

import { GlossaryCard } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { GLOSSARY_TRANSLATIONS } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Glossary card | Localization",
  description:
    "Primitive 08 — glossary term card with the source term, translations per locale, part of speech, usage notes, and a lock toggle that signals the term is approved and not editable.",
}

export default function GlossaryCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Vocabulary"
        title="Glossary card"
        description="Term-level reference for translators. Locked terms are visible but read-only, so brand vocabulary like Mufflermen and workshop-critical part names stay consistent across markets and reviewers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Glossary card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — &ldquo;Muffler&rdquo; locked term</span>
        <GlossaryCard
          term="Muffler"
          sourceLocale="en-AU"
          partOfSpeech="noun"
          translations={GLOSSARY_TRANSLATIONS}
          usageNote="In en-GB, prefer 'Silencer'. Do not translate the brand 'Mufflermen' — keep it transliterated only when the script genuinely cannot represent Latin letters."
          initialLocked={true}
        />
      </section>
    </main>
  )
}
