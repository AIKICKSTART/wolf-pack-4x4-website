import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BayLiveStatusCard } from "../../components/workshop-floor-live"
import type { BayLiveStatusCardProps } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Bay live status card | UI Primitives — Workshop Floor Live",
}

const bays: ReadonlyArray<BayLiveStatusCardProps> = [
  {
    bay: "bay-1",
    state: "idle",
    technician: { name: "Trent Williams", role: "Workshop manager" },
    elapsedMinutes: 0,
    progressPercent: 0,
  },
  {
    bay: "bay-2",
    state: "in-progress",
    vehicle: "Hilux N80 GUN126R · BTR-882",
    customer: "Aleksic",
    technician: { name: "Jordan Pace", role: "Apprentice Y3" },
    jobNumber: "WS-2604-12",
    elapsedMinutes: 84,
    etaHandover: "12:40 pm",
    progressPercent: 64,
  },
  {
    bay: "bay-3",
    state: "dyno-running",
    vehicle: "Patrol Y62 5.6L · QXK-014",
    customer: "McKinnon",
    technician: { name: "Sophie Tan", role: "Lead fitter" },
    jobNumber: "WS-2604-09",
    elapsedMinutes: 152,
    etaHandover: "1:20 pm",
    progressPercent: 82,
  },
  {
    bay: "bay-4",
    state: "diagnostic",
    vehicle: "VE Commodore SS · CTU-491",
    customer: "Rakuljic",
    technician: { name: "Trent Williams", role: "Workshop manager" },
    jobNumber: "WS-2604-15",
    elapsedMinutes: 26,
    etaHandover: "2:05 pm",
    progressPercent: 18,
  },
]

export default function BayStatusPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.01 / Workshop floor live"
        title="Bay live status card"
        description="Per-bay snapshot — bay number, vehicle, technician, elapsed clock, ETA to handover, progress bar and tone-mapped status chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Bay status" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          {bays.map((b) => (
            <BayLiveStatusCard key={b.bay} {...b} />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            State maps to a left accent rail and a chip tone — idle shows a
            dashed placeholder, busy bays render the full vehicle stack with
            elapsed and ETA. Striped progress bar continues to communicate
            motion to glancing floor leads.
          </p>
        </div>
      </section>
    </main>
  )
}
