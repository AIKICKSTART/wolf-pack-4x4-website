import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WorkshopWeekSchedule } from "../../components/workshop-scenes/workshop-week-schedule"
import type {
  BayLane,
  BayLaneEvent,
} from "../../components/workshop-scenes/workshop-week-schedule"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Workshop week schedule | UI Primitives — Workshop Scenes",
}

const TODAY = new Date(2026, 4, 28, 10, 30)

function at(hour: number, minute = 0): Date {
  return new Date(2026, 4, 28, hour, minute)
}

const bays: ReadonlyArray<BayLane> = [
  { id: "bay-1", label: "Bay 1", technician: "Owen" },
  { id: "bay-2", label: "Bay 2", technician: "Levi" },
  { id: "bay-3", label: "Bay 3", technician: "Mickey" },
  { id: "bay-4", label: "Mobile", technician: "Jordan" },
]

const events: ReadonlyArray<BayLaneEvent> = [
  {
    id: "e1",
    bayId: "bay-1",
    start: at(7, 30),
    end: at(11, 0),
    jobNumber: "JOB-0419",
    rego: "BUG-301",
    tone: "red",
  },
  {
    id: "e2",
    bayId: "bay-1",
    start: at(13, 0),
    end: at(17, 30),
    jobNumber: "JOB-0424",
    rego: "MX-NB",
    tone: "amber",
  },
  {
    id: "e3",
    bayId: "bay-2",
    start: at(8, 0),
    end: at(12, 30),
    jobNumber: "JOB-0418",
    rego: "ECC-714",
    tone: "red",
  },
  {
    id: "e4",
    bayId: "bay-2",
    start: at(14, 0),
    end: at(17, 0),
    jobNumber: "JOB-0422",
    rego: "ROAR-1",
    tone: "teal",
  },
  {
    id: "e5",
    bayId: "bay-3",
    start: at(7, 0),
    end: at(10, 30),
    jobNumber: "JOB-0416",
    rego: "LCV-79",
    tone: "red",
  },
  {
    id: "e6",
    bayId: "bay-3",
    start: at(11, 0),
    end: at(13, 0),
    jobNumber: "JOB-0420",
    rego: "MX-NB",
    tone: "teal",
  },
  {
    id: "e7",
    bayId: "bay-3",
    start: at(14, 0),
    end: at(16, 0),
    jobNumber: "QC-0417",
    rego: "MX-UR",
    tone: "green",
  },
  {
    id: "e8",
    bayId: "bay-4",
    start: at(9, 0),
    end: at(11, 30),
    jobNumber: "FIELD-114",
    rego: "BNK-OAK",
    tone: "amber",
  },
  {
    id: "e9",
    bayId: "bay-4",
    start: at(13, 30),
    end: at(16, 30),
    jobNumber: "FIELD-115",
    rego: "SCH-WAR",
    tone: "amber",
  },
]

export default function WorkshopWeekScheduleScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.11 / Workshop scenes"
        title="Workshop week schedule"
        description="Today's bay-by-bay timeline. Instead of weekdays, the columns are the four bays — each event block shows the job number and the rego it belongs to."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Week schedule" },
        ]}
      />
      <section className={styles.canvas}>
        <WorkshopWeekSchedule
          reference={TODAY}
          bays={bays}
          events={events}
          startHour={7}
          endHour={18}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Tones are reused from the rest of the umbrella: red is workshop
            bench work, amber is mobile / off-site fitting, teal is quoting or
            walk-in work, green is a quality check or handover. The four-bay
            layout matches the floor plan at Oak Flats.
          </p>
        </div>
      </section>
    </main>
  )
}
