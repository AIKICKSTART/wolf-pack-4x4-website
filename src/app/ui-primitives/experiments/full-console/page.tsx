import type { Metadata } from "next"

import {
  BayesianPosteriorChart,
  CupedVarianceReductionChip,
  DecisionRecommendationCard,
  ExperimentArchive,
  ExperimentCard,
  HoldoutGroupToggle,
  HypothesisStatementCard,
  MultiArmBanditVisualizer,
  SampleSizeCalculator,
  SequentialTestViewer,
  SignificanceThresholdSetter,
  StatPowerGauge,
  StopRuleEditor,
  VariantTrafficAllocator,
} from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Full console | Experiments",
  description:
    "Composition — full Mufflermen experimentation cockpit wiring every primitive in a single screen.",
}

function bellDensity(
  bins: number,
  centerRatio: number,
  width: number,
): ReadonlyArray<number> {
  const out: number[] = []
  const center = centerRatio * bins
  for (let i = 0; i < bins; i += 1) {
    const z = (i - center) / width
    out.push(Math.exp(-0.5 * z * z))
  }
  return out
}

const BINS = 80

export default function ExperimentsFullConsolePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Cockpit"
        title="Full experimentation console"
        description="Composition wiring all 14 experiment primitives into a single Optimizely/Statsig/Eppo-style cockpit — list, hypothesis, traffic, sample size, threshold, power, bandit, holdout, sequential, Bayesian, decision, stop rules, CUPED, archive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Full console" },
        ]}
      />

      <div className={styles.consoleShell}>
        <section
          className={styles.demoSurface}
          aria-label="Active experiments"
        >
          <span className={styles.demoLabel}>Active experiments</span>
          <div className={styles.demoStack}>
            <ExperimentCard
              name="Quote — instant pricing UI cards"
              hypothesis="Live recalc on each line edit lifts booking conversion."
              status="running"
              variants={[
                { id: "c", name: "Save then price", isControl: true },
                { id: "v", name: "Live preview" },
              ]}
              sampleSize={28430}
              requiredSampleSize={26000}
              significance={0.0091}
              lift={20.1}
            />
            <ExperimentCard
              name="Parts 3D viewer hero vs static"
              hypothesis="GLB hero lifts parts → quote conversion."
              status="running"
              variants={[
                { id: "c", name: "Static carousel", isControl: true },
                { id: "v", name: "3D viewer" },
                { id: "ar", name: "AR overlay" },
              ]}
              sampleSize={5200}
              requiredSampleSize={12000}
              significance={0.084}
              lift={9.8}
            />
            <ExperimentCard
              name="Bay availability realtime chip"
              hypothesis="Live bay tile lifts same-day bookings."
              status="draft"
              variants={[
                { id: "c", name: "Daily summary", isControl: true },
                { id: "v", name: "Live tile" },
              ]}
              sampleSize={0}
              requiredSampleSize={15600}
            />
          </div>
        </section>

        <div className={styles.consoleGrid}>
          <section
            className={styles.demoSurface}
            aria-label="Experiment design"
          >
            <span className={styles.demoLabel}>Design — hypothesis & traffic</span>
            <div className={styles.demoStack}>
              <HypothesisStatementCard
                observations={[
                  { id: "o1", label: "70% of quotes saved before pricing" },
                  { id: "o2", label: "Parts page bounces at 62% on mobile" },
                ]}
                changes={[
                  { id: "c1", label: "Inline live pricing on quote build" },
                  { id: "c2", label: "Replace carousel with 3D viewer" },
                ]}
                outcomes={[
                  { id: "out1", label: "More quotes → bookings" },
                  { id: "out2", label: "More parts added to quotes" },
                ]}
                metrics={[
                  { id: "m1", label: "Quote → booking conversion rate" },
                  { id: "m2", label: "AUD ARPV per quote" },
                ]}
                thresholds={[
                  { id: "t1", label: "+8% relative" },
                  { id: "t2", label: "+$45 AUD ARPV" },
                ]}
                defaultValue={{
                  observationId: "o1",
                  changeId: "c1",
                  outcomeId: "out1",
                  metricId: "m1",
                  thresholdId: "t1",
                }}
              />
              <VariantTrafficAllocator
                variants={[
                  {
                    id: "control",
                    name: "Save then price",
                    weight: 40,
                    tone: "amber",
                  },
                  {
                    id: "live",
                    name: "Live preview",
                    weight: 40,
                    tone: "teal",
                  },
                  {
                    id: "anim",
                    name: "Live + animated",
                    weight: 20,
                    tone: "green",
                  },
                ]}
              />
              <SampleSizeCalculator
                defaultBaselineRate={18.4}
                defaultMde={6}
                defaultPower={0.8}
                defaultVariants={3}
                expectedDailyVolume={480}
              />
            </div>
          </section>

          <aside className={styles.consoleSidebar} aria-label="Controls">
            <SignificanceThresholdSetter
              defaultValue={{ alpha: 0.05, tail: "two-sided", correction: "fdr" }}
            />
            <StatPowerGauge
              power={0.83}
              targetPower={0.8}
              currentSampleSize={28430}
              requiredSampleSize={26000}
              caption="Quote — instant pricing"
            />
            <HoldoutGroupToggle
              defaultEnabled
              defaultPercent={10}
              audiences={[
                { id: "new", label: "New customers", enabled: true },
                { id: "loyalty", label: "Loyalty 2+", enabled: true },
                { id: "fleet", label: "Fleet", enabled: false },
              ]}
            />
            <CupedVarianceReductionChip
              varianceReductionPercent={34.7}
              covariate="prior_30d_quote_revenue"
              powerImprovementPoints={8.4}
            />
          </aside>
        </div>

        <div className={styles.consoleGrid}>
          <section className={styles.demoSurface} aria-label="Analysis">
            <span className={styles.demoLabel}>Analysis — bandit, sequential, Bayesian</span>
            <div className={styles.demoStack}>
              <MultiArmBanditVisualizer
                arms={[
                  {
                    id: "control",
                    name: "Save then price",
                    traffic: [33, 32, 28, 24, 19, 14, 11, 8],
                    tone: "amber",
                  },
                  {
                    id: "live",
                    name: "Live preview",
                    traffic: [33, 34, 38, 44, 50, 58, 64, 70],
                    tone: "teal",
                  },
                  {
                    id: "anim",
                    name: "Live + animated",
                    traffic: [34, 34, 34, 32, 31, 28, 25, 22],
                    tone: "green",
                  },
                ]}
                steps={["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"]}
                algorithm="thompson"
                explorationBalance={0.34}
                predictedWinnerId="live"
              />
              <SequentialTestViewer
                pValues={[0.51, 0.38, 0.24, 0.16, 0.11, 0.082, 0.061, 0.046, 0.034, 0.028]}
                naivePValues={[0.49, 0.31, 0.16, 0.082, 0.041, 0.022, 0.013, 0.008, 0.005, 0.003]}
                peekLabels={["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10"]}
                alphaBoundary={0.05}
                crossedAtIndex={7}
              />
              <BayesianPosteriorChart
                xMin={0}
                xMax={0.32}
                xLabel="Quote → booking conversion rate"
                variants={[
                  {
                    id: "control",
                    name: "Save then price",
                    density: bellDensity(BINS, 0.58, 7),
                    credibleInterval: [0.176, 0.196],
                    probToBeatBaseline: 0.5,
                    tone: "amber",
                    isBaseline: true,
                  },
                  {
                    id: "live",
                    name: "Live preview",
                    density: bellDensity(BINS, 0.71, 8),
                    credibleInterval: [0.212, 0.236],
                    probToBeatBaseline: 0.987,
                    tone: "teal",
                  },
                ]}
              />
            </div>
          </section>

          <aside className={styles.consoleSidebar} aria-label="Decision & rules">
            <DecisionRecommendationCard
              recommendation="ship-variant"
              variantName="Live preview"
              reasoning="P(beat baseline) 98.7%, +20.1% lift, guardrails clean across 28k subjects."
              expectedImpact="+$4.2k/wk AUD ARPV"
              confidence={0.96}
            />
            <StopRuleEditor
              defaultRules={[
                { kind: "min-sample", threshold: 12000 },
                { kind: "significance", threshold: 0.05 },
                { kind: "guardrail", threshold: 5 },
              ]}
            />
          </aside>
        </div>

        <section className={styles.consoleArchive} aria-label="Concluded experiments">
          <ExperimentArchive
            caption="Concluded experiments — last 90 days"
            experiments={[
              {
                id: "ex-parts-3d",
                name: "Parts 3D viewer hero vs static",
                ranFrom: "2026-03-12",
                ranTo: "2026-04-02",
                winningVariant: "3D viewer",
                finalLift: 24.4,
                decision: "ship-variant",
                retrospectiveHref:
                  "/ui-primitives/experiments/experiment-archive#ex-parts-3d",
              },
              {
                id: "ex-bay-realtime",
                name: "Bay availability realtime chip",
                ranFrom: "2026-02-18",
                ranTo: "2026-03-10",
                decision: "insufficient-power",
                retrospectiveHref:
                  "/ui-primitives/experiments/experiment-archive#ex-bay-realtime",
              },
              {
                id: "ex-ar-overlay",
                name: "Parts AR overlay (mobile)",
                ranFrom: "2026-02-04",
                ranTo: "2026-02-19",
                finalLift: -6.4,
                decision: "stop-loss",
                retrospectiveHref:
                  "/ui-primitives/experiments/experiment-archive#ex-ar-overlay",
              },
            ]}
          />
        </section>
      </div>
    </main>
  )
}
