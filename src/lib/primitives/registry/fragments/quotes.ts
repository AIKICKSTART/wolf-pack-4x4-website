import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "quotes",
  "title": "Quotes",
  "group": "Commerce",
  "summary": "13 quote-and-proposal commerce primitives covering line-item editing, discounts, tax totals, terms, e-signature capture, acceptance tracking, counter-offers, validity countdowns, and proposal/pricing presentation surfaces.",
  "entries": [
    {
      "key": "quotes/quote-line-item",
      "family": "quotes",
      "name": "QuoteLineItem",
      "label": "Quote line item",
      "description": "Editable quote line row with catalogue select, quantity/unit-price inputs, live line total, optional discount chip, and remove control.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/quote-line-item",
      "tags": [
        "quote",
        "line-item",
        "editor"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/quote-bundle-option",
      "family": "quotes",
      "name": "QuoteBundleOption",
      "label": "Quote bundle option",
      "description": "Collapsible bundle card showing name, description, bundle price, savings chip, and an expandable list of included items.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/quote-bundle-option",
      "tags": [
        "quote",
        "bundle",
        "pricing"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/discount-editor",
      "family": "quotes",
      "name": "DiscountEditor",
      "label": "Discount editor",
      "description": "Discount control with percentage/fixed/bulk-tier type toggle, amount field, scope select, and internal reason note.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/discount-editor",
      "tags": [
        "quote",
        "discount",
        "editor"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/tax-calc-strip",
      "family": "quotes",
      "name": "TaxCalcStrip",
      "label": "Tax calc strip",
      "description": "Totals strip listing subtotal, per-tax-line rates/amounts, and grand total with a tax-inclusive toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/tax-calc-strip",
      "tags": [
        "quote",
        "tax",
        "totals"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/terms-conditions-editor",
      "family": "quotes",
      "name": "TermsConditionsEditor",
      "label": "Terms & conditions editor",
      "description": "Markdown terms editor with bold/italic/bullet/link toolbar wrapping selection, plus version and last-edited chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/terms-conditions-editor",
      "tags": [
        "quote",
        "terms",
        "editor"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/send-for-signature-card",
      "family": "quotes",
      "name": "SendForSignatureCard",
      "label": "Send for signature card",
      "description": "Form card to email a quote for signature with signer name/email, subject, and cover-note fields and a send action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/send-for-signature-card",
      "tags": [
        "quote",
        "signature",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/e-signature-pad",
      "family": "quotes",
      "name": "ESignaturePad",
      "label": "E-signature pad",
      "description": "Signature capture supporting typed, drawn, or uploaded methods with a legally-binding consent checkbox gating the sign action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/e-signature-pad",
      "tags": [
        "quote",
        "signature",
        "e-sign"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/quote-acceptance-tracker",
      "family": "quotes",
      "name": "QuoteAcceptanceTracker",
      "label": "Quote acceptance tracker",
      "description": "Timeline of quote lifecycle states (sent/opened/viewed/accepted, with declined handling) plus an optional send-reminder action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/quote-acceptance-tracker",
      "tags": [
        "quote",
        "tracker",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/counter-offer-card",
      "family": "quotes",
      "name": "CounterOfferCard",
      "label": "Counter-offer card",
      "description": "Customer counter-offer card showing changed lines original→revised, revised total delta chip, customer note, and accept/counter/reject actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/counter-offer-card",
      "tags": [
        "quote",
        "counter-offer",
        "negotiation"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/quote-validity-countdown",
      "family": "quotes",
      "name": "QuoteValidityCountdown",
      "label": "Quote validity countdown",
      "description": "Live countdown bar to a quote's expiry with urgent/expired states and an extend-validity action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/quote-validity-countdown",
      "tags": [
        "quote",
        "countdown",
        "expiry"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/proposal-cover-page",
      "family": "quotes",
      "name": "ProposalCoverPage",
      "label": "Proposal cover page",
      "description": "Branded proposal cover sheet with hero mark, client/project title, and metadata for proposal date, number, and author.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/proposal-cover-page",
      "tags": [
        "proposal",
        "cover",
        "document"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/proposal-section-divider",
      "family": "quotes",
      "name": "ProposalSectionDivider",
      "label": "Proposal section divider",
      "description": "Numbered section divider with title, optional subtitle, and tone variants for structuring a proposal document.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/proposal-section-divider",
      "tags": [
        "proposal",
        "divider",
        "section"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/pricing-comparison-block",
      "family": "quotes",
      "name": "PricingComparisonBlock",
      "label": "Pricing comparison block",
      "description": "Multi-plan pricing comparison with per-plan price, included/excluded feature rows, recommended badge, and CTA per plan.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/pricing-comparison-block",
      "tags": [
        "pricing",
        "comparison",
        "plans"
      ],
      "status": "captured"
    },
    {
      "key": "quotes/duplicate-detection-banner",
      "family": "quotes",
      "name": "DuplicateDetectionBanner",
      "label": "Duplicate detection banner",
      "description": "Alert banner flagging a similar existing quote with match percentage and open-existing / create-new-anyway actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/quotes",
      "routeHref": "/ui-primitives/quotes/duplicate-detection-banner",
      "tags": [
        "quote",
        "duplicate",
        "alert"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
