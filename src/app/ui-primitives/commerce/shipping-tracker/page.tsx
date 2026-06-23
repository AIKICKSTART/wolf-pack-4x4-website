import type { Metadata } from "next"

import { ShippingProgress, type ShippingStep } from "../../components/commerce/shipping-progress"
import { ActivityFeed, type ActivityFeedItem } from "../../components/data-display/activity-feed"
import { PageHeader } from "../../components/page-header"
import styles from "../commerce.module.css"

export const metadata: Metadata = {
  title: "Shipping tracker | Commerce | UI Primitives",
  description:
    "Standalone shipping tracker — shipping progress, carrier event feed, dispatch map placeholder.",
}

const STEPS: ReadonlyArray<ShippingStep> = [
  { key: "placed", label: "Placed", description: "Order received", timestamp: "Mon 26 May · 15:42", status: "complete" },
  { key: "picking", label: "Picking", description: "Workshop floor", timestamp: "Tue 27 May · 08:20", status: "complete" },
  { key: "packed", label: "Packed", description: "Crated · 2 boxes · 18.4 kg", timestamp: "Tue 27 May · 11:14", status: "complete" },
  { key: "dispatched", label: "Dispatched", description: "TOLL IPEC · TQA 8841", timestamp: "Tue 27 May · 16:30", status: "current" },
  { key: "delivered", label: "Delivered", description: "Signature on arrival", status: "upcoming" },
]

const EVENTS: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "ev-1",
    timestamp: "Tue 27 May · 16:30",
    title: "Departed Oak Flats depot",
    description: "TOLL IPEC accepted consignment TQA 8841 · 2 boxes",
    tone: "warn",
  },
  {
    id: "ev-2",
    timestamp: "Tue 27 May · 14:48",
    title: "Workshop packed",
    description: "Two cartons sealed and labelled by floor crew",
    tone: "info",
  },
  {
    id: "ev-3",
    timestamp: "Tue 27 May · 11:02",
    title: "Picking complete",
    description: "5 SKUs picked from Oak Flats inventory",
    tone: "info",
  },
  {
    id: "ev-4",
    timestamp: "Mon 26 May · 15:42",
    title: "Order received",
    description: "Payment captured · Visa 4242",
    tone: "success",
  },
]

export default function ShippingTrackerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 04"
        title="Shipping tracker"
        description="Standalone tracker for consignment TQA 8841 — vertical shipping progress, carrier event feed, and dispatch map placeholder."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Commerce", href: "/ui-primitives/commerce" },
          { label: "Shipping tracker" },
        ]}
      />

      <div className={styles.trackerLayout}>
        <ShippingProgress steps={STEPS} orientation="vertical" />

        <div className={styles.trackerMap} role="img" aria-label="Dispatch route map placeholder — Oak Flats to Sydney">
          <span className={styles.mapLabel}>Live route · TQA 8841</span>
          <span
            className={styles.mapMarker}
            style={{ inset: "30% auto auto 30%" }}
            aria-hidden="true"
          />
          <span className={styles.mapPath} aria-hidden="true" />
          <span
            className={styles.mapMarker}
            style={{ inset: "auto 20% 24% auto", background: "var(--primitive-teal)", boxShadow: "0 0 0 6px color-mix(in srgb, var(--primitive-teal) 22%, transparent)" }}
            aria-hidden="true"
          />
          <span className={styles.mapLabel} style={{ marginTop: "auto" }}>
            Oak Flats NSW 2529 → Sydney NSW 2000 · 96 km
          </span>
        </div>
      </div>

      <ActivityFeed items={EVENTS} />
    </main>
  )
}
