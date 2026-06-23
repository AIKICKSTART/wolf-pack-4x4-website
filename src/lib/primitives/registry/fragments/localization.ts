import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "localization",
  "title": "Localization",
  "group": "System",
  "summary": "14 internationalization primitives — locale/region/currency/date/number formatting demos plus a translation-workflow toolkit (key rows, progress meters, glossary, RTL toggle, pluralization, string extraction, translation memory, coverage matrix, time-zone strip), all driven by the Intl API and a shared LocaleSummary/RTL-tag contract.",
  "entries": [
    {
      "key": "localization/language-switcher",
      "family": "localization",
      "name": "LanguageSwitcher",
      "label": "Language switcher",
      "description": "Searchable popover listbox of interface languages with flags, endonyms, and RTL chips; emits the selected BCP-47 tag.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/language-switcher",
      "tags": [
        "i18n",
        "switcher",
        "listbox",
        "rtl"
      ],
      "status": "captured"
    },
    {
      "key": "localization/region-switcher",
      "family": "localization",
      "name": "RegionSwitcher",
      "label": "Region switcher",
      "description": "Radiogroup of region tiles showing timezone, currency, and measurement-system defaults; emits the selected region id.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/region-switcher",
      "tags": [
        "i18n",
        "region",
        "radiogroup"
      ],
      "status": "captured"
    },
    {
      "key": "localization/currency-formatter-demo",
      "family": "localization",
      "name": "CurrencyFormatterDemo",
      "label": "Currency formatter",
      "description": "Renders one amount formatted as currency across multiple locales via Intl.NumberFormat with symbol display.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/currency-formatter",
      "tags": [
        "i18n",
        "currency",
        "intl",
        "format"
      ],
      "status": "captured"
    },
    {
      "key": "localization/date-format-demo",
      "family": "localization",
      "name": "DateFormatDemo",
      "label": "Date format demo",
      "description": "Shows a single ISO instant formatted per locale with Intl.DateTimeFormat, including RTL direction handling.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/date-format",
      "tags": [
        "i18n",
        "date",
        "intl",
        "format"
      ],
      "status": "captured"
    },
    {
      "key": "localization/number-format-demo",
      "family": "localization",
      "name": "NumberFormatDemo",
      "label": "Number format demo",
      "description": "Table comparing a number plus distance/weight/temperature unit formatting across locales via Intl.NumberFormat.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/number-format",
      "tags": [
        "i18n",
        "number",
        "units",
        "intl"
      ],
      "status": "captured"
    },
    {
      "key": "localization/translation-key-row",
      "family": "localization",
      "name": "TranslationKeyRow",
      "label": "Translation key row",
      "description": "Article row for one translation key showing the source string and per-target-locale translation, status, and reviewer state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/translation-key-row",
      "tags": [
        "i18n",
        "translation",
        "workflow"
      ],
      "status": "captured"
    },
    {
      "key": "localization/translation-progress-meter",
      "family": "localization",
      "name": "TranslationProgressMeter",
      "label": "Translation progress meter",
      "description": "List of per-locale coverage meters with tone-coded percentage bars (role=meter) and translated/total counts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/translation-progress",
      "tags": [
        "i18n",
        "progress",
        "meter",
        "coverage"
      ],
      "status": "captured"
    },
    {
      "key": "localization/glossary-card",
      "family": "localization",
      "name": "GlossaryCard",
      "label": "Glossary card",
      "description": "Term card with part-of-speech, per-locale translations, usage note, and a lockable edit toggle.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/glossary-card",
      "tags": [
        "i18n",
        "glossary",
        "terminology"
      ],
      "status": "captured"
    },
    {
      "key": "localization/rtl-layout-toggle",
      "family": "localization",
      "name": "RtlLayoutToggle",
      "label": "RTL layout toggle",
      "description": "LTR/RTL radiogroup that flips the dir of a wrapped preview frame to test logical-property layouts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/rtl-toggle",
      "tags": [
        "i18n",
        "rtl",
        "direction",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "localization/pluralization-tester",
      "family": "localization",
      "name": "PluralizationTester",
      "label": "Pluralization tester",
      "description": "Interactive count input that resolves each locale to its CLDR cardinal plural category via Intl.PluralRules and renders templates.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/pluralization-tester",
      "tags": [
        "i18n",
        "plural",
        "intl",
        "cldr"
      ],
      "status": "captured"
    },
    {
      "key": "localization/string-extraction-row",
      "family": "localization",
      "name": "StringExtractionRow",
      "label": "String extraction row",
      "description": "Per-file panel listing detected literal strings with line numbers, extraction status, and suggested translation keys.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/string-extraction",
      "tags": [
        "i18n",
        "extraction",
        "keys",
        "source"
      ],
      "status": "captured"
    },
    {
      "key": "localization/translation-memory-card",
      "family": "localization",
      "name": "TranslationMemoryCard",
      "label": "Translation memory card",
      "description": "Lists translation-memory hits for a source string with similarity-banded scores and a reuse action per hit.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/translation-memory",
      "tags": [
        "i18n",
        "translation-memory",
        "reuse"
      ],
      "status": "captured"
    },
    {
      "key": "localization/locale-coverage-matrix",
      "family": "localization",
      "name": "LocaleCoverageMatrix",
      "label": "Locale coverage matrix",
      "description": "Feature-by-locale grid with glyph cells (translated/partial/missing/na) and a legend, scrollable for many locales.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/locale-coverage",
      "tags": [
        "i18n",
        "coverage",
        "matrix",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "localization/time-zone-display",
      "family": "localization",
      "name": "TimeZoneDisplay",
      "label": "Time zone display",
      "description": "Live-ticking strip of timezone tiles showing local time, date, and UTC offset per IANA zone, with an optional fixed reference instant.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization",
      "routeHref": "/ui-primitives/localization/time-zone-display",
      "tags": [
        "i18n",
        "timezone",
        "clock",
        "intl"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
