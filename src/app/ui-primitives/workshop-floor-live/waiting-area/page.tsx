import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CustomerWaitingArea } from "../../components/workshop-floor-live"
import type { WaitingCustomer } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Customer waiting area | UI Primitives — Workshop Floor Live",
}

const customers: ReadonlyArray<WaitingCustomer> = [
  {
    id: "w-1",
    name: "Cardona",
    vehicle: "Ranger PX3 3.2L",
    waitedMinutes: 12,
    offered: "coffee",
  },
  {
    id: "w-2",
    name: "Aleksic",
    vehicle: "Hilux N80 GUN126R",
    waitedMinutes: 38,
    offered: "waiting-room",
  },
  {
    id: "w-3",
    name: "Hennelly",
    vehicle: "Land Cruiser 79 V8",
    waitedMinutes: 4,
    offered: "shuttle",
  },
]

export default function WaitingAreaPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.13 / Workshop floor live"
        title="Customer waiting area"
        description="Front-of-house card showing who's currently waiting, how long they have been on the couch, what they have been offered, and the estimated wait window for the next intake."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Waiting area" },
        ]}
      />
      <section className={styles.canvas}>
        <CustomerWaitingArea
          customers={customers}
          estimatedWait="8–12 min"
          coffeesPoured={14}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Offer chips encode hospitality state: coffee accepted, sitting in
            the waiting room, or out on a shuttle. The empty branch flips into
            a celebratory message instead of disappearing silently.
          </p>
        </div>
      </section>
    </main>
  )
}
