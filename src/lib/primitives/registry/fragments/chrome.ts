import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "chrome",
  "title": "Chrome",
  "group": "Chrome",
  "summary": "22 site-chrome primitives across five surfaces — headers, footers, docks, slide-ups, and sidebars — sharing a ChromeBrandConfig/ChromeNavItem data contract, brand iconography, and motion helpers, each with a matching showcase subroute.",
  "entries": [
    {
      "key": "chrome/header-cinematic-bar",
      "family": "chrome",
      "name": "HeaderCinematicBar",
      "label": "Cinematic bar header",
      "description": "Revealing site banner with brand wordmark, icon-led nav, and primary/secondary CTAs.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/headers/cinematic-bar",
      "tags": [
        "header",
        "navigation",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/header-pinstripe-bar",
      "family": "chrome",
      "name": "HeaderPinstripeBar",
      "label": "Pinstripe bar header",
      "description": "Slim banner with brand chip, breadcrumb trail, inline links, and a keyboard search shortcut.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/headers/pinstripe-bar",
      "tags": [
        "header",
        "breadcrumb",
        "search"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/header-stacked-grand",
      "family": "chrome",
      "name": "HeaderStackedGrand",
      "label": "Stacked grand header",
      "description": "Tall stacked header with tagline, status/utility bar, KPI stats row, and icon nav on a neuomorphic surface.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/headers/stacked-grand",
      "tags": [
        "header",
        "stats",
        "utility-bar"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/header-mobile-condensed",
      "family": "chrome",
      "name": "HeaderMobileCondensed",
      "label": "Mobile condensed header",
      "description": "Scroll-shrinking mobile banner with menu trigger and optional cart button with item count.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/headers/mobile-condensed",
      "tags": [
        "header",
        "mobile",
        "scroll"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/header-floating-island",
      "family": "chrome",
      "name": "HeaderFloatingIsland",
      "label": "Floating island header",
      "description": "Pill-shaped floating nav island with magnetic-hover brand, icon nav, and a single CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/headers/floating-island",
      "tags": [
        "header",
        "floating",
        "magnetic"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/footer-megamap-grand",
      "family": "chrome",
      "name": "FooterMegamapGrand",
      "label": "Megamap grand footer",
      "description": "Full multi-column sitemap footer with newsletter signup, socials, contact details, and legal links.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/footers/megamap-grand",
      "tags": [
        "footer",
        "sitemap",
        "newsletter"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/footer-cinematic",
      "family": "chrome",
      "name": "FooterCinematic",
      "label": "Cinematic footer",
      "description": "Scroll-revealed footer over a background hero image with icon-led link columns and legal row.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/footers/cinematic",
      "tags": [
        "footer",
        "hero-image",
        "scroll-reveal"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/footer-compact-strip",
      "family": "chrome",
      "name": "FooterCompactStrip",
      "label": "Compact strip footer",
      "description": "Single-row footer strip with icon links, copyright, status label, and a theme-toggle chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/footers/compact-strip",
      "tags": [
        "footer",
        "compact",
        "theme-toggle"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/footer-receipt-style",
      "family": "chrome",
      "name": "FooterReceiptStyle",
      "label": "Receipt-style footer",
      "description": "Receipt-themed footer with itemized contact detail lines, ABN, acknowledgement, and a generated barcode.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/footers/receipt-style",
      "tags": [
        "footer",
        "receipt",
        "barcode"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/footer-marquee-band",
      "family": "chrome",
      "name": "FooterMarqueeBand",
      "label": "Marquee band footer",
      "description": "Footer with a scrolling word marquee and animated CountUp KPI tiles above the legal row.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/footers/marquee-band",
      "tags": [
        "footer",
        "marquee",
        "kpi"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/dock-bottom-glass",
      "family": "chrome",
      "name": "DockBottomGlass",
      "label": "Bottom glass dock",
      "description": "Fixed bottom-center glass action dock of icon buttons with active and badge states.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/docks/bottom-glass",
      "tags": [
        "dock",
        "glass",
        "toolbar"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/dock-side-magnetic",
      "family": "chrome",
      "name": "DockSideMagnetic",
      "label": "Side magnetic dock",
      "description": "Fixed right-edge vertical dock of magnetic-hover icon actions with optional divider and badges.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/docks/side-magnetic",
      "tags": [
        "dock",
        "magnetic",
        "vertical"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/dock-corner-quick",
      "family": "chrome",
      "name": "DockCornerQuick",
      "label": "Corner quick dock",
      "description": "Bottom-right FAB cluster with compose, chat, back-to-top, and theme-toggle satellite actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/docks/corner-quick",
      "tags": [
        "dock",
        "fab",
        "quick-actions"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/dock-tab-rail",
      "family": "chrome",
      "name": "DockTabRail",
      "label": "Tab rail dock",
      "description": "Floating or inline tab rail with an animated active indicator, icon items, subtitles, and badges.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/docks/tab-rail",
      "tags": [
        "dock",
        "tabs",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/slide-up-action-sheet",
      "family": "chrome",
      "name": "SlideUpActionSheet",
      "label": "Action sheet slide-up",
      "description": "Mobile bottom-sheet listing icon actions with descriptions, destructive styling, and a cancel button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/slide-ups/action-sheet",
      "tags": [
        "slide-up",
        "action-sheet",
        "mobile"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/slide-up-full-takeover",
      "family": "chrome",
      "name": "SlideUpFullTakeover",
      "label": "Full takeover slide-up",
      "description": "Full-screen slide-up panel with kicker, title, breadcrumb trail, slotted body, and footer; Escape closes.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/slide-ups/full-takeover",
      "tags": [
        "slide-up",
        "takeover",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/slide-up-detail-card",
      "family": "chrome",
      "name": "SlideUpDetailCard",
      "label": "Detail card slide-up",
      "description": "Slide-up detail card with kicker, title, meta chips, icon stat grid, and primary/secondary CTAs.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/slide-ups/detail-card",
      "tags": [
        "slide-up",
        "detail",
        "stats"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/slide-up-multi-step",
      "family": "chrome",
      "name": "SlideUpMultiStep",
      "label": "Multi-step slide-up",
      "description": "Slide-up wizard with a linear progress bar and back/next/finish controls stepping through slotted step bodies.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/slide-ups/multi-step",
      "tags": [
        "slide-up",
        "wizard",
        "stepper"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/sidebar-cinematic-vertical",
      "family": "chrome",
      "name": "SidebarCinematicVertical",
      "label": "Cinematic vertical sidebar",
      "description": "Sticky or static vertical nav sidebar with brand mark, icon nav items, active state, and a footer label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/sidebars/cinematic-vertical",
      "tags": [
        "sidebar",
        "navigation",
        "vertical"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/sidebar-glass-compact",
      "family": "chrome",
      "name": "SidebarGlassCompact",
      "label": "Glass compact sidebar",
      "description": "Compact glass-surface nav sidebar with icon items, badges, divider, and a bottom user avatar.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/sidebars/glass-compact",
      "tags": [
        "sidebar",
        "glass",
        "compact"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/sidebar-mega-anchored",
      "family": "chrome",
      "name": "SidebarMegaAnchored",
      "label": "Mega anchored sidebar",
      "description": "Grouped collapsible nav sidebar with section headings, badges, search shortcut, and a footer card.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/sidebars/mega-anchored",
      "tags": [
        "sidebar",
        "collapsible",
        "groups"
      ],
      "status": "captured"
    },
    {
      "key": "chrome/sidebar-context-rail",
      "family": "chrome",
      "name": "SidebarContextRail",
      "label": "Context rail sidebar",
      "description": "Contextual detail rail with kicker, title, meta tags, icon stats, related links, and action buttons.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/chrome",
      "routeHref": "/ui-primitives/chrome/sidebars/context-rail",
      "tags": [
        "sidebar",
        "context",
        "related"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
