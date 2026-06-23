"use client"

import { useState } from "react"

import { SlideUpFullTakeover } from "@/app/ui-primitives/components/chrome"

export function FullTakeoverDemo() {
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
        Open full takeover
      </button>

      <SlideUpFullTakeover
        open={open}
        onClose={() => setOpen(false)}
        kicker="Booking · Step 2"
        title="Choose your bay"
        trail={[
          { label: "Workshop", href: "#workshop" },
          { label: "Bookings", href: "#bookings" },
          { label: "Choose bay" },
        ]}
        footer={
          <>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                padding: "var(--primitive-space-2-5) var(--primitive-space-4)",
                background: "color-mix(in oklab, var(--primitive-text-strong) 5%, transparent)",
                color: "var(--primitive-text-strong)",
                border: "1px solid var(--primitive-line)",
                borderRadius: "var(--primitive-radius-md)",
                fontFamily: "var(--primitive-font-mono)",
                fontSize: "var(--primitive-text-xs)",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                padding: "var(--primitive-space-2-5) var(--primitive-space-4)",
                background: "linear-gradient(180deg, var(--primitive-red), var(--primitive-red-dark))",
                color: "var(--primitive-text-on-accent)",
                border: "1px solid color-mix(in oklab, var(--primitive-text-strong) 20%, transparent)",
                borderRadius: "var(--primitive-radius-md)",
                fontFamily: "var(--primitive-font-mono)",
                fontSize: "var(--primitive-text-xs)",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Confirm booking
            </button>
          </>
        }
      >
        <p style={{ color: "var(--primitive-body)", fontSize: "var(--primitive-text-sm)", lineHeight: 1.6 }}>
          Pick a bay for your service. Bay 2 is the dyno cell and is best for
          performance assessments. Bay 4 is the mobile-rig overflow.
        </p>
        <ul style={{ display: "grid", gap: "var(--primitive-space-3)", marginTop: "var(--primitive-space-4)", listStyle: "none", padding: 0 }}>
          {["Bay 1 · General service", "Bay 2 · Dyno cell", "Bay 3 · MIG/TIG welding", "Bay 4 · Mobile rig"].map((label) => (
            <li
              key={label}
              style={{
                padding: "var(--primitive-space-4) 18px",
                borderRadius: "var(--primitive-radius-lg)",
                border: "1px solid var(--primitive-line)",
                background: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
                color: "var(--primitive-text-strong)",
                fontFamily: "var(--primitive-font-mono)",
                fontSize: "var(--primitive-text-xs)",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      </SlideUpFullTakeover>
    </div>
  )
}
