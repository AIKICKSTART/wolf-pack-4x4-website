import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "theming",
  "title": "Theming",
  "group": "Foundations",
  "summary": "Umbrella token-cascade theming kit: a ThemeController that scopes every --primitive-* token on one wrapper plus preset, inspector, color/font picker, export, and live-preview surfaces that re-skin the whole subtree.",
  "entries": [
    {
      "key": "theming/theme-controller",
      "family": "theming",
      "name": "ThemeController",
      "label": "Theme controller",
      "description": "Context provider that holds the active preset and per-token overrides and writes every --primitive-* CSS var onto one wrapper element so the subtree re-skins in a single paint.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/theming",
      "tags": [
        "theme",
        "tokens",
        "context",
        "provider"
      ],
      "status": "captured"
    },
    {
      "key": "theming/theme-preset-picker",
      "family": "theming",
      "name": "ThemePresetPicker",
      "label": "Preset picker",
      "description": "Accessible radiogroup of preset cards with token swatches that rewrites every controller token when a preset is selected.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/theming",
      "routeHref": "/ui-primitives/theming/presets",
      "tags": [
        "theme",
        "presets",
        "radiogroup",
        "swatches"
      ],
      "status": "captured"
    },
    {
      "key": "theming/token-inspector",
      "family": "theming",
      "name": "TokenInspector",
      "label": "Token inspector",
      "description": "Live DataTable of every controllable token showing label, CSS var, type, preview swatch/typeface, current value, and a copy chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/theming",
      "routeHref": "/ui-primitives/theming/inspector",
      "tags": [
        "theme",
        "tokens",
        "inspector",
        "table"
      ],
      "status": "captured"
    },
    {
      "key": "theming/token-color-picker",
      "family": "theming",
      "name": "TokenColorPicker",
      "label": "Token color picker",
      "description": "Per-token colour control pairing a native colour swatch input with a free-text field that accepts hex, rgba, oklch, or named CSS values.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/theming",
      "routeHref": "/ui-primitives/theming/color-picker",
      "tags": [
        "theme",
        "color",
        "input",
        "token"
      ],
      "status": "captured"
    },
    {
      "key": "theming/token-font-picker",
      "family": "theming",
      "name": "TokenFontPicker",
      "label": "Token font picker",
      "description": "Per-token typography control: a select of curated font-family stacks with a live specimen preview, active only for type-category tokens.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/theming",
      "routeHref": "/ui-primitives/theming/font-picker",
      "tags": [
        "theme",
        "typography",
        "font",
        "select"
      ],
      "status": "captured"
    },
    {
      "key": "theming/theme-export-panel",
      "family": "theming",
      "name": "ThemeExportPanel",
      "label": "Theme export panel",
      "description": "Tabbed export surface that serialises the current token values into CSS :root, JSON, or a Tailwind config stub with a copy-to-clipboard action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/theming",
      "routeHref": "/ui-primitives/theming/export",
      "tags": [
        "theme",
        "export",
        "css",
        "tailwind"
      ],
      "status": "captured"
    },
    {
      "key": "theming/umbrella-preview",
      "family": "theming",
      "name": "UmbrellaPreview",
      "label": "Umbrella preview",
      "description": "Bento grid of representative primitives (stat tiles, sparkline, avatars, chips, radial meter, progress bars) that all read the same controller tokens to demonstrate the live cascade.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/theming",
      "routeHref": "/ui-primitives/theming/umbrella-preview",
      "tags": [
        "theme",
        "preview",
        "bento",
        "cascade"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
