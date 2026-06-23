import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Vehicle showcase | UI Primitives — 3D",
}

export default function VehicleShowcasePage() {
  return (
    <SubRouteShell
      scene="vehicle-showcase"
      index="02"
      title="Vehicle showcase — realistic procedural primitive"
      description="A premium animated vehicle display with curved bodywork, cabin glass, tyres, rims, lights, reflections, local poster fallback, and reduced-motion-safe controls."
      body="The shared vehicle primitive uses an extruded chassis silhouette, glass canopy, wheel arches, rotating tyres, rim spokes, light signatures, reflective floor, contact shadows, and controlled orbit limits for mobile and keyboard-safe viewing."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
      ]}
      reducedMotionNote="When prefers-reduced-motion is reduce, autonomous rotation, wheel spin, scan pulses, and video autoplay stop while manual orbit remains available."
      crumbLabel="Vehicle showcase"
    />
  )
}
