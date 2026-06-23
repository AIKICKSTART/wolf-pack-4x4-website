"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import {
  ApprenticeProgressMeter,
  BayAssignmentGrid,
  ClockInOutWidget,
  CoverageGapWarning,
  LunchBreakTracker,
  OvertimeTallyChip,
  PerformanceReviewRow,
  RosterCalendarOverlay,
  ShiftSwapModal,
  SkillCertMatrix,
  TechnicianProfileCard,
  TrainingSessionCard,
} from "../../components/roster"
import {
  BAY_ASSIGNMENTS,
  BAY_AVAILABILITY,
  BREAKS,
  CERT_COLUMNS,
  CERT_ROWS,
  COVERAGE,
  REF_TODAY,
  TECH_TINTS,
  TECHNICIANS,
  WEEK_EVENTS,
} from "../roster-mock"
import styles from "../roster.module.css"

export default function RosterFullConsolePage() {
  const [swapOpen, setSwapOpen] = useState<boolean>(false)

  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.* / Roster · Full console"
        title="Full roster console"
        description="Every primitive composed into one workshop-floor console — the crew row on top, week roster overlay in the middle, bay assignment grid below, gap warnings + clock + breaks + overtime + apprentice meter in the sidebar."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Full console" },
        ]}
      />

      <section className={styles.canvas}>
        <div className={styles.profileStack}>
          <TechnicianProfileCard
            name="Trent Williams"
            role="Senior Technician"
            avatarTone="green"
            meta="12 yrs · diag specialist"
            certifications={[
              { label: "TIG · Master", tone: "green" },
              { label: "MIG · Master", tone: "green" },
              { label: "ADR sound", tone: "teal" },
            ]}
            bays={["bay-1", "bay-2"]}
            status="on-shift"
          />
          <TechnicianProfileCard
            name="Sophie Tan"
            role="Workshop Manager"
            avatarTone="amber"
            meta="Floor coordinator"
            certifications={[
              { label: "OH&S · Master", tone: "green" },
              { label: "Forklift · Master", tone: "green" },
            ]}
            bays={["bay-1", "bay-2", "bay-3", "bay-4"]}
            status="on-shift"
          />
          <TechnicianProfileCard
            name="Jordan Pace"
            role="Apprentice Y3"
            avatarTone="teal"
            meta="18 mo logged"
            certifications={[
              { label: "TIG · Competent", tone: "teal" },
              { label: "MIG · Competent", tone: "teal" },
            ]}
            bays={["bay-3"]}
            status="training"
          />
        </div>
      </section>

      <section className={styles.console}>
        <div className={styles.consoleColumn}>
          <ClockInOutWidget
            initialState="clocked-in"
            elapsedLabel="06:42"
            breakLabel="12 of 30 min"
          />
          <LunchBreakTracker rows={BREAKS} onExtendBreak={() => undefined} />
          <OvertimeTallyChip
            weekHours={8.5}
            monthHours={32.0}
            weekThreshold={10}
            monthThreshold={30}
          />
        </div>

        <div className={styles.consoleColumn}>
          <RosterCalendarOverlay
            reference={REF_TODAY}
            today={REF_TODAY}
            events={WEEK_EVENTS}
            technicians={TECH_TINTS}
            coverage={COVERAGE}
            bays={BAY_AVAILABILITY}
          />
          <BayAssignmentGrid rows={BAY_ASSIGNMENTS} />
        </div>

        <div className={styles.consoleColumn}>
          <CoverageGapWarning
            window="Thu 5 Jun · 13:00 – 16:00"
            actualHours={6}
            requiredHours={12}
            detail="Bay 2 + Bay 3 both unstaffed for the post-lunch block."
            onAssignCover={() => undefined}
          />
          <TrainingSessionCard
            topic="TIG cert refresher"
            trainer="Sophie Tan · Workshop Mgr"
            dateLabel="Wed 12 Jun · 14:00"
            attendeeCount={4}
            capacity={6}
            materials={[
              { label: "TIG cert pack (PDF)", href: "#tig-cert-pack" },
              { label: "Welding torch SOP", href: "#torch-sop" },
            ]}
          />
          <ApprenticeProgressMeter
            apprenticeName="Jordan Pace"
            yearLevel="Year 3 · LV Mech"
            modulesDone={11}
            modulesTotal={16}
            completionPercent={68}
            nextModule={{
              title: "ADR-compliance module",
              estimatedHours: 6,
            }}
          />
          <button
            type="button"
            className={styles.swapTrigger}
            onClick={() => setSwapOpen(true)}
          >
            Request shift swap
          </button>
        </div>

        <div className={styles.fullSpan}>
          <ul className={styles.reviewList} role="list" aria-label="Review backlog">
            <PerformanceReviewRow
              technicianName="Trent Williams"
              role="Senior Technician"
              lastReviewDate="14 Feb 2026"
              rating="exceeds"
              avatarTone="green"
              onOpen={() => undefined}
            />
            <PerformanceReviewRow
              technicianName="Jordan Pace"
              role="Apprentice Y3"
              lastReviewDate="22 Apr 2026"
              rating="developing"
              avatarTone="teal"
              onOpen={() => undefined}
            />
            <PerformanceReviewRow
              technicianName="Bec Lawson"
              role="Front Desk"
              lastReviewDate="11 Jan 2026"
              rating="needs-attention"
              avatarTone="red"
              onOpen={() => undefined}
            />
          </ul>
          <SkillCertMatrix technicians={CERT_ROWS} skills={CERT_COLUMNS} />
        </div>
      </section>

      <ShiftSwapModal
        open={swapOpen}
        onOpenChange={setSwapOpen}
        myShift={{
          label: "Tue 4 Jun · 07:00–15:30 · Bay 2",
          duration: "8h 30m",
        }}
        candidates={TECHNICIANS.filter((tech) => tech.id !== "trent-williams")}
        onSubmit={() => setSwapOpen(false)}
      />
    </main>
  )
}
