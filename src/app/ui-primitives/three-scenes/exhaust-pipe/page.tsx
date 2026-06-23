import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Exhaust pipe viewer | UI Primitives — 3D",
}

export default function ExhaustPipePage() {
  return (
    <SubRouteShell
      scene="exhaust-pipe"
      index="01"
      title="Exhaust pipe viewer — interactive 3D assembly"
      description="A procedural exhaust assembly built from a Catmull-Rom curve, an inline muffler can, and a chrome tip. Orbit the model to inspect the routing."
      body="The header tube is generated as a TubeGeometry running along a CatmullRomCurve3. A cylinder muffler sits inline along the curve and a chrome tip caps the rear. Hovering the assembly nudges the scale up subtly and reveals a callout label."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
        { label: "Callout", binding: "Hover" },
      ]}
      reducedMotionNote="When prefers-reduced-motion is reduce, auto-rotation is disabled and the hover pulse is frozen. Hover still shows the callout, but no scale animation runs."
      crumbLabel="Exhaust pipe"
    />
  )
}
