import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "customer-portal",
  "title": "Customer portal",
  "group": "Operations",
  "summary": "14 self-service portal surfaces for vehicle owners — account, garage, bookings, quotes, invoices, loyalty, service history, documents, referrals, feedback, addresses, notification prefs, and workshop chat — sharing a Portal* data envelope and Mufflermen tone/icon system.",
  "entries": [
    {
      "key": "customer-portal/account-summary-tile",
      "family": "customer-portal",
      "name": "AccountSummaryTile",
      "label": "Account summary tile",
      "description": "Customer header tile with avatar, loyalty-tier and garage chips, member facts, and a next-reward progress bar.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/account-summary-tile",
      "tags": [
        "account",
        "loyalty",
        "profile"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/address-book-row",
      "family": "customer-portal",
      "name": "AddressBookRow",
      "label": "Address book row",
      "description": "Saved-address row with use-type and default chips plus optional set-default, edit, and remove actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/address-book-row",
      "tags": [
        "address",
        "account",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/appointment-card",
      "family": "customer-portal",
      "name": "AppointmentCard",
      "label": "Appointment card",
      "description": "Upcoming-service card showing date block, vehicle, bay/tech/duration facts, and reschedule/cancel actions locked within 24h.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/appointment-card",
      "tags": [
        "booking",
        "appointment",
        "schedule"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/booking-wizard",
      "family": "customer-portal",
      "name": "BookingWizard",
      "label": "Booking wizard",
      "description": "Four-step stateful wizard (service, vehicle, date/time, confirm) with progress bar and a booked-confirmation state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/booking-wizard",
      "tags": [
        "booking",
        "wizard",
        "stepper"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/chat-with-workshop",
      "family": "customer-portal",
      "name": "ChatWithWorkshop",
      "label": "Chat with workshop",
      "description": "Threaded customer/workshop/Hermes chat with job context, typing/AI-assist status strip, and a stateful composer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/chat-with-workshop",
      "tags": [
        "chat",
        "messaging",
        "support"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/doc-download-row",
      "family": "customer-portal",
      "name": "DocDownloadRow",
      "label": "Document download row",
      "description": "Document row keyed by kind icon (receipt, roadworthy, dyno, warranty, manual) with size/pages facts; renders as button when downloadable.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/doc-download-row",
      "tags": [
        "document",
        "download",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/feedback-prompt",
      "family": "customer-portal",
      "name": "FeedbackPrompt",
      "label": "Feedback prompt",
      "description": "Post-service star-rating and comment form with live rating hints and a submitted thank-you state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/feedback-prompt",
      "tags": [
        "feedback",
        "rating",
        "nps"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/invoice-pay-card",
      "family": "customer-portal",
      "name": "InvoicePayCard",
      "label": "Invoice pay card",
      "description": "Invoice card with GST breakdown, balance/partial-paid progress, payment-method radio options, and a stateful pay action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/invoice-pay-card",
      "tags": [
        "invoice",
        "payment",
        "billing"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/loyalty-card",
      "family": "customer-portal",
      "name": "LoyaltyCard",
      "label": "Loyalty card",
      "description": "Stamp-card loyalty surface with filled/pending stamp grid, tier chip, reward-ready state, and visit stats.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/loyalty-card",
      "tags": [
        "loyalty",
        "rewards",
        "stamps"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/notification-pref-panel",
      "family": "customer-portal",
      "name": "NotificationPrefPanel",
      "label": "Notification preferences panel",
      "description": "Per-topic SMS/email/push toggle matrix with a live on-channel count summary and quiet-hours footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/notification-pref-panel",
      "tags": [
        "notifications",
        "preferences",
        "settings"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/quote-viewer",
      "family": "customer-portal",
      "name": "QuoteViewer",
      "label": "Quote viewer",
      "description": "Itemised quote with part/labour/fee line table, computed ex-GST subtotal/GST/total, and accept/decline/download with locked terminal states.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/quote-viewer",
      "tags": [
        "quote",
        "estimate",
        "billing"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/referral-share-card",
      "family": "customer-portal",
      "name": "ReferralShareCard",
      "label": "Referral share card",
      "description": "Refer-a-mate card with copy-to-clipboard code and link, invited/booked/banked stats, and a recent-activity list.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/referral-share-card",
      "tags": [
        "referral",
        "sharing",
        "rewards"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/service-history-timeline",
      "family": "customer-portal",
      "name": "ServiceHistoryTimeline",
      "label": "Service history timeline",
      "description": "Vertical service-history timeline with kind-iconed entries, odometer/tech/invoice facts, lifetime-spend stats, PDF links, and an empty state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/service-history-timeline",
      "tags": [
        "history",
        "timeline",
        "service"
      ],
      "status": "captured"
    },
    {
      "key": "customer-portal/vehicle-garage-grid",
      "family": "customer-portal",
      "name": "VehicleGarageGrid",
      "label": "Vehicle garage grid",
      "description": "Grid of owned-vehicle tiles with odometer/last-next-service facts, service-due and recall chips, optional select interaction, and an empty state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/customer-portal",
      "routeHref": "/ui-primitives/customer-portal/vehicle-garage-grid",
      "tags": [
        "vehicle",
        "garage",
        "grid"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
