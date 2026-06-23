import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { AreaChart } from "@/app/ui-primitives/components/charts/area-chart"
import { BarChart } from "@/app/ui-primitives/components/charts/bar-chart"
import { DonutChart } from "@/app/ui-primitives/components/charts/donut-chart"
import { GaugeCluster } from "@/app/ui-primitives/components/charts/gauge-cluster"
import { Sparkline } from "@/app/ui-primitives/components/charts/sparkline"
import { DashboardShell } from "@/app/ui-primitives/components/dashboards/dashboard-shell"
import { DashboardTile } from "@/app/ui-primitives/components/dashboards/dashboard-tile"
import { DrilldownInspector } from "@/app/ui-primitives/components/reports/drilldown-inspector"
import { KpiSnapshotTile } from "@/app/ui-primitives/components/reports/kpi-snapshot-tile"
import { PeriodComparisonStrip } from "@/app/ui-primitives/components/reports/period-comparison-strip"

import { AnalyticsControlBand, SocialMetricRows, TopPagesTable } from "./_components"
import styles from "./analytics.module.css"
import {
  ANALYTICS_KPIS,
  COST_GAUGES,
  COST_TREND,
  PERIOD_COMPARISONS,
  REPORTING_PERIOD,
  REVENUE_DRILLDOWN,
  REVENUE_TREND,
  REVENUE_WEEKS,
  SEO_KEYWORDS,
  SEO_VISIBILITY,
  SOCIAL_METRICS,
  SOCIAL_REACH,
  TOP_PAGES,
} from "./_demo-data"

export const metadata: Metadata = {
  title: "Business analytics | Torque — Oak Flats Muffler Men",
  description:
    "The Oak Flats Muffler Men analytics panel — revenue, local-SEO ranking, social performance and the running cost of Torque, plus the site's top-performing pages. Composed entirely from registered UI primitives.",
}

