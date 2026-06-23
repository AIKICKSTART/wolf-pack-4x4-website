import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Dashboard vehicle status animation | UI Primitives - 3D",
}

export default function VehicleStatusAnimationPage() {
  return (
    <SubRouteShell
      scene="vehicle-status-animation"
      index="17"
      title="Dashboard vehicle status animation"
      description="A dashboard-safe vehicle status primitive with scanning telemetry light and stable reduced-motion state."
      body="The dashboard variant keeps the vehicle compact, adds a moving diagnostic scan and simple telemetry bars, and is tuned for dense product dashboards rather than landing-page drama."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
      ]}
      reducedMotionNote="Reduced motion stops the diagnostic scan and vehicle turntable, leaving a static status snapshot."
      crumbLabel="Dashboard vehicle status animation"
    />
  )
}
