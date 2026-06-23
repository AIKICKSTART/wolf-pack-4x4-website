"use client"

import type { ReactNode } from "react"

import {
  ActivityFeedRow,
  DailySummaryCard,
  KpiTile,
  PinnedBoard,
  TeamPulseStrip,
} from "../../components/admin-hub"
import type { PinnedWidget } from "../../components/admin-hub"
import {
  ACTIVITY_ROWS,
  DAILY_SUMMARY,
  KPI_REVENUE,
  TEAM_PULSE,
} from "../_mock-data"

interface DemoPinnedBoardProps {
  widgets: ReadonlyArray<PinnedWidget>
  title?: string
  activityRows?: number
  teamPulseMembers?: number
  includeDailySummary?: boolean
}

export function DemoPinnedBoard({
  widgets,
  title,
  activityRows = 3,
  teamPulseMembers = 6,
  includeDailySummary = false,
}: DemoPinnedBoardProps) {
  function renderWidget(widget: PinnedWidget): ReactNode {
    switch (widget.kind) {
      case "kpi":
        return <KpiTile kpi={KPI_REVENUE} />
      case "activity":
        return (
          <div style={{ display: "grid", gap: "var(--primitive-space-2)" }}>
            {ACTIVITY_ROWS.slice(0, activityRows).map((row) => (
              <ActivityFeedRow key={row.id} row={row} />
            ))}
          </div>
        )
      case "team-pulse":
        return <TeamPulseStrip members={TEAM_PULSE.slice(0, teamPulseMembers)} title="Pulse" />
      case "daily-summary":
        return includeDailySummary ? <DailySummaryCard summary={DAILY_SUMMARY} /> : null
      default:
        return null
    }
  }

  return <PinnedBoard widgets={widgets} title={title} renderWidget={renderWidget} />
}
