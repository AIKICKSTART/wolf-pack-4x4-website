/**
 * Showcase fixtures for the auth-deep primitive pack.
 *
 * Realistic Oak Flats Mufflermen tenant data — Mick D, Brad S, Jase M,
 * Pacemaker Distributor, Illawarra 4WD Co, mufflermen.com.au Google
 * Workspace, NSW geo, brute-force suspect from QLD.
 *
 * Fixture values are deliberately stable so the showcase routes stay
 * deterministic in screenshots and visual diffs.
 */

import type {
  AccountLockoutCardProps,
  ActiveSession,
  AuditLogEntry,
  ConsentRecordRowProps,
  DeviceTrustRowProps,
  ImpersonationBannerProps,
  LoginAttemptMeterProps,
  MagicLinkStatusProps,
  MfaEnrollmentCardProps,
  PasskeyRecord,
  PermissionAssignment,
  PermissionScope,
  RecoveryCodesCardProps,
  SessionManagerPanelProps,
  SsoProviderRowProps,
  TenantPermissionMatrixProps,
} from "../components/auth-deep"
import type { PermissionVerb } from "../components/auth-deep"

/* ── MFA enrolment ───────────────────────────────────────────────── */

export const MFA_SELECT: MfaEnrollmentCardProps = {
  principalLabel: "Mick Davies",
  tenantLabel: "Oak Flats Mufflermen",
  selectedMethod: "totp",
  availableMethods: ["totp", "security-key", "sms", "email", "backup-codes"],
  status: "select-method",
  policyNote: "Required for admins",
}

export const MFA_CODE_ISSUED: MfaEnrollmentCardProps = {
  principalLabel: "Brad Sterling",
  tenantLabel: "Pacemaker Distributor",
  selectedMethod: "totp",
  availableMethods: ["totp", "security-key", "sms"],
  status: "code-issued",
  totpSecret: "MUFL ERMN OAKF LATS 25NS WC25 ALPHA",
  expiresInSeconds: 42,
  policyNote: "30s code · rotate now",
}

export const MFA_ENROLLED: MfaEnrollmentCardProps = {
  principalLabel: "Jase Moretti",
  tenantLabel: "Illawarra 4WD Co",
  selectedMethod: "security-key",
  availableMethods: ["totp", "security-key"],
  status: "enrolled",
  policyNote: "Hardware key on file",
}

/* ── SSO ─────────────────────────────────────────────────────────── */

export const SSO_ROWS: ReadonlyArray<SsoProviderRowProps> = [
  {
    provider: "google-workspace",
    domain: "mufflermen.com.au",
    status: "active",
    jitProvisioning: true,
    lastSyncIso: "2026-05-29T07:18:00+10:00",
    memberCount: 14,
    clientId: "812476183-mufflermenoakflats.apps.googleusercontent.com",
  },
  {
    provider: "azure-ad",
    domain: "pacemaker.partner.mufflermen.com.au",
    status: "draft",
    jitProvisioning: false,
    memberCount: 0,
    clientId: "5f1e8b1c-83a4-4f5a-9b4f-pacemakerentra",
  },
  {
    provider: "okta",
    domain: "illawarra4wd.okta.com",
    status: "error",
    jitProvisioning: true,
    lastSyncIso: "2026-05-28T22:42:00+10:00",
    memberCount: 6,
    clientId: "0oa1f2g3h4i5j6k7-illawarra-4wd",
    errorBrief: "SCIM token expired — rotate to resume.",
  },
  {
    provider: "custom-saml",
    status: "not-configured",
    jitProvisioning: false,
  },
]

/* ── Magic links ─────────────────────────────────────────────────── */

export const MAGIC_SENT: MagicLinkStatusProps = {
  recipientEmail: "mick.davies@mufflermen.com.au",
  status: "sent",
  expiresInSeconds: 540,
  tenantLabel: "Oak Flats Mufflermen",
  inboxProvider: "gmail",
}

export const MAGIC_OPENED: MagicLinkStatusProps = {
  recipientEmail: "brad.sterling@mufflermen.com.au",
  status: "opened",
  expiresInSeconds: 220,
  tenantLabel: "Pacemaker Distributor",
  inboxProvider: "gmail",
}

export const MAGIC_EXPIRED: MagicLinkStatusProps = {
  recipientEmail: "support@illawarra4wd.com.au",
  status: "expired",
  expiresInSeconds: 0,
  tenantLabel: "Illawarra 4WD Co",
  inboxProvider: "outlook",
}

