/**
 * Showcase fixtures for the localization-deep primitive pack.
 *
 * Mufflermen ships in en-AU first, then en-NZ, en-GB, en-US, with a
 * zh-CN roadmap stop for the Chinese diaspora customer base in
 * Wollongong and Shellharbour. Glossary preserves brand terms
 * ("Mufflermen"), suburb names, and AU-specific exhaust vocab.
 *
 * Fixture values are stable to keep route screenshots deterministic.
 */

import type {
  CldrPluralCategory,
  CompletenessNamespace,
  FallbackRuleCardProps,
  GlossaryRowProps,
  ImportExportCardProps,
  InterpolationPanelProps,
  LocaleSwitcherEntry,
  MtPreviewCardProps,
  PluralizationEditorForm,
  QaIssueRowProps,
  RightToLeftTileProps,
  StringKeyRowProps,
  StyleGuideCardProps,
  TranslationEditorMtSuggestion,
  TranslationEditorProps,
  TranslationMemoryRowProps,
} from "../components/localization-deep"

import { MUFFLERMEN_FALLBACK_CHAIN } from "../components/localization-deep"

/** Locale entries with realistic completion ratios for the deep showcase. */
export const LOCALE_ENTRIES: ReadonlyArray<LocaleSwitcherEntry> = [
  { tag: "en-AU", label: "English (Australia)", region: "AU", endonym: "English", completion: 1 },
  { tag: "en-NZ", label: "English (New Zealand)", region: "NZ", endonym: "English", completion: 0.97 },
  { tag: "en-GB", label: "English (United Kingdom)", region: "GB", endonym: "English", completion: 0.92 },
  { tag: "en-US", label: "English (United States)", region: "US", endonym: "English", completion: 0.84 },
  { tag: "zh-CN", label: "Chinese (Simplified)", region: "CN", endonym: "简体中文", completion: 0.42 },
  { tag: "ar-SA", label: "Arabic (Saudi Arabia)", region: "SA", endonym: "العربية", completion: 0.18 },
]

export const COMPLETENESS_LOCALES: ReadonlyArray<string> = [
  "en-AU",
  "en-NZ",
  "en-GB",
  "en-US",
  "zh-CN",
  "ar-SA",
]

