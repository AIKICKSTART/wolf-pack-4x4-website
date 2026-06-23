/**
 * Shared types for the deploy-console primitive family.
 *
 * Surfaces the platform team see when shipping the Oak Flats Mufflermen
 * production stack — env editor, secret vault, deploy gate, rollback,
 * health-check heatmap, branch preview deck, CDN cache controls, DNS,
 * SSL, incidents, release notes, deploy timeline, runtime versions and
 * blue/green traffic shifting. Exported from `index.ts` so sub-routes
 * and downstream consumers can type their fixtures and props.
 */

import type { StatusTone } from "../status-page/status-types"

/* ------------------------------------------------------------------ *
 * Env editor
 * ------------------------------------------------------------------ */

export type EnvValueKind = "string" | "url" | "secret" | "json" | "number" | "boolean"

export type EnvScope = "production" | "preview" | "development"

export type EnvDirtyState = "clean" | "added" | "modified" | "removed"

export interface EnvVariable {
  key: string
  value: string
  kind: EnvValueKind
  scope: EnvScope
  /** Whether this variable has been edited but not yet saved. */
  dirty: EnvDirtyState
  /** Optional human description / source-of-truth note. */
  description?: string
  /** Last edited human time. */
  updatedAt: string
  /** Owner / last editor. */
  updatedBy?: string
}

/* ------------------------------------------------------------------ *
 * Secret vault
 * ------------------------------------------------------------------ */

export type SecretRotationStatus = "fresh" | "ageing" | "expiring" | "expired"

export interface SecretVaultEntry {
  /** Logical name (PAYLOAD_SECRET, STRIPE_KEY etc.) */
  key: string
  /** Cleartext value — caller decides whether to ever reveal. Always render masked by default. */
  value: string
  /** Vendor / source descriptor. */
  vendor: string
  /** Days remaining until rotation is recommended. */
  rotationDaysRemaining: number
  /** Max rotation window in days. */
  rotationWindowDays: number
  status: SecretRotationStatus
  /** Human time of last access. */
  lastAccessedAt: string
  /** Whether rotating this secret is currently allowed. */
  canRotate: boolean
}

export const SECRET_ROTATION_LABEL: Record<SecretRotationStatus, string> = {
  fresh: "Fresh",
  ageing: "Ageing",
  expiring: "Expiring",
  expired: "Expired",
}

export const SECRET_ROTATION_TONE: Record<SecretRotationStatus, StatusTone> = {
  fresh: "green",
  ageing: "teal",
  expiring: "amber",
  expired: "red",
}

/* ------------------------------------------------------------------ *
 * Deploy gate
 * ------------------------------------------------------------------ */

export type GateCheckStatus = "pending" | "running" | "passed" | "failed" | "skipped"

export type GateCheckKind =
  | "tests"
  | "typecheck"
  | "lint"
  | "security"
  | "owner-approval"
  | "build"
  | "migrations"

export interface GateCheck {
  id: string
  kind: GateCheckKind
  label: string
  status: GateCheckStatus
  /** Human duration eg "1m 24s". */
  duration?: string
  /** Optional detail caption rendered under the label. */
  detail?: string
}

export const GATE_STATUS_TONE: Record<GateCheckStatus, StatusTone> = {
  pending: "neutral",
  running: "teal",
  passed: "green",
  failed: "red",
  skipped: "amber",
}

export const GATE_STATUS_LABEL: Record<GateCheckStatus, string> = {
  pending: "Pending",
  running: "Running",
  passed: "Passed",
  failed: "Failed",
  skipped: "Skipped",
}

/* ------------------------------------------------------------------ *
 * Rollback panel
 * ------------------------------------------------------------------ */

export type RevisionStatus = "current" | "stable" | "rolled-back" | "failed"

export interface DeployRevision {
  id: string
  /** Short sha (7 chars). */
  sha: string
  message: string
  author: string
  authoredAt: string
  status: RevisionStatus
  /** Net file diff line counts. */
  diff: { added: number; removed: number; files: number }
}

export const REVISION_STATUS_LABEL: Record<RevisionStatus, string> = {
  current: "Live",
  stable: "Stable",
  "rolled-back": "Rolled back",
  failed: "Failed",
}

