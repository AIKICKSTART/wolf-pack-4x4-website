import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Website hero video primitive | UI Primitives - 3D",
}

export default function VehicleHeroVideoPage() {
  return (
    <SubRouteShell
      scene="vehicle-hero-video"
      index="16"
      title="Website hero video primitive"
      description="A hero-video-ready vehicle primitive with local looping video and poster fallback behind the WebGL layer."
      body="The WebGL scene sits over a local generated video fallback and poster state, giving the route a resilient loading path while retaining premium Three.js lighting and manual controls."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
      ]}
      reducedMotionNote="Reduced motion disables video autoplay, vehicle turntable motion, wheel spin, and hero rig drift."
      crumbLabel="Website hero video primitive"
    />
  )
}
