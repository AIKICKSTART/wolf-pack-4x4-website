"use client"

import { useId } from "react"

import { Chip } from "../primitives/chip"

import {
  type AuthTone,
  maskSecret,
} from "./auth-deep-types"
import styles from "./account-lockout-card.module.css"

export type LockoutReason =
  | "brute-force"
  | "compromised-credentials"
  | "admin-action"
  | "compliance-hold"
  | "mfa-failures"

export interface AccountLockoutCardProps {
  /** Display owner. */
  ownerLabel: string
  /** Tenant slug. */
  tenantLabel: string
  /** Reason the account is locked. */
  reason: LockoutReason
  /** Free-text incident reference, e.g. "INC-2026-0117". */
  incidentRef?: string
  /** Locked since (ISO). */
  lockedAtIso: string
  /** Masked recovery email used for self-service unlock. */
  recoveryEmailMasked?: string
  /** Has the user already verified identity via support? */
  identityVerified?: boolean
  /** Fires when admin unlocks. */
  onAdminUnlock?: () => void
  /** Fires when the user requests self-service recovery email. */
  onSendRecovery?: () => void
  /** Fires when user opens the appeal flow. */
  onAppeal?: () => void
}

const REASON_LABEL: Record<LockoutReason, string> = {
  "brute-force": "Brute-force protection",
  "compromised-credentials": "Compromised credentials",
  "admin-action": "Locked by admin",
  "compliance-hold": "Compliance hold",
  "mfa-failures": "Repeated MFA failures",
}

const REASON_NOTE: Record<LockoutReason, string> = {
  "brute-force":
    "We detected an unusual number of failed sign-in attempts. The account is locked while we verify it's you.",
  "compromised-credentials":
    "Your password appeared in a known breach corpus. Reset your password before we can unlock the account.",
  "admin-action":
    "An administrator manually locked this account. Contact your workspace owner to restore access.",
  "compliance-hold":
    "Account access is paused while a compliance review is in progress.",
  "mfa-failures":
    "Too many invalid second-factor codes were submitted. The account will auto-unlock after the cooldown expires.",
}

const REASON_TONE: Record<LockoutReason, AuthTone> = {
  "brute-force": "red",
  "compromised-credentials": "red",
  "admin-action": "amber",
  "compliance-hold": "neutral",
  "mfa-failures": "amber",
}

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
}

export function AccountLockoutCard({
  ownerLabel,
  tenantLabel,
  reason,
  incidentRef,
  lockedAtIso,
  recoveryEmailMasked,
  identityVerified,
  onAdminUnlock,
  onSendRecovery,
  onAppeal,
}: AccountLockoutCardProps) {
  const liveId = useId()
  const recoveryDisplay = recoveryEmailMasked
    ? maskSecret(recoveryEmailMasked, 2, recoveryEmailMasked.split("@")[1]?.length ?? 8)
    : undefined

  return (
    <article
      className={styles.wrap}
      role="alertdialog"
      aria-labelledby={`${liveId}-title`}
      aria-describedby={`${liveId}-body`}
      data-reason={reason}
    >
      <header className={styles.head}>
        <span className={styles.lockIcon} aria-hidden="true">
          <span className={styles.lockBody} />
          <span className={styles.lockShackle} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{tenantLabel} · Account locked</span>
          <h2 id={`${liveId}-title`} className={styles.title}>
            {ownerLabel}
          </h2>
          <div className={styles.chipRow}>
            <Chip label={REASON_LABEL[reason]} tone={REASON_TONE[reason]} />
            {incidentRef ? <Chip label={incidentRef} tone="neutral" /> : null}
            {identityVerified ? (
              <Chip label="Identity verified" tone="green" />
            ) : null}
          </div>
        </div>
      </header>

      <p id={`${liveId}-body`} className={styles.body}>
        {REASON_NOTE[reason]}
      </p>

      <dl className={styles.facts}>
        <div>
          <dt>Locked at</dt>
          <dd className={styles.numeric}>{formatTimestamp(lockedAtIso)}</dd>
        </div>
        {recoveryDisplay ? (
          <div>
            <dt>Recovery email</dt>
            <dd className={styles.mask}>{recoveryDisplay}</dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.options} role="group" aria-label="Unlock options">
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={onSendRecovery}
          disabled={!recoveryEmailMasked || reason === "compliance-hold"}
          aria-label="Email recovery link to verified inbox"
        >
          Email recovery link
        </button>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onAppeal}
          aria-label="Open an appeal to support"
        >
          Open support ticket
        </button>
        <button
          type="button"
          className={styles.btnAdmin}
          onClick={onAdminUnlock}
          disabled={reason === "compliance-hold"}
          aria-label={`Admin unlock — restore access for ${ownerLabel}`}
        >
          Admin unlock
        </button>
      </div>
    </article>
  )
}

export default AccountLockoutCard
