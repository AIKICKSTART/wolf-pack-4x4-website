import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Workshop vehicle showcase | UI Primitives - 3D",
}

export default function VehicleWorkshopShowcasePage() {
  return (
    <SubRouteShell
      scene="vehicle-workshop-showcase"
      index="11"
      title="Workshop vehicle showcase"
      description="A reusable animated workshop vehicle primitive with realistic procedural bodywork and local poster fallback."
      body="Curved body silhouette, cabin glass, wheel arches, tyres, rims, lights, exhaust detail, reflective floor, and premium workshop lighting are combined into one mobile-safe Three.js primitive."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
      ]}
      reducedMotionNote="Reduced motion freezes autonomous rotation and wheel spin while preserving manual orbit controls."
      crumbLabel="Workshop vehicle showcase"
    />
  )
}
