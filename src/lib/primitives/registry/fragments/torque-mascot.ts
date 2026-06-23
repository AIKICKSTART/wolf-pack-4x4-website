import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "torque-mascot",
  "title": "Torque Mascot",
  "group": "AI",
  "summary": "Torque — the customer-facing Mufflermen AI-assistant avatar: a chrome and matte-black mechanic robot rendered from SVG with ten distinct, reduced-motion-aware animated states, plus a compact inline name-and-state badge.",
  "entries": [
    {
      "key": "torque-mascot/torque-mascot",
      "family": "torque-mascot",
      "name": "TorqueMascot",
      "label": "Torque mascot",
      "description": "Animated SVG AI-assistant avatar (chrome + matte-black robot) with ten distinct, compositor-friendly state poses (idle, thinking, typing, working, analysing, generating, deploying, approval, warning, success) and a state-derived aria-label.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/torque-mascot",
      "routeHref": "/ui-primitives/torque-mascot#torque-mascot",
      "tags": [
        "ai",
        "mascot",
        "avatar",
        "svg",
        "animation"
      ],
      "status": "improved"
    },
    {
      "key": "torque-mascot/torque-mascot-badge",
      "family": "torque-mascot",
      "name": "TorqueMascotBadge",
      "label": "Torque mascot badge",
      "description": "Compact inline badge pairing a small Torque avatar with its name and a live state phrase, suited to chat headers and toasts.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/torque-mascot",
      "routeHref": "/ui-primitives/torque-mascot#torque-mascot-badge",
      "tags": [
        "ai",
        "mascot",
        "badge",
        "inline",
        "status"
      ],
      "status": "improved"
    }
  ]
}

export default manifest
