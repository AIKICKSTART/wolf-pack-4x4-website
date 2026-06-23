import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { NextUpQueue } from "../../components/workshop-floor-live"
import type { NextUpEntry } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Next-up queue | UI Primitives — Workshop Floor Live",
}

const queue: ReadonlyArray<NextUpEntry> = [
  {
    id: "q-1",
    vehicle: "Ranger PX3 3.2L · DTU-209",
    customer: "Cardona",
    bookedAt: "11:45 am",
    bay: "bay-1",
    service: "XForce mid-muffler swap",
    arrived: true,
  },
  {
    id: "q-2",
    vehicle: "Land Cruiser 79 V8 · BGS-704",
    customer: "Hennelly",
    bookedAt: "12:15 pm",
    bay: "bay-1",
    service: "Pacemaker headers + Y-pipe",
    arrived: false,
  },
  {
    id: "q-3",
    vehicle: "BT-50 UR · KLB-118",
    customer: "Petrovski",
    bookedAt: "12:45 pm",
    service: "Wigwam mid-mount muffler",
    arrived: false,
  },
  {
    id: "q-4",
    vehicle: "MX-5 NB SE · YQP-877",
    customer: "Iliopoulos",
    bookedAt: "1:30 pm",
    bay: "bay-4",
    service: "Di Filippo 2.25in single",
    arrived: false,
  },
]

export default function NextUpPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.05 / Workshop floor live"
        title="Next-up queue"
        description="Ordered queue of customers waiting to come into bays — booked time, vehicle, service, pre-assigned bay and an Arrived chip that toggles on customer check-in."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Next-up" },
        ]}
      />
      <section className={styles.canvas}>
        <NextUpQueue entries={queue} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Position numbers are red-coded to reinforce that the top entry is
            the next intake. The arrived chip flips green the moment the
            customer checks in at the front office, giving floor leads a quick
            scan of who is already on-site.
          </p>
        </div>
      </section>
    </main>
  )
}
