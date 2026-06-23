import type { Metadata } from "next"

import { FadeIn } from "../../components/motion"
import { PageHeader } from "../../components/page-header"
import {
  BayScheduler,
  Customer360Card,
  DynoRunCard,
  LoyaltyStampCard,
  MechanicShiftTimeline,
  PartsPullList,
  PaymentCollectionCard,
  QuoteBuilderRow,
  RecallNoticeRow,
  RoadworthyCertCard,
  ServiceTicketCard,
  SmsConversationThread,
  VehicleHealthTile,
  VehicleInspectionChecklist,
} from "../../components/workshop-ops"

import {
  BAY_BOOKINGS,
  BAY_HOURS,
  BAY_STATES,
  CERT_PINK,
  CUSTOMER_MICK,
  DYNO_HILUX,
  HEALTH_HILUX,
  INSPECTION_SECTIONS,
  LOYALTY_MICK,
  MECHANICS,
  PARTS_PULL,
  PAYMENT_MICK,
  QUOTE_ROWS,
  RECALL_TOYOTA,
  SHIFT_BLOCKS,
  SHIFT_HOURS,
  SMS_MESSAGES,
  SMS_TEMPLATES,
  TICKET_FALCON,
  mechanicById,
} from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Full workshop | Workshop ops",
  description:
    "Composition — the Oak Flats Mufflermen live workshop floor cockpit, assembled from the 14 workshop-ops primitives. Service tickets, bay schedule, mechanic shifts, parts pulls, customer 360, SMS, quote, inspection, dyno, payment, roadworthy, recall, loyalty, and vehicle health.",
}

export default function FullWorkshopScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Live workshop floor cockpit"
        title="Mufflermen live workshop cockpit"
        description="The composed live cockpit Daniel and Tim drive from the front-counter screen — bay schedule across the top, the in-flight job in the middle, customer 360 + SMS + payment along the right, and ops surfaces (parts, quote, dyno, cert, recall, loyalty, health) below. All 14 workshop-ops primitives composed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Full workshop" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composition · 14 primitives</span>

        <FadeIn>
          <div className={styles.cockpit}>
            <header className={styles.cockpitHeader}>
              <MechanicShiftTimeline
                mechanics={MECHANICS}
                blocks={SHIFT_BLOCKS}
                hourTicks={SHIFT_HOURS}
                dayLabel="Tuesday 26 May · crew on deck"
              />
            </header>

            <div className={styles.cockpitScheduler}>
              <BayScheduler
                dayLabel="Tuesday 26 May · bay roster"
                hourTicks={BAY_HOURS}
                bookings={BAY_BOOKINGS}
                bayStates={BAY_STATES}
                mechanics={MECHANICS}
              />
            </div>

            <aside className={styles.cockpitRail}>
              <ServiceTicketCard
                ticket={TICKET_FALCON}
                mechanic={mechanicById(TICKET_FALCON.mechanicId)}
              />
              <PartsPullList
                jobLabel="WO-2847 · Hilux N80 pull"
                bayLabel="Bay 3"
                parts={PARTS_PULL}
                variant="compact"
              />
              <VehicleHealthTile health={HEALTH_HILUX} />
            </aside>

            <div className={styles.cockpitCanvas}>
              <VehicleInspectionChecklist
                vehicleLabel="2019 Hilux N80 SR5 · WO-2847"
                rego="BX1-8RT"
                inspectorName="Brad McKenzie"
                inspectedAt="Tue 26 May · 10:14"
                sections={INSPECTION_SECTIONS}
              />
              <DynoRunCard run={DYNO_HILUX} />
              <QuoteBuilderRow
                rows={QUOTE_ROWS}
                invoiceNumber="QTE-2847 · DRAFT"
                customerLabel="Mick Davis · Hilux N80 SR5"
              />
              <RecallNoticeRow recall={RECALL_TOYOTA} />
            </div>

            <aside className={styles.cockpitAside}>
              <Customer360Card
                customer={CUSTOMER_MICK}
                monthlySpendTrend={[180, 220, 0, 410, 0, 0, 280, 0, 0, 1240, 320, 1842]}
              />
              <SmsConversationThread
                contactName="Mick Davis"
                contactPhone="0412 884 920"
                vehicleLabel="Hilux N80 SR5"
                rego="BX1-8RT"
                messages={SMS_MESSAGES}
                templates={SMS_TEMPLATES}
              />
              <PaymentCollectionCard payment={PAYMENT_MICK} />
              <RoadworthyCertCard cert={CERT_PINK} />
              <LoyaltyStampCard card={LOYALTY_MICK} />
            </aside>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
