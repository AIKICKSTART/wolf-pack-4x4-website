"use client"

import { SidebarContextRail } from "@/app/ui-primitives/components/chrome"

export function ContextRailDemo() {
  return (
    <SidebarContextRail
      layout="static"
      kicker="Job · OFM-2415"
      title="Manta catback · VE Ute"
      metas={[
        { id: "status", label: "In progress" },
        { id: "warranty", label: "ADR stamped" },
      ]}
      stats={[
        { id: "muffler", label: "Mufflers", value: "1", kind: "muffler" },
        { id: "exhaust", label: "Pipe", value: "2.4m", kind: "exhaust" },
        { id: "spanner", label: "Labour", value: "4.5h", kind: "spanner" },
        { id: "tag", label: "Total", value: "$2,180", kind: "tag" },
      ]}
      related={[
        { id: "related-1", label: "Past VE Ute installs", href: "#" },
        { id: "related-2", label: "Manta range catalog", href: "#" },
        { id: "related-3", label: "Dyno test bookings", href: "#" },
      ]}
      primaryAction={{ label: "Mark complete", onClick: () => undefined }}
      secondaryAction={{ label: "Reassign bay", onClick: () => undefined }}
    />
  )
}
