"use client"

import { Chip } from "../primitives/chip"

import {
  SEVERITY_TONE,
  type AuthAuditKind,
  type AuthSeverity,
  type AuthTone,
} from "./auth-deep-types"
import styles from "./audit-log-feed.module.css"

export interface AuditLogEntry {
  /** Stable id. */
  id: string
  /** When the event occurred (ISO). */
  atIso: string
  /** Acting principal label, e.g. "Mick Davies", "system". */
  actorLabel: string
  /** Audit event kind. */
  kind: AuthAuditKind
  /** Severity classification. */
  severity: AuthSeverity
  /** Short human summary, e.g. "Login from new IP". */
  summary: string
  /** Optional location hint, e.g. "Brisbane QLD". */
  location?: string
  /** Optional masked IP. */
  ipMasked?: string
}

export interface AuditLogFeedProps {
  /** Display owner / scope, e.g. "Mick Davies — admin". */
  scopeLabel: string
  /** Tenant label. */
  tenantLabel: string
  /** Entries newest first. */
  entries: ReadonlyArray<AuditLogEntry>
  /** Optional filter chips above the feed. */
  filterChips?: ReadonlyArray<{ label: string; tone: AuthTone; selected?: boolean }>
  /** Fires when a filter chip is clicked. */
  onFilterToggle?: (label: string) => void
}

const KIND_LABEL: Record<AuthAuditKind, string> = {
  "login-success": "Login OK",
  "login-failed": "Login failed",
  logout: "Logout",
  "mfa-enrolled": "MFA enrolled",
  "mfa-failed": "MFA failed",
  "password-changed": "Password changed",
  "passkey-added": "Passkey added",
  "passkey-revoked": "Passkey revoked",
  "session-revoked": "Session revoked",
  "permission-granted": "Permission granted",
  "permission-revoked": "Permission revoked",
  "impersonation-start": "Impersonation start",
  "impersonation-end": "Impersonation end",
}

const SEVERITY_LABEL: Record<AuthSeverity, string> = {
  info: "Info",
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
}

function formatLocal(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
}

export function AuditLogFeed({
  scopeLabel,
  tenantLabel,
  entries,
  filterChips,
  onFilterToggle,
}: AuditLogFeedProps) {
  const criticalCount = entries.filter((e) => e.severity === "critical").length
  const liveCount = entries.length

  return (
    <section
      className={styles.wrap}
      aria-label={`Authentication audit feed for ${scopeLabel}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>{tenantLabel} · Audit feed</span>
          <h3 className={styles.title}>{scopeLabel}</h3>
        </div>
        <div className={styles.headMeta}>
          <Chip
            label={`${liveCount} events`}
            tone={liveCount > 0 ? "teal" : "neutral"}
          />
          {criticalCount > 0 ? (
            <Chip label={`${criticalCount} critical`} tone="red" />
          ) : null}
        </div>
      </header>

      {filterChips && filterChips.length > 0 ? (
        <div className={styles.filters} role="toolbar" aria-label="Audit filters">
          {filterChips.map((chip) => (
            <Chip
              key={chip.label}
              label={chip.label}
              tone={chip.tone}
              selected={chip.selected}
              onSelect={() => onFilterToggle?.(chip.label)}
            />
          ))}
        </div>
      ) : null}

      <ol className={styles.feed} aria-live="polite">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={styles.entry}
            data-severity={entry.severity}
            data-kind={entry.kind}
          >
            <div className={styles.timeline} aria-hidden="true">
              <span className={styles.timelineDot} />
              <span className={styles.timelineLine} />
            </div>
            <div className={styles.body}>
              <div className={styles.bodyTop}>
                <span className={styles.kindLabel}>{KIND_LABEL[entry.kind]}</span>
                <time className={styles.time} dateTime={entry.atIso}>
                  {formatLocal(entry.atIso)}
                </time>
              </div>
              <p className={styles.summary}>{entry.summary}</p>
              <div className={styles.metaRow}>
                <span className={styles.actor}>{entry.actorLabel}</span>
                {entry.location ? (
                  <span className={styles.locationChip}>{entry.location}</span>
                ) : null}
                {entry.ipMasked ? (
                  <span className={styles.ipChip}>{entry.ipMasked}</span>
                ) : null}
                <Chip
                  label={SEVERITY_LABEL[entry.severity]}
                  tone={SEVERITY_TONE[entry.severity]}
                />
              </div>
            </div>
          </li>
        ))}
        {entries.length === 0 ? (
          <li className={styles.empty}>No audit events in this window.</li>
        ) : null}
      </ol>
    </section>
  )
}

export default AuditLogFeed
