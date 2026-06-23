import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TechnicianLocationPin } from "../../components/workshop-floor-live"
import type { TechnicianLocationPinProps } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Technician location pin | UI Primitives — Workshop Floor Live",
}

const pins: ReadonlyArray<TechnicianLocationPinProps> = [
  {
    name: "Jordan Pace",
    role: "Apprentice Y3",
    location: "bay-2",
    doing: "Hanging the Manta mid-section",
    online: true,
  },
  {
    name: "Sophie Tan",
    role: "Lead fitter",
    location: "dyno",
    doing: "Run 03 of 04 — Patrol Y62",
    online: true,
  },
  {
    name: "Trent Williams",
    role: "Workshop manager",
    location: "bay-4",
    doing: "Reading VE Commodore noise complaint",
    online: true,
  },
  {
    name: "Dean Okafor",
    role: "Parts runner",
    location: "parts",
    doing: "Picking MAN-MK24-405",
    online: true,
  },
  {
    name: "Kane Tipiloura",
    role: "Apprentice Y1",
    location: "off-floor",
    doing: "On lunch break",
    online: false,
  },
]

export default function TechPinPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.04 / Workshop floor live"
        title="Technician location pin"
        description="Compact pin showing each technician's current zone, role, what they're doing right now and their on/away status — designed to clip into the floor plan or run in a side rail."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Technician pin" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          {pins.map((p) => (
            <TechnicianLocationPin key={p.name} {...p} />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Reuses the global Avatar primitive&apos;s status dot for online/away. The
            location chip mirrors the canonical bay vocabulary so the pin reads
            consistently when surfaced inside the floor plan, the dyno cell or
            the parts area composition.
          </p>
        </div>
      </section>
    </main>
  )
}
