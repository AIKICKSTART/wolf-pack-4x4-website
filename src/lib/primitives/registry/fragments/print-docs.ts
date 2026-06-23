import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "print-docs",
  "title": "Print documents",
  "group": "Operations",
  "summary": "Print-ready paper documents and surfaces for an auto workshop — a shared A4/Letter/Receipt sheet, a print-preview frame, SVG barcode/QR encoders, and eight composed business documents (invoice, receipt, work order, quote, packing slip, purchase order, consent form, compliance certificate).",
  "entries": [
    {
      "key": "print-docs/print-sheet",
      "family": "print-docs",
      "name": "PrintSheet",
      "label": "Print sheet",
      "description": "Paper-format container (A4/Letter/Receipt) with optional header and footer slots wrapping arbitrary print content.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/sheet",
      "tags": [
        "paper",
        "layout",
        "print"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/print-preview-frame",
      "family": "print-docs",
      "name": "PrintPreviewFrame",
      "label": "Print preview frame",
      "description": "Client preview chrome with a document-id toolbar, format/page meta, and a Print button that opens the browser print dialog.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/preview-frame",
      "tags": [
        "preview",
        "toolbar",
        "print"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/barcode-block",
      "family": "print-docs",
      "name": "BarcodeBlock",
      "label": "Barcode",
      "description": "SVG barcode rendered from a deterministic hash of the value, with an optional human-readable label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/barcode",
      "tags": [
        "barcode",
        "svg",
        "encode"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/qr-block",
      "family": "print-docs",
      "name": "QrBlock",
      "label": "QR code",
      "description": "SVG QR-style code with finder patterns and a hash-seeded module grid, with an optional label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/qr",
      "tags": [
        "qr",
        "svg",
        "encode"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/print-invoice",
      "family": "print-docs",
      "name": "PrintInvoice",
      "label": "Tax invoice",
      "description": "A4 tax invoice composing PrintSheet with from/bill-to parties, line items, GST totals and payment instructions.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/invoice",
      "tags": [
        "invoice",
        "billing",
        "document"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/print-receipt",
      "family": "print-docs",
      "name": "PrintReceipt",
      "label": "Receipt",
      "description": "Receipt-format thermal-style document with workshop details, line items, payment/change totals and a transaction barcode.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/receipt",
      "tags": [
        "receipt",
        "pos",
        "document"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/print-work-order",
      "family": "print-docs",
      "name": "PrintWorkOrder",
      "label": "Work order",
      "description": "A4 workshop work order composing PrintSheet with customer, vehicle, requested tasks, technicians, parts used and an hours log.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/work-order",
      "tags": [
        "work-order",
        "workshop",
        "document"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/print-quote",
      "family": "print-docs",
      "name": "PrintQuote",
      "label": "Quote",
      "description": "A4 customer quote composing PrintSheet with parties, vehicle, numbered scope items, pricing, GST totals and terms.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/quote",
      "tags": [
        "quote",
        "estimate",
        "document"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/print-packing-slip",
      "family": "print-docs",
      "name": "PrintPackingSlip",
      "label": "Packing slip",
      "description": "A4 outbound packing slip composing PrintSheet with ship-from/to addresses, ordered-vs-packed quantities, freight tracking and a barcode.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/packing-slip",
      "tags": [
        "packing-slip",
        "shipping",
        "document"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/print-purchase-order",
      "family": "print-docs",
      "name": "PrintPurchaseOrder",
      "label": "Purchase order",
      "description": "A4 purchase order composing PrintSheet with buyer/supplier/ship-to parties, order lines, GST totals, terms and authorisation.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/purchase-order",
      "tags": [
        "purchase-order",
        "procurement",
        "document"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/print-consent-form",
      "family": "print-docs",
      "name": "PrintConsentForm",
      "label": "Consent form",
      "description": "A4 customer consent/authorisation form composing PrintSheet with customer, vehicle, scope of work, risk disclosure and acknowledgements.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/consent-form",
      "tags": [
        "consent",
        "authorisation",
        "document"
      ],
      "status": "captured"
    },
    {
      "key": "print-docs/print-compliance-cert",
      "family": "print-docs",
      "name": "PrintComplianceCert",
      "label": "Compliance certificate",
      "description": "A4 ornamented certificate of compliance composing PrintSheet with vehicle, ADR reference, technician details and a verification QR code.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/print-docs",
      "routeHref": "/ui-primitives/print-docs/compliance-cert",
      "tags": [
        "certificate",
        "compliance",
        "document"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