export const REVISION_STATUS_TONE: Record<RevisionStatus, StatusTone> = {
  current: "green",
  stable: "teal",
  "rolled-back": "amber",
  failed: "red",
}

/* ------------------------------------------------------------------ *
 * Health-check heatmap
 * ------------------------------------------------------------------ */

export type HealthBucket = "ok" | "warn" | "fail" | "no-data"

export interface HealthcheckEndpoint {
  /** Endpoint path eg /api/quotes. */
  path: string
  /** Human label. */
  label: string
  /** 24 cells one per hour. */
  hours: ReadonlyArray<HealthBucket>
  /** Current p95 latency in ms. */
  p95LatencyMs: number
}

export const HEALTH_BUCKET_LABEL: Record<HealthBucket, string> = {
  ok: "OK",
  warn: "Warning",
  fail: "Failing",
  "no-data": "No data",
}

/* ------------------------------------------------------------------ *
 * Branch preview deck
 * ------------------------------------------------------------------ */

export type BranchKind = "main" | "feature" | "hotfix" | "release"

export interface BranchPreview {
  branch: string
  kind: BranchKind
  previewUrl: string
  /** Short sha for the most recent commit. */
  headSha: string
  authoredBy: string
  authoredAt: string
  /** Commits ahead of main. */
  commitsAhead: number
  /** ASCII placeholder representing a preview screenshot. */
  thumbGlyph: string
  /** Optional pull-request number. */
  prNumber?: number
}

export const BRANCH_KIND_TONE: Record<BranchKind, StatusTone> = {
  main: "green",
  feature: "teal",
  hotfix: "red",
  release: "violet",
}

/* ------------------------------------------------------------------ *
 * CDN cache tile
 * ------------------------------------------------------------------ */

export interface CdnCachePattern {
  pattern: string
  description: string
  /** Cache hit ratio 0-1. */
  hitRatio: number
  /** Average TTL minutes. */
  ttlMinutes: number
  /** Requests per minute over the last 5 minutes. */
  rpm: number
  /** Whether a purge is currently in flight. */
  purging: boolean
}

/* ------------------------------------------------------------------ *
 * DNS record row
 * ------------------------------------------------------------------ */

export type DnsRecordType = "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "CAA"

export type DnsPropagationState = "pending" | "partial" | "propagated" | "drift"

export interface DnsRecord {
  host: string
  type: DnsRecordType
  value: string
  ttlSeconds: number
  state: DnsPropagationState
  /** % of resolvers world-wide returning the new value. */
  propagationPercent: number
}

export const DNS_PROPAGATION_LABEL: Record<DnsPropagationState, string> = {
  pending: "Pending",
  partial: "Partial",
  propagated: "Propagated",
  drift: "Drift",
}

export const DNS_PROPAGATION_TONE: Record<DnsPropagationState, StatusTone> = {
  pending: "amber",
  partial: "amber",
  propagated: "green",
  drift: "red",
}

/* ------------------------------------------------------------------ *
 * SSL cert card
 * ------------------------------------------------------------------ */

export type CertHealth = "healthy" | "renewing" | "warning" | "critical"

export interface SslCertificate {
  /** Subject common name. */
  commonName: string
  /** Alt names. */
  altNames: ReadonlyArray<string>
  /** Issuer ("Let's Encrypt R3" etc). */
  issuer: string
  /** Days until expiry. */
  daysUntilExpiry: number
  /** Auto-renew enabled. */
  autoRenew: boolean
  health: CertHealth
  /** Chain length ie certs in the chain. */
  chainLength: number
  /** Human time stamp issuance. */
  issuedAt: string
}

export const CERT_HEALTH_LABEL: Record<CertHealth, string> = {
  healthy: "Healthy",
  renewing: "Renewing",
  warning: "Warning",
  critical: "Critical",
}

export const CERT_HEALTH_TONE: Record<CertHealth, StatusTone> = {
  healthy: "green",
  renewing: "teal",
  warning: "amber",
  critical: "red",
}

