import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LiveSoundBandChip } from "../../components/workshop-floor-live"
import type { LiveSoundBandChipProps } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Live sound band chip | UI Primitives — Workshop Floor Live",
}

const readings: ReadonlyArray<LiveSoundBandChipProps> = [
  {
    measuredDb: 84.2,
    limitDb: 90,
    bay: "bay-3",
    rpm: 3500,
  },
  {
    measuredDb: 88.6,
    limitDb: 90,
    bay: "bay-3",
    rpm: 3700,
  },
  {
    measuredDb: 91.4,
    limitDb: 90,
    bay: "bay-3",
    rpm: 4100,
  },
]

export default function SoundBandPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.09 / Workshop floor live"
        title="Live sound band chip"
        description="Live readout from the current dyno pull — measured dB(A), ADR limit, RPM context, plus the ADR ComplianceBandChip showing where the sample falls against the 90 dB(A) ceiling."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Sound band" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          {readings.map((reading, idx) => (
            <LiveSoundBandChip
              key={`${reading.measuredDb}-${idx}`}
              {...reading}
            />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Composition: this primitive layers the existing ADR-compliance
            ComplianceBandChip on top of a live readout shell. The pulsing red
            dot communicates the data is streaming; the chip&apos;s tone communicates
            whether the build is street-legal.
          </p>
        </div>
      </section>
    </main>
  )
}
