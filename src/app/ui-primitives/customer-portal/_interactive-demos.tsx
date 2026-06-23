"use client"

import { FadeIn } from "../components/motion"
import {
  AccountSummaryTile,
  AddressBookRow,
  AppointmentCard,
  BookingWizard,
  ChatWithWorkshop,
  DocDownloadRow,
  FeedbackPrompt,
  InvoicePayCard,
  LoyaltyCard,
  NotificationPrefPanel,
  QuoteViewer,
  ReferralShareCard,
  ServiceHistoryTimeline,
  VehicleGarageGrid,
} from "../components/customer-portal"

import {
  ADDRESSES_MICK,
  APPT_LOCKED,
  APPT_PENDING,
  APPT_UPCOMING,
  BOOKING_SERVICES,
  BOOKING_SLOTS,
  CHAT_MESSAGES,
  CUSTOMER_MICK,
  DOC_DYNO,
  DOC_MANUAL,
  DOC_RECEIPT,
  DOC_ROADWORTHY,
  DOC_WARRANTY,
  FEEDBACK_MICK,
  FULL_GARAGE,
  HISTORY_HILUX,
  INVOICE_HILUX_OUTSTANDING,
  LOYALTY_MICK,
  MICK_GARAGE,
  NOTIFICATION_TOPICS,
  QUOTE_HILUX,
  REFERRAL_MICK,
} from "./_mock-data"
import styles from "./customer-portal.module.css"

const noop = () => undefined

export function AddressBookRowsDemo() {
  return (
    <div className={styles.demoStack}>
      {ADDRESSES_MICK.map((address) => (
        <AddressBookRow
          key={address.id}
          address={address}
          onEdit={noop}
          onSetDefault={address.isDefault ? undefined : noop}
          onRemove={address.isDefault ? undefined : noop}
        />
      ))}
    </div>
  )
}

export function AppointmentCardsDemo() {
  return (
    <div className={styles.demoStack}>
      <AppointmentCard
        appointment={APPT_UPCOMING}
        onReschedule={noop}
        onCancel={noop}
      />
      <AppointmentCard
        appointment={APPT_PENDING}
        onReschedule={noop}
        onCancel={noop}
      />
      <AppointmentCard appointment={APPT_LOCKED} />
    </div>
  )
}

export function DocDownloadRowsDemo() {
  return (
    <div className={styles.demoStack}>
      <div className={styles.demoStack}>
        <DocDownloadRow doc={DOC_RECEIPT} onDownload={noop} />
        <DocDownloadRow doc={DOC_DYNO} onDownload={noop} />
      </div>
      <div className={styles.demoStack}>
        <DocDownloadRow doc={DOC_ROADWORTHY} />
        <DocDownloadRow doc={DOC_WARRANTY} />
      </div>
      <DocDownloadRow doc={DOC_MANUAL} onDownload={noop} />
    </div>
  )
}

export function VehicleGarageGridDemo() {
  return (
    <div className={styles.demoStack}>
      <VehicleGarageGrid vehicles={MICK_GARAGE} />
      <VehicleGarageGrid
        vehicles={FULL_GARAGE}
        selectedVehicleId="v-hilux"
        onSelectVehicle={noop}
      />
      <VehicleGarageGrid vehicles={[]} />
    </div>
  )
}

export function FullPortalDemo() {
  return (
    <FadeIn>
      <div className={styles.portal}>
        <header className={styles.portalHeader}>
          <AccountSummaryTile customer={CUSTOMER_MICK} />
        </header>

        <div className={styles.portalMain}>
          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>Garage</span>
            <VehicleGarageGrid
              vehicles={MICK_GARAGE}
              selectedVehicleId="v-hilux"
              onSelectVehicle={noop}
            />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>
              Upcoming appointment
            </span>
            <AppointmentCard
              appointment={APPT_UPCOMING}
              onReschedule={noop}
              onCancel={noop}
            />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>
              Quote awaiting your call
            </span>
            <QuoteViewer quote={QUOTE_HILUX} />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>
              Book another service
            </span>
            <BookingWizard
              services={BOOKING_SERVICES}
              vehicles={MICK_GARAGE}
              timeSlots={BOOKING_SLOTS}
              initialStep="vehicle"
              initialServiceId="svc-major-service"
            />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>
              Service history - Hilux
            </span>
            <ServiceHistoryTimeline
              vehicleLabel="2021 Hilux N80 SR5"
              entries={HISTORY_HILUX}
            />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>Documents</span>
            <div className={styles.demoStack}>
              <DocDownloadRow doc={DOC_RECEIPT} onDownload={noop} />
              <DocDownloadRow doc={DOC_DYNO} onDownload={noop} />
              <DocDownloadRow doc={DOC_ROADWORTHY} onDownload={noop} />
              <DocDownloadRow doc={DOC_WARRANTY} onDownload={noop} />
            </div>
          </section>
        </div>

        <aside className={styles.portalAside}>
          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>Loyalty</span>
            <LoyaltyCard loyalty={LOYALTY_MICK} />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>
              Outstanding invoice
            </span>
            <InvoicePayCard invoice={INVOICE_HILUX_OUTSTANDING} />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>Workshop chat</span>
            <ChatWithWorkshop
              customerName="Mick Davis"
              vehicleLabel="2021 Hilux N80 SR5"
              rego="KFK-23M"
              messages={CHAT_MESSAGES}
              hermesAssisting
            />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>Refer-a-mate</span>
            <ReferralShareCard program={REFERRAL_MICK} />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>
              Rate the last service
            </span>
            <FeedbackPrompt context={FEEDBACK_MICK} />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>Addresses</span>
            <AddressBookRowsDemo />
          </section>

          <section className={styles.portalSection}>
            <span className={styles.portalSectionLabel}>
              Notification preferences
            </span>
            <NotificationPrefPanel topics={NOTIFICATION_TOPICS} />
          </section>
        </aside>
      </div>
    </FadeIn>
  )
}
