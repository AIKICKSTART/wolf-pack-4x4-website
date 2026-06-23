import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "docs-suite",
  "title": "Docs suite",
  "group": "Content",
  "summary": "14 documentation-surface primitives — article browsing, MDX rendering, version/search/navigation chrome, API/changelog/glossary references, and reader feedback — sharing the Docs* type contract.",
  "entries": [
    {
      "key": "docs-suite/article-browser-grid",
      "family": "docs-suite",
      "name": "ArticleBrowserGrid",
      "label": "Article browser grid",
      "description": "Category-filterable card grid of doc article summaries with difficulty badges, read time, and updated date.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/article-browser",
      "tags": [
        "docs",
        "browse",
        "filter"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/version-selector",
      "family": "docs-suite",
      "name": "VersionSelector",
      "label": "Version selector",
      "description": "Accessible listbox dropdown for switching docs versions, flagging breaking and current releases.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/version-selector",
      "tags": [
        "docs",
        "version",
        "dropdown"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/mdx-block-renderer",
      "family": "docs-suite",
      "name": "MdxBlockRenderer",
      "label": "MDX block renderer",
      "description": "Renders an array of MDX blocks (prose, code, note, warning, diff, tabbed code) into the documented article body.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/mdx-block-renderer",
      "tags": [
        "docs",
        "mdx",
        "content"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/footer-nav-row",
      "family": "docs-suite",
      "name": "FooterNavRow",
      "label": "Footer nav row",
      "description": "Previous/next article navigation pair with category, title, and relation hint per cell.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/footer-nav-row",
      "tags": [
        "docs",
        "navigation",
        "pager"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/docs-search-modal",
      "family": "docs-suite",
      "name": "DocsSearchModal",
      "label": "Docs search modal",
      "description": "Command-palette dialog that filters grouped doc hits by kind and query with full keyboard navigation.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/docs-search-modal",
      "tags": [
        "docs",
        "search",
        "command-palette"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/table-of-contents-rail",
      "family": "docs-suite",
      "name": "TableOfContentsRail",
      "label": "Table of contents rail",
      "description": "Scroll-spying table-of-contents nav with depth indentation, active-heading tracking, and reading progress.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/toc-rail",
      "tags": [
        "docs",
        "toc",
        "scroll-spy"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/breadcrumb-doc-trail",
      "family": "docs-suite",
      "name": "BreadcrumbDocTrail",
      "label": "Breadcrumb doc trail",
      "description": "Documentation breadcrumb trail with an optional sibling page-tree dropdown menu on the last crumb.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/breadcrumb-doc-trail",
      "tags": [
        "docs",
        "breadcrumb",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/edit-on-github-banner",
      "family": "docs-suite",
      "name": "EditOnGithubBanner",
      "label": "Edit on GitHub banner",
      "description": "Banner showing the source repo, latest commit info, and an edit-on-GitHub call-to-action link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/edit-on-github",
      "tags": [
        "docs",
        "github",
        "commit"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/article-meta-card",
      "family": "docs-suite",
      "name": "ArticleMetaCard",
      "label": "Article meta card",
      "description": "Sidebar card listing article version, publish/update dates, author, editor, and contributors.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/article-meta",
      "tags": [
        "docs",
        "metadata",
        "authors"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/feedback-helpful-strip",
      "family": "docs-suite",
      "name": "FeedbackHelpfulStrip",
      "label": "Feedback helpful strip",
      "description": "Was-this-helpful voting strip with helpful/needs-work buttons and an optional length-capped comment field.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/feedback-strip",
      "tags": [
        "docs",
        "feedback",
        "vote"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/related-articles-grid",
      "family": "docs-suite",
      "name": "RelatedArticlesGrid",
      "label": "Related articles grid",
      "description": "Card grid of related-article picks with surface label, excerpt, and read time per card.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/related-articles",
      "tags": [
        "docs",
        "related",
        "recommendations"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/glossary-tooltip-trigger",
      "family": "docs-suite",
      "name": "GlossaryTooltipTrigger",
      "label": "Glossary tooltip trigger",
      "description": "Inline glossary term trigger that reveals a definition popover with an optional read-more link on hover/focus.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/glossary-tooltip",
      "tags": [
        "docs",
        "glossary",
        "tooltip"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/api-reference-card",
      "family": "docs-suite",
      "name": "ApiReferenceCard",
      "label": "API reference card",
      "description": "API endpoint card with HTTP method badge, path, description, a query-parameter table, and an optional try-it link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/api-reference-card",
      "tags": [
        "docs",
        "api",
        "reference"
      ],
      "status": "captured"
    },
    {
      "key": "docs-suite/changelog-strip",
      "family": "docs-suite",
      "name": "ChangelogStrip",
      "label": "Changelog strip",
      "description": "Compact list of recent changelog entries with kind chips (added/fixed/changed/deprecated), summary, and date.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/docs-suite",
      "routeHref": "/ui-primitives/docs-suite/changelog-strip",
      "tags": [
        "docs",
        "changelog",
        "history"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
