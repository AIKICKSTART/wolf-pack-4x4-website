/* Shared mock data for the deploy-console sub-routes + full control room.
 *
 * Real workshop context — primitives.mufflermen.com.au on Hostinger VPS,
 * Docker stack (web, primitives, hermes-api, mufflerpulse), Let's Encrypt,
 * Node 22.11.0 / Next 16 / pnpm 9.12.3 / Docker 27.4, Stripe + Replicate +
 * OpenAI keys, two recent incidents (quote-pdf OOM, parts-api rate limit).
 *
 * No real backend wired — visual reference only.
 */

import type {
  ActiveIncidentSummary,
  BranchPreview,
  CdnCachePattern,
  DeployRevision,
  DeployTimelineEntry,
  DnsRecord,
  EnvVariable,
  GateCheck,
  HealthBucket,
  HealthcheckEndpoint,
  ReleaseNotes,
  RuntimeVersion,
  SecretVaultEntry,
  SslCertificate,
  TrafficShiftState,
} from "../components/deploy-console"

/* ------------------------------------------------------------------ *
 * Env variables
 * ------------------------------------------------------------------ */

export const ENV_VARIABLES: ReadonlyArray<EnvVariable> = [
  {
    key: "NEXT_PUBLIC_SITE_URL",
    value: "https://primitives.mufflermen.com.au",
    kind: "url",
    scope: "production",
    dirty: "clean",
    description: "Canonical public URL — used for OG tags and CSP.",
    updatedAt: "26 May · 14:12 AEST",
    updatedBy: "daniel.fleuren",
  },
  {
    key: "DATABASE_URI",
    value: "postgres://payload@primitives-pg.internal:5432/primitives",
    kind: "secret",
    scope: "production",
    dirty: "clean",
    description: "Payload CMS database — pooled connection, AU-East-1.",
    updatedAt: "20 May · 09:48 AEST",
    updatedBy: "daniel.fleuren",
  },
  {
    key: "PAYLOAD_SECRET",
    value: "pl_k9c2x_44b8a73fad091cdf60ee2c4711b7f5d2",
    kind: "secret",
    scope: "production",
    dirty: "clean",
    description: "Used to sign Payload CMS JWTs.",
    updatedAt: "01 May · 11:02 AEST",
    updatedBy: "daniel.fleuren",
  },
  {
    key: "STRIPE_SECRET_KEY",
    value: "env:STRIPE_SECRET_KEY",
    kind: "secret",
    scope: "production",
    dirty: "modified",
    description: "Live Stripe key — rotated quarterly.",
    updatedAt: "28 May · 06:11 AEST",
    updatedBy: "daniel.fleuren",
  },
  {
    key: "REPLICATE_API_TOKEN",
    value: "env:REPLICATE_API_TOKEN",
    kind: "secret",
    scope: "production",
    dirty: "clean",
    description: "Powers Seedance render queue + parts AI.",
    updatedAt: "12 May · 16:30 AEST",
    updatedBy: "kelly.macarthur",
  },
  {
    key: "OPENAI_API_KEY",
    value: "env:OPENAI_API_KEY",
    kind: "secret",
    scope: "production",
    dirty: "clean",
    description: "Quote copy + parts compatibility hints.",
    updatedAt: "08 May · 10:21 AEST",
    updatedBy: "daniel.fleuren",
  },
  {
    key: "FEATURE_QUOTE_PDF_V2",
    value: "true",
    kind: "boolean",
    scope: "production",
    dirty: "added",
    description: "Switches to memory-bounded quote-PDF renderer.",
    updatedAt: "28 May · 22:48 AEST",
    updatedBy: "daniel.fleuren",
  },
  {
    key: "HERMES_API_BASE",
    value: "https://hermes.mufflermen.com.au/v1",
    kind: "url",
    scope: "production",
    dirty: "clean",
    description: "Internal voice-agent gateway.",
    updatedAt: "14 May · 13:55 AEST",
    updatedBy: "daniel.fleuren",
  },
  {
    key: "MAX_UPLOAD_BYTES",
    value: "16777216",
    kind: "number",
    scope: "production",
    dirty: "clean",
    description: "16 MiB — applies to part photo uploads.",
    updatedAt: "01 Apr · 09:00 AEST",
    updatedBy: "daniel.fleuren",
  },
  {
    key: "FEATURE_QUOTE_PDF_V2",
    value: "true",
    kind: "boolean",
    scope: "preview",
    dirty: "clean",
    description: "Same flag, preview already burnt-in.",
    updatedAt: "27 May · 19:14 AEST",
    updatedBy: "daniel.fleuren",
  },
  {
    key: "NEXT_PUBLIC_SITE_URL",
    value: "https://hotfix-quote-pdf-oom.preview.mufflermen.com.au",
    kind: "url",
    scope: "preview",
    dirty: "clean",
    description: "Preview origin auto-set per branch.",
    updatedAt: "28 May · 22:48 AEST",
    updatedBy: "ci-bot",
  },
  {
    key: "PRIMITIVES_DEBUG",
    value: "1",
    kind: "boolean",
    scope: "development",
    dirty: "removed",
    description: "Turns on the visible primitive grid overlay.",
    updatedAt: "28 May · 08:14 AEST",
    updatedBy: "daniel.fleuren",
  },
]

