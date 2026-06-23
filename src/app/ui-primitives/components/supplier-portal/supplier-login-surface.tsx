"use client"

import { KeyRound, ShieldCheck } from "lucide-react"
import { useId, useState, type FormEvent } from "react"

import { AuthShell } from "../auth/auth-shell"
import { OauthButtonRow } from "../auth/oauth-button-row"
import { Chip } from "../primitives/chip"

import styles from "./supplier-login-surface.module.css"

export interface SupplierLoginSurfaceProps {
  /** Supplier name for the brand pane. */
  supplierName: string
  /** Pre-filled supplier account ID (e.g. "manta-performance"). */
  defaultAccount?: string
  /** Link target for the "request access" CTA. */
  requestAccessHref?: string
  /** When true the form shows a 2FA hint banner. */
  twoFactorRequired?: boolean
  /** Callback fired on a successful submit. Receives the entered account ID. */
  onSubmit?: (accountId: string) => void
}

export function SupplierLoginSurface({
  supplierName,
  defaultAccount = "",
  requestAccessHref = "/ui-primitives/supplier-portal",
  twoFactorRequired = true,
  onSubmit,
}: SupplierLoginSurfaceProps) {
  const accountId = useId()
  const passwordId = useId()
  const [account, setAccount] = useState<string>(defaultAccount)
  const [password, setPassword] = useState<string>("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!account.trim()) return
    onSubmit?.(account.trim())
  }

  return (
    <AuthShell
      kicker="Supplier portal · v3"
      headline={`Welcome back, ${supplierName}`}
      tagline="Sign in to acknowledge POs, broadcast updates and submit invoices to Oak Flats Mufflermen."
      tone="amber"
      brandFooter="Trade login · TLS"
    >
      <form className={styles.form} onSubmit={handleSubmit} aria-label="Supplier sign in">
        <div className={styles.headRow}>
          <span className={styles.eyebrow}>Trade access</span>
          <Chip
            label={twoFactorRequired ? "2FA required" : "2FA optional"}
            tone={twoFactorRequired ? "amber" : "teal"}
            icon={<ShieldCheck size={12} aria-hidden="true" />}
          />
        </div>

        <h2 className={styles.title}>Sign in to dispatch desk</h2>

        <label className={styles.field} htmlFor={accountId}>
          <span className={styles.fieldLabel}>Supplier account</span>
          <input
            id={accountId}
            className={styles.input}
            type="text"
            autoComplete="username"
            placeholder="manta-performance"
            value={account}
            onChange={(event) => setAccount(event.target.value)}
            required
          />
        </label>

        <label className={styles.field} htmlFor={passwordId}>
          <span className={styles.fieldLabel}>Password</span>
          <input
            id={passwordId}
            className={styles.input}
            type="password"
            autoComplete="current-password"
            placeholder="At least 12 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={12}
          />
        </label>

        {twoFactorRequired ? (
          <p className={styles.hint} role="note">
            <KeyRound size={12} aria-hidden="true" />
            After password you will be prompted for the 6-digit code from your trade authenticator.
          </p>
        ) : null}

        <button type="submit" className={styles.primary}>
          Continue to dispatch desk
          <span aria-hidden="true">→</span>
        </button>

        <div className={styles.divider} aria-hidden="true">
          <span>or</span>
        </div>

        <OauthButtonRow providers={["google", "microsoft"]} />

        <p className={styles.footnote}>
          New to Oak Flats trade?{" "}
          <a className={styles.requestLink} href={requestAccessHref}>
            Request supplier access
          </a>
        </p>
      </form>
    </AuthShell>
  )
}

export default SupplierLoginSurface
