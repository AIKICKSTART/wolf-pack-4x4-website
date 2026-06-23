import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Parts product scene | UI Primitives - 3D",
}

export default function VehiclePartsScenePage() {
  return (
    <SubRouteShell
      scene="vehicle-parts-scene"
      index="14"
      title="Parts product scene"
      description="A product-scene primitive with floating exhaust, gasket, and bracket details around the vehicle."
      body="The parts scene keeps the core vehicle primitive intact and adds animated product geometry for catalogue cards, service explainers, and parts-driven storytelling."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
      ]}
      reducedMotionNote="Reduced motion stops part orbiting and vehicle rotation while preserving the composed product layout."
      crumbLabel="Parts product scene"
    />
  )
}
