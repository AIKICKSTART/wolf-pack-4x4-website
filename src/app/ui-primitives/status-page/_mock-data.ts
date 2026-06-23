/* Shared mock data used across the status-page sub-routes + full-status-page. */

import type {
  ActiveAlertEntry,
  IncidentSeverity,
  IncidentStage,
  PostmortemActionItem,
  RegionStatusEntry,
  ServiceEdge,
  ServiceNode,
  ServiceStatus,
  StatusHistoryEntry,
  SyntheticRegionTrack,
  UptimeDay,
} from "../components/status-page"

function makeUptimeDays(
  base: number,
  status: ServiceStatus,
  dipDays: ReadonlyArray<{ index: number; status: ServiceStatus; uptime: number }> = [],
): ReadonlyArray<UptimeDay> {
  const today = new Date("2026-05-28T00:00:00Z")
  const dipMap = new Map<number, { status: ServiceStatus; uptime: number }>()
  dipDays.forEach((d) => dipMap.set(d.index, { status: d.status, uptime: d.uptime }))
  const days: UptimeDay[] = []
  for (let i = 89; i >= 0; i -= 1) {
    const date = new Date(today.getTime() - i * 86_400_000)
    const iso = date.toISOString().slice(0, 10)
    const idx = 89 - i
    const dip = dipMap.get(idx)
    if (dip) {
      days.push({ date: iso, status: dip.status, uptime: dip.uptime })
    } else {
      days.push({ date: iso, status, uptime: base })
    }
  }
  return days
}

export const QUOTE_ENGINE_DAYS = makeUptimeDays(0.9999, "operational", [
  { index: 71, status: "degraded", uptime: 0.962 },
  { index: 72, status: "partial-outage", uptime: 0.812 },
])

export const PARTS_CATALOGUE_DAYS = makeUptimeDays(0.9998, "operational", [
  { index: 40, status: "degraded", uptime: 0.95 },
  { index: 86, status: "maintenance", uptime: 0.98 },
])

export const WORKSHOP_SCHEDULER_DAYS = makeUptimeDays(0.9999, "operational", [
  { index: 12, status: "degraded", uptime: 0.93 },
])

export const SMS_DAYS = makeUptimeDays(0.999, "degraded", [
  { index: 87, status: "partial-outage", uptime: 0.78 },
  { index: 88, status: "degraded", uptime: 0.94 },
  { index: 89, status: "degraded", uptime: 0.96 },
])

export const PAYMENT_DAYS = makeUptimeDays(0.9999, "operational", [
  { index: 60, status: "maintenance", uptime: 0.99 },
])

export const REGION_ENTRIES: ReadonlyArray<RegionStatusEntry> = [
  { region: "au-east-1", status: "operational", latencyMs: 38, meta: "12 services" },
  { region: "au-west-1", status: "operational", latencyMs: 54, meta: "11 services" },
  { region: "us-east-1", status: "degraded", latencyMs: 184, meta: "12 services" },
  { region: "us-west-1", status: "operational", latencyMs: 162, meta: "12 services" },
  { region: "eu-central-1", status: "operational", latencyMs: 248, meta: "10 services" },
  { region: "apac-1", status: "partial-outage", latencyMs: 612, meta: "8 services" },
]

export interface IncidentSeed {
  title: string
  severity: IncidentSeverity
  currentStage: IncidentStage
  scope: ReadonlyArray<string>
  startedAt: string
  updates: ReadonlyArray<{ stage: IncidentStage; time: string; message: string }>
  subscribeHref: string
}

export const SMS_INCIDENT: IncidentSeed = {
  title: "Customer SMS delivery delays in APAC-1",
  severity: "sev2",
  currentStage: "monitoring",
  scope: ["Customer SMS", "APAC-1", "Booking confirmations"],
  startedAt: "27 May · 18:42 AEST",
  subscribeHref: "/ui-primitives/status-page/subscribe-updates-input",
  updates: [
    {
      stage: "investigating",
      time: "18:42 AEST",
      message: "Elevated 5xx rate from APAC SMS partner. Engineers paged.",
    },
    {
      stage: "identified",
      time: "19:01 AEST",
      message: "Upstream carrier routing failover triggered queue backlog of 14k messages.",
    },
    {
      stage: "monitoring",
      time: "19:34 AEST",
      message: "Failover stabilised. Backlog draining at 480 msg/min. Watching error rate.",
    },
  ],
}

export const SERVICE_MAP_NODES: ReadonlyArray<ServiceNode> = [
  { id: "edge", label: "Edge", status: "operational", x: 20, y: 28 },
  { id: "quote", label: "Quote engine", status: "operational", x: 50, y: 28 },
  { id: "parts", label: "Parts catalogue", status: "operational", x: 80, y: 22 },
  { id: "scheduler", label: "Workshop scheduler", status: "operational", x: 50, y: 56 },
  { id: "sms", label: "Customer SMS", status: "degraded", x: 80, y: 56 },
  { id: "payments", label: "Payment gateway", status: "operational", x: 50, y: 80 },
  { id: "warehouse", label: "Warehouse", status: "operational", x: 20, y: 80 },
]

export const SERVICE_MAP_EDGES: ReadonlyArray<ServiceEdge> = [
  { from: "edge", to: "quote", status: "operational" },
  { from: "quote", to: "parts", status: "operational" },
  { from: "quote", to: "scheduler", status: "operational" },
  { from: "scheduler", to: "sms", status: "degraded" },
  { from: "scheduler", to: "payments", status: "operational" },
  { from: "payments", to: "warehouse", status: "operational" },
  { from: "parts", to: "warehouse", status: "operational" },
]