/* ------------------------------------------------------------------ *
 * Secret vault
 * ------------------------------------------------------------------ */

export const SECRETS: ReadonlyArray<SecretVaultEntry> = [
  {
    key: "PAYLOAD_SECRET",
    value: "pl_k9c2x_44b8a73fad091cdf60ee2c4711b7f5d2",
    vendor: "Payload CMS",
    rotationDaysRemaining: 24,
    rotationWindowDays: 90,
    status: "fresh",
    lastAccessedAt: "29 May · 02:14 AEST",
    canRotate: true,
  },
  {
    key: "STRIPE_SECRET_KEY",
    value: "env:STRIPE_SECRET_KEY",
    vendor: "Stripe",
    rotationDaysRemaining: 12,
    rotationWindowDays: 90,
    status: "ageing",
    lastAccessedAt: "28 May · 23:11 AEST",
    canRotate: true,
  },
  {
    key: "REPLICATE_API_TOKEN",
    value: "env:REPLICATE_API_TOKEN",
    vendor: "Replicate",
    rotationDaysRemaining: 4,
    rotationWindowDays: 60,
    status: "expiring",
    lastAccessedAt: "29 May · 03:42 AEST",
    canRotate: true,
  },
  {
    key: "OPENAI_API_KEY",
    value: "env:OPENAI_API_KEY",
    vendor: "OpenAI",
    rotationDaysRemaining: -2,
    rotationWindowDays: 60,
    status: "expired",
    lastAccessedAt: "27 May · 18:48 AEST",
    canRotate: true,
  },
  {
    key: "DATABASE_URI",
    value: "postgres://payload@primitives-pg.internal:5432/primitives",
    vendor: "Postgres · Hostinger",
    rotationDaysRemaining: 58,
    rotationWindowDays: 90,
    status: "fresh",
    lastAccessedAt: "29 May · 03:58 AEST",
    canRotate: false,
  },
]

/* ------------------------------------------------------------------ *
 * Deploy gate
 * ------------------------------------------------------------------ */

export const GATE_CHECKS_PASSING: ReadonlyArray<GateCheck> = [
  {
    id: "tests",
    kind: "tests",
    label: "Unit + integration tests",
    status: "passed",
    duration: "2m 41s",
    detail: "1842 specs · 1842 passed",
  },
  {
    id: "typecheck",
    kind: "typecheck",
    label: "Strict TypeScript",
    status: "passed",
    duration: "1m 12s",
    detail: "0 errors · noEmit · strict mode",
  },
  {
    id: "lint",
    kind: "lint",
    label: "Lint + format",
    status: "passed",
    duration: "0m 38s",
    detail: "ESLint + Stylelint clean",
  },
  {
    id: "security",
    kind: "security",
    label: "SCA + secrets scan",
    status: "passed",
    duration: "0m 56s",
    detail: "0 high CVEs · 0 leaked secrets",
  },
  {
    id: "build",
    kind: "build",
    label: "Next 16 build",
    status: "passed",
    duration: "3m 02s",
    detail: "Output: 134 routes · 612 KB shared JS",
  },
  {
    id: "approval",
    kind: "owner-approval",
    label: "Owner approval",
    status: "passed",
    duration: "0m 12s",
    detail: "Approved by daniel.fleuren",
  },
]

