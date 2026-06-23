"use client"

import { useId } from "react"

import { Chip } from "../primitives/chip"

import {
  maskSecret,
  type AuthTone,
  type MagicLinkStatus as MagicLinkStatusKind,
} from "./auth-deep-types"
import styles from "./magic-link-status.module.css"

export interface MagicLinkStatusProps {
  /** Email the link was sent to — partially masked in render. */
  recipientEmail: string
  /** Lifecycle. */
  status: MagicLinkStatusKind
  /** Link expiry in seconds (countdown). */
  expiresInSeconds: number
  /** Tenant the link is scoped to. */
  tenantLabel: string
  /** Show inbox provider hint, e.g. Gmail/Outlook. */
  inboxProvider?: "gmail" | "outlook" | "fastmail" | "other"
  /** Fires when the user requests a resend. */
  onResend?: () => void
  /** Fires when the user wants to switch email. */
  onChangeEmail?: () => void
}

const STATUS_LABEL: Record<MagicLinkStatusKind, string> = {
  sending: "Sending…",
  sent: "Check your inbox",
  opened: "Link opened — finishing up…",
  expired: "Link expired",
  failed: "Send failed",
}

const STATUS_TONE: Record<MagicLinkStatusKind, AuthTone> = {
  sending: "amber",
  sent: "teal",
  opened: "green",
  expired: "red",
  failed: "red",
}

const PROVIDER_LABEL: Record<NonNullable<MagicLinkStatusProps["inboxProvider"]>, string> = {
  gmail: "Open Gmail",
  outlook: "Open Outlook",
  fastmail: "Open Fastmail",
  other: "Open inbox",
}

function maskEmail(value: string): string {
  const at = value.indexOf("@")
  if (at < 1) return maskSecret(value, 2, 2)
  const local = value.slice(0, at)
  const domain = value.slice(at)
  const head = local.slice(0, Math.min(2, local.length))
  const tail = local.slice(-1)
  const middle = "•".repeat(Math.max(local.length - head.length - tail.length, 3))
  return `${head}${middle}${tail}${domain}`
}

function formatCountdown(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds))
  const m = Math.floor(safe / 60)
  const s = safe % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function MagicLinkStatus({
  recipientEmail,
  status,
  expiresInSeconds,
  tenantLabel,
  inboxProvider,
  onResend,
  onChangeEmail,
}: MagicLinkStatusProps) {
  const liveId = useId()
  const isTerminal = status === "expired" || status === "failed"
  const resendDisabled = status === "sending" || status === "opened"

  return (
    <article
      className={styles.wrap}
      aria-live="polite"
      aria-describedby={liveId}
      data-status={status}
    >
      <div className={styles.iconCol} aria-hidden="true">
        <span className={styles.envelope}>
          <span className={styles.envelopeBody} />
          <span className={styles.envelopeFlap} />
        </span>
        <span className={styles.pulseRing} data-on={status === "sent"} />
      </div>

      <header className={styles.head}>
        <span className={styles.kicker}>{tenantLabel} · Magic link</span>
        <h3 className={styles.title}>{STATUS_LABEL[status]}</h3>
        <p className={styles.body}>
          We sent a single-use sign-in link to{" "}
          <strong className={styles.email}>{maskEmail(recipientEmail)}</strong>.
          Open it on this device to complete sign-in.
        </p>
        <div className={styles.chipRow}>
          <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
          {!isTerminal ? (
            <Chip
              label={`Expires in ${formatCountdown(expiresInSeconds)}`}
              tone={expiresInSeconds < 60 ? "red" : "neutral"}
            />
          ) : null}
        </div>
      </header>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={onResend}
          disabled={resendDisabled}
          aria-label={`Resend magic link to ${maskEmail(recipientEmail)}`}
        >
          {isTerminal ? "Send a new link" : "Resend link"}
        </button>
        {inboxProvider ? (
          <span className={styles.helpRow}>
            <span className={styles.helpLabel}>Tip</span>
            <span className={styles.helpText}>{PROVIDER_LABEL[inboxProvider]}</span>
          </span>
        ) : null}
        <button
          type="button"
          className={styles.btnLink}
          onClick={onChangeEmail}
          aria-label="Use a different email"
        >
          Use a different email
        </button>
      </footer>

      <span id={liveId} className={styles.srOnly} role="status">
        Magic link to {maskEmail(recipientEmail)} — {STATUS_LABEL[status]}
        {!isTerminal
          ? `, expires in ${formatCountdown(expiresInSeconds)}.`
          : "."}
      </span>
    </article>
  )
}

export default MagicLinkStatus
