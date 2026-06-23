import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./localization-deep.module.css"

export const metadata: Metadata = {
  title: "Localization deep pack | UI Primitives",
  description:
    "Fourteen deep localization primitives for Oak Flats Mufflermen — translation editor, glossary, MT preview, completeness matrix, fallback chains, locale switcher, string key row, CLDR pluralisation, interpolation panel, RTL preview, translation memory, style guide, import/export and QA issues.",
}

interface Block {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  state: string
}

const BLOCKS: ReadonlyArray<Block> = [
  {
    kicker: "Primitive 01",
    title: "Translation editor",
    body: "Source + target editor with MT suggest, character count, and translator context note.",
    href: "/ui-primitives/localization-deep/translation-editor",
    accent: "amber",
    state: "Editor",
  },
  {
    kicker: "Primitive 02",
    title: "Glossary row",
    body: "Term row with source, targets, part-of-speech, and do-not-translate / case-sensitive flags.",
    href: "/ui-primitives/localization-deep/glossary-row",
    accent: "red",
    state: "Glossary",
  },
  {
    kicker: "Primitive 03",
    title: "MT preview card",
    body: "Machine translation preview with engine picker, confidence meter, and latency.",
    href: "/ui-primitives/localization-deep/mt-preview-card",
    accent: "amber",
    state: "MT",
  },
  {
    kicker: "Primitive 04",
    title: "Completeness matrix",
    body: "Locale × namespace heat grid with completion percentages.",
    href: "/ui-primitives/localization-deep/completeness-matrix",
    accent: "green",
    state: "Coverage",
  },
  {
    kicker: "Primitive 05",
    title: "Fallback rule card",
    body: "Editable fallback chain (en-AU → en-NZ → en-GB → en-US) with final policy switcher.",
    href: "/ui-primitives/localization-deep/fallback-rule-card",
    accent: "teal",
    state: "Fallback",
  },
  {
    kicker: "Primitive 06",
    title: "Locale switcher",
    body: "Locale dropdown with flag, endonym and completion meter per locale.",
    href: "/ui-primitives/localization-deep/locale-switcher",
    accent: "teal",
    state: "Switcher",
  },
  {
    kicker: "Primitive 07",
    title: "String key row",
    body: "Flat-key string row with usage count, last edit, editor and critical flag.",
    href: "/ui-primitives/localization-deep/string-key-row",
    accent: "amber",
    state: "Keys",
  },
  {
    kicker: "Primitive 08",
    title: "Pluralization editor",
    body: "CLDR plural form editor — zero / one / two / few / many / other.",
    href: "/ui-primitives/localization-deep/pluralization-editor",
    accent: "amber",
    state: "Plurals",
  },
  {
    kicker: "Primitive 09",
    title: "Interpolation panel",
    body: "{variable} preview with editable sample values and missing/unused diagnostics.",
    href: "/ui-primitives/localization-deep/interpolation-panel",
    accent: "green",
    state: "Tokens",
  },
  {
    kicker: "Primitive 10",
    title: "Right-to-left tile",
    body: "RTL preview tile with mirror toggle and direction-aware controls.",
    href: "/ui-primitives/localization-deep/right-to-left-tile",
    accent: "teal",
    state: "RTL",
  },
  {
    kicker: "Primitive 11",
    title: "Translation memory row",
    body: "TM hit row with match score, fuzzy band, context and one-click reuse.",
    href: "/ui-primitives/localization-deep/translation-memory-row",
    accent: "teal",
    state: "Memory",
  },
  {
    kicker: "Primitive 12",
    title: "Style guide card",
    body: "Locale style guide card — tone, formality, voice summary and do/don't examples.",
    href: "/ui-primitives/localization-deep/style-guide-card",
    accent: "amber",
    state: "Voice",
  },
  {
    kicker: "Primitive 13",
    title: "Import / export card",
    body: "XLIFF / CSV / JSON / PO / TMX import & export card with progress and stats.",
    href: "/ui-primitives/localization-deep/import-export-card",
    accent: "teal",
    state: "Exchange",
  },
  {
    kicker: "Primitive 14",
    title: "QA issue row",
    body: "QA issue row — missing variables, length overflow, profanity, tag mismatch.",
    href: "/ui-primitives/localization-deep/qa-issue-row",
    accent: "red",
    state: "QA",
  },
  {
    kicker: "Bonus",
    title: "Full translator cockpit",
    body: "Composes editor, glossary, MT, completeness matrix, fallback chain, switcher, keys, plurals, interpolation, RTL, TM, style guide, exchange and QA.",
    href: "/ui-primitives/localization-deep/full-translator",
    accent: "green",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Block["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function LocalizationDeepIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Localization deep pack"
        title="Translator cockpit primitives"
        description="Fourteen deep translator-experience surfaces for Oak Flats Mufflermen — editing, glossary lock, machine translation, completeness heat grids, fallback chains (en-AU → en-NZ → en-GB → en-US, then zh-CN on roadmap), CLDR pluralisation, interpolation tokens, RTL preview, translation memory, locale style guides, XLIFF/CSV/JSON/PO/TMX exchange, and QA. Bonus: a composed full translator cockpit route."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep" },
        ]}
      />

      <span className={styles.notice}>
        Localization deep · composed from the umbrella design system
      </span>

      <section className={styles.grid} aria-label="Localization deep primitives index">
        {BLOCKS.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className={[styles.card, ACCENT_CLASS[block.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbHeadline} />
                <div className={styles.thumbRows}>
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                </div>
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{block.kicker}</span>
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <p className={styles.cardBody}>{block.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{block.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
