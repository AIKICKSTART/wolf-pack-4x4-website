"use client"

import { useMemo, useState } from "react"
import type { CSSProperties } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Rows3,
  Search,
  SlidersHorizontal,
  Table2,
  XCircle,
} from "lucide-react"

import {
  DataTable,
  MetricBlock,
  StatusBadge,
} from "../../components/data-display"
import type {
  DataTableColumn,
  DataTableDensity,
  MetricBlockItem,
  StatusBadgeTone,
} from "../../components/data-display"
import { Chip } from "../../components/primitives/chip"
import type { ChipTone } from "../../components/primitives/chip"
import styles from "../sub-route.module.css"

type QueueStatus = "Booked" | "In bay" | "Waiting parts" | "Ready" | "Fault"
type QueuePriority = "Routine" | "Today" | "Blocked"
type Scenario = "live" | "empty" | "loading" | "fault"
type SortMode = "queue" | "risk" | "revenue"

interface JobRow {
  id: string
  customer: string
  vehicle: string
  rego: string
  service: string
  bay: string
  tech: string
  eta: string
  progress: number
  revenue: number
  parts: "Allocated" | "Picking" | "Backorder"
  priority: QueuePriority
  status: QueueStatus
}

const jobs: JobRow[] = [
  {
    id: "JOB-1842",
    customer: "Harrison Plumbing",
    vehicle: "2021 Ranger PX3",
    rego: "OFM-84R",
    service: "DPF-back exhaust + tow tune",
    bay: "Bay 02",
    tech: "Maya",
    eta: "10:40",
    progress: 82,
    revenue: 2890,
    parts: "Allocated",
    priority: "Today",
    status: "In bay",
  },
  {
    id: "JOB-1847",
    customer: "Lakeview Electrical",
    vehicle: "2018 HiLux SR5",
    rego: "LVK-22X",
    service: "Stainless cat-back install",
    bay: "Bay 04",
    tech: "Chris",
    eta: "11:20",
    progress: 58,
    revenue: 2140,
    parts: "Picking",
    priority: "Today",
    status: "In bay",
  },
  {
    id: "JOB-1851",
    customer: "Daniel Fleuren",
    vehicle: "HSV GTSR W1",
    rego: "W1-550",
    service: "Collector-grade muffler proof",
    bay: "Bay 01",
    tech: "Sam",
    eta: "12:15",
    progress: 34,
    revenue: 3980,
    parts: "Backorder",
    priority: "Blocked",
    status: "Waiting parts",
  },
  {
    id: "JOB-1856",
    customer: "South Coast 4WD",
    vehicle: "Patrol Y62",
    rego: "SC4-62Y",
    service: "Headers, muffler, drone check",
    bay: "Bay 05",
    tech: "Ivy",
    eta: "13:05",
    progress: 12,
    revenue: 4520,
    parts: "Allocated",
    priority: "Routine",
    status: "Booked",
  },
  {
    id: "JOB-1860",
    customer: "Shellharbour Towing",
    vehicle: "Isuzu D-MAX",
    rego: "TOW-91D",
    service: "Cracked hanger repair",
    bay: "Bay 03",
    tech: "Noah",
    eta: "13:45",
    progress: 91,
    revenue: 760,
    parts: "Allocated",
    priority: "Today",
    status: "Ready",
  },
  {
    id: "JOB-1864",
    customer: "Illawarra Fleet",
    vehicle: "Transit Custom",
    rego: "IFL-18T",
    service: "Fleet compliance noise fail",
    bay: "Bay 06",
    tech: "Tara",
    eta: "14:30",
    progress: 46,
    revenue: 1320,
    parts: "Picking",
    priority: "Blocked",
    status: "Fault",
  },
]

const statusFilters: Array<{ value: "All" | QueueStatus; label: string; tone: ChipTone }> = [
  { value: "All", label: "All", tone: "neutral" },
  { value: "In bay", label: "In bay", tone: "teal" },
  { value: "Waiting parts", label: "Waiting parts", tone: "amber" },
  { value: "Ready", label: "Ready", tone: "green" },
  { value: "Fault", label: "Fault", tone: "red" },
]

const densityOptions: Array<{ value: DataTableDensity; label: string }> = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfort" },
  { value: "wide", label: "Wide" },
]

const sortOptions: Array<{ value: SortMode; label: string }> = [
  { value: "queue", label: "Queue" },
  { value: "risk", label: "SLA risk" },
  { value: "revenue", label: "Revenue" },
]

const scenarioOptions: Array<{
  value: Scenario
  label: string
  Icon: typeof Table2
}> = [
  { value: "live", label: "Live", Icon: Table2 },
  { value: "empty", label: "Empty", Icon: CheckCircle2 },
  { value: "loading", label: "Loading", Icon: LoaderCircle },
  { value: "fault", label: "Fault", Icon: XCircle },
]