/* ── Passkeys ────────────────────────────────────────────────────── */

export const PASSKEYS: ReadonlyArray<PasskeyRecord> = [
  {
    id: "pk-001",
    label: "Mick's MacBook Pro",
    transport: "internal",
    registeredAtIso: "2025-11-04T09:12:00+10:00",
    lastUsedIso: "2026-05-29T07:42:00+10:00",
    status: "active",
    manufacturer: "Apple",
  },
  {
    id: "pk-002",
    label: "YubiKey 5C NFC",
    transport: "usb",
    registeredAtIso: "2025-08-22T15:30:00+10:00",
    lastUsedIso: "2026-05-22T11:08:00+10:00",
    status: "active",
    manufacturer: "Yubico",
  },
  {
    id: "pk-003",
    label: "Mick's iPhone 16 Pro",
    transport: "internal",
    registeredAtIso: "2025-12-18T19:04:00+10:00",
    lastUsedIso: "2026-05-28T17:22:00+10:00",
    status: "active",
    manufacturer: "Apple",
  },
  {
    id: "pk-004",
    label: "Old workshop tablet (Samsung)",
    transport: "ble",
    registeredAtIso: "2024-06-10T08:30:00+10:00",
    lastUsedIso: "2024-12-02T16:11:00+10:00",
    status: "revoked",
    manufacturer: "Samsung",
  },
]

export const PASSKEY_EMPTY: ReadonlyArray<PasskeyRecord> = []

/* ── Sessions ───────────────────────────────────────────────────── */

export const SESSIONS: ReadonlyArray<ActiveSession> = [
  {
    id: "s-001",
    device: "MacBook Pro 14 · Chrome 138",
    os: "macOS 15.4",
    location: "Oak Flats NSW · 2528",
    ipMasked: "203.30.124.•••",
    lastActiveIso: "2026-05-29T08:42:00+10:00",
    risk: "trusted",
    isCurrent: true,
  },
  {
    id: "s-002",
    device: "iPhone 16 Pro · Safari Mobile",
    os: "iOS 18.4",
    location: "Wollongong NSW · 2500",
    ipMasked: "203.30.99.•••",
    lastActiveIso: "2026-05-29T07:30:00+10:00",
    risk: "trusted",
    isCurrent: false,
  },
  {
    id: "s-003",
    device: "Workshop iPad · Safari",
    os: "iPadOS 18.4",
    location: "Oak Flats NSW · 2528",
    ipMasked: "10.0.4.•••",
    lastActiveIso: "2026-05-28T17:14:00+10:00",
    risk: "trusted",
    isCurrent: false,
  },
  {
    id: "s-004",
    device: "Unknown Linux · Firefox 129",
    os: "Ubuntu 24.04",
    location: "Brisbane QLD · 4000",
    ipMasked: "139.218.40.•••",
    lastActiveIso: "2026-05-29T06:48:00+10:00",
    risk: "watchlist",
    isCurrent: false,
  },
]

export const SESSION_PANEL: SessionManagerPanelProps = {
  ownerLabel: "Mick Davies — Admin",
  tenantLabel: "Oak Flats Mufflermen",
  sessions: SESSIONS,
}

/* ── Audit feed ─────────────────────────────────────────────────── */

