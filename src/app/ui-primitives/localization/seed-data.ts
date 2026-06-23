/**
 * Shared deterministic seed data for the localization sub-routes + the full console.
 * Held here so every primitive's demo page tells the same Mufflermen story.
 */

import type {
  CoverageState,
  CurrencyEntry,
  DateLocaleEntry,
  DetectedString,
  FeatureRow,
  GlossaryTranslation,
  LocaleSummary,
  NumberLocaleEntry,
  PluralLocaleEntry,
  RegionSummary,
  TimeZoneEntry,
  TranslationKeyTarget,
  TranslationMemoryHit,
  TranslationProgressEntry,
} from "../components/localization"

export const LANGUAGES: ReadonlyArray<LocaleSummary> = [
  { tag: "en-AU", label: "English (Australia)", endonym: "English (Australia)", region: "AU" },
  { tag: "en-US", label: "English (United States)", endonym: "English (US)", region: "US" },
  { tag: "en-GB", label: "English (United Kingdom)", endonym: "English (UK)", region: "GB" },
  { tag: "de-DE", label: "German (Germany)", endonym: "Deutsch", region: "DE" },
  { tag: "fr-FR", label: "French (France)", endonym: "Français", region: "FR" },
  { tag: "es-ES", label: "Spanish (Spain)", endonym: "Español", region: "ES" },
  { tag: "it-IT", label: "Italian (Italy)", endonym: "Italiano", region: "IT" },
  { tag: "ja-JP", label: "Japanese (Japan)", endonym: "日本語", region: "JP" },
  { tag: "ko-KR", label: "Korean (Republic of Korea)", endonym: "한국어", region: "KR" },
  { tag: "zh-CN", label: "Chinese (Simplified)", endonym: "简体中文", region: "CN" },
  { tag: "ar-SA", label: "Arabic (Saudi Arabia)", endonym: "العربية", region: "SA" },
  { tag: "he-IL", label: "Hebrew (Israel)", endonym: "עברית", region: "IL" },
  { tag: "ur-PK", label: "Urdu (Pakistan)", endonym: "اردو", region: "PK" },
]

export const REGIONS: ReadonlyArray<RegionSummary> = [
  {
    id: "au",
    label: "Australia",
    timezone: "Australia/Sydney · GMT+11",
    currency: "AUD",
    measurement: "metric",
  },
  {
    id: "nz",
    label: "Aotearoa NZ",
    timezone: "Pacific/Auckland · GMT+13",
    currency: "NZD",
    measurement: "metric",
  },
  {
    id: "us",
    label: "United States",
    timezone: "America/New_York · GMT-5",
    currency: "USD",
    measurement: "imperial",
  },
  {
    id: "uk",
    label: "United Kingdom",
    timezone: "Europe/London · GMT+0",
    currency: "GBP",
    measurement: "metric",
  },
  {
    id: "eu",
    label: "Europe (DE/FR/IT)",
    timezone: "Europe/Berlin · GMT+1",
    currency: "EUR",
    measurement: "metric",
  },
  {
    id: "jp",
    label: "Japan",
    timezone: "Asia/Tokyo · GMT+9",
    currency: "JPY",
    measurement: "metric",
  },
]

export const CURRENCIES: ReadonlyArray<CurrencyEntry> = [
  { code: "AUD", locale: "en-AU", label: "Australian dollar" },
  { code: "USD", locale: "en-US", label: "US dollar" },
  { code: "EUR", locale: "de-DE", label: "Euro" },
  { code: "GBP", locale: "en-GB", label: "Pound sterling" },
  { code: "JPY", locale: "ja-JP", label: "Japanese yen" },
  { code: "NZD", locale: "en-NZ", label: "New Zealand dollar" },
  { code: "CAD", locale: "en-CA", label: "Canadian dollar" },
]

export const DATE_LOCALES: ReadonlyArray<DateLocaleEntry> = [
  { locale: "en-AU", label: "English · Australia" },
  { locale: "en-US", label: "English · United States" },
  { locale: "en-GB", label: "English · United Kingdom" },
  { locale: "de-DE", label: "German · Germany" },
  { locale: "ja-JP", label: "Japanese · Japan" },
  { locale: "ar-SA", label: "Arabic · Saudi Arabia" },
]

