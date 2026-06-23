"use client"

import { CheckCircle2, Eye, EyeOff, Loader2, ShieldAlert, ShieldCheck } from "lucide-react"
import { useId, useState } from "react"

import { AuthMethodChip } from "../api-console/auth-method-chip"
import type { AuthStrategy, AuthTestState } from "./api-explorer-types"

import styles from "./auth-config-card.module.css"

interface AuthConfigCardProps {
  strategy: AuthStrategy
  /** Initial credential value — masked by default. */
  credential: string
  /** Pretty label rendered in the card head. */
  label: string
  /** Free-text help under the credential input. */
  hint?: string
  /** Test result state. Defaults to `idle`. */
  testState?: AuthTestState
  /** Test result message — shown next to the success/failure icon. */
  testMessage?: string
  /** Called when the user clicks the test connection button. */
  onTest?: (credential: string) => void
  /** Called whenever the credential value changes. */
  onCredentialChange?: (credential: string) => void
  className?: string
}

const STRATEGY_LABEL: Record<AuthStrategy, string> = {
  "api-key": "API key",
  bearer: "Bearer token",
  oauth: "OAuth client",
}

export function AuthConfigCard({
  strategy,
  credential,
  label,
  hint,
  testState = "idle",
  testMessage,
  onTest,
  onCredentialChange,
  className,
}: AuthConfigCardProps) {
  const [revealed, setRevealed] = useState(false)
  const [value, setValue] = useState(credential)
  const inputId = useId()
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const chipMethod = strategy === "oauth" ? "oidc" : strategy === "bearer" ? "bearer" : "api-key"
  const masked = value
    ? value.length <= 6
      ? "••••••"
      : `${value.slice(0, 4)}${"•".repeat(Math.max(value.length - 8, 4))}${value.slice(-4)}`
    : ""

  const handleChange = (next: string) => {
    setValue(next)
    onCredentialChange?.(next)
  }

  const handleTest = () => {
    onTest?.(value)
  }

  const testButtonDisabled = testState === "testing"

  return (
    <article className={classes} aria-label={`Auth config — ${label}`}>
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Auth</span>
          <h3 className={styles.title}>{label}</h3>
          <p className={styles.subtitle}>{STRATEGY_LABEL[strategy]}</p>
        </div>
        <AuthMethodChip method={chipMethod} inert />
      </header>

      <div className={styles.field}>
        <label htmlFor={inputId} className={styles.fieldLabel}>
          {strategy === "oauth" ? "Client secret" : "Token"}
        </label>
        <div className={styles.inputWrap}>
          <input
            id={inputId}
            type={revealed ? "text" : "password"}
            className={styles.input}
            value={revealed ? value : masked}
            readOnly={!revealed}
            spellCheck={false}
            autoComplete="off"
            onChange={(event) => handleChange(event.target.value)}
          />
          <button
            type="button"
            className={styles.revealBtn}
            aria-pressed={revealed}
            aria-label={revealed ? "Hide credential" : "Reveal credential"}
            onClick={() => setRevealed((prev) => !prev)}
          >
            {revealed ? (
              <EyeOff size={13} strokeWidth={2.4} aria-hidden="true" />
            ) : (
              <Eye size={13} strokeWidth={2.4} aria-hidden="true" />
            )}
          </button>
        </div>
        {hint && <p className={styles.hint}>{hint}</p>}
      </div>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.testBtn}
          onClick={handleTest}
          disabled={testButtonDisabled}
        >
          {testState === "testing" ? (
            <Loader2 size={13} strokeWidth={2.4} aria-hidden="true" className={styles.spin} />
          ) : (
            <ShieldCheck size={13} strokeWidth={2.4} aria-hidden="true" />
          )}
          <span>{testState === "testing" ? "Testing…" : "Test connection"}</span>
        </button>
        {testState === "success" && (
          <span className={`${styles.result} ${styles.resultOk}`} role="status">
            <CheckCircle2 size={13} strokeWidth={2.4} aria-hidden="true" />
            {testMessage ?? "Connection verified."}
          </span>
        )}
        {testState === "failure" && (
          <span className={`${styles.result} ${styles.resultErr}`} role="status">
            <ShieldAlert size={13} strokeWidth={2.4} aria-hidden="true" />
            {testMessage ?? "Connection failed."}
          </span>
        )}
      </footer>
    </article>
  )
}

export default AuthConfigCard
