import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"

export const metadata: Metadata = {
  title: "Welder sparks | UI Primitives — 3D",
}

export default function WelderSparksPage() {
  return (
    <SubRouteShell
      scene="welder-sparks"
      index="04"
      title="Welder spark particles — MIG arc burst"
      description="A particle field simulating MIG welder sparks. Particles spawn from a single point, launch upward in random arcs, fall under gravity, and shift colour from hot white to amber to red as they age."
      body="Buffer-attribute Points with custom per-particle velocities, lifetimes, and per-frame color updates. Additive blending creates the glow. A pointLight underneath the arc tints the surroundings."
      controls={[{ label: "Auto-loop", binding: "Idle" }]}
      reducedMotionNote="When prefers-reduced-motion is reduce, the particle simulation halts at its current frame. The static glow remains so the welder feel doesn't disappear entirely."
      crumbLabel="Welder sparks"
    />
  )
}
