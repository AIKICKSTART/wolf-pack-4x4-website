import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DistanceDurationChip } from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Distance + duration chip | Maps & Location",
  description:
    "Primitive 08 — distance + duration chip with traffic-tone status pip.",
}

interface ChipSample {
  distance: string
  duration: string
  traffic: "free" | "moderate" | "heavy"
  label: string
}

const SAMPLES: ReadonlyArray<ChipSample> = [
  { distance: "3.2 km", duration: "6 min", traffic: "free", label: "Albion Park drop-off" },
  { distance: "6.6 km", duration: "11 min", traffic: "free", label: "Warilla pickup" },
  { distance: "12.4 km", duration: "18 min", traffic: "moderate", label: "Dapto fitment" },
  { distance: "18.2 km", duration: "26 min", traffic: "moderate", label: "Kiama drop-off" },
  { distance: "22.5 km", duration: "42 min", traffic: "heavy", label: "Wollongong CBD job" },
  { distance: "58.4 km", duration: "1 h 12 min", traffic: "heavy", label: "Helensburgh emergency" },
]

export default function DistanceChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Distance + duration chip"
        title="Distance + duration chip"
        description="Compact monospace chip with a car silhouette, the trip distance, an inline divider, the duration, and a traffic-tone status pip on the right edge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Distance + duration chip" },
        ]}
      />

      <section className={styles.stageFrame} aria-label="Distance chip samples">
        <div className={styles.stageLegend}>
          {SAMPLES.map((sample) => (
            <div key={sample.label} className={styles.legendItem}>
              <strong>{sample.label}</strong>
              <DistanceDurationChip
                distance={sample.distance}
                duration={sample.duration}
                traffic={sample.traffic}
                label={sample.label}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
