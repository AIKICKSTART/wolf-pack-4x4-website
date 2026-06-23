import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  family: "surfaces",
  title: "Surfaces",
  group: "Foundations",
  summary: "Theme-aware glass, material, and neumorphic shells for layered workshop panels with readable light-mode contrast and dark-mode depth.",
  entries: [
    {
      key: "surfaces/glass",
      family: "surfaces",
      name: "GlassSurface",
      label: "Glass surface",
      description:
        "Translucent frosted-glass container with tone (chrome/obsidian/amber), blur intensity (low/med/high), tokenized strokes, and light/dark-safe copy contrast.",
      kind: "primitive",
      importPath: "@/app/ui-primitives/components/surfaces",
      routeHref: "/ui-primitives/surfaces",
      tags: ["glass", "blur", "depth", "container"],
      status: "improved",
    },
    {
      key: "surfaces/material",
      family: "surfaces",
      name: "MaterialSurface",
      label: "Material surface",
      description:
        "Elevation-based container (levels 0-5) with material tones (primary/secondary/tertiary/surface), theme-aware fills, and readable approval-panel density.",
      kind: "primitive",
      importPath: "@/app/ui-primitives/components/surfaces",
      routeHref: "/ui-primitives/surfaces",
      tags: ["material", "elevation", "shadow", "container"],
      status: "improved",
    },
    {
      key: "surfaces/neumorphic",
      family: "surfaces",
      name: "NeuoSurface",
      label: "Neumorphic surface",
      description:
        "Neumorphic soft-shadow container with tone (obsidian/ash/amber), optional pressed/inset state, and bevel treatments tuned for light and dark canvases.",
      kind: "primitive",
      importPath: "@/app/ui-primitives/components/surfaces",
      routeHref: "/ui-primitives/surfaces",
      tags: ["neumorphic", "soft-shadow", "pressed", "container"],
      status: "improved",
    },
  ],
}

export default manifest
