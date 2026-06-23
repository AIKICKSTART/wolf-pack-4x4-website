import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "asset-library",
  "title": "Asset library",
  "group": "Media",
  "summary": "14 digital-asset-management primitives — asset cards, folder tree, tag manager, colour extractor, license chip, version timeline, bulk toolbar, type filter, smart collection, preview pane, usage tracker, approval workflow, watermark editor, and renditions list — composed into a full DAM surface.",
  "entries": [
    {
      "key": "asset-library/asset-card",
      "family": "asset-library",
      "name": "AssetCard",
      "label": "Asset card",
      "description": "Selectable DAM asset card with thumbnail, kind badge, dimension/duration chip and license chip; keyboard-operable option role.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/asset-card",
      "tags": [
        "dam",
        "asset",
        "card",
        "media"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/dam-folder-tree",
      "family": "asset-library",
      "name": "DamFolderTree",
      "label": "DAM folder tree",
      "description": "Expandable media folder tree with per-folder asset counts, drag-target indicators and ARIA tree roles.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/dam-folder-tree",
      "tags": [
        "dam",
        "folders",
        "tree",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/tag-manager",
      "family": "asset-library",
      "name": "TagManager",
      "label": "Tag manager",
      "description": "Tag list with an add-tag composer, colour-swatch radiogroup and merge-duplicate suggestions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/tag-manager",
      "tags": [
        "dam",
        "tags",
        "taxonomy",
        "metadata"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/color-extract-picker",
      "family": "asset-library",
      "name": "ColorExtractPicker",
      "label": "Colour extract picker",
      "description": "Palette extracted from an asset showing hex value, role chip and one-click copy per swatch.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/color-extract-picker",
      "tags": [
        "dam",
        "color",
        "palette",
        "swatch"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/license-chip",
      "family": "asset-library",
      "name": "LicenseChip",
      "label": "License chip",
      "description": "Tone-coded license status chip (CC0/CC-BY/proprietary/royalty-free/editorial) with optional tooltip bubble.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/license-chip",
      "tags": [
        "dam",
        "license",
        "chip",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/asset-version-timeline",
      "family": "asset-library",
      "name": "AssetVersionTimeline",
      "label": "Asset version timeline",
      "description": "Vertical revision history with thumbnail, uploader avatar, timestamp, comment and restore action per version.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/asset-version-timeline",
      "tags": [
        "dam",
        "versions",
        "timeline",
        "history"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/bulk-select-toolbar",
      "family": "asset-library",
      "name": "BulkSelectToolbar",
      "label": "Bulk-select toolbar",
      "description": "Floating toolbar that appears above a selection threshold with count and tag/move/download/license/archive actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/bulk-select-toolbar",
      "tags": [
        "dam",
        "bulk",
        "toolbar",
        "selection"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/asset-type-filter",
      "family": "asset-library",
      "name": "AssetTypeFilter",
      "label": "Asset-type filter",
      "description": "Tablist of asset-kind filter chips (image/video/audio/doc/3D/animation/vector) with per-kind counts and an All tab.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/asset-type-filter",
      "tags": [
        "dam",
        "filter",
        "tabs",
        "asset-type"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/smart-collection-row",
      "family": "asset-library",
      "name": "SmartCollectionRow",
      "label": "Smart collection row",
      "description": "Smart-collection row with auto-updating asset count, rule-criteria chips and an edit-rules CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/smart-collection-row",
      "tags": [
        "dam",
        "collection",
        "rules",
        "automation"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/dam-preview-pane",
      "family": "asset-library",
      "name": "DamPreviewPane",
      "label": "DAM preview pane",
      "description": "Large asset preview aside with dimension/size/license chips, EXIF property list, linked collections and download/share/replace/archive actions.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/dam-preview-pane",
      "tags": [
        "dam",
        "preview",
        "metadata",
        "exif"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/usage-tracker",
      "family": "asset-library",
      "name": "UsageTracker",
      "label": "Usage tracker",
      "description": "Where-used list of surfaces (pages, emails, workflows) referencing an asset, with paths, last-modified times and an empty state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/usage-tracker",
      "tags": [
        "dam",
        "usage",
        "references",
        "audit"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/approval-workflow-card",
      "family": "asset-library",
      "name": "ApprovalWorkflowCard",
      "label": "Approval workflow card",
      "description": "Draft→Review→Approved→Published stepper with reviewer avatars and a comment thread.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/approval-workflow-card",
      "tags": [
        "dam",
        "approval",
        "workflow",
        "stepper"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/watermark-settings",
      "family": "asset-library",
      "name": "WatermarkSettings",
      "label": "Watermark settings",
      "description": "Watermark editor with text, opacity and scale controls plus a 9-cell position radiogroup and live preview.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/watermark-settings",
      "tags": [
        "dam",
        "watermark",
        "editor",
        "settings"
      ],
      "status": "captured"
    },
    {
      "key": "asset-library/renditions-list",
      "family": "asset-library",
      "name": "RenditionsList",
      "label": "Renditions list",
      "description": "List of rendition presets (original/web/thumbnail/square/4K) with dimensions, size, format chips and a download action per row.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-library",
      "routeHref": "/ui-primitives/asset-library/renditions-list",
      "tags": [
        "dam",
        "renditions",
        "presets",
        "download"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
