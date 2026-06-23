"use client"

import { Chip } from "../primitives/chip"

import {
  CONSENT_STATUS_TONE,
  type ConsentKind,
  type ConsentStatus,
} from "./auth-deep-types"
import styles from "./consent-record-row.module.css"

export interface ConsentRecordRowProps {
  /** Stable id. */
  id: string
  /** Consent category. */
  kind: ConsentKind
  /** Version of the policy/document accepted, e.g. "v3.2". */
  policyVersion: string
  /** Consent state. */
  status: ConsentStatus
  /** When consent was accepted (ISO). */
  acceptedAtIso?: string
  /** When consent was withdrawn (ISO). */
  withdrawnAtIso?: string
  /** Source from which consent was captured, e.g. "Sign-up form", "Booking checkout". */
  source: string
  /** Optional masked IP. */
  ipMasked?: string
  /** Fires when admin views the signed PDF / artifact. */
  onViewArtifact?: (id: string) => void
  /** Fires when user/admin withdraws consent. */
  onWithdraw?: (id: string) => void
}

const KIND_LABEL: Record<ConsentKind, string> = {
  terms: "Terms of service",
  privacy: "Privacy policy",
  marketing: "Marketing emails",
  cookies: "Non-essential cookies",
  "data-export": "Data export consent",
  "ai-processing": "AI processing",
}

const STATUS_LABEL: Record<ConsentStatus, string> = {
  accepted: "Accepted",
  withdrawn: "Withdrawn",
  expired: "Expired",
  pending: "Pending",
}

function formatTimestamp(iso?: string): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
}

export function ConsentRecordRow({
  id,
  kind,
  policyVersion,
  status,
  acceptedAtIso,
  withdrawnAtIso,
  source,
  ipMasked,
  onViewArtifact,
  onWithdraw,
}: ConsentRecordRowProps) {
  const canWithdraw = status === "accepted"

  return (
    <article
      className={styles.row}
      aria-label={`${KIND_LABEL[kind]} ${policyVersion} — ${STATUS_LABEL[status]}`}
      data-status={status}
    >
      <div className={styles.identity}>
        <span className={styles.icon} aria-hidden="true">
          <span className={styles.iconPage} />
          <span className={styles.iconFold} />
        </span>
        <div className={styles.identityText}>
          <span className={styles.kind}>{KIND_LABEL[kind]}</span>
          <span className={styles.version}>
            Policy <strong className={styles.numeric}>{policyVersion}</strong>
          </span>
          <span className={styles.source}>Captured via {source}</span>
        </div>
      </div>

      <dl className={styles.facts}>
        <div>
          <dt>Accepted</dt>
          <dd className={styles.numeric}>{formatTimestamp(acceptedAtIso)}</dd>
        </div>
        <div>
          <dt>Withdrawn</dt>
          <dd className={styles.numeric}>{formatTimestamp(withdrawnAtIso)}</dd>
        </div>
        {ipMasked ? (
          <div>
            <dt>IP</dt>
            <dd className={styles.numeric}>{ipMasked}</dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.statusBlock}>
        <Chip
          label={STATUS_LABEL[status]}
          tone={CONSENT_STATUS_TONE[status]}
        />
      </div>

      <div className={styles.actions} role="group" aria-label="Consent actions">
        <button
          type="button"
          className={styles.btnGhost}
          onClick={() => onViewArtifact?.(id)}
          aria-label={`View signed artifact for ${KIND_LABEL[kind]} ${policyVersion}`}
        >
          View artifact
        </button>
        <button
          type="button"
          className={styles.btnDanger}
          onClick={() => onWithdraw?.(id)}
          disabled={!canWithdraw}
          aria-label={`Withdraw consent for ${KIND_LABEL[kind]} ${policyVersion}`}
        >
          Withdraw
        </button>
      </div>
    </article>
  )
}

export default ConsentRecordRow
