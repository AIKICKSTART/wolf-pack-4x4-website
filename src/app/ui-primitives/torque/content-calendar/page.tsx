import type { Metadata } from "next"
import { Activity, KanbanSquare } from "lucide-react"

import { CalendarMonthView } from "../../components/calendar"
import { ActivityFeed, KanbanBoard, MetricBlock } from "../../components/data-display"
import { PageHeader } from "../../components/page-header"

import {
  CalendarHeaderBand,
  CampaignFilterBar,
  ChannelLegend,
  PendingRail,
  StatusLegend,
} from "./_components"
import {
  CALENDAR_ACTIVITY,
  CALENDAR_ITEMS,
  CALENDAR_MONTH_LABEL,
  CALENDAR_REFERENCE,
  CALENDAR_TODAY,
  CAMPAIGN_FILTERS,
  CHANNELS,
  MARKETING_METRICS,
  PENDING_ITEMS,
  PIPELINE_COLUMNS,
  POSTURE_STATS,
  STATUS_BADGES,
} from "./_demo-data"
import styles from "./content-calendar.module.css"

export const metadata: Metadata = {
  title: "Marketing content calendar | Torque",
  description:
    "The Oak Flats Muffler Men monthly marketing plan — blog, social, email and cross-channel campaigns mapped across a month grid with channel + status chips, an approval-pending rail and a content pipeline. Composed entirely from UI primitives.",
}

export default function ContentCalendarPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Marketing content calendar"
        title="Marketing content calendar"
        description="The marketing planning hub — broader than social. Blog posts, social cuts, email sends and cross-channel campaigns all sit in one month grid, each tagged with its channel and status. A side rail holds everything waiting on your approval and tracks the latest activity, while the pipeline board shows what's moving from idea to live. Light + dark, responsive, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Marketing content calendar" },
        ]}
      />

      <CalendarHeaderBand stats={POSTURE_STATS} />

      <section aria-label="Marketing figures this month" className={styles.metricFrame}>
        <MetricBlock metrics={MARKETING_METRICS} />
      </section>

      <div className={styles.layout}>
        <section className={styles.boardFrame} aria-labelledby="content-calendar-grid-title">
          <header className={styles.boardHead}>
            <span className={styles.boardHeadText}>
              <span className={styles.boardKicker}>Plan · {CALENDAR_MONTH_LABEL} 2026</span>
              <h2 id="content-calendar-grid-title" className={styles.boardTitle}>
                The month at a glance
              </h2>
            </span>
            <CampaignFilterBar options={CAMPAIGN_FILTERS} />
          </header>

          <CalendarMonthView
            reference={CALENDAR_REFERENCE}
            today={CALENDAR_TODAY}
            events={CALENDAR_ITEMS}
            caption={`${CALENDAR_MONTH_LABEL} 2026 · all channels`}
            weekStartsOn={1}
            className={styles.monthView}
          />

          <div className={styles.legends}>
            <ChannelLegend channels={CHANNELS} />
            <StatusLegend badges={STATUS_BADGES} />
          </div>
        </section>

        <aside className={styles.rail} aria-label="Approvals and activity">
          <PendingRail items={PENDING_ITEMS} />

          <section className={styles.railSection} aria-labelledby="content-calendar-activity-title">
            <header className={styles.railHead}>
              <span className={styles.railIcon} aria-hidden="true">
                <Activity size={15} strokeWidth={2.2} />
              </span>
              <span className={styles.railHeadText}>
                <span className={styles.railKicker}>What just happened</span>
                <h2 id="content-calendar-activity-title" className={styles.railTitle}>
                  Recent activity
                </h2>
              </span>
            </header>
            <ActivityFeed items={CALENDAR_ACTIVITY} ariaLabel="Recent calendar activity" />
          </section>
        </aside>
      </div>

      <section className={styles.pipelineFrame} aria-labelledby="content-calendar-pipeline-title">
        <header className={styles.pipelineHead}>
          <span className={styles.railIcon} aria-hidden="true">
            <KanbanSquare size={15} strokeWidth={2.2} />
          </span>
          <span className={styles.railHeadText}>
            <span className={styles.boardKicker}>Idea → live</span>
            <h2 id="content-calendar-pipeline-title" className={styles.boardTitle}>
              Content pipeline
            </h2>
          </span>
        </header>
        <KanbanBoard columns={PIPELINE_COLUMNS} className={styles.pipelineBoard} />
      </section>
    </main>
  )
}
