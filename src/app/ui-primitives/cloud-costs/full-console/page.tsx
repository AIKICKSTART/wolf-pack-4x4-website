import type { Metadata } from "next"

import {
  BudgetAlertBanner,
  ChargebackReport,
  CloudCostOverview,
  CommitmentUtilization,
  CostAnomalyCard,
  CostByServiceDonut,
  CostSavingActionCard,
  CostTrendAreaChart,
  DailyBudgetBurndown,
  RegionCostHeatmap,
  RightsizingRecommendation,
  TagAllocationPie,
  TopCostResourcesTable,
  UnusedResourceRow,
} from "../../components/cloud-costs"
import { PageHeader } from "../../components/page-header"
import {
  DEMO_ACCOUNT,
  DEMO_BURNDOWN,
  DEMO_CHARGEBACK_ROWS,
  DEMO_DAILY_POINTS,
  DEMO_OVERVIEW,
  DEMO_REGION_CELLS,
  DEMO_SERVICE_SPEND,
  DEMO_TAG_ALLOCATION,
  DEMO_TAG_UNTAGGED,
  DEMO_TOP_RESOURCES,
} from "../demo-data"
import styles from "../cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Full cloud cost console | Cloud costs | UI Primitives",
  description:
    "Bonus composition assembling thirteen cloud-cost primitives into a single FinOps console for verridian-prod across Sydney and Melbourne AWS regions.",
}

