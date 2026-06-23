"use client"

import { Copy, ExternalLink } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"

import styles from "./oauth-app-card.module.css"

export type OAuthAppStatus = "live" | "draft" | "suspended"

export interface OAuthAppCardProps {
  /** Client display name. */
  clientName: string
  /** Masked client identifier (display only). */
  clientIdMasked: string
  /** Whitelisted redirect URIs for the OAuth flow. */
  redirectUris: ReadonlyArray<string>
  /** Granted OAuth scopes. */
  scopes: ReadonlyArray<string>
  status: OAuthAppStatus
  /** Optional summary, e.g. "Garage tablet kiosk". */
  description?: string
  onCopyClientId?: () => void
  onManage?: () => void
  className?: string
}

const STATUS_TONE: Record<OAuthAppStatus, "green" | "amber" | "red"> = {
  live: "green",
  draft: "amber",
  suspended: "red",
}

const STATUS_LABEL: Record<OAuthAppStatus, string> = {
  live: "Live",
  draft: "Draft",
  suspended: "Suspended",
}

export function OauthAppCard({
  clientName,
  clientIdMasked,
  redirectUris,
  scopes,
  status,
  description,
  onCopyClientId,
  onManage,
  className,
}: OAuthAppCardProps) {
  const [copied, setCopied] = useState(false)
  const classes = [styles.card, status === "suspended" && styles.suspended, className]
    .filter(Boolean)
    .join(" ")

  const handleCopy = () => {
    onCopyClientId?.()
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <article className={classes} aria-label={`OAuth app ${clientName}`}>
      <header className={styles.head}>
        <div>
          <h3 className={styles.name}>{clientName}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
      </header>

      <div className={styles.clientIdRow}>
        <span className={styles.label}>Client ID</span>
        <div className={styles.idRow}>
          <code className={styles.clientId}>{clientIdMasked}</code>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={handleCopy}
            aria-label="Copy client ID"
          >
            <Copy size={12} strokeWidth={2.4} aria-hidden="true" />
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      <div className={styles.uriBlock}>
        <span className={styles.label}>Redirect URIs ({redirectUris.length})</span>
        <ul className={styles.uriList}>
          {redirectUris.map((uri) => (
            <li key={uri}>
              <code className={styles.uri}>{uri}</code>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.scopeBlock}>
        <span className={styles.label}>Scopes</span>
        <ul className={styles.scopeList}>
          {scopes.map((scope) => (
            <li key={scope}>
              <Chip label={scope} tone="teal" />
            </li>
          ))}
        </ul>
      </div>

      {onManage && (
        <footer className={styles.foot}>
          <button type="button" className={styles.manageBtn} onClick={onManage}>
            <span>Manage app</span>
            <ExternalLink size={12} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </footer>
      )}
    </article>
  )
}

export default OauthAppCard
