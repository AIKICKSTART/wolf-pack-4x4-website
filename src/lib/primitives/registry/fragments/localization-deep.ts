import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "localization-deep",
  "title": "Localization deep",
  "group": "System",
  "summary": "13 deep localization/translation-management primitives — editor, glossary, MT preview, completeness heat grid, fallback chains, locale switcher, string keys, pluralization, interpolation, RTL preview, translation memory, style guide, import/export and QA rows — sharing the project locale/RTL helpers and tone scales.",
  "entries": [
    {
      "key": "localization-deep/translation-editor",
      "family": "localization-deep",
      "name": "TranslationEditor",
      "label": "Translation editor",
      "description": "Side-by-side source/target editor with char-count meter, length-ratio tone, status + reviewer chips, and applicable MT suggestions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/translation-editor",
      "tags": [
        "translation",
        "editor",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/glossary-row",
      "family": "localization-deep",
      "name": "GlossaryRow",
      "label": "Glossary row",
      "description": "Glossary term row showing source term, part-of-speech, definition, per-locale translations, and do-not-translate / case-sensitive flags.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/glossary-row",
      "tags": [
        "glossary",
        "terminology",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/mt-preview-card",
      "family": "localization-deep",
      "name": "MtPreviewCard",
      "label": "MT preview card",
      "description": "Machine-translation preview with selectable engine radio group, per-engine confidence chips, and a confidence progress bar for the active variant.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/mt-preview-card",
      "tags": [
        "machine-translation",
        "preview",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/completeness-matrix",
      "family": "localization-deep",
      "name": "CompletenessMatrix",
      "label": "Completeness matrix",
      "description": "Namespace x locale completion heat grid with per-cell fill, percentage labels, tone thresholds, and a legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/completeness-matrix",
      "tags": [
        "coverage",
        "data-viz",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/fallback-rule-card",
      "family": "localization-deep",
      "name": "FallbackRuleCard",
      "label": "Fallback rule card",
      "description": "Reorderable locale fallback chain with up/down controls plus a radio group selecting the final miss policy (show source/key/empty).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/fallback-rule-card",
      "tags": [
        "fallback",
        "config",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/locale-switcher",
      "family": "localization-deep",
      "name": "LocaleSwitcher",
      "label": "Locale switcher",
      "description": "Listbox-style locale picker with region shorthand, endonyms, and per-locale completion meters; ships an entryFromSummary type bridge.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/locale-switcher",
      "tags": [
        "locale",
        "picker",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/string-key-row",
      "family": "localization-deep",
      "name": "StringKeyRow",
      "label": "String key row",
      "description": "Translation-key list row showing namespace chip, critical flag, source string, usage count, and last-edit metadata.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/string-key-row",
      "tags": [
        "string-key",
        "list",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/pluralization-editor",
      "family": "localization-deep",
      "name": "PluralizationEditor",
      "label": "Pluralization editor",
      "description": "CLDR plural-form editor with a live count->category preview ticker and one template field per supported plural category.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/pluralization-editor",
      "tags": [
        "pluralization",
        "cldr",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/interpolation-panel",
      "family": "localization-deep",
      "name": "InterpolationPanel",
      "label": "Interpolation panel",
      "description": "Template interpolation previewer that tokenizes {variable} placeholders, renders sample values live, and diagnoses missing/unused tokens.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/interpolation-panel",
      "tags": [
        "interpolation",
        "template",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/right-to-left-tile",
      "family": "localization-deep",
      "name": "RightToLeftTile",
      "label": "Right-to-left tile",
      "description": "RTL preview tile that infers direction from the locale, toggles a mirrored layout, and annotates icon/padding/number mirroring behavior.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/right-to-left-tile",
      "tags": [
        "rtl",
        "preview",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/translation-memory-row",
      "family": "localization-deep",
      "name": "TranslationMemoryRow",
      "label": "Translation memory row",
      "description": "Translation-memory hit row with fuzzy match score, tone-coded segmented meter, source/target snippets, context/contributor meta, and reuse action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/translation-memory-row",
      "tags": [
        "translation-memory",
        "fuzzy-match",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/style-guide-card",
      "family": "localization-deep",
      "name": "StyleGuideCard",
      "label": "Style guide card",
      "description": "Per-locale voice/style guide card with tone + formality chips, a voice summary, quirks list, and do/don't example pairs.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/style-guide-card",
      "tags": [
        "style-guide",
        "voice",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/import-export-card",
      "family": "localization-deep",
      "name": "ImportExportCard",
      "label": "Import/export card",
      "description": "Localization exchange card for import/export of XLIFF/CSV/JSON/PO/TMX with format hint, locale pills, stats, and optional transfer progress.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/import-export-card",
      "tags": [
        "import-export",
        "xliff",
        "i18n"
      ],
      "status": "captured"
    },
    {
      "key": "localization-deep/qa-issue-row",
      "family": "localization-deep",
      "name": "QaIssueRow",
      "label": "QA issue row",
      "description": "Localization QA issue row with severity-coded chips, kind label, optional rule code and snippet, plus resolve/dismiss actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/localization-deep",
      "routeHref": "/ui-primitives/localization-deep/qa-issue-row",
      "tags": [
        "qa",
        "validation",
        "i18n"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
