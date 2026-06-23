import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { Chip } from "../../components/primitives/chip"

import styles from "../account.module.css"

export const metadata: Metadata = {
  title: "Security · Account | UI Primitives",
}

const RECOVERY_CODES: ReadonlyArray<string> = [
  "OFM-3K9P-VR42",
  "OFM-7B1Q-LM58",
  "OFM-A8X4-FN20",
  "OFM-DR0Y-TS17",
  "OFM-J62U-WC09",
  "OFM-Z39P-NL44",
]

export default function AccountSecurityPage() {
  return (
    <>
      <PageHeader
        kicker="18.6 / Security"
        title="Security"
        description="Password, two-factor authentication, recovery codes, and the alert profile for new sign-in activity."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account", href: "/ui-primitives/account" },
          { label: "Security" },
        ]}
      />

      <section className={styles.card} aria-labelledby="security-password-heading">
        <div className={styles.cardHead}>
          <div>
            <h2 id="security-password-heading" className={styles.cardTitle}>
              Change password
            </h2>
            <p className={styles.cardSub}>Minimum 12 characters · last rotated 18 days ago.</p>
          </div>
          <Chip label="Active" tone="green" />
        </div>
        <div className={styles.formGrid}>
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.fieldLabel} htmlFor="pwd-current">
              Current password
            </label>
            <input id="pwd-current" className={styles.fieldInput} type="password" autoComplete="current-password" />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="pwd-new">
              New password
            </label>
            <input
              id="pwd-new"
              className={styles.fieldInput}
              type="password"
              autoComplete="new-password"
              aria-describedby="pwd-new-help"
            />
            <span id="pwd-new-help" className={styles.fieldHelper}>
              Use 12+ characters with mixed case, numbers, and a symbol.
            </span>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="pwd-confirm">
              Confirm new password
            </label>
            <input
              id="pwd-confirm"
              className={styles.fieldInput}
              type="password"
              autoComplete="new-password"
            />
          </div>
        </div>
        <div className={styles.savebarActions}>
          <button type="button" className={styles.btnPrimary}>
            Update password
          </button>
        </div>
      </section>

      <section className={styles.card} aria-labelledby="security-2fa-heading">
        <div className={styles.cardHead}>
          <div>
            <h2 id="security-2fa-heading" className={styles.cardTitle}>
              Two-factor authentication
            </h2>
            <p className={styles.cardSub}>Authenticator app · Google Authenticator paired.</p>
          </div>
          <Chip label="Enabled" tone="green" />
        </div>
        <div className={styles.formGrid}>
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <span className={styles.fieldLabel}>Verified method</span>
            <span className={styles.fieldHelper}>
              Codes refresh every 30 seconds. Pair a second device or rotate the secret if you
              suspect compromise.
            </span>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="otp-code">
              Verify 6-digit code
            </label>
            <input
              id="otp-code"
              className={styles.fieldInput}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
            />
          </div>
        </div>
        <div className={styles.savebarActions}>
          <button type="button" className={styles.btnGhost}>
            Rotate secret
          </button>
          <button type="button" className={styles.btnPrimary}>
            Re-verify
          </button>
        </div>
      </section>

      <section className={styles.card} aria-labelledby="security-recovery-heading">
        <div className={styles.cardHead}>
          <div>
            <h2 id="security-recovery-heading" className={styles.cardTitle}>
              Recovery codes
            </h2>
            <p className={styles.cardSub}>
              Store these somewhere safe — each one is single-use.
            </p>
          </div>
          <Chip label="6 / 8 unused" tone="amber" />
        </div>
        <ul className={styles.recoveryGrid} aria-label="Recovery codes">
          {RECOVERY_CODES.map((code) => (
            <li key={code}>
              <code>{code}</code>
            </li>
          ))}
        </ul>
        <div className={styles.savebarActions}>
          <button type="button" className={styles.btnGhost}>
            Download .txt
          </button>
          <button type="button" className={styles.btnGhost}>
            Regenerate set
          </button>
        </div>
      </section>

      <section className={styles.card} aria-labelledby="security-alerts-heading">
        <div className={styles.cardHead}>
          <div>
            <h2 id="security-alerts-heading" className={styles.cardTitle}>
              Login alerts
            </h2>
            <p className={styles.cardSub}>Notify when a new device or country signs in.</p>
          </div>
          <Chip label="On" tone="green" />
        </div>
        <div className={styles.formGrid}>
          <label className={`${styles.checkboxRow} ${styles.fieldFull}`}>
            <input type="checkbox" className={styles.checkbox} defaultChecked />
            <span className={styles.fieldHelper}>
              Email me on every successful sign-in from a new device fingerprint.
            </span>
          </label>
          <label className={`${styles.checkboxRow} ${styles.fieldFull}`}>
            <input type="checkbox" className={styles.checkbox} defaultChecked />
            <span className={styles.fieldHelper}>
              SMS me on any sign-in originating outside Australia.
            </span>
          </label>
          <label className={`${styles.checkboxRow} ${styles.fieldFull}`}>
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.fieldHelper}>
              Alert when any owner-level role change happens on the workspace.
            </span>
          </label>
        </div>
      </section>
    </>
  )
}
