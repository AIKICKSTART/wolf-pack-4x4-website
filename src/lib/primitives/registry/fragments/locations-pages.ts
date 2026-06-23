import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "locations-pages",
  "title": "Locations pages",
  "group": "Marketing",
  "summary": "15 suburb/location SEO primitives — heroes, fast-facts, nearby-workshop maps, distance/postcode chips, surrounding-suburb clouds, local-quote CTAs, testimonials, recent-work cards, breadcrumbs, services grids, FAQs, and a service-by-suburb cross hero — most composed as adapters over the maps, surfaces, primitives, and marketing families.",
  "entries": [
    {
      "key": "locations-pages/suburb-hero",
      "family": "locations-pages",
      "name": "SuburbHero",
      "label": "Suburb hero",
      "description": "Glass-surface suburb hero with postcode/state/drive-time chips, a layered Mufflermen + suburb headline, tagline, and primary/secondary CTAs.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/suburb-hero",
      "tags": [
        "suburb",
        "hero",
        "seo",
        "cta"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/suburb-fast-facts-row",
      "family": "locations-pages",
      "name": "SuburbFastFactsRow",
      "label": "Suburb fast facts row",
      "description": "Semantic description-list of tone-accented stat tiles meant to sit under the suburb hero, each a label/value (with optional note) pair on a material surface.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/suburb-fast-facts-row",
      "tags": [
        "suburb",
        "stats",
        "facts"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/nearby-workshops-list",
      "family": "locations-pages",
      "name": "NearbyWorkshopsList",
      "label": "Nearby workshops list",
      "description": "Adapter over the maps WorkshopLocator that colours pins by opening status and renders a per-workshop legend of service chips beneath the map.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/nearby-workshops-list",
      "tags": [
        "workshops",
        "map",
        "locator"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/service-radius-chip",
      "family": "locations-pages",
      "name": "ServiceRadiusChip",
      "label": "Service radius chip",
      "description": "Compact band-coloured chip pairing a mini StaticMapCanvas with a ServiceRadiusOverlay ring and a dot marking the suburb's position relative to the workshop.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/service-radius-chip",
      "tags": [
        "radius",
        "map",
        "chip"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/postcode-chip",
      "family": "locations-pages",
      "name": "PostcodeChip",
      "label": "Postcode chip",
      "description": "Amber postcode Chip wrapped in a Popover that surfaces state and Local Government Area on hover or focus.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/postcode-chip",
      "tags": [
        "postcode",
        "chip",
        "popover"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/surrounding-suburbs-cloud",
      "family": "locations-pages",
      "name": "SurroundingSuburbsCloud",
      "label": "Surrounding suburbs cloud",
      "description": "Tag-cloud list of linked surrounding suburbs where chip tone and size scale with physical distance so the closest neighbours visually dominate.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/surrounding-suburbs-cloud",
      "tags": [
        "suburbs",
        "tag-cloud",
        "links"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/local-quote-cta-card",
      "family": "locations-pages",
      "name": "LocalQuoteCtaCard",
      "label": "Local quote CTA card",
      "description": "Glass-surface CTA card with a drop-off/mobile-fit radiogroup mode toggle, live helper copy, a call-workshop phone link, and a book-online action.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/local-quote-cta-card",
      "tags": [
        "quote",
        "cta",
        "toggle"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/suburb-testimonial",
      "family": "locations-pages",
      "name": "SuburbTestimonial",
      "label": "Suburb testimonial",
      "description": "Testimonial article framing a QuoteBubble with a star rating, customer Avatar, vehicle metadata, and a teal suburb Chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/suburb-testimonial",
      "tags": [
        "testimonial",
        "review",
        "social-proof"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/last-job-completed-card",
      "family": "locations-pages",
      "name": "LastJobCompletedCard",
      "label": "Last job completed card",
      "description": "Recent-work card on a material surface with a stylised exhaust SVG placeholder, days-ago chip, vehicle/suburb metadata, and a green status chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/last-job-completed-card",
      "tags": [
        "recent-work",
        "card",
        "social-proof"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/drive-time-chip",
      "family": "locations-pages",
      "name": "DriveTimeChip",
      "label": "Drive time chip",
      "description": "Adapter over the maps DistanceDurationChip that formats workshop-to-suburb distance and minutes with a traffic-aware tone and an origin caption.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/drive-time-chip",
      "tags": [
        "drive-time",
        "distance",
        "chip"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/locations-breadcrumb",
      "family": "locations-pages",
      "name": "LocationsBreadcrumb",
      "label": "Locations breadcrumb",
      "description": "Adapter over the Breadcrumb primitive supplying Home/Locations/suburb (and optional service) crumbs plus a persistent trailing state badge.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/locations-breadcrumb",
      "tags": [
        "breadcrumb",
        "navigation",
        "state"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/suburb-services-grid",
      "family": "locations-pages",
      "name": "SuburbServicesGrid",
      "label": "Suburb services grid",
      "description": "Grid of service tiles for a suburb, each with kicker, title, description, a localised teal chip, and a view-service link.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/suburb-services-grid",
      "tags": [
        "services",
        "grid",
        "seo"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/suburb-faq",
      "family": "locations-pages",
      "name": "SuburbFaq",
      "label": "Suburb FAQ",
      "description": "Thin adapter that feeds suburb-specific copy and items into the marketing FaqAccordion, rewriting the heading with the suburb name.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/suburb-faq",
      "tags": [
        "faq",
        "accordion",
        "seo"
      ],
      "status": "captured"
    },
    {
      "key": "locations-pages/service-suburb-cross-hero",
      "family": "locations-pages",
      "name": "ServiceSuburbCrossHero",
      "label": "Service-suburb cross hero",
      "description": "Glass-surface hero for service-by-suburb pages pairing a linked service chip with a suburb chip plus a cross headline, supporting copy, and CTAs.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/locations-pages",
      "routeHref": "/ui-primitives/locations-pages/service-suburb-cross-hero",
      "tags": [
        "hero",
        "service",
        "suburb",
        "seo"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
