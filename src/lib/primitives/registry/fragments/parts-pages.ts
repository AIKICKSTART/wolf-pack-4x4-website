import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "parts-pages",
  "title": "Parts pages",
  "group": "Commerce",
  "summary": "14 exhaust-parts sales primitives — supplier-toned heroes, search rail, category/result cards, product-detail hero with gallery, spec and fitment tables, supplier badges, price chips, breadcrumb, FAQ, and a full category page shell composition.",
  "entries": [
    {
      "key": "parts-pages/parts-catalogue-hero",
      "family": "parts-pages",
      "name": "PartsCatalogueHero",
      "label": "Exhaust parts hero",
      "description": "Toned exhaust-parts header with kicker/headline/body, coverage chips, and an inline supplier-badge coverage rail.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/parts-catalogue-hero",
      "tags": [
        "catalogue",
        "hero",
        "suppliers"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/parts-search-rail",
      "family": "parts-pages",
      "name": "PartsSearchRail",
      "label": "Parts search rail",
      "description": "Client search aside with inline search input, category nav links, and a faceted supplier/price/stock/fitment filter sidebar.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/parts-search-rail",
      "tags": [
        "search",
        "filters",
        "facets"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/part-category-card",
      "family": "parts-pages",
      "name": "PartCategoryCard",
      "label": "Part category card",
      "description": "Linked category tile with toned thumb mark, part count, copy, popular-supplier chips, and a view-category CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/part-category-card",
      "tags": [
        "category",
        "card",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/part-result-card",
      "family": "parts-pages",
      "name": "PartResultCard",
      "label": "Part result card",
      "description": "Search-result product card with lazy image or fallback mark, supplier tag/watermark, SKU, price tag, and fitment chips.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/part-result-card",
      "tags": [
        "product",
        "card",
        "result"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/part-detail-hero",
      "family": "parts-pages",
      "name": "PartDetailHero",
      "label": "Part detail hero",
      "description": "Product detail header pairing a gallery slot with SKU, title, summary, stacked price chip, supplier/stock/install meta, fitment chips, and a quote CTA.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/part-detail-hero",
      "tags": [
        "product",
        "detail",
        "hero"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/part-image-gallery",
      "family": "parts-pages",
      "name": "PartImageGallery",
      "label": "Part image gallery",
      "description": "Client image gallery with a zoomable main stage, supplier watermark, caption, fallback state, and a thumbnail strip selector.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/part-image-gallery",
      "tags": [
        "gallery",
        "media",
        "zoom"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/part-spec-table",
      "family": "parts-pages",
      "name": "PartSpecTable",
      "label": "Part spec table",
      "description": "Grouped specification table with kicker/heading header and labelled spec-value rows per group.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/part-spec-table",
      "tags": [
        "specs",
        "table",
        "data"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/fitment-compatibility-list",
      "family": "parts-pages",
      "name": "FitmentCompatibilityList",
      "label": "Fitment compatibility list",
      "description": "Vehicle fitment table (make/model/years/body/engine/notes) with adapter-required and direct-fit chip badges per row.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/fitment-compatibility-list",
      "tags": [
        "fitment",
        "table",
        "compatibility"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/supplier-badge",
      "family": "parts-pages",
      "name": "SupplierBadge",
      "label": "Supplier badge",
      "description": "Supplier identity badge with official brand logo artwork, name/code copy, and optional verified and warranty chips; inline or stacked.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/supplier-badge",
      "tags": [
        "supplier",
        "badge",
        "brand"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/related-parts-rail",
      "family": "parts-pages",
      "name": "RelatedPartsRail",
      "label": "Related parts rail",
      "description": "Horizontal rail of PartResultCards with staggered reveal motion, header kicker/heading/description, and a match count.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/related-parts-rail",
      "tags": [
        "related",
        "rail",
        "carousel"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/parts-breadcrumb",
      "family": "parts-pages",
      "name": "PartsBreadcrumb",
      "label": "Parts breadcrumb",
      "description": "Toned breadcrumb wrapper around the base Breadcrumb primitive with a wrench home icon for parts navigation.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/parts-breadcrumb",
      "tags": [
        "breadcrumb",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/parts-faq-section",
      "family": "parts-pages",
      "name": "PartsFaqSection",
      "label": "Parts FAQ section",
      "description": "Parts FAQ block wrapping the marketing FaqAccordion, mapping question/answer items with kicker, heading, and body.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/parts-faq-section",
      "tags": [
        "faq",
        "accordion",
        "support"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/part-price-chip",
      "family": "parts-pages",
      "name": "PartPriceChip",
      "label": "Part price chip",
      "description": "Price display chip wrapping PriceTag with optional label, RRP compare-at when discounted, and an installment hint; inline or stacked.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/part-price-chip",
      "tags": [
        "price",
        "chip",
        "commerce"
      ],
      "status": "captured"
    },
    {
      "key": "parts-pages/parts-category-page-shell",
      "family": "parts-pages",
      "name": "PartsCategoryPageShell",
      "label": "Parts category page shell",
      "description": "Full category-page composition: breadcrumb, catalogue hero, search rail, paginated result grid, optional fitment table, and FAQ.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/parts-pages",
      "routeHref": "/ui-primitives/parts-pages/parts-category-page-shell",
      "tags": [
        "page-shell",
        "composition",
        "catalogue"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
