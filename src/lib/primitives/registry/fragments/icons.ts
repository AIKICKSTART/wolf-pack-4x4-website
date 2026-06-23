import { carbonRedIcons } from "@/app/ui-primitives/components/icons-carbon-red"

import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  family: "icons",
  title: "Icons",
  group: "Foundations",
  summary:
    "205 premium Carbon & Red icon assets sliced from raster source sheets and wrapped as 128x128 SVGs. Each entry includes a carbon-card tile, a transparent glyph variant, category metadata, and search aliases for automotive, workshop, communications, social, CMS, and operations use cases.",
  entries: carbonRedIcons.map((icon) => ({
    key: `icons/${icon.id}`,
    family: "icons",
    name: "CarbonRedIconAsset",
    label: icon.label,
    description: `${icon.categoryLabel} premium Carbon & Red icon with card and glyph SVG variants.`,
    kind: "icon",
    importPath: "@/app/ui-primitives/components/icons-carbon-red",
    routeHref: `/ui-primitives/icons?icon=${icon.id}`,
    tags: [icon.category, icon.categoryLabel.toLowerCase(), ...icon.aliases],
    status: "improved",
  })),
}

export default manifest
