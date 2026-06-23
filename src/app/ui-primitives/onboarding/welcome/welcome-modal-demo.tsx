"use client"

import { useState } from "react"

import { WelcomeModal } from "../../components/onboarding"

export function WelcomeModalDemo() {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          appearance: "none",
          padding: "var(--primitive-space-2-5) var(--primitive-space-4)",
          border: "1px solid color-mix(in oklab, var(--primitive-red) 50%, transparent)",
          borderRadius: "var(--primitive-btn-radius)",
          background: "var(--primitive-btn-primary-bg)",
          color: "var(--primitive-btn-primary-fg)",
          fontFamily: "var(--primitive-font-mono)",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          width: "max-content",
          boxShadow: "var(--primitive-btn-primary-shadow)",
        }}
      >
        Reopen welcome modal
      </button>
      <WelcomeModal
        open={open}
        kicker="Welcome aboard"
        headline="G'day Daniel — let's open the bay doors"
        body="Oak Flats workshop is provisioned. Pick a starting point below — you can always come back to this from the dashboard."
        ctas={[
          {
            label: "Add your first vehicle",
            description: "Capture a rego and you're rolling.",
            glyph: "▸",
            href: "/ui-primitives/onboarding/first-actions",
          },
          {
            label: "Invite the crew",
            description: "Bay leads, parts receivers, front desk.",
            glyph: "✦",
            href: "/ui-primitives/onboarding/empty-team-prompt",
          },
          {
            label: "Take a 90-second tour",
            description: "Walk through the workshop floor surface.",
            glyph: "↝",
            href: "/ui-primitives/onboarding/tour-invitation",
          },
        ]}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export default WelcomeModalDemo
