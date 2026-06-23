import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AnomalyCalloutRow,
  CohortGrid,
  DashboardPinGrid,
  DataSourceRow,
  DrillDownPanel,
  FilterPanel,
  ForecastChartCard,
  FunnelComparisonCard,
  GoalTrackerCard,
  KpiCardLarge,
  PivotTable,
  ReportBuilderCanvas,
  ScheduledExportRow,
  ShareReportCard,
} from "../../components/reports-deep"
import { Sparkline } from "../../components/charts/sparkline"
import {
  ANOMALY_EVENTS,
  BUILDER_DIMENSIONS,
  BUILDER_FILTERS,
  BUILDER_MEASURES,
  COHORT_ENGAGEMENT,
  COHORT_PERIODS,
  COHORT_RETENTION,
  COHORT_REVENUE,
  DASHBOARD_WIDGETS,
  DATA_SOURCES,
  DRILL_LEVELS,
  FILTER_CHIPS,
  FILTER_TEXT_FIELDS,
  FORECAST_POINTS,
  FUNNEL_STAGES,
  GOAL_DYNO_MONTH,
  GOAL_PARTS_QUARTER,
  GOAL_REVENUE_WEEK,
  KPI_SPARKS_DEEP,
  PIVOT_COL_GROUPS,
  PIVOT_MATRIX,
  PIVOT_MEASURES,
  PIVOT_ROW_GROUPS,
  PIVOT_TITLE,
  SCHEDULED_EXPORTS,
  SHARE_EMBED,
  SHARE_ENTRIES,
  SHARE_URL,
} from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Full analytics workspace | Reports-deep",
  description:
    "Composition — every reports-deep primitive composed into a single analytics workspace: builder, filters, KPI grid, pivot, drilldown, funnel, cohort, forecast, anomalies, goals, sources and share.",
}

