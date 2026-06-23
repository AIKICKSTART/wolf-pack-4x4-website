"use client"

import { useId } from "react"

import { Chip } from "../primitives/chip"

import {
  MFA_METHOD_TONE,
  type AuthTone,
  type MfaEnrollStatus,
  type MfaMethod,
} from "./auth-deep-types"
import styles from "./mfa-enrollment-card.module.css"

export interface MfaEnrollmentCardProps {
  /** Display label for the principal being enrolled, e.g. "Mick Davies". */
  principalLabel: string
  /** Tenant slug — drives copy ("Oak Flats Mufflermen requires MFA…"). */
  tenantLabel: string
  /** Currently selected MFA method. */
  selectedMethod: MfaMethod
  /** Methods the tenant offers. */
  availableMethods: ReadonlyArray<MfaMethod>
  /** Wizard step. */
  status: MfaEnrollStatus
  /** TOTP secret shown when status is "code-issued" (always masked). */
  totpSecret?: string
  /** Remaining seconds before the issued code expires. */
  expiresInSeconds?: number
  /** Tenant policy chip — e.g. "Required for admins". */
  policyNote?: string
  /** Fires when user picks a different method. */
  onChangeMethod?: (method: MfaMethod) => void
  /** Fires on the primary CTA (verify code / re-issue). */
  onAdvance?: () => void
}

const METHOD_LABEL: Record<MfaMethod, string> = {
  totp: "Authenticator app",
  sms: "SMS code",
  email: "Email code",
  "security-key": "Security key",
  "backup-codes": "Backup codes",
}

const METHOD_HELP: Record<MfaMethod, string> = {
  totp: "Google Authenticator, 1Password, Authy.",
  sms: "Sent to the registered Australian mobile.",
  email: "Sent to your mufflermen.com.au inbox.",
  "security-key": "YubiKey, Titan or platform passkey.",
  "backup-codes": "Single-use codes printed once.",
}

const STATUS_LABEL: Record<MfaEnrollStatus, string> = {
  "select-method": "Step 1 of 3 · Method",
  verifying: "Step 2 of 3 · Verifying",
  "code-issued": "Step 2 of 3 · Code issued",
  enrolled: "Step 3 of 3 · Enrolled",
  failed: "Verification failed",
}

const STATUS_TONE: Record<MfaEnrollStatus, AuthTone> = {
  "select-method": "neutral",
  verifying: "amber",
  "code-issued": "amber",
  enrolled: "green",
  failed: "red",
}

const CTA_LABEL: Record<MfaEnrollStatus, string> = {
  "select-method": "Send code",
  verifying: "Verifying…",
  "code-issued": "Verify",
  enrolled: "Done",
  failed: "Retry",
}

function maskTotp(secret: string): string {
  if (secret.length <= 8) return secret
  const groups = secret.match(/.{1,4}/g) ?? [secret]
  return groups
    .map((g, i) => (i < 2 || i >= groups.length - 1 ? g : "••••"))
    .join(" ")
}

export function MfaEnrollmentCard({
  principalLabel,
  tenantLabel,
  selectedMethod,
  availableMethods,
  status,
  totpSecret,
  expiresInSeconds,
  policyNote,
  onChangeMethod,
  onAdvance,
}: MfaEnrollmentCardProps) {
  const groupId = useId()
  const liveId = useId()
  const advanceDisabled = status === "verifying" || status === "enrolled"

  return (
    <article
      className={styles.wrap}
      aria-labelledby={`${groupId}-heading`}
      aria-describedby={liveId}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{tenantLabel} · MFA</span>
        <h3 id={`${groupId}-heading`} className={styles.title}>
          Enrol multi-factor
        </h3>
        <p className={styles.subtitle}>
          Principal · <strong>{principalLabel}</strong>
        </p>
        <div className={styles.statusRow}>
          <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
          {policyNote ? <Chip label={policyNote} tone="red" /> : null}
        </div>
      </header>

      <fieldset
        className={styles.methodGrid}
        aria-label="Pick MFA method"
      >
        <legend className={styles.legend}>Method</legend>
        {availableMethods.map((method) => {
          const id = `${groupId}-${method}`
          const checked = selectedMethod === method
          return (
            <label
              key={method}
              htmlFor={id}
              className={styles.methodOption}
              data-checked={checked}
            >
              <input
                id={id}
                type="radio"
                name={`${groupId}-method`}
                value={method}
                checked={checked}
                onChange={() => onChangeMethod?.(method)}
                className={styles.methodInput}
              />
              <span className={styles.methodLabel}>
                {METHOD_LABEL[method]}
              </span>
              <span className={styles.methodHelp}>{METHOD_HELP[method]}</span>
              <Chip
                label={method.toUpperCase()}
                tone={MFA_METHOD_TONE[method]}
                className={styles.methodChip}
              />
            </label>
          )
        })}
      </fieldset>

      {status === "code-issued" && totpSecret ? (
        <div
          className={styles.codeBlock}
          aria-label="Issued TOTP secret (masked)"
        >
          <span className={styles.codeKicker}>Secret · masked</span>
          <code className={styles.code}>{maskTotp(totpSecret)}</code>
          {typeof expiresInSeconds === "number" ? (
            <span className={styles.codeExpiry}>
              Expires in{" "}
              <strong className={styles.numeric}>
                {Math.max(0, expiresInSeconds)}s
              </strong>
            </span>
          ) : null}
        </div>
      ) : null}

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.cta}
          onClick={onAdvance}
          disabled={advanceDisabled}
          aria-label={`${CTA_LABEL[status]} MFA enrolment for ${principalLabel}`}
        >
          {CTA_LABEL[status]}
          <span aria-hidden="true">→</span>
        </button>
      </footer>

      <span
        id={liveId}
        role="status"
        aria-live="polite"
        className={styles.srOnly}
      >
        MFA enrolment {STATUS_LABEL[status]} via {METHOD_LABEL[selectedMethod]}.
      </span>
    </article>
  )
}

export default MfaEnrollmentCard
