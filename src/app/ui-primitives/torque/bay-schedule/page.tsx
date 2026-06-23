import type { Metadata } from "next"

import { AvailabilityGrid } from "../../components/calendar/availability-grid"
import { CalendarWeekView } from "../../components/calendar/calendar-week-view"
import { DashboardShell } from "../../components/dashboards/dashboard-shell"
import { DashboardTile } from "../../components/dashboards/dashboard-tile"
import { MediaTray } from "../../components/data-display/media-tray"
import { PageHeader } from "../../components/page-header"
import { NextUpQueue } from "../../components/workshop-floor-live/next-up-queue"
import { WorkshopFloorPlan } from "../../components/workshop-floor-live/workshop-floor-plan"

import {
  BayLane,
  ConflictRail,
  SchedulerBand,
  TechLaneLegend,
  TechnicianLane,
} from "./_components"
import {
  DAY_END_HOUR,
  DAY_START_HOUR,
  FLOOR_BAYS,
  FLOOR_TECHS,
  NEXT_UP,
  RECENT_BUILDS,
  TODAY,
  TODAY_BAYS,
  WEEK_EVENTS,
  WEEK_REFERENCE,
} from "./_demo-data"
import styles from "./bay-schedule.module.css"

export const metadata: Metadata = {
  title: "Bay schedule & calendar | Torque",
  description:
    "The Oak Flats Muffler Men service-bay scheduler — a week calendar of bay reservations across the four bays, drag-feel job blocks per bay, the technician lane, today's hour-by-hour timeline and a live conflict check. Composed entirely from UI primitives.",
}

export default function BaySchedulePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Bay schedule"
        title="Bay schedule & calendar"
        description="One screen to run the four-bay diary by — a week calendar of bay reservations as colour-coded job blocks, drag-feel lanes per bay, who's on the tools and where, today's hour-by-hour bay timeline, and a live conflict check before anything double-books. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Bay schedule & calendar" },
        ]}
      />

      <SchedulerBand />

      <div className={styles.layout}>
        <div className={styles.column}>
          {/* Week calendar of bay reservations */}
          <DashboardShell
            kicker="The week ahead"
            title="Bay reservations across the four bays"
            subtitle="Every booked job sits in the bay it belongs to — drag a block to a free slot and Torque re-slots the technician and texts the customer. Colour reads the work type: red is exhaust & fabrication, amber is systems, teal is servicing, green is the dyno."
            ariaLabel="Week calendar of bay reservations"
            columns={1}
            density="comfortable"
            footer={
              <span className={styles.weekLegend} aria-label="Job block colour legend">
                <span data-tone="red">Exhaust &amp; fabrication</span>
                <span data-tone="amber">Systems &amp; cats</span>
                <span data-tone="teal">Servicing &amp; rego</span>
                <span data-tone="green">Dyno &amp; tuning</span>
                <span data-tone="neutral">Conflict / hold</span>
              </span>
            }
          >
            <div className={styles.weekFrame}>
              <CalendarWeekView
                reference={WEEK_REFERENCE}
                today={TODAY}
                events={WEEK_EVENTS}
                startHour={DAY_START_HOUR}
                endHour={DAY_END_HOUR}
                weekStartsOn={1}
              />
            </div>
          </DashboardShell>

          {/* Per-bay lane: drag-feel job blocks per bay */}
          <DashboardShell
            kicker="In the bays right now"
            title="Live lane per bay"
            subtitle="The four bays as they stand this minute — vehicle, customer, the tech on it and how far through the job is. Drag the next booking onto any lane that frees up."
            ariaLabel="Live status lane for each bay"
            columns={1}
            density="comfortable"
          >
            <BayLane />
          </DashboardShell>

          {/* Today's timeline + 4-bay floor */}
          <DashboardShell
            kicker="Today on the floor"
            title="Hour-by-hour bay timeline & the four-bay floor"
            ariaLabel="Today's bay occupancy timeline and workshop floor plan"
            columns={4}
            density="comfortable"
          >
            <DashboardTile
              label="Today's timeline"
              aside={`${DAY_START_HOUR}am–${DAY_END_HOUR - 12}pm`}
              span={4}
              tone="amber"
            >
              <div className={styles.tileFrame}>
                <AvailabilityGrid
                  bays={TODAY_BAYS}
                  startHour={DAY_START_HOUR}
                  endHour={DAY_END_HOUR}
                />
                <p className={styles.tileNote}>
                  Bay 3 is blocked through the middle of the day on a parts hold and Bay 4 opened
                  late after its morning dyno calibration. Two clear windows on Bay 1 mid-afternoon
                  for a walk-in fitment.
                </p>
              </div>
            </DashboardTile>

            <DashboardTile label="Workshop floor" aside="Live" span={4} tone="red">
              <WorkshopFloorPlan bays={FLOOR_BAYS} technicians={FLOOR_TECHS} />
            </DashboardTile>
          </DashboardShell>

          {/* Recent builds */}
          <section className={styles.mediaFrame} aria-labelledby="bay-schedule-media-title">
            <header className={styles.mediaHead}>
              <span className={styles.mediaKicker}>Off the hoist</span>
              <h2 id="bay-schedule-media-title" className={styles.mediaTitle}>
                Recent completed builds
              </h2>
            </header>
            <MediaTray
              items={RECENT_BUILDS}
              ariaLabel="Recent completed builds at Oak Flats Muffler Men"
            />
          </section>
        </div>

        {/* Side rail: technician lane + waiting list + conflicts */}
        <aside className={styles.rail} aria-label="Technicians, waiting list and conflicts">
          <section className={styles.techFrame} aria-labelledby="bay-schedule-techs-title">
            <header className={styles.techHead}>
              <span className={styles.techKicker}>Who&apos;s on</span>
              <h2 id="bay-schedule-techs-title" className={styles.techTitle}>
                Technician lane
              </h2>
              <span className={styles.techBadge}>5 of 6 on</span>
            </header>
            <TechnicianLane />
            <TechLaneLegend />
          </section>

          <NextUpQueue entries={NEXT_UP} />

          <ConflictRail />
        </aside>
      </div>
    </main>
  )
}
