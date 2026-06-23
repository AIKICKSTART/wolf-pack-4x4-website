import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { ActivityFeed } from "@/app/ui-primitives/components/data-display/activity-feed"
import { KanbanBoard } from "@/app/ui-primitives/components/data-display/kanban-board"
import { LiveCounterCard } from "@/app/ui-primitives/components/data-display/live-counter-card"
import { MetricBlock } from "@/app/ui-primitives/components/data-display/metric-block"
import { StatusBadge } from "@/app/ui-primitives/components/data-display/status-badge-grid"
import { CostBudgetPanel } from "@/app/ui-primitives/components/hermes-agent/cost-budget-panel"
import { RunTimeline } from "@/app/ui-primitives/components/hermes-agent/run-timeline"

import styles from "./agent-activity.module.css"
import {
  ACTIVITY_ITEMS,
  BUDGET,
  HEADLINE_METRICS,
  HOURLY_SPEND_CENTS,
  RUN_COST_CENTS,
  RUN_DURATION_MS,
  RUN_STEPS,
  RUN_TOKEN_TOTAL,
  STATUS_CHIPS,
  TASK_COLUMNS,
  THROUGHPUT_POINTS,
} from "./_demo-data"

export const metadata: Metadata = {
  title: "Torque activity & run feed | UI Primitives — Torque",
}

export default function TorqueAgentActivityPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Torque.00 / Activity & run feed"
        title="Torque — live activity & run feed"
        description="Watch Torque, your Oak Flats Muffler Men business assistant, work the front desk in real time: every enquiry it answers, every quote it drafts, and every bay booking it pencils in across the Illawarra workshop — with a live run trace, in-progress job board, and the day's running cost."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque" },
          { label: "Activity & run feed" },
        ]}
      />

      <div className={styles.canvas}>
        <section className={styles.hero} aria-labelledby="torque-hero-heading">
          <div className={styles.heroIdentity}>
            {/* Placeholder Torque avatar — the real mascot lands later. */}
            <span className={styles.avatar} aria-hidden="true">
              T
            </span>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Your Mufflermen business assistant</span>
              <h2 id="torque-hero-heading" className={styles.heroTitle}>
                Torque is on the tools
              </h2>
              <p className={styles.heroSub}>
                Answering customers, pricing exhausts, and holding bays — Oak Flats
                Muffler Men, Illawarra NSW. Owner sign-off stays with the workshop.
              </p>
            </div>
          </div>
          <div className={styles.heroStatus} role="status" aria-label="Torque status">
            {STATUS_CHIPS.map((chip) => (
              <StatusBadge
                key={chip.label}
                tone={chip.tone}
                size="md"
                shape="pill"
                label={chip.label}
              />
            ))}
          </div>
        </section>

        <section className={styles.metricStrip} aria-label="Today's headline figures">
          <MetricBlock metrics={HEADLINE_METRICS} />
        </section>

        <div className={styles.layout}>
          <div className={styles.column}>
            <section className={styles.panel} aria-labelledby="torque-run-heading">
              <header className={styles.panelHead}>
                <h2 id="torque-run-heading" className={styles.panelTitle}>
                  Live run trace
                </h2>
                <span className={styles.panelMeta}>What Torque is doing right now</span>
              </header>
              <RunTimeline
                runId="OFM-3417"
                customerName="Hilux owner · Dapto"
                steps={RUN_STEPS}
                tokenTotal={RUN_TOKEN_TOTAL}
                costCents={RUN_COST_CENTS}
                totalDurationMs={RUN_DURATION_MS}
              />
            </section>

            <section className={styles.panel} aria-labelledby="torque-board-heading">
              <header className={styles.panelHead}>
                <h2 id="torque-board-heading" className={styles.panelTitle}>
                  In-progress work
                </h2>
                <span className={styles.panelMeta}>Jobs Torque is shepherding</span>
              </header>
              <div className={styles.boardScroll}>
                <KanbanBoard columns={TASK_COLUMNS} />
              </div>
            </section>
          </div>

          <div className={styles.column}>
            <section className={styles.panel} aria-labelledby="torque-feed-heading">
              <header className={styles.panelHead}>
                <h2 id="torque-feed-heading" className={styles.panelTitle}>
                  Activity feed
                </h2>
                <span className={styles.panelMeta}>This morning</span>
              </header>
              <div className={styles.feedScroll}>
                <ActivityFeed items={ACTIVITY_ITEMS} ariaLabel="Torque activity feed" />
              </div>
            </section>

            <LiveCounterCard
              label="Conversations handled"
              value={148}
              subhead="Across web chat, SMS and Messenger today"
              sparkPoints={THROUGHPUT_POINTS}
              sparkTone="teal"
              meta="Median first reply · 11s"
              source="Oak Flats · all channels"
            />

            <section aria-label="Cost and budget">
              <CostBudgetPanel
                windowLabel={BUDGET.windowLabel}
                spentCents={BUDGET.spentCents}
                budgetCents={BUDGET.budgetCents}
                projectedCents={BUDGET.projectedCents}
                tokensUsed={BUDGET.tokensUsed}
                costPerConversationCents={BUDGET.costPerConversationCents}
                hourlyCents={HOURLY_SPEND_CENTS}
              />
            </section>
          </div>
        </div>

        <div className={styles.note}>
          <span>Composition notes</span>
          <p>
            One server-rendered screen composed entirely from existing primitives —
            run timeline, activity feed, kanban, live counter, metric strip, status
            badges and the cost/budget panel. Realistic Oak Flats Muffler Men demo
            data; light + dark, responsive, and accessible end to end.
          </p>
        </div>
      </div>
    </main>
  )
}