export const NUMBER_LOCALES: ReadonlyArray<NumberLocaleEntry> = [
  { locale: "en-AU", label: "English · Australia" },
  { locale: "en-US", label: "English · United States" },
  { locale: "de-DE", label: "German · Germany" },
  { locale: "fr-FR", label: "French · France" },
  { locale: "ja-JP", label: "Japanese · Japan" },
  { locale: "ar-SA", label: "Arabic · Saudi Arabia" },
]

export const PROGRESS_ENTRIES: ReadonlyArray<TranslationProgressEntry> = [
  { locale: "en-AU", label: "English · Australia (source)", translated: 1840, total: 1840 },
  { locale: "en-US", label: "English · United States", translated: 1822, total: 1840 },
  { locale: "en-GB", label: "English · United Kingdom", translated: 1814, total: 1840 },
  { locale: "de-DE", label: "German · Germany", translated: 1702, total: 1840 },
  { locale: "fr-FR", label: "French · France", translated: 1612, total: 1840 },
  { locale: "ja-JP", label: "Japanese · Japan", translated: 1320, total: 1840 },
  { locale: "ko-KR", label: "Korean · Republic of Korea", translated: 1196, total: 1840 },
  { locale: "ar-SA", label: "Arabic · Saudi Arabia", translated: 768, total: 1840 },
  { locale: "he-IL", label: "Hebrew · Israel", translated: 420, total: 1840 },
]

export const KEY_TARGETS: ReadonlyArray<TranslationKeyTarget> = [
  { locale: "en-US", value: "Book a muffler service", status: "approved", reviewer: "approved" },
  { locale: "en-GB", value: "Book an exhaust service", status: "translated", reviewer: "pending" },
  { locale: "de-DE", value: "Auspuffservice buchen", status: "approved", reviewer: "approved" },
  { locale: "ja-JP", value: "マフラー点検を予約する", status: "fuzzy", reviewer: "pending" },
  { locale: "ar-SA", value: "احجز خدمة صيانة العادم", status: "pending-review", reviewer: "pending" },
  { locale: "fr-FR", value: "", status: "missing", reviewer: "unassigned" },
]

export const GLOSSARY_TRANSLATIONS: ReadonlyArray<GlossaryTranslation> = [
  { locale: "en-US", value: "Muffler" },
  { locale: "en-GB", value: "Silencer" },
  { locale: "de-DE", value: "Schalldämpfer" },
  { locale: "fr-FR", value: "Silencieux" },
  { locale: "ja-JP", value: "マフラー" },
  { locale: "ar-SA", value: "كاتم الصوت" },
]

export const PLURAL_LOCALES: ReadonlyArray<PluralLocaleEntry> = [
  {
    locale: "en-AU",
    label: "English · Australia",
    templates: {
      one: "{count} muffler in your cart",
      other: "{count} mufflers in your cart",
    },
  },
  {
    locale: "ar-SA",
    label: "Arabic · Saudi Arabia",
    templates: {
      zero: "لا توجد كواتم في سلتك",
      one: "كاتم صوت واحد في سلتك",
      two: "كاتما صوت في سلتك",
      few: "{count} كواتم في سلتك",
      many: "{count} كاتم صوت في سلتك",
      other: "{count} كاتم صوت في سلتك",
    },
  },
  {
    locale: "ru-RU",
    label: "Russian · Russia",
    templates: {
      one: "{count} глушитель в корзине",
      few: "{count} глушителя в корзине",
      many: "{count} глушителей в корзине",
      other: "{count} глушителей в корзине",
    },
  },
  {
    locale: "pl-PL",
    label: "Polish · Poland",
    templates: {
      one: "{count} tłumik w koszyku",
      few: "{count} tłumiki w koszyku",
      many: "{count} tłumików w koszyku",
      other: "{count} tłumika w koszyku",
    },
  },
  {
    locale: "ja-JP",
    label: "Japanese · Japan",
    templates: {
      other: "{count}個のマフラーがカートにあります",
    },
  },
]