export default function FullAnalyticsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full analytics"
        title="Full analytics workspace"
        description="Every reports-deep primitive composed into one workspace. Builder canvas + filter rail, pinned KPI grid, pivot, drilldown, funnel, cohort heatmap, forecast, anomaly list, goal trackers, data sources and a share card. Mufflermen domain: weekly revenue $42,180, dyno bookings, parts margin, suburb performance (Wollongong $18,040 vs Albion Park $4,210), forecasts AUD inc GST, anomalies on the quote-conversion drop."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Full analytics" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Builder + filters</span>
        <div className={styles.demoSplit}>
          <FilterPanel
            title="Workshop revenue"
            dateRange={{
              id: "fa-date",
              label: "Date range",
              initial: { start: "2026-05-22", end: "2026-05-28" },
            }}
            selectField={{
              id: "fa-cadence",
              label: "Reporting cadence",
              initial: "weekly",
              options: [
                { id: "weekly", label: "Weekly" },
                { id: "monthly", label: "Monthly" },
                { id: "quarterly", label: "Quarterly" },
                { id: "ytd", label: "Year to date" },
              ],
            }}
            numericRange={{
              id: "fa-revenue",
              label: "Revenue band",
              unit: "AUD",
              bounds: { min: 0, max: 50000 },
              initial: { min: 0, max: 50000 },
            }}
            chipGroups={FILTER_CHIPS}
            textFields={FILTER_TEXT_FIELDS}
          />
          <ReportBuilderCanvas
            library={{
              filters: BUILDER_FILTERS,
              dimensions: BUILDER_DIMENSIONS,
              measures: BUILDER_MEASURES,
            }}
            initial={{
              filters: ["f-current-week", "f-status"],
              dimensions: ["d-suburb", "d-service"],
              measures: ["m-revenue", "m-margin", "m-jobs"],
            }}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Pinned KPI grid</span>
        <DashboardPinGrid widgets={DASHBOARD_WIDGETS} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Headline KPI cards · large</span>
        <div className={styles.demoColumns}>
          <KpiCardLarge
            kicker="Week 22 FY26 · inc GST"
            label="Weekly revenue"
            value="$42,180"
            deltaLabel="+6.4%"
            deltaTone="positive"
            comparisonLabel="vs prior week ($39,640)"
            goalRatio={0.937}
            goalLabel="$45k goal"
            spark={<Sparkline points={KPI_SPARKS_DEEP.revenue} tone="teal" ariaLabel="Revenue trend" />}
          />
          <KpiCardLarge
            kicker="Week 22 FY26"
            label="Dyno bookings"
            value="27"
            unit="bookings"
            deltaLabel="+3 vs avg"
            deltaTone="positive"
            comparisonLabel="vs 8-week avg (24)"
            goalRatio={0.8}
            goalLabel="30/wk goal"
            spark={<Sparkline points={KPI_SPARKS_DEEP.dyno} tone="amber" ariaLabel="Dyno trend" />}
          />
          <KpiCardLarge
            kicker="Rolling 14 days"
            label="Quote conversion"
            value="48.2"
            unit="%"
            deltaLabel="−6.4 pts"
            deltaTone="negative"
            comparisonLabel="vs prior 14 days (54.6%)"
            goalRatio={0.69}
            goalLabel="70% goal"
            spark={<Sparkline points={KPI_SPARKS_DEEP.conversion} tone="red" ariaLabel="Conversion trend" />}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Pivot + drilldown</span>
        <div className={styles.demoSplit}>
          <DrillDownPanel
            title="Weekly revenue · Week 22 FY26"
            levels={DRILL_LEVELS}
            initialIndex={0}
          />
          <PivotTable
            title={PIVOT_TITLE}
            rowGroups={PIVOT_ROW_GROUPS}
            columnGroups={PIVOT_COL_GROUPS}
            measures={PIVOT_MEASURES}
            matrix={PIVOT_MATRIX}
            initialMeasureId="m-revenue"
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Funnel + cohort</span>
        <div className={styles.demoColumns}>
          <FunnelComparisonCard
            title="Workshop conversion funnel"
            currentLabel="Week 22 FY26"
            priorLabel="Week 21 FY26"
            stages={FUNNEL_STAGES}
          />
          <CohortGrid
            title="FY26 weekly cohorts"
            periodLabels={COHORT_PERIODS}
            datasets={[
              { metric: "retention", label: "Retention", rows: COHORT_RETENTION },
              { metric: "revenue", label: "Revenue", rows: COHORT_REVENUE },
              { metric: "engagement", label: "Engagement", rows: COHORT_ENGAGEMENT },
            ]}
            initialMetric="retention"
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Forecast + goals</span>
        <ForecastChartCard
          kicker="Weekly revenue · 13-week forecast"
          title="Weekly revenue forecast"
          points={FORECAST_POINTS}
          summaryValue="$45,980"
          summaryDelta="+9.0% vs current"
          confidence="80% confidence interval · model trained 28 May 2026"
        />
        <div className={styles.demoColumns}>
          <GoalTrackerCard goal={GOAL_REVENUE_WEEK} />
          <GoalTrackerCard goal={GOAL_DYNO_MONTH} />
          <GoalTrackerCard goal={GOAL_PARTS_QUARTER} />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Anomalies</span>
        <div className={styles.demoStack}>
          {ANOMALY_EVENTS.map((event) => (
            <AnomalyCalloutRow key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Scheduled exports + data sources</span>
        <div className={styles.demoStack}>
          {SCHEDULED_EXPORTS.map((config) => (
            <ScheduledExportRow key={config.id} config={config} />
          ))}
          {DATA_SOURCES.map((connection) => (
            <DataSourceRow key={connection.id} connection={connection} />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Share workspace</span>
        <ShareReportCard
          title="Weekly revenue · Week 22 FY26"
          publicUrl={SHARE_URL}
          embedSnippet={SHARE_EMBED}
          entries={SHARE_ENTRIES}
          initialChannel="link"
          initialPermission="view"
        />
      </section>
    </main>
  )
}
