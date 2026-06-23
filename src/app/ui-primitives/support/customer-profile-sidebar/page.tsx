import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CustomerProfileSidebar } from "../../components/support"

import { MICK_NOTES, MICK_PRIOR_TICKETS, MICK_VEHICLES } from "../_mock-data"
import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Customer profile sidebar | Support",
  description:
    "Primitive 11 — right sidebar with customer profile, lifetime value, vehicles, prior tickets and notes.",
}

export default function CustomerProfileSidebarScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Sidebar"
        title="Customer profile sidebar"
        description="Right rail that lives next to the conversation thread. Avatar, name, location, contact, lifetime value, vehicles in their fleet, prior tickets and pinned internal notes from the team. Lifetime value renders as AUD using Intl.NumberFormat."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Customer profile sidebar" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Mick Davis</span>
        <div className={styles.demoSplit}>
          <CustomerProfileSidebar
            name="Mick Davis"
            email="mick.davis@example.com.au"
            phone="+61 412 884 902"
            location="Oak Flats, NSW"
            lifetimeValueCents={1_284_500}
            vehicles={MICK_VEHICLES}
            priorTickets={MICK_PRIOR_TICKETS}
            notes={MICK_NOTES}
          />
          <CustomerProfileSidebar
            name="Sarah Pope"
            email="sarah.pope@example.com.au"
            phone="+61 402 119 633"
            location="Wollongong, NSW"
            lifetimeValueCents={342_000}
            vehicles={[
              { description: "2022 Ford Ranger Wildtrak", rego: "BJ87-LL" },
            ]}
            priorTickets={[
              { id: "MM-3811", subject: "Wildtrak — Manta cat-back fit", status: "closed" },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
