"use client"

import { useState } from "react"

import { SlideUpMultiStep } from "@/app/ui-primitives/components/chrome"

const STEPS = [
  {
    id: "vehicle",
    label: "Vehicle",
    heading: "Vehicle details",
    description: "Enter the make, model and rego so we can match the right Manta range.",
  },
  {
    id: "service",
    label: "Service",
    heading: "Choose a service",
    description: "Pick what the bay is doing — install, dyno, weld, or compliance check.",
  },
  {
    id: "slot",
    label: "Slot",
    heading: "Pick a slot",
    description: "Bay availability is fetched live from the workshop calendar.",
  },
] as const

export function MultiStepDemo() {
  const [open, setOpen] = useState<boolean>(true)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  return (
    <div style={{ position: "relative", height: 620, padding: "var(--primitive-space-5)" }}>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          setCurrentIndex(0)
        }}
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
        Open wizard
      </button>

      <SlideUpMultiStep
        open={open}
        onClose={() => setOpen(false)}
        kicker="Workshop · Booking"
        title="Book a bay"
        steps={[...STEPS]}
        currentIndex={currentIndex}
        onNext={() => setCurrentIndex((value) => Math.min(value + 1, STEPS.length - 1))}
        onBack={() => setCurrentIndex((value) => Math.max(value - 1, 0))}
        onFinish={() => setOpen(false)}
        finishLabel="Confirm booking"
      />
    </div>
  )
}
