import type { Metadata } from "next"

import { ActivityFeed } from "../../components/data-display/activity-feed"
import { MediaTray } from "../../components/data-display/media-tray"
import { PageHeader } from "../../components/page-header"
import { Customer360Card } from "../../components/workshop-ops/customer-360-card"
import { MechanicShiftTimeline } from "../../components/workshop-ops/mechanic-shift-timeline"
import { PartsPullList } from "../../components/workshop-ops/parts-pull-list"
import { PaymentCollectionCard } from "../../components/workshop-ops/payment-collection-card"
import { QuoteBuilderRow } from "../../components/workshop-ops/quote-builder-row"
import { ServiceTicketCard } from "../../components/workshop-ops/service-ticket-card"
import { VehicleHealthTile } from "../../components/workshop-ops/vehicle-health-tile"
import { VehicleInspectionChecklist } from "../../components/workshop-ops/vehicle-inspection-checklist"

import { ApprovalGate, CommandBand, TimeEntriesTable } from "./_components"
import {
  CREW,
  CUSTOMER,
  CUSTOMER_SPEND_TREND,
  DAY_LABEL,
  DVI_SECTIONS,
  INSPECTED_AT,
  INSPECTOR_NAME,
  INVOICE_NUMBER,
  JOB_MEDIA,
  JOB_TICKET,
  PARTS_PULL,
  PAYMENT,
  QUOTE_NUMBER,
  QUOTE_ROWS,
  SHIFT_BLOCKS,
  SHIFT_HOUR_TICKS,
  STATUS_TIMELINE,
  VEHICLE_HEALTH,
  mechanicById,
} from "./_demo-data"
import styles from "./job-detail.module.css"

export const metadata: Metadata = {
  title: "Workshop job detail | Torque",
  description:
    "A single Oak Flats Muffler Men work order, end to end — the Ranger PX3 3″ turbo-back build on Bay 4. Vehicle and customer header, service line items and parts, technician allocation and time entries, the DVI inspection, the status timeline, the quote→invoice money and a high-value approval gate. Composed entirely from registered UI primitives.",
}

