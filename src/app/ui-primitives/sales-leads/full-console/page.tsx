import type { Metadata } from "next"

import {
  EnrichmentStatusChip,
  FollowUpCadenceCard,
  InquiryFormCapture,
  LeadAssignmentRules,
  LeadCard,
  LeadScoreBreakdown,
  LeadSourceMixDonut,
  LeadSourceRoiTable,
  LeadToQuoteFunnel,
  LostReasonPareto,
  PhoneCallLogRow,
  QualificationChecklist,
  SlaResponseTimer,
} from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import {
  MUFFLERMEN_ASSIGNMENT_RULES,
  MUFFLERMEN_BANT,
  MUFFLERMEN_CADENCE_TOUCHPOINTS,
  MUFFLERMEN_FORM_FIELDS,
  MUFFLERMEN_FUNNEL,
  MUFFLERMEN_LEAD_SCORE_SIGNALS,
  MUFFLERMEN_LEAD_SOURCE_MIX,
  MUFFLERMEN_LOST_REASONS,
  MUFFLERMEN_ROI_ROWS,
} from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Full sales-leads console | Sales leads",
  description:
    "Composition — every sales-lead primitive composed into the top-of-funnel command center used by Mufflermen front desk.",
}

const DEMO_NOW_MS = Date.parse("2026-05-29T11:00:00+10:00")

export default function FullSalesLeadsConsolePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full console"
        title="Full sales-leads console"
        description="Every primitive composed into the top-of-funnel command center used at the workshop front desk. Live SLA timers up top, hot lead card + qualification mid-page, source ROI and lost-reason Pareto in the analyst column."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Full console" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>SLA queue — front desk</span>
        <div className={styles.demoStack}>
          <SlaResponseTimer
            leadName="Mick Davis — Hilux SR5 quote"
            receivedAtIso="2026-05-29T10:54:00+10:00"
            slaMinutes={30}
            nowMs={DEMO_NOW_MS}
          />
          <SlaResponseTimer
            leadName="Sarah Pope — Ranger DPF"
            receivedAtIso="2026-05-29T10:42:00+10:00"
            slaMinutes={30}
            nowMs={DEMO_NOW_MS}
          />
          <SlaResponseTimer
            leadName="Albion Park Couriers — fleet"
            receivedAtIso="2026-05-29T10:00:00+10:00"
            slaMinutes={30}
            nowMs={DEMO_NOW_MS}
          />
        </div>
      </section>

      <div className={styles.console}>
        <div className={styles.consoleMain}>
          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Hot lead — assigned to Jordan</span>
            <div className={styles.demoStack}>
              <LeadCard
                id="lead-001"
                name="Mick Davis"
                vehicle="2022 Toyota Hilux SR5"
                source="website"
                score={88}
                scoreBreakdown={[
                  { factor: "engagement", score: 92 },
                  { factor: "fit", score: 95 },
                  { factor: "intent", score: 86 },
                  { factor: "recency", score: 80 },
                ]}
                firstTouch="Today 09:14"
                firstTouchIso="2026-05-29T09:14:00+10:00"
                assignedToName="Jordan Pham"
                assignedToInitials="JP"
                inquiryAbout="Manta 2.5in cat-back system — wants tone improvement before Mudgee trip."
              />
              <div className={styles.demoInline}>
                <EnrichmentStatusChip
                  enrichedCount={8}
                  totalCount={9}
                  providers={["abn-lookup", "manual", "hunter"]}
                />
                <EnrichmentStatusChip
                  enrichedCount={5}
                  totalCount={9}
                  providers={["manual", "clearbit"]}
                />
              </div>
            </div>
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Qualification + score</span>
            <div className={styles.demoTwo}>
              <QualificationChecklist
                framework="bant"
                criteria={MUFFLERMEN_BANT}
              />
              <LeadScoreBreakdown
                total={73}
                signals={MUFFLERMEN_LEAD_SCORE_SIGNALS}
              />
            </div>
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Funnel + ROI</span>
            <LeadToQuoteFunnel stages={MUFFLERMEN_FUNNEL} />
            <LeadSourceRoiTable rows={MUFFLERMEN_ROI_ROWS} />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Today&apos;s calls</span>
            <div className={styles.callLogList}>
              <PhoneCallLogRow
                id="c-1"
                callerName="Mick Davis"
                callerNumber="0414 882 197"
                topic="Manta cat-back fitment day"
                durationSeconds={482}
                outcome="booked"
                direction="inbound"
                timestamp="09:14"
                timestampIso="2026-05-29T09:14:00+10:00"
                recordingHref="#rec"
              />
              <PhoneCallLogRow
                id="c-2"
                callerName="Sarah Pope"
                callerNumber="0438 102 554"
                topic="Ranger Wildtrak follow-up"
                durationSeconds={184}
                outcome="connected"
                direction="outbound"
                timestamp="10:22"
                timestampIso="2026-05-29T10:22:00+10:00"
                recordingHref="#rec"
              />
              <PhoneCallLogRow
                id="c-3"
                callerName="Trent Williams"
                callerNumber="0407 661 099"
                topic="Patrol Y62 quote"
                durationSeconds={42}
                outcome="voicemail"
                direction="outbound"
                timestamp="08:48"
                timestampIso="2026-05-29T08:48:00+10:00"
              />
            </div>
          </section>
        </div>

        <aside className={styles.consoleSide}>
          <LeadSourceMixDonut data={MUFFLERMEN_LEAD_SOURCE_MIX} />

          <FollowUpCadenceCard
            cadenceName="Hot lead cadence"
            audience="Quote ready, fitment not booked"
            touchpoints={MUFFLERMEN_CADENCE_TOUCHPOINTS}
          />

          <InquiryFormCapture
            title="Quote inquiry — public site"
            submissionRate={62}
            fields={MUFFLERMEN_FORM_FIELDS.slice(0, 4)}
          />

          <LeadAssignmentRules rules={MUFFLERMEN_ASSIGNMENT_RULES} />

          <LostReasonPareto data={MUFFLERMEN_LOST_REASONS} />
        </aside>
      </div>
    </main>
  )
}
