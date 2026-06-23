"use client"

import { useState } from "react"

import { DockSideMagnetic } from "@/app/ui-primitives/components/chrome"

export function SideMagneticDemo() {
  const [activeId, setActiveId] = useState<string>("home")

  return (
    <DockSideMagnetic
      layout="static"
      dividerAfter={4}
      actions={[
        { id: "home", label: "Home", kind: "home", onClick: () => setActiveId("home"), isActive: activeId === "home" },
        { id: "catalog", label: "Catalog", kind: "catalog", onClick: () => setActiveId("catalog"), isActive: activeId === "catalog" },
        { id: "tools", label: "Tools", kind: "tools", onClick: () => setActiveId("tools"), isActive: activeId === "tools" },
        { id: "performance", label: "Performance", kind: "performance", onClick: () => setActiveId("performance"), isActive: activeId === "performance" },
        { id: "motorsport", label: "Motorsport", kind: "motorsport", onClick: () => setActiveId("motorsport"), isActive: activeId === "motorsport" },
        { id: "quote", label: "Quote", kind: "quote", onClick: () => undefined, badge: 3 },
        { id: "phone", label: "Phone", kind: "phone", onClick: () => undefined },
      ]}
    />
  )
}
