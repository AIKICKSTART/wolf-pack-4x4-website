import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Wireframe car scan | UI Primitives — 3D",
}

export default function WireframeCarPage() {
  return (
    <SubRouteShell
      scene="wireframe-car"
      index="07"
      title="Wireframe car scan — vertical sweep"
      description="A low-poly chassis rendered as a wireframe, with a horizontal scan beam sweeping vertically through it to reveal each section."
      body="The wireframe meshes share a custom ShaderMaterial that blends from a base teal to an amber highlight within a band around the scan beam's current Y position. A translucent plane mirrors the band visually."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
      ]}
      reducedMotionNote="When prefers-reduced-motion is reduce, the scan beam stays parked at the bottom and the wireframe holds its base teal colour."
      crumbLabel="Wireframe car"
    />
  )
}
