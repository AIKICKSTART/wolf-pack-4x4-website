import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Exhaust service hero | UI Primitives - 3D",
}

export default function VehicleExhaustHeroPage() {
  return (
    <SubRouteShell
      scene="vehicle-exhaust-hero"
      index="12"
      title="Exhaust service hero"
      description="A hero-ready animated vehicle scene with highlighted exhaust hardware and warm service-bay lighting."
      body="The exhaust primitive adds metallic pipework, muffler volume, glowing outlet detail, hero light rig, and constrained camera controls for service landing pages and workshop promos."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
      ]}
      reducedMotionNote="Reduced motion stops the hero rig drift, vehicle turntable, and wheel spin while keeping the scene readable."
      crumbLabel="Exhaust service hero"
    />
  )
}
