import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Dyno chart 3D | UI Primitives — 3D",
}

export default function DynoChartPage() {
  return (
    <SubRouteShell
      scene="dyno-chart"
      index="05"
      title="Dyno chart 3D — RPM × torque × boost"
      description="A 3D dyno curve plotted along three axes. RPM runs along x, torque rises on y, and boost rolls along z so the shape conveys both peak torque and turbo onset."
      body="The curve is sampled parametrically and drawn as a thick TubeGeometry along a Catmull-Rom spline. Axes are labelled with drei Text and the camera auto-orbits unless reduced motion is requested."
      controls={[
        { label: "Orbit", binding: "Drag" },
        { label: "Zoom", binding: "Scroll" },
      ]}
      reducedMotionNote="When prefers-reduced-motion is reduce, auto-rotation is disabled. The user can still orbit manually to inspect the curve from any angle."
      crumbLabel="Dyno chart"
    />
  )
}
