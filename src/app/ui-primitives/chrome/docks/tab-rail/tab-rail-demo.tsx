"use client"

import { useState } from "react"

import { DockTabRail } from "@/app/ui-primitives/components/chrome"

export function TabRailDemo() {
  const [activeId, setActiveId] = useState<string>("workshop")

  return (
    <DockTabRail
      layout="inline"
      activeId={activeId}
      onSelect={setActiveId}
      items={[
        { id: "home", label: "Home", kind: "home", subtitle: "Overview" },
        { id: "workshop", label: "Workshop", kind: "workshop", subtitle: "Bays + dyno" },
        { id: "catalog", label: "Catalog", kind: "catalog", subtitle: "Manta range" },
        { id: "performance", label: "Performance", kind: "performance", subtitle: "Dyno builds", badge: 4 },
        { id: "motorsport", label: "Motorsport", kind: "motorsport", subtitle: "Race prep" },
      ]}
    />
  )
}
