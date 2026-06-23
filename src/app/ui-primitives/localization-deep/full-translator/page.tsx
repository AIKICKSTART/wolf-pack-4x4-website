import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import {
  COMPLETENESS_LOCALES,
  COMPLETENESS_NAMESPACES,
  FALLBACK_PRIMARY,
  GLOSSARY_ROWS,
  IMPORT_EXPORT_CARDS,
  INTERPOLATION_PRIMARY,
  LOCALE_ENTRIES,
  MT_PREVIEW_PRIMARY,
  PLURAL_EN_FORMS,
  QA_ISSUE_ROWS,
  RTL_TILE_PRIMARY,
  STRING_KEY_ROWS,
  STYLE_GUIDE_AU,
  STYLE_GUIDE_ZH,
  TRANSLATION_EDITOR_PRIMARY,
  TRANSLATION_MEMORY_ROWS,
} from "../_mock-data"
import styles from "../localization-deep.module.css"

import { FullTranslatorClient } from "./full-translator-client"

export const metadata: Metadata = {
  title: "Full translator cockpit | Localization deep",
  description:
    "Bonus composition — the full Mufflermen translator cockpit wiring editor, MT, fallback chain, completeness, keys, glossary, plurals, interpolation, RTL, TM, style guides, exchange and QA.",
}

export default function FullTranslatorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus / Composition"
        title="Full translator cockpit"
        description="A composed translator-experience cockpit. Every localization-deep primitive wired together with realistic Mufflermen fixtures — Wollongong, Shellharbour, Oak Flats; en-AU canonical with the en-NZ → en-GB → en-US fallback chain and zh-CN on the roadmap."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Full translator cockpit" },
        ]}
      />

      <FullTranslatorClient
        initialLocale="zh-CN"
        localeEntries={LOCALE_ENTRIES}
        translationEditor={TRANSLATION_EDITOR_PRIMARY}
        mtPreview={MT_PREVIEW_PRIMARY}
        fallback={FALLBACK_PRIMARY}
        completenessLocales={COMPLETENESS_LOCALES}
        completenessNamespaces={COMPLETENESS_NAMESPACES}
        stringKeyRows={STRING_KEY_ROWS}
        glossaryRows={GLOSSARY_ROWS}
        interpolation={INTERPOLATION_PRIMARY}
        pluralForms={PLURAL_EN_FORMS}
        rtlTile={RTL_TILE_PRIMARY}
        translationMemoryRows={TRANSLATION_MEMORY_ROWS}
        styleGuideAu={STYLE_GUIDE_AU}
        styleGuideZh={STYLE_GUIDE_ZH}
        importExportCards={IMPORT_EXPORT_CARDS}
        qaIssueRows={QA_ISSUE_ROWS}
      />
    </main>
  )
}
