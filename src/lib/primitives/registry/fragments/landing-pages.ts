import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "landing-pages",
  "title": "Landing pages",
  "group": "Marketing",
  "summary": "14 marketing landing-page primitives — heroes, social proof, feature/pricing/comparison grids, testimonial carousel, FAQ, multi-step lead form, animated metrics, case study, CTA band, event and partner cards — sharing a Landing* type vocabulary and brand-token styling.",
  "entries": [
    {
      "key": "landing-pages/hero-split-section",
      "family": "landing-pages",
      "name": "HeroSplitSection",
      "label": "Hero split",
      "description": "Split-screen hero with copy (badge, kicker, headline, subhead, bullets, dual CTA) on one side and a media placeholder tile on the other, with switchable media side.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/hero-split-section",
      "tags": [
        "hero",
        "marketing",
        "cta"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/hero-centred-section",
      "family": "landing-pages",
      "name": "HeroCentredSection",
      "label": "Hero centred",
      "description": "Centred hero with optional kinetic display headline (KineticText), badge, subhead, dual CTA, and an optional pillars row.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/hero-centred-section",
      "tags": [
        "hero",
        "kinetic",
        "marketing"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/social-proof-strip",
      "family": "landing-pages",
      "name": "SocialProofStrip",
      "label": "Social proof strip",
      "description": "Social-proof band with kicker/heading, an aggregate star rating plus review count and customer-since line, and a row of partner/brand logo label cards.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/social-proof-strip",
      "tags": [
        "social-proof",
        "ratings",
        "trust"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/feature-grid-section",
      "family": "landing-pages",
      "name": "FeatureGridSection",
      "label": "Feature grid",
      "description": "3-by-2 responsive feature grid; each cell has a mapped lucide icon, title, body, and optional inline link.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/feature-grid-section",
      "tags": [
        "features",
        "grid",
        "icons"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/testimonial-carousel",
      "family": "landing-pages",
      "name": "TestimonialCarousel",
      "label": "Testimonial carousel",
      "description": "Client-side testimonial carousel with prev/next nav, dot tabs, optional reduced-motion-aware autoplay, and a polite live region; cards carry initials, rating, quote, and case-study link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/testimonial-carousel",
      "tags": [
        "testimonials",
        "carousel",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/pricing-table-card",
      "family": "landing-pages",
      "name": "PricingTableCard",
      "label": "Pricing table",
      "description": "3-column pricing table; each tier shows name, tagline, tabular monthly price, setup note, included/excluded feature list with check/X icons, and a CTA, with one recommended tier lifted and badged.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/pricing-table-card",
      "tags": [
        "pricing",
        "tiers",
        "commerce"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/comparison-table-section",
      "family": "landing-pages",
      "name": "ComparisonTableSection",
      "label": "Comparison table",
      "description": "Vs-competitor comparison matrix table with one column per axis and one row per capability, check/minus/X cell icons, and a highlighted self column.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/comparison-table-section",
      "tags": [
        "comparison",
        "table",
        "competitor"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/faq-accordion-section",
      "family": "landing-pages",
      "name": "FaqAccordionSection",
      "label": "FAQ accordion",
      "description": "Client-side single-open FAQ accordion with an optional search filter narrowing entries by question, answer, and tag membership.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/faq-accordion-section",
      "tags": [
        "faq",
        "accordion",
        "search"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/lead-capture-form",
      "family": "landing-pages",
      "name": "LeadCaptureForm",
      "label": "Lead capture form",
      "description": "Three-step progressive lead form (contact, vehicle, service) with a stepper, per-step validation gating, and a success panel that emits a values snapshot on final submit.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/lead-capture-form",
      "tags": [
        "form",
        "lead-gen",
        "multi-step"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/metric-counter-strip",
      "family": "landing-pages",
      "name": "MetricCounterStrip",
      "label": "Metric counter strip",
      "description": "Animated metric strip that lazy-starts CountUp animations via IntersectionObserver when scrolled into view; each cell shows value, label, and optional caption with tabular numerics.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/metric-counter-strip",
      "tags": [
        "metrics",
        "count-up",
        "stats"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/case-study-card",
      "family": "landing-pages",
      "name": "CaseStudyCard",
      "label": "Case study card",
      "description": "Case study card with client/vehicle header, problem and solution blocks, an outcomes list, and a footer PDF download CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/case-study-card",
      "tags": [
        "case-study",
        "card",
        "outcomes"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/cta-band-section",
      "family": "landing-pages",
      "name": "CtaBandSection",
      "label": "CTA band",
      "description": "Full-width CTA band with a layered radial-gradient background, kicker, headline, sub-text, and a primary CTA plus optional secondary ghost button.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/cta-band-section",
      "tags": [
        "cta",
        "conversion",
        "band"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/event-card",
      "family": "landing-pages",
      "name": "EventCard",
      "label": "Event card",
      "description": "Upcoming-event card with a left date tile, title, date/location meta row, summary, RSVP button, and an optional capacity progress bar with tabular numerics.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/event-card",
      "tags": [
        "event",
        "card",
        "rsvp"
      ],
      "status": "captured"
    },
    {
      "key": "landing-pages/partner-logo-grid",
      "family": "landing-pages",
      "name": "PartnerLogoGrid",
      "label": "Partner logo grid",
      "description": "Partner/supplier logo grid where each anchor card shows a brand name with an external-link icon, category line, and short caption, linking out to the partner.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/landing-pages",
      "routeHref": "/ui-primitives/landing-pages/partner-logo-grid",
      "tags": [
        "partners",
        "logos",
        "grid"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
