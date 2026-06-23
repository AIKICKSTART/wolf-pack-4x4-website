import type { Metadata } from "next"

import { KanbanBoard } from "../../components/data-display/kanban-board"
import { StatusBadge } from "../../components/data-display/status-badge-grid"
import { PageHeader } from "../../components/page-header"
import { NowServingStrip } from "../../components/bay-display/now-serving-strip"
import { NextUpQueue } from "../../components/workshop-floor-live/next-up-queue"
import { LiveRevenuePulse } from "../../components/workshop-floor-live/live-revenue-pulse"
import { ServiceTicketCard } from "../../components/workshop-ops/service-ticket-card"
import { QuoteBuilderRow } from "../../components/workshop-ops/quote-builder-row"
import { MechanicShiftTimeline } from "../../components/workshop-ops/mechanic-shift-timeline"

import { CommandBand, FloorKpiStrip, LiveBayGrid } from "./_components"
import {
  CREW,
  DAY_LABEL,
  FEATURED_QUOTE,
  FEATURED_TICKETS,
  JOBS_COMPLETED,
  NEXT_UP,
  NOW_SERVING,
  PIPELINE_COLUMNS,
  REVENUE_TODAY_AUD,
  REVENUE_TREND,
  REVENUE_YESTERDAY_AUD,
  SHIFT_BLOCKS,
  SHIFT_HOUR_TICKS,
  STATUS_LEGEND,
  mechanicById,
} from "./_demo-data"
import styles from "./workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Workshop operations board | Torque",
  description:
    "The Oak Flats Muffler Men shop-floor command surface — today's jobs by bay, the quote→job pipeline, crew allocation, live bay occupancy and revenue. Composed entirely from registered UI primitives.",
}

export default function WorkshopOpsBoardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Workshop operations"
        title="Workshop operations board"
        description="The shop-floor command surface for Oak Flats Muffler Men — today's jobs by bay, the quote→job pipeline, technician allocation, live bay occupancy and revenue. One screen the workshop runs the day by. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Workshop operations" },
        ]}
      />

      <CommandBand />

      {/* Live occupancy ticker across the top of the floor view. */}
      <section className={styles.occupancy} aria-label="Live bay occupancy">
        <NowServingStrip jobs={[...NOW_SERVING]} speed={26} />
      </section>

      <FloorKpiStrip />

      {/* Live bays + the next-up queue side by side. */}
      <section className={styles.floorSplit} aria-label="Live bays and intake queue">
        <div className={styles.floorMain}>
          <header className={styles.regionHead}>
            <span className={styles.regionKicker}>On the floor · live</span>
            <h2 className={styles.regionTitle}>Bay status</h2>
            <p className={styles.regionSub}>
              Four working bays plus the alignment rack and dyno cell. Each card is live off the job
              ticket — technician, progress and handover ETA update as the work moves.
            </p>
          </header>
          <LiveBayGrid />
        </div>
        <aside className={styles.floorAside}>
          <NextUpQueue entries={[...NEXT_UP]} />
          <div className={styles.revenueFrame}>
            <LiveRevenuePulse
              todayAud={REVENUE_TODAY_AUD}
              jobsCompleted={JOBS_COMPLETED}
              yesterdayAud={REVENUE_YESTERDAY_AUD}
              trend={[...REVENUE_TREND]}
            />
          </div>
        </aside>
      </section>

      {/* Quote → job pipeline kanban + the status legend. */}
      <section className={styles.pipeline} aria-labelledby="ops-pipeline-title">
        <header className={styles.regionHead}>
          <span className={styles.regionKicker}>Quote → job pipeline</span>
          <h2 id="ops-pipeline-title" className={styles.regionTitle}>
            Where every job is up to
          </h2>
          <p className={styles.regionSub}>
            From a quote going out to the keys going back. Drag a card and Torque updates the
            customer, the bay schedule and the invoice for you.
          </p>
          <ul className={styles.legend} aria-label="Job status legend">
            {STATUS_LEGEND.map((badge) => (
              <li key={badge.label} className={styles.legendItem}>
                <StatusBadge tone={badge.tone} size="sm" shape="pill" label={badge.label} />
              </li>
            ))}
          </ul>
        </header>
        <div className={styles.kanbanFrame}>
          <KanbanBoard columns={[...PIPELINE_COLUMNS]} />
        </div>
      </section>

      {/* Active work orders — featured service tickets. */}
      <section className={styles.tickets} aria-labelledby="ops-tickets-title">
        <header className={styles.regionHead}>
          <span className={styles.regionKicker}>Active work orders</span>
          <h2 id="ops-tickets-title" className={styles.regionTitle}>
            What&apos;s on the hoists
          </h2>
        </header>
        <div className={styles.ticketGrid}>
          {FEATURED_TICKETS.map((ticket) => (
            <ServiceTicketCard
              key={ticket.id}
              ticket={ticket}
              mechanic={mechanicById(ticket.mechanicId)}
            />
          ))}
        </div>
      </section>

      {/* Crew allocation timeline + the open quote being built. */}
      <section className={styles.crewSplit} aria-label="Crew allocation and quoting">
        <div className={styles.crewFrame}>
          <MechanicShiftTimeline
            mechanics={[...CREW]}
            blocks={[...SHIFT_BLOCKS]}
            hourTicks={[...SHIFT_HOUR_TICKS]}
            dayLabel={DAY_LABEL}
          />
        </div>
        <div className={styles.quoteFrame}>
          <QuoteBuilderRow
            rows={[...FEATURED_QUOTE]}
            invoiceNumber="QT-4471"
            customerLabel="Holden Colorado RG · 3″ cat-back"
          />
        </div>
      </section>
    </main>
  )
}
