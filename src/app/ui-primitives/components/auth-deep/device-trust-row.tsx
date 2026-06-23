"use client"

import { Chip } from "../primitives/chip"

import {
  type AuthTone,
  type DeviceTrustScope,
} from "./auth-deep-types"
import styles from "./device-trust-row.module.css"

export interface DeviceTrustRowProps {
  /** Stable id. */
  id: string
  /** Friendly device label, e.g. "iPhone 16 Pro · Safari". */
  device: string
  /** OS hint, e.g. "iOS 18.4". */
  os: string
  /** Trust scope. */
  scope: DeviceTrustScope
  /** When trust was granted (ISO). */
  trustedAtIso: string
  /** Optional last-used (ISO). */
  lastUsedIso?: string
  /** Optional fingerprint identifier shown for advanced ops. */
  fingerprintMasked?: string
  /** Whether this device is the viewer's current device. */
  isCurrent?: boolean
  /** Fires when user removes trust. */
  onRemove?: (id: string) => void
  /** Fires when user extends trust. */
  onExtend?: (id: string) => void
}

const SCOPE_LABEL: Record<DeviceTrustScope, string> = {
  "single-session": "This session only",
  "30-days": "30 days",
  forever: "Until revoked",
}

const SCOPE_TONE: Record<DeviceTrustScope, AuthTone> = {
  "single-session": "neutral",
  "30-days": "amber",
  forever: "green",
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function formatRelative(iso?: string): string {
  if (!iso) return "Not yet used"
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export function DeviceTrustRow({
  id,
  device,
  os,
  scope,
  trustedAtIso,
  lastUsedIso,
  fingerprintMasked,
  isCurrent,
  onRemove,
  onExtend,
}: DeviceTrustRowProps) {
  return (
    <article
      className={styles.row}
      aria-label={`Trusted device ${device} — ${SCOPE_LABEL[scope]}`}
      data-current={isCurrent ? "true" : "false"}
    >
      <div className={styles.identity}>
        <span className={styles.iconBox} aria-hidden="true">
          <span className={styles.iconGlyph} />
        </span>
        <div className={styles.identityText}>
          <span className={styles.deviceName}>
            {device}
            {isCurrent ? (
              <span className={styles.currentBadge}>This device</span>
            ) : null}
          </span>
          <span className={styles.os}>{os}</span>
          {fingerprintMasked ? (
            <span className={styles.fingerprint}>FP · {fingerprintMasked}</span>
          ) : null}
        </div>
      </div>

      <dl className={styles.facts}>
        <div>
          <dt>Trusted</dt>
          <dd className={styles.numeric}>{formatDate(trustedAtIso)}</dd>
        </div>
        <div>
          <dt>Last used</dt>
          <dd className={styles.numeric}>{formatRelative(lastUsedIso)}</dd>
        </div>
        <div>
          <dt>Scope</dt>
          <dd>
            <Chip label={SCOPE_LABEL[scope]} tone={SCOPE_TONE[scope]} />
          </dd>
        </div>
      </dl>

      <div className={styles.actions} role="group" aria-label="Device trust actions">
        <button
          type="button"
          className={styles.extendBtn}
          onClick={() => onExtend?.(id)}
          disabled={scope === "forever"}
          aria-label={`Extend trust for ${device}`}
        >
          Extend
        </button>
        <button
          type="button"
          className={styles.removeBtn}
          onClick={() => onRemove?.(id)}
          aria-label={`Remove trust for ${device}`}
        >
          Remove
        </button>
      </div>
    </article>
  )
}

export default DeviceTrustRow
