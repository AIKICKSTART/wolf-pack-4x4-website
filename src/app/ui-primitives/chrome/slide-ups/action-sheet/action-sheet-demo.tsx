"use client"

import { useState } from "react"

import { SlideUpActionSheet } from "@/app/ui-primitives/components/chrome"

export function ActionSheetDemo() {
  const [open, setOpen] = useState<boolean>(true)
  const [last, setLast] = useState<string>("")

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
        Open action sheet
      </button>
      <p style={{ marginTop: "var(--primitive-space-3)", color: "var(--primitive-body)", fontSize: "var(--primitive-text-sm)" }}>
        Last action: {last || "—"}
      </p>

      <SlideUpActionSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Job 2415 actions"
        description="Holden VE Ute · Bay 2 · Manta catback"
        actions={[
          { id: "spanner", label: "Reassign bay", description: "Move job to a different bay", kind: "spanner", onSelect: () => { setLast("Reassign bay"); setOpen(false) } },
          { id: "exhaust", label: "Print receipt", description: "Send to thermal printer in Bay 2", kind: "exhaust", onSelect: () => { setLast("Print receipt"); setOpen(false) } },
          { id: "phone", label: "Call customer", description: "Daniel · 04xx xxx xxx", kind: "phone", onSelect: () => { setLast("Call customer"); setOpen(false) } },
          { id: "cancel", label: "Cancel job", description: "Refund and remove from queue", kind: "shield", destructive: true, onSelect: () => { setLast("Cancel job"); setOpen(false) } },
        ]}
      />
    </div>
  )
}