function makeSparkline(count: number, base: number, dip?: number, dipAt?: number): ReadonlyArray<number> {
  const out: number[] = []
  for (let i = 0; i < count; i += 1) {
    if (dip !== undefined && dipAt !== undefined && Math.abs(i - dipAt) < 3) {
      const distance = Math.abs(i - dipAt)
      const factor = 1 - distance / 3
      out.push(base - (base - dip) * factor)
    } else {
      const wobble = (Math.sin(i / 2.3) + 1) * 0.012
      out.push(Math.min(1, base + wobble))
    }
  }
  return out
}

export const SPARKLINE_QUOTE = makeSparkline(24, 0.998)
export const SPARKLINE_PARTS = makeSparkline(24, 0.997, 0.95, 14)
export const SPARKLINE_SCHEDULER = makeSparkline(24, 0.999)
export const SPARKLINE_SMS = makeSparkline(24, 0.96, 0.78, 18)
export const SPARKLINE_PAYMENT = makeSparkline(24, 0.998)

export const STATUS_HISTORY: ReadonlyArray<StatusHistoryEntry> = [
  {
    id: "inc-2026-05-27",
    date: "2026-05-27",
    service: "Customer SMS",
    title: "SMS delivery delays in APAC-1",
    severity: "sev2",
    durationMinutes: 78,
    status: "resolved",
  },
  {
    id: "inc-2026-05-19",
    date: "2026-05-19",
    service: "Quote engine",
    title: "Pricing recompute timeouts on long bills of materials",
    severity: "sev3",
    durationMinutes: 32,
    status: "resolved",
  },
  {
    id: "inc-2026-05-12",
    date: "2026-05-12",
    service: "Parts catalogue",
    title: "Image CDN cache poisoning",
    severity: "sev2",
    durationMinutes: 96,
    status: "resolved",
  },
  {
    id: "inc-2026-05-04",
    date: "2026-05-04",
    service: "Payment gateway",
    title: "Settlement file delivery delayed",
    severity: "sev4",
    durationMinutes: 18,
    status: "resolved",
  },
  {
    id: "inc-2026-04-22",
    date: "2026-04-22",
    service: "Workshop scheduler",
    title: "Bay availability drift between web and tablet",
    severity: "sev3",
    durationMinutes: 54,
    status: "resolved",
  },
]

export const POSTMORTEM_ACTION_ITEMS: ReadonlyArray<PostmortemActionItem> = [
  {
    id: "ai-1",
    owner: "Jess R · Booking",
    description: "Add carrier-side failover health-check to alerting before customer-visible threshold.",
    dueDate: "2026-06-10",
  },
  {
    id: "ai-2",
    owner: "Marcus P · Parts",
    description: "Stand up secondary SMS partner with auto-route at >2% delivery failure for 5 minutes.",
    dueDate: "2026-06-21",
  },
  {
    id: "ai-3",
    owner: "Sasha B · SRE",
    description: "Document APAC failover runbook and rehearse in next game-day.",
    dueDate: "2026-07-04",
  },
]

function makeSyntheticTrack(regionId: SyntheticRegionTrack["region"], failHours: ReadonlyArray<number>, timeoutHours: ReadonlyArray<number> = []): SyntheticRegionTrack {
  const points: SyntheticRegionTrack["points"] = Array.from({ length: 24 }, (_, hour) => {
    if (failHours.includes(hour)) return { hour, outcome: "fail" as const }
    if (timeoutHours.includes(hour)) return { hour, outcome: "timeout" as const }
    return { hour, outcome: "pass" as const }
  })
  return { region: regionId, points }
}

export const SYNTHETIC_TRACKS: ReadonlyArray<SyntheticRegionTrack> = [
  makeSyntheticTrack("au-east-1", []),
  makeSyntheticTrack("au-west-1", [], [9]),
  makeSyntheticTrack("us-east-1", [14, 15]),
  makeSyntheticTrack("us-west-1", []),
  makeSyntheticTrack("eu-central-1", [], [21]),
  makeSyntheticTrack("apac-1", [18, 19, 20], [17]),
]

export const ACTIVE_ALERTS: ReadonlyArray<ActiveAlertEntry> = [
  {
    id: "alert-1",
    title: "Customer SMS p99 delivery > 60s",
    service: "Customer SMS",
    severity: "sev2",
    age: "14m",
    initialState: "firing",
    assignedInitials: "JR",
    assignedName: "Jess R",
  },
  {
    id: "alert-2",
    title: "APAC-1 5xx rate > 3% sustained 5 min",
    service: "Edge",
    severity: "sev2",
    age: "22m",
    initialState: "acknowledged",
    assignedInitials: "SB",
    assignedName: "Sasha B",
  },
  {
    id: "alert-3",
    title: "Quote engine cache hit ratio < 80%",
    service: "Quote engine",
    severity: "sev3",
    age: "1h 02m",
    initialState: "firing",
    assignedInitials: "MP",
    assignedName: "Marcus P",
  },
  {
    id: "alert-4",
    title: "Payment settlement file delayed",
    service: "Payment gateway",
    severity: "sev4",
    age: "2h 18m",
    initialState: "acknowledged",
    assignedInitials: "DF",
    assignedName: "Daniel F",
  },
]