export default function BusinessAnalyticsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Business analytics"
        title="Business analytics"
        description="The one panel the workshop is steered by — revenue and where it comes from, local-SEO ranking for the keywords that win jobs, social reach across every channel, and what Torque costs to run. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Business analytics" },
        ]}
      />

      <AnalyticsControlBand />

      {/* Headline KPI tiles with trend sparklines */}
      <DashboardShell
        kicker="Headline metrics"
        title="The numbers that move the business"
        subtitle="Revenue, bookings, local search and the assistant's running cost — measured over the reporting period and compared to the one before."
        ariaLabel="Headline business KPIs"
        columns={4}
        density="comfortable"
      >
        {ANALYTICS_KPIS.map((kpi) => (
          <KpiSnapshotTile
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            unit={kpi.unit}
            deltaLabel={kpi.deltaLabel}
            deltaTone={kpi.deltaTone}
            comparisonLabel={kpi.comparisonLabel}
            spark={
              <span className={styles.kpiSpark}>
                <Sparkline
                  points={kpi.spark}
                  tone={kpi.sparkTone}
                  width={220}
                  height={40}
                  ariaLabel={`${kpi.label} trend`}
                />
              </span>
            }
          />
        ))}
      </DashboardShell>

      {/* Revenue + SEO + social + agent-cost charts */}
      <DashboardShell
        kicker="Marketing & revenue"
        title="Where the work comes from"
        subtitle="Revenue by service line over twelve weeks, the search keywords that bring jobs in, social reach by channel, and the running cost of Torque."
        ariaLabel="Marketing, revenue, SEO, social and agent-cost charts"
        columns={4}
        density="comfortable"
      >
        <DashboardTile label="Revenue by service line" aside="12 weeks" span={4} tone="red">
          <div className={styles.chartFrame}>
            <AreaChart
              series={[...REVENUE_TREND]}
              xLabels={[...REVENUE_WEEKS]}
              height={240}
              unit="k"
              ariaLabel="Weekly revenue over twelve weeks, split between exhaust systems, servicing and custom fabrication"
            />
            <p className={styles.tileNote}>
              Exhaust systems still carry the workshop, but custom fabrication is the fastest-growing
              line — the build reels are paying off.
            </p>
          </div>
        </DashboardTile>

        <DashboardTile label="Local search visibility" aside="Map pack · 28d" span={2} tone="teal">
          <div className={styles.chartFrame}>
            <BarChart
              series={[...SEO_VISIBILITY]}
              xLabels={[...SEO_KEYWORDS]}
              mode="grouped"
              height={240}
              valueLabels={false}
              ariaLabel="Local-SEO visibility score and map-pack share for the keywords that win jobs"
            />
            <p className={styles.tileNote}>
              “Oak Flats exhaust” and “Illawarra muffler” are locked at the top — the diesel and 4WD
              terms are the ones worth chasing next.
            </p>
          </div>
        </DashboardTile>

        <DashboardTile label="Social reach by channel" aside="This period" span={2} tone="amber">
          <div className={styles.socialFrame}>
            <DonutChart
              segments={[...SOCIAL_REACH]}
              centerLabel="84.6k"
              centerCaption="reach"
              ariaLabel="Social reach split across Instagram, Facebook, Google posts and TikTok"
              size={196}
            />
            <SocialMetricRows metrics={SOCIAL_METRICS} />
          </div>
        </DashboardTile>

        <DashboardTile label="Torque running cost" aside="28-day budget" span={2} tone="green">
          <div className={styles.chartFrame}>
            <GaugeCluster
              gauges={COST_GAUGES}
              kicker="Assistant economics"
              scaleLabels={["Spend", "Resolved", "Escalated"]}
              ariaLabel="Torque budget used, leads auto-resolved and leads escalated to a human"
            />
            <div className={styles.costFooter}>
              <span className={styles.costSparkLabel}>14-day spend</span>
              <Sparkline
                points={[...COST_TREND]}
                tone="red"
                width={180}
                height={36}
                ariaLabel="Torque daily running cost over the last fourteen days"
              />
              <span className={styles.costFigure}>$41.80 / 28d · $0.13 per handled lead</span>
            </div>
          </div>
        </DashboardTile>

        <DashboardTile label="Revenue breakdown" aside="By service" span={2} tone="red">
          <DrilldownInspector
            parentMetric="Revenue this period"
            parentValue="$162,400"
            dimensionLabel="Service line"
            rows={REVENUE_DRILLDOWN}
            totalDescription={`across ${REPORTING_PERIOD}, 318 jobs invoiced`}
          />
        </DashboardTile>
      </DashboardShell>

      {/* Period-over-period comparison strips */}
      <DashboardShell
        kicker="Period over period"
        title="This period versus the last"
        ariaLabel="Period-over-period comparisons"
        columns={3}
        density="comfortable"
      >
        {PERIOD_COMPARISONS.map((cmp) => (
          <DashboardTile key={cmp.id} label={cmp.metricLabel} span={1} tone="teal">
            <PeriodComparisonStrip
              metricLabel={cmp.metricLabel}
              currentValue={cmp.currentValue}
              currentLabel={cmp.currentLabel}
              priorValue={cmp.priorValue}
              priorLabel={cmp.priorLabel}
              deltaLabel={cmp.deltaLabel}
              deltaTone={cmp.deltaTone}
              spark={
                <Sparkline
                  points={cmp.spark}
                  tone={cmp.sparkTone}
                  width={120}
                  height={36}
                  ariaLabel={`${cmp.metricLabel} trend`}
                />
              }
            />
          </DashboardTile>
        ))}
      </DashboardShell>

      {/* Top-performing pages table */}
      <section className={styles.tableSection} aria-labelledby="top-pages-title">
        <header className={styles.tableHead}>
          <span>
            <span className={styles.tableKicker}>Site performance</span>
            <h2 id="top-pages-title" className={styles.tableTitle}>
              Top-performing pages
            </h2>
          </span>
          <span className={styles.tableBadge}>Last 28 days</span>
        </header>
        <TopPagesTable rows={TOP_PAGES} />
      </section>
    </main>
  )
}
