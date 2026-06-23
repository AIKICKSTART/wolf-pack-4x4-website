import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AccountLockoutCard,
  AuditLogFeed,
  ConsentRecordRow,
  DeviceTrustRow,
  ImpersonationBanner,
  LoginAttemptMeter,
  MagicLinkStatus,
  MfaEnrollmentCard,
  PasskeyManagementCard,
  PasswordStrengthMeter,
  RecoveryCodesCard,
  SessionManagerPanel,
  SsoProviderRow,
  TenantPermissionMatrix,
} from "../../components/auth-deep"

import {
  AUDIT_ENTRIES,
  CONSENT_RECORDS,
  DEVICE_TRUST_ROWS,
  IMPERSONATION_BANNER,
  LOCKOUT_BRUTEFORCE,
  LOGIN_METER_WARNING,
  MAGIC_SENT,
  MFA_CODE_ISSUED,
  PASSKEYS,
  PASSWORD_SAMPLES,
  PERMISSION_ASSIGNMENT_TECH,
  PERMISSION_SCOPES,
  PERMISSION_VERBS,
  RECOVERY_DOWNLOADED,
  SESSION_PANEL,
  SSO_ROWS,
} from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Full auth console | Auth deep",
  description:
    "Bonus composition — composed Oak Flats Mufflermen auth console wiring MFA, SSO, magic link, passkeys, sessions, audit feed, recovery codes, device trust, login meter, password strength, permission matrix, consent records, impersonation banner and account lockout card.",
}

export default function FullAuthConsolePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus / Composition"
        title="Full auth console"
        description="The auth-deep primitive pack composed end-to-end — Mick Davies is mid-impersonation, a Brisbane sign-in attempt has tripped the brute-force guard, Brad just enrolled MFA on Pacemaker, and Hannah's account is locked pending verification."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Full auth console" },
        ]}
      />

      <div className={styles.fullGrid}>
        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Impersonation banner · active support session</span>
          <ImpersonationBanner {...IMPERSONATION_BANNER} />
        </section>

        <div className={styles.stageColumns}>
          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>MFA · Brad mid-enrolment</span>
            <MfaEnrollmentCard {...MFA_CODE_ISSUED} />
          </section>

          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Brute-force guard · 4 of 5</span>
            <LoginAttemptMeter {...LOGIN_METER_WARNING} />
          </section>
        </div>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Federation · SSO providers</span>
          <div className={styles.stack}>
            {SSO_ROWS.map((row) => (
              <SsoProviderRow key={row.provider} {...row} />
            ))}
          </div>
        </section>

        <div className={styles.stageColumns}>
          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Magic link · sent</span>
            <MagicLinkStatus {...MAGIC_SENT} />
          </section>

          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Password reset · breach guard</span>
            <PasswordStrengthMeter
              value={PASSWORD_SAMPLES[4].value}
              breachHits={PASSWORD_SAMPLES[4].breachHits}
            />
          </section>
        </div>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Passkeys · WebAuthn</span>
          <PasskeyManagementCard
            ownerLabel="Mick Davies · Oak Flats Mufflermen"
            passkeys={PASSKEYS}
            policyNote="Passkey-only login enforced"
          />
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Active sessions</span>
          <SessionManagerPanel {...SESSION_PANEL} />
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Trusted devices</span>
          <div className={styles.stack}>
            {DEVICE_TRUST_ROWS.map((row) => (
              <DeviceTrustRow key={row.id} {...row} />
            ))}
          </div>
        </section>

        <div className={styles.stageColumns}>
          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Audit feed · last 72h</span>
            <AuditLogFeed
              scopeLabel="Mick Davies — Admin"
              tenantLabel="Oak Flats Mufflermen"
              entries={AUDIT_ENTRIES}
            />
          </section>

          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Recovery codes</span>
            <RecoveryCodesCard {...RECOVERY_DOWNLOADED} />
          </section>
        </div>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Permission matrix · Brad Sterling (Tech)</span>
          <TenantPermissionMatrix
            tenantId="oak-flats-mufflermen"
            scopes={PERMISSION_SCOPES}
            verbs={PERMISSION_VERBS}
            assignment={PERMISSION_ASSIGNMENT_TECH}
          />
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Consent ledger</span>
          <div className={styles.stack}>
            {CONSENT_RECORDS.map((row) => (
              <ConsentRecordRow key={row.id} {...row} />
            ))}
          </div>
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Account locked · incident INC-2026-0117</span>
          <AccountLockoutCard {...LOCKOUT_BRUTEFORCE} />
        </section>
      </div>
    </main>
  )
}
