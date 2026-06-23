/**
 * Shared auth-deep primitive types.
 *
 * These extend the shallow auth pack into account-security territory:
 * MFA enrolment, SSO config, passkeys, sessions, audit feeds, recovery
 * codes, trusted devices, account lockout, breach checks, tenant
 * permission matrices, consent records, and admin impersonation.
 *
 * Pure value types only — no rendering concerns.
 */

/** Tone vocabulary shared across the auth-deep pack. */
export type AuthTone = "neutral" | "red" | "amber" | "teal" | "green"

/** Severity level used in the audit feed and lockout meter. */
export type AuthSeverity = "info" | "low" | "medium" | "high" | "critical"

/** MFA channel the user is enrolling. */
export type MfaMethod = "totp" | "sms" | "email" | "security-key" | "backup-codes"

/** Lifecycle of an MFA enrolment flow. */
export type MfaEnrollStatus =
  | "select-method"
  | "verifying"
  | "code-issued"
  | "enrolled"
  | "failed"

/** Supported SSO identity providers. */
export type SsoProvider =
  | "google-workspace"
  | "okta"
  | "azure-ad"
  | "onelogin"
  | "custom-saml"

/** SSO lifecycle state. */
export type SsoStatus =
  | "not-configured"
  | "draft"
  | "active"
  | "error"
  | "suspended"

/** Magic-link delivery state. */
export type MagicLinkStatus =
  | "sending"
  | "sent"
  | "opened"
  | "expired"
  | "failed"

/** Passkey transport surface. */
export type PasskeyTransport = "usb" | "nfc" | "ble" | "internal" | "hybrid"

/** Lifecycle of a registered passkey. */
export type PasskeyStatus = "active" | "revoked" | "expired"

/** Active-session origin classification. */
export type SessionRiskTone = "trusted" | "watchlist" | "blocked"

/** Audit event category. */
export type AuthAuditKind =
  | "login-success"
  | "login-failed"
  | "logout"
  | "mfa-enrolled"
  | "mfa-failed"
  | "password-changed"
  | "passkey-added"
  | "passkey-revoked"
  | "session-revoked"
  | "permission-granted"
  | "permission-revoked"
  | "impersonation-start"
  | "impersonation-end"

/** Recovery-code lifecycle for the recovery-codes card. */
export type RecoveryCodeStatus =
  | "fresh"
  | "downloaded"
  | "rotated"
  | "exhausted"

/** Trust scope for a device-trust record. */
export type DeviceTrustScope = "single-session" | "30-days" | "forever"

/** Login-attempt meter lockout state. */
export type LockoutState = "open" | "warning" | "locked" | "throttled"

/** Password strength tier — internal to auth-deep meter. */
export type PasswordTier =
  | "empty"
  | "weak"
  | "fair"
  | "good"
  | "strong"
  | "breached"

/** Permission verb used in the tenant matrix. */
export type PermissionVerb =
  | "view"
  | "edit"
  | "create"
  | "delete"
  | "approve"
  | "admin"

/** Mufflermen tenants. */
export type MufflermenTenantId =
  | "oak-flats-mufflermen"
  | "illawarra-4wd-co"
  | "pacemaker-distributor"

/** Workforce role. */
export type MufflermenRole =
  | "admin"
  | "manager"
  | "tech"
  | "apprentice"
  | "content"
  | "customer"

/** Consent record state. */
export type ConsentStatus = "accepted" | "withdrawn" | "expired" | "pending"

/** Consent record kind. */
export type ConsentKind =
  | "terms"
  | "privacy"
  | "marketing"
  | "cookies"
  | "data-export"
  | "ai-processing"

/** Map an MFA method to chip tone. */
export const MFA_METHOD_TONE: Record<MfaMethod, AuthTone> = {
  totp: "green",
  sms: "amber",
  email: "amber",
  "security-key": "teal",
  "backup-codes": "neutral",
}

/** Map an SSO status to chip tone. */
export const SSO_STATUS_TONE: Record<SsoStatus, AuthTone> = {
  "not-configured": "neutral",
  draft: "amber",
  active: "green",
  error: "red",
  suspended: "amber",
}

/** Map a session risk to chip tone. */
export const SESSION_RISK_TONE: Record<SessionRiskTone, AuthTone> = {
  trusted: "green",
  watchlist: "amber",
  blocked: "red",
}

/** Map an audit severity to chip tone. */
export const SEVERITY_TONE: Record<AuthSeverity, AuthTone> = {
  info: "teal",
  low: "neutral",
  medium: "amber",
  high: "amber",
  critical: "red",
}

/** Map a lockout state to chip tone. */
export const LOCKOUT_TONE: Record<LockoutState, AuthTone> = {
  open: "green",
  warning: "amber",
  locked: "red",
  throttled: "amber",
}

/** Map a password tier to chip tone. */
export const PASSWORD_TIER_TONE: Record<PasswordTier, AuthTone> = {
  empty: "neutral",
  weak: "red",
  fair: "amber",
  good: "teal",
  strong: "green",
  breached: "red",
}

/** Map a consent status to chip tone. */
export const CONSENT_STATUS_TONE: Record<ConsentStatus, AuthTone> = {
  accepted: "green",
  withdrawn: "neutral",
  expired: "amber",
  pending: "amber",
}

/** Map a tenant id to its readable label. */
export const TENANT_LABEL: Record<MufflermenTenantId, string> = {
  "oak-flats-mufflermen": "Oak Flats Mufflermen",
  "illawarra-4wd-co": "Illawarra 4WD Co",
  "pacemaker-distributor": "Pacemaker Distributor",
}

/** Mask a sensitive string — preserves prefix/suffix for recognisability. */
export function maskSecret(
  value: string,
  visiblePrefix = 2,
  visibleSuffix = 4,
): string {
  if (value.length <= visiblePrefix + visibleSuffix) {
    return "•".repeat(Math.max(value.length, 6))
  }
  const head = value.slice(0, visiblePrefix)
  const tail = value.slice(-visibleSuffix)
  const middle = "•".repeat(Math.max(value.length - visiblePrefix - visibleSuffix, 4))
  return `${head}${middle}${tail}`
}
