import type { Metadata } from "next"

import {
  AllocationSlider,
  DecisionRecommendationCard,
  EarlyStoppingCard,
  ExperimentDashboardCard,
  ExperimentHistoryRow,
  FeatureFlagLinkRow,
  FunnelImpactRow,
  HoldoutAudienceCard,
  LiftChart,
  PrimaryMetricTile,
  SegmentBreakdownRow,
  SrmWarningBanner,
  StatSigCalculator,
  VariantEditorPair,
  type LiftDailyPoint,
} from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Full experiments composition | A/B runtime",
  description:
    "Composed A/B runtime cockpit — three real Mufflermen experiments (Quote PDF redesign, Suburb landing CTA, Mobile dock vs sidebar) wired end-to-end with all 14 primitives.",
}

const QUOTE_LIFT_POINTS: ReadonlyArray<LiftDailyPoint> = [
  { label: "May 12", lift: 4.1, lower: -3.4, upper: 11.6 },
  { label: "May 13", lift: 6.8, lower: -1.1, upper: 14.7 },
  { label: "May 14", lift: 5.6, lower: -0.8, upper: 12.0 },
  { label: "May 15", lift: 8.2, lower: 1.6, upper: 14.8 },
  { label: "May 16", lift: 9.4, lower: 3.2, upper: 15.6 },
  { label: "May 17", lift: 10.1, lower: 4.4, upper: 15.8 },
  { label: "May 18", lift: 9.6, lower: 4.2, upper: 15.0 },
  { label: "May 19", lift: 10.9, lower: 5.6, upper: 16.2 },
  { label: "May 20", lift: 11.3, lower: 6.4, upper: 16.2 },
  { label: "May 21", lift: 11.6, lower: 7.0, upper: 16.2 },
  { label: "May 22", lift: 11.8, lower: 7.4, upper: 16.2 },
  { label: "May 23", lift: 11.6, lower: 7.3, upper: 15.9 },
  { label: "May 24", lift: 11.4, lower: 7.3, upper: 15.5 },
  { label: "May 25", lift: 11.6, lower: 7.6, upper: 15.6 },
]

const SUBURB_LIFT_POINTS: ReadonlyArray<LiftDailyPoint> = [
  { label: "May 20", lift: 1.8, lower: -3.4, upper: 7.0 },
  { label: "May 21", lift: 3.6, lower: -1.0, upper: 8.2 },
  { label: "May 22", lift: 4.4, lower: 0.0, upper: 8.8 },
  { label: "May 23", lift: 5.6, lower: 1.4, upper: 9.8 },
  { label: "May 24", lift: 5.8, lower: 2.1, upper: 9.5 },
  { label: "May 25", lift: 6.2, lower: 2.6, upper: 9.8 },
  { label: "May 26", lift: 6.4, lower: 2.9, upper: 9.9 },
]

