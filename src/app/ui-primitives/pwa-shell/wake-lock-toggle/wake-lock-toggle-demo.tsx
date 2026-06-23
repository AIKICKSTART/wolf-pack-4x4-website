"use client"

import { useState } from "react"

import { WakeLockToggle } from "../../components/pwa-shell"

export function WakeLockToggleDemo() {
  const [enabled, setEnabled] = useState<boolean>(false)
  return (
    <WakeLockToggle
      enabled={enabled}
      batteryCostPctPerHour={enabled ? 11 : 6}
      hint={
        enabled
          ? "Screen stays awake — quoting on the bay"
          : "Screen will dim after 30s idle"
      }
      onToggle={() => setEnabled((prev) => !prev)}
    />
  )
}
