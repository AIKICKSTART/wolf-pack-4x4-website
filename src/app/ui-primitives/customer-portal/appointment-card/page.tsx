import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { AppointmentCardsDemo } from "../_interactive-demos"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Appointment card | Customer portal",
  description:
    "Primitive 13 — upcoming appointment card with date, bay, tech, reschedule + cancel — three states.",
}

export default function AppointmentCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Appointment card"
        title="Upcoming appointment card"
        description="Confirmed (Hilux cat-back fit-up next Thursday with Brad), pending (Falcon tyre rotation awaiting Karen's confirm), and reschedule-locked (Raptor pink-slip inside the 24h window)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Appointment card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <AppointmentCardsDemo />
      </section>
    </main>
  )
}