export default function FullExperimentsScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition · Full experiments cockpit"
        title="Mufflermen A/B runtime — three live experiments"
        description="Composes all 14 primitives end-to-end against three real workshop experiments. Primary metric is quote-accept rate; secondary is revenue per visitor. AU + NZ split. Visual reference only."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Full experiments" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.consoleShell}>
        {/* Experiment 1: Quote PDF redesign */}
        <h2 className={styles.sectionTitle}>
          <span>Experiment 01 · Quote PDF redesign</span>
          <span>EXP-OF-0421 · Running · day 14 of 28</span>
        </h2>

        <SrmWarningBanner
          severity="warning"
          pValue={0.041}
          arms={[
            {
              id: "control",
              name: "Legacy PDF",
              expectedPct: 50,
              observedPct: 51.2,
              observed: 14_553,
            },
            {
              id: "treatment",
              name: "Brand header v2",
              expectedPct: 50,
              observedPct: 48.8,
              observed: 13_877,
            },
          ]}
        />

        <div className={styles.consoleHero}>
          <ExperimentDashboardCard
            experimentId="EXP-OF-0421"
            name="Quote PDF redesign"
            hypothesis="Brand-led header + structured line-items on quote PDFs lifts quote-accept rate vs the legacy mono-block layout."
            status="running"
            region="AU+NZ"
            daysRunning={14}
            exposed={28430}
            primaryMetricLabel="Quote-accept rate"
            lift={11.6}
            arms={[
              {
                id: "control",
                name: "Legacy PDF",
                role: "control",
                allocation: 50,
                conversionRate: 18.4,
              },
              {
                id: "treatment",
                name: "Brand header v2",
                role: "treatment",
                allocation: 50,
                conversionRate: 20.6,
                isWinner: true,
              },
            ]}
          />

          <div className={styles.consoleStack}>
            <PrimaryMetricTile
              label="Quote-accept rate"
              value="20.6"
              unit="%"
              deltaPct={11.6}
              pValue={0.0091}
              tag="Primary"
              helpText="n = 14,215 / arm"
            />
            <PrimaryMetricTile
              label="Revenue per visitor"
              value="$184.20"
              deltaPct={4.8}
              pValue={0.041}
              tag="Secondary"
              helpText="AUD, 14d"
            />
          </div>
        </div>

        <div className={styles.consoleGrid}>
          <LiftChart
            title="Quote PDF redesign — daily lift over legacy"
            points={QUOTE_LIFT_POINTS}
            confidence={0.95}
          />

          <EarlyStoppingCard
            title="Stopping rules"
            minSamplesPerArm={10_000}
            rules={[
              {
                id: "superiority",
                kind: "superiority",
                threshold: "Posterior P(treatment beats control) ≥ 0.97",
                state: "armed",
                detail: "Currently 0.94 · 6 days to projected fire",
              },
              {
                id: "futility",
                kind: "futility",
                threshold: "Posterior P(lift < +1%) ≥ 0.90",
                state: "off",
                detail: "Posterior 0.04 — no futility signal",
              },
              {
                id: "guardrail",
                kind: "guardrail",
                threshold: "Quote PDF download rate drop > 5 pp",
                state: "off",
                detail: "PDF downloads -1.6 pp",
              },
              {
                id: "max-duration",
                kind: "max-duration",
                threshold: "Max 28 days",
                state: "off",
                detail: "Day 14 of 28",
              },
            ]}
          />
        </div>

        <h3 className={styles.consoleHeading}>Funnel impact</h3>
        <div className={styles.rowGroup}>
          <FunnelImpactRow
            step={1}
            name="Land on quote page"
            hint="quote_page_view"
            controlRate={100}
            treatmentRate={100}
          />
          <FunnelImpactRow
            step={2}
            name="Open quote PDF"
            hint="quote_pdf_open"
            controlRate={64.1}
            treatmentRate={71.4}
          />
          <FunnelImpactRow
            step={3}
            name="Scroll past line items"
            hint="quote_pdf_scroll_50"
            controlRate={42.3}
            treatmentRate={51.9}
          />
          <FunnelImpactRow
            step={4}
            name="Tap accept CTA"
            hint="quote_accept_tap"
            controlRate={24.8}
            treatmentRate={28.0}
          />
          <FunnelImpactRow
            step={5}
            name="Quote accepted"
            hint="quote_accept_confirm"
            controlRate={18.4}
            treatmentRate={20.6}
          />
        </div>

        <h3 className={styles.consoleHeading}>Segment breakdown</h3>
        <div className={styles.rowGroup}>
          <SegmentBreakdownRow
            segment="mobile"
            liftPct={14.2}
            sampleSize={9420}
            maxAbsLift={20}
            pTag="p<0.01"
          />
          <SegmentBreakdownRow
            segment="desktop"
            liftPct={8.4}
            sampleSize={4080}
            maxAbsLift={20}
            pTag="p<0.05"
          />
          <SegmentBreakdownRow
            segment="au"
            liftPct={12.6}
            sampleSize={11420}
            maxAbsLift={20}
            pTag="p<0.001"
          />
          <SegmentBreakdownRow
            segment="nz"
            liftPct={-2.1}
            sampleSize={2080}
            maxAbsLift={20}
            pTag="n.s."
          />
        </div>

        <DecisionRecommendationCard
          recommendation="ship-treatment"
          treatmentName="Brand header v2"
          subtitle="Quote PDF redesign · 14d"
          rationale={[
            "Primary metric: +11.6% lift, p = 0.009, ★★",
            "Posterior P(treatment beats control) = 0.94 — superiority armed",
            "No guardrail breaches above threshold this week",
            "Holdout NZ wholesale appears unaffected (excluded by design)",
          ]}
          confidence={0.92}
          expectedImpact="+$4.2k / wk RPV"
          owner="@daniel"
        />

        <h3 className={styles.consoleHeading}>Wired feature flags</h3>
        <div className={styles.rowGroup}>
          <FeatureFlagLinkRow
            flagKey="quote_pdf_brand_header_v2"
            name="Quote PDF — brand header v2"
            description="Renders the brand-led header + structured line items on quote PDFs."
            environment="prod"
            status="ramping"
            rolloutPct={50}
            href="/ui-primitives/feature-flags/flag-card"
          />
        </div>

        <HoldoutAudienceCard
          name="NZ wholesale holdout"
          description="Hold NZ wholesale account traffic out of the Quote PDF redesign — pricing and tax lines differ for those accounts."
          holdoutPct={10}
          estimatedSize={3120}
          effectiveUntil="2026-08-01"
          excludeRules={[
            {
              id: "country",
              field: "country",
              operator: "is",
              values: ["NZ"],
            },
            {
              id: "account",
              field: "account_type",
              operator: "in",
              values: ["wholesale", "fleet"],
            },
          ]}
        />

        {/* Experiment 2: Suburb landing CTA */}
        <h2 className={styles.sectionTitle}>
          <span>Experiment 02 · Suburb landing CTA</span>
          <span>EXP-OF-0422 · Ramping · day 6 of 21</span>
        </h2>

        <div className={styles.consoleHero}>
          <ExperimentDashboardCard
            experimentId="EXP-OF-0422"
            name="Suburb landing CTA"
            hypothesis="Suburb-pinned CTA copy (e.g. 'Book Wollongong workshop') lifts suburb-page → quote click-through vs the generic CTA."
            status="ramping"
            region="AU"
            daysRunning={6}
            exposed={9842}
            primaryMetricLabel="Quote click-through"
            lift={6.2}
            arms={[
              {
                id: "control",
                name: "Generic CTA",
                role: "control",
                allocation: 70,
                conversionRate: 9.8,
              },
              {
                id: "treatment",
                name: "Suburb-pinned",
                role: "treatment",
                allocation: 30,
                conversionRate: 10.4,
                isWinner: true,
              },
            ]}
          />

          <VariantEditorPair
            title="Suburb landing CTA — Wollongong copy"
            controlName="Generic"
            treatmentName="Suburb-pinned"
            defaultControl={{
              headline: "Get a free exhaust quote",
              body: "Book a workshop visit in under 2 minutes. We'll quote your job with no obligation.",
            }}
            defaultTreatment={{
              headline: "Get a free Wollongong exhaust quote",
              body: "Booked into Oak Flats workshop in under 2 minutes. Local team, same-day call back, no obligation.",
            }}
          />
        </div>

        <div className={styles.consoleGrid}>
          <LiftChart
            title="Suburb landing CTA — daily lift"
            points={SUBURB_LIFT_POINTS}
            confidence={0.95}
          />

          <AllocationSlider
            arms={[
              { id: "control", name: "Generic CTA", tone: "neutral" },
              { id: "treatment", name: "Suburb-pinned", tone: "teal" },
            ]}
            defaultAllocations={{
              control: 70,
              treatment: 30,
            }}
          />
        </div>

        <DecisionRecommendationCard
          recommendation="iterate"
          subtitle="Suburb landing CTA · 6d"
          rationale={[
            "Lift +6.2% on Wollongong + Shellharbour — significant",
            "Flat on Bega + Eden — copy reads as out of place",
            "Iterate to use state-level fallback when suburb < 1k visitors / mo",
          ]}
          confidence={0.62}
          expectedImpact="+$1.1k / wk RPV"
          owner="@growth-team"
        />

        {/* Experiment 3: Mobile dock vs sidebar (shipped) */}
        <h2 className={styles.sectionTitle}>
          <span>Experiment 03 · Mobile dock vs sidebar</span>
          <span>EXP-OF-0419 · Shipped · 28-day run</span>
        </h2>

        <div className={styles.consoleHero}>
          <ExperimentDashboardCard
            experimentId="EXP-OF-0419"
            name="Mobile dock vs sidebar"
            hypothesis="Bottom-dock nav (mobile only) reduces quote-flow drop-off vs the legacy hamburger sidebar."
            status="shipped"
            region="AU+NZ · mobile"
            daysRunning={28}
            exposed={61204}
            primaryMetricLabel="Mobile quote completion"
            lift={14.8}
            arms={[
              {
                id: "control",
                name: "Hamburger sidebar",
                role: "control",
                allocation: 50,
                conversionRate: 7.6,
              },
              {
                id: "treatment",
                name: "Bottom dock",
                role: "treatment",
                allocation: 50,
                conversionRate: 8.7,
                isWinner: true,
              },
            ]}
          />

          <div className={styles.consoleStack}>
            <PrimaryMetricTile
              label="Mobile quote completion"
              value="8.7"
              unit="%"
              deltaPct={14.8}
              pValue={0.0004}
              tag="Primary"
              helpText="n = 30,602 / arm"
            />
            <PrimaryMetricTile
              label="Revenue per mobile visitor"
              value="$112.40"
              deltaPct={9.6}
              pValue={0.012}
              tag="Secondary"
              helpText="AUD, mobile only"
            />
          </div>
        </div>

        <StatSigCalculator
          defaultPerArm={30_602}
          defaultControlRate={7.6}
          defaultTreatmentRate={8.7}
          defaultAlpha={0.05}
        />

        {/* History tail */}
        <h2 className={styles.sectionTitle}>
          <span>Recent experiment history</span>
          <span>Last 4 decisions</span>
        </h2>
        <div className={styles.rowGroup}>
          <ExperimentHistoryRow
            name="Mobile dock vs sidebar"
            ranFrom="2026-03-04"
            ranTo="2026-04-01"
            finalLiftPct={14.8}
            outcome="shipped"
            learning="Bottom dock lifted mobile quote completion by 14.8% on iOS + Android. Shipped to 100% mobile."
          />
          <ExperimentHistoryRow
            name="Workshop bay availability tile"
            ranFrom="2026-02-10"
            ranTo="2026-03-08"
            finalLiftPct={1.4}
            outcome="inconclusive"
            learning="Live bay tile moved nothing on same-day bookings. Underpowered at observed effect; not worth re-running."
          />
          <ExperimentHistoryRow
            name="Parts AR overlay vs 3D viewer"
            ranFrom="2026-01-08"
            ranTo="2026-02-04"
            finalLiftPct={-3.8}
            outcome="killed"
            learning="AR overlay tanked add-to-quote on Android. Killed at day 22 after guardrail breach."
          />
          <ExperimentHistoryRow
            name="Quote line-item icons"
            ranFrom="2025-12-01"
            ranTo="2025-12-21"
            finalLiftPct={4.6}
            outcome="shipped"
            learning="Per-line icons lifted quote-accept 4.6% with no guardrail moves. Shipped to all AU."
          />
        </div>
      </section>
    </main>
  )
}