export const GATE_CHECKS_RUNNING: ReadonlyArray<GateCheck> = [
  { ...GATE_CHECKS_PASSING[0] },
  { ...GATE_CHECKS_PASSING[1] },
  { id: "lint", kind: "lint", label: "Lint + format", status: "running", detail: "ESLint chunk 4/9" },
  { id: "security", kind: "security", label: "SCA + secrets scan", status: "pending", detail: "Queued" },
  { id: "build", kind: "build", label: "Next 16 build", status: "pending", detail: "Queued" },
  {
    id: "approval",
    kind: "owner-approval",
    label: "Owner approval",
    status: "pending",
    detail: "Will request once checks finish",
  },
]

export const GATE_CHECKS_FAILED: ReadonlyArray<GateCheck> = [
  { ...GATE_CHECKS_PASSING[0] },
  { ...GATE_CHECKS_PASSING[1] },
  { ...GATE_CHECKS_PASSING[2] },
  {
    id: "security",
    kind: "security",
    label: "SCA + secrets scan",
    status: "failed",
    duration: "0m 47s",
    detail: "1 HIGH — CVE-2026-23814 (sharp <0.34.1)",
  },
  { id: "build", kind: "build", label: "Next 16 build", status: "skipped", detail: "Skipped — security blocked" },
  {
    id: "approval",
    kind: "owner-approval",
    label: "Owner approval",
    status: "skipped",
    detail: "Cannot request — upstream failed",
  },
]

/* ------------------------------------------------------------------ *
 * Rollback revisions
 * ------------------------------------------------------------------ */

export const REVISIONS: ReadonlyArray<DeployRevision> = [
  {
    id: "rev-001",
    sha: "8b6d95e",
    message: "Refine parts crawl index presentation",
    author: "daniel.fleuren",
    authoredAt: "29 May · 03:42 AEST",
    status: "current",
    diff: { added: 142, removed: 38, files: 7 },
  },
  {
    id: "rev-002",
    sha: "6ff942c",
    message: "Reject broad GitHub governance tokens",
    author: "daniel.fleuren",
    authoredAt: "28 May · 22:55 AEST",
    status: "stable",
    diff: { added: 84, removed: 12, files: 4 },
  },
  {
    id: "rev-003",
    sha: "4b14290",
    message: "hotfix/quote-pdf-oom: bound puppeteer page pool",
    author: "kelly.macarthur",
    authoredAt: "28 May · 19:22 AEST",
    status: "stable",
    diff: { added: 56, removed: 24, files: 3 },
  },
  {
    id: "rev-004",
    sha: "fce454a",
    message: "Merge feature/mufflermen-devops-plugin",
    author: "daniel.fleuren",
    authoredAt: "27 May · 16:08 AEST",
    status: "stable",
    diff: { added: 412, removed: 188, files: 22 },
  },
  {
    id: "rev-005",
    sha: "26d19d2",
    message: "Sweep residual primitive enhancements",
    author: "daniel.fleuren",
    authoredAt: "27 May · 09:14 AEST",
    status: "rolled-back",
    diff: { added: 96, removed: 102, files: 12 },
  },
  {
    id: "rev-006",
    sha: "1ad7c8f",
    message: "feat/quote-pdf-v2: candidate (caused OOM)",
    author: "kelly.macarthur",
    authoredAt: "26 May · 14:48 AEST",
    status: "failed",
    diff: { added: 268, removed: 74, files: 9 },
  },
]

/* ------------------------------------------------------------------ *
 * Healthcheck heatmap
 * ------------------------------------------------------------------ */

