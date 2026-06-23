"use client"

import { Copy, KeyRound, RefreshCcw } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"

import styles from "./webhook-signing-secret-row.module.css"

export type SigningAlgorithm = "HMAC-SHA256" | "HMAC-SHA512" | "RSA-SHA256" | "Ed25519"

export interface WebhookSigningSecretRowProps {
  /** Display label, e.g. "Workshop invoice signer". */
  label: string
  /** Masked signing secret. */
  maskedSecret: string
  algorithm: SigningAlgorithm
  /** ISO date string of the last rotation. */
  lastRotatedAt: string
  /** Optional explicit description of who/what depends on this signer. */
  scopeDescription?: string
  onCopy?: () => void
  onRotate?: () => void
  className?: string
}

const ALGORITHM_TONE: Record<SigningAlgorithm, "teal" | "amber" | "green" | "red"> = {
  "HMAC-SHA256": "teal",
  "HMAC-SHA512": "green",
  "RSA-SHA256": "amber",
  Ed25519: "red",
}

export function WebhookSigningSecretRow({
  label,
  maskedSecret,
  algorithm,
  lastRotatedAt,
  scopeDescription,
  onCopy,
  onRotate,
  className,
}: WebhookSigningSecretRowProps) {
  const [copied, setCopied] = useState(false)
  const classes = [styles.row, className].filter(Boolean).join(" ")

  const handleCopy = () => {
    onCopy?.()
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className={classes} role="listitem">
      <div className={styles.identity}>
        <span className={styles.iconWrap} aria-hidden="true">
          <KeyRound size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.identityText}>
          <span className={styles.label}>{label}</span>
          {scopeDescription && (
            <span className={styles.scopeDescription}>{scopeDescription}</span>
          )}
        </div>
      </div>

      <div className={styles.secretBlock}>
        <code className={styles.secret} aria-label="Masked signing secret">
          {maskedSecret}
        </code>
        <button
          type="button"
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label="Copy signing secret"
        >
          <Copy size={12} strokeWidth={2.4} aria-hidden="true" />
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <Chip label={algorithm} tone={ALGORITHM_TONE[algorithm]} />

      <dl className={styles.meta}>
        <div>
          <dt>Last rotated</dt>
          <dd>{lastRotatedAt}</dd>
        </div>
      </dl>

      <button type="button" className={styles.rotateBtn} onClick={onRotate}>
        <RefreshCcw size={12} strokeWidth={2.4} aria-hidden="true" />
        <span>Rotate</span>
      </button>
    </div>
  )
}

export default WebhookSigningSecretRow
