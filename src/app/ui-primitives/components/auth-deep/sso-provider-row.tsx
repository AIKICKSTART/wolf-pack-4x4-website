"use client"

import { Chip } from "../primitives/chip"

import {
  SSO_STATUS_TONE,
  maskSecret,
  type SsoProvider,
  type SsoStatus,
} from "./auth-deep-types"
import styles from "./sso-provider-row.module.css"

export interface SsoProviderRowProps {
  /** Identity provider id. */
  provider: SsoProvider
  /** Human label override — defaults to provider canonical name. */
  label?: string
  /** Configured tenant domain, e.g. "mufflermen.com.au". */
  domain?: string
  /** Provisioning lifecycle. */
  status: SsoStatus
  /** Auto-provision JIT membership flag. */
  jitProvisioning: boolean
  /** Last successful sync, ISO string. */
  lastSyncIso?: string
  /** Active member count. */
  memberCount?: number
  /** Optional client id / IdP entity id (masked when shown). */
  clientId?: string
  /** Optional last error blurb shown only for status=error. */
  errorBrief?: string
  /** Fires on the configure/edit button. */
  onConfigure?: (provider: SsoProvider) => void
  /** Fires on the run-sync button. */
  onSync?: (provider: SsoProvider) => void
}

const PROVIDER_LABEL: Record<SsoProvider, string> = {
  "google-workspace": "Google Workspace",
  okta: "Okta",
  "azure-ad": "Microsoft Entra ID",
  onelogin: "OneLogin",
  "custom-saml": "Custom SAML 2.0",
}

const PROVIDER_ABBR: Record<SsoProvider, string> = {
  "google-workspace": "GWS",
  okta: "OKT",
  "azure-ad": "AAD",
  onelogin: "OL",
  "custom-saml": "SML",
}

const STATUS_LABEL: Record<SsoStatus, string> = {
  "not-configured": "Not configured",
  draft: "Draft",
  active: "Active",
  error: "Error",
  suspended: "Suspended",
}

function formatRelative(iso?: string): string {
  if (!iso) return "Never"
  const then = new Date(iso).getTime()
  const now = Date.now()
  const diff = Math.max(0, now - then)
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export function SsoProviderRow({
  provider,
  label,
  domain,
  status,
  jitProvisioning,
  lastSyncIso,
  memberCount,
  clientId,
  errorBrief,
  onConfigure,
  onSync,
}: SsoProviderRowProps) {
  const providerLabel = label ?? PROVIDER_LABEL[provider]
  const syncDisabled = status === "not-configured" || status === "error"

  return (
    <article
      className={styles.row}
      aria-label={`${providerLabel} SSO — ${STATUS_LABEL[status]}`}
      data-status={status}
    >
      <div className={styles.identity}>
        <span className={styles.badge} aria-hidden="true">
          {PROVIDER_ABBR[provider]}
        </span>
        <div className={styles.identityText}>
          <span className={styles.providerName}>{providerLabel}</span>
          <span className={styles.domain}>
            {domain ?? "No domain bound"}
          </span>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <dt>Members</dt>
          <dd className={styles.metricValue}>{memberCount ?? 0}</dd>
        </div>
        <div className={styles.metric}>
          <dt>JIT provision</dt>
          <dd>
            <Chip
              label={jitProvisioning ? "On" : "Off"}
              tone={jitProvisioning ? "green" : "neutral"}
            />
          </dd>
        </div>
        <div className={styles.metric}>
          <dt>Last sync</dt>
          <dd className={styles.metricValue}>{formatRelative(lastSyncIso)}</dd>
        </div>
        {clientId ? (
          <div className={styles.metric}>
            <dt>Client ID</dt>
            <dd className={styles.mask}>{maskSecret(clientId, 4, 4)}</dd>
          </div>
        ) : null}
      </div>

      <div className={styles.statusRow}>
        <Chip label={STATUS_LABEL[status]} tone={SSO_STATUS_TONE[status]} />
        {errorBrief && status === "error" ? (
          <span className={styles.errorBrief}>{errorBrief}</span>
        ) : null}
      </div>

      <div className={styles.actions} role="group" aria-label="Provider actions">
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() => onSync?.(provider)}
          disabled={syncDisabled}
          aria-label={`Run sync for ${providerLabel}`}
        >
          Sync
        </button>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => onConfigure?.(provider)}
          aria-label={`Configure ${providerLabel}`}
        >
          {status === "not-configured" ? "Configure" : "Edit"}
        </button>
      </div>
    </article>
  )
}

export default SsoProviderRow