function makeHours(seed: number, failHours: ReadonlyArray<number> = [], warnHours: ReadonlyArray<number> = []): ReadonlyArray<HealthBucket> {
  const out: HealthBucket[] = []
  const failSet = new Set(failHours)
  const warnSet = new Set(warnHours)
  for (let h = 0; h < 24; h += 1) {
    if (failSet.has(h)) {
      out.push("fail")
    } else if (warnSet.has(h)) {
      out.push("warn")
    } else if ((h + seed) % 11 === 7) {
      out.push("warn")
    } else {
      out.push("ok")
    }
  }
  return out
}

export const HEALTHCHECKS: ReadonlyArray<HealthcheckEndpoint> = [
  {
    path: "/api/quotes",
    label: "Quote engine",
    hours: makeHours(1),
    p95LatencyMs: 142,
  },
  {
    path: "/api/parts",
    label: "Parts catalogue",
    hours: makeHours(3, [], [12, 13]),
    p95LatencyMs: 188,
  },
  {
    path: "/api/scheduler",
    label: "Workshop scheduler",
    hours: makeHours(5),
    p95LatencyMs: 96,
  },
  {
    path: "/api/sms",
    label: "Customer SMS",
    hours: makeHours(7, [18, 19, 20], [17, 21]),
    p95LatencyMs: 612,
  },
  {
    path: "/api/payment",
    label: "Payment gateway",
    hours: makeHours(9),
    p95LatencyMs: 221,
  },
  {
    path: "/api/quote-pdf",
    label: "Quote PDF renderer",
    hours: makeHours(11, [3, 4], [2, 5]),
    p95LatencyMs: 412,
  },
]

/* ------------------------------------------------------------------ *
 * Branch previews
 * ------------------------------------------------------------------ */

export const BRANCH_PREVIEWS: ReadonlyArray<BranchPreview> = [
  {
    branch: "main",
    kind: "main",
    previewUrl: "https://primitives.mufflermen.com.au",
    headSha: "8b6d95e",
    authoredBy: "daniel.fleuren",
    authoredAt: "29 May · 03:42 AEST",
    commitsAhead: 0,
    thumbGlyph: "▣",
  },
  {
    branch: "feature/mufflermen-devops-plugin",
    kind: "feature",
    previewUrl: "https://feature-mufflermen-devops-plugin.preview.mufflermen.com.au",
    headSha: "35a823b",
    authoredBy: "daniel.fleuren",
    authoredAt: "28 May · 23:12 AEST",
    commitsAhead: 14,
    thumbGlyph: "⌬",
    prNumber: 312,
  },
  {
    branch: "hotfix/quote-pdf-oom",
    kind: "hotfix",
    previewUrl: "https://hotfix-quote-pdf-oom.preview.mufflermen.com.au",
    headSha: "4b14290",
    authoredBy: "kelly.macarthur",
    authoredAt: "28 May · 19:22 AEST",
    commitsAhead: 3,
    thumbGlyph: "✕",
    prNumber: 311,
  },
  {
    branch: "release/v3.43.0",
    kind: "release",
    previewUrl: "https://release-v3-43-0.preview.mufflermen.com.au",
    headSha: "fce454a",
    authoredBy: "daniel.fleuren",
    authoredAt: "27 May · 16:08 AEST",
    commitsAhead: 22,
    thumbGlyph: "▣▣",
    prNumber: 308,
  },
  {
    branch: "feature/parts-pdp-revamp",
    kind: "feature",
    previewUrl: "https://feature-parts-pdp-revamp.preview.mufflermen.com.au",
    headSha: "9a02d11",
    authoredBy: "alex.howell",
    authoredAt: "27 May · 11:48 AEST",
    commitsAhead: 8,
    thumbGlyph: "◳",
    prNumber: 309,
  },
]

/* ------------------------------------------------------------------ *
 * CDN cache patterns
 * ------------------------------------------------------------------ */

