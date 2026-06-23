import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./auth-deep.module.css"

export const metadata: Metadata = {
  title: "Auth deep pack | UI Primitives",
  description:
    "Fourteen account-security primitives for Oak Flats Mufflermen — MFA enrolment card, SSO provider row, magic-link status, passkey management card, session manager panel, audit log feed, recovery codes card, device trust row, login attempt meter, password strength meter with HIBP, tenant permission matrix, consent record row, impersonation banner, account lockout card.",
}

interface Block {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  state: string
}

const BLOCKS: ReadonlyArray<Block> = [
  {
    kicker: "Primitive 01",
    title: "MFA enrolment card",
    body: "Wizard-style multi-factor enrolment — TOTP, SMS, email, security-key + backup codes.",
    href: "/ui-primitives/auth-deep/mfa-enrollment-card",
    accent: "teal",
    state: "Enrol",
  },
  {
    kicker: "Primitive 02",
    title: "SSO provider row",
    body: "Provider row for Google Workspace, Okta, Entra ID — JIT, sync, masked client ID.",
    href: "/ui-primitives/auth-deep/sso-provider-row",
    accent: "teal",
    state: "Federation",
  },
  {
    kicker: "Primitive 03",
    title: "Magic link status",
    body: "Magic-link sent confirmation with masked email, countdown and inbox shortcut.",
    href: "/ui-primitives/auth-deep/magic-link-status",
    accent: "teal",
    state: "Email",
  },
  {
    kicker: "Primitive 04",
    title: "Passkey management",
    body: "WebAuthn device list with transport, last-used, revoke and add-passkey CTA.",
    href: "/ui-primitives/auth-deep/passkey-management-card",
    accent: "green",
    state: "Passkeys",
  },
  {
    kicker: "Primitive 05",
    title: "Session manager",
    body: "Active sessions table with device, geo, risk tone, current-device badge, revoke.",
    href: "/ui-primitives/auth-deep/session-manager-panel",
    accent: "teal",
    state: "Devices",
  },
  {
    kicker: "Primitive 06",
    title: "Audit log feed",
    body: "Authentication audit feed — login, MFA, password, permission, impersonation events.",
    href: "/ui-primitives/auth-deep/audit-log-feed",
    accent: "amber",
    state: "Audit",
  },
  {
    kicker: "Primitive 07",
    title: "Recovery codes",
    body: "One-time recovery codes — show-once, download, print, regenerate, used tracker.",
    href: "/ui-primitives/auth-deep/recovery-codes-card",
    accent: "amber",
    state: "Recovery",
  },
  {
    kicker: "Primitive 08",
    title: "Device trust row",
    body: "Trusted device row with scope, fingerprint, extend/remove actions.",
    href: "/ui-primitives/auth-deep/device-trust-row",
    accent: "green",
    state: "Trust",
  },
  {
    kicker: "Primitive 09",
    title: "Login attempt meter",
    body: "Failed-login meter with threshold ticks, lockout countdown, admin reset.",
    href: "/ui-primitives/auth-deep/login-attempt-meter",
    accent: "amber",
    state: "Guard",
  },
  {
    kicker: "Primitive 10",
    title: "Password strength + HIBP",
    body: "Five-rule strength meter with Have-I-Been-Pwned breach chip and reveal toggle.",
    href: "/ui-primitives/auth-deep/password-strength-meter",
    accent: "red",
    state: "Strength",
  },
  {
    kicker: "Primitive 11",
    title: "Tenant permission matrix",
    body: "Scope × verb matrix — toggle grants, admin inheritance, accessible legend.",
    href: "/ui-primitives/auth-deep/tenant-permission-matrix",
    accent: "green",
    state: "RBAC",
  },
  {
    kicker: "Primitive 12",
    title: "Consent record row",
    body: "Terms / privacy / marketing consent row with version, IP, withdrawal action.",
    href: "/ui-primitives/auth-deep/consent-record-row",
    accent: "amber",
    state: "Consent",
  },
  {
    kicker: "Primitive 13",
    title: "Impersonation banner",
    body: "Admin-impersonating-user banner with reason, elapsed time and auto-exit timer.",
    href: "/ui-primitives/auth-deep/impersonation-banner",
    accent: "amber",
    state: "Support",
  },
  {
    kicker: "Primitive 14",
    title: "Account lockout card",
    body: "Locked-account card with reason, incident ref, recovery options, admin unlock.",
    href: "/ui-primitives/auth-deep/account-lockout-card",
    accent: "red",
    state: "Lockout",
  },
  {
    kicker: "Bonus",
    title: "Full auth console",
    body: "Composes MFA, SSO, magic links, passkeys, sessions, audit, recovery, devices, lockout, strength, permissions, consent, impersonation, lockout card.",
    href: "/ui-primitives/auth-deep/full-auth-console",
    accent: "red",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Block["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function AuthDeepIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Auth deep pack"
        title="Account security primitives"
        description="Fourteen deep account-security surfaces for Oak Flats Mufflermen — MFA enrolment, SSO provider config, magic-link status, passkey management, session manager, auth audit feed, recovery codes, trusted devices, login-attempt meter, HIBP-aware password strength, tenant permission matrix, consent records, admin impersonation banner, and account-lockout card. Bonus: a composed full auth-console route."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep" },
        ]}
      />

      <span className={styles.notice}>
        Auth deep · accessibility-critical · masked by default
      </span>

      <section className={styles.grid} aria-label="Auth deep primitives index">
        {BLOCKS.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className={[styles.card, ACCENT_CLASS[block.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbHeadline} />
                <div className={styles.thumbRows}>
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                </div>
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{block.kicker}</span>
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <p className={styles.cardBody}>{block.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{block.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