export const COMPLETENESS_NAMESPACES: ReadonlyArray<CompletenessNamespace> = [
  {
    namespace: "checkout",
    label: "Checkout flow",
    cells: [
      { locale: "en-AU", ratio: 1, translated: 64, total: 64 },
      { locale: "en-NZ", ratio: 0.98, translated: 63, total: 64 },
      { locale: "en-GB", ratio: 0.94, translated: 60, total: 64 },
      { locale: "en-US", ratio: 0.91, translated: 58, total: 64 },
      { locale: "zh-CN", ratio: 0.66, translated: 42, total: 64 },
      { locale: "ar-SA", ratio: 0.22, translated: 14, total: 64 },
    ],
  },
  {
    namespace: "parts",
    label: "Parts catalogue",
    cells: [
      { locale: "en-AU", ratio: 1, translated: 412, total: 412 },
      { locale: "en-NZ", ratio: 0.96, translated: 395, total: 412 },
      { locale: "en-GB", ratio: 0.92, translated: 379, total: 412 },
      { locale: "en-US", ratio: 0.84, translated: 346, total: 412 },
      { locale: "zh-CN", ratio: 0.38, translated: 156, total: 412 },
      { locale: "ar-SA", ratio: 0.12, translated: 49, total: 412 },
    ],
  },
  {
    namespace: "booking",
    label: "Workshop booking",
    cells: [
      { locale: "en-AU", ratio: 1, translated: 88, total: 88 },
      { locale: "en-NZ", ratio: 1, translated: 88, total: 88 },
      { locale: "en-GB", ratio: 0.95, translated: 84, total: 88 },
      { locale: "en-US", ratio: 0.88, translated: 77, total: 88 },
      { locale: "zh-CN", ratio: 0.51, translated: 45, total: 88 },
      { locale: "ar-SA", ratio: 0.18, translated: 16, total: 88 },
    ],
  },
  {
    namespace: "legal",
    label: "Terms & legal",
    cells: [
      { locale: "en-AU", ratio: 1, translated: 26, total: 26 },
      { locale: "en-NZ", ratio: 1, translated: 26, total: 26 },
      { locale: "en-GB", ratio: 1, translated: 26, total: 26 },
      { locale: "en-US", ratio: 0.96, translated: 25, total: 26 },
      { locale: "zh-CN", ratio: 0.31, translated: 8, total: 26 },
      { locale: "ar-SA", ratio: 0.08, translated: 2, total: 26 },
    ],
  },
  {
    namespace: "emails",
    label: "Transactional email",
    cells: [
      { locale: "en-AU", ratio: 1, translated: 142, total: 142 },
      { locale: "en-NZ", ratio: 0.95, translated: 135, total: 142 },
      { locale: "en-GB", ratio: 0.9, translated: 128, total: 142 },
      { locale: "en-US", ratio: 0.82, translated: 116, total: 142 },
      { locale: "zh-CN", ratio: 0.44, translated: 62, total: 142 },
      { locale: "ar-SA", ratio: 0.21, translated: 30, total: 142 },
    ],
  },
  {
    namespace: "errors",
    label: "Error messages",
    cells: [
      { locale: "en-AU", ratio: 1, translated: 56, total: 56 },
      { locale: "en-NZ", ratio: 1, translated: 56, total: 56 },
      { locale: "en-GB", ratio: 0.98, translated: 55, total: 56 },
      { locale: "en-US", ratio: 0.93, translated: 52, total: 56 },
      { locale: "zh-CN", ratio: 0.59, translated: 33, total: 56 },
      { locale: "ar-SA", ratio: 0.27, translated: 15, total: 56 },
    ],
  },
]

const SHARED_MT: ReadonlyArray<TranslationEditorMtSuggestion> = [
  {
    engine: "deepl",
    value: "提示:为您的爱车选择匹配的运动型排气系统。",
    confidence: 0.91,
  },
  {
    engine: "google",
    value: "提示:为您的车辆选择适配的运动排气系统。",
    confidence: 0.88,
  },
  {
    engine: "azure",
    value: "提示:为您的车选择合适的运动型排气总成。",
    confidence: 0.74,
  },
]

export const TRANSLATION_EDITOR_PRIMARY: TranslationEditorProps = {
  translationKey: "checkout.cta.confirm",
  sourceLocale: "en-AU",
  targetLocale: "zh-CN",
  sourceString:
    "Choose your matched sports exhaust system. Mufflermen will dyno-tune it before delivery.",
  initialTarget: "选择您匹配的运动排气系统。Mufflermen 会在交付前做马力机调校。",
  contextNote:
    "CTA on the checkout step. Keep \"Mufflermen\" untranslated — it is the brand. \"Dyno-tune\" can be paraphrased as 马力机调校.",
  maxChars: 80,
  status: "pending-review",
  reviewer: "pending",
  suggestions: SHARED_MT,
}

export const TRANSLATION_EDITOR_FRESH: TranslationEditorProps = {
  translationKey: "parts.detail.fitment",
  sourceLocale: "en-AU",
  targetLocale: "en-NZ",
  sourceString:
    "Fits 2018+ Ford Ranger PX III / Raptor with the 3.2 TDCi and 2.0 Bi-Turbo. Includes Wollongong-fab stainless hangers.",
  contextNote:
    "Product page fitment line. Keep suburb name \"Wollongong\" preserved. PX III nomenclature should stay literal.",
  maxChars: 200,
  status: "missing",
  reviewer: "unassigned",
}

