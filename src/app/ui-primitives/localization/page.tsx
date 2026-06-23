import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./localization.module.css"

export const metadata: Metadata = {
  title: "Localization & i18n | UI Primitives",
  description:
    "Localization + i18n primitives for the Mufflermen workshop — language + region switching, Intl.NumberFormat / DateTimeFormat / PluralRules demos, translation key rows, progress meters, glossary cards, RTL layout toggle, string extraction, translation memory, locale coverage matrix, and a multi-zone time strip, plus a composed translation manager console.",
}

interface LocalizationScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<LocalizationScene> = [
  {
    kicker: "Primitive 01",
    title: "Language switcher",
    body: "Compact language switcher with current flag + chevron, dropdown search, endonyms, and RTL marker chips.",
    href: "/ui-primitives/localization/language-switcher",
    accent: "teal",
    glyph: "AA",
    state: "Stateful · dropdown",
  },
  {
    kicker: "Primitive 02",
    title: "Region switcher",
    body: "Region tiles showing timezone, currency, and metric vs imperial units per supported market.",
    href: "/ui-primitives/localization/region-switcher",
    accent: "amber",
    glyph: "⌖",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 03",
    title: "Currency formatter",
    body: "Same amount rendered across AUD / USD / EUR / GBP / JPY / NZD / CAD via Intl.NumberFormat.",
    href: "/ui-primitives/localization/currency-formatter",
    accent: "amber",
    glyph: "$€¥",
    state: "Stateless · Intl",
  },
  {
    kicker: "Primitive 04",
    title: "Date format demo",
    body: "Same instant formatted for en-AU, en-US, en-GB, de-DE, ja-JP, and ar-SA with RTL direction.",
    href: "/ui-primitives/localization/date-format",
    accent: "teal",
    glyph: "📅",
    state: "Stateless · Intl",
  },
  {
    kicker: "Primitive 05",
    title: "Number format demo",
    body: "Locale-aware separators with km / kg / °C units rendered with Intl.NumberFormat unit style.",
    href: "/ui-primitives/localization/number-format",
    accent: "green",
    glyph: "0.0",
    state: "Stateless · Intl",
  },
  {
    kicker: "Primitive 06",
    title: "Translation key row",
    body: "Row showing key + source + targets per locale, with status + reviewer chips and missing markers.",
    href: "/ui-primitives/localization/translation-key-row",
    accent: "amber",
    glyph: "{k}",
    state: "Stateless · table",
  },
  {
    kicker: "Primitive 07",
    title: "Translation progress meter",
    body: "Bar showing % translated per language — tone shifts red < 50, amber 50–90, green 90+.",
    href: "/ui-primitives/localization/translation-progress",
    accent: "green",
    glyph: "▰▱",
    state: "Stateless · meter",
  },
  {
    kicker: "Primitive 08",
    title: "Glossary card",
    body: "Term card with translations per locale, part of speech, usage notes, and a lock toggle.",
    href: "/ui-primitives/localization/glossary-card",
    accent: "amber",
    glyph: "§",
    state: "Stateful · lock",
  },
  {
    kicker: "Primitive 09",
    title: "RTL layout toggle",
    body: "Toggle LTR / RTL preview — rotates the preview frame in place; reduced-motion swaps instantly.",
    href: "/ui-primitives/localization/rtl-toggle",
    accent: "teal",
    glyph: "↔",
    state: "Stateful · direction",
  },
  {
    kicker: "Primitive 10",
    title: "Pluralization tester",
    body: "Cardinal count input + output across CLDR plural forms (zero / one / two / few / many / other).",
    href: "/ui-primitives/localization/pluralization-tester",
    accent: "red",
    glyph: "1·2·∞",
    state: "Stateful · Intl",
  },
  {
    kicker: "Primitive 11",
    title: "String extraction row",
    body: "Source file row listing detected strings, extraction status, and suggested translation keys.",
    href: "/ui-primitives/localization/string-extraction",
    accent: "amber",
    glyph: "⌬",
    state: "Stateless · list",
  },
  {
    kicker: "Primitive 12",
    title: "Translation memory card",
    body: "TM suggestion card — source + memory hits + similarity % + reuse CTA per locale.",
    href: "/ui-primitives/localization/translation-memory",
    accent: "green",
    glyph: "≈",
    state: "Stateless · TM",
  },
  {
    kicker: "Primitive 13",
    title: "Locale coverage matrix",
    body: "Feature × locale matrix showing translated / partial / missing / N/A coverage cells.",
    href: "/ui-primitives/localization/locale-coverage",
    accent: "neutral",
    glyph: "▦",
    state: "Stateless · matrix",
  },
  {
    kicker: "Primitive 14",
    title: "Time zone display",
    body: "Live multi-zone strip showing the current time in Sydney, NYC, London, Tokyo, and Berlin.",
    href: "/ui-primitives/localization/time-zone-display",
    accent: "teal",
    glyph: "⌚",
    state: "Stateful · ticking",
  },
  {
    kicker: "Composition",
    title: "Full translation console",
    body: "Composed translation manager workspace — language switcher, progress meters, key list, TM and glossary.",
    href: "/ui-primitives/localization/full-console",
    accent: "red",
    glyph: "Aあ",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<LocalizationScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function LocalizationIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Localization & i18n / 14 primitives + composition"
        title="Localization + i18n primitives"
        description="Visual primitives for the Mufflermen workshop localization workspace — language and region switching, Intl-powered number / date / currency demos, translation memory, glossary, RTL preview, plural rules tester, string extraction, locale coverage matrix, and a live multi-zone clock. Reference only — Intl APIs are real, no translation backend is wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization & i18n" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — Intl APIs are real, no translation backend wired
      </span>

      <section className={styles.grid} aria-label="Localization primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            prefetch={false}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
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
