import type { Metadata } from "next"

import { MetricBlock } from "@/app/ui-primitives/components/data-display/metric-block"
import { StatusBadge } from "@/app/ui-primitives/components/data-display/status-badge-grid"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { AuditTrailRail } from "@/app/ui-primitives/components/workflow-engine/audit-trail-rail"
import { RunHistoryRow } from "@/app/ui-primitives/components/workflow-engine/run-history-row"
import { RunTraceViewer } from "@/app/ui-primitives/components/workflow-engine/run-trace-viewer"
import { TemplateLibraryGrid } from "@/app/ui-primitives/components/workflow-engine/template-library-grid"
import { TriggerConfigCard } from "@/app/ui-primitives/components/workflow-engine/trigger-config-card"

import { JobsTable } from "./_jobs-table"
import {
  AUDIT_ENTRIES,
  CRON_SAMPLE_PAYLOAD,
  FAILED_RUN_TRACE,
  JOB_TEMPLATES,
  POSTURE_METRICS,
  RUN_HISTORY,
  SCHEDULED_JOBS,
  STATUS_LEGEND,
  TRACE_TOTAL_MS,
  UPCOMING_RUNS,
} from "./_demo-data"
import styles from "./scheduled-jobs.module.css"

export const metadata: Metadata = {
  title: "Scheduled jobs & cron | Torque",
  description:
    "Oak Flats Muffler Men automations console — every scheduled Torque job with its cron schedule, next run and last status, a run-history timeline with trace, enable/disable toggles, and a create-job affordance. Composed entirely from registered UI primitives.",
}

