import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { Chip } from "../../components/primitives/chip"
import { AuditLogRow, type AuditLogRowItem } from "../../components/account/audit-log-row"

import { AuditPagination } from "./audit-pagination"
import styles from "../account.module.css"

export const metadata: Metadata = {
  title: "Audit log · Account | UI Primitives",
}

const ENTRIES: ReadonlyArray<AuditLogRowItem> = [
  {
    id: "log-01",
    actorName: "Daniel Fleuren",
    actorEmail: "daniel@mufflermen.com.au",
    actorTone: "red",
    action: "Plan upgraded",
    objectLabel: "Workshop → Fleet",
    objectKind: "Billing",
    ip: "203.0.113.42",
    timestamp: "Today · 12:04",
    tone: "success",
  },
  {
    id: "log-02",
    actorName: "Mara Kovac",
    actorEmail: "mara@mufflermen.com.au",
    actorTone: "amber",
    action: "Member invited",
    objectLabel: "darren@oakflats.exhaust",
    objectKind: "Team",
    ip: "10.4.7.32",
    timestamp: "Today · 11:51",
    tone: "info",
  },
  {
    id: "log-03",
    actorName: "Pipeline bot",
    actorEmail: "ci@mufflermen.com.au",
    actorTone: "obsidian",
    action: "Webhook retried",
    objectLabel: "Stripe invoice.created",
    objectKind: "Integration",
    ip: "—",
    timestamp: "Today · 09:14",
    tone: "warn",
  },
  {
    id: "log-04",
    actorName: "Jaylen Souto",
    actorEmail: "jaylen@mufflermen.com.au",
    actorTone: "teal",
    action: "Token created",
    objectLabel: "Bay 02 tablet sync",
    objectKind: "API",
    ip: "10.4.7.21",
    timestamp: "Yesterday · 18:32",
    tone: "info",
  },
  {
    id: "log-05",
    actorName: "Sienna Park",
    actorEmail: "sienna@mufflermen.com.au",
    actorTone: "green",
    action: "Token revoked",
    objectLabel: "Old marketing widget",
    objectKind: "API",
    ip: "10.4.7.18",
    timestamp: "Yesterday · 16:09",
    tone: "danger",
  },
  {
    id: "log-06",
    actorName: "Daniel Fleuren",
    actorEmail: "daniel@mufflermen.com.au",
    actorTone: "red",
    action: "Retention policy updated",
    objectLabel: "Audit log retention → 180 days",
    objectKind: "Workspace",
    ip: "203.0.113.42",
    timestamp: "Yesterday · 17:02",
    tone: "info",
  },
  {
    id: "log-07",
    actorName: "Mara Kovac",
    actorEmail: "mara@mufflermen.com.au",
    actorTone: "amber",
    action: "Integration disconnected",
    objectLabel: "Intercom",
    objectKind: "Integration",
    ip: "10.4.7.32",
    timestamp: "2 days ago · 14:21",
    tone: "warn",
  },
  {
    id: "log-08",
    actorName: "Unknown device",
    actorEmail: "—",
    actorTone: "obsidian",
    action: "Failed sign-in",
    objectLabel: "Linux desktop, Firefox 134",
    objectKind: "Security",
    ip: "198.51.100.7",
    timestamp: "3 days ago · 22:48",
    tone: "danger",
  },
]

const RANGE_FILTERS: ReadonlyArray<{ label: string; selected: boolean }> = [
  { label: "Last 24 hours", selected: false },
  { label: "Last 7 days", selected: true },
  { label: "Last 30 days", selected: false },
  { label: "Custom", selected: false },
]

const ACTOR_FILTERS: ReadonlyArray<string> = ["All actors", "Owners", "Admins", "Bot"]

export default function AccountAuditLogPage() {
  return (
    <>
      <PageHeader
        kicker="18.9 / Audit log"
        title="Audit log"
        description="Every privileged action across the workspace — filtered by range and actor."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account", href: "/ui-primitives/account" },
          { label: "Audit log" },
        ]}
      />

      <section className={styles.card} aria-label="Audit log filters">
        <div className={styles.filterChips}>
          <span className={styles.filterChipsLabel}>Range</span>
          {RANGE_FILTERS.map((filter) => (
            <Chip
              key={filter.label}
              label={filter.label}
              tone={filter.selected ? "teal" : "neutral"}
              selected={filter.selected}
            />
          ))}
        </div>
        <div className={styles.filterChips}>
          <span className={styles.filterChipsLabel}>Actor</span>
          {ACTOR_FILTERS.map((label, index) => (
            <Chip
              key={label}
              label={label}
              tone={index === 0 ? "amber" : "neutral"}
              selected={index === 0}
            />
          ))}
        </div>
      </section>

      <ul className={styles.auditList} role="list" aria-label="Audit log entries">
        {ENTRIES.map((entry) => (
          <li key={entry.id}>
            <AuditLogRow entry={entry} />
          </li>
        ))}
      </ul>

      <AuditPagination />
    </>
  )
}
