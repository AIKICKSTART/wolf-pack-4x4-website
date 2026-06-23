import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Rotating logo | UI Primitives — 3D",
}

export default function RotatingLogoPage() {
  return (
    <SubRouteShell
      scene="rotating-logo"
      index="03"
      title="Ambient rotating logo — OFM wordmark"
      description="An ambient, slowly rotating OFM wordmark suitable for marketing accents or footer hero placements."
      body="Built on drei's SDF-based Text component so no external font is loaded. The red fill is wrapped in an amber outline stroke. The whole group rotates slowly on its Y axis under a warehouse environment preset."
      controls={[{ label: "Auto-rotate", binding: "Idle" }]}
      reducedMotionNote="When prefers-reduced-motion is reduce, the rotation stops at the current angle so the wordmark reads as a static brand mark."
      crumbLabel="Rotating logo"
    />
  )
}
