import { BarChart } from "../charts/bar-chart"
import { RadialMeter } from "../charts/radial-meter"
import { ActivityFeed } from "../data-display/activity-feed"
import { ChannelMatrix } from "../notifications/channel-matrix"
import { StatCounterRow } from "../marketing/stat-counter-row"
import { JobBoard } from "../workshop-scenes/job-board"
import type { KanbanColumn } from "../data-display/kanban-board"
import type { ActivityFeedItem } from "../data-display/activity-feed"
import type {
  ChannelMatrixChannel,
  ChannelMatrixRow,
  ChannelMatrixValue,
} from "../notifications/channel-matrix"

import { DashboardShell } from "./dashboard-shell"
import { DashboardTile } from "./dashboard-tile"
import styles from "./workshop-manager-dashboard.module.css"

const STAT_ENTRIES = [
  {
    id: "jobs",
    label: "Today's jobs",
    value: 18,
    suffix: " open",
    tone: "red" as const,
    body: "4 in the bay, 9 on rack, 5 awaiting parts.",
  },
  {
    id: "revenue",
    label: "Revenue posted",
    value: 12480,
    prefix: "$",
    tone: "amber" as const,
    body: "Through 14:20 — pace +18% vs Tuesday.",
  },
  {
    id: "bays",
    label: "Bays in use",
    value: 4,
    suffix: " / 6",
    tone: "teal" as const,
    body: "Bay 5 down for compressor service.",
  },
  {
    id: "cycle",
    label: "Avg cycle",
    value: 3.4,
    suffix: " hr",
    decimals: 1,
    tone: "green" as const,
    body: "Within target band 3.0–4.2h.",
  },
]

const KANBAN: ReadonlyArray<KanbanColumn> = [
  {
    stage: "backlog",
    title: "Quote accepted",
    cards: [
      {
        id: "jb-101",
        code: "JOB-2026-0418",
        title: "VE Commodore — twin 2.5\" cat-back",
        sub: "Booked Thu 09:30",
        priority: "med",
        tags: ["Sedan", "S2"],
        due: "Thu 09:30",
        assignees: [{ name: "Iris H." }],
      },
      {
        id: "jb-102",
        code: "JOB-2026-0419",
        title: "Ranger PX3 — DPF delete, ECU re-flash",
        sub: "Customer awaiting call",
        priority: "high",
        tags: ["4WD", "Diesel"],
        due: "Fri 08:00",
        assignees: [{ name: "Jonah K." }],
      },
    ],
  },
  {
    stage: "progress",
    title: "On the rack",
    cards: [
      {
        id: "jb-103",
        code: "JOB-2026-0411",
        title: "WRX STI — turbo-back, downpipe gasket",
        sub: "Bay 1 · 2.5h consumed of 4h",
        priority: "high",
        tags: ["Subaru", "Performance"],
        assignees: [{ name: "Iris H." }, { name: "Mateo R." }],
        due: "Today 16:00",
      },
      {
        id: "jb-104",
        code: "JOB-2026-0414",
        title: "Hilux GUN126 — DPF clean & cat",
        sub: "Bay 3 · 1h consumed",
        priority: "med",
        tags: ["4WD", "Diesel"],
        assignees: [{ name: "Mateo R." }],
        due: "Today 17:30",
      },
    ],
  },
  {
    stage: "review",
    title: "Quality check",
    cards: [
      {
        id: "jb-105",
        code: "JOB-2026-0407",
        title: "BT-50 — full system + flex pipe",
        sub: "Sound check pending",
        priority: "med",
        tags: ["Ute"],
        assignees: [{ name: "Iris H." }],
      },
    ],
  },
  {
    stage: "done",
    title: "Handover",
    cards: [
      {
        id: "jb-106",
        code: "JOB-2026-0401",
        title: "Pajero NX — straight pipe, recoded",
        sub: "Photos + sound clip ready",
        priority: "low",
        tags: ["4WD"],
        assignees: [{ name: "Jonah K." }],
      },
      {
        id: "jb-107",
        code: "JOB-2026-0402",
        title: "Mustang GT — quad tip, weld correction",
        sub: "Awaiting EFT confirmation",
        priority: "low",
        tags: ["Performance"],
        assignees: [{ name: "Mateo R." }],
      },
    ],
  },
]

