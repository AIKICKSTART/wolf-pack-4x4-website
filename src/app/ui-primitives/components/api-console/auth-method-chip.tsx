"use client"

import { Fingerprint, Key, Lock, ShieldCheck, UserCog } from "lucide-react"
import type { ReactNode } from "react"

import { Popover } from "../primitives/popover"
import { AUTH_METHOD_LABEL, type AuthMethod } from "./api-console-types"

import styles from "./auth-method-chip.module.css"

interface AuthMethodChipProps {
  method: AuthMethod
  /** Optional override for the popover signature preview body. */
  signaturePreview?: string
  /** Hide the popover even on click — used for tightly packed contexts. */
  inert?: boolean
  className?: string
}

const ICON: Record<AuthMethod, ReactNode> = {
  bearer: <Key size={12} strokeWidth={2.4} aria-hidden="true" />,
  basic: <UserCog size={12} strokeWidth={2.4} aria-hidden="true" />,
  "api-key": <Fingerprint size={12} strokeWidth={2.4} aria-hidden="true" />,
  mtls: <Lock size={12} strokeWidth={2.4} aria-hidden="true" />,
  oidc: <ShieldCheck size={12} strokeWidth={2.4} aria-hidden="true" />,
}

const DEFAULT_PREVIEW: Record<AuthMethod, string> = {
  bearer: "Authorization: Bearer mufflermen_live_sk_…",
  basic: "Authorization: Basic d29ya3Nob3A6•••••• (base64)",
  "api-key": "X-Mufflermen-API-Key: mfm_pk_live_…",
  mtls: "TLS client cert: CN=workshop.muffler.men, SHA256:b1:42:…",
  oidc: "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6Ikp…",
}

export function AuthMethodChip({
  method,
  signaturePreview,
  inert = false,
  className,
}: AuthMethodChipProps) {
  const label = AUTH_METHOD_LABEL[method]
  const preview = signaturePreview ?? DEFAULT_PREVIEW[method]
  const chipClasses = [styles.chip, styles[`tone-${method}`], className].filter(Boolean).join(" ")

  const chip = (
    <span className={chipClasses} role="button" tabIndex={inert ? -1 : 0}>
      <span className={styles.icon} aria-hidden="true">
        {ICON[method]}
      </span>
      <span className={styles.label}>{label}</span>
    </span>
  )

  if (inert) {
    return chip
  }

  return (
    <Popover
      trigger={chip}
      placement="bottom"
      align="start"
      contentClassName={styles.popover}
    >
      <div className={styles.popoverInner}>
        <span className={styles.popoverKicker}>Signature preview</span>
        <code className={styles.signature}>{preview}</code>
        <span className={styles.popoverFoot}>{`Method: ${label}`}</span>
      </div>
    </Popover>
  )
}

export default AuthMethodChip
