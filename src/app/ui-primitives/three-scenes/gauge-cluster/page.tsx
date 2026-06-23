import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Gauge cluster 3D | UI Primitives — 3D",
}

export default function GaugeClusterPage() {
  return (
    <SubRouteShell
      scene="gauge-cluster"
      index="08"
      title="Gauge cluster 3D — RPM, boost, EGT"
      description="Three radial gauges arranged side by side. Needles sweep across each dial under a phased sinusoid to imply live telemetry."
      body="Each gauge is built from RingGeometry for the bezel, CircleGeometry for the dial face, narrow Box meshes for the tick marks, and a Box needle anchored to a hub. The needle rotation is driven by a phased sinusoid per gauge."
      controls={[{ label: "Live demo", binding: "Idle" }]}
      reducedMotionNote="When prefers-reduced-motion is reduce, every needle locks at its base angle. The dials, ticks, and labels remain fully readable."
      crumbLabel="Gauge cluster"
    />
  )
}
