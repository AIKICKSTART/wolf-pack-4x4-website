import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SupplierDashboard } from "../../components/workshop-scenes/supplier-dashboard"
import type { SupplierTopSku } from "../../components/workshop-scenes/supplier-dashboard"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Supplier dashboard | UI Primitives — Workshop Scenes",
}

const topSkus: ReadonlyArray<SupplierTopSku> = [
  {
    sku: "MAN-MK24-405",
    title: "Manta 3in stainless cat-back",
    unitsLast30: 18,
    unitCost: 1289.0,
    marginPct: 32,
  },
  {
    sku: "MAN-MX5-NB",
    title: "Manta single-out 2.25in MX-5",
    unitsLast30: 6,
    unitCost: 745.0,
    marginPct: 28,
  },
  {
    sku: "MAN-VE-405",
    title: "Manta VE Commodore SS cat-back",
    unitsLast30: 11,
    unitCost: 1185.0,
    marginPct: 30,
  },
  {
    sku: "MAN-LC79",
    title: "Manta 4-into-1 79-series headers",
    unitsLast30: 4,
    unitCost: 1925.0,
    marginPct: 34,
  },
  {
    sku: "MAN-PX3",
    title: "Manta Ranger PX3 mid-muffler",
    unitsLast30: 9,
    unitCost: 489.5,
    marginPct: 36,
  },
  {
    sku: "MAN-N80-DPF",
    title: "Manta Hilux N80 DPF-back",
    unitsLast30: 14,
    unitCost: 1095.0,
    marginPct: 31,
  },
]

export default function SupplierDashboardScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.06 / Workshop scenes"
        title="Supplier dashboard"
        description="Health summary for a single supplier — contact, last call, outstanding POs, monthly spend, top-moving SKUs, and the readiness/health chart pair."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Supplier dashboard" },
        ]}
      />
      <section className={styles.canvas}>
        <SupplierDashboard
          supplierName="Manta Performance"
          supplierTagline="Stainless mandrel-bent exhaust · QLD"
          contact={{
            contactName: "Owen Brackenridge",
            phone: "07 3279 5512",
            email: "owen@mantaperformance.com.au",
            address: "Slacks Creek QLD 4127",
          }}
          lastContact={{
            whenLabel: "Yesterday · 14:38",
            detail:
              "Phone — Owen following up the XForce back-order ETA on the PX3 mid-mufflers. Promised dispatch Friday.",
          }}
          outstandingPoCount={3}
          outstandingPoValue={9748}
          monthlySpend={42810}
          topSkus={topSkus}
          mediaReadiness={[62, 68, 71, 74, 70, 76, 78, 81, 85, 84, 88, 92]}
          health={[
            { label: "On-time", value: 64, tone: "green" },
            { label: "Late", value: 22, tone: "amber" },
            { label: "Back-order", value: 14, tone: "red" },
          ]}
          healthLabel="Steady"
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Sparkline tracks the weekly media-readiness score — how often Manta
            sends fitment photos and ADR PDFs at the time of dispatch. The
            donut tells us the late-delivery share is amber-tier — actionable
            but not yet a relationship risk.
          </p>
        </div>
      </section>
    </main>
  )
}
