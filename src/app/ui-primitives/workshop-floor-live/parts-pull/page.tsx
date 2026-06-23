import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartsPullRequestRow } from "../../components/workshop-floor-live"
import type { PartsPullRequestRowProps } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Parts pull request row | UI Primitives — Workshop Floor Live",
}

const pulls: ReadonlyArray<PartsPullRequestRowProps> = [
  {
    sku: "MAN-MK24-405",
    partName: "Manta 3in stainless cat-back",
    qty: 1,
    bay: "bay-2",
    status: "delivered",
    requestedBy: "Jordan P.",
    at: "11:48",
  },
  {
    sku: "PAC-LC79-HDR",
    partName: "Pacemaker 5-into-1 headers",
    qty: 1,
    bay: "bay-1",
    status: "picking",
    requestedBy: "Trent W.",
    at: "11:52",
  },
  {
    sku: "REDB-N80-DPF",
    partName: "Redback DPF-back 3in mandrel",
    qty: 2,
    bay: "bay-2",
    status: "queued",
    requestedBy: "Jordan P.",
    at: "11:55",
  },
  {
    sku: "XFC-PX3-MAN",
    partName: "XForce twin-tip mid-muffler",
    qty: 1,
    bay: "bay-1",
    status: "back-order",
    requestedBy: "Trent W.",
    at: "11:56",
  },
  {
    sku: "WIG-BT50-MUF",
    partName: "Wigwam mid-mount muffler",
    qty: 1,
    bay: "bay-4",
    status: "picking",
    requestedBy: "Sophie T.",
    at: "11:58",
  },
]

export default function PartsPullPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.08 / Workshop floor live"
        title="Parts pull request row"
        description="Row representing a single parts pull from a bay — SKU, qty, originating bay, technician, time stamp, and a status chip from Queued through Delivered or Back-order."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Parts pull" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.canvas}>
          {pulls.map((p) => (
            <PartsPullRequestRow key={`${p.sku}-${p.at}`} {...p} />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Back-order rows pull a red wash so the parts runner sees the
            blocker before anything else. Delivered rows dim down to clear
            visual space for whatever is still on the picking line.
          </p>
        </div>
      </section>
    </main>
  )
}
