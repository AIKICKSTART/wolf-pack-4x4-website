import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { AreaChart } from "@/app/ui-primitives/components/charts/area-chart"
import { BarChart } from "@/app/ui-primitives/components/charts/bar-chart"
import { GaugeCluster } from "@/app/ui-primitives/components/charts/gauge-cluster"
import { Sparkline } from "@/app/ui-primitives/components/charts/sparkline"
import { DashboardShell } from "@/app/ui-primitives/components/dashboards/dashboard-shell"
import { DashboardTile } from "@/app/ui-primitives/components/dashboards/dashboard-tile"
import { DrilldownInspector } from "@/app/ui-primitives/components/reports/drilldown-inspector"
import { KpiSnapshotTile } from "@/app/ui-primitives/components/reports/kpi-snapshot-tile"
import { PeriodComparisonStrip } from "@/app/ui-primitives/components/reports/period-comparison-strip"

import { ModelManagerControlBand, ModelUsageCards, ModelUsageTable } from "./_components"
import styles from "./model-manager.module.css"
import {
  BUDGET_GAUGES,
  COST_BY_MODEL,
  COST_WEEKS,
  MODEL_USAGE_ROWS,
  PERIOD_COMPARISONS,
  REPORTING_PERIOD,
  SPEND_DRILLDOWN,
  SPEND_TREND,
  TOKEN_TREND,
  USAGE_KPIS,
  USAGE_WEEKS,
} from "./_demo-data"

export const metadata: Metadata = {
  title: "Model manager & usage | Torque — Oak Flats Muffler Men",
  description:
    "The Oak Flats Muffler Men model-management panel — the AI models the Torque assistant can run on, the default route, per-model token and dollar usage, and the 28-day budget. Composed entirely from registered UI primitives.",
}

export default function ModelManagerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Model manager & usage"
        title="Model manager & usage"
        description="Which AI models the assistant runs on, what each one costs, and where the month's budget is going. Pick the default route, watch per-model token spend, and keep the workshop's running cost in check. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Model manager & usage" },
        ]}
      />

      <ModelManagerControlBand />

      {/* Headline usage KPIs with trend sparklines */}
      <DashboardShell
        kicker="Usage at a glance"
        title="What Torque is spending"
        subtitle="Tokens against the monthly budget, the dollar cost, how many jobs were routed, and the share the assistant handled without the crew — measured over the reporting period."
        ariaLabel="Headline model-usage KPIs"
        columns={4}
        density="comfortable"
      >
        {USAGE_KPIS.map((kpi) => (
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
                  points={[...kpi.spark]}
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

      {/* Available models — per-model usage cards */}
      <section className={styles.modelsSection} aria-labelledby="available-models-title">
        <header className={styles.sectionHead}>
          <span>
            <span className={styles.sectionKicker}>Available models</span>
            <h2 id="available-models-title" className={styles.sectionTitle}>
              Every model the assistant can route to
            </h2>
            <p className={styles.sectionLead}>
              Four tiers, one budget. The workshop runs day-to-day on the Sonnet-class default and
              only escalates to the deep-reasoning model for quotes and tricky diagnostics — that is
              what keeps the cost per handled lead at thirteen cents.
            </p>
          </span>
        </header>
        <ModelUsageCards />
      </section>

      {/* Token + cost charts and the budget meter */}
      <DashboardShell
        kicker="Token & cost trends"
        title="Where the tokens and dollars go"
        subtitle="Token consumption split by model over twelve weeks, the dollar cost per model across the last six reporting weeks, the 28-day budget, and a breakdown of the spend."
        ariaLabel="Token usage, per-model cost charts and the budget meter"
        columns={4}
        density="comfortable"
      >
        <DashboardTile label="Token usage by model" aside="12 weeks · millions" span={4} tone="teal">
          <div className={styles.chartFrame}>
            <AreaChart
              series={[...TOKEN_TREND]}
              xLabels={[...USAGE_WEEKS]}
              height={240}
              unit="M"
              ariaLabel="Weekly token consumption over twelve weeks, split across the four Torque models"
            />
            <p className={styles.tileNote}>
              Torque Shop carries most of the load. Torque Draft climbs whenever the content engine
              writes a batch of service pages — long context, but cheap per token.
            </p>
          </div>
        </DashboardTile>

        <DashboardTile label="Cost by model" aside="6 weeks · AUD" span={2} tone="amber">
          <div className={styles.chartFrame}>
            <BarChart
              series={[...COST_BY_MODEL]}
              xLabels={[...COST_WEEKS]}
              mode="grouped"
              height={240}
              valueLabels={false}
              unit=""
              ariaLabel="Weekly dollar cost per Torque model across the last six reporting weeks"
            />
            <p className={styles.tileNote}>
              Reason is the priciest per token, but escalation-only routing keeps its weekly cost
              under the cheap-and-fast Shop model.
            </p>
          </div>
        </DashboardTile>

        <DashboardTile label="Budget meter" aside="28-day budget" span={2} tone="green">
          <div className={styles.chartFrame}>
            <GaugeCluster
              gauges={BUDGET_GAUGES}
              kicker="Budget health"
              scaleLabels={["Tokens", "Spend", "Cache"]}
              ariaLabel="Token budget used, spend against the cap, and prompt-cache hit rate"
            />
            <div className={styles.budgetFooter}>
              <span className={styles.budgetSparkLabel}>14-day spend</span>
              <Sparkline
                points={[...SPEND_TREND]}
                tone="red"
                width={180}
                height={36}
                ariaLabel="Torque daily spend over the last fourteen days"
              />
              <span className={styles.budgetFigure}>$41.80 of $60 · 66% of the token budget used</span>
            </div>
          </div>
        </DashboardTile>

        <DashboardTile label="Spend breakdown" aside="By model" span={2} tone="red">
          <DrilldownInspector
            parentMetric="Spend this period"
            parentValue="$41.80"
            dimensionLabel="Model"
            rows={SPEND_DRILLDOWN}
            totalDescription={`across ${REPORTING_PERIOD}, 15,658 requests routed`}
          />
        </DashboardTile>

        <DashboardTile label="Period over period" aside="Efficiency" span={2} tone="teal">
          <div className={styles.comparisonStack}>
            {PERIOD_COMPARISONS.map((cmp) => (
              <PeriodComparisonStrip
                key={cmp.id}
                metricLabel={cmp.metricLabel}
                currentValue={cmp.currentValue}
                currentLabel={cmp.currentLabel}
                priorValue={cmp.priorValue}
                priorLabel={cmp.priorLabel}
                deltaLabel={cmp.deltaLabel}
                deltaTone={cmp.deltaTone}
                spark={
                  <Sparkline
                    points={[...cmp.spark]}
                    tone={cmp.sparkTone}
                    width={120}
                    height={36}
                    ariaLabel={`${cmp.metricLabel} trend`}
                  />
                }
              />
            ))}
          </div>
        </DashboardTile>
      </DashboardShell>

      {/* Per-model usage detail table */}
      <section className={styles.tableSection} aria-labelledby="model-usage-title">
        <header className={styles.tableHead}>
          <span>
            <span className={styles.tableKicker}>Per-model detail</span>
            <h2 id="model-usage-title" className={styles.tableTitle}>
              Usage by model
            </h2>
          </span>
          <span className={styles.tableBadge}>This reporting period</span>
        </header>
        <ModelUsageTable rows={MODEL_USAGE_ROWS} />
      </section>
    </main>
  )
}