export const CDN_PATTERNS: ReadonlyArray<CdnCachePattern> = [
  {
    pattern: "/_next/static/*",
    description: "Built JS + CSS chunks · immutable with hashed filenames",
    hitRatio: 0.984,
    ttlMinutes: 525_600,
    rpm: 8420,
    purging: false,
  },
  {
    pattern: "/media/parts/*",
    description: "Parts catalogue imagery + product PDPs",
    hitRatio: 0.912,
    ttlMinutes: 1440,
    rpm: 1280,
    purging: false,
  },
  {
    pattern: "/api/parts/search",
    description: "Parts search · stale-while-revalidate (30s)",
    hitRatio: 0.612,
    ttlMinutes: 1,
    rpm: 442,
    purging: false,
  },
  {
    pattern: "/locations/*",
    description: "Local-SEO pages — varies by suburb",
    hitRatio: 0.486,
    ttlMinutes: 60,
    rpm: 188,
    purging: true,
  },
]

/* ------------------------------------------------------------------ *
 * DNS records
 * ------------------------------------------------------------------ */

export const DNS_RECORDS: ReadonlyArray<DnsRecord> = [
  {
    host: "mufflermen.com.au",
    type: "A",
    value: "187.127.101.6",
    ttlSeconds: 300,
    state: "propagated",
    propagationPercent: 100,
  },
  {
    host: "primitives.mufflermen.com.au",
    type: "A",
    value: "187.127.101.6",
    ttlSeconds: 300,
    state: "propagated",
    propagationPercent: 100,
  },
  {
    host: "hermes.mufflermen.com.au",
    type: "CNAME",
    value: "primitives.mufflermen.com.au.",
    ttlSeconds: 600,
    state: "partial",
    propagationPercent: 68,
  },
  {
    host: "mufflermen.com.au",
    type: "MX",
    value: "10 mx1.titan.email",
    ttlSeconds: 3600,
    state: "propagated",
    propagationPercent: 100,
  },
  {
    host: "mufflermen.com.au",
    type: "TXT",
    value:
      "v=spf1 include:_spf.titan.email include:_spf.mailgun.org ~all",
    ttlSeconds: 3600,
    state: "drift",
    propagationPercent: 41,
  },
  {
    host: "_acme-challenge.primitives.mufflermen.com.au",
    type: "TXT",
    value: "fF8aQ_2pMA7gN1uFvJ9_HmCb4xLpDqK0_acme",
    ttlSeconds: 60,
    state: "pending",
    propagationPercent: 12,
  },
]

/* ------------------------------------------------------------------ *
 * SSL certificates
 * ------------------------------------------------------------------ */

export const CERTIFICATES: ReadonlyArray<SslCertificate> = [
  {
    commonName: "primitives.mufflermen.com.au",
    altNames: ["primitives.mufflermen.com.au", "www.primitives.mufflermen.com.au"],
    issuer: "Let's Encrypt R3",
    daysUntilExpiry: 64,
    autoRenew: true,
    health: "healthy",
    chainLength: 3,
    issuedAt: "26 Mar 2026",
  },
  {
    commonName: "hermes.mufflermen.com.au",
    altNames: ["hermes.mufflermen.com.au"],
    issuer: "Let's Encrypt R3",
    daysUntilExpiry: 8,
    autoRenew: true,
    health: "renewing",
    chainLength: 3,
    issuedAt: "01 Mar 2026",
  },
  {
    commonName: "mufflermen.com.au",
    altNames: ["mufflermen.com.au", "www.mufflermen.com.au", "shop.mufflermen.com.au"],
    issuer: "Let's Encrypt R3",
    daysUntilExpiry: 3,
    autoRenew: false,
    health: "warning",
    chainLength: 3,
    issuedAt: "01 Mar 2026",
  },
  {
    commonName: "internal-api.mufflermen.com.au",
    altNames: ["internal-api.mufflermen.com.au"],
    issuer: "Self-signed (rotation pending)",
    daysUntilExpiry: -2,
    autoRenew: false,
    health: "critical",
    chainLength: 1,
    issuedAt: "20 Feb 2026",
  },
]

/* ------------------------------------------------------------------ *
 * Active incident
 * ------------------------------------------------------------------ */

