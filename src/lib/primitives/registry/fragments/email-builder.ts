import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "email-builder",
  "title": "Email builder",
  "group": "Marketing",
  "summary": "14 email-campaign authoring primitives — a drag-design canvas, block palette, style inspector, deliverability + spam tooling, personalisation, theming, template library, and click-heatmap analytics for the Mufflermen newsletter builder.",
  "entries": [
    {
      "key": "email-builder/email-canvas",
      "family": "email-builder",
      "name": "EmailCanvas",
      "label": "Email canvas",
      "description": "Drag-design surface that renders email blocks as draggable cards in a 600px column with inbox chrome (subject, from-line, drop zones), composed over the form-builder FormCanvas.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/email-canvas",
      "tags": [
        "email",
        "drag-drop",
        "canvas",
        "builder"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/block-library-palette",
      "family": "email-builder",
      "name": "BlockLibraryPalette",
      "label": "Block library palette",
      "description": "Left-rail palette of drag-from email block kinds (heading, image, button, columns, social, footer, HTML, etc.), mapping each kind to a stable tone/icon via the form-builder FieldPalette.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/block-library-palette",
      "tags": [
        "email",
        "palette",
        "blocks",
        "drag-drop"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/style-inspector-pane",
      "family": "email-builder",
      "name": "StyleInspectorPane",
      "label": "Style inspector pane",
      "description": "Right-rail inspector for the selected block exposing colour and font token pickers, padding/margin range sliders, and an alignment chip radiogroup.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/style-inspector-pane",
      "tags": [
        "email",
        "inspector",
        "styling",
        "tokens"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/mobile-preview-toggle",
      "family": "email-builder",
      "name": "MobilePreviewToggle",
      "label": "Mobile preview toggle",
      "description": "Preview control bar switching device (mobile 375px / desktop 600px), scale (75/100/125%), and a light/dark email-client mode switch.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/mobile-preview-toggle",
      "tags": [
        "email",
        "preview",
        "responsive",
        "toggle"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/inline-image-upload",
      "family": "email-builder",
      "name": "InlineImageUpload",
      "label": "Inline image upload",
      "description": "Image-block editor with a drag-and-drop / browse / asset-library drop zone, alt-text and link-target fields, and a retina @2x serving toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/inline-image-upload",
      "tags": [
        "email",
        "image",
        "upload",
        "assets"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/personalization-token-picker",
      "family": "email-builder",
      "name": "PersonalizationTokenPicker",
      "label": "Personalisation token picker",
      "description": "Searchable listbox of merge tokens (first name, rego, quote total) with a live sample-preview code snippet and insert action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/personalization-token-picker",
      "tags": [
        "email",
        "personalisation",
        "merge-tokens",
        "picker"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/send-test-email-card",
      "family": "email-builder",
      "name": "SendTestEmailCard",
      "label": "Send test email card",
      "description": "Card to send a test send to recipient chips (TagInput) with an A/B/C variant chip selector and animated idle/sending/sent status feedback.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/send-test-email-card",
      "tags": [
        "email",
        "test-send",
        "variants",
        "recipients"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/preheader-editor",
      "family": "email-builder",
      "name": "PreheaderEditor",
      "label": "Preheader editor",
      "description": "Subject + preheader editor with per-field character counters, live spam-trigger-word detection chips, and an inbox-row preview of how the email lands.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/preheader-editor",
      "tags": [
        "email",
        "subject",
        "preheader",
        "spam-check"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/footer-assembler",
      "family": "email-builder",
      "name": "FooterAssembler",
      "label": "Footer assembler",
      "description": "Compliance-footer builder for mailing address, unsubscribe label, dismissible legal-link chips, and a social-row toggle, with a token-styled live preview.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/footer-assembler",
      "tags": [
        "email",
        "footer",
        "compliance",
        "unsubscribe"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/spam-score-check",
      "family": "email-builder",
      "name": "SpamScoreCheck",
      "label": "Spam score check",
      "description": "Deliverability panel showing a clamped 0-10 spam score with severity tone, analysed subject/body excerpt, a high-severity alert, and an ignorable/restorable warnings list.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/spam-score-check",
      "tags": [
        "email",
        "spam",
        "deliverability",
        "score"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/html-output-viewer",
      "family": "email-builder",
      "name": "HtmlOutputViewer",
      "label": "HTML output viewer",
      "description": "Tabbed source viewer rendering the generated HTML, CSS-inlined send-ready markup, and plain-text fallback via the CodeBlock primitive.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/html-output-viewer",
      "tags": [
        "email",
        "html",
        "source",
        "export"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/email-theme-picker",
      "family": "email-builder",
      "name": "EmailThemePicker",
      "label": "Email theme picker",
      "description": "Radiogroup grid of email theme presets, each shown as a mini paper/ink/accent thumbnail mock with name and description for a starting tone.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/email-theme-picker",
      "tags": [
        "email",
        "theme",
        "presets",
        "picker"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/saved-template-list",
      "family": "email-builder",
      "name": "SavedTemplateList",
      "label": "Saved template list",
      "description": "Sortable, zebra DataTable of saved email templates with thumbnail, name, last-edited, send count, and open/duplicate/archive row actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/saved-template-list",
      "tags": [
        "email",
        "templates",
        "table",
        "library"
      ],
      "status": "captured"
    },
    {
      "key": "email-builder/click-heat-map",
      "family": "email-builder",
      "name": "ClickHeatMap",
      "label": "Click heatmap",
      "description": "Campaign analytics overlay plotting per-link CTR hotspots over an email preview alongside a daily-click HeatmapCalendar and a ranked hot/warm/cool/cold spot list.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/email-builder",
      "routeHref": "/ui-primitives/email-builder/click-heat-map",
      "tags": [
        "email",
        "analytics",
        "heatmap",
        "ctr"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
