import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "marketplace",
  "title": "Marketplace",
  "group": "Commerce",
  "summary": "14 plugin-marketplace primitives — cards, install controls, detail header, reviews, author/version/pricing chips, permissions and compatibility surfaces, trending and recently-updated rows, and a staged installation tracker.",
  "entries": [
    {
      "key": "marketplace/plugin-card",
      "family": "marketplace",
      "name": "PluginCard",
      "label": "Plugin card",
      "description": "Plugin catalogue card with logo, author, rating, pricing tier chip, install-state status, and a state-aware CTA (link or button).",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/plugin-card",
      "tags": [
        "plugin",
        "card",
        "install",
        "rating"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/category-sidebar",
      "family": "marketplace",
      "name": "CategorySidebar",
      "label": "Category sidebar",
      "description": "Navigation list of plugin categories with per-category counts, active-state highlighting, and link or button items.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/category-sidebar",
      "tags": [
        "navigation",
        "categories",
        "filter"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/featured-banner",
      "family": "marketplace",
      "name": "FeaturedBanner",
      "label": "Featured banner",
      "description": "Rotating featured-plugin carousel with kicker/title/description, CTA, visual slot, optional autoplay (reduced-motion aware), and pagination dots.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/featured-banner",
      "tags": [
        "carousel",
        "featured",
        "promo"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/install-button",
      "family": "marketplace",
      "name": "InstallButton",
      "label": "Install button",
      "description": "State-driven install action button (install/installing/installed/update/uninstall) with matching icon, tone, busy state, and screen-reader status.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/install-button",
      "tags": [
        "button",
        "install",
        "action"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/plugin-detail-header",
      "family": "marketplace",
      "name": "PluginDetailHeader",
      "label": "Plugin detail header",
      "description": "Plugin detail-page header with logo, byline, title, tagline, an install action slot, and a tab strip (overview/permissions/pricing/reviews/changelog).",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/plugin-detail-header",
      "tags": [
        "header",
        "detail",
        "tabs"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/review-card",
      "family": "marketplace",
      "name": "ReviewCard",
      "label": "Review card",
      "description": "User review card with avatar initials, star rating, body, timestamp, verified-install chip, and a helpful-count action button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/review-card",
      "tags": [
        "review",
        "rating",
        "feedback"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/author-chip",
      "family": "marketplace",
      "name": "AuthorChip",
      "label": "Author chip",
      "description": "Compact author identity chip with avatar initials, name, optional verified badge, rendered as a profile link or static span.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/author-chip",
      "tags": [
        "author",
        "chip",
        "verified"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/version-chip",
      "family": "marketplace",
      "name": "VersionChip",
      "label": "Version chip",
      "description": "Version + release-date chip with an optional toggleable changelog popover.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/version-chip",
      "tags": [
        "version",
        "chip",
        "changelog"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/permissions-required-list",
      "family": "marketplace",
      "name": "PermissionsRequiredList",
      "label": "Permissions required list",
      "description": "List of requested permission scopes, each with an icon, description, and sensitivity (low/medium/high) tone chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/permissions-required-list",
      "tags": [
        "permissions",
        "security",
        "scopes"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/compatibility-matrix",
      "family": "marketplace",
      "name": "CompatibilityMatrix",
      "label": "Compatibility matrix",
      "description": "Feature-by-surface compatibility table (supported/partial/unsupported cells with icons, notes, and a legend).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/compatibility-matrix",
      "tags": [
        "compatibility",
        "matrix",
        "table"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/pricing-tier-chip",
      "family": "marketplace",
      "name": "PricingTierChip",
      "label": "Pricing tier chip",
      "description": "Pricing-tier badge (free/pro/enterprise/pay-per-use) with tier icon, tone, and optional price-label suffix.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/pricing-tier-chip",
      "tags": [
        "pricing",
        "tier",
        "chip"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/trending-strip",
      "family": "marketplace",
      "name": "TrendingStrip",
      "label": "Trending strip",
      "description": "Horizontally-scrollable trending-plugins strip with rank, name, author, momentum (up/down/flat) indicator, and left/right scroll controls.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/trending-strip",
      "tags": [
        "trending",
        "scroller",
        "momentum"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/recently-updated-row",
      "family": "marketplace",
      "name": "RecentlyUpdatedRow",
      "label": "Recently updated row",
      "description": "List of recently-updated plugins with logo initials, name, release date, an embedded VersionChip, and a changelog excerpt.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/recently-updated-row",
      "tags": [
        "updates",
        "changelog",
        "list"
      ],
      "status": "captured"
    },
    {
      "key": "marketplace/installation-progress",
      "family": "marketplace",
      "name": "InstallationProgress",
      "label": "Installation progress",
      "description": "Staged install tracker with a computed progress bar and an ordered step list (downloading/verifying/configuring/permissions/done) with per-step status and live status summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/marketplace",
      "routeHref": "/ui-primitives/marketplace/installation-progress",
      "tags": [
        "progress",
        "installation",
        "stepper"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