export const INCIDENT_ACTIVE: ActiveIncidentSummary = {
  id: "INC-2026-05-28-quote-pdf-oom",
  title: "Quote PDF renderer OOM in production",
  severity: "sev2",
  eta: "20m",
  status:
    "Hotfix candidate 4b14290 burning in on 25 % canary. p95 memory steady at 412 MiB.",
  href: "/ui-primitives/deploy-console/incident-banner",
}

export const INCIDENT_RESOLVED: ActiveIncidentSummary = {
  id: "INC-2026-05-15-parts-api-rate-limit",
  title: "Parts catalogue API rate-limited by upstream",
  severity: "sev3",
  eta: "Resolved",
  status: "Mitigated by raising the upstream quota and adding short-TTL cache.",
  href: "/ui-primitives/deploy-console/incident-banner",
}

export const INCIDENT_CRITICAL: ActiveIncidentSummary = {
  id: "INC-2026-05-29-stripe-charge-failure",
  title: "Stripe charges failing at the gateway",
  severity: "sev1",
  eta: "10m",
  status: "Bypass mode active. Rolling back to v3.42.6.",
  href: "/ui-primitives/deploy-console/incident-banner",
}

/* ------------------------------------------------------------------ *
 * Release notes
 * ------------------------------------------------------------------ */

export const RELEASE_NOTES_TEAL: ReleaseNotes = {
  version: "v3.42.7",
  codename: "Beach Sweep 12",
  releasedAt: "29 May 2026",
  summary:
    "Polish wave on the primitives showcase — strengthens cinematic heading contrast, sharpens the parts crawl index, and tightens deploy-plugin validation.",
  changes: [
    { kind: "fix", title: "Fix crawl index tap targets", prNumber: 305 },
    { kind: "feature", title: "Strengthen cinematic heading contrast", prNumber: 304 },
    { kind: "feature", title: "Refine parts crawl index presentation", prNumber: 303 },
    { kind: "chore", title: "Validate workflow and plugin configs", prNumber: 302 },
    { kind: "security", title: "Reject broad GitHub governance tokens", prNumber: 301 },
    { kind: "perf", title: "Trim Hermes WebSocket reconnect backoff", prNumber: 300 },
  ],
}

export const RELEASE_NOTES_BREAKING: ReleaseNotes = {
  version: "v3.43.0",
  codename: "Headers Sunday",
  releasedAt: "01 Jun 2026",
  summary:
    "Major bump — swaps the parts catalogue API to /v2, drops the unauthenticated quote-PDF endpoint, and replaces Stripe Checkout with the embedded Elements flow.",
  changes: [
    { kind: "breaking", title: "Parts catalogue API moved to /v2 — /v1 removed", prNumber: 308 },
    { kind: "breaking", title: "Quote PDF endpoint requires bearer auth", prNumber: 307 },
    { kind: "security", title: "Block legacy TLS ciphers on Hermes", prNumber: 306 },
    { kind: "feature", title: "Embedded Stripe Elements checkout", prNumber: 295 },
    { kind: "perf", title: "Tree-shake Lucide icon bundles", prNumber: 289 },
    { kind: "fix", title: "Quote-PDF page pool no longer leaks Puppeteer pages", prNumber: 311 },
  ],
}

export const RELEASE_NOTES_PATCH: ReleaseNotes = {
  version: "v3.42.6",
  releasedAt: "27 May 2026",
  summary: "Patch — resume Seedance predictions after poll timeouts.",
  changes: [
    { kind: "fix", title: "Resume Seedance predictions after poll timeouts", prNumber: 287 },
    { kind: "chore", title: "Bump Replicate SDK to 0.34.6", prNumber: 286 },
  ],
}

/* ------------------------------------------------------------------ *
 * Deploy timeline
 * ------------------------------------------------------------------ */

