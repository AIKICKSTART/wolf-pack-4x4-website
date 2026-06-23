import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { HandoverReadyBanner } from "../../components/workshop-floor-live"
import type { HandoverReadyBannerProps } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Handover ready banner | UI Primitives — Workshop Floor Live",
}

const ready: ReadonlyArray<HandoverReadyBannerProps> = [
  {
    jobNumber: "WS-2604-09",
    vehicle: "Patrol Y62 5.6L · QXK-014",
    customer: "McKinnon",
    bay: "bay-3",
    photoCount: 8,
    soundClipCaptured: true,
    signalledTo: "front-desk",
  },
  {
    jobNumber: "WS-2604-04",
    vehicle: "Triton MR · NEH-211",
    customer: "Burchall",
    bay: "bay-1",
    photoCount: 6,
    soundClipCaptured: true,
    signalledTo: "customer-sms",
  },
]

export default function HandoverReadyPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.11 / Workshop floor live"
        title="Handover ready banner"
        description="Job-ready-for-pickup banner with photo evidence count, sound-clip-on-file chip and a signal-to-front-desk badge that tells the counter who is up next."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Handover ready" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          {ready.map((b) => (
            <HandoverReadyBanner key={b.jobNumber} {...b} />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Green border + halo encode the positive completion state. Chips
            describe the artefacts the customer will be walked through — photo
            evidence, recorded sound clip, and where the signal has already been
            sent.
          </p>
        </div>
      </section>
    </main>
  )
}
