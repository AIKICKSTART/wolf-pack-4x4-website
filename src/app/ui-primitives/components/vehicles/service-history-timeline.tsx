import { ActivityFeed, type ActivityFeedItem, type ActivityTone } from "../data-display/activity-feed"
import { Chip } from "../primitives/chip"

import styles from "./service-history-timeline.module.css"

export type ServiceKind = "scheduled" | "repair" | "warranty" | "inspection" | "tyres" | "exhaust"

export interface ServiceHistoryEntry {
  id: string
  kind: ServiceKind
  /** Free-text summary of the work. */
  summary: string
  /** ISO date the work was performed. */
  performedISO: string
  /** Workshop or technician. */
  workshop: string
  /** AUD cost (use 0 for warranty / no-charge). */
  costAud: number
  odometerKm: number
}

interface ServiceHistoryTimelineProps {
  entries: ReadonlyArray<ServiceHistoryEntry>
  className?: string
}

const KIND_GLYPH: Record<ServiceKind, string> = {
  scheduled: "✓",
  repair: "⚒",
  warranty: "★",
  inspection: "◎",
  tyres: "○",
  exhaust: "≈",
}

const KIND_LABEL: Record<ServiceKind, string> = {
  scheduled: "Scheduled service",
  repair: "Repair",
  warranty: "Warranty",
  inspection: "Inspection",
  tyres: "Tyres",
  exhaust: "Exhaust",
}

const KIND_TONE: Record<ServiceKind, ActivityTone> = {
  scheduled: "success",
  repair: "warn",
  warranty: "info",
  inspection: "info",
  tyres: "info",
  exhaust: "warn",
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" }).format(
    date,
  )
}

function formatCost(aud: number): string {
  if (aud === 0) {
    return "No charge"
  }
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(aud)
}

function formatOdo(km: number): string {
  return `${new Intl.NumberFormat("en-AU").format(km)} km`
}

export function ServiceHistoryTimeline({ entries, className }: ServiceHistoryTimelineProps) {
  const items: ReadonlyArray<ActivityFeedItem> = entries.map((entry) => ({
    id: entry.id,
    title: entry.summary,
    description: `${KIND_LABEL[entry.kind]} · ${entry.workshop} · ${formatOdo(entry.odometerKm)}`,
    timestamp: formatDate(entry.performedISO),
    tone: KIND_TONE[entry.kind],
    actions: (
      <Chip
        label={formatCost(entry.costAud)}
        tone={entry.costAud === 0 ? "green" : entry.costAud > 1500 ? "red" : "amber"}
      />
    ),
    actor: {
      name: `${KIND_GLYPH[entry.kind]} ${KIND_LABEL[entry.kind]}`,
    },
  }))

  const classes = [styles.timeline, className].filter(Boolean).join(" ")
  return (
    <div className={classes}>
      <ActivityFeed items={items} ariaLabel="Service history timeline" />
    </div>
  )
}

export default ServiceHistoryTimeline
