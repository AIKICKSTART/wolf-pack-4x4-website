"use client"

import { useState } from "react"

import { AchievementUnlockToast } from "../../components/onboarding"

export function AchievementToastDemo() {
  const [open, setOpen] = useState<boolean>(true)
  const [nonce, setNonce] = useState<number>(0)

  return (
    <div style={{ display: "grid", placeItems: "center", gap: "var(--primitive-space-5)" }}>
      <button
        type="button"
        onClick={() => {
          setOpen(false)
          requestAnimationFrame(() => {
            setNonce((n) => n + 1)
            setOpen(true)
          })
        }}
        style={{
          appearance: "none",
          padding: "var(--primitive-space-2-5) var(--primitive-space-4)",
          border: "1px solid color-mix(in oklab, var(--primitive-amber) 50%, white)",
          borderRadius: "var(--primitive-btn-radius)",
          background: "var(--primitive-btn-primary-hover-bg)",
          color: "var(--primitive-btn-primary-hover-fg)",
          fontFamily: "var(--primitive-font-mono)",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          width: "max-content",
          boxShadow: "var(--primitive-btn-primary-hover-shadow)",
        }}
      >
        Replay achievement unlock
      </button>
      <AchievementUnlockToast
        key={nonce}
        open={open}
        kicker="Achievement unlocked"
        title="First Quote logged"
        body="You logged Oak Flats' first job quote — Bay 1 muffler swap for a 2003 Holden VY. Bay leads now have visibility."
        points="+50 XP"
        onClose={() => setOpen(false)}
        autoCloseMs={null}
      />
    </div>
  )
}

export default AchievementToastDemo
