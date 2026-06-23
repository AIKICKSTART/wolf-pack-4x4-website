import type { Metadata } from "next"

import { PinMarkerOverlay } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { FLOORPLAN_PINS } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Pin marker overlay | Comments primitives",
  description:
    "Primitive 11 — SVG overlay layer hosting positioned annotation pins on a target image or canvas.",
}

function MockFloorPlan() {
  return (
    <svg
      viewBox="0 0 800 450"
      role="img"
      aria-label="Workshop floor plan"
      style={{
        display: "block",
        width: "100%",
        aspectRatio: "16 / 9",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--primitive-canvas) 88%, var(--primitive-text-strong)) 0%, color-mix(in oklab, var(--primitive-canvas) 80%, var(--primitive-text-strong)) 60%, var(--primitive-canvas) 100%)",
      }}
    >
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="800" height="450" fill="url(#grid)" />
      <g fill="none" stroke="color-mix(in oklab, var(--primitive-amber) 40%, transparent)" strokeWidth="2">
        <rect x="40" y="40" width="320" height="160" />
        <rect x="40" y="220" width="320" height="190" />
        <rect x="380" y="40" width="380" height="240" />
        <rect x="380" y="300" width="380" height="110" />
      </g>
      <g
        fill="color-mix(in oklab, var(--primitive-text-strong) 62%, transparent)"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
        letterSpacing="1.4"
      >
        <text x="60" y="60">BAY 1 — EXHAUST</text>
        <text x="60" y="240">BAY 3 — LIFT</text>
        <text x="400" y="60">SHOWROOM + WAITING</text>
        <text x="400" y="320">PARTS + RUNNER LANE</text>
      </g>
    </svg>
  )
}

export default function PinMarkerOverlayPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Pin marker overlay"
        title="Pin marker overlay"
        description="A positioned pin layer that mounts over any target — image, SVG, canvas. Each pin reads its position as a percentage of the parent."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Pin marker overlay" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mock workshop floor plan · 6 pins</span>
        <PinMarkerOverlay
          target={<MockFloorPlan />}
          pins={FLOORPLAN_PINS}
          caption="Floor plan v3 · pins 1–6"
        />
      </section>
    </main>
  )
}
