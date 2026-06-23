import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"
import styles from "./roster.module.css"

export const metadata: Metadata = {
  title: "Roster + scheduling | UI Primitives",
}

interface PrimitiveEntry {
  index: string
  title: string
  href: string
  description: string
}

const ENTRIES: ReadonlyArray<PrimitiveEntry> = [
  {
    index: "01",
    title: "Technician profile card",
    href: "/ui-primitives/roster/technician-profile",
    description:
      "Photo, name, role, cert chip row, today's bay tags, and the live shift-status pill — everything floor leads scan in 2 seconds.",
  },
  {
    index: "02",
    title: "Daily schedule strip",
    href: "/ui-primitives/roster/daily-schedule",
    description:
      "Horizontal day strip of a technician — jobs, breaks, training, travel — colour-coded with start and end times.",
  },
  {
    index: "03",
    title: "Shift swap modal",
    href: "/ui-primitives/roster/shift-swap",
    description:
      "Send a swap request: my shift block, candidate picker with avatars, reason chip, and a send-request CTA.",
  },
  {
    index: "04",
    title: "Time off request form",
    href: "/ui-primitives/roster/time-off-request",
    description:
      "Annual, Sick, Long-service, RDO, or Carer's leave with start–end dates, reason text, and a manager-approval CTA.",
  },
  {
    index: "05",
    title: "Clock in/out widget",
    href: "/ui-primitives/roster/clock-in-out",
    description:
      "Big clock-in / clock-out buttons, elapsed shift time readout, and a break-tracker line for the current break.",
  },
  {
    index: "06",
    title: "Skill + cert matrix",
    href: "/ui-primitives/roster/skill-cert-matrix",
    description:
      "Technicians × skills/certifications, each cell a level chip (Novice → Master) with expiry warnings layered in.",
  },
  {
    index: "07",
    title: "Roster calendar overlay",
    href: "/ui-primitives/roster/roster-calendar",
    description:
      "Week calendar with technician-tinted shifts and a per-day coverage indicator above the grid.",
  },
  {
    index: "08",
    title: "Coverage gap warning",
    href: "/ui-primitives/roster/coverage-gap",
    description:
      "Low-staffing window with required-vs-actual chip, plain-language detail and an assign-cover CTA.",
  },
  {
    index: "09",
    title: "Bay assignment grid",
    href: "/ui-primitives/roster/bay-assignment-grid",
    description:
      "Bays (rows) × hours (cols) with assigned-tech chips per cell — Bays 1–4 across the working day.",
  },
  {
    index: "10",
    title: "Lunch break tracker",
    href: "/ui-primitives/roster/lunch-break",
    description:
      "Per-technician break taken / break remaining strip with an extend-break CTA when the floor needs flex.",
  },
  {
    index: "11",
    title: "Overtime tally chip",
    href: "/ui-primitives/roster/overtime-tally",
    description:
      "Hours-this-week + hours-this-month tally with threshold tones — green, amber, then red when caps are breached.",
  },
  {
    index: "12",
    title: "Training session card",
    href: "/ui-primitives/roster/training-session",
    description:
      "Upcoming training session — topic, trainer, date, attendee count, and linked materials.",
  },
  {
    index: "13",
    title: "Performance review row",
    href: "/ui-primitives/roster/performance-review",
    description:
      "Roster row with last-review date, rating chip, and an open-for-review CTA per technician.",
  },
  {
    index: "14",
    title: "Apprentice progression meter",
    href: "/ui-primitives/roster/apprentice-progress",
    description:
      "Radial qualification meter, modules-done chip, and next-module preview — perfect for Jordan Pace Y3 tracking.",
  },
]

export default function RosterIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29 / Roster + scheduling"
        title="Technician roster + shift floor"
        description="Fourteen reusable primitives that frame how Oak Flats schedules its crew — Sophie on weekend Bay 2, Jordan Pace on apprenticeship Y3, Trent running senior diags, Bec covering front desk."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster + scheduling" },
        ]}
      />

      <FormPatternReferences
        ids={["roster-workshop-ops", "calendar-scheduling", "survey-nps"]}
      />

      <section className={styles.section} aria-label="Roster primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 14 primitives</span>
          <h2 className={styles.sectionTitle}>Pick a primitive</h2>
          <p className={styles.subhead}>
            Each primitive ships in its own sub-route at full scale with realistic
            Mufflermen data. There is also a unified Full Console below where the
            entire crew fits inside one workshop-floor dashboard.
          </p>
        </header>
        <div className={styles.grid}>
          {ENTRIES.map((entry) => (
            <Link key={entry.href} className={styles.thumb} href={entry.href}>
              <span className={styles.thumbIndex}>{entry.index}</span>
              <h3 className={styles.thumbTitle}>{entry.title}</h3>
              <p className={styles.thumbBody}>{entry.description}</p>
              <span className={styles.thumbCta}>Open</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-label="Full roster console">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Bonus · Full roster console</span>
          <h2 className={styles.sectionTitle}>Run the whole shift floor</h2>
          <p className={styles.subhead}>
            The full console stitches every primitive into one screen — crew row up
            top, week roster overlay, bay assignment, gap warnings, the time clock,
            break tracker, overtime guard, training, performance reviews, the
            cert matrix, and the apprentice meter for Jordan.
          </p>
        </header>
        <Link className={styles.consoleLink} href="/ui-primitives/roster/full-console">
          Open the full console →
        </Link>
      </section>
    </main>
  )
}
