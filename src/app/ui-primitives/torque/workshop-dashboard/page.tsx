import type { Metadata } from "next"

import { AreaChart } from "../../components/charts/area-chart"
import { BarChart } from "../../components/charts/bar-chart"
import { DonutChart } from "../../components/charts/donut-chart"
import { GaugeCluster } from "../../components/charts/gauge-cluster"
import { Sparkline } from "../../components/charts/sparkline"
import { DashboardShell } from "../../components/dashboards/dashboard-shell"
import { DashboardTile } from "../../components/dashboards/dashboard-tile"
import { ActivityFeed } from "../../components/data-display/activity-feed"
import { DashboardCard } from "../../components/data-display/dashboard-card"
import { MediaTray } from "../../components/data-display/media-tray"
import { MetricBlock } from "../../components/data-display/metric-block"
import { PageHeader } from "../../components/page-header"

import { GreetingBand } from "./_components"
import { RosterTable, TodayJobsTable } from "./_tables"
import {
  BAY_GAUGES,
  MANAGER_KPIS,
  QUOTE_PIPELINE,
  RECENT_BUILDS,
  REVENUE_BARS,
  REVENUE_DAYS,
  ROSTER,
  THROUGHPUT_TREND,
  THROUGHPUT_WEEKS,
  TODAY_JOBS,
  TORQUE_ACTIVITY,
} from "./_demo-data"
import styles from "./workshop-dashboard.module.css"

export const metadata: Metadata = {
  title: "Workshop manager home | Torque",
  description:
    "The Oak Flats Muffler Men workshop manager cockpit — today's jobs across every bay, bay occupancy, revenue and the technician roster, with the quote pipeline snapshot and Torque's recent floor moves. Composed entirely from UI primitives.",
}

export default function WorkshopDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Workshop manager"
        title="Workshop manager home"
        description="One cockpit to run the floor by — today's jobs across every bay, live bay occupancy, the week's revenue and throughput, the technician roster, and the quote pipeline, with everything Torque has handled for you. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Workshop manager home" },
        ]}
      />

      <GreetingBand />

      {/* KPI tiles + sparklines */}
      <DashboardShell
        kicker="The floor right now"
        title="Numbers I'm watching this shift"
        subtitle="Jobs on the board, how full the bays are, revenue booked today and who's on the tools — updated as jobs move and invoices settle."
        ariaLabel="Workshop manager key performance indicators"
        columns={4}
        density="comfortable"
      >
        {MANAGER_KPIS.map((kpi) => (
          <DashboardCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            unit={kpi.unit}
            delta={kpi.delta}
            meta={kpi.meta}
            surface="glass"
            spark={
              <span className={styles.kpiSpark}>
                <Sparkline
                  points={kpi.spark}
                  tone={kpi.sparkTone}
                  width={220}
                  height={44}
                  ariaLabel={`${kpi.label} trend over the last 7 days`}
                />
              </span>
            }
          />
        ))}
      </DashboardShell>

      {/* Jobs board + bay occupancy + revenue + throughput */}
      <DashboardShell
        kicker="Bays & throughput"
        title="What's in the bays and how the week's tracking"
        ariaLabel="Workshop operations dashboards"
        columns={4}
        density="comfortable"
      >
        <DashboardTile label="Today's jobs" aside="7 on the board" span={4} tone="red">
          <TodayJobsTable rows={TODAY_JOBS} />
        </DashboardTile>

        <DashboardTile label="Bay occupancy" aside="Live" span={2} tone="amber">
          <div className={styles.chartFrame}>
            <GaugeCluster
              gauges={[...BAY_GAUGES]}
              kicker="How full the shop is"
              scaleLabels={["Quiet", "Busy", "Slammed"]}
              ariaLabel="Bay, hoist and dyno occupancy as a percentage of capacity"
            />
            <p className={styles.tileNote}>
              Six of seven bays and both hoists are live. One bay free for a walk-in fitment — keep
              the dyno bookings spaced so the afternoon doesn&apos;t bottleneck.
            </p>
          </div>
        </DashboardTile>

        <DashboardTile label="Revenue by day" aside="Last 7 days" span={2} tone="green">
          <div className={styles.chartFrame}>
            <BarChart
              series={[...REVENUE_BARS]}
              xLabels={[...REVENUE_DAYS]}
              mode="stacked"
              height={220}
              unit=""
              ariaLabel="Revenue by day, split between exhaust work and servicing"
            />
            <MetricBlock
              metrics={[
                {
                  id: "week-total",
                  label: "Week to date",
                  value: "$41,180",
                  delta: { label: "14% vs last wk", direction: "up" },
                },
                {
                  id: "avg-ticket",
                  label: "Avg ticket",
                  value: "$1,640",
                  delta: { label: "Steady", direction: "flat" },
                },
              ]}
            />
          </div>
        </DashboardTile>

        <DashboardTile label="Jobs completed" aside="8-week trend" span={2} tone="teal">
          <div className={styles.chartFrame}>
            <AreaChart
              series={[...THROUGHPUT_TREND]}
              xLabels={[...THROUGHPUT_WEEKS]}
              height={220}
              ariaLabel="Weekly jobs completed, split between exhaust work and servicing, over the last 8 weeks"
            />
            <p className={styles.tileNote}>
              Throughput is climbing — exhaust and fabrication is carrying the lift. Worth keeping
              the fab bay crewed and parts stocked ahead of demand.
            </p>
          </div>
        </DashboardTile>

        <DashboardTile label="Quote pipeline" aside="22 open" span={2} tone="amber">
          <div className={styles.chartFrame}>
            <DonutChart
              segments={[...QUOTE_PIPELINE]}
              centerLabel="22"
              centerCaption="open quotes"
              ariaLabel="Open quotes by stage in the pipeline"
              size={200}
            />
            <p className={styles.tileNote}>
              Six accepted quotes are ready to book straight into next week — clear the nine still
              awaiting a reply before they go cold.
            </p>
          </div>
        </DashboardTile>
      </DashboardShell>

      {/* Roster + recent builds */}
      <DashboardShell
        kicker="The crew"
        title="Who's on and what they're across"
        ariaLabel="Technician roster and recent completed builds"
        columns={4}
        density="comfortable"
      >
        <DashboardTile label="Technician roster" aside="5 of 6 on" span={4} tone="teal">
          <RosterTable rows={ROSTER} />
        </DashboardTile>

        <DashboardTile label="Off the hoist" aside="Recent builds" span={4} tone="red">
          <MediaTray
            kicker="Latest work out the door"
            title="Recent completed builds"
            items={RECENT_BUILDS}
            ariaLabel="Recent completed builds at Oak Flats Muffler Men"
          />
        </DashboardTile>
      </DashboardShell>

      {/* Recent Torque floor moves */}
      <section className={styles.feedFrame} aria-labelledby="torque-activity-title">
        <header className={styles.feedHead}>
          <span>
            <span className={styles.feedKicker}>Done for you</span>
            <h2 id="torque-activity-title" className={styles.feedTitle}>
              Torque&apos;s recent floor moves
            </h2>
          </span>
          <span className={styles.feedBadge}>Live</span>
        </header>
        <ActivityFeed
          items={[...TORQUE_ACTIVITY]}
          ariaLabel="Recent actions Torque has taken to keep the workshop floor moving"
        />
      </section>
    </main>
  )
}
