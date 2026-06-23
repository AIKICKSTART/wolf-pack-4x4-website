import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "branding",
  "title": "Branding",
  "group": "Foundations",
  "summary": "14 brand-identity primitives — logo lockups and mark builder, palette/colour-role/contrast tooling, type pairing, voice and tone, do/don't and pattern references, favicon and asset grids, plus a full brand-guidelines page template.",
  "entries": [
    {
      "key": "branding/logo-lockup",
      "family": "branding",
      "name": "LogoLockup",
      "label": "Logo lockup",
      "description": "Renders one of four logo lockup variants (stacked, horizontal, mark-only, wordmark-only) with mark, wordmark, tagline, and a usage/min-size spec.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/logo-lockup",
      "tags": [
        "logo",
        "identity",
        "lockup"
      ],
      "status": "captured"
    },
    {
      "key": "branding/logo-mark-builder",
      "family": "branding",
      "name": "LogoMarkBuilder",
      "label": "Logo mark builder",
      "description": "Interactive builder that previews an OFM logo mark while toggling shape, tone, and stroke treatment via pill controls.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/logo-mark-builder",
      "tags": [
        "logo",
        "builder",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "branding/palette-extractor",
      "family": "branding",
      "name": "PaletteExtractor",
      "label": "Palette extractor",
      "description": "Selectable source-frame swatch panel that surfaces five representative colours and their semantic role per chosen frame.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/palette-extractor",
      "tags": [
        "color",
        "palette",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "branding/color-roles-grid",
      "family": "branding",
      "name": "ColorRolesGrid",
      "label": "Colour roles grid",
      "description": "Card grid mapping each brand tone to a semantic role, showing a foreground/background preview plus surface and ink hex specs.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/color-roles-grid",
      "tags": [
        "color",
        "semantic",
        "grid"
      ],
      "status": "captured"
    },
    {
      "key": "branding/mood-board",
      "family": "branding",
      "name": "MoodBoard",
      "label": "Mood board",
      "description": "Masonry composition of pinned reference tiles (image, swatch, texture, type, quote) with optional spans and backgrounds.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/mood-board",
      "tags": [
        "mood",
        "references",
        "masonry"
      ],
      "status": "captured"
    },
    {
      "key": "branding/type-pairing-card",
      "family": "branding",
      "name": "TypePairingCard",
      "label": "Type pairing card",
      "description": "Card displaying a display/body font pairing with live heading and body samples, font specs, and a rationale.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/type-pairing-card",
      "tags": [
        "typography",
        "pairing",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "branding/tone-of-voice-card",
      "family": "branding",
      "name": "ToneOfVoiceCard",
      "label": "Tone of voice card",
      "description": "Voice-and-tone card listing brand attributes, a summary, and paired do/don't copy examples.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/tone-of-voice-card",
      "tags": [
        "voice",
        "tone",
        "copy"
      ],
      "status": "captured"
    },
    {
      "key": "branding/brand-do-dont-card",
      "family": "branding",
      "name": "BrandDoDontCard",
      "label": "Brand do/don't card",
      "description": "Two-column rule card contrasting a correct (do) and incorrect (don't) treatment, each with a glyph, optional visual, label, and note.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/brand-do-dont-card",
      "tags": [
        "guidelines",
        "do-dont",
        "rules"
      ],
      "status": "captured"
    },
    {
      "key": "branding/favicon-preview",
      "family": "branding",
      "name": "FaviconPreview",
      "label": "Favicon preview",
      "description": "Renders the brand mark across favicon sizes (16/32/180/192) with a browser-tab strip mockup and per-size usage captions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/favicon-preview",
      "tags": [
        "favicon",
        "icon",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "branding/logo-asset-grid",
      "family": "branding",
      "name": "LogoAssetGrid",
      "label": "Logo asset grid",
      "description": "Downloadable logo asset library grid showing each variation's surface treatment, description, and available file formats.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/logo-asset-grid",
      "tags": [
        "logo",
        "assets",
        "download"
      ],
      "status": "captured"
    },
    {
      "key": "branding/brand-voice-slider",
      "family": "branding",
      "name": "BrandVoiceSlider",
      "label": "Brand voice slider",
      "description": "Set of range sliders calibrating the brand's position along each voice spectrum, with live percentage values and helper text.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/brand-voice-slider",
      "tags": [
        "voice",
        "slider",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "branding/accessibility-contrast-grid",
      "family": "branding",
      "name": "AccessibilityContrastGrid",
      "label": "Accessibility contrast grid",
      "description": "Foreground-by-background matrix showing precomputed WCAG contrast ratios and AAA/AA/AA-large/fail pass-fail badges per cell.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/accessibility-contrast-grid",
      "tags": [
        "accessibility",
        "contrast",
        "wcag"
      ],
      "status": "captured"
    },
    {
      "key": "branding/pattern-library-tile",
      "family": "branding",
      "name": "PatternLibraryTile",
      "label": "Pattern library tile",
      "description": "Tile rendering one of six SVG brand textures (carbon-fibre, diamond-plate, herringbone, dots, hatch, brushed-metal) with name, usage, and id.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/pattern-library-tile",
      "tags": [
        "pattern",
        "texture",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "branding/brand-guidelines-page-template",
      "family": "branding",
      "name": "BrandGuidelinesPageTemplate",
      "label": "Brand guidelines page template",
      "description": "Full brand-book page composition with a cover, table of contents, numbered chapter sections, and a colophon footer.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/branding",
      "routeHref": "/ui-primitives/branding/brand-guidelines-page-template",
      "tags": [
        "guidelines",
        "template",
        "page"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