export const EXTRACTION_STRINGS: ReadonlyArray<DetectedString> = [
  {
    literal: "Book a workshop slot",
    line: 24,
    suggestedKey: "workshop.booking.cta.primary",
    status: "queued",
  },
  {
    literal: "Australian compliance certified",
    line: 62,
    suggestedKey: "workshop.compliance.heading",
    status: "extracted",
  },
  {
    literal: "Replacement muffler in stock",
    line: 118,
    suggestedKey: "workshop.parts.muffler.in_stock",
    status: "detected",
  },
  {
    literal: "/* TODO: localise this paragraph */",
    line: 144,
    suggestedKey: "workshop.copy.todo_paragraph",
    status: "ignored",
  },
  {
    literal: "Choose front or rear muffler",
    line: 211,
    suggestedKey: "workshop.parts.muffler.location_question",
    status: "needs-context",
  },
]

export const MEMORY_HITS: ReadonlyArray<TranslationMemoryHit> = [
  {
    value: "Book a muffler service",
    locale: "en-US",
    similarity: 100,
    reference: "TM:checkout/cta:v4",
  },
  {
    value: "Book an exhaust service",
    locale: "en-GB",
    similarity: 92,
    reference: "TM:checkout/cta:v3",
  },
  {
    value: "Book a workshop slot",
    locale: "en-AU",
    similarity: 78,
    reference: "TM:workshop/cta:v2",
  },
  {
    value: "Reserve a service slot",
    locale: "en-AU",
    similarity: 64,
    reference: "TM:legacy/cta:v1",
  },
]

export const COVERAGE_LOCALES: ReadonlyArray<string> = [
  "en-AU",
  "en-US",
  "en-GB",
  "de-DE",
  "fr-FR",
  "ja-JP",
  "ar-SA",
]

const C = (state: CoverageState): CoverageState => state

export const COVERAGE_FEATURES: ReadonlyArray<FeatureRow> = [
  {
    id: "workshop",
    label: "Workshop landing",
    coverage: {
      "en-AU": C("translated"),
      "en-US": C("translated"),
      "en-GB": C("translated"),
      "de-DE": C("translated"),
      "fr-FR": C("partial"),
      "ja-JP": C("partial"),
      "ar-SA": C("missing"),
    },
  },
  {
    id: "checkout",
    label: "Parts checkout",
    coverage: {
      "en-AU": C("translated"),
      "en-US": C("translated"),
      "en-GB": C("translated"),
      "de-DE": C("translated"),
      "fr-FR": C("translated"),
      "ja-JP": C("partial"),
      "ar-SA": C("missing"),
    },
  },
  {
    id: "kyc",
    label: "KYC + verification",
    coverage: {
      "en-AU": C("translated"),
      "en-US": C("translated"),
      "en-GB": C("translated"),
      "de-DE": C("partial"),
      "fr-FR": C("partial"),
      "ja-JP": C("missing"),
      "ar-SA": C("na"),
    },
  },
  {
    id: "hermes",
    label: "Hermes dispatch",
    coverage: {
      "en-AU": C("translated"),
      "en-US": C("translated"),
      "en-GB": C("partial"),
      "de-DE": C("missing"),
      "fr-FR": C("missing"),
      "ja-JP": C("na"),
      "ar-SA": C("na"),
    },
  },
  {
    id: "marketing",
    label: "Marketing site",
    coverage: {
      "en-AU": C("translated"),
      "en-US": C("translated"),
      "en-GB": C("translated"),
      "de-DE": C("translated"),
      "fr-FR": C("translated"),
      "ja-JP": C("translated"),
      "ar-SA": C("partial"),
    },
  },
  {
    id: "support",
    label: "Help & support",
    coverage: {
      "en-AU": C("translated"),
      "en-US": C("translated"),
      "en-GB": C("translated"),
      "de-DE": C("partial"),
      "fr-FR": C("partial"),
      "ja-JP": C("missing"),
      "ar-SA": C("missing"),
    },
  },
]

export const TIME_ZONES: ReadonlyArray<TimeZoneEntry> = [
  { zone: "Australia/Sydney", label: "Sydney", region: "AU" },
  { zone: "America/New_York", label: "New York", region: "US" },
  { zone: "Europe/London", label: "London", region: "GB" },
  { zone: "Asia/Tokyo", label: "Tokyo", region: "JP" },
  { zone: "Europe/Berlin", label: "Berlin", region: "DE" },
]

/** Stable reference instant used by date/number demos so SSR matches client. */
export const REFERENCE_ISO = "2026-05-28T03:30:00.000Z"
