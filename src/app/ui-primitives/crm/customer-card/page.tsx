import type { Metadata } from "next"

import { CustomerCard } from "../../components/crm"
import { PageHeader } from "../../components/page-header"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Customer card | CRM",
  description:
    "Primitive 01 — full customer profile card with avatar, contact details, suburb, lifetime value, status chip, segment chip, last contact, and action row.",
}

export default function CustomerCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Customer card"
        title="Customer card"
        description="A self-contained customer profile — header with avatar plus status and segment chips, a key/value block of contact facts, then a row of CRM actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Customer card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          <CustomerCard
            id="cust-001"
            name="Mick Davis"
            phone="0414 882 197"
            email="mick.davis@oakflatsfab.com.au"
            suburb="Oak Flats NSW"
            status="vip"
            segment="performance"
            lifetimeValue="$18,420"
            lastContact="Today 09:14"
            lastContactIso="2026-05-28T09:14:00+10:00"
            actions={[
              { label: "Call", variant: "primary" },
              { label: "Email", variant: "ghost" },
              { label: "Quote", variant: "ghost" },
              { label: "Book", variant: "ghost" },
            ]}
          />
          <CustomerCard
            id="cust-002"
            name="Sarah Pope"
            phone="0438 102 554"
            email="sarah@popebuilders.com.au"
            suburb="Albion Park NSW"
            status="active"
            segment="trade"
            lifetimeValue="$6,180"
            lastContact="2 days ago"
            lastContactIso="2026-05-26T11:00:00+10:00"
            actions={[
              { label: "Call", variant: "primary" },
              { label: "Email", variant: "ghost" },
              { label: "Quote", variant: "ghost" },
            ]}
          />
          <CustomerCard
            id="cust-003"
            name="Trent Williams"
            phone="0407 661 099"
            email="trent.williams@gmail.com"
            suburb="Shellharbour NSW"
            status="prospect"
            segment="retail"
            lifetimeValue="$0"
            lastContact="12 days ago"
            lastContactIso="2026-05-16T14:30:00+10:00"
            actions={[
              { label: "Call", variant: "primary" },
              { label: "Email", variant: "ghost" },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