export const TRANSLATION_EDITOR_APPROVED: TranslationEditorProps = {
  translationKey: "booking.confirmation.headline",
  sourceLocale: "en-AU",
  targetLocale: "en-GB",
  sourceString: "You're booked in. See you at Oak Flats.",
  initialTarget: "You're booked in. See you at Oak Flats.",
  contextNote:
    "Booking confirmation hero. Oak Flats is a suburb name — never localise.",
  maxChars: 80,
  status: "approved",
  reviewer: "approved",
}

export const GLOSSARY_ROWS: ReadonlyArray<GlossaryRowProps> = [
  {
    term: "Mufflermen",
    sourceLocale: "en-AU",
    partOfSpeech: "brand",
    definition: "The brand name. Treat as a single proper noun; never split or translate.",
    doNotTranslate: true,
    caseSensitive: true,
    translations: [
      { locale: "en-NZ", value: "Mufflermen" },
      { locale: "en-GB", value: "Mufflermen" },
      { locale: "en-US", value: "Mufflermen" },
      { locale: "zh-CN", value: "Mufflermen" },
    ],
  },
  {
    term: "exhaust",
    sourceLocale: "en-AU",
    partOfSpeech: "noun",
    definition:
      "Always render with the AU sense — the full system, headers to tailpipe. Avoid US \"muffler\" as a shorthand.",
    translations: [
      { locale: "en-NZ", value: "exhaust" },
      { locale: "en-GB", value: "exhaust" },
      { locale: "en-US", value: "exhaust system" },
      { locale: "zh-CN", value: "排气系统" },
    ],
  },
  {
    term: "dyno-tune",
    sourceLocale: "en-AU",
    partOfSpeech: "verb",
    definition: "Tune on a dynamometer. Hyphenated, lowercase, except at sentence start.",
    translations: [
      { locale: "en-NZ", value: "dyno-tune" },
      { locale: "en-GB", value: "dyno-tune" },
      { locale: "en-US", value: "dyno-tune" },
      { locale: "zh-CN", value: "马力机调校" },
    ],
  },
  {
    term: "Wollongong",
    sourceLocale: "en-AU",
    partOfSpeech: "noun",
    definition: "Suburb name. Preserve spelling and capitalisation across all locales.",
    doNotTranslate: true,
    caseSensitive: true,
    translations: [
      { locale: "en-NZ", value: "Wollongong" },
      { locale: "en-GB", value: "Wollongong" },
      { locale: "en-US", value: "Wollongong" },
      { locale: "zh-CN", value: "Wollongong" },
    ],
  },
  {
    term: "Shellharbour",
    sourceLocale: "en-AU",
    partOfSpeech: "noun",
    definition: "Suburb name. Preserve spelling and capitalisation.",
    doNotTranslate: true,
    caseSensitive: true,
    translations: [
      { locale: "en-NZ", value: "Shellharbour" },
      { locale: "en-GB", value: "Shellharbour" },
      { locale: "en-US", value: "Shellharbour" },
      { locale: "zh-CN", value: "Shellharbour" },
    ],
  },
  {
    term: "extractors",
    sourceLocale: "en-AU",
    partOfSpeech: "noun",
    definition: "AU term for exhaust headers. US English uses \"headers\".",
    translations: [
      { locale: "en-NZ", value: "extractors" },
      { locale: "en-GB", value: "manifold / extractors" },
      { locale: "en-US", value: "headers" },
      { locale: "zh-CN", value: "排气歧管" },
    ],
  },
  {
    term: "ute",
    sourceLocale: "en-AU",
    partOfSpeech: "noun",
    definition: "Utility vehicle. Avoid the literal \"utility\" in US copy; use \"pickup\".",
    translations: [
      { locale: "en-NZ", value: "ute" },
      { locale: "en-GB", value: "pick-up" },
      { locale: "en-US", value: "pickup" },
      { locale: "zh-CN", value: "皮卡" },
    ],
  },
]