export default function ScheduledJobsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Scheduled jobs & cron"
        title="Scheduled jobs & cron"
        description="The automations Torque runs for Oak Flats Muffler Men on a clock — the daily SEO audit, the weekly blog draft, the Friday social digest, review sweeps and service reminders. Each job shows its cron schedule, next and last run, and last status. Flip jobs on or off, watch the run history with a full trace, and spin up new automations from the template library. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque" },
          { label: "Scheduled jobs & cron" },
        ]}
      />

      {/* ---- Header band: Torque identity + posture KPIs --------------- */}
      <section className={styles.band} aria-labelledby="scheduled-jobs-band-title">
        <div className={styles.bandMain}>
          <div className={styles.bandHead}>
            {/* Placeholder circular Torque avatar — brand-red gradient,
                initial "T". The real mascot lands later. */}
            <span className={styles.torqueAvatar} aria-hidden="true">
              <span>T</span>
            </span>
            <div className={styles.torqueId}>
              <span className={styles.torqueName}>Torque</span>
              <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
            </div>
          </div>
          <h2 id="scheduled-jobs-band-title" className={styles.bandTitle}>
            Automations on a <em>clock</em>
          </h2>
          <p className={styles.bandCopy}>
            Torque keeps the marketing and front-desk busywork running while the crew is on the
            tools — Oak Flats Muffler Men, Illawarra NSW. Nothing customer-facing posts or sends
            without your sign-off, and every run lands in the trace below.
          </p>
          <div className={styles.bandStatus} role="status" aria-label="Automations status">
            <StatusBadge tone="success" size="md" shape="pill" label="Scheduler online" />
            <StatusBadge tone="info" size="md" shape="pill" label="7 active jobs" />
            <StatusBadge tone="warn" size="md" shape="pill" label="2 awaiting you" />
            <StatusBadge tone="error" size="md" shape="pill" label="1 failed run" />
          </div>
        </div>

        <div className={styles.bandMetrics} aria-label="Automations posture">
          <MetricBlock metrics={POSTURE_METRICS} />
        </div>
      </section>

      {/* ---- Jobs table ------------------------------------------------ */}
      <JobsTable jobs={SCHEDULED_JOBS} />

      <ul className={styles.statusLegend} aria-label="Last-status legend">
        {STATUS_LEGEND.map((item) => (
          <li key={item.key} className={styles.legendItem}>
            <StatusBadge tone={item.tone} size="sm" shape="dot" label="" />
            {item.label}
          </li>
        ))}
      </ul>

      {/* ---- Run history + trace, with side rail ----------------------- */}
      <div className={styles.layout}>
        <div className={styles.column}>
          <section className={styles.panel} aria-labelledby="scheduled-jobs-runs-title">
            <header className={styles.panelHead}>
              <div className={styles.panelHeadText}>
                <span className={styles.panelKicker}>Newest first</span>
                <h2 id="scheduled-jobs-runs-title" className={styles.panelTitle}>
                  Run history
                </h2>
              </div>
              <span className={styles.panelMeta}>{RUN_HISTORY.length} runs · last 48h</span>
            </header>
            <div className={styles.runList}>
              {RUN_HISTORY.map((run) => (
                <RunHistoryRow
                  key={run.runId}
                  runId={run.runId}
                  startedAt={run.startedAt}
                  triggerKind={run.triggerKind}
                  triggerLabel={run.triggerLabel}
                  status={run.status}
                  durationMs={run.durationMs}
                  stepsCompleted={run.stepsCompleted}
                  stepsTotal={run.stepsTotal}
                  finalStepLabel={run.finalStepLabel}
                />
              ))}
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="scheduled-jobs-trace-title">
            <header className={styles.panelHead}>
              <div className={styles.panelHeadText}>
                <span className={styles.panelKicker}>What broke</span>
                <h2 id="scheduled-jobs-trace-title" className={styles.panelTitle}>
                  Failed run trace
                </h2>
              </div>
              <span className={styles.panelMeta}>Quote follow-up · 10:00am</span>
            </header>
            <RunTraceViewer
              runId="OFM-7714"
              title="Quote follow-up nudge · 10:00am"
              kicker="Run trace"
              totalDurationMs={TRACE_TOTAL_MS}
              spans={FAILED_RUN_TRACE}
              defaultExpanded
            />
          </section>
        </div>

        <aside className={styles.rail} aria-label="Trigger, upcoming runs and history">
          <section aria-label="Cron trigger config">
            <TriggerConfigCard
              title="Daily SEO audit"
              kicker="Cron trigger"
              kind="cron"
              config="0 6 * * *  ·  Australia/Sydney"
              lastFiredLabel="Today · 6:00am"
              invocations7d={7}
              samplePayload={CRON_SAMPLE_PAYLOAD}
              armed
            />
          </section>

          <section className={styles.railSection} aria-labelledby="scheduled-jobs-upcoming-title">
            <header className={styles.railHead}>
              <div className={styles.railHeadText}>
                <span className={styles.railKicker}>Next out the door</span>
                <h2 id="scheduled-jobs-upcoming-title" className={styles.railTitle}>
                  Upcoming runs
                </h2>
              </div>
              <span className={styles.railCount}>{UPCOMING_RUNS.length}</span>
            </header>
            <ol className={styles.upcomingList}>
              {UPCOMING_RUNS.map((run) => (
                <li
                  key={run.id}
                  className={styles.upcomingItem}
                  data-tone={run.tone}
                >
                  <span className={styles.upcomingDot} aria-hidden="true" />
                  <div className={styles.upcomingBody}>
                    <span className={styles.upcomingName}>{run.name}</span>
                    <span className={styles.upcomingCadence}>{run.cadence}</span>
                  </div>
                  <time className={styles.upcomingWhen}>{run.when}</time>
                </li>
              ))}
            </ol>
          </section>

          <AuditTrailRail
            kicker="Schedule changes"
            title="Audit trail"
            entries={AUDIT_ENTRIES}
          />
        </aside>
      </div>

      {/* ---- Template library: switch-on-next automations -------------- */}
      <TemplateLibraryGrid
        kicker="Switch on next"
        title="Automation templates"
        templates={JOB_TEMPLATES}
      />

      <p className={styles.note}>
        One server-rendered screen composed entirely from existing primitives — the data table,
        status badges, metric strip, run-history rows, the gantt run-trace viewer, the cron
        trigger card, audit-trail rail and template library grid. Realistic Oak Flats Muffler Men
        demo data; enable/disable toggles are local UI state. Light + dark, responsive, accessible
        end to end.
      </p>
    </main>
  )
}
