import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "billing",
  "title": "Billing",
  "group": "Commerce",
  "summary": "14 Stripe-style subscription-management primitives for the Oak Flats Mufflermen admin and customer surfaces — subscription overview, plan switching, invoicing, payment methods, ACH mandates, refunds, credits, promo codes, dunning, metered usage, proration, tax info/exemption, and payment receipts. AU-localised (GST 10%, ABN, BSB, en-AU formatting).",
  "entries": [
    {
      "key": "billing/subscription-overview-card",
      "family": "billing",
      "name": "SubscriptionOverviewCard",
      "label": "Subscription overview",
      "description": "Summary card showing plan name, status chip, billed amount/interval, next renewal date, optional seat usage, and configurable manage-action buttons.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/subscription-overview",
      "tags": [
        "subscription",
        "summary",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "billing/plan-switcher",
      "family": "billing",
      "name": "PlanSwitcher",
      "label": "Plan switcher",
      "description": "Side-by-side plan tiers with a current-plan badge, monthly/annual interval toggle, per-plan pricing, and a feature-comparison matrix table.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/plan-switcher",
      "tags": [
        "plans",
        "pricing",
        "toggle",
        "comparison"
      ],
      "status": "captured"
    },
    {
      "key": "billing/invoice-viewer",
      "family": "billing",
      "name": "InvoiceViewer",
      "label": "Invoice viewer",
      "description": "Invoice document with billing-to/issue/due metadata, line-item table, computed subtotal/GST 10%/total, status chip, and download/mark-paid/send actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/invoice-viewer",
      "tags": [
        "invoice",
        "gst",
        "line-items"
      ],
      "status": "captured"
    },
    {
      "key": "billing/payment-method-update",
      "family": "billing",
      "name": "PaymentMethodUpdate",
      "label": "Payment method update",
      "description": "Card-entry form with live brand detection/formatting, CVC/expiry masking, AU billing-address fields, a 3D Secure note banner, and a set-as-default toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/payment-method-update",
      "tags": [
        "payment",
        "card",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "billing/tax-info-edit",
      "family": "billing",
      "name": "TaxInfoEdit",
      "label": "Tax info edit",
      "description": "Tax-details form that switches the tax-ID label and validator by country (ABN/NZBN/VAT/EIN), shows a live validation chip, and offers a VAT reverse-charge toggle where applicable.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/tax-info-edit",
      "tags": [
        "tax",
        "abn",
        "validation",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "billing/ach-mandate-card",
      "family": "billing",
      "name": "AchMandateCard",
      "label": "ACH mandate",
      "description": "Direct-debit mandate card displaying BSB/account/holder, the direct-debit service agreement text, and a type-to-sign authorisation flow or revoke action keyed to mandate status.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/ach-mandate",
      "tags": [
        "direct-debit",
        "mandate",
        "sign"
      ],
      "status": "captured"
    },
    {
      "key": "billing/refund-flow",
      "family": "billing",
      "name": "RefundFlow",
      "label": "Refund flow",
      "description": "Two-step refund wizard — select a refundable invoice, then choose full or partial amount with a reason dropdown and internal note before confirming.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/refund-flow",
      "tags": [
        "refund",
        "wizard",
        "steps"
      ],
      "status": "captured"
    },
    {
      "key": "billing/credit-balance-card",
      "family": "billing",
      "name": "CreditBalanceCard",
      "label": "Credit balance",
      "description": "Account-credit card with an available-balance hero, an apply-to-next-invoice CTA, and a recent-credits ledger list with signed amounts and dates.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/credit-balance",
      "tags": [
        "credit",
        "ledger",
        "balance"
      ],
      "status": "captured"
    },
    {
      "key": "billing/promo-code-redeem",
      "family": "billing",
      "name": "PromoCodeRedeem",
      "label": "Promo code redeem",
      "description": "Promo-code entry field that validates against known codes, shows an applied-state row with benefit/expiry chips and remove action, and surfaces an inline not-recognised error.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/promo-code",
      "tags": [
        "promo",
        "discount",
        "redeem"
      ],
      "status": "captured"
    },
    {
      "key": "billing/dunning-notice-card",
      "family": "billing",
      "name": "DunningNoticeCard",
      "label": "Dunning notice",
      "description": "Past-due alert card whose styling and copy vary by dunning stage, showing amount due, days past due, next retry and grace-end dates, plus pay-now and update-payment CTAs.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/dunning-notice",
      "tags": [
        "dunning",
        "past-due",
        "alert"
      ],
      "status": "captured"
    },
    {
      "key": "billing/usage-billing-dashboard",
      "family": "billing",
      "name": "UsageBillingDashboard",
      "label": "Usage billing dashboard",
      "description": "Metered-usage dashboard with per-feature usage meters, optional 30-day SVG sparkline trends, per-unit rates, and a projected-overage total for the current billing period.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/usage-dashboard",
      "tags": [
        "usage",
        "metered",
        "dashboard",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "billing/proration-preview",
      "family": "billing",
      "name": "ProrationPreview",
      "label": "Proration preview",
      "description": "Plan-change proration summary showing unused credit from the old plan, the new-cycle charge, effective date, and the net amount due (or credit) via an aria-live status region.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/proration-preview",
      "tags": [
        "proration",
        "plan-change",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "billing/tax-exemption-card",
      "family": "billing",
      "name": "TaxExemptionCard",
      "label": "Tax exemption",
      "description": "Tax-exemption card showing jurisdiction, certificate name with optional expiry, a pending/active/expired status chip, and a certificate upload/replace control.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/tax-exemption",
      "tags": [
        "tax",
        "exemption",
        "upload"
      ],
      "status": "captured"
    },
    {
      "key": "billing/payment-receipt-modal",
      "family": "billing",
      "name": "PaymentReceiptModal",
      "label": "Payment receipt modal",
      "description": "Post-payment confirmation dialog (Escape/backdrop to close) showing charged amount, card brand/last-4, transaction ID, paid timestamp, recipient email, and download/email actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/billing",
      "routeHref": "/ui-primitives/billing/payment-receipt",
      "tags": [
        "receipt",
        "modal",
        "confirmation"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
