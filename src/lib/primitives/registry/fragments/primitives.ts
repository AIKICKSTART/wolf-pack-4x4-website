import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "primitives",
  "title": "Primitives",
  "group": "Foundations",
  "summary": "21 foundational UI primitives — avatars, chips, keyboard keys, skeletons, progress, stat tiles, empty states, toasts, popovers, drawers, a command bar, tag input, breadcrumb, pagination, code block, quote bubble, marquee, count-up, and confetti — used across dashboards and content surfaces.",
  "entries": [
    {
      "key": "primitives/avatar",
      "family": "primitives",
      "name": "Avatar",
      "label": "Avatar",
      "description": "Image or initials avatar in four sizes and five tones with an optional presence status dot.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "identity",
        "presence",
        "image"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/chip",
      "family": "primitives",
      "name": "Chip",
      "label": "Chip",
      "description": "Toggleable, optionally dismissible labeled chip with icon, tone variants, and keyboard handling.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "filter",
        "tag",
        "selectable"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/kbd",
      "family": "primitives",
      "name": "Kbd",
      "label": "Keyboard key",
      "description": "Styled single keyboard key (kbd) element in three sizes.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "keyboard",
        "shortcut"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/kbd-group",
      "family": "primitives",
      "name": "KbdGroup",
      "label": "Keyboard key group",
      "description": "Groups multiple Kbd keys with a configurable separator to render shortcut combinations.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "keyboard",
        "shortcut",
        "group"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/skeleton",
      "family": "primitives",
      "name": "Skeleton",
      "label": "Skeleton",
      "description": "Loading placeholder in rect, circle, text, or multi-line paragraph variants with aria-busy status.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "loading",
        "placeholder",
        "shimmer"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/progress-radial",
      "family": "primitives",
      "name": "ProgressRadial",
      "label": "Radial progress",
      "description": "SVG circular progressbar with tone, size, optional center label, and indeterminate mode.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "progress",
        "loading",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/progress-linear",
      "family": "primitives",
      "name": "ProgressLinear",
      "label": "Linear progress",
      "description": "Horizontal progressbar in solid, striped, segmented, or indeterminate variants with optional label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "progress",
        "loading",
        "bar"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/stat-tile",
      "family": "primitives",
      "name": "StatTile",
      "label": "Stat tile",
      "description": "Metric tile showing a value, unit, directional delta badge, and inline SVG sparkline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "metric",
        "dashboard",
        "sparkline",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/empty-state",
      "family": "primitives",
      "name": "EmptyState",
      "label": "Empty state",
      "description": "Glass-surface empty/zero state with illustration, title, description, and primary/secondary actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "empty",
        "placeholder",
        "cta"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/toast",
      "family": "primitives",
      "name": "Toast",
      "label": "Toast",
      "description": "Animated notification with tone icons, optional action button, and auto-dismiss countdown timer.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "notification",
        "feedback",
        "alert"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/popover",
      "family": "primitives",
      "name": "Popover",
      "label": "Popover",
      "description": "Base UI portal popover with configurable placement, alignment, arrow, and controlled open state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "overlay",
        "floating",
        "base-ui"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/drawer",
      "family": "primitives",
      "name": "Drawer",
      "label": "Drawer",
      "description": "Base UI dialog drawer sliding from any side in four sizes with header, body, and footer slots.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "overlay",
        "panel",
        "dialog",
        "base-ui"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/command-bar",
      "family": "primitives",
      "name": "CommandBar",
      "label": "Command bar",
      "description": "Searchable command palette with sectioned listbox, keyboard shortcuts, and empty-state handling.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "command",
        "search",
        "palette"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/tag-input",
      "family": "primitives",
      "name": "TagInput",
      "label": "Tag input",
      "description": "Multi-tag entry field with configurable separators, max-tags cap, and backspace removal.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "input",
        "tags",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/breadcrumb",
      "family": "primitives",
      "name": "Breadcrumb",
      "label": "Breadcrumb",
      "description": "Navigation breadcrumb trail that collapses overflow segments into an expandable ellipsis.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "navigation",
        "trail",
        "wayfinding"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/pagination",
      "family": "primitives",
      "name": "Pagination",
      "label": "Pagination",
      "description": "Page navigation with first/prev/next/last controls, windowed page range with ellipses, and a go-to input.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "navigation",
        "pages",
        "data"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/code-block",
      "family": "primitives",
      "name": "CodeBlock",
      "label": "Code block",
      "description": "Code display with language label, optional filename and line numbers, copy-to-clipboard button, and caption.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "code",
        "developer",
        "copy"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/quote-bubble",
      "family": "primitives",
      "name": "QuoteBubble",
      "label": "Quote bubble",
      "description": "Speech-bubble note with a directional tail in four sides and four tones.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "quote",
        "callout",
        "speech"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/marquee",
      "family": "primitives",
      "name": "Marquee",
      "label": "Marquee",
      "description": "Looping scroller in four directions with speed, gap, pause-on-hover, and edge-fade options.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "motion",
        "scroller",
        "ticker"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/count-up",
      "family": "primitives",
      "name": "CountUp",
      "label": "Count up",
      "description": "Spring-animated number counter with prefix/suffix, decimals, grouping separator, and reduced-motion fallback.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "motion",
        "number",
        "stat"
      ],
      "status": "captured"
    },
    {
      "key": "primitives/confetti-burst",
      "family": "primitives",
      "name": "ConfettiBurst",
      "label": "Confetti burst",
      "description": "Imperative-handle confetti canvas exposing fire and cannon methods, gated by prefers-reduced-motion.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/primitives",
      "tags": [
        "motion",
        "celebration",
        "canvas"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
