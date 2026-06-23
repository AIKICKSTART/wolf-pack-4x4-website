import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "help-docs",
  "title": "Help & docs",
  "group": "Content",
  "summary": "18 documentation and onboarding primitives — guided tours (spotlight, coach mark, controller), a help-center landing, long-form article surface, four tone callouts, TOC, doc breadcrumb/sidebar/search, API reference and implementation cards, a live code playground, release-notes timeline, and a keyboard-shortcuts overlay.",
  "entries": [
    {
      "key": "help-docs/spotlight-cutout",
      "family": "help-docs",
      "name": "SpotlightCutout",
      "label": "Spotlight cutout",
      "description": "Full-screen SVG mask that dims the page except a rounded rectangular cutout aligned to a target rect, with a highlight ring.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/spotlight",
      "tags": [
        "onboarding",
        "tour",
        "overlay",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/coach-mark",
      "family": "help-docs",
      "name": "CoachMark",
      "label": "Coach mark",
      "description": "Floating dialog popover with placement arrow, optional step progress, body copy, and primary/secondary (Next/Skip) actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/coach-mark",
      "tags": [
        "onboarding",
        "tour",
        "popover",
        "tooltip"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/tour-controller",
      "family": "help-docs",
      "name": "TourController",
      "label": "Tour controller",
      "description": "Orchestrates a multi-step guided tour, measuring each target selector and rendering a spotlight cutout plus a positioned coach mark.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/tour",
      "tags": [
        "onboarding",
        "tour",
        "controller",
        "walkthrough"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/help-center-landing",
      "family": "help-docs",
      "name": "HelpCenterLanding",
      "label": "Help center landing",
      "description": "Help-center hero with a search form, categorised topic cards, a numbered popular-articles list, and a contact-support aside.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/help-center",
      "tags": [
        "help-center",
        "landing",
        "search",
        "support"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/article-surface",
      "family": "help-docs",
      "name": "ArticleSurface",
      "label": "Article surface",
      "description": "Long-form article wrapper with byline, published/updated/read metadata, optional TOC aside, prose body, and a helpful/not-helpful feedback footer.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/article",
      "tags": [
        "article",
        "docs",
        "prose",
        "feedback"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/callout-info",
      "family": "help-docs",
      "name": "CalloutInfo",
      "label": "Info callout",
      "description": "Informational aside callout with an inline info SVG icon, title, and body content; region-labelled for a11y.",
      "kind": "block",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/callouts",
      "blockType": "callout-info",
      "tags": [
        "callout",
        "note",
        "editorial"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/callout-warning",
      "family": "help-docs",
      "name": "CalloutWarning",
      "label": "Warning callout",
      "description": "Warning-tone aside callout with an inline triangle SVG icon, title, and body content; region-labelled for a11y.",
      "kind": "block",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/callouts",
      "blockType": "callout-warning",
      "tags": [
        "callout",
        "warning",
        "editorial"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/callout-tip",
      "family": "help-docs",
      "name": "CalloutTip",
      "label": "Tip callout",
      "description": "Tip-tone aside callout with an inline lightbulb SVG icon, title, and body content; region-labelled for a11y.",
      "kind": "block",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/callouts",
      "blockType": "callout-tip",
      "tags": [
        "callout",
        "tip",
        "editorial"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/callout-danger",
      "family": "help-docs",
      "name": "CalloutDanger",
      "label": "Danger callout",
      "description": "Danger-tone aside callout with an inline error SVG icon, title, and body content; region-labelled for a11y.",
      "kind": "block",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/callouts",
      "blockType": "callout-danger",
      "tags": [
        "callout",
        "danger",
        "editorial"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/table-of-contents",
      "family": "help-docs",
      "name": "TableOfContents",
      "label": "Table of contents",
      "description": "Sticky in-page nav listing heading anchors and highlighting the visible heading via IntersectionObserver, with reduced-motion-aware smooth scroll.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/toc",
      "tags": [
        "docs",
        "navigation",
        "anchors",
        "scrollspy"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/doc-breadcrumb",
      "family": "help-docs",
      "name": "DocBreadcrumb",
      "label": "Doc breadcrumb",
      "description": "Docs-tuned breadcrumb that wraps the shared Breadcrumb primitive with a chevron SVG separator.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/breadcrumb",
      "tags": [
        "docs",
        "navigation",
        "breadcrumb"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/doc-sidebar",
      "family": "help-docs",
      "name": "DocSidebar",
      "label": "Doc sidebar",
      "description": "Left-side docs nav with collapsible sections, nested Link lists, active-link highlighting, and ARIA expanded/controls wiring.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/sidebar",
      "tags": [
        "docs",
        "navigation",
        "sidebar",
        "collapsible"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/doc-search-bar",
      "family": "help-docs",
      "name": "DocSearchBar",
      "label": "Doc search bar",
      "description": "Docs search input with a global `/` focus shortcut, category filter chips, and a panel of recent and popular suggestions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/search",
      "tags": [
        "docs",
        "search",
        "filter",
        "keyboard"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/api-reference-card",
      "family": "help-docs",
      "name": "ApiReferenceCard",
      "label": "API reference card",
      "description": "Endpoint reference card showing the HTTP method badge, path, description, a parameter table, and request/response CodeBlock examples.",
      "kind": "block",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/api-reference",
      "blockType": "api-reference",
      "tags": [
        "docs",
        "api",
        "reference",
        "code"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/primitive-implementation-card",
      "family": "help-docs",
      "name": "PrimitiveImplementationCard",
      "label": "Primitive implementation card",
      "description": "Documentation card detailing a primitive's source files, setup steps, usage/a11y/responsive/token/dependency guidance, and code samples.",
      "kind": "block",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "blockType": "primitive-implementation",
      "tags": [
        "docs",
        "implementation",
        "guidance",
        "code"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/code-playground",
      "family": "help-docs",
      "name": "CodePlayground",
      "label": "Code playground",
      "description": "Side-by-side source editor (CodeBlock) and live preview panes with an open-in-external CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/code-playground",
      "tags": [
        "docs",
        "playground",
        "code",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/release-notes-entry",
      "family": "help-docs",
      "name": "ReleaseNotesEntry",
      "label": "Release notes entry",
      "description": "Changelog timeline entry with a version badge, release date, summary, categorised change chips, and an optional read-more link.",
      "kind": "block",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/release-notes",
      "blockType": "release-notes-entry",
      "tags": [
        "docs",
        "changelog",
        "release",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "help-docs/keyboard-shortcuts-overlay",
      "family": "help-docs",
      "name": "KeyboardShortcutsOverlay",
      "label": "Keyboard shortcuts overlay",
      "description": "Modal overlay listing shortcuts grouped by section using the shared Kbd/KbdGroup primitives, with Escape-to-close.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/help-docs",
      "routeHref": "/ui-primitives/help-docs/keyboard-shortcuts",
      "tags": [
        "docs",
        "shortcuts",
        "overlay",
        "keyboard"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