/* ------------------------------------------------------------------ *
 * Incident banner
 * ------------------------------------------------------------------ */

export type IncidentBannerSeverity = "sev1" | "sev2" | "sev3"

export interface ActiveIncidentSummary {
  id: string
  title: string
  severity: IncidentBannerSeverity
  /** Human ETA eg "ETA 20 min". */
  eta: string
  /** Current human-readable status. */
  status: string
  /** Optional postmortem href. */
  href?: string
}

export const INCIDENT_BANNER_TONE: Record<IncidentBannerSeverity, StatusTone> = {
  sev1: "red",
  sev2: "amber",
  sev3: "teal",
}

/* ------------------------------------------------------------------ *
 * Release notes card
 * ------------------------------------------------------------------ */

export type ReleaseChangeKind = "feature" | "fix" | "perf" | "breaking" | "chore" | "security"

export interface ReleaseChange {
  kind: ReleaseChangeKind
  title: string
  /** Optional PR number. */
  prNumber?: number
}

export interface ReleaseNotes {
  version: string
  /** ISO date string. */
  releasedAt: string
  /** Human label eg "Beach Sweep 12". */
  codename?: string
  changes: ReadonlyArray<ReleaseChange>
  /** Plain text summary. */
  summary?: string
}

export const RELEASE_CHANGE_LABEL: Record<ReleaseChangeKind, string> = {
  feature: "Feature",
  fix: "Fix",
  perf: "Perf",
  breaking: "Breaking",
  chore: "Chore",
  security: "Security",
}

export const RELEASE_CHANGE_TONE: Record<ReleaseChangeKind, StatusTone> = {
  feature: "teal",
  fix: "green",
  perf: "violet",
  breaking: "red",
  chore: "neutral",
  security: "amber",
}

/* ------------------------------------------------------------------ *
 * Deploy timeline
 * ------------------------------------------------------------------ */

export type DeployOutcome = "succeeded" | "failed" | "rolled-back" | "running"

export interface DeployTimelineEntry {
  id: string
  version: string
  /** Short sha. */
  sha: string
  author: string
  /** Human start time. */
  startedAt: string
  /** Human duration eg "3m 12s". */
  duration: string
  outcome: DeployOutcome
  /** Optional canary % eg 25. */
  canaryPercent?: number
  /** Environment target. */
  target: "production" | "preview" | "staging"
}

export const DEPLOY_OUTCOME_LABEL: Record<DeployOutcome, string> = {
  succeeded: "Succeeded",
  failed: "Failed",
  "rolled-back": "Rolled back",
  running: "Running",
}

export const DEPLOY_OUTCOME_TONE: Record<DeployOutcome, StatusTone> = {
  succeeded: "green",
  failed: "red",
  "rolled-back": "amber",
  running: "teal",
}

/* ------------------------------------------------------------------ *
 * Runtime version tile
 * ------------------------------------------------------------------ */

export type RuntimeKind = "node" | "next" | "pnpm" | "docker" | "postgres" | "redis"

export interface RuntimeVersion {
  kind: RuntimeKind
  label: string
  currentVersion: string
  pinnedVersion: string
  latestVersion: string
  /** Whether the current version matches the pin. */
  drift: "matched" | "behind" | "ahead"
  /** Optional support window note. */
  supportWindow?: string
}

export const RUNTIME_DRIFT_LABEL: Record<RuntimeVersion["drift"], string> = {
  matched: "Pinned",
  behind: "Behind pin",
  ahead: "Ahead of pin",
}

export const RUNTIME_DRIFT_TONE: Record<RuntimeVersion["drift"], StatusTone> = {
  matched: "green",
  behind: "amber",
  ahead: "teal",
}

/* ------------------------------------------------------------------ *
 * Traffic shift card (blue / green)
 * ------------------------------------------------------------------ */

export interface TrafficShiftState {
  /** Percentage of traffic sent to the blue (current) deployment. */
  bluePercent: number
  /** Sticky session toggle — keep users on whichever colour they hit first. */
  stickiness: boolean
  /** Active label eg "v3.42.1 (blue) <-> v3.43.0 (green)". */
  blueLabel: string
  greenLabel: string
}
