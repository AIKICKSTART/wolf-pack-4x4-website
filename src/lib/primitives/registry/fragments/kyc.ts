import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "kyc",
  "title": "KYC & verification",
  "group": "Auth",
  "summary": "15 identity-verification and AML/KYC onboarding primitives — document upload, selfie capture, OTP, sanctions screening, risk rating, beneficial-owner and business-registration steps, plus progress, success, manual-review and compliance-disclosure surfaces.",
  "entries": [
    {
      "key": "kyc/id-upload-step",
      "family": "kyc",
      "name": "IdUploadStep",
      "label": "ID upload step",
      "description": "Document-upload step with an SVG ID-card frame, front/back file uploaders, constraint chips and an in-flight verification progress meter.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/id-upload",
      "tags": [
        "kyc",
        "upload",
        "identity",
        "onboarding"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/selfie-capture-card",
      "family": "kyc",
      "name": "SelfieCaptureCard",
      "label": "Selfie capture card",
      "description": "Selfie-capture card with an SVG framed stage, idle/preview state toggle, capture/retake CTAs and a checklist of capture instructions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/selfie",
      "tags": [
        "kyc",
        "selfie",
        "biometric",
        "capture"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/document-verification-status",
      "family": "kyc",
      "name": "DocumentVerificationStatus",
      "label": "Document verification status",
      "description": "Status card for a submitted document showing tone-coded verification state, glyph chip, reference, ETA and assigned reviewer with aria-live updates.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/document-status",
      "tags": [
        "kyc",
        "status",
        "verification",
        "review"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/address-verification-row",
      "family": "kyc",
      "name": "AddressVerificationRow",
      "label": "Address verification row",
      "description": "List row for an address showing proof-on-file/needed/expired status, optional meta, and an upload-proof CTA (link or button) when proof is required.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/address",
      "tags": [
        "kyc",
        "address",
        "proof",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/phone-otp-entry",
      "family": "kyc",
      "name": "PhoneOtpEntry",
      "label": "Phone OTP entry",
      "description": "Six-cell one-time-code input with keyboard navigation, paste handling, resend countdown timer and error state for SMS verification.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/phone-otp",
      "tags": [
        "kyc",
        "otp",
        "2fa",
        "phone"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/sanctions-screen-result",
      "family": "kyc",
      "name": "SanctionsScreenResult",
      "label": "Sanctions screen result",
      "description": "Sanctions/PEP screening result card with tone-coded status, lists-checked summary and a collapsible accordion of matched records with confidence scores.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/sanctions",
      "tags": [
        "kyc",
        "sanctions",
        "aml",
        "screening"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/tax-info-form",
      "family": "kyc",
      "name": "TaxInfoForm",
      "label": "Tax info form",
      "description": "Tax-residency form whose identifier fields and downloadable form adapt per selected country (AU/NZ/US/UK/Other) with the reporting agency named.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/tax-info",
      "tags": [
        "kyc",
        "tax",
        "form",
        "residency"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/business-registration-step",
      "family": "kyc",
      "name": "BusinessRegistrationStep",
      "label": "Business registration step",
      "description": "Business onboarding step with name field, ABN lookup row showing an entity-result badge, business-structure radio chips and a trading-since date input.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/business-registration",
      "tags": [
        "kyc",
        "business",
        "abn",
        "registration"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/beneficial-owner-card",
      "family": "kyc",
      "name": "BeneficialOwnerCard",
      "label": "Beneficial owner card",
      "description": "Beneficial-owner list card with per-owner avatar, role, ownership-percentage and status chips, remove controls, a running total and add-owner CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/beneficial-owner",
      "tags": [
        "kyc",
        "ubo",
        "ownership",
        "aml"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/kyc-progress-stepper",
      "family": "kyc",
      "name": "KycProgressStepper",
      "label": "KYC progress stepper",
      "description": "Horizontal progress stepper rendering complete/current/upcoming/locked steps with a fill rail, computed percentage and ARIA progressbar semantics.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/progress-stepper",
      "tags": [
        "kyc",
        "stepper",
        "progress",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/risk-rating-meter",
      "family": "kyc",
      "name": "RiskRatingMeter",
      "label": "Risk rating meter",
      "description": "Risk-score meter with a tone-coded fill, low/medium/high/review markers, level chip and contributing positive/neutral/negative factor chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/risk-rating",
      "tags": [
        "kyc",
        "risk",
        "meter",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/manual-review-banner",
      "family": "kyc",
      "name": "ManualReviewBanner",
      "label": "Manual review banner",
      "description": "Alert banner announcing a case is under manual compliance review, with an icon, ETA chip, case reference and a contact-compliance CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/manual-review-banner",
      "tags": [
        "kyc",
        "banner",
        "alert",
        "review"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/kyc-success-state",
      "family": "kyc",
      "name": "KycSuccessState",
      "label": "KYC success state",
      "description": "Verification-complete success surface with a confetti burst, gradient check mark, headline copy and a stack of follow-up CTAs.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/success-state",
      "tags": [
        "kyc",
        "success",
        "completion",
        "confetti"
      ],
      "status": "captured"
    },
    {
      "key": "kyc/compliance-disclosure-block",
      "family": "kyc",
      "name": "ComplianceDisclosureBlock",
      "label": "Compliance disclosure block",
      "description": "Legal/privacy disclosure aside listing governing policies, data-retention details and a privacy-contact email with a last-updated stamp.",
      "kind": "block",
      "importPath": "@/app/ui-primitives/components/kyc",
      "routeHref": "/ui-primitives/kyc/compliance-disclosure",
      "blockType": "compliance-disclosure",
      "tags": [
        "kyc",
        "compliance",
        "privacy",
        "legal"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
