import type { Metadata } from "next"

import { ServiceTicketCard } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"

import {
  TICKET_FALCON,
  TICKET_GT,
  TICKET_RANGER,
  mechanicById,
} from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Service ticket card | Workshop ops",
  description:
    "Primitive 01 — work order card with VIN, customer, vehicle, services checklist, status, mechanic, and ETA — three states.",
}

export default function ServiceTicketCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Service ticket card"
        title="Work order card"
        description="One ticket per job — VIN, rego, customer, vehicle, line items, mechanic, bay, ETA, and total inc. GST. Three states: rush in-progress (Hilux N80), VIP quality-check (Falcon GT XB), and standard ready-for-pickup (Ranger Raptor)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Service ticket card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <ServiceTicketCard
            ticket={TICKET_FALCON}
            mechanic={mechanicById(TICKET_FALCON.mechanicId)}
          />
          <ServiceTicketCard
            ticket={TICKET_GT}
            mechanic={mechanicById(TICKET_GT.mechanicId)}
          />
          <ServiceTicketCard
            ticket={TICKET_RANGER}
            mechanic={mechanicById(TICKET_RANGER.mechanicId)}
          />
        </div>
      </section>
    </main>
  )
}
