import type { Metadata } from "next"

import { BookingWizard } from "../../components/customer-portal"
import { PageHeader } from "../../components/page-header"

import {
  BOOKING_SERVICES,
  BOOKING_SLOTS,
  MICK_GARAGE,
} from "../_mock-data"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Booking wizard | Customer portal",
  description:
    "Primitive 01 — four-step booking wizard with service picker, vehicle picker, slot picker and confirm summary — three states.",
}

export default function BookingWizardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Booking wizard"
        title="Four-step booking wizard"
        description="Service → vehicle → date → confirm. Three states: blank (kicking off), mid-flow (Hilux cat-back pre-selected at the date step), and the confirm-step summary right before Mick locks it in."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Booking wizard" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <BookingWizard
            services={BOOKING_SERVICES}
            vehicles={MICK_GARAGE}
            timeSlots={BOOKING_SLOTS}
          />
          <BookingWizard
            services={BOOKING_SERVICES}
            vehicles={MICK_GARAGE}
            timeSlots={BOOKING_SLOTS}
            initialStep="date"
            initialServiceId="svc-exhaust-upgrade"
            initialVehicleId="v-hilux"
          />
          <BookingWizard
            services={BOOKING_SERVICES}
            vehicles={MICK_GARAGE}
            timeSlots={BOOKING_SLOTS}
            initialStep="confirm"
            initialServiceId="svc-exhaust-upgrade"
            initialVehicleId="v-hilux"
            initialSlotId="slot-1"
          />
        </div>
      </section>
    </main>
  )
}
