import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "supplier-portal",
  "title": "Supplier portal",
  "group": "Operations",
  "summary": "14 trade-supplier portal primitives — login, PO acknowledgement, backorder/price/SKU broadcasts, catalog upload, invoicing, payments, performance, roster, compliance and volume tiers — composed from auth/commerce/data-display/charts/data-import primitives with AUD+GST math and semantic tone states.",
  "entries": [
    {
      "key": "supplier-portal/login-surface",
      "family": "supplier-portal",
      "name": "SupplierLoginSurface",
      "label": "Supplier login surface",
      "description": "Trade sign-in surface wrapping AuthShell with account/password fields, optional 2FA hint banner, OAuth row and a request-access CTA.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/login",
      "tags": [
        "auth",
        "supplier",
        "login"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/order-request-card",
      "family": "supplier-portal",
      "name": "OrderRequestCard",
      "label": "Order request card",
      "description": "Inbound PO summary card listing requested line items with state chip and ex-GST/GST/incl-GST AUD totals across dashboard cards.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/order-request",
      "tags": [
        "order",
        "purchase-order",
        "commerce"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/order-acknowledgement-form",
      "family": "supplier-portal",
      "name": "OrderAcknowledgementForm",
      "label": "Order acknowledgement form",
      "description": "PO acknowledgement form with accept/partial/decline radiogroup, lead-time, carrier select and tracking-reference input.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/order-acknowledgement",
      "tags": [
        "order",
        "form",
        "fulfillment"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/backorder-notice-card",
      "family": "supplier-portal",
      "name": "BackorderNoticeCard",
      "label": "Backorder notice card",
      "description": "Backorder broadcast card showing reason chip, expected-restock and affected-customer metrics with an optional alternative-SKU suggestion.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/backorder-notice",
      "tags": [
        "inventory",
        "backorder",
        "alert"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/price-update-broadcast",
      "family": "supplier-portal",
      "name": "PriceUpdateBroadcast",
      "label": "Price update broadcast",
      "description": "Was/now price-change card with PriceTags, percent-delta chip toned by direction and a count of repriced active quotes.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/price-update",
      "tags": [
        "pricing",
        "broadcast",
        "commerce"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/new-sku-announcement",
      "family": "supplier-portal",
      "name": "NewSkuAnnouncement",
      "label": "New SKU announcement",
      "description": "Revealed product-launch card with hero image (or placeholder swatch), launch chip, RRP PriceTag and an add-to-catalog CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/new-sku",
      "tags": [
        "catalog",
        "launch",
        "product"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/dashboard-overview",
      "family": "supplier-portal",
      "name": "SupplierDashboardOverview",
      "label": "Supplier dashboard overview",
      "description": "Supplier landing dashboard combining a MetricBlock, monthly-volume Sparkline, payment-status summary list and an ActivityFeed.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/dashboard-overview",
      "tags": [
        "dashboard",
        "overview",
        "metrics"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/catalog-upload-wizard",
      "family": "supplier-portal",
      "name": "CatalogUploadWizard",
      "label": "Catalog upload wizard",
      "description": "Three-step (upload/map/review) catalog import wizard wiring CsvFilePreview, ColumnMapper and DryRunSummary behind a tabbed ProcessSteps header.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/catalog-upload",
      "tags": [
        "import",
        "wizard",
        "csv"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/invoice-submission-form",
      "family": "supplier-portal",
      "name": "InvoiceSubmissionForm",
      "label": "Invoice submission form",
      "description": "Invoice submission form with invoice/PO fields, line-item list, GST-inclusive toggle with live ex/GST/total math and a PDF attachment input.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/invoice-submission",
      "tags": [
        "invoice",
        "form",
        "billing"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/payment-status-row",
      "family": "supplier-portal",
      "name": "PaymentStatusRow",
      "label": "Payment status row",
      "description": "Table row for an invoice showing amount, due date, payment-state chip and a days-since-submit chip; flags overdue rows with role=alert.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/payment-status",
      "tags": [
        "payment",
        "table-row",
        "billing"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/performance-scorecard",
      "family": "supplier-portal",
      "name": "SupplierPerformanceScorecard",
      "label": "Supplier performance scorecard",
      "description": "Scorecard with on-time-delivery and order-accuracy RadialMeters plus a tone-coded lead-time-variance chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/performance-scorecard",
      "tags": [
        "performance",
        "scorecard",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/roster",
      "family": "supplier-portal",
      "name": "SupplierRoster",
      "label": "Supplier roster",
      "description": "Grid of supplier trade-contact reps rendered as Avatars with name, role and last-active label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/roster",
      "tags": [
        "roster",
        "contacts",
        "people"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/compliance-cert-upload",
      "family": "supplier-portal",
      "name": "ComplianceCertUpload",
      "label": "Compliance certificate upload",
      "description": "Compliance certificate upload surface with certificate-type select, expiry date, checksum-verified chip and an embedded FileUploadForm.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/compliance-cert",
      "tags": [
        "compliance",
        "upload",
        "certificate"
      ],
      "status": "captured"
    },
    {
      "key": "supplier-portal/volume-discount-tier-card",
      "family": "supplier-portal",
      "name": "VolumeDiscountTierCard",
      "label": "Volume discount tier card",
      "description": "Volume-tier card showing threshold vs current annual spend, discount percent, a progress bar toward unlock and an optional next-tier preview.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/supplier-portal",
      "routeHref": "/ui-primitives/supplier-portal/volume-tier",
      "tags": [
        "pricing",
        "discount",
        "loyalty"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
