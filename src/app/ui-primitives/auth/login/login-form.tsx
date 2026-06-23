"use client"

import { useMemo, useState, type FormEvent } from "react"
import Link from "next/link"

import {
  AuthAsideMarquee,
  AuthShell,
  LegalFineprint,
  OauthButtonRow,
  SocialProofStrip,
} from "../../components/auth"

import styles from "./login.module.css"

const OAUTH_DOMAIN_HINT = /@(google|microsoft|apple|gov\.au)\b/i

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)

  const oauthHint = useMemo(
    () => (OAUTH_DOMAIN_HINT.test(email) ? "Provider sign-in detected" : null),
    [email],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // visual-only — no auth wired
  }

  return (
    <AuthShell
      kicker="Workshop access"
      headline="Sign in to your workshop"
      tagline="Quote jobs, dispatch fleets, and read live exhaust telemetry across the Illawarra. One login, every bay."
      tone="red"
      version="auth · login · v2"
      brandBodySlot={<SocialProofStrip />}
      brandFooter={<span>Bay routing v3.4</span>}
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <header className={styles.formHead}>
          <span className={styles.eyebrow}>Welcome back</span>
          <h2 className={styles.title}>Open the workshop</h2>
          <p className={styles.subtitle}>
            Sign in with your email or one of the connected providers.
          </p>
        </header>

        <fieldset className={styles.fieldGroup}>
          <legend
            style={{
              position: "absolute",
              clipPath: "inset(50%)",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            Email and password
          </legend>

          <div className={styles.field}>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="you@workshop.com"
              className={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className={styles.label} htmlFor="login-email">
              Email
            </label>
            {oauthHint ? (
              <span className={styles.hintChip} role="status">
                {oauthHint}
              </span>
            ) : null}
          </div>

          <div className={styles.field}>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              className={styles.input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label className={styles.label} htmlFor="login-password">
              Password
            </label>
          </div>
        </fieldset>

        <div className={styles.rowBetween}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            <span>Stay signed in</span>
          </label>
          <Link className={styles.forgotLink} href="/ui-primitives/auth/reset">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className={styles.primaryButton}>
          <span>Sign in</span>
          <span aria-hidden="true">→</span>
        </button>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <OauthButtonRow />

        <p className={styles.altFoot}>
          New to the workshop?{" "}
          <Link href="/ui-primitives/auth/signup">Create an account</Link>
        </p>

        <LegalFineprint />

        <AuthAsideMarquee />
      </form>
    </AuthShell>
  )
}