export const MT_PREVIEW_PRIMARY: MtPreviewCardProps = {
  sourceLocale: "en-AU",
  targetLocale: "zh-CN",
  sourceString:
    "Book your Mufflermen Wollongong fit-out. We'll dyno-tune your exhaust before you collect.",
  variants: [
    {
      engine: "deepl",
      value:
        "预订您的 Mufflermen Wollongong 安装服务。我们会在您取车前为您的排气系统做马力机调校。",
      confidence: 0.93,
      latencyMs: 240,
    },
    {
      engine: "google",
      value:
        "预订您的 Mufflermen Wollongong 装配。我们将在您取车前对排气进行马力机调校。",
      confidence: 0.88,
      latencyMs: 180,
    },
    {
      engine: "azure",
      value:
        "预订您的 Mufflermen Wollongong 装配预约。取车前我们会用马力机调校排气。",
      confidence: 0.71,
      latencyMs: 320,
    },
    {
      engine: "internal",
      value: "在 Wollongong 预约 Mufflermen 安装,提车前调试您的排气系统。",
      confidence: 0.58,
      latencyMs: 60,
    },
  ],
}

export const MT_PREVIEW_NZ: MtPreviewCardProps = {
  sourceLocale: "en-AU",
  targetLocale: "en-NZ",
  sourceString:
    "Fits Ford Ranger PX III with the 3.2 TDCi. Includes stainless extractors and a Wollongong-fab cat-back.",
  variants: [
    {
      engine: "internal",
      value:
        "Fits Ford Ranger PX III with the 3.2 TDCi. Includes stainless extractors and a Wollongong-made cat-back.",
      confidence: 0.97,
      latencyMs: 30,
    },
    {
      engine: "deepl",
      value:
        "Fits Ford Ranger PX III with the 3.2 TDCi. Includes stainless extractors and a Wollongong-fabricated cat-back.",
      confidence: 0.94,
      latencyMs: 180,
    },
  ],
}

export const FALLBACK_PRIMARY: FallbackRuleCardProps = {
  locale: "zh-CN",
  initialChain: ["zh-CN", ...MUFFLERMEN_FALLBACK_CHAIN],
  policy: "show-source",
  note: "Roadmap locale — defer to en-AU until coverage hits 75%.",
}

export const FALLBACK_NZ: FallbackRuleCardProps = {
  locale: "en-NZ",
  initialChain: ["en-NZ", "en-AU", "en-GB"],
  policy: "show-source",
  note: "97% coverage — fallback chain rarely fires.",
}

export const FALLBACK_AR: FallbackRuleCardProps = {
  locale: "ar-SA",
  initialChain: ["ar-SA", "en-GB", "en-AU"],
  policy: "show-key",
  note: "Key visibility keeps engineering reviewing missing terminology.",
}

export const STRING_KEY_ROWS: ReadonlyArray<StringKeyRowProps> = [
  {
    translationKey: "checkout.cta.confirm",
    namespace: "checkout",
    sourceLocale: "en-AU",
    sourceString:
      "Choose your matched sports exhaust system. Mufflermen will dyno-tune it before delivery.",
    usageCount: 4,
    lastEdited: "2026-05-26",
    lastEditor: "Brad Sterling",
    critical: true,
  },
  {
    translationKey: "parts.detail.fitment",
    namespace: "parts",
    sourceLocale: "en-AU",
    sourceString:
      "Fits 2018+ Ford Ranger PX III / Raptor with the 3.2 TDCi and 2.0 Bi-Turbo. Includes Wollongong-fab stainless hangers.",
    usageCount: 28,
    lastEdited: "2026-05-22",
    lastEditor: "Jase Moretti",
  },
  {
    translationKey: "booking.confirmation.headline",
    namespace: "booking",
    sourceLocale: "en-AU",
    sourceString: "You're booked in. See you at Oak Flats.",
    usageCount: 7,
    lastEdited: "2026-05-19",
    lastEditor: "Brad Sterling",
    critical: true,
  },
  {
    translationKey: "parts.search.empty",
    namespace: "parts",
    sourceLocale: "en-AU",
    sourceString:
      "No parts matched your filters. Try a different category or call the Shellharbour shop.",
    usageCount: 12,
    lastEdited: "2026-05-15",
  },
  {
    translationKey: "errors.payment.declined",
    namespace: "errors",
    sourceLocale: "en-AU",
    sourceString:
      "Your bank declined the payment. Try another card or pay in-store at Oak Flats.",
    usageCount: 3,
    lastEdited: "2026-05-12",
    lastEditor: "Jase Moretti",
    critical: true,
  },
]

