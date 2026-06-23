import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "services-areas-pages",
  "title": "Services & area pages",
  "group": "Marketing",
  "summary": "14 service-detail and regional area-hub page primitives — typed adapters over shared marketing, maps, commerce, data-display and icon primitives (plus two net-new layout compositions) that assemble the public services index, service-detail, and area-hub surfaces.",
  "entries": [
    {
      "key": "services-areas-pages/services-index-hero",
      "family": "services-areas-pages",
      "name": "ServicesIndexHero",
      "label": "Services index hero",
      "description": "Services-index hero adapter over marketing TextFirstHero with service-count and lead-time trust chips, wrapped in a region landmark.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/services-index-hero",
      "tags": [
        "hero",
        "services",
        "marketing"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/service-tile",
      "family": "services-areas-pages",
      "name": "ServiceTile",
      "label": "Service tile",
      "description": "Single-anchor service tile with category iconmark, accent top-bar, and Type/Lead/Price meta chips linking to a service page.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/service-tile",
      "tags": [
        "card",
        "service",
        "link"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/service-detail-hero",
      "family": "services-areas-pages",
      "name": "ServiceDetailHero",
      "label": "Service detail hero",
      "description": "Service-detail hero over marketing FeatureSpotlight with a cover image placeholder, Sound/Compliance/Performance scope bullets, and primary plus secondary CTAs.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/service-detail-hero",
      "tags": [
        "hero",
        "service",
        "marketing"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/service-process-steps",
      "family": "services-areas-pages",
      "name": "ServiceProcessSteps",
      "label": "Service process steps",
      "description": "Workshop process-steps adapter over marketing ProcessSteps that supplies drop-off/fitment/build/test/handover icons from the shared icon library.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/service-process-steps",
      "tags": [
        "process",
        "steps",
        "service"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/service-faq-block",
      "family": "services-areas-pages",
      "name": "ServiceFaqBlock",
      "label": "Service FAQ block",
      "description": "Service FAQ adapter over the marketing FaqAccordion (Base UI accordion) supplying the typed ServiceFaq shape with a default-open entry.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/service-faq-block",
      "tags": [
        "faq",
        "accordion",
        "service"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/service-testimonials",
      "family": "services-areas-pages",
      "name": "ServiceTestimonials",
      "label": "Service testimonials",
      "description": "Service testimonials adapter over marketing TestimonialWall, mapping each ServiceTestimonial (vehicle as role, star rating) into an obsidian-tone wall entry.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/service-testimonials",
      "tags": [
        "testimonials",
        "reviews",
        "service"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/service-pricing-band",
      "family": "services-areas-pages",
      "name": "ServicePricingBand",
      "label": "Service pricing band",
      "description": "Pricing band composing the commerce PriceTag with a 'From' label and three non-interactive GST/deposit/finance descriptive chips.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/service-pricing-band",
      "tags": [
        "pricing",
        "commerce",
        "service"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/service-coverage-card",
      "family": "services-areas-pages",
      "name": "ServiceCoverageCard",
      "label": "Service coverage card",
      "description": "Net-new service-to-suburb cross-link card with an embedded StaticMapCanvas plus ServiceRadiusOverlay, a drive-time stat, a suburb chip cloud, and a see-all CTA.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/service-coverage-card",
      "tags": [
        "coverage",
        "map",
        "service"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/area-hub-hero",
      "family": "services-areas-pages",
      "name": "AreaHubHero",
      "label": "Area hub hero",
      "description": "Regional area-hub hero over marketing TextFirstHero in split-credit layout, with the region name as headline and suburbs/workshops counts as trust indicators.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/area-hub-hero",
      "tags": [
        "hero",
        "area",
        "regional"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/area-coverage-map-mini",
      "family": "services-areas-pages",
      "name": "AreaCoverageMapMini",
      "label": "Area coverage mini-map",
      "description": "Area mini coverage map composing StaticMapCanvas with per-workshop MapPin markers, density-toned pins, and a scale-bar chip overlay.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/area-coverage-map-mini",
      "tags": [
        "map",
        "coverage",
        "area"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/area-stats-trio",
      "family": "services-areas-pages",
      "name": "AreaStatsTrio",
      "label": "Area stats trio",
      "description": "Area stats adapter over data-display MetricBlock rendering three stat tiles (workshops, suburbs, response time) with helper lines as flat deltas.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/area-stats-trio",
      "tags": [
        "stats",
        "metrics",
        "area"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/area-services-grid",
      "family": "services-areas-pages",
      "name": "AreaServicesGrid",
      "label": "Area services grid",
      "description": "Area services grid over marketing FeatureGrid mapping each localised area service into a three-column feature with category icon and Book CTA.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/area-services-grid",
      "tags": [
        "grid",
        "services",
        "area"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/services-breadcrumb",
      "family": "services-areas-pages",
      "name": "ServicesBreadcrumb",
      "label": "Services breadcrumb",
      "description": "Breadcrumb adapter over the shared primitives Breadcrumb supplying the typed ServicesCrumb[] (label + href, no postcode badge).",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/services-breadcrumb",
      "tags": [
        "breadcrumb",
        "navigation",
        "service"
      ],
      "status": "captured"
    },
    {
      "key": "services-areas-pages/area-suburb-list-card",
      "family": "services-areas-pages",
      "name": "AreaSuburbListCard",
      "label": "Area suburb list card",
      "description": "Net-new area-to-suburb list card where each row carries a postcode chip, a maps DistanceDurationChip drive-time chip, and a services-count badge.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/services-areas-pages",
      "routeHref": "/ui-primitives/services-areas-pages/area-suburb-list-card",
      "tags": [
        "list",
        "suburbs",
        "area"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
