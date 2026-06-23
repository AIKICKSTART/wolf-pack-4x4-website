import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Performance car promo | UI Primitives - 3D",
}

export default function VehiclePerformancePromoPage() {
  return (
    <SubRouteShell
      scene="vehicle-performance-promo"
      index="13"
      title="Performance car promo"
      description="A cinematic performance vehicle promo primitive with cool rim lighting and controlled motion."
      body="This variant tightens the stance, uses brighter rim materials, cool accent lights, a moving hero ring, reflective floor, and responsive orbit limits for promo cards and visual headers."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
      ]}
      reducedMotionNote="Reduced motion disables the promo drift and wheel spin while leaving a stable three-quarter vehicle view."
      crumbLabel="Performance car promo"
    />
  )
}