/** Naive but accurate-for-fixture English CLDR plural selector. */
export function englishPluralSelector(count: number): CldrPluralCategory {
  return count === 1 ? "one" : "other"
}

/** Chinese has only "other" for all numbers in CLDR. */
export function chinesePluralSelector(): CldrPluralCategory {
  return "other"
}

/** Russian-style plural fixture (zero/one/few/many/other) for showcase variety. */
export function richPluralSelector(count: number): CldrPluralCategory {
  if (count === 0) return "zero"
  if (count === 1) return "one"
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "few"
  if (mod10 === 0 || (mod10 >= 5 && mod10 <= 9) || (mod100 >= 11 && mod100 <= 14)) {
    return "many"
  }
  return "other"
}

export const PLURAL_EN_FORMS: ReadonlyArray<PluralizationEditorForm> = [
  { category: "one", template: "{count} part in your build" },
  { category: "other", template: "{count} parts in your build" },
]

export const PLURAL_ZH_FORMS: ReadonlyArray<PluralizationEditorForm> = [
  { category: "other", template: "{count} 件配件已选" },
]

export const PLURAL_RU_FORMS: ReadonlyArray<PluralizationEditorForm> = [
  { category: "zero", template: "В сборке нет деталей" },
  { category: "one", template: "{count} деталь в сборке" },
  { category: "few", template: "{count} детали в сборке" },
  { category: "many", template: "{count} деталей в сборке" },
  { category: "other", template: "{count} деталей в сборке" },
]

export const INTERPOLATION_PRIMARY: InterpolationPanelProps = {
  locale: "en-AU",
  template:
    "G'day {customerName}, your {vehicleModel} cat-back is booked in for {date} at {suburb}. We'll text {phone} when it's done.",
  variables: [
    { name: "customerName", sample: "Brad", description: "Customer first name." },
    { name: "vehicleModel", sample: "Ranger PX III", description: "Vehicle model and gen." },
    { name: "date", sample: "Mon 1 Jun, 9:30am", description: "Booking date and time, AU short format." },
    { name: "suburb", sample: "Oak Flats", description: "Workshop suburb." },
    { name: "phone", sample: "0412 555 902", description: "Customer mobile number." },
    { name: "loyaltyTier", sample: "Bronze", description: "Loyalty tier — unused on this string but available." },
  ],
}

export const INTERPOLATION_ZH: InterpolationPanelProps = {
  locale: "zh-CN",
  template:
    "{customerName} 您好,您的 {vehicleModel} 排气安装已预约 {date},地点 {suburb}。完工后我们将致电 {phone}。",
  variables: [
    { name: "customerName", sample: "李伟", description: "客户姓名" },
    { name: "vehicleModel", sample: "Ranger PX III", description: "车型" },
    { name: "date", sample: "6月1日(周一)09:30", description: "预约日期" },
    { name: "suburb", sample: "Oak Flats", description: "门店所在郊区" },
    { name: "phone", sample: "0412 555 902", description: "客户手机号" },
  ],
}

export const RTL_TILE_PRIMARY: RightToLeftTileProps = {
  locale: "ar-SA",
  headline: "نظام عادم رياضي مُعاير على الـ Dyno",
  body:
    "احجز جلسة تركيب في Wollongong. سنقوم بضبط نظام العادم على الدينو قبل تسليم السيارة.",
  cta: "احجز الآن",
  meta: "AUD 2,450",
  initialMirror: true,
}

