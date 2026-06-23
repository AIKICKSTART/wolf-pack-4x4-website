"use client"

import { Copy, KeyRound } from "lucide-react"
import { useCallback, useState } from "react"

import { Chip, type ChipTone } from "../primitives/chip"
import styles from "./api-token-row.module.css"

export interface ApiTokenRowItem {
  id: string
  name: string
  maskedValue: string
  scopes: ReadonlyArray<string>
  lastUsed?: string
  createdBy?: string
  expiresAt?: string
}

interface ApiTokenRowProps {
  token: ApiTokenRowItem
  onCopy?: (id: string) => void
  onRevoke?: (id: string) => void
  className?: string
}

const SCOPE_TONE: Record<string, ChipTone> = {
  read: "teal",
  write: "amber",
  admin: "red",
  workshop: "green",
  customer: "neutral",
}

function pickScopeTone(scope: string): ChipTone {
  const lower = scope.toLowerCase()
  for (const key of Object.keys(SCOPE_TONE)) {
    if (lower.includes(key)) {
      return SCOPE_TONE[key]
    }
  }
  return "neutral"
}

export function ApiTokenRow({ token, onCopy, onRevoke, className }: ApiTokenRowProps) {
  const [copied, setCopied] = useState(false)
  const classes = [styles.row, className].filter(Boolean).join(" ")

  const handleCopy = useCallback(() => {
    onCopy?.(token.id)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }, [onCopy, token.id])

  return (
    <div className={classes} role="listitem">
      <div className={styles.identity}>
        <span className={styles.iconWrap} aria-hidden="true">
          <KeyRound size={16} strokeWidth={2.2} />
        </span>
        <div className={styles.identityText}>
          <span className={styles.name}>{token.name}</span>
          {token.createdBy && (
            <span className={styles.createdBy}>Created by {token.createdBy}</span>
          )}
        </div>
      </div>

      <div className={styles.tokenBlock}>
        <code className={styles.maskedValue} aria-label="Masked token value">
          {token.maskedValue}
        </code>
        <button
          type="button"
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label={`Copy ${token.name}`}
          aria-live="polite"
        >
          <Copy size={12} strokeWidth={2.2} aria-hidden="true" />
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <ul className={styles.scopes} aria-label={`${token.name} scopes`}>
        {token.scopes.map((scope) => (
          <li key={scope}>
            <Chip label={scope} tone={pickScopeTone(scope)} />
          </li>
        ))}
      </ul>

      <dl className={styles.meta}>
        {token.lastUsed && (
          <div>
            <dt>Last used</dt>
            <dd>{token.lastUsed}</dd>
          </div>
        )}
        {token.expiresAt && (
          <div>
            <dt>Expires</dt>
            <dd>{token.expiresAt}</dd>
          </div>
        )}
      </dl>

      <button
        type="button"
        className={styles.revokeBtn}
        onClick={() => onRevoke?.(token.id)}
        aria-label={`Revoke ${token.name}`}
      >
        Revoke
      </button>
    </div>
  )
}

export default ApiTokenRow
