import type { Metadata } from "next"

import { AreaChart } from "../../components/charts/area-chart"
import { BarChart } from "../../components/charts/bar-chart"
import { DonutChart } from "../../components/charts/donut-chart"
import { Sparkline } from "../../components/charts/sparkline"
import { DashboardShell } from "../../components/dashboards/dashboard-shell"
import { DashboardTile } from "../../components/dashboards/dashboard-tile"
import { ActivityFeed } from "../../components/data-display/activity-feed"
import { DashboardCard } from "../../components/data-display/dashboard-card"
import { MetricBlock } from "../../components/data-display/metric-block"
import { PageHeader } from "../../components/page-header"

import { ChannelRows, GreetingBand } from "./_components"
import { TodayJobsTable } from "./_today-jobs-table"
import {
  BOOKING_TREND,
  BOOKING_WEEKS,
  CHANNELS,
  LEAD_MIX,
  OWNER_KPIS,
  REVENUE_BARS,
  REVENUE_DAYS,
  TODAY_JOBS,
  TORQUE_ACTIVITY,
} from "./_demo-data"
import styles from "./owner-dashboard.module.css"

export const metadata: Metadata = {
  title: "Owner business command centre | Torque",
  description:
    "The Oak Flats Muffler Men owner cockpit — today's jobs, revenue, bookings, and social/SEO health, with Torque's recent activity. Composed entirely from UI primitives.",
}

export default function OwnerDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Owner command centre"
        title="Owner business command centre"
        description="One screen the owner steers the workshop by — today's jobs and revenue, the week's bookings and lead mix, social and SEO health, and everything Torque has handled on your behalf. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Owner command centre" },
        ]}
      />

      <GreetingBand />

      {/* KPI tiles + sparklines */}
      <DashboardShell
        kicker="Today at a glance"
        title="The numbers I'm watching"
        subtitle="Revenue, jobs, bookings and reputation — updated as invoices settle and reviews land."
        ariaLabel="Owner key performance indicators"
        columns={4}
        density="comfortable"
      >
        {OWNER_KPIS.map((kpi) => (
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

      {/* Dashboards: jobs board, revenue, booking trend, lead mix, channels */}
      <DashboardShell
        kicker="Workshop & marketing"
        title="Today's board and where the work comes from"
        ariaLabel="Workshop operations and marketing dashboards"
        columns={4}
        density="comfortable"
      >
        <DashboardTile label="Today's jobs" aside="6 booked" span={4} tone="red">
          <TodayJobsTable rows={TODAY_JOBS} />
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

        <DashboardTile label="Booking sources" aside="8-week trend" span={2} tone="amber">
          <div className={styles.chartFrame}>
            <AreaChart
              series={[...BOOKING_TREND]}
              xLabels={[...BOOKING_WEEKS]}
              height={220}
              ariaLabel="Weekly bookings by source over the last 8 weeks"
            />
            <p className={styles.tileNote}>
              Mufflerpulse social is the fastest-growing source — worth keeping the queue full.
            </p>
          </div>
        </DashboardTile>

        <DashboardTile label="Lead mix" aside="This week" span={2} tone="teal">
          <div className={styles.chartFrame}>
            <DonutChart
              segments={[...LEAD_MIX]}
              centerLabel="38"
              centerCaption="bookings"
              ariaLabel="Where this week's bookings came from"
              size={200}
            />
            <p className={styles.tileNote}>
              Search and repeat business still carry the week — social is climbing on the build
              reels.
            </p>
          </div>
        </DashboardTile>

        <DashboardTile label="Social & SEO health" aside="Live" span={2} tone="red">
          <ChannelRows channels={CHANNELS} />
        </DashboardTile>
      </DashboardShell>

      {/* Recent Torque activity feed */}
      <div className={styles.split}>
        <section className={styles.feedFrame} aria-labelledby="torque-activity-title">
          <header className={styles.feedHead}>
            <span>
              <span className={styles.feedKicker}>Done for you</span>
              <h2 id="torque-activity-title" className={styles.feedTitle}>
                Recent Torque activity
              </h2>
            </span>
            <span className={styles.feedBadge}>Live</span>
          </header>
          <ActivityFeed
            items={[...TORQUE_ACTIVITY]}
            ariaLabel="Recent actions Torque has taken for the workshop"
          />
        </section>

        <DashboardShell
          kicker="Reputation"
          title="What customers are saying"
          ariaLabel="Reputation and reach metrics"
          columns={1}
          density="comfortable"
        >
          <DashboardTile label="Google reviews" aside="30 days" span={1} tone="amber">
            <MetricBlock
              metrics={[
                {
                  id: "rating",
                  label: "Rating",
                  value: "4.9",
                  unit: "/ 5",
                  delta: { label: "+8 new", direction: "up" },
                },
                {
                  id: "responses",
                  label: "Replied by Torque",
                  value: "100%",
                  delta: { label: "Within 1 hr", direction: "up" },
                },
              ]}
            />
          </DashboardTile>
          <DashboardTile label="Social reach" aside="7 days" span={1} tone="teal">
            <MetricBlock
              metrics={[
                {
                  id: "reach",
                  label: "Reach",
                  value: "18.4k",
                  delta: { label: "9% vs last wk", direction: "up" },
                },
                {
                  id: "saves",
                  label: "Saves",
                  value: "642",
                  delta: { label: "Raptor reel", direction: "up" },
                },
              ]}
            />
          </DashboardTile>
        </DashboardShell>
      </div>
    </main>
  )
}
