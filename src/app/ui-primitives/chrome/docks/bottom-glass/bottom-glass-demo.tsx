"use client"

import { useState } from "react"

import { DockBottomGlass } from "@/app/ui-primitives/components/chrome"

export function BottomGlassDemo() {
  const [activeId, setActiveId] = useState<string>("home")

  return (
    <DockBottomGlass
      layout="static"
      actions={[
        { id: "home", label: "Home", kind: "home", onClick: () => setActiveId("home"), isActive: activeId === "home" },
        { id: "catalog", label: "Catalog", kind: "catalog", onClick: () => setActiveId("catalog"), isActive: activeId === "catalog" },
        { id: "tools", label: "Tools", kind: "tools", onClick: () => setActiveId("tools"), isActive: activeId === "tools" },
        { id: "performance", label: "Performance", kind: "performance", onClick: () => setActiveId("performance"), isActive: activeId === "performance" },
        { id: "phone", label: "Phone", kind: "phone", onClick: () => undefined },
      ]}
    />
  )
}