export const AUDIT_ENTRIES: ReadonlyArray<AuditLogEntry> = [
  {
    id: "a-009",
    atIso: "2026-05-29T06:48:12+10:00",
    actorLabel: "Mick Davies",
    kind: "login-failed",
    severity: "critical",
    summary:
      "Sign-in attempt from new IP block — Brisbane QLD (usually NSW). Geo-velocity anomaly + unknown user-agent.",
    location: "Brisbane QLD · 4000",
    ipMasked: "139.218.40.•••",
  },
  {
    id: "a-008",
    atIso: "2026-05-29T06:47:51+10:00",
    actorLabel: "Mick Davies",
    kind: "login-failed",
    severity: "high",
    summary:
      "Password rejected — 3rd attempt within 30s. Brute-force guard armed.",
    location: "Brisbane QLD · 4000",
    ipMasked: "139.218.40.•••",
  },
  {
    id: "a-007",
    atIso: "2026-05-29T07:42:00+10:00",
    actorLabel: "Mick Davies",
    kind: "login-success",
    severity: "info",
    summary: "Passkey sign-in from MacBook Pro 14, mufflermen.com.au SSO.",
    location: "Oak Flats NSW",
    ipMasked: "203.30.124.•••",
  },
  {
    id: "a-006",
    atIso: "2026-05-28T17:14:00+10:00",
    actorLabel: "Brad Sterling",
    kind: "session-revoked",
    severity: "low",
    summary: "Closed iPad session before leaving workshop floor.",
    location: "Oak Flats NSW",
    ipMasked: "10.0.4.•••",
  },
  {
    id: "a-005",
    atIso: "2026-05-28T11:08:00+10:00",
    actorLabel: "Jase Moretti",
    kind: "mfa-enrolled",
    severity: "info",
    summary: "Enrolled YubiKey 5C as second factor.",
    location: "Wollongong NSW",
    ipMasked: "203.30.99.•••",
  },
  {
    id: "a-004",
    atIso: "2026-05-27T15:22:00+10:00",
    actorLabel: "Mick Davies",
    kind: "permission-granted",
    severity: "medium",
    summary:
      "Granted billing.invoices.admin to Brad Sterling for Pacemaker Distributor tenant.",
    location: "Oak Flats NSW",
    ipMasked: "203.30.124.•••",
  },
  {
    id: "a-003",
    atIso: "2026-05-27T09:11:00+10:00",
    actorLabel: "system",
    kind: "password-changed",
    severity: "low",
    summary: "Forced password rotation after 90-day policy expiry for Lucy Park.",
  },
  {
    id: "a-002",
    atIso: "2026-05-26T14:32:00+10:00",
    actorLabel: "Mick Davies",
    kind: "impersonation-start",
    severity: "high",
    summary:
      "Started impersonation of customer Hannah Roe — case SUPPORT-2026-0184.",
    location: "Oak Flats NSW",
    ipMasked: "203.30.124.•••",
  },
  {
    id: "a-001",
    atIso: "2026-05-26T14:46:00+10:00",
    actorLabel: "Mick Davies",
    kind: "impersonation-end",
    severity: "info",
    summary:
      "Exited impersonation of Hannah Roe — duration 14m, ticket resolved.",
    location: "Oak Flats NSW",
    ipMasked: "203.30.124.•••",
  },
]

/* ── Recovery codes ─────────────────────────────────────────────── */

const CODE_SAMPLES = [
  "4F8X-2KQ9-PL3M",
  "7C1H-WD8B-V9NJ",
  "ZK52-3RT6-MX44",
  "QP1A-9YE2-CB7K",
  "T6N3-LR8F-MJ52",
  "9XW2-VK5C-AH7E",
  "PD3F-1QB8-9MZK",
  "RR84-CE5G-NTV1",
] as const

export const RECOVERY_FRESH: RecoveryCodesCardProps = {
  ownerLabel: "Mick Davies",
  tenantLabel: "Oak Flats Mufflermen",
  status: "fresh",
  codes: CODE_SAMPLES,
  usedCount: 0,
  generatedAtIso: "2026-05-29T07:55:00+10:00",
  awaitingConfirm: true,
}

export const RECOVERY_DOWNLOADED: RecoveryCodesCardProps = {
  ownerLabel: "Brad Sterling",
  tenantLabel: "Pacemaker Distributor",
  status: "downloaded",
  codes: CODE_SAMPLES,
  usedCount: 1,
  generatedAtIso: "2026-04-22T11:14:00+10:00",
  awaitingConfirm: false,
}

export const RECOVERY_EXHAUSTED: RecoveryCodesCardProps = {
  ownerLabel: "Jase Moretti",
  tenantLabel: "Illawarra 4WD Co",
  status: "exhausted",
  codes: CODE_SAMPLES,
  usedCount: 8,
  generatedAtIso: "2025-09-12T08:30:00+10:00",
  awaitingConfirm: false,
}

/* ── Device trust ───────────────────────────────────────────────── */

export const DEVICE_TRUST_ROWS: ReadonlyArray<DeviceTrustRowProps> = [
  {
    id: "dt-001",
    device: "MacBook Pro 14 · Chrome 138",
    os: "macOS 15.4",
    scope: "forever",
    trustedAtIso: "2025-08-12T09:00:00+10:00",
    lastUsedIso: "2026-05-29T07:42:00+10:00",
    fingerprintMasked: "fp_8a3•••2c1",
    isCurrent: true,
  },
  {
    id: "dt-002",
    device: "iPhone 16 Pro · Safari",
    os: "iOS 18.4",
    scope: "30-days",
    trustedAtIso: "2026-05-22T17:18:00+10:00",
    lastUsedIso: "2026-05-29T07:30:00+10:00",
    fingerprintMasked: "fp_9c1•••4b7",
  },
  {
    id: "dt-003",
    device: "Workshop iPad · Safari",
    os: "iPadOS 18.4",
    scope: "single-session",
    trustedAtIso: "2026-05-29T07:00:00+10:00",
    lastUsedIso: "2026-05-29T08:14:00+10:00",
    fingerprintMasked: "fp_2e5•••f01",
  },
]

