import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TranslationEditor } from "../../components/localization-deep"

import {
  TRANSLATION_EDITOR_APPROVED,
  TRANSLATION_EDITOR_FRESH,
  TRANSLATION_EDITOR_PRIMARY,
} from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "Translation editor | Localization deep",
  description:
    "Primitive 01 — translation editor with source / target panels, MT suggestions, character count and contextual translator note.",
}

export default function TranslationEditorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Editor"
        title="Translation editor"
        description="Two-up source / target editor for the Mufflermen translator cockpit. Surfaces context, glossary-safe terms, MT suggestions, and a length-ratio meter that flags overflow risk."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Translation editor" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>
          en-AU → zh-CN · pending review with MT suggestions
        </span>
        <TranslationEditor {...TRANSLATION_EDITOR_PRIMARY} />

        <span className={styles.stageCaption}>
          en-AU → en-NZ · missing translation, no MT yet
        </span>
        <TranslationEditor {...TRANSLATION_EDITOR_FRESH} />

        <span className={styles.stageCaption}>en-AU → en-GB · approved</span>
        <TranslationEditor {...TRANSLATION_EDITOR_APPROVED} />
      </section>
    </main>
  )
}