const ACTIVITY: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "a-01",
    title: "Iris signed off JOB-2026-0401",
    description: "Sound clip uploaded — handover pack ready for Brett.",
    timestamp: "12 min ago",
    tone: "success",
    actor: { name: "Iris Hawke" },
  },
  {
    id: "a-02",
    title: "Parts delayed — Ranger DPF unit",
    description: "Supplier ETA pushed to Fri AM. Quoted alt sourced Magnaflow.",
    timestamp: "38 min ago",
    tone: "warn",
    actor: { name: "Jonah Keene" },
  },
  {
    id: "a-03",
    title: "Bay 5 compressor service complete",
    description: "Tagged back online, pressure test PASS @ 138psi.",
    timestamp: "1h ago",
    tone: "info",
    actor: { name: "Mateo Reyes" },
  },
  {
    id: "a-04",
    title: "Weld inspection failed — JOB-2026-0407",
    description: "Hairline gap on Y-pipe. Re-tacked, ready for re-check.",
    timestamp: "2h ago",
    tone: "error",
    actor: { name: "Iris Hawke" },
  },
]

const REVENUE_LABELS = ["Tue", "Wed", "Thu", "Fri", "Sat", "Mon", "Tue"]
const REVENUE_SERIES = [
  { label: "Revenue", values: [9420, 11_280, 10_460, 13_840, 6420, 0, 12_480], tone: "amber" as const },
]

const CHANNEL_ROWS: ReadonlyArray<ChannelMatrixRow> = [
  { id: "parts-late", label: "Parts late" },
  { id: "bay-down", label: "Bay down" },
  { id: "handover", label: "Handover ready" },
]

const CHANNEL_CHANNELS: ReadonlyArray<ChannelMatrixChannel> = [
  { id: "inapp", label: "In-app" },
  { id: "sms", label: "SMS" },
  { id: "email", label: "Email" },
]

const CHANNEL_VALUE: ChannelMatrixValue = {
  "parts-late": { email: true, inapp: true, sms: true, push: false, slack: false },
  "bay-down": { email: false, inapp: true, sms: true, push: false, slack: false },
  "handover": { email: true, inapp: true, sms: false, push: false, slack: false },
}

export function WorkshopManagerDashboard() {
  return (
    <div className={styles.surface}>
      <DashboardShell
        kicker="Workshop manager / Today"
        title="Today at Oak Flats"
        subtitle="Live operational view across all bays — jobs flow, revenue pace, technician utilization, and the alerts you need to act on before close."
        toolbar={<span>Auto-refresh · 30s</span>}
        ariaLabel="Workshop manager persona dashboard"
        density="comfortable"
        columns={4}
        footer={<span>Last sync · 14:20:38 AEST · Bay 5 maintenance scheduled tonight</span>}
      >
        <DashboardTile label="Today at the bays" span={4} tone="red">
          <StatCounterRow entries={STAT_ENTRIES} />
        </DashboardTile>
      </DashboardShell>

      <div className={styles.boardRow}>
        <DashboardTile label="Job board" aside="Live" span={1} tone="amber">
          <JobBoard
            columns={KANBAN}
            title="Job flow"
            subhead="Cards advance left to right — drag is non-interactive in this primitive mirror."
          />
        </DashboardTile>

        <DashboardTile label="Activity feed" aside="Live" span={1} tone="teal">
          <ActivityFeed items={ACTIVITY} ariaLabel="Workshop activity stream" />
        </DashboardTile>
      </div>

      <DashboardShell
        kicker="Performance / Pulse"
        title="Workshop pulse"
        subtitle="Utilization, alert routing, and the rolling 7-day revenue curve."
        ariaLabel="Workshop manager performance section"
        density="comfortable"
        columns={3}
      >
        <DashboardTile label="Bay utilization" aside="14:20" tone="green">
          <div className={styles.gaugePair}>
            <RadialMeter
              value={68}
              label="Today"
              tone="green"
              ariaLabel="Workshop utilization 68 percent today"
              size={128}
              caption="Target band 60–80%"
            />
            <RadialMeter
              value={74}
              label="7-day"
              tone="amber"
              ariaLabel="Workshop utilization 74 percent rolling 7 days"
              size={128}
              caption="Slightly above target"
            />
          </div>
        </DashboardTile>

        <DashboardTile label="Alert routing" aside="Preferences" tone="teal">
          <div className={styles.matrixWrap}>
            <ChannelMatrix
              rows={CHANNEL_ROWS}
              channels={CHANNEL_CHANNELS}
              defaultValue={CHANNEL_VALUE}
              legend="Manager alert channels"
            />
          </div>
        </DashboardTile>

        <DashboardTile label="Revenue · 7d" aside="AUD" tone="amber">
          <BarChart
            series={REVENUE_SERIES}
            xLabels={REVENUE_LABELS}
            mode="grouped"
            height={180}
            unit=""
            ariaLabel="Workshop revenue last 7 trading days"
          />
        </DashboardTile>
      </DashboardShell>
    </div>
  )
}

export default WorkshopManagerDashboard
