import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Social media vehicle preview | UI Primitives - 3D",
}

export default function VehicleSocialPreviewPage() {
  return (
    <SubRouteShell
      scene="vehicle-social-preview"
      index="15"
      title="Social media vehicle preview"
      description="A square-safe social preview primitive with a subtle safe-area frame and generated poster fallback."
      body="The social variant uses the shared realistic vehicle, a pulsing safe-area frame, stronger tail-light accent, and a composition that remains legible in narrow mobile cards."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
      ]}
      reducedMotionNote="Reduced motion stops the safe-area pulse and vehicle motion while preserving the framed composition."
      crumbLabel="Social media vehicle preview"
    />
  )
}
