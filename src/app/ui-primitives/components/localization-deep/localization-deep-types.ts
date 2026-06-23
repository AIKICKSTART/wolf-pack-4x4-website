/**
 * Shared localization-deep primitive types.
 *
 * Builds on the shallow localization pack and pushes into the deep
 * translator surface: editing, glossary, machine translation, fallback
 * chains, CLDR pluralisation, interpolation tokens, RTL preview, TM
 * memory, style guides, import/export and QA issues.
 *
 * Mufflermen ships in en-AU first, then en-NZ, en-GB, en-US, with
 * future zh-CN for the Chinese diaspora customer base. Glossary
 * preserves brand terms ("Mufflermen") and regional vocabulary
 * ("exhaust", "Wollongong", "Shellharbour").
 */

import type {
  LocaleDirection,
  LocaleSummary,
  ReviewerState,
  TranslationStatus,
} from "../localization/localization-types"

export type { LocaleDirection, LocaleSummary, ReviewerState, TranslationStatus }

/** Engines that can power machine translation suggestions. */
export type MachineTranslationEngine =
  | "deepl"
  | "google"
  | "azure"
  | "amazon"
  | "internal"

/** CLDR plural categories — covers all natural languages. */
export type CldrPluralCategory =
  | "zero"
  | "one"
  | "two"
  | "few"
  | "many"
  | "other"

/** Glossary part of speech for term entries. */
export type GlossaryPartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "phrase"
  | "brand"

/** Quality assurance issue severity. */
export type QaIssueSeverity = "info" | "warning" | "error"

/** Quality assurance issue category. */
export type QaIssueKind =
  | "missing-variable"
  | "extra-variable"
  | "length-overflow"
  | "length-underflow"
  | "profanity"
  | "untranslated"
  | "tag-mismatch"
  | "formality-drift"

/** Fallback resolution policy when a target key is missing. */
export type FallbackPolicy = "show-source" | "show-key" | "show-empty"

/** Import / export wire format. */
export type ExchangeFormat = "xliff" | "csv" | "json" | "po" | "tmx"

/** Operation type for import / export cards. */
export type ExchangeOperation = "import" | "export"

/** Locale style guide tone bucket. */
export type StyleTone = "casual" | "neutral" | "formal" | "playful"

/** Locale style guide formality bucket. */
export type Formality = "informal" | "neutral" | "formal"

/** Mufflermen canonical locales — en-AU is primary; en-NZ/GB/US fall back; zh-CN is roadmap. */
export const MUFFLERMEN_LOCALES: ReadonlyArray<LocaleSummary> = [
  { tag: "en-AU", label: "English (Australia)", region: "AU", endonym: "English", direction: "ltr" },
  { tag: "en-NZ", label: "English (New Zealand)", region: "NZ", endonym: "English", direction: "ltr" },
  { tag: "en-GB", label: "English (United Kingdom)", region: "GB", endonym: "English", direction: "ltr" },
  { tag: "en-US", label: "English (United States)", region: "US", endonym: "English", direction: "ltr" },
  { tag: "zh-CN", label: "Chinese (Simplified)", region: "CN", endonym: "简体中文", direction: "ltr" },
]

/** Mufflermen canonical fallback chain — never drop a locale; resolve up the chain. */
export const MUFFLERMEN_FALLBACK_CHAIN: ReadonlyArray<string> = [
  "en-AU",
  "en-NZ",
  "en-GB",
  "en-US",
]

/** Tones for chip / status mappings. */
export type LocalizationTone = "neutral" | "red" | "amber" | "teal" | "green"

/** Map a QA severity to chip tone. */
export const QA_SEVERITY_TONE: Record<QaIssueSeverity, LocalizationTone> = {
  info: "teal",
  warning: "amber",
  error: "red",
}

/** Map an MT engine to display label. */
export const MT_ENGINE_LABEL: Record<MachineTranslationEngine, string> = {
  deepl: "DeepL",
  google: "Google",
  azure: "Azure",
  amazon: "Amazon",
  internal: "Internal",
}

/** Map a CLDR plural category to display label. */
export const CLDR_PLURAL_LABEL: Record<CldrPluralCategory, string> = {
  zero: "Zero",
  one: "One",
  two: "Two",
  few: "Few",
  many: "Many",
  other: "Other",
}

/** Map a glossary part of speech to display label. */
export const GLOSSARY_POS_LABEL: Record<GlossaryPartOfSpeech, string> = {
  noun: "Noun",
  verb: "Verb",
  adjective: "Adj",
  phrase: "Phrase",
  brand: "Brand",
}

/** Map exchange format to display label. */
export const EXCHANGE_FORMAT_LABEL: Record<ExchangeFormat, string> = {
  xliff: "XLIFF 2.1",
  csv: "CSV",
  json: "JSON",
  po: "Gettext PO",
  tmx: "TMX 1.4",
}

/** Map a QA issue kind to display label. */
export const QA_KIND_LABEL: Record<QaIssueKind, string> = {
  "missing-variable": "Missing variable",
  "extra-variable": "Extra variable",
  "length-overflow": "Length overflow",
  "length-underflow": "Length underflow",
  profanity: "Profanity",
  untranslated: "Untranslated",
  "tag-mismatch": "Tag mismatch",
  "formality-drift": "Formality drift",
}

/** Region flag mapping reused by locale-switcher and other deep primitives. */
export const REGION_FLAG: Record<string, string> = {
  AU: "AU",
  NZ: "NZ",
  GB: "GB",
  US: "US",
  CN: "CN",
  TW: "TW",
  HK: "HK",
  JP: "JP",
  KR: "KR",
  DE: "DE",
  FR: "FR",
  ES: "ES",
  IT: "IT",
  NL: "NL",
  BR: "BR",
  MX: "MX",
  IN: "IN",
  CA: "CA",
  IL: "IL",
  SA: "SA",
  EG: "EG",
  IR: "IR",
  PK: "PK",
}

/** Resolve a region two-letter shorthand from any locale summary. */
export function regionCode(summary: Pick<LocaleSummary, "region">): string {
  return summary.region.toUpperCase()
}
