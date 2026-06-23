import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "actions",
  "title": "Actions",
  "group": "Foundations",
  "summary": "Full production button/action system with theme-aware contrast: red/chrome/ghost site CTA adapters, small/medium/large sizing, pill coverage, a multi-variant cva button, a glassy liquid button, segmented controls, toolbar/destructive states, and tactile metal-finish buttons for industrial UI surfaces.",
  "entries": [
    {
      "key": "actions/site-cta-buttons",
      "family": "actions",
      "name": "SiteCTAButtons",
      "label": "Site CTA buttons",
      "description": "Shared DNA site CTA adapters covering red primary, chrome alternative, and ghost tertiary link buttons. Used by overview hero actions and content/contact CTAs, with theme-matched token inheritance.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/sections/actions-section",
      "routeHref": "/ui-primitives/actions#site-cta-buttons",
      "tags": [
        "button",
        "cta",
        "site",
        "theme"
      ],
      "status": "captured"
    },
    {
      "key": "actions/button-size-scale",
      "family": "actions",
      "name": "ButtonSizeScale",
      "label": "Button size scale",
      "description": "Shared DNA small, medium, and large command ladder for app actions and pill CTAs. All exposed sizes keep the 44px command target minimum and map to primitive sizing tokens.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/sections/actions-section",
      "routeHref": "/ui-primitives/actions#button-size-scale",
      "tags": [
        "button",
        "sizing",
        "touch-target"
      ],
      "status": "captured"
    },
    {
      "key": "actions/button-pill-system",
      "family": "actions",
      "name": "ButtonPillSystem",
      "label": "Button pill system",
      "description": "Pill coverage for read-only status pills, toggle/filter pills, and rounded CTA pills using shared radius, focus, label, and theme tokens.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/sections/actions-section",
      "routeHref": "/ui-primitives/actions#button-pill-system",
      "tags": [
        "button",
        "pill",
        "badge",
        "chip"
      ],
      "status": "captured"
    },
    {
      "key": "actions/action-button",
      "family": "actions",
      "name": "ActionButton",
      "label": "Action button",
      "description": "base-ui forwardRef button with cva variants (default/destructive/cool/outline/secondary/ghost/link), sizes (default/sm/lg/icon), focus-visible ring, reduced-motion support, and light/dark readable labels.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/actions",
      "routeHref": "/ui-primitives/actions#action-button",
      "tags": [
        "button",
        "control",
        "cva",
        "base-ui"
      ],
      "status": "captured"
    },
    {
      "key": "actions/liquid-button",
      "family": "actions",
      "name": "LiquidButton",
      "label": "Liquid button",
      "description": "Glassy pill button with isolated gradient/highlight layers, hover lift, mode-safe sheen, and ghost/link surface-less modes across variant/size sets.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/actions",
      "routeHref": "/ui-primitives/actions#liquid-button",
      "tags": [
        "button",
        "glassmorphism",
        "gradient",
        "base-ui"
      ],
      "status": "captured"
    },
    {
      "key": "actions/metal-button",
      "family": "actions",
      "name": "MetalButton",
      "label": "Metal button",
      "description": "Brushed-metal button with layered outer/inner/face gradients across six palettes (default/primary/success/error/gold/bronze), press/hover/touch state machine, warm industrial shine, and reduced-motion-aware transforms.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/actions",
      "routeHref": "/ui-primitives/actions#metal-button",
      "tags": [
        "button",
        "skeuomorphic",
        "metal",
        "interactive"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