/* ── Login attempt meter ────────────────────────────────────────── */

export const LOGIN_METER_OPEN: LoginAttemptMeterProps = {
  principalLabel: "Mick Davies",
  tenantLabel: "Oak Flats Mufflermen",
  failedAttempts: 1,
  lockoutThreshold: 5,
  state: "open",
  lastFailureIso: "2026-05-29T06:46:14+10:00",
  lastFailureLocation: "Brisbane QLD",
}

export const LOGIN_METER_WARNING: LoginAttemptMeterProps = {
  principalLabel: "Mick Davies",
  tenantLabel: "Oak Flats Mufflermen",
  failedAttempts: 4,
  lockoutThreshold: 5,
  state: "warning",
  lastFailureIso: "2026-05-29T06:48:01+10:00",
  lastFailureLocation: "Brisbane QLD",
}

export const LOGIN_METER_LOCKED: LoginAttemptMeterProps = {
  principalLabel: "Mick Davies",
  tenantLabel: "Oak Flats Mufflermen",
  failedAttempts: 5,
  lockoutThreshold: 5,
  state: "locked",
  lockoutRemainingSeconds: 312,
  lastFailureIso: "2026-05-29T06:48:42+10:00",
  lastFailureLocation: "Brisbane QLD",
}

/* ── Tenant permission matrix ───────────────────────────────────── */

export const PERMISSION_SCOPES: ReadonlyArray<PermissionScope> = [
  {
    id: "workshop.bookings",
    label: "Workshop → Bookings",
    hint: "Bay assignments, ETA, customer notes.",
  },
  {
    id: "workshop.quotes",
    label: "Workshop → Quotes",
    hint: "Line items, supplier pricing, approval.",
  },
  {
    id: "inventory.parts",
    label: "Inventory → Parts",
    hint: "SKU CRUD, supplier mapping, pricing.",
  },
  {
    id: "billing.invoices",
    label: "Billing → Invoices",
    hint: "Issue, void, send reminder.",
  },
  {
    id: "billing.payments",
    label: "Billing → Payments",
    hint: "Refund, chargeback, reconciliation.",
  },
  {
    id: "tenant.admin",
    label: "Tenant → Admin",
    hint: "Members, SSO, audit feed, billing plan.",
  },
]

export const PERMISSION_VERBS: ReadonlyArray<PermissionVerb> = [
  "view",
  "edit",
  "create",
  "delete",
  "approve",
  "admin",
]

export const PERMISSION_ASSIGNMENT_TECH: PermissionAssignment = {
  principalId: "u-brad",
  principalLabel: "Brad Sterling — Tech",
  byScope: {
    "workshop.bookings": ["view", "edit", "create"],
    "workshop.quotes": ["view", "edit"],
    "inventory.parts": ["view"],
    "billing.invoices": ["view"],
    "billing.payments": [],
    "tenant.admin": [],
  },
}

export const PERMISSION_ASSIGNMENT_MANAGER: PermissionAssignment = {
  principalId: "u-mick",
  principalLabel: "Mick Davies — Admin",
  byScope: {
    "workshop.bookings": ["admin"],
    "workshop.quotes": ["view", "edit", "create", "delete", "approve"],
    "inventory.parts": ["view", "edit", "create", "delete"],
    "billing.invoices": ["view", "edit", "create", "approve"],
    "billing.payments": ["view", "approve"],
    "tenant.admin": ["admin"],
  },
}

export const PERMISSION_ASSIGNMENT_APPRENTICE: PermissionAssignment = {
  principalId: "u-jase",
  principalLabel: "Jase Moretti — Apprentice",
  byScope: {
    "workshop.bookings": ["view"],
    "workshop.quotes": ["view"],
    "inventory.parts": ["view"],
    "billing.invoices": [],
    "billing.payments": [],
    "tenant.admin": [],
  },
}

