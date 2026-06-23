import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import type { ActivityFeedItem } from "../../components/data-display/activity-feed"
import type { MetricBlockItem } from "../../components/data-display/metric-block"
import {
  SupplierDashboardOverview,
  type SupplierDashboardPaymentSummary,
} from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Supplier dashboard overview | UI Primitives — Supplier Portal",
}

const metrics: ReadonlyArray<MetricBlockItem> = [
  {
    id: "open-pos",
    label: "Open POs",
    value: "7",
    unit: "active",
    delta: { label: "+2 this week", direction: "up" },
  },
  {
    id: "monthly-volume",
    label: "Monthly volume",
    value: "184",
    unit: "units",
    delta: { label: "+12%", direction: "up" },
  },
  {
    id: "billed-mtd",
    label: "Billed MTD",
    value: "$42,810",
    unit: "AUD",
    delta: { label: "−3%", direction: "down" },
  },
]

const monthly: ReadonlyArray<number> = [126, 134, 138, 142, 155, 161, 168, 172, 178, 181, 178, 184]

const paymentSummary: ReadonlyArray<SupplierDashboardPaymentSummary> = [
  { state: "paid", count: 11, totalAud: 28490 },
  { state: "in-approval", count: 4, totalAud: 9748 },
  { state: "disputed", count: 1, totalAud: 1240 },
  { state: "overdue", count: 2, totalAud: 3920 },
]

const activity: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "act-1",
    title: "Acknowledged PO-OF-0917",
    description: "Owen Brackenridge accepted in full · ETA 3 Jun · StarTrack premium.",
    timestamp: "Today · 09:32",
    tone: "success",
    actor: { name: "Owen Brackenridge" },
  },
  {
    id: "act-2",
    title: "Backorder broadcast for MAN-PX3",
    description: "Freight delay flagged. Alternative offered: RB-PX3-MID.",
    timestamp: "Yesterday · 14:18",
    tone: "warn",
    actor: { name: "Manta dispatch" },
  },
  {
    id: "act-3",
    title: "Invoice MP-INV-04129 submitted",
    description: "$8,420.50 against PO-OF-0904. Sent for approval.",
    timestamp: "Yesterday · 11:02",
    tone: "info",
    actor: { name: "Manta accounts" },
  },
]

export default function SupplierDashboardOverviewPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.07 / Supplier portal"
        title="Supplier dashboard overview"
        description="What a Manta dispatch rep sees the moment they sign in — open POs, volume trend, money owed, recent activity."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Dashboard overview" },
        ]}
      />
      <section className={styles.canvas}>
        <SupplierDashboardOverview
          supplierName="Manta Performance"
          metrics={metrics}
          monthlyVolumePoints={monthly}
          monthlyVolumeTone="green"
          paymentSummary={paymentSummary}
          activity={activity}
        />
      </section>
    </main>
  )
}
