import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { IncomingCustomerBanner } from "../../components/workshop-floor-live"
import type { IncomingCustomerBannerProps } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Incoming customer banner | UI Primitives — Workshop Floor Live",
}

const incoming: ReadonlyArray<IncomingCustomerBannerProps> = [
  {
    customer: "Cardona",
    vehicle: "Ranger PX3 3.2L · DTU-209",
    eta: "in 6 min",
    phone: "0422 188 314",
    bay: "bay-1",
    service: "XForce mid-muffler · 1.5h slot",
  },
  {
    customer: "Hennelly",
    vehicle: "Land Cruiser 79 V8 · BGS-704",
    eta: "in 28 min",
    phone: "0408 904 027",
    bay: "bay-1",
    service: "Pacemaker 5-into-1 headers · 3h slot",
  },
  {
    customer: "Iliopoulos",
    vehicle: "MX-5 NB SE · YQP-877",
    eta: "1:30 pm",
    phone: "Walk-in booking",
    bay: "bay-4",
    service: "Di Filippo 2.25in single-out · 1h slot",
  },
]

export default function IncomingCustomerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.07 / Workshop floor live"
        title="Incoming customer banner"
        description="Live-status banner that surfaces when a booked customer is en route — vehicle, ETA, pre-assigned bay, contact handle, service summary. Ringing bell glyph nudges the front desk to put coffee on."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Incoming customer" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          {incoming.map((entry) => (
            <IncomingCustomerBanner key={entry.customer} {...entry} />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Bell glyph ring animation respects reduced-motion. Banner uses
            role=&quot;status&quot; with aria-live=&quot;polite&quot; so screen
            readers announce the new intake without yanking focus away from a
            tech writing up a quote.
          </p>
        </div>
      </section>
    </main>
  )
}