export const PERMISSION_MATRIX_DEFAULT: TenantPermissionMatrixProps = {
  tenantId: "oak-flats-mufflermen",
  scopes: PERMISSION_SCOPES,
  verbs: PERMISSION_VERBS,
  assignment: PERMISSION_ASSIGNMENT_TECH,
}

/* ── Consent records ────────────────────────────────────────────── */

export const CONSENT_RECORDS: ReadonlyArray<ConsentRecordRowProps> = [
  {
    id: "c-001",
    kind: "terms",
    policyVersion: "v4.2",
    status: "accepted",
    acceptedAtIso: "2025-11-22T09:14:00+10:00",
    source: "Sign-up form",
    ipMasked: "203.30.124.•••",
  },
  {
    id: "c-002",
    kind: "privacy",
    policyVersion: "v3.0",
    status: "accepted",
    acceptedAtIso: "2025-11-22T09:14:08+10:00",
    source: "Sign-up form",
    ipMasked: "203.30.124.•••",
  },
  {
    id: "c-003",
    kind: "marketing",
    policyVersion: "v1.2",
    status: "withdrawn",
    acceptedAtIso: "2025-11-22T09:14:18+10:00",
    withdrawnAtIso: "2026-02-04T18:42:00+10:00",
    source: "Account settings",
    ipMasked: "203.30.99.•••",
  },
  {
    id: "c-004",
    kind: "cookies",
    policyVersion: "v2.0",
    status: "expired",
    acceptedAtIso: "2024-04-12T11:00:00+10:00",
    source: "Cookie banner",
  },
  {
    id: "c-005",
    kind: "ai-processing",
    policyVersion: "v1.0",
    status: "pending",
    source: "Onboarding step 3",
  },
]

/* ── Impersonation banner ───────────────────────────────────────── */

export const IMPERSONATION_BANNER: ImpersonationBannerProps = {
  adminLabel: "Mick Davies",
  subjectLabel: "Hannah Roe — Customer",
  reasonRef: "SUPPORT-2026-0184",
  reasonText: "Repro booking-checkout failure on cat-back upgrade",
  startedAtIso: "2026-05-29T08:28:00+10:00",
  autoExitInSeconds: 540,
  tenantLabel: "Oak Flats Mufflermen",
}

export const IMPERSONATION_URGENT: ImpersonationBannerProps = {
  adminLabel: "Mick Davies",
  subjectLabel: "Hannah Roe — Customer",
  reasonRef: "SUPPORT-2026-0184",
  reasonText: "Repro booking-checkout failure on cat-back upgrade",
  startedAtIso: "2026-05-29T08:28:00+10:00",
  autoExitInSeconds: 38,
  tenantLabel: "Oak Flats Mufflermen",
}

/* ── Account lockout card ───────────────────────────────────────── */

export const LOCKOUT_BRUTEFORCE: AccountLockoutCardProps = {
  ownerLabel: "Mick Davies",
  tenantLabel: "Oak Flats Mufflermen",
  reason: "brute-force",
  incidentRef: "INC-2026-0117",
  lockedAtIso: "2026-05-29T06:48:42+10:00",
  recoveryEmailMasked: "mick.davies@mufflermen.com.au",
  identityVerified: false,
}

export const LOCKOUT_COMPROMISED: AccountLockoutCardProps = {
  ownerLabel: "Lucy Park",
  tenantLabel: "Pacemaker Distributor",
  reason: "compromised-credentials",
  incidentRef: "INC-2026-0114",
  lockedAtIso: "2026-05-27T22:10:00+10:00",
  recoveryEmailMasked: "lucy.park@pacemaker.com.au",
  identityVerified: true,
}

export const LOCKOUT_COMPLIANCE: AccountLockoutCardProps = {
  ownerLabel: "Reece Saunders",
  tenantLabel: "Illawarra 4WD Co",
  reason: "compliance-hold",
  incidentRef: "COMP-2026-029",
  lockedAtIso: "2026-05-25T10:00:00+10:00",
  recoveryEmailMasked: "reece@illawarra4wd.com.au",
  identityVerified: true,
}

/* ── Password meter ─────────────────────────────────────────────── */

export interface PasswordSample {
  value: string
  breachHits?: number
  breachCheckPending?: boolean
}

export const PASSWORD_SAMPLES: ReadonlyArray<PasswordSample> = [
  { value: "" },
  { value: "muffler" },
  { value: "Muffler1!" },
  { value: "OakFlats!N5W2528-Maranello" },
  { value: "password123", breachHits: 21341873 },
  { value: "BradS-1985", breachCheckPending: true },
]
