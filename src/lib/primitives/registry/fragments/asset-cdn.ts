import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "asset-cdn",
  "title": "Asset CDN",
  "group": "Media",
  "summary": "14 media-delivery control surfaces for a Cloudflare-style asset CDN: image/video transforms, signed URLs, cache invalidation/purge, background removal, watermarking, region telemetry, versioning, usage quotas, MIME firewall, presets, bulk jobs, and lazy-load placeholders.",
  "entries": [
    {
      "key": "asset-cdn/image-transform-panel",
      "family": "asset-cdn",
      "name": "ImageTransformPanel",
      "label": "Image Transform Panel",
      "description": "Interactive Cloudflare-style image transform editor with width/height inputs, format and fit radio toggles, quality slider, and a click/keyboard focal-point picker.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/image-transform-panel",
      "tags": [
        "image",
        "transform",
        "focal-point"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/video-transcode-row",
      "family": "asset-cdn",
      "name": "VideoTranscodeRow",
      "label": "Video Transcode Row",
      "description": "Single transcode-job row showing source, profile/resolution/codec, a tone-coded progress bar with status glyph, and an ETA or output-size chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/video-transcode-row",
      "tags": [
        "video",
        "transcode",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/signed-url-generator",
      "family": "asset-cdn",
      "name": "SignedUrlGenerator",
      "label": "Signed URL Generator",
      "description": "Builds a time-bound CDN URL from a resource path, TTL preset, signing algorithm and scope, rendering a live preview with a deterministic mock signature and copy button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/signed-url-generator",
      "tags": [
        "signed-url",
        "security",
        "ttl"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/cache-invalidation-card",
      "family": "asset-cdn",
      "name": "CacheInvalidationCard",
      "label": "Cache Invalidation Card",
      "description": "Card summarising a cache invalidation: scope, strategy, the affected URL pattern, affected count, and a relative issued-time with propagation footer.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/cache-invalidation-card",
      "tags": [
        "cache",
        "invalidation",
        "edge"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/bg-removal-tool",
      "family": "asset-cdn",
      "name": "BgRemovalTool",
      "label": "Background Removal Tool",
      "description": "Before/after background-removal preview with a draggable reveal slider, edge-feather control, and a backdrop swatch picker including an alpha option.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/bg-removal-tool",
      "tags": [
        "image",
        "background-removal",
        "compare"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/watermark-config-card",
      "family": "asset-cdn",
      "name": "WatermarkConfigCard",
      "label": "Watermark Config Card",
      "description": "Watermark editor with logo/text kind toggle, live anchored preview, text field, and opacity, scale, and anchor controls.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/watermark-config-card",
      "tags": [
        "watermark",
        "branding",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/cdn-region-map",
      "family": "asset-cdn",
      "name": "CdnRegionMap",
      "label": "CDN Region Map",
      "description": "World-map visualisation plotting CDN regions as tone-coded pins by cache-hit rate, with a legend listing hit rate, throughput, latency and PoP count per region.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/cdn-region-map",
      "tags": [
        "cdn",
        "map",
        "telemetry"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/asset-versioning-row",
      "family": "asset-cdn",
      "name": "AssetVersioningRow",
      "label": "Asset Versioning Row",
      "description": "Asset-version list row showing version tag with live badge, note, author/timestamp/size byline, and a revert button disabled on the current version.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/asset-versioning-row",
      "tags": [
        "versioning",
        "history",
        "revert"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/usage-quota-tile",
      "family": "asset-cdn",
      "name": "UsageQuotaTile",
      "label": "Usage Quota Tile",
      "description": "Quota stat tile for a CDN resource showing used-of-limit value, delta trend with arrow, a tone-coded usage progress bar, and a cycle-reset countdown.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/usage-quota-tile",
      "tags": [
        "quota",
        "usage",
        "metrics"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/mime-type-filter",
      "family": "asset-cdn",
      "name": "MimeTypeFilter",
      "label": "MIME Type Filter",
      "description": "Upload-firewall MIME allow-list editor: add patterns, toggle allow/block per rule, show max-size and notes, and remove rules.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/mime-type-filter",
      "tags": [
        "mime",
        "allow-list",
        "upload"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/image-preset-card",
      "family": "asset-cdn",
      "name": "ImagePresetCard",
      "label": "Image Preset Card",
      "description": "Selectable card for an image preset showing category chip, usage count, an aspect-ratio frame preview, and format/fit/quality chips.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/image-preset-card",
      "tags": [
        "preset",
        "image",
        "selectable"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/bulk-process-job-row",
      "family": "asset-cdn",
      "name": "BulkProcessJobRow",
      "label": "Bulk Process Job Row",
      "description": "Bulk-processing job row with kind badge, status, progress bar, done/total/failed/ETA stats, and contextual pause/resume/cancel actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/bulk-process-job-row",
      "tags": [
        "bulk",
        "job",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/lazy-load-config-card",
      "family": "asset-cdn",
      "name": "LazyLoadConfigCard",
      "label": "Lazy Load Config Card",
      "description": "Lazy-load placeholder configurator with a strategy radio grid (LQIP, blur-up, sketch, dominant-color), placeholder/resolved previews, and blur, fade, and root-margin sliders.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/lazy-load-config-card",
      "tags": [
        "lazy-load",
        "placeholder",
        "performance"
      ],
      "status": "captured"
    },
    {
      "key": "asset-cdn/cdn-purge-confirmation",
      "family": "asset-cdn",
      "name": "CdnPurgeConfirmation",
      "label": "CDN Purge Confirmation",
      "description": "Destructive-action alertdialog confirming a hard CDN purge: totals, affected path list, and a type-to-confirm token gate on the purge button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/asset-cdn",
      "routeHref": "/ui-primitives/asset-cdn/cdn-purge-confirmation",
      "tags": [
        "purge",
        "confirmation",
        "destructive"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
