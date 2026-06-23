import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "auth",
  "title": "Auth",
  "group": "Auth",
  "summary": "Nine sign-in/onboarding primitives — split-screen shell, OAuth row, legal fineprint, step indicator, password strength meter, OTP pad, magic-link confirmation, social-proof strip, and testimonial marquee — composed into the login/signup/reset/two-factor/onboarding scenes.",
  "entries": [
    {
      "key": "auth/auth-shell",
      "family": "auth",
      "name": "AuthShell",
      "label": "Auth shell",
      "description": "Split-screen authentication layout with a branded marketing pane (kicker/headline/tagline, tone variants, region/version footer) and a form pane that renders children.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/auth",
      "tags": [
        "layout",
        "split-screen",
        "branding"
      ],
      "status": "captured"
    },
    {
      "key": "auth/oauth-button-row",
      "family": "auth",
      "name": "OauthButtonRow",
      "label": "OAuth button row",
      "description": "Row of provider sign-in buttons (Google, Apple, GitHub, Microsoft) with inline brand SVG icons and an onSelect callback.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/auth",
      "tags": [
        "oauth",
        "social-login",
        "buttons"
      ],
      "status": "captured"
    },
    {
      "key": "auth/legal-fineprint",
      "family": "auth",
      "name": "LegalFineprint",
      "label": "Legal fineprint",
      "description": "Small print consent line with a configurable prefix and a list of legal links joined with separators and a final 'and'.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/auth",
      "tags": [
        "legal",
        "consent",
        "links"
      ],
      "status": "captured"
    },
    {
      "key": "auth/form-stepper",
      "family": "auth",
      "name": "FormStepper",
      "label": "Form stepper",
      "description": "Horizontal multi-step progress indicator with a fill rail, numbered/checked dots per done/active/pending state, and a step summary.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/auth",
      "tags": [
        "stepper",
        "progress",
        "wizard"
      ],
      "status": "captured"
    },
    {
      "key": "auth/password-strength-meter",
      "family": "auth",
      "name": "PasswordStrengthMeter",
      "label": "Password strength meter",
      "description": "Live password strength gauge scoring length/case/digit/symbol rules into four colored bars with hint checklist and a polite ARIA status.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/auth",
      "tags": [
        "password",
        "validation",
        "strength"
      ],
      "status": "captured"
    },
    {
      "key": "auth/two-factor-pad",
      "family": "auth",
      "name": "TwoFactorPad",
      "label": "Two-factor pad",
      "description": "Segmented OTP code input with auto-advance, backspace navigation, arrow keys, and full-code paste; fires onChange/onComplete and supports an error state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/auth",
      "tags": [
        "2fa",
        "otp",
        "code-input"
      ],
      "status": "captured"
    },
    {
      "key": "auth/magic-link-sent",
      "family": "auth",
      "name": "MagicLinkSent",
      "label": "Magic link sent",
      "description": "Confirmation card showing the recipient email with an envelope glyph and a countdown-gated resend button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/auth",
      "tags": [
        "magic-link",
        "confirmation",
        "countdown"
      ],
      "status": "captured"
    },
    {
      "key": "auth/social-proof-strip",
      "family": "auth",
      "name": "SocialProofStrip",
      "label": "Social proof strip",
      "description": "Trust-mark row listing partner/workshop names with optional inline icons under a configurable label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/auth",
      "tags": [
        "social-proof",
        "trust",
        "logos"
      ],
      "status": "captured"
    },
    {
      "key": "auth/auth-aside-marquee",
      "family": "auth",
      "name": "AuthAsideMarquee",
      "label": "Auth aside marquee",
      "description": "Auto-rotating testimonial carousel with framer-motion blur/slide transitions, pause-on-hover/focus, reduced-motion fallback, and tab dots.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth",
      "tags": [
        "testimonial",
        "marquee",
        "carousel"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
