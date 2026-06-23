import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "auth-deep",
  "title": "Auth deep",
  "group": "Auth",
  "summary": "14 deep authentication control surfaces — MFA enrolment, SSO, passkeys, sessions, audit, recovery codes, device trust, brute-force/lockout, password strength, permission matrix, consent, and impersonation — sharing AuthTone/severity tone maps and a maskSecret helper.",
  "entries": [
    {
      "key": "auth-deep/mfa-enrollment-card",
      "family": "auth-deep",
      "name": "MfaEnrollmentCard",
      "label": "MFA enrolment card",
      "description": "Three-step MFA enrolment wizard with radio method picker, masked TOTP secret block, expiry countdown, and a status-driven primary CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/mfa-enrollment-card",
      "tags": [
        "mfa",
        "totp",
        "enrolment",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/sso-provider-row",
      "family": "auth-deep",
      "name": "SsoProviderRow",
      "label": "SSO provider row",
      "description": "Identity-provider row showing provisioning status, member count, JIT toggle, last-sync relative time, masked client ID, and sync/configure actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/sso-provider-row",
      "tags": [
        "sso",
        "saml",
        "provisioning",
        "identity"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/magic-link-status",
      "family": "auth-deep",
      "name": "MagicLinkStatus",
      "label": "Magic link status",
      "description": "Live magic-link sign-in status card with animated envelope, masked recipient email, expiry countdown, and resend / change-email actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/magic-link-status",
      "tags": [
        "magic-link",
        "passwordless",
        "email",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/passkey-management-card",
      "family": "auth-deep",
      "name": "PasskeyManagementCard",
      "label": "Passkey management card",
      "description": "WebAuthn passkey list with transport, manufacturer, registered/last-used times, per-key revoke, active count, and an add-passkey action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/passkey-management-card",
      "tags": [
        "passkey",
        "webauthn",
        "biometric",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/session-manager-panel",
      "family": "auth-deep",
      "name": "SessionManagerPanel",
      "label": "Session manager panel",
      "description": "Active-sessions table with device/OS, location, masked IP, last-active time, risk chips, per-session revoke, and a sign-out-everywhere action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/session-manager-panel",
      "tags": [
        "sessions",
        "devices",
        "revoke",
        "risk"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/audit-log-feed",
      "family": "auth-deep",
      "name": "AuditLogFeed",
      "label": "Audit log feed",
      "description": "Timeline feed of authentication audit events with severity chips, filter toolbar, per-entry actor, location, masked IP, and a critical-count summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/audit-log-feed",
      "tags": [
        "audit",
        "log",
        "timeline",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/recovery-codes-card",
      "family": "auth-deep",
      "name": "RecoveryCodesCard",
      "label": "Recovery codes card",
      "description": "Show-once recovery-codes grid with reveal/hide, used markers, remaining count, download/print/regenerate toolbar, and a saved-confirmation gate.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/recovery-codes-card",
      "tags": [
        "recovery-codes",
        "backup",
        "mfa",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/device-trust-row",
      "family": "auth-deep",
      "name": "DeviceTrustRow",
      "label": "Device trust row",
      "description": "Trusted-device row showing trust scope, trusted/last-used dates, masked fingerprint, current-device badge, and extend/remove trust actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/device-trust-row",
      "tags": [
        "device-trust",
        "remember-device",
        "scope",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/login-attempt-meter",
      "family": "auth-deep",
      "name": "LoginAttemptMeter",
      "label": "Login attempt meter",
      "description": "Brute-force guard meter with segmented tick progressbar against a lockout threshold, lockout/throttle countdown, last-failure facts, and reset/clear actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/login-attempt-meter",
      "tags": [
        "brute-force",
        "lockout",
        "rate-limit",
        "meter"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/password-strength-meter",
      "family": "auth-deep",
      "name": "PasswordStrengthMeter",
      "label": "Password strength meter",
      "description": "Live password-strength meter scoring five rules into tier bars, with show/hide toggle, HIBP breach chips, and an onTierChange callback.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/password-strength-meter",
      "tags": [
        "password",
        "strength",
        "breach",
        "validation"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/tenant-permission-matrix",
      "family": "auth-deep",
      "name": "TenantPermissionMatrix",
      "label": "Tenant permission matrix",
      "description": "Per-tenant scope-by-verb permission grid of toggle checkboxes, with admin-verb inheritance, scope hints, and a granted/inherited/denied legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/tenant-permission-matrix",
      "tags": [
        "rbac",
        "permissions",
        "tenant",
        "matrix"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/consent-record-row",
      "family": "auth-deep",
      "name": "ConsentRecordRow",
      "label": "Consent record row",
      "description": "GDPR-style consent record row showing policy kind/version, accepted/withdrawn timestamps, capture source, masked IP, and view-artifact / withdraw actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/consent-record-row",
      "tags": [
        "consent",
        "gdpr",
        "privacy",
        "compliance"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/impersonation-banner",
      "family": "auth-deep",
      "name": "ImpersonationBanner",
      "label": "Impersonation banner",
      "description": "Alert banner announcing an active admin-as-user impersonation session with reason reference, elapsed time, auto-exit countdown, and extend/exit actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/impersonation-banner",
      "tags": [
        "impersonation",
        "admin",
        "support",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "auth-deep/account-lockout-card",
      "family": "auth-deep",
      "name": "AccountLockoutCard",
      "label": "Account lockout card",
      "description": "Alertdialog card explaining why an account is locked by reason, with locked-at time, masked recovery email, and recovery-email / support-ticket / admin-unlock options.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/auth-deep",
      "routeHref": "/ui-primitives/auth-deep/account-lockout-card",
      "tags": [
        "lockout",
        "recovery",
        "unlock",
        "security"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
