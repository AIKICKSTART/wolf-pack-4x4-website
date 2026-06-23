import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { JobTicket } from "../../components/workshop-scenes/job-ticket"
import type {
  JobPhoto,
  JobService,
} from "../../components/workshop-scenes/job-ticket"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Job ticket | UI Primitives — Workshop Scenes",
}

const services: ReadonlyArray<JobService> = [
  { id: "s1", label: "3in cat-back fitup", tone: "red" },
  { id: "s2", label: "MIG-weld tips", tone: "amber" },
  { id: "s3", label: "Lambda re-tune", tone: "teal" },
  { id: "s4", label: "ADR 80/13 walkthrough", tone: "amber" },
  { id: "s5", label: "Sound check + clip", tone: "green" },
]

const photos: ReadonlyArray<JobPhoto> = [
  { id: "p1", label: "01 BEFORE" },
  { id: "p2", label: "02 SUSP" },
  { id: "p3", label: "03 WELD" },
  { id: "p4", label: "04 TIPS" },
  { id: "p5", label: "05 AFTER" },
  { id: "p6", label: "06 EGT" },
]

export default function JobTicketScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.02 / Workshop scenes"
        title="Job ticket"
        description="A complete job ticket — what every floor lead opens on the iPad when they walk past a bay and need the full picture in one glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Job ticket" },
        ]}
      />
      <section className={styles.canvas}>
        <JobTicket
          jobNumber="JOB-2026-0418"
          customerName="Bryce Cattermole"
          customerSuburb="Albion Park Rail · NSW 2527"
          vehicleYear={2024}
          vehicleMake="Toyota"
          vehicleModel="Hilux dual cab N80"
          vehicleRego="ECC-714"
          vehicleEngine="2.8L turbodiesel · 6-speed auto"
          services={services}
          status="in-progress"
          weldBay="Weld bay 2"
          timeSpentMin={195}
          timeBudgetMin={300}
          photos={photos}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Time budget bar shifts from teal to amber at 80% and red at 100%, so
            a glance tells the floor lead whether the ticket is running hot.
            Bay chip and status chip share a row with the actions — every
            decision lives within one tap.
          </p>
        </div>
      </section>
    </main>
  )
}