const statusTone: Record<QueueStatus, StatusBadgeTone> = {
  Booked: "info",
  "In bay": "brand",
  "Waiting parts": "warn",
  Ready: "success",
  Fault: "error",
}

const partsTone: Record<JobRow["parts"], StatusBadgeTone> = {
  Allocated: "success",
  Picking: "info",
  Backorder: "warn",
}

const priorityTone: Record<QueuePriority, string> = {
  Routine: styles.priorityRoutine,
  Today: styles.priorityToday,
  Blocked: styles.priorityBlocked,
}

const audFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
})

function progressStyle(progress: number): CSSProperties {
  return { "--progress": `${progress}%` } as CSSProperties
}

function includesQuery(row: JobRow, query: string) {
  const target = [
    row.id,
    row.customer,
    row.vehicle,
    row.rego,
    row.service,
    row.bay,
    row.tech,
    row.status,
    row.parts,
    row.priority,
  ]
    .join(" ")
    .toLowerCase()

  return target.includes(query.toLowerCase())
}

const columns: ReadonlyArray<DataTableColumn<JobRow>> = [
  {
    id: "id",
    header: "Job",
    width: "132px",
    sortable: true,
    cell: (row) => (
      <span className={styles.jobCode}>
        <code>{row.id}</code>
        <span>{row.customer}</span>
      </span>
    ),
  },
  {
    id: "vehicle",
    header: "Vehicle",
    sortable: true,
    cell: (row) => (
      <span className={styles.vehicleStack}>
        <strong>{row.vehicle}</strong>
        <span>{row.rego}</span>
      </span>
    ),
  },
  {
    id: "service",
    header: "Service",
    sortable: true,
    cell: (row) => <span className={styles.serviceText}>{row.service}</span>,
  },
  {
    id: "bay",
    header: "Bay / tech",
    sortable: true,
    cell: (row) => (
      <span className={styles.bayStack}>
        <strong>{row.bay}</strong>
        <span>{row.tech}</span>
      </span>
    ),
  },
  {
    id: "parts",
    header: "Parts",
    align: "center",
    sortable: true,
    cell: (row) => (
      <StatusBadge tone={partsTone[row.parts]} size="sm" shape="pill" label={row.parts} />
    ),
  },
  {
    id: "progress",
    header: "Progress",
    width: "172px",
    sortable: true,
    cell: (row) => (
      <span className={styles.progressCell}>
        <span
          className={styles.progressTrack}
          role="progressbar"
          aria-label={`${row.id} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={row.progress}
        >
          <span className={styles.progressFill} style={progressStyle(row.progress)} />
        </span>
        <span>{row.progress}%</span>
      </span>
    ),
  },
  {
    id: "revenue",
    header: "Estimate",
    align: "right",
    sortable: true,
    cell: (row) => <span className={styles.money}>{audFormatter.format(row.revenue)}</span>,
  },
  {
    id: "eta",
    header: "ETA",
    align: "center",
    sortable: true,
    cell: (row) => <span className={styles.eta}>{row.eta}</span>,
  },
  {
    id: "priority",
    header: "Priority",
    align: "center",
    sortable: true,
    cell: (row) => (
      <span className={`${styles.priorityChip} ${priorityTone[row.priority]}`}>
        {row.priority}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    align: "center",
    sortable: true,
    cell: (row) => (
      <StatusBadge tone={statusTone[row.status]} size="sm" shape="pill" label={row.status} />
    ),
  },
]

const getRowId = (row: JobRow) => row.id

function LoadingState() {
  return (
    <section className={styles.statePanel} aria-busy="true" aria-label="Loading table state">
      <div className={styles.statePanelHead}>
        <LoaderCircle aria-hidden="true" />
        <div>
          <strong>Loading supplier sync</strong>
          <span>Rows hold layout while the job queue refreshes.</span>
        </div>
      </div>
      <div className={styles.skeletonTable} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </section>
  )
}

function FaultState() {
  return (
    <section className={`${styles.statePanel} ${styles.statePanelFault}`} role="alert">
      <div className={styles.statePanelHead}>
        <AlertTriangle aria-hidden="true" />
        <div>
          <strong>Supplier feed stalled</strong>
          <span>Dyno bay data is cached. Retry from the toolbar after the API recovers.</span>
        </div>
      </div>
      <button type="button" className={styles.secondaryAction}>
        <LoaderCircle aria-hidden="true" />
        Retry sync
      </button>
    </section>
  )
}

export function DataTableShowcase() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"All" | QueueStatus>("All")
  const [density, setDensity] = useState<DataTableDensity>("comfortable")
  const [sortMode, setSortMode] = useState<SortMode>("queue")
  const [scenario, setScenario] = useState<Scenario>("live")

  const filteredRows = useMemo(() => {
    const visible = jobs.filter((row) => {
      const statusMatches = statusFilter === "All" || row.status === statusFilter
      const queryMatches = query.trim() === "" || includesQuery(row, query.trim())
      return statusMatches && queryMatches
    })

    return [...visible].sort((a, b) => {
      if (sortMode === "risk") {
        return a.progress - b.progress
      }
      if (sortMode === "revenue") {
        return b.revenue - a.revenue
      }
      return a.id.localeCompare(b.id)
    })
  }, [query, sortMode, statusFilter])

  const rowsForScenario = scenario === "empty" ? [] : filteredRows
  const blockedCount = filteredRows.filter((row) => row.priority === "Blocked").length
  const readyCount = filteredRows.filter((row) => row.status === "Ready").length
  const estimateTotal = filteredRows.reduce((sum, row) => sum + row.revenue, 0)

  const metrics: MetricBlockItem[] = [
    {
      id: "visible",
      label: "Visible jobs",
      value: String(rowsForScenario.length),
      unit: "rows",
      delta: { label: statusFilter === "All" ? "all" : "filtered", direction: "flat" },
    },
    {
      id: "blocked",
      label: "Blocked work",
      value: String(blockedCount),
      unit: "jobs",
      delta: { label: blockedCount > 0 ? "watch" : "clear", direction: blockedCount > 0 ? "down" : "up" },
    },
    {
      id: "ready",
      label: "Ready to invoice",
      value: String(readyCount),
      unit: "jobs",
      delta: { label: audFormatter.format(estimateTotal), direction: "up" },
    },
  ]

  return (
    <section className={styles.canvas}>
      <div className={styles.tableShowcase}>
        <div className={styles.tableToolbar} aria-label="Data table controls">
          <label className={styles.searchBox}>
            <Search aria-hidden="true" />
            <span className={styles.visuallyHidden}>Search queue</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search job, customer, vehicle, tech"
            />
          </label>

          <div className={styles.segmentGroup} aria-label="Sort rows">
            <span className={styles.controlLabel}>
              <SlidersHorizontal aria-hidden="true" />
              Sort
            </span>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={sortMode === option.value ? styles.segmentActive : styles.segmentButton}
                aria-pressed={sortMode === option.value}
                onClick={() => setSortMode(option.value)}
              >
                <Rows3 aria-hidden="true" />
                {option.label}
              </button>
            ))}
          </div>

          <div className={styles.segmentGroup} aria-label="Density">
            <span className={styles.controlLabel}>
              <Table2 aria-hidden="true" />
              Density
            </span>
            {densityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={density === option.value ? styles.segmentActive : styles.segmentButton}
                aria-pressed={density === option.value}
                onClick={() => setDensity(option.value)}
              >
                <Rows3 aria-hidden="true" />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tableToolbarSecondary}>
          <div className={styles.chipRail} aria-label="Status filter">
            {statusFilters.map((filter) => (
              <Chip
                key={filter.value}
                label={filter.label}
                tone={filter.tone}
                selected={statusFilter === filter.value}
                onSelect={() => setStatusFilter(filter.value)}
              />
            ))}
          </div>

          <div className={styles.segmentGroup} aria-label="Rendered table state">
            <span className={styles.controlLabel}>
              <Clock3 aria-hidden="true" />
              State
            </span>
            {scenarioOptions.map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                className={scenario === value ? styles.segmentActive : styles.segmentButton}
                aria-pressed={scenario === value}
                onClick={() => setScenario(value)}
              >
                <Icon aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <MetricBlock metrics={metrics} />

        {scenario === "loading" ? (
          <LoadingState />
        ) : scenario === "fault" ? (
          <FaultState />
        ) : (
          <DataTable<JobRow>
            rows={rowsForScenario}
            columns={columns}
            getRowId={getRowId}
            caption="Workshop queue - live operational table"
            kicker={`${rowsForScenario.length} rows shown / ${jobs.length} total`}
            selectable
            density={density}
            empty={
              <div className={styles.emptyState}>
                <CheckCircle2 aria-hidden="true" />
                <strong>No matching jobs</strong>
                <span>Clear the search or switch the status chips to return live rows.</span>
              </div>
            }
          />
        )}

        <div className={styles.stateGrid} aria-label="Table state examples">
          <article className={styles.stateExample}>
            <StatusBadge tone="success" size="sm" shape="pill" label="Empty" />
            <h3>Empty slot</h3>
            <p>Uses the table empty prop so the message remains inside the same scroll shell.</p>
          </article>
          <article className={styles.stateExample}>
            <StatusBadge tone="info" size="sm" shape="pill" label="Loading" />
            <h3>Loading shell</h3>
            <p>External state wrapper keeps controls visible while rows refresh from suppliers.</p>
          </article>
          <article className={styles.stateExample}>
            <StatusBadge tone="error" size="sm" shape="pill" label="Fault" />
            <h3>Fault shell</h3>
            <p>Alert copy and retry action sit beside the table instead of hiding the surface.</p>
          </article>
        </div>

        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Search, status chips, density, state, row selection, and controlled sort are local to
            this showcase. Column headers still expose the primitive sortable affordance.
          </p>
        </div>
      </div>
    </section>
  )
}
