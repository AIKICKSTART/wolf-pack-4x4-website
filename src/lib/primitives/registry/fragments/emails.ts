import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "emails",
  "title": "Emails",
  "group": "Marketing",
  "summary": "12 brand-styled transactional/lifecycle email templates (table-based, inline-styled, email-client-safe) plus a live preview frame, all driven by a shared emailTokens palette and type-stack.",
  "entries": [
    {
      "key": "emails/welcome",
      "family": "emails",
      "name": "EmailWelcome",
      "label": "Welcome",
      "description": "Onboarding welcome email greeting a new account holder with a primary dashboard CTA plus first-service and help-desk links.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/welcome",
      "tags": [
        "transactional",
        "onboarding",
        "lifecycle"
      ],
      "status": "captured"
    },
    {
      "key": "emails/password-reset",
      "family": "emails",
      "name": "EmailPasswordReset",
      "label": "Password reset",
      "description": "Security email with a reset-password CTA, expiry notice, and request-details box showing originating IP and device.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/password-reset",
      "tags": [
        "transactional",
        "auth",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "emails/magic-link",
      "family": "emails",
      "name": "EmailMagicLink",
      "label": "Magic link",
      "description": "Passwordless sign-in email pairing a one-click magic-link CTA with a fallback verification code and shared expiry timer.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/magic-link",
      "tags": [
        "transactional",
        "auth",
        "passwordless"
      ],
      "status": "captured"
    },
    {
      "key": "emails/order-confirmation",
      "family": "emails",
      "name": "EmailOrderConfirmation",
      "label": "Order confirmation",
      "description": "Order receipt email with an itemised parts line-item table, subtotal/GST/shipping/total breakdown, ETA card, and view-order CTA.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/order-confirmation",
      "tags": [
        "transactional",
        "commerce",
        "order"
      ],
      "status": "captured"
    },
    {
      "key": "emails/shipping-update",
      "family": "emails",
      "name": "EmailShippingUpdate",
      "label": "Shipping update",
      "description": "Fulfilment-status email with a Picked/Packed/Shipped/Delivered progress stepper, carrier and tracking details, and a track-shipment CTA.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/shipping-update",
      "tags": [
        "transactional",
        "commerce",
        "shipping"
      ],
      "status": "captured"
    },
    {
      "key": "emails/payment-failed",
      "family": "emails",
      "name": "EmailPaymentFailed",
      "label": "Payment failed",
      "description": "Billing-alert email explaining a declined charge with the card brand/last4 and failure reason, plus retry-payment and update-card CTAs.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/payment-failed",
      "tags": [
        "transactional",
        "billing",
        "dunning"
      ],
      "status": "captured"
    },
    {
      "key": "emails/invoice-attached",
      "family": "emails",
      "name": "EmailInvoiceAttached",
      "label": "Invoice attached",
      "description": "Invoice-ready email with an invoice card showing number, job reference, amount due and due date, plus view-online and download-PDF actions.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/invoice-attached",
      "tags": [
        "transactional",
        "billing",
        "invoice"
      ],
      "status": "captured"
    },
    {
      "key": "emails/monthly-digest",
      "family": "emails",
      "name": "EmailMonthlyDigest",
      "label": "Monthly digest",
      "description": "Opt-in monthly newsletter with a 2x2 stat-card highlights grid and a tagged list of linked top-read articles.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/monthly-digest",
      "tags": [
        "marketing",
        "newsletter",
        "digest"
      ],
      "status": "captured"
    },
    {
      "key": "emails/team-invite",
      "family": "emails",
      "name": "EmailTeamInvite",
      "label": "Team invite",
      "description": "Workspace invitation email featuring an inviter avatar card, assigned role pill, accept/decline CTAs, and an expiry note.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/team-invite",
      "tags": [
        "transactional",
        "collaboration",
        "invite"
      ],
      "status": "captured"
    },
    {
      "key": "emails/receipt",
      "family": "emails",
      "name": "EmailReceipt",
      "label": "Receipt",
      "description": "Payment-receipt email with a paid line-item table, subtotal/GST/total totals, payment-method summary, and refund/support links.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/receipt",
      "tags": [
        "transactional",
        "commerce",
        "receipt"
      ],
      "status": "captured"
    },
    {
      "key": "emails/abandoned-cart",
      "family": "emails",
      "name": "EmailAbandonedCart",
      "label": "Abandoned cart",
      "description": "Cart-recovery email with a split hero image, product card showing price and savings chip, and a return-to-cart CTA.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/abandoned-cart",
      "tags": [
        "marketing",
        "commerce",
        "retention"
      ],
      "status": "captured"
    },
    {
      "key": "emails/review-request",
      "family": "emails",
      "name": "EmailReviewRequest",
      "label": "Review request",
      "description": "Post-service feedback email with a vehicle/job summary card and a row of 1-5 star rating links, each deep-linking to a pre-filled review.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/emails",
      "routeHref": "/ui-primitives/emails/review-request",
      "tags": [
        "marketing",
        "feedback",
        "review"
      ],
      "status": "captured"
    },
    {
      "key": "emails/preview-frame",
      "family": "emails",
      "name": "EmailPreviewFrame",
      "label": "Email preview frame",
      "description": "Client-side preview chrome that renders a passed email element with From/To/Subject metadata, a light/dark background toggle, and a view-source disclosure.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/emails",
      "tags": [
        "preview",
        "tooling",
        "chrome"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