export const RTL_TILE_LTR: RightToLeftTileProps = {
  locale: "en-AU",
  headline: "Dyno-tuned sports exhaust system",
  body:
    "Book a fit-out at Wollongong. We'll dyno-tune your exhaust before you collect at Oak Flats.",
  cta: "Book now",
  meta: "AUD 2,450",
}

export const TRANSLATION_MEMORY_ROWS: ReadonlyArray<TranslationMemoryRowProps> = [
  {
    sourceLocale: "en-AU",
    targetLocale: "zh-CN",
    source: "Choose your matched sports exhaust system.",
    target: "选择您匹配的运动排气系统。",
    score: 1,
    context: "checkout.cta.confirm",
    contributor: "Wei Zhang · 2026-05-12",
  },
  {
    sourceLocale: "en-AU",
    targetLocale: "zh-CN",
    source: "Book your Mufflermen fit-out at Wollongong.",
    target: "预订您的 Mufflermen Wollongong 安装服务。",
    score: 0.92,
    context: "marketing.hero.cta",
    contributor: "Wei Zhang · 2026-04-30",
  },
  {
    sourceLocale: "en-AU",
    targetLocale: "zh-CN",
    source: "Mufflermen will dyno-tune it before delivery.",
    target: "Mufflermen 会在交付前做马力机调校。",
    score: 0.78,
    context: "checkout.cta.confirm (partial)",
    contributor: "Internal MT · 2026-05-20",
  },
  {
    sourceLocale: "en-AU",
    targetLocale: "en-NZ",
    source: "Fits 2018+ Ford Ranger PX III / Raptor with the 3.2 TDCi.",
    target: "Fits 2018+ Ford Ranger PX III / Raptor with the 3.2 TDCi.",
    score: 1,
    context: "parts.detail.fitment",
    contributor: "Brad Sterling · 2026-05-08",
  },
  {
    sourceLocale: "en-AU",
    targetLocale: "en-US",
    source: "Stainless extractors and a Wollongong-fab cat-back.",
    target: "Stainless headers and a Wollongong-fabricated cat-back.",
    score: 0.71,
    context: "parts.detail.fitment",
    contributor: "Jase Moretti · 2026-04-22",
  },
]

export const STYLE_GUIDE_AU: StyleGuideCardProps = {
  locale: "en-AU",
  label: "English (Australia)",
  tone: "casual",
  formality: "informal",
  voiceSummary:
    "Direct, blokey, no-nonsense. Speak like Brad behind the counter at Oak Flats. Use Aussie shorthand (\"ute\", \"extractors\", \"servo\") and skip the corporate polish.",
  quirks: [
    "extractors not headers",
    "ute not utility",
    "Wollongong / Shellharbour preserved",
    "Mufflermen never split or translated",
    "dyno-tune lowercase, hyphenated",
  ],
  examples: [
    {
      context: "Hero headline",
      good: "Real exhausts, dyno-tuned in Wollongong.",
      bad: "Premium exhaust solutions, expertly calibrated in our Wollongong facility.",
    },
    {
      context: "Booking confirmation",
      good: "You're booked in. See you at Oak Flats.",
      bad: "Your booking has been confirmed. We look forward to welcoming you.",
    },
  ],
}

export const STYLE_GUIDE_ZH: StyleGuideCardProps = {
  locale: "zh-CN",
  label: "Chinese (Simplified)",
  tone: "neutral",
  formality: "neutral",
  voiceSummary:
    "中立、清晰、技术性。读者多为澳洲华人车主,熟悉澳洲改装文化但偏好简体中文界面。保留品牌名和郊区名,技术词汇用业界通用译法。",
  quirks: [
    "Mufflermen 始终保留英文",
    "Wollongong / Shellharbour 始终保留英文",
    "Oak Flats 始终保留英文",
    "排气系统 not 消声器",
    "马力机调校 for dyno-tune",
  ],
  examples: [
    {
      context: "首页主标题",
      good: "Mufflermen 真排气,Wollongong 马力机调校。",
      bad: "Mufflermen 的优质消声器解决方案。",
    },
    {
      context: "预订确认",
      good: "预约成功,Oak Flats 见。",
      bad: "您的预订已被接收,我们期待您的到来。",
    },
  ],
}

