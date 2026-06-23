import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import type { BayRow } from "../../components/calendar/availability-grid"
import { WeldBayAllocation } from "../../components/workshop-scenes/weld-bay-allocation"
import type {
  UnassignedJob,
  WeldBay,
} from "../../components/workshop-scenes/weld-bay-allocation"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Weld bay allocation | UI Primitives — Workshop Scenes",
}

const bays: ReadonlyArray<WeldBay> = [
  {
    id: "bay-1",
    label: "Weld bay 1",
    technician: "Owen Brackenridge",
    certTag: "MIG · TIG",
  },
  {
    id: "bay-2",
    label: "Weld bay 2",
    technician: "Levi Tahau",
    certTag: "MIG · stainless",
  },
  {
    id: "bay-3",
    label: "Weld bay 3",
    technician: "Mickey Pa'aga",
    certTag: "TIG · ADR",
  },
  {
    id: "bay-4",
    label: "Mobile fit van",
    technician: "Jordan Webb",
    certTag: "Field MIG",
  },
]

const availability: ReadonlyArray<BayRow> = [
  {
    id: "bay-1",
    label: "Weld bay 1",
    hours: [
      "busy",
      "busy",
      "busy",
      "free",
      "free",
      "busy",
      "busy",
      "busy",
      "busy",
      "free",
      "maintenance",
    ],
  },
  {
    id: "bay-2",
    label: "Weld bay 2",
    hours: [
      "busy",
      "busy",
      "busy",
      "busy",
      "busy",
      "free",
      "busy",
      "busy",
      "busy",
      "free",
      "free",
    ],
  },
  {
    id: "bay-3",
    label: "Weld bay 3",
    hours: [
      "free",
      "busy",
      "busy",
      "blocked",
      "blocked",
      "free",
      "busy",
      "busy",
      "free",
      "free",
      "free",
    ],
  },
  {
    id: "bay-4",
    label: "Mobile fit van",
    hours: [
      "blocked",
      "blocked",
      "busy",
      "busy",
      "busy",
      "blocked",
      "free",
      "free",
      "blocked",
      "blocked",
      "blocked",
    ],
  },
]

const unassigned: ReadonlyArray<UnassignedJob> = [
  {
    id: "u-1",
    jobNumber: "JOB-2026-0421",
    customer: "Sandra Picton",
    vehicle: "2023 Hilux N80 · ECC-001",
    estHours: 3.5,
    priority: "red",
  },
  {
    id: "u-2",
    jobNumber: "JOB-2026-0422",
    customer: "Liam Brookings",
    vehicle: "2018 VE Commodore SS · ROAR-1",
    estHours: 2.0,
    priority: "amber",
  },
  {
    id: "u-3",
    jobNumber: "JOB-2026-0423",
    customer: "Tahira Mansell",
    vehicle: "2024 Patrol Y62 · BRR-902",
    estHours: 5.0,
    priority: "red",
  },
  {
    id: "u-4",
    jobNumber: "JOB-2026-0424",
    customer: "Jeff Crowther",
    vehicle: "2019 MX-5 NB · MX-NB",
    estHours: 1.5,
    priority: "teal",
  },
]

export default function WeldBayAllocationScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.07 / Workshop scenes"
        title="Weld bay allocation"
        description="Today's bay-by-hour view with crew avatars, live availability colours, and a drag-from pool of unassigned jobs waiting for a bay."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Weld bay allocation" },
        ]}
      />
      <section className={styles.canvas}>
        <WeldBayAllocation
          startHour={7}
          endHour={18}
          bays={bays}
          availability={availability}
          unassigned={unassigned}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The mobile fit van is treated as a fourth bay — most of its day is
            blocked for travel, but mid-afternoon shows two clean slots for
            workshop-floor work between callouts. The job pool below the grid
            is keyboard-accessible: Enter opens a bay picker dialog.
          </p>
        </div>
      </section>
    </main>
  )
}