export const DEPLOY_HISTORY: ReadonlyArray<DeployTimelineEntry> = [
  {
    id: "d-001",
    version: "v3.42.7",
    sha: "8b6d95e",
    author: "daniel.fleuren",
    startedAt: "29 May · 03:48 AEST",
    duration: "3m 12s",
    outcome: "succeeded",
    canaryPercent: 100,
    target: "production",
  },
  {
    id: "d-002",
    version: "v3.42.7-rc1",
    sha: "4b14290",
    author: "kelly.macarthur",
    startedAt: "28 May · 19:48 AEST",
    duration: "4m 02s",
    outcome: "running",
    canaryPercent: 25,
    target: "production",
  },
  {
    id: "d-003",
    version: "v3.42.6",
    sha: "59dfe67",
    author: "daniel.fleuren",
    startedAt: "27 May · 17:14 AEST",
    duration: "2m 58s",
    outcome: "succeeded",
    canaryPercent: 100,
    target: "production",
  },
  {
    id: "d-004",
    version: "v3.42.5",
    sha: "1ad7c8f",
    author: "kelly.macarthur",
    startedAt: "26 May · 14:48 AEST",
    duration: "7m 41s",
    outcome: "rolled-back",
    canaryPercent: 50,
    target: "production",
  },
  {
    id: "d-005",
    version: "v3.42.4",
    sha: "fce454a",
    author: "daniel.fleuren",
    startedAt: "26 May · 11:22 AEST",
    duration: "3m 14s",
    outcome: "succeeded",
    canaryPercent: 100,
    target: "production",
  },
  {
    id: "d-006",
    version: "v3.43.0-beta",
    sha: "9a02d11",
    author: "alex.howell",
    startedAt: "25 May · 21:42 AEST",
    duration: "12m 04s",
    outcome: "failed",
    target: "preview",
  },
]

/* ------------------------------------------------------------------ *
 * Runtime versions
 * ------------------------------------------------------------------ */

export const RUNTIME_VERSIONS: ReadonlyArray<RuntimeVersion> = [
  {
    kind: "node",
    label: "Node.js",
    currentVersion: "22.11.0",
    pinnedVersion: "22.11.0",
    latestVersion: "22.12.0",
    drift: "matched",
    supportWindow: "Active LTS · until 30 Apr 2027",
  },
  {
    kind: "next",
    label: "Next.js",
    currentVersion: "16.0.4",
    pinnedVersion: "16.0.4",
    latestVersion: "16.1.0",
    drift: "matched",
    supportWindow: "Current · until 14 Aug 2026",
  },
  {
    kind: "pnpm",
    label: "pnpm",
    currentVersion: "9.12.3",
    pinnedVersion: "9.12.3",
    latestVersion: "10.0.0",
    drift: "matched",
    supportWindow: "Pinned via packageManager",
  },
  {
    kind: "docker",
    label: "Docker engine",
    currentVersion: "27.4.0",
    pinnedVersion: "27.4.0",
    latestVersion: "27.4.1",
    drift: "matched",
    supportWindow: "Hostinger VPS · Ubuntu 24.04",
  },
  {
    kind: "postgres",
    label: "Postgres",
    currentVersion: "16.5",
    pinnedVersion: "16.6",
    latestVersion: "17.0",
    drift: "behind",
    supportWindow: "Behind pin — minor bump pending",
  },
  {
    kind: "redis",
    label: "Redis",
    currentVersion: "7.4.2",
    pinnedVersion: "7.2.5",
    latestVersion: "7.4.2",
    drift: "ahead",
    supportWindow: "Drifted ahead — re-pin recommended",
  },
]

/* ------------------------------------------------------------------ *
 * Traffic shift presets
 * ------------------------------------------------------------------ */

export const TRAFFIC_SHIFT_BLUE: TrafficShiftState = {
  bluePercent: 100,
  stickiness: true,
  blueLabel: "v3.42.6",
  greenLabel: "v3.42.7",
}

export const TRAFFIC_SHIFT_CANARY: TrafficShiftState = {
  bluePercent: 75,
  stickiness: true,
  blueLabel: "v3.42.6",
  greenLabel: "v3.42.7",
}

export const TRAFFIC_SHIFT_GREEN: TrafficShiftState = {
  bluePercent: 0,
  stickiness: false,
  blueLabel: "v3.42.6",
  greenLabel: "v3.42.7",
}
