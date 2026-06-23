"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"

import {
  AuthShell,
  LegalFineprint,
  MagicLinkSent,
} from "../../components/auth"

import styles from "./reset.module.css"

type ResetState = "idle" | "sent"

export function ResetForm() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<ResetState>("idle")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.includes("@")) return
    setState("sent")
  }

  const handleBack = () => {
    setState("idle")
  }

  return (
    <AuthShell
      kicker="Account recovery"
      headline="Reset your password"
      tagline="We'll send a one-time link that lets you set a fresh password. The link expires in 10 minutes and burns after a single use."
      tone="teal"
      version="auth · reset · v2"
    >
      {state === "idle" ? (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <header className={styles.head}>
            <span className={styles.eyebrow}>Lost your password?</span>
            <h2 className={styles.title}>Send a reset link</h2>
            <p className={styles.subtitle}>
              Enter the email on file and we&apos;ll deliver a fresh sign-in link.
            </p>
          </header>

          <div className={styles.field}>
            <input
              id="reset-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="you@workshop.com"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="reset-email" className={styles.label}>
              Email
            </label>
          </div>

          <p className={styles.helpHint}>
            If your address is enrolled with two-factor we&apos;ll also nudge an SMS for verification.
          </p>

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={!email.includes("@")}
          >
            <span>Send reset link</span>
            <span aria-hidden="true">→</span>
          </button>

          <p className={styles.altFoot}>
            Remembered it?{" "}
            <Link href="/ui-primitives/auth/login">Back to sign in</Link>
          </p>

          <LegalFineprint />
        </form>
      ) : (
        <div className={styles.form}>
          <MagicLinkSent
            email={email}
            altActionSlot={
              <button
                type="button"
                className={styles.altLinkButton}
                onClick={handleBack}
              >
                Use a different email
              </button>
            }
          />
          <p className={styles.altFoot}>
            Still nothing? Check your spam folder or{" "}
            <a href="#contact">contact dispatch</a>.
          </p>
          <LegalFineprint />
        </div>
      )}
    </AuthShell>
  )
}
