import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "content-studio",
  "title": "Content studio",
  "group": "Content",
  "summary": "14 editorial authoring surfaces for a long-form newsroom — block editor, outline, frontmatter, SEO, media, taxonomy, scheduling, co-authors, revisions, reusable blocks, comments, social repurposing, readability, and cover art — sharing a content-studio-types envelope (tones, authors, scores).",
  "entries": [
    {
      "key": "content-studio/long-form-editor",
      "family": "content-studio",
      "name": "LongFormEditor",
      "label": "Long-form editor",
      "description": "Article writing canvas rendering EditorBlocks with a floating formatting toolbar, title and byline header.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/long-form-editor",
      "tags": [
        "editor",
        "writing",
        "toolbar"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/outline-rail",
      "family": "content-studio",
      "name": "OutlineRail",
      "label": "Outline rail",
      "description": "Heading-level outline list with per-section word counts, active-section tracking, jump and reorder controls.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/outline-rail",
      "tags": [
        "outline",
        "navigation",
        "headings"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/frontmatter-panel",
      "family": "content-studio",
      "name": "FrontmatterPanel",
      "label": "Frontmatter panel",
      "description": "Article metadata form for title, category, tags and author chips with dismissible tags and category picker.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/frontmatter-panel",
      "tags": [
        "metadata",
        "form",
        "taxonomy"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/seo-inspector",
      "family": "content-studio",
      "name": "SeoInspector",
      "label": "SEO inspector",
      "description": "Search-readiness panel with a composite score, Google snippet preview and per-signal progress bars.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/seo-inspector",
      "tags": [
        "seo",
        "score",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/media-binder",
      "family": "content-studio",
      "name": "MediaBinder",
      "label": "Media binder",
      "description": "Asset picker that filters asset-library items by media kind tabs and search, marking already-inserted assets.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/media-binder",
      "tags": [
        "media",
        "assets",
        "picker"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/taxonomy-tree",
      "family": "content-studio",
      "name": "TaxonomyTree",
      "label": "Taxonomy tree",
      "description": "Collapsible category tree with per-node article counts, selection state and expand/collapse toggles.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/taxonomy-tree",
      "tags": [
        "taxonomy",
        "tree",
        "categories"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/publish-scheduler",
      "family": "content-studio",
      "name": "PublishScheduler",
      "label": "Publish scheduler",
      "description": "Scheduling control with a mini date picker, publish time, timezone and recurrence cadence options.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/publish-scheduler",
      "tags": [
        "scheduling",
        "calendar",
        "publish"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/co-author-strip",
      "family": "content-studio",
      "name": "CoAuthorStrip",
      "label": "Co-author strip",
      "description": "Byline strip of author avatars with role chips and per-author visibility toggles for the draft.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/co-author-strip",
      "tags": [
        "authors",
        "byline",
        "avatars"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/revision-diff-viewer",
      "family": "content-studio",
      "name": "RevisionDiffViewer",
      "label": "Revision diff viewer",
      "description": "Side-by-side old/new revision comparison with added, removed and context lines and author metadata per column.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/revision-diff-viewer",
      "tags": [
        "diff",
        "revisions",
        "history"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/content-block-card",
      "family": "content-studio",
      "name": "ContentBlockCard",
      "label": "Content block card",
      "description": "Reusable block snippet card showing a kind glyph, label and insert action, with an optional compact rail variant.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/content-block-card",
      "tags": [
        "block",
        "snippet",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/comment-thread-card",
      "family": "content-studio",
      "name": "CommentThreadCard",
      "label": "Comment thread card",
      "description": "Editorial comment thread anchored to a block, rendering a comment bubble, replies and resolved/open state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/comment-thread-card",
      "tags": [
        "comments",
        "review",
        "thread"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/social-repurpose-card",
      "family": "content-studio",
      "name": "SocialRepurposeCard",
      "label": "Social repurpose card",
      "description": "Card presenting an AI-repurposed social output for a channel (X, Reel, carousel, LinkedIn, TikTok, newsletter) with status.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/social-repurpose-card",
      "tags": [
        "social",
        "repurpose",
        "ai"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/readability-score-tile",
      "family": "content-studio",
      "name": "ReadabilityScoreTile",
      "label": "Readability score tile",
      "description": "Tile showing a Flesch reading-ease score on a radial dial with a tone-coded plain-language verdict.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/readability-score-tile",
      "tags": [
        "readability",
        "score",
        "dataviz"
      ],
      "status": "captured"
    },
    {
      "key": "content-studio/cover-art-studio",
      "family": "content-studio",
      "name": "CoverArtStudio",
      "label": "Cover art studio",
      "description": "Cover image tool with aspect-ratio switching, focal-point control and selectable AI cover suggestions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/content-studio",
      "routeHref": "/ui-primitives/content-studio/cover-art-studio",
      "tags": [
        "cover",
        "image",
        "ai"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
