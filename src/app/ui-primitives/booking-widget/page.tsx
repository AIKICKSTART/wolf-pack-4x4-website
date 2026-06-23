import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"
import styles from "./booking-widget.module.css"

export const metadata: Metadata = {
  title: "Booking widget | UI Primitives",
}

interface PrimitiveEntry {
  index: string
  title: string
  href: string
  description: string
}

const primitives: ReadonlyArray<PrimitiveEntry> = [
  {
    index: "01",
    title: "Service picker card",
    href: "/ui-primitives/booking-widget/service-picker-card",
    description:
      "Single-service tile with duration, price, and capacity chips. Brand rail tints with the chosen service tone.",
  },
  {
    index: "02",
    title: "Booking date selector",
    href: "/ui-primitives/booking-widget/booking-date-selector",
    description:
      "Horizontal scroll strip of bookable dates with per-day available-slot count and end-arrow chevrons.",
  },
  {
    index: "03",
    title: "Time slot grid",
    href: "/ui-primitives/booking-widget/time-slot-grid",
    description:
      "AM / PM banded grid with availability tone — Available / Few left / Full / Closed — and a 12h/24h toggle.",
  },
  {
    index: "04",
    title: "Duration picker",
    href: "/ui-primitives/booking-widget/duration-picker",
    description:
      "30 / 45 / 60 / 90 / 120 minute chips with per-duration AUD price.",
  },
  {
    index: "05",
    title: "Add-on chip row",
    href: "/ui-primitives/booking-widget/addon-chip-row",
    description:
      "Optional extras like pre-inspection, loaner car, sound demo, or detail with running total chip.",
  },
  {
    index: "06",
    title: "Customer details form",
    href: "/ui-primitives/booking-widget/customer-details-form",
    description:
      "Name, mobile, email, vehicle (rego or make + model), notes. Single embedded mini-form.",
  },
  {
    index: "07",
    title: "Booking confirmation card",
    href: "/ui-primitives/booking-widget/booking-confirmation-card",
    description:
      "Final card with reference, service, date+time, bay, customer, add-to-calendar buttons, and QR.",
  },
  {
    index: "08",
    title: "Booking embed snippet",
    href: "/ui-primitives/booking-widget/booking-embed-snippet",
    description:
      "iframe / popup / inline tabbed code generator with a customize-styling toggle.",
  },
  {
    index: "09",
    title: "Time zone selector",
    href: "/ui-primitives/booking-widget/time-zone-selector",
    description:
      "Searchable zone list with the current time zone chip and an auto-detect link.",
  },
  {
    index: "10",
    title: "Recurring booking option",
    href: "/ui-primitives/booking-widget/recurring-booking-option",
    description:
      "Weekly / fortnightly / monthly / custom frequency, occurrences stepper, end-date picker.",
  },
  {
    index: "11",
    title: "Group booking party size",
    href: "/ui-primitives/booking-widget/group-booking-party-size",
    description:
      "Party size stepper with per-person price, total, and a group-discount chip when threshold met.",
  },
  {
    index: "12",
    title: "Reschedule modal",
    href: "/ui-primitives/booking-widget/reschedule-modal",
    description:
      "Modal with original date+time recap, new date selector, new time slot grid, and reason chips.",
  },
  {
    index: "13",
    title: "Cancellation flow",
    href: "/ui-primitives/booking-widget/cancellation-flow",
    description:
      "Three-step flow: reason → policy summary → confirm. Refund window chip drives the tone.",
  },
  {
    index: "14",
    title: "No-show policy card",
    href: "/ui-primitives/booking-widget/no-show-policy-card",
    description:
      "Numbered policy rules, cancellation deadline chip, reschedule allowance chip, and contact CTA.",
  },
]

export default function BookingWidgetIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22 / Booking widget"
        title="Embedded booking widget primitives"
        description="Calendly-style booking widget customers drop into a marketing site. Each surface is a focused, embeddable primitive — distinct from the workshop-internal booking forms and bay schedule."
      />
      <FormPatternReferences
        ids={["booking", "calendar-scheduling", "vehicle-intake", "contact"]}
      />
      <section className={styles.section} aria-label="Booking widget primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 14 primitives + 1 composition</span>
          <h2 className={styles.sectionTitle}>Pick a surface</h2>
          <p className={styles.subhead}>
            Each primitive renders full scale in its own sub-route with realistic
            Oak Flats services, AUD prices, bay 1/2/3 availability, and
            Sydney-time slot windows.
          </p>
        </header>
        <div className={styles.grid}>
          {primitives.map((primitive) => (
            <Link key={primitive.href} className={styles.thumb} href={primitive.href}>
              <span className={styles.thumbIndex}>{primitive.index}</span>
              <h3 className={styles.thumbTitle}>{primitive.title}</h3>
              <p className={styles.thumbCopy}>{primitive.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
          <Link
            key="full-booking-flow"
            className={`${styles.thumb} ${styles.bonus}`}
            href="/ui-primitives/booking-widget/full-booking-flow"
          >
            <span className={styles.thumbHero}>FULL</span>
            <h3 className={styles.thumbTitle}>Full booking flow</h3>
            <p className={styles.thumbCopy}>
              Bonus composition stitching every primitive into a single five-step
              booking journey with the no-show policy as the footer.
            </p>
            <span className={styles.thumbFoot}>
              Review full composition <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
