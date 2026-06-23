import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  LiveJobTrackerMap,
  type TechnicianMarker,
} from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Live job tracker | Maps & Location",
  description:
    "Primitive 12 — live job tracker map with workshop center and drifting technician pins.",
}

const TECHNICIANS: ReadonlyArray<TechnicianMarker> = [
  { id: "t1", name: "Brad K.", x: 36, y: 36, drift: 4, job: "Muffler fitment · #4821" },
  { id: "t2", name: "Lochie W.", x: 62, y: 30, drift: 5, job: "Quote callout · #4823" },
  { id: "t3", name: "Macca P.", x: 30, y: 60, drift: 3, job: "Pickup · Albion Park" },
  { id: "t4", name: "Jess R.", x: 70, y: 64, drift: 6, job: "ADR check · Kiama" },
  { id: "t5", name: "Sam D.", x: 50, y: 76, drift: 4, job: "Mobile repair · #4825" },
]

export default function LiveJobTrackerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Live job tracker"
        title="Live job tracker map"
        description="Workshop center plus five technicians out on jobs in the Illawarra. Pins drift on a slow framer-motion loop to suggest live updates; reduced-motion users see static positions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Live job tracker" },
        ]}
      />
      <LiveJobTrackerMap
        centerX={50}
        centerY={50}
        technicians={TECHNICIANS}
        caption="Five Mufflermen technicians on field jobs across Albion Park, Shellharbour, Warilla, Kiama and Lake Illawarra."
      />
    </main>
  )
}
