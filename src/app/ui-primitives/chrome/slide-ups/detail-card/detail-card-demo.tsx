"use client"

import { useState } from "react"

import { SlideUpDetailCard } from "@/app/ui-primitives/components/chrome"

export function DetailCardDemo() {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <div style={{ position: "relative", height: 540, padding: "var(--primitive-space-5)" }}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "var(--primitive-space-2-5) var(--primitive-space-4)",
          background: "var(--primitive-red)",
          color: "var(--primitive-text-on-accent)",
          border: 0,
          borderRadius: "var(--primitive-radius-md)",
          fontFamily: "var(--primitive-font-mono)",
          fontSize: "var(--primitive-text-xs)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        Open detail card
      </button>

      <SlideUpDetailCard
        open={open}
        onClose={() => setOpen(false)}
        kicker="Quote · OFM-2415"
        title="Manta catback · VE Ute"
        metas={[
          { id: "status", label: "Approved", tone: "green" },
          { id: "abn", label: "ADR stamped", tone: "amber" },
          { id: "warranty", label: "Lifetime warranty", tone: "teal" },
        ]}
        description="Full stainless catback with Manta tip. Includes ADR-compliance certificate and a 60-minute dyno before-and-after pull."
        stats={[
          { id: "muffler", label: "Mufflers", value: "1", kind: "muffler" },
          { id: "exhaust", label: "Pipe length", value: "2.4m", kind: "exhaust" },
          { id: "spanner", label: "Labour", value: "4h 30m", kind: "spanner" },
          { id: "tag", label: "Total", value: "$2,180", kind: "tag" },
        ]}
        primaryCta={{ label: "Confirm fit", onClick: () => setOpen(false) }}
        secondaryCta={{ label: "Save quote", onClick: () => setOpen(false) }}
      />
    </div>
  )
}
