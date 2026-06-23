import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Holo job card | UI Primitives — 3D",
}

export default function HoloCardPage() {
  return (
    <SubRouteShell
      scene="holo-card"
      index="09"
      title="Holographic job card — scanline shader"
      description="A floating, billboarded job card with a custom ShaderMaterial that adds scanlines and an edge glow."
      body="The card surface uses a fragment shader with uTime, uColor and uEdge uniforms. Scanlines are driven by sin(uv.y * 80 + uTime * 4), edges by a smoothstep mask. A second backplane provides a darkened tint for readability."
      controls={[{ label: "Scanline live", binding: "Idle" }]}
      reducedMotionNote="When prefers-reduced-motion is reduce, the shader's uTime uniform freezes at a constant value and the vertical bob stops. The scanline pattern stays visible at a fixed phase."
      crumbLabel="Holo card"
    />
  )
}
