import { GaugeCluster } from "../charts/gauge-cluster"
import { Sparkline } from "../charts/sparkline"
import { KanbanBoard } from "../data-display/kanban-board"
import { NotificationInbox } from "../data-display/notification-inbox"
import { ChannelMatrix } from "../notifications/channel-matrix"
import type { KanbanColumn } from "../data-display/kanban-board"
import type { NotificationItem } from "../data-display/notification-inbox"
import type {
  ChannelMatrixChannel,
  ChannelMatrixRow,
  ChannelMatrixValue,
} from "../notifications/channel-matrix"

import { DashboardShell } from "./dashboard-shell"
import { DashboardTile } from "./dashboard-tile"
import styles from "./hermes-operator-dashboard.module.css"

const CAMPAIGNS: ReadonlyArray<KanbanColumn> = [
  {
    stage: "backlog",
    title: "Briefed",
    cards: [
      {
        id: "c-1",
        code: "CAMP-014",
        title: "Mid-winter exhaust audit",
        sub: "Brief signed 27 May",
        priority: "low",
        tags: ["Workshop", "FB+IG"],
        due: "Jun 10",
      },
      {
        id: "c-2",
        code: "CAMP-015",
        title: "Twin-loop launch teaser",
        sub: "Awaiting product photography",
        priority: "med",
        tags: ["Reels", "IG"],
        due: "Jun 18",
      },
    ],
  },
  {
    stage: "progress",
    title: "In flight",
    cards: [
      {
        id: "c-3",
        code: "CAMP-012",
        title: "Mate-rate Tuesday · weekly drumbeat",
        sub: "Weeks 21–28 · 8 posts shipped",
        priority: "high",
        tags: ["Weekly", "IG+TT"],
        assignees: [{ name: "Iris H." }, { name: "Petra I." }],
        due: "Jul 28",
      },
      {
        id: "c-4",
        code: "CAMP-013",
        title: "Wollongong meet activation",
        sub: "Geo-targeted, 25km radius",
        priority: "high",
        tags: ["Event", "Paid"],
        assignees: [{ name: "Marcia O." }],
        due: "Jun 02",
      },
    ],
  },
  {
    stage: "review",
    title: "Measuring",
    cards: [
      {
        id: "c-5",
        code: "CAMP-009",
        title: "Subaru testimonial spread",
        sub: "Week 4 measurement window",
        priority: "med",
        tags: ["UGC", "YT+IG"],
        due: "Jun 04",
      },
    ],
  },
  {
    stage: "done",
    title: "Wrapped",
    cards: [
      {
        id: "c-6",
        code: "CAMP-008",
        title: "Anzac long weekend boost",
        sub: "Closed +18% conversions",
        priority: "low",
        tags: ["Seasonal"],
      },
      {
        id: "c-7",
        code: "CAMP-007",
        title: "Open-shop tour kickoff",
        sub: "ROI 4.2× spend",
        priority: "low",
        tags: ["Event"],
      },
    ],
  },
]

const ALERTS: ReadonlyArray<NotificationItem> = [
  {
    id: "ha-1",
    title: "Webhook failing — TikTok ingest",
    sub: "5 retries exhausted. Manual reconnect required.",
    timestamp: "8 min ago",
    source: "Hermes runtime",
    tone: "error",
    unread: true,
  },
  {
    id: "ha-2",
    title: "Approval requested — Wollongong meet creative",
    sub: "Awaiting workshop sign-off · 4h SLA",
    timestamp: "26 min ago",
    source: "Workflow",
    tone: "warn",
    unread: true,
    mention: true,
  },
  {
    id: "ha-3",
    title: "Engagement spike — IG reel",
    sub: "Twin-loop dyno reel pacing 2.4× baseline.",
    timestamp: "1h ago",
    source: "Analytics",
    tone: "success",
    unread: true,
  },
  {
    id: "ha-4",
    title: "Token rotation complete — IG business",
    sub: "Refreshed @oakflatsmufflermen credential.",
    timestamp: "3h ago",
    source: "OAuth",
    tone: "info",
  },
]

const CHANNEL_ROWS: ReadonlyArray<ChannelMatrixRow> = [
  { id: "delivery-fail", label: "Delivery failure" },
  { id: "approval", label: "Approval required" },
  { id: "spike", label: "Engagement spike" },
  { id: "token-rotate", label: "Token rotated" },
]

const CHANNEL_CHANNELS: ReadonlyArray<ChannelMatrixChannel> = [
  { id: "inapp", label: "In-app" },
  { id: "email", label: "Email" },
  { id: "slack", label: "Slack" },
  { id: "sms", label: "SMS" },
]

const CHANNEL_VALUE: ChannelMatrixValue = {
  "delivery-fail": { inapp: true, email: true, slack: true, sms: true, push: false },
  approval: { inapp: true, email: true, slack: true, sms: false, push: false },
  spike: { inapp: true, email: false, slack: true, sms: false, push: false },
  "token-rotate": { inapp: true, email: true, slack: false, sms: false, push: false },
}

const REACH_TREND = [38, 42, 36, 51, 48, 56, 62, 58, 67, 74, 71, 82]

export function HermesOperatorDashboard() {
  return (
    <div className={styles.surface}>
      <DashboardShell
        kicker="Hermes / Operator cockpit"
        title="Hermes ops"
        subtitle="The campaign factory floor — what is shipping, what just broke, and how the rails are feeling."
        toolbar={<span>Operator · Jonah K.</span>}
        ariaLabel="Hermes operator cockpit dashboard"
        density="comfortable"
        columns={1}
      >
        <DashboardTile label="Active campaigns" aside="7 in flight" span={1} tone="amber">
          <KanbanBoard columns={CAMPAIGNS} />
        </DashboardTile>
      </DashboardShell>

      <div className={styles.row}>
        <DashboardTile label="Alerts inbox" aside="3 unread" tone="red">
          <NotificationInbox items={ALERTS} defaultFilter="unread" />
        </DashboardTile>

        <DashboardTile label="Reach trend" aside="Last 12 days" tone="teal">
          <div className={styles.reachRow}>
            <span className={styles.reachValue}>184k</span>
            <span className={styles.reachMeta}>+14.2% w/w · all channels</span>
          </div>
          <Sparkline
            points={[...REACH_TREND]}
            tone="teal"
            area
            width={280}
            height={88}
            ariaLabel="Reach trend over the last 12 days"
          />
        </DashboardTile>
      </div>

      <DashboardShell
        kicker="Health & routing"
        title="The plumbing"
        ariaLabel="Hermes infrastructure health"
        density="comfortable"
        columns={2}
      >
        <DashboardTile label="Supplier-channel health" aside="3 endpoints" tone="green">
          <GaugeCluster
            gauges={[
              { label: "IG Graph", value: 96, tone: "green", unit: "%" },
              { label: "TikTok", value: 72, tone: "amber", unit: "%" },
              { label: "FB Marketing", value: 88, tone: "teal", unit: "%" },
            ]}
            kicker="Channel uptime · 24h"
            scaleLabels={["Degraded", "Stable", "Healthy"]}
            ariaLabel="Channel endpoint health, 24-hour rolling"
          />
        </DashboardTile>

        <DashboardTile label="Alert routing" aside="Ops policy" tone="amber">
          <div className={styles.matrixWrap}>
            <ChannelMatrix
              rows={CHANNEL_ROWS}
              channels={CHANNEL_CHANNELS}
              defaultValue={CHANNEL_VALUE}
              legend="Operator alert routing"
            />
          </div>
        </DashboardTile>
      </DashboardShell>
    </div>
  )
}

export default HermesOperatorDashboard