export default function WorkshopJobDetailPage() {
  const ticketMechanic = mechanicById(JOB_TICKET.mechanicId)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Workshop · Job detail"
        title="Workshop job detail"
        description="One work order, top to bottom — the Ranger PX3 3″ turbo-back build on Bay 4. Vehicle and customer header, service line items and parts, technician allocation and time entries, the DVI inspection, the live status timeline, the quote→invoice money and a high-value approval gate. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Workshop", href: "/ui-primitives/torque/workshop-ops" },
          { label: JOB_TICKET.number },
        ]}
      />

      <CommandBand />

      {/* Header band: the work order + customer 360 + vehicle health. */}
      <section className={styles.headerGrid} aria-label="Vehicle, customer and vehicle health">
        <div className={styles.headerTicket}>
          <ServiceTicketCard ticket={JOB_TICKET} mechanic={ticketMechanic} />
        </div>
        <div className={styles.headerCustomer}>
          <Customer360Card customer={CUSTOMER} monthlySpendTrend={CUSTOMER_SPEND_TREND} />
        </div>
        <div className={styles.headerHealth}>
          <VehicleHealthTile health={VEHICLE_HEALTH} />
        </div>
      </section>

      {/* Service line items + parts pricing → the money. */}
      <section className={styles.region} aria-labelledby="job-quote-title">
        <header className={styles.regionHead}>
          <span className={styles.regionKicker}>Service items &amp; parts</span>
          <h2 id="job-quote-title" className={styles.regionTitle}>
            What we&apos;re charging for
          </h2>
          <p className={styles.regionSub}>
            The quote Sam approved ({QUOTE_NUMBER}), line by line — fabrication, the hi-flow cat,
            tips and labour. On completion Torque rolls this straight into invoice {INVOICE_NUMBER}.
          </p>
        </header>
        <div className={styles.quoteSplit}>
          <div className={styles.quoteFrame}>
            <QuoteBuilderRow
              rows={[...QUOTE_ROWS]}
              invoiceNumber={QUOTE_NUMBER}
              customerLabel="Ford Ranger PX3 · 3″ turbo-back"
            />
          </div>
          <div className={styles.partsFrame}>
            <PartsPullList
              jobLabel="Ranger PX3 turbo-back"
              bayLabel="Bay 4 · Hoist"
              parts={[...PARTS_PULL]}
            />
          </div>
        </div>
      </section>

      {/* Technician allocation + logged time entries. */}
      <section className={styles.region} aria-labelledby="job-crew-title">
        <header className={styles.regionHead}>
          <span className={styles.regionKicker}>Crew &amp; time</span>
          <h2 id="job-crew-title" className={styles.regionTitle}>
            Who&apos;s on it and the hours booked
          </h2>
          <p className={styles.regionSub}>
            Rhys is leading the fab with Jordy assisting, and Deano takes it onto the dyno at 3pm.
            Every block is logged against the job so the labour on the invoice matches the bench.
          </p>
        </header>
        <div className={styles.crewSplit}>
          <div className={styles.crewFrame}>
            <MechanicShiftTimeline
              mechanics={[...CREW]}
              blocks={[...SHIFT_BLOCKS]}
              hourTicks={[...SHIFT_HOUR_TICKS]}
              dayLabel={`${DAY_LABEL} · ${JOB_TICKET.number}`}
            />
          </div>
          <div className={styles.timeFrame}>
            <TimeEntriesTable />
          </div>
        </div>
      </section>

      {/* DVI inspection + status timeline. */}
      <section className={styles.region} aria-labelledby="job-dvi-title">
        <header className={styles.regionHead}>
          <span className={styles.regionKicker}>Inspection &amp; history</span>
          <h2 id="job-dvi-title" className={styles.regionTitle}>
            The DVI and how the job got here
          </h2>
          <p className={styles.regionSub}>
            The digital vehicle inspection from drop-off, plus the running timeline of everything
            Torque and the crew have done on this work order.
          </p>
        </header>
        <div className={styles.dviSplit}>
          <div className={styles.dviFrame}>
            <VehicleInspectionChecklist
              vehicleLabel={VEHICLE_HEALTH.vehicleLabel}
              rego={JOB_TICKET.rego}
              inspectorName={INSPECTOR_NAME}
              inspectedAt={INSPECTED_AT}
              sections={[...DVI_SECTIONS]}
            />
          </div>
          <aside className={styles.timelineFrame} aria-labelledby="job-timeline-title">
            <header className={styles.timelineHead}>
              <span className={styles.regionKicker}>Status timeline</span>
              <h3 id="job-timeline-title" className={styles.timelineTitle}>
                Job activity
              </h3>
              <span className={styles.timelineBadge}>Live</span>
            </header>
            <ActivityFeed
              items={[...STATUS_TIMELINE]}
              ariaLabel={`Status timeline for work order ${JOB_TICKET.number}`}
            />
          </aside>
        </div>
      </section>

      {/* High-value approval gate. */}
      <ApprovalGate />

      {/* Quote → invoice actions: take the money. */}
      <section className={styles.region} aria-labelledby="job-pay-title">
        <header className={styles.regionHead}>
          <span className={styles.regionKicker}>Quote → invoice</span>
          <h2 id="job-pay-title" className={styles.regionTitle}>
            Take the balance on handover
          </h2>
          <p className={styles.regionSub}>
            The deposit is pre-authorised on Tyro. Capture the balance at the counter or send a
            receipt — Torque settles the invoice and files the job the moment it clears.
          </p>
        </header>
        <div className={styles.payFrame}>
          <PaymentCollectionCard payment={PAYMENT} />
        </div>
      </section>

      {/* Job photos — brand media gallery. */}
      <section className={styles.region} aria-labelledby="job-media-title">
        <header className={styles.regionHead}>
          <span className={styles.regionKicker}>On the hoist</span>
          <h2 id="job-media-title" className={styles.regionTitle}>
            Job photos for the customer gallery
          </h2>
        </header>
        <MediaTray
          kicker="Bay 4 · today"
          title="Ranger PX3 turbo-back build"
          items={[...JOB_MEDIA]}
          ariaLabel="Photos from the Ranger PX3 turbo-back build at Oak Flats Muffler Men"
        />
      </section>
    </main>
  )
}
