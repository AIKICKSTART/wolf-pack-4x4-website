"use client"

import { Chip } from "../primitives/chip"

import {
  type PasskeyStatus,
  type PasskeyTransport,
} from "./auth-deep-types"
import styles from "./passkey-management-card.module.css"

export interface PasskeyRecord {
  /** Stable id. */
  id: string
  /** Human label, e.g. "Mick's MacBook Pro". */
  label: string
  /** Transport surface. */
  transport: PasskeyTransport
  /** Registered at (ISO). */
  registeredAtIso: string
  /** Last used (ISO) — undefined when never used. */
  lastUsedIso?: string
  /** Lifecycle. */
  status: PasskeyStatus
  /** Optional manufacturer hint, e.g. "Apple", "Yubico", "Google". */
  manufacturer?: string
}

export interface PasskeyManagementCardProps {
  /** Card heading owner — e.g. "Mick Davies · Oak Flats Mufflermen". */
  ownerLabel: string
  /** Registered passkeys. */
  passkeys: ReadonlyArray<PasskeyRecord>
  /** Tenant policy line shown above the list. */
  policyNote?: string
  /** Fires when the user wants to enrol a new passkey. */
  onAddPasskey?: () => void
  /** Fires when the user revokes a passkey. */
  onRevoke?: (id: string) => void
}

const TRANSPORT_LABEL: Record<PasskeyTransport, string> = {
  usb: "USB",
  nfc: "NFC",
  ble: "Bluetooth",
  internal: "Built-in",
  hybrid: "Hybrid",
}

const STATUS_LABEL: Record<PasskeyStatus, string> = {
  active: "Active",
  revoked: "Revoked",
  expired: "Expired",
}

const STATUS_TONE: Record<PasskeyStatus, "green" | "neutral" | "red"> = {
  active: "green",
  revoked: "neutral",
  expired: "red",
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function formatRelative(iso?: string): string {
  if (!iso) return "Never used"
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "Used just now"
  if (mins < 60) return `Used ${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `Used ${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `Used ${days}d ago`
  return `Used ${Math.floor(days / 30)}mo ago`
}

export function PasskeyManagementCard({
  ownerLabel,
  passkeys,
  policyNote,
  onAddPasskey,
  onRevoke,
}: PasskeyManagementCardProps) {
  const activeCount = passkeys.filter((k) => k.status === "active").length

  return (
    <article
      className={styles.wrap}
      aria-label={`Passkeys for ${ownerLabel}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Passkeys · WebAuthn</span>
          <h3 className={styles.title}>{ownerLabel}</h3>
        </div>
        <div className={styles.headMeta}>
          <Chip
            label={`${activeCount} active`}
            tone={activeCount > 0 ? "green" : "amber"}
          />
          {policyNote ? <Chip label={policyNote} tone="teal" /> : null}
        </div>
      </header>

      <ul className={styles.list}>
        {passkeys.map((passkey) => (
          <li
            key={passkey.id}
            className={styles.item}
            data-status={passkey.status}
          >
            <div className={styles.itemLeft}>
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.identity}>
                <span className={styles.itemLabel}>{passkey.label}</span>
                <span className={styles.itemMeta}>
                  {TRANSPORT_LABEL[passkey.transport]}
                  {passkey.manufacturer ? ` · ${passkey.manufacturer}` : ""} ·
                  registered {formatDate(passkey.registeredAtIso)}
                </span>
                <span className={styles.itemSub}>
                  {formatRelative(passkey.lastUsedIso)}
                </span>
              </div>
            </div>

            <div className={styles.itemRight}>
              <Chip
                label={STATUS_LABEL[passkey.status]}
                tone={STATUS_TONE[passkey.status]}
              />
              <button
                type="button"
                className={styles.revokeBtn}
                onClick={() => onRevoke?.(passkey.id)}
                disabled={passkey.status !== "active"}
                aria-label={`Revoke passkey ${passkey.label}`}
              >
                Revoke
              </button>
            </div>
          </li>
        ))}
        {passkeys.length === 0 ? (
          <li className={styles.empty}>
            No passkeys registered yet. Add one to enable biometric sign-in.
          </li>
        ) : null}
      </ul>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={onAddPasskey}
          aria-label={`Add a new passkey for ${ownerLabel}`}
        >
          <span aria-hidden="true">＋</span> Add passkey
        </button>
      </footer>
    </article>
  )
}

export default PasskeyManagementCard
