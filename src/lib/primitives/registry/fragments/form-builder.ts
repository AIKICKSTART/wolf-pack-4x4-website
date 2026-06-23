import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "form-builder",
  "title": "Form builder",
  "group": "Operations",
  "summary": "14 visual form-designer primitives — field palette, drop-zone canvas, field inspector, type icons, preview, theme picker, multi-page wizard, embed-code generator, submission analytics, validation editor, required toggle, default-value editor, and two conditional-logic builders. Visual references only; no real form persistence.",
  "entries": [
    {
      "key": "form-builder/field-palette",
      "family": "form-builder",
      "name": "FieldPalette",
      "label": "Field palette",
      "description": "Left-rail listbox of draggable field types grouped into sections, each row showing a tone-coded type icon, name, hint, and drag grip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/field-palette",
      "tags": [
        "forms",
        "palette",
        "drag-drop"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/form-canvas",
      "family": "form-builder",
      "name": "FormCanvas",
      "label": "Form canvas",
      "description": "Vertical drop-zone canvas listing field cards with idle/hover/active drop states, a selected-field highlight, an empty-state slot, and an ordered index.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/form-canvas",
      "tags": [
        "forms",
        "canvas",
        "drag-drop"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/field-config-pane",
      "family": "form-builder",
      "name": "FieldConfigPane",
      "label": "Field config pane",
      "description": "Right-side inspector for a selected field — label, placeholder, required toggle, default value, validation-rule chips, and a collapsible Advanced section.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/field-config-pane",
      "tags": [
        "forms",
        "inspector",
        "config"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/field-type-icon",
      "family": "form-builder",
      "name": "FieldTypeIcon",
      "label": "Field type icon",
      "description": "Single icon component dispatching 15 inline SVG glyphs (short-text through signature, payment, yes/no), sized by prop with optional accessible label.",
      "kind": "icon",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/field-type-icon",
      "tags": [
        "forms",
        "icon",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/logic-rule-builder",
      "family": "form-builder",
      "name": "LogicRuleBuilder",
      "label": "Logic rule builder",
      "description": "Chip-based show/hide rule editor reading When [field] [operator] [value] then [action] [target], with an add-rule row and per-rule remove control.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/logic-rule-builder",
      "tags": [
        "forms",
        "logic",
        "rules"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/field-preview",
      "family": "form-builder",
      "name": "FieldPreview",
      "label": "Field preview",
      "description": "Respondent-side live preview of a field across four surface themes, rendering type-specific controls for text, dropdown, rating, file upload, signature, payment, and yes/no.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/field-preview",
      "tags": [
        "forms",
        "preview",
        "theme"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/form-theme-picker",
      "family": "form-builder",
      "name": "FormThemePicker",
      "label": "Form theme picker",
      "description": "Radiogroup of theme preset tiles, each with a paper/ink/accent swatch preview and an active selection ring; tracks the chosen theme in local state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/form-theme-picker",
      "tags": [
        "forms",
        "theme",
        "picker"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/multi-page-form-wizard",
      "family": "form-builder",
      "name": "MultiPageFormWizard",
      "label": "Multi-page wizard",
      "description": "Tablist of form pages with per-page field counts, total-field summary, an add-page action, and reorder/duplicate/preview footer controls.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/multi-page-wizard",
      "tags": [
        "forms",
        "wizard",
        "pagination"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/embed-code-generator",
      "family": "form-builder",
      "name": "EmbedCodeGenerator",
      "label": "Embed code generator",
      "description": "Embed-mode radiogroup (inline/popup/slider/fullscreen) that builds a copy-ready HTML snippet rendered through the shared CodeBlock primitive.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/embed-code",
      "tags": [
        "forms",
        "embed",
        "code"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/submission-analytics-card",
      "family": "form-builder",
      "name": "SubmissionAnalyticsCard",
      "label": "Submission analytics",
      "description": "Analytics card with total-submission and average-time KPIs, an SVG completion gauge, and tone-coded per-field drop-off bars.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/submission-analytics",
      "tags": [
        "forms",
        "analytics",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/validation-rules-editor",
      "family": "form-builder",
      "name": "ValidationRulesEditor",
      "label": "Validation editor",
      "description": "List of validation rules rendered as aria-pressed toggle chips with optional hints, a field-type-tuned subtitle, and an add-custom-rule footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/validation-editor",
      "tags": [
        "forms",
        "validation",
        "rules"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/required-toggle-chip",
      "family": "form-builder",
      "name": "RequiredToggleChip",
      "label": "Required toggle chip",
      "description": "Compact aria-pressed toggle chip with a red asterisk indicator and an On/Off micro-label, tracking required state on click.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/required-toggle",
      "tags": [
        "forms",
        "toggle",
        "chip"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/default-value-editor",
      "family": "form-builder",
      "name": "DefaultValueEditor",
      "label": "Default value editor",
      "description": "Field-type-adaptive default-value editor rendering the appropriate control (text, number stepper, currency, date, dropdown, multi-select chips, rating, yes/no, file row) with clear-default footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/default-value-editor",
      "tags": [
        "forms",
        "default-value",
        "config"
      ],
      "status": "captured"
    },
    {
      "key": "form-builder/conditional-logic-visualizer",
      "family": "form-builder",
      "name": "ConditionalLogicVisualizer",
      "label": "Conditional logic flow",
      "description": "Source-to-target dependency graph laying out fields in two columns with tone-coded SVG bezier edges per action and an action legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/form-builder",
      "routeHref": "/ui-primitives/form-builder/conditional-logic-flow",
      "tags": [
        "forms",
        "logic",
        "data-viz"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
