import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "pos-checkout",
  "title": "POS checkout",
  "group": "Commerce",
  "summary": "15 point-of-sale register primitives — cart, scanner, EFTPOS terminal, split tender, refund/void flows, discounts, GST tax summary, cash-drawer tally, quick-add grid, payment-brand strip and thermal receipt preview — formatting AUD with GST throughout.",
  "entries": [
    {
      "key": "pos-checkout/cart-panel",
      "family": "pos-checkout",
      "name": "CartPanel",
      "label": "Cart panel",
      "description": "Active-sale cart with per-line quantity steppers, swipe-to-remove, and ex/inc GST subtotal footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/cart-panel",
      "tags": [
        "pos",
        "cart",
        "gst",
        "register"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/barcode-scanner-card",
      "family": "pos-checkout",
      "name": "BarcodeScannerCard",
      "label": "Barcode scanner",
      "description": "Scanner viewport with idle/active/error status, manual SKU fallback form, and recent-scan list.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/barcode-scanner-card",
      "tags": [
        "pos",
        "scanner",
        "sku",
        "input"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/eftpos-terminal-panel",
      "family": "pos-checkout",
      "name": "EftposTerminalPanel",
      "label": "EFTPOS terminal",
      "description": "Tyro/Square/Stripe terminal prompt showing charge, status dot, prompt log, and retry/cancel actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/eftpos-terminal-panel",
      "tags": [
        "pos",
        "eftpos",
        "payment",
        "terminal"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/split-tender-card",
      "family": "pos-checkout",
      "name": "SplitTenderCard",
      "label": "Split tender",
      "description": "Editable multi-method tender allocation with progress bar plus remaining/change-due reconciliation.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/split-tender-card",
      "tags": [
        "pos",
        "payment",
        "tender",
        "split"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/receipt-printer-row",
      "family": "pos-checkout",
      "name": "ReceiptPrinterRow",
      "label": "Receipt printer row",
      "description": "Print-queue row with kind glyph, status dot, and a reprint action enabled when printed or failed.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/receipt-printer-row",
      "tags": [
        "pos",
        "receipt",
        "printer",
        "queue"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/refund-flow-card",
      "family": "pos-checkout",
      "name": "RefundFlowCard",
      "label": "Refund flow",
      "description": "Four-step refund wizard (items, reason, method, confirm) with step indicators and computed refund total.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/refund-flow-card",
      "tags": [
        "pos",
        "refund",
        "wizard",
        "flow"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/customer-lookup-card",
      "family": "pos-checkout",
      "name": "CustomerLookupCard",
      "label": "Customer lookup",
      "description": "Phone/email/rego customer search with a matched-customer card showing loyalty tier, spend, and attach action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/customer-lookup-card",
      "tags": [
        "pos",
        "customer",
        "lookup",
        "loyalty"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/discount-picker",
      "family": "pos-checkout",
      "name": "DiscountPicker",
      "label": "Discount picker",
      "description": "Percent/dollar/coupon discount selector with reason chips and a live final-due summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/discount-picker",
      "tags": [
        "pos",
        "discount",
        "coupon",
        "pricing"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/tax-summary-tile",
      "family": "pos-checkout",
      "name": "TaxSummaryTile",
      "label": "Tax summary tile",
      "description": "AU GST breakdown (ex/GST/inc, BAS 1A bucket) with an optional tax-invoice ABN form and validation.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/tax-summary-tile",
      "tags": [
        "pos",
        "gst",
        "tax",
        "abn"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/quick-product-grid",
      "family": "pos-checkout",
      "name": "QuickProductGrid",
      "label": "Quick product grid",
      "description": "Tap-to-add tile grid of top-selling products showing glyph, tag, SKU, and AUD price.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/quick-product-grid",
      "tags": [
        "pos",
        "products",
        "grid",
        "quick-add"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/void-action-card",
      "family": "pos-checkout",
      "name": "VoidActionCard",
      "label": "Void action",
      "description": "Manager-PIN keypad to void a transaction, with PIN dots, error state, and confirm/cancel controls.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/void-action-card",
      "tags": [
        "pos",
        "void",
        "pin",
        "manager"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/daily-tally-panel",
      "family": "pos-checkout",
      "name": "DailyTallyPanel",
      "label": "Daily tally panel",
      "description": "Open/close cash-drawer reconciliation counting denominations against the system amount with variance.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/daily-tally-panel",
      "tags": [
        "pos",
        "cash",
        "drawer",
        "reconcile"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/payment-icon-strip",
      "family": "pos-checkout",
      "name": "PaymentIconStrip",
      "label": "Payment icon strip",
      "description": "Row of accepted payment-brand logos (incl. EFTPOS) with disabled states and an optional note.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/payment-icon-strip",
      "tags": [
        "pos",
        "payment",
        "brands",
        "icons"
      ],
      "status": "captured"
    },
    {
      "key": "pos-checkout/receipt-preview-card",
      "family": "pos-checkout",
      "name": "ReceiptPreviewCard",
      "label": "Receipt preview",
      "description": "A6 thermal-receipt mockup rendering brand header, line items, GST totals, tenders, and a seeded barcode.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pos-checkout",
      "routeHref": "/ui-primitives/pos-checkout/receipt-preview-card",
      "tags": [
        "pos",
        "receipt",
        "preview",
        "thermal"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
