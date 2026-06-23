import type { Metadata } from "next"

import {
  ActivityFeedRow,
  CommandPalette,
  DailySummaryCard,
  FeatureSpotlightCard,
  KpiTile,
  QuickActionGrid,
  QuickGlanceRow,
  RoleSwitcher,
  SystemStatusBanner,
  SystemTourLauncher,
  TeamPulseStrip,
  TenantSwitcher,
  WeeklyBriefingCard,
} from "../../components/admin-hub"
import { FadeIn } from "../../components/motion"
import { PageHeader } from "../../components/page-header"
import { DemoPinnedBoard } from "../pinned-board/pinned-board-demo"

import {
  ACTIVITY_ROWS,
  ADMIN_ROLES,
  ADMIN_TOUR,
  ADMIN_USER_DANIEL,
  COMMAND_ENTRIES,
  COMMAND_RECENTS,
  COMMAND_SUGGESTIONS,
  DAILY_SUMMARY,
  FEATURE_SPOTLIGHT,
  GLANCE_METRICS,
  KPI_BOOKINGS,
  KPI_HERMES_CHATS,
  KPI_LEADS,
  KPI_NPS,
  KPI_REVENUE,
  KPI_UPTIME,
  PINNED_WIDGETS,
  QUICK_ACTIONS,
  STATUS_DEGRADED,
  TEAM_PULSE,
  TENANTS,
  WEEKLY_BRIEFING,
} from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Full control hub | Admin hub",
  description:
    "Composition — the Oak Flats Mufflermen control room, assembled from all 14 admin-hub primitives. KPIs, quick actions, system status, command palette, activity feed, role and tenant switchers, weekly briefing, team pulse, glance strip, tour, spotlight and daily summary in one cockpit.",
}

const COMPOSED_KPIS = [
  KPI_REVENUE,
  KPI_BOOKINGS,
  KPI_LEADS,
  KPI_NPS,
  KPI_UPTIME,
  KPI_HERMES_CHATS,
]

export default function FullControlHubScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Live admin control hub"
        title="Mufflermen control hub"
        description="The composed cockpit Daniel sees when he logs in — workspace + role switchers, system status, quick-glance strip, KPI grid, quick actions, command palette, activity feed, weekly briefing, team pulse, daily summary, system tour, and the v2.6 feature spotlight. All 14 admin-hub primitives wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Full control" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composition · 14 primitives</span>

        <FadeIn>
          <div className={styles.cockpit}>
            <header className={styles.cockpitTopBar}>
              <TenantSwitcher tenants={TENANTS} activeTenantId="tenant-ofm" />
              <RoleSwitcher user={ADMIN_USER_DANIEL} roles={ADMIN_ROLES} />
            </header>

            <div className={styles.cockpitStatus}>
              <SystemStatusBanner status={STATUS_DEGRADED} />
            </div>

            <div className={styles.cockpitGlance}>
              <QuickGlanceRow metrics={GLANCE_METRICS} />
            </div>

            <div className={styles.cockpitKpis}>
              {COMPOSED_KPIS.map((kpi) => (
                <KpiTile key={kpi.id} kpi={kpi} />
              ))}
            </div>

            <aside className={styles.cockpitRail}>
              <QuickActionGrid actions={QUICK_ACTIONS} />
              <SystemTourLauncher tour={ADMIN_TOUR} />
              <TeamPulseStrip members={TEAM_PULSE} />
            </aside>

            <div className={styles.cockpitCanvas}>
              <CommandPalette
                commands={COMMAND_ENTRIES}
                recents={COMMAND_RECENTS}
                suggestions={COMMAND_SUGGESTIONS}
                open
                bindShortcut={false}
              />
              <WeeklyBriefingCard briefing={WEEKLY_BRIEFING} />
              <DemoPinnedBoard
                widgets={PINNED_WIDGETS}
                activityRows={2}
                teamPulseMembers={4}
                includeDailySummary
              />
            </div>

            <aside className={styles.cockpitAside}>
              <FeatureSpotlightCard spotlight={FEATURE_SPOTLIGHT} />
              <DailySummaryCard summary={DAILY_SUMMARY} />
              <section
                style={{
                  display: "grid",
                  gap: "var(--primitive-space-2-5)",
                  padding: "var(--primitive-space-4)",
                  border: "1px solid var(--primitive-line)",
                  borderRadius: "var(--primitive-radius-lg)",
                  background: "var(--primitive-panel)",
                }}
                aria-label="Recent activity"
              >
                <span
                  style={{
                    fontFamily: "var(--primitive-font-mono)",
                    fontSize: "var(--primitive-text-xs)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--primitive-text-strong)",
                  }}
                >
                  Recent activity
                </span>
                {ACTIVITY_ROWS.slice(0, 5).map((row) => (
                  <ActivityFeedRow key={row.id} row={row} />
                ))}
              </section>
            </aside>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
