import type { Metadata } from "next"

import {
  ActivityStream,
  PinMarkerOverlay,
  ThreadSidePanel,
} from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { ACTIVITY, FLOORPLAN_PINS, THREAD_LIST } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Full canvas annotation board | Comments primitives",
  description:
    "Composition — Mufflermen workshop floor-plan overlay with 6 annotation pins, thread side panel, and activity stream below.",
}

function MockFloorPlan() {
  return (
    <svg
      viewBox="0 0 800 450"
      role="img"
      aria-label="Mufflermen workshop floor plan"
      style={{
        display: "block",
        width: "100%",
        aspectRatio: "16 / 9",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--primitive-canvas) 88%, var(--primitive-text-strong)) 0%, color-mix(in oklab, var(--primitive-canvas) 80%, var(--primitive-text-strong)) 60%, var(--primitive-canvas) 100%)",
      }}
    >
      <defs>
        <pattern id="canvas-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="800" height="450" fill="url(#canvas-grid)" />

      <g fill="none" stroke="color-mix(in oklab, var(--primitive-amber) 40%, transparent)" strokeWidth="2">
        <rect x="40" y="40" width="260" height="160" rx="4" />
        <rect x="40" y="220" width="260" height="190" rx="4" />
        <rect x="320" y="40" width="240" height="240" rx="4" />
        <rect x="580" y="40" width="180" height="160" rx="4" />
        <rect x="320" y="300" width="440" height="110" rx="4" />
      </g>

      <g stroke="color-mix(in oklab, var(--primitive-teal) 32%, transparent)" strokeWidth="1.5" fill="none">
        <line x1="40" y1="200" x2="760" y2="200" strokeDasharray="6 6" />
        <line x1="300" y1="40" x2="300" y2="410" strokeDasharray="6 6" />
      </g>

      <g
        fill="color-mix(in oklab, var(--primitive-text-strong) 66%, transparent)"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
        letterSpacing="1.4"
      >
        <text x="60" y="60">BAY 1 — EXHAUST FIT</text>
        <text x="60" y="240">BAY 3 — LIFT BAY</text>
        <text x="340" y="60">CUSTOMER WAITING + SHOWROOM</text>
        <text x="600" y="60">RECEPTION</text>
        <text x="340" y="320">PARTS ROOM + RUNNER LANE</text>
      </g>

      <g fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" fontFamily="JetBrains Mono, monospace" fontSize="9">
        <text x="40" y="430">OAK FLATS MUFFLERMEN · FLOOR PLAN v3.2 · NTS</text>
      </g>
    </svg>
  )
}

export default function FullCanvasPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full canvas"
        title="Workshop annotation board"
        description="One workshop floor plan, six pinned annotation threads, a side panel with filter chips, and an activity stream replaying the last 24 hours of comments."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Full canvas" },
        ]}
      />

      <section className={styles.canvas}>
        <div className={styles.canvasMain}>
          <PinMarkerOverlay
            target={<MockFloorPlan />}
            pins={FLOORPLAN_PINS}
            selectedPinId="pin-1"
            label="Workshop floor plan with 6 annotation pins"
            caption="Floor plan v3.2 · 6 pins"
          />
          <ActivityStream events={ACTIVITY} title="Last 24 hours" />
        </div>
        <ThreadSidePanel
          threads={THREAD_LIST}
          defaultSelectedId="t-1"
          kicker="Annotation board"
          title="6 active threads"
        />
      </section>
    </main>
  )
}
