import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Parts grid 3D | UI Primitives — 3D",
}

export default function PartsGridPage() {
  return (
    <SubRouteShell
      scene="parts-grid"
      index="06"
      title="Parts grid 3D — floating category tiles"
      description="A three-by-three grid of part-category placeholder meshes — mufflers, cat-back tubes, extractors, resonators, tips, brackets, flex pipes, gaskets, clamps."
      body="Each tile uses a representative procedural geometry (TorusKnot for extractors, Cylinder for mufflers, Torus for fittings, Box for brackets) and bobs out of phase via a sine offset in useFrame. Tile labels are rendered with drei Text."
      controls={[{ label: "Auto-bob", binding: "Idle" }]}
      reducedMotionNote="When prefers-reduced-motion is reduce, every tile stops bobbing and rotating. The grid stays composed and the labels remain readable."
      crumbLabel="Parts grid"
    />
  )
}