export const IMPORT_EXPORT_CARDS: ReadonlyArray<ImportExportCardProps> = [
  {
    operation: "export",
    format: "xliff",
    locales: ["zh-CN", "ar-SA"],
    actionLabel: "Download XLIFF",
    note: "Includes glossary lock and \"do not translate\" markers for Mufflermen, Wollongong, Shellharbour, Oak Flats.",
    stats: [
      { label: "Strings", value: "788" },
      { label: "Namespaces", value: "6" },
      { label: "Glossary terms", value: "42" },
    ],
  },
  {
    operation: "import",
    format: "xliff",
    locales: ["zh-CN"],
    progress: 0.62,
    actionLabel: "Resume import",
    note: "Vendor: Lionbridge AU. Auto-validates against the QA ruleset on completion.",
    stats: [
      { label: "Strings", value: "412 / 664" },
      { label: "Fuzzy hits", value: "118" },
    ],
  },
  {
    operation: "export",
    format: "csv",
    locales: ["en-NZ", "en-GB", "en-US"],
    actionLabel: "Export CSV",
    stats: [
      { label: "Rows", value: "1,402" },
      { label: "Columns", value: "5" },
    ],
  },
  {
    operation: "export",
    format: "tmx",
    locales: ["en-AU", "en-NZ", "en-GB", "en-US", "zh-CN"],
    actionLabel: "Sync TMX",
    progress: 1,
    note: "Last sync to vendor TM 4h ago. 12,408 segments.",
  },
]

export const QA_ISSUE_ROWS: ReadonlyArray<QaIssueRowProps> = [
  {
    translationKey: "checkout.cta.confirm",
    locale: "zh-CN",
    kind: "missing-variable",
    severity: "error",
    ruleCode: "L10N-VAR-001",
    message:
      "Target string is missing {customerName} from the source template.",
    snippet:
      "Source:  Hi {customerName}, confirm your build?\nTarget: 您好,确认您的方案?",
  },
  {
    translationKey: "parts.detail.fitment",
    locale: "zh-CN",
    kind: "length-overflow",
    severity: "warning",
    ruleCode: "L10N-LEN-002",
    message: "Target exceeds the 200-character UI budget by 38 characters.",
    snippet: "适用于 2018 年及以后的福特 Ranger PX III 与 Raptor 车型(配备 3.2 TDCi 与 2.0 Bi-Turbo 引擎),包含 Wollongong 手工制造的不锈钢吊架,确保安装稳固耐久,适合长途巡航与重载使用。",
  },
  {
    translationKey: "marketing.hero.bigClaim",
    locale: "en-US",
    kind: "formality-drift",
    severity: "info",
    ruleCode: "L10N-TONE-004",
    message: "Translation reads more formal than the en-AU casual voice.",
    snippet: "Premium calibrated exhaust solutions for the discerning enthusiast.",
  },
  {
    translationKey: "errors.payment.declined",
    locale: "ar-SA",
    kind: "untranslated",
    severity: "error",
    ruleCode: "L10N-COV-007",
    message: "Key has not been translated; en-AU source is still being shown.",
    snippet: "Your bank declined the payment. Try another card or pay in-store at Oak Flats.",
  },
  {
    translationKey: "parts.search.empty",
    locale: "zh-CN",
    kind: "tag-mismatch",
    severity: "warning",
    ruleCode: "L10N-TAG-003",
    message: "Closing </strong> tag is missing from the target.",
    snippet:
      "Source: No parts matched. <strong>Call Shellharbour</strong> for help.\nTarget: 未找到配件。<strong>请致电 Shellharbour 寻求帮助。",
  },
]