export default function FullCloudCostConsolePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition"
        title="Full cloud cost console"
        description="Bonus surface assembling the cloud-cost primitives into one realistic Vantage / Cloudability-style FinOps console for verridian-prod across Sydney (ap-southeast-2) and Melbourne (ap-southeast-4). Spend overview, anomaly, budget alert, service split, top resources, commitment utilisation, tag allocation, rightsizing, idle resources, daily trend, chargeback, region heatmap, burndown and saving actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs", href: "/ui-primitives/cloud-costs" },
          { label: "Full cloud cost console" },
        ]}
      />

      <div className={styles.consoleStack}>
        <BudgetAlertBanner
          budgetName="Production AWS spend"
          periodLabel={DEMO_ACCOUNT.periodLabel}
          budget={DEMO_OVERVIEW.budget}
          actual={DEMO_OVERVIEW.mtdSpend}
          forecast={DEMO_OVERVIEW.forecastSpend}
          thresholdPct={80}
          state="approaching"
        />

        <CloudCostOverview
          accountLabel={DEMO_ACCOUNT.label}
          monthLabel={DEMO_ACCOUNT.monthLabel}
          mtdSpend={DEMO_OVERVIEW.mtdSpend}
          forecastSpend={DEMO_OVERVIEW.forecastSpend}
          budget={DEMO_OVERVIEW.budget}
          lastMonthSpend={DEMO_OVERVIEW.lastMonthSpend}
          trendLabels={DEMO_OVERVIEW.trendLabels}
          budgetSeries={DEMO_OVERVIEW.budgetSeries}
          actualSeries={DEMO_OVERVIEW.actualSeries}
        />

        <div className={styles.consoleRow}>
          <CostByServiceDonut
            periodLabel={DEMO_ACCOUNT.periodLabel}
            rows={DEMO_SERVICE_SPEND}
          />
          <TagAllocationPie
            periodLabel={DEMO_ACCOUNT.periodLabel}
            tagDimension="env"
            segments={DEMO_TAG_ALLOCATION}
            untaggedAud={DEMO_TAG_UNTAGGED}
          />
        </div>

        <CostTrendAreaChart
          accountLabel={DEMO_ACCOUNT.label}
          points={DEMO_DAILY_POINTS}
          initialRange="30d"
        />

        <DailyBudgetBurndown
          periodLabel={DEMO_ACCOUNT.periodLabel}
          dateLabels={DEMO_BURNDOWN.dateLabels}
          targetSeries={DEMO_BURNDOWN.target}
          actualSeries={DEMO_BURNDOWN.actual}
          budget={DEMO_BURNDOWN.budget}
        />

        <CostAnomalyCard
          id="ano-rds-prod-001"
          service="RDS"
          region="ap-southeast-2"
          detectedAtISO="2026-05-28T03:42:00+10:00"
          baselineDailyAud={108.4}
          spikeDailyAud={263.2}
          trend={[104, 110, 108, 112, 109, 106, 111, 263]}
          severity="critical"
          recommendation="muffler-pulse-pg-prod runaway query load detected on storage IOPS. Check pg_stat_statements and consider promoting the read replica or adding indexes on hot tables."
        />

        <TopCostResourcesTable
          periodLabel={DEMO_ACCOUNT.periodLabel}
          rows={DEMO_TOP_RESOURCES}
        />

        <div className={styles.consoleRow}>
          <RegionCostHeatmap
            periodLabel={DEMO_ACCOUNT.periodLabel}
            cells={DEMO_REGION_CELLS}
          />
          <CommitmentUtilization
            id="ri-m5xlarge-syd"
            commitmentType="reserved_instance"
            label="1yr All Upfront — m5.xlarge"
            region="ap-southeast-2"
            termStartISO="2025-11-01"
            termEndISO="2026-10-31"
            committedAud={14400}
            utilizedAud={13380}
            previousUtilizationPct={88}
            savingsAud={4280}
          />
        </div>

        <ChargebackReport
          periodLabel={DEMO_ACCOUNT.periodLabel}
          rows={DEMO_CHARGEBACK_ROWS}
        />

        <RightsizingRecommendation
          id="rs-mufflerpulse-api"
          service="EC2"
          resourceName="muffler-pulse-api-prod"
          region="ap-southeast-2"
          currentSku="m5.2xlarge"
          suggestedSku="m6i.large"
          currentMonthlyAud={1840.4}
          suggestedMonthlyAud={520.2}
          avgCpuPct={12}
          avgMemoryPct={28}
        />

        <div className={styles.unusedStack}>
          <UnusedResourceRow
            id="vol-0fa83a2c14e9d72c1"
            name="legacy-ebs-snapshot-archive"
            service="EC2"
            region="ap-southeast-2"
            idleDays={62}
            monthlyCostAud={184.4}
            lastActivityISO="2026-03-26"
            suggestedAction="decommission"
          />
          <UnusedResourceRow
            id="elb-old-ingress-v1"
            name="old-ingress-elb-v1"
            service="EC2"
            region="ap-southeast-2"
            idleDays={28}
            monthlyCostAud={62.8}
            lastActivityISO="2026-04-30"
            suggestedAction="stop"
          />
          <UnusedResourceRow
            id="db-stale-staging"
            name="muffler-pulse-staging-pg"
            service="RDS"
            region="ap-southeast-2"
            idleDays={48}
            monthlyCostAud={420.6}
            lastActivityISO="2026-04-10"
            suggestedAction="decommission"
          />
        </div>

        <div className={styles.savingsRow}>
          <CostSavingActionCard
            id="save-s3-int-tier"
            title="Switch oakflats-content-prod to Intelligent-Tiering"
            description="Move 62 TB of long-tail static content from S3 Standard to S3 Intelligent-Tiering. Access patterns over the last 90 days show only 6% of objects are hot."
            category="Storage"
            monthlySavingAud={420}
            effort="low"
            status="new"
          />
          <CostSavingActionCard
            id="save-pg-replica-shrink"
            title="Right-size muffler-pulse-pg-replica"
            description="Read replica CPU stays under 12% during AU business hours. Drop one size to db.t4g.large or remove the second replica entirely."
            category="Database"
            monthlySavingAud={560}
            effort="medium"
            status="in_review"
          />
          <CostSavingActionCard
            id="save-ec2-graviton"
            title="Move kvcache-worker-pool to Graviton (c7g.4xlarge)"
            description="Graviton workers benchmark 22% faster on KV-cache prefill at 26% lower hourly rate. Workload is already statically linked aarch64."
            category="Compute"
            monthlySavingAud={840}
            effort="high"
            status="new"
          />
        </div>
      </div>
    </main>
  )
}
