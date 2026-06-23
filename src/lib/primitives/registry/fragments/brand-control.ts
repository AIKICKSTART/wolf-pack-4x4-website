import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "brand-control",
  "title": "Brand control",
  "group": "Chrome",
  "summary": "Fourteen brand-control surfaces for the central umbrella hub — design tokens, palette, typography, motion, assets, roles, team, audit, deploy, guidelines, impact graph, coverage, accessibility gate, and release channels. One token edit cascades to every consuming primitive.",
  "entries": [
    {
      "key": "brand-control/token-editor",
      "family": "brand-control",
      "name": "TokenEditor",
      "label": "Token editor",
      "description": "Colour/spacing/radius/shadow/font token grid with a live cascade preview and a recent-edits history rail; emits a cloned token on change.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/token-editor",
      "tags": [
        "tokens",
        "design-system",
        "editor"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/palette-builder",
      "family": "brand-control",
      "name": "PaletteBuilder",
      "label": "Palette builder",
      "description": "OKLCH-aware palette wheel with a live WCAG contrast check (AAA/AA/AA-large/fail) of a selected swatch against a chosen surface.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/palette-builder",
      "tags": [
        "color",
        "oklch",
        "contrast",
        "wcag"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/typography-pairing",
      "family": "brand-control",
      "name": "TypographyPairingCard",
      "label": "Typography pairing",
      "description": "Display x body font pairing card rendering live samples with inline font-family stacks, a rationale, and usage tags; supports a print-friendly mode.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/typography-pairing",
      "tags": [
        "typography",
        "pairing",
        "sample"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/motion-system-panel",
      "family": "brand-control",
      "name": "MotionSystemPanel",
      "label": "Motion system",
      "description": "Duration x easing token panel with a play/pause scrubber that animates a dot using the active bezier; honours prefers-reduced-motion.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/motion-system-panel",
      "tags": [
        "motion",
        "easing",
        "tokens"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/asset-cdn-tile",
      "family": "brand-control",
      "name": "AssetCdnTile",
      "label": "Asset CDN tile",
      "description": "Single brand-asset card showing CDN path, variant chips, usage count, master byte size, and uploader provenance, with a default knight thumbnail.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/asset-cdn-tile",
      "tags": [
        "assets",
        "cdn",
        "brand"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/role-matrix",
      "family": "brand-control",
      "name": "RoleMatrix",
      "label": "Role matrix",
      "description": "Role x permission table with level pills (none/inherit/read/write/admin) and inheritance arrows back to the source role; semantic table markup.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/role-matrix",
      "tags": [
        "access",
        "permissions",
        "rbac"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/team-roster-card",
      "family": "brand-control",
      "name": "TeamRosterCard",
      "label": "Team roster card",
      "description": "Single team-member card with avatar initials, role pill, email, last-active stamp, and an access-scope chip list.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/team-roster-card",
      "tags": [
        "team",
        "people",
        "roster"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/audit-log-row",
      "family": "brand-control",
      "name": "AuditLogRow",
      "label": "Audit log row",
      "description": "Single audit entry — actor, action (edit/upload/publish/deploy/rollback), resource, relative time, and an optional before/after diff strip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/audit-log-row",
      "tags": [
        "audit",
        "log",
        "activity"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/theme-deploy-panel",
      "family": "brand-control",
      "name": "ThemeDeployPanel",
      "label": "Theme deploy panel",
      "description": "Promotes a staged theme through draft to staging to production with a segmented rollout progress bar, changed-token chips, and a halt control.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/theme-deploy-panel",
      "tags": [
        "deploy",
        "rollout",
        "theme"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/brand-guideline-card",
      "family": "brand-control",
      "name": "BrandGuidelineCard",
      "label": "Brand guideline card",
      "description": "Single guideline rule (logo/voice/do/dont) with a section tag, optional illustration, emphasis callout, and a print-friendly export mode.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/brand-guideline-card",
      "tags": [
        "guidelines",
        "brand-book",
        "rules"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/umbrella-impact-graph",
      "family": "brand-control",
      "name": "UmbrellaImpactGraph",
      "label": "Umbrella impact graph",
      "description": "Token-cascade graph rooted at one CSS variable, branching to each consuming primitive family with per-node consumer counts and connector lines.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/umbrella-impact-graph",
      "tags": [
        "impact",
        "dependency-graph",
        "tokens"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/usage-coverage-strip",
      "family": "brand-control",
      "name": "UsageCoverageStrip",
      "label": "Usage coverage strip",
      "description": "Token-adoption coverage bars per primitive family with an overall percentage, each bar exposing progressbar ARIA values.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/usage-coverage-strip",
      "tags": [
        "coverage",
        "adoption",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/accessibility-gate-card",
      "family": "brand-control",
      "name": "AccessibilityGateCard",
      "label": "Accessibility gate",
      "description": "WCAG 2.2 audit summary (contrast/focus/motion/aria) with per-check pass counts, verdict tags, and an overall radial gate score.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/accessibility-gate-card",
      "tags": [
        "a11y",
        "wcag",
        "audit"
      ],
      "status": "captured"
    },
    {
      "key": "brand-control/release-channel-pill",
      "family": "brand-control",
      "name": "ReleaseChannelPill",
      "label": "Release channel pill",
      "description": "Segmented alpha/beta/production channel selector showing the active version, pending diff-ahead badge, and an audience blurb.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/brand-control",
      "routeHref": "/ui-primitives/brand-control/release-channel-pill",
      "tags": [
        "release",
        "channels",
        "versioning"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
