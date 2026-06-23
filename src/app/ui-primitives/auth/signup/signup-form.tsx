"use client"

import { useState, type FormEvent } from "react"

import {
  AuthShell,
  FormStepper,
  LegalFineprint,
  OauthButtonRow,
  PasswordStrengthMeter,
  type PasswordStrength,
} from "../../components/auth"

import styles from "./signup.module.css"

const STEPS = ["Account", "Workshop", "Confirm"]

const WORKSHOP_TYPES = [
  { value: "", label: "Choose type" },
  { value: "independent", label: "Independent" },
  { value: "franchise", label: "Franchise" },
  { value: "fleet", label: "Fleet operator" },
  { value: "council", label: "Council depot" },
]

const FLEET_BANDS = [
  { value: "", label: "Choose fleet size" },
  { value: "0-5", label: "0–5 vehicles" },
  { value: "6-25", label: "6–25 vehicles" },
  { value: "26-100", label: "26–100 vehicles" },
  { value: "100+", label: "100+ vehicles" },
]

interface SignupState {
  name: string
  email: string
  password: string
  workshopType: string
  suburb: string
  fleetSize: string
  acceptedTerms: boolean
}

const initialState: SignupState = {
  name: "",
  email: "",
  password: "",
  workshopType: "",
  suburb: "",
  fleetSize: "",
  acceptedTerms: false,
}

const STRENGTH_BLOCKS: PasswordStrength[] = ["fair", "good", "strong"]

export function SignupForm() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<SignupState>(initialState)
  const [strength, setStrength] = useState<PasswordStrength>("empty")

  const set = <K extends keyof SignupState>(key: K, value: SignupState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const canAdvance = (() => {
    if (step === 0) {
      return state.name.trim().length > 1 && state.email.includes("@") && STRENGTH_BLOCKS.includes(strength)
    }
    if (step === 1) {
      return Boolean(state.workshopType) && state.suburb.trim().length > 1 && Boolean(state.fleetSize)
    }
    return state.acceptedTerms
  })()

  const next = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (!canAdvance) return
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
    }
  }

  const back = () => {
    if (step > 0) {
      setStep((s) => s - 1)
    }
  }

  const tagline =
    step === 0
      ? "Spin up a workshop account in three steps. We'll provision your bay routing and quoting tools immediately."
      : step === 1
        ? "Tell us about the bays you run so we can pre-configure dispatch, ordering and telemetry channels."
        : "Last check before we open the workshop. You can change any of this from settings later."

  return (
    <AuthShell
      kicker={`Step ${step + 1} / ${STEPS.length}`}
      headline="Provision your workshop"
      tagline={tagline}
      tone="amber"
      version="auth · signup · v2"
    >
      <form className={styles.form} onSubmit={next} noValidate>
        <FormStepper steps={STEPS} currentStep={step} />

        <header className={styles.head}>
          <span className={styles.eyebrow}>Step {step + 1} · {STEPS[step]}</span>
          <h2 className={styles.title}>
            {step === 0 && "Create your account"}
            {step === 1 && "About your workshop"}
            {step === 2 && "Review and confirm"}
          </h2>
          <p className={styles.subtitle}>
            {step === 0 && "Name, email and a password we won't ever leak."}
            {step === 1 && "We use this to seed your dashboards and dispatch defaults."}
            {step === 2 && "Confirm the details and we'll route you to the workshop."}
          </p>
        </header>

        {step === 0 ? (
          <fieldset className={styles.stepBody}>
            <legend
              style={{
                position: "absolute",
                clipPath: "inset(50%)",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              Account details
            </legend>
            <div className={styles.field}>
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your name"
                className={styles.input}
                value={state.name}
                onChange={(e) => set("name", e.target.value)}
              />
              <label htmlFor="signup-name" className={styles.label}>
                Full name
              </label>
            </div>

            <div className={styles.field}>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder="you@workshop.com"
                className={styles.input}
                value={state.email}
                onChange={(e) => set("email", e.target.value)}
              />
              <label htmlFor="signup-email" className={styles.label}>
                Email
              </label>
            </div>

            <div className={styles.field}>
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                className={styles.input}
                value={state.password}
                onChange={(e) => set("password", e.target.value)}
                aria-describedby="signup-password-strength"
              />
              <label htmlFor="signup-password" className={styles.label}>
                Password
              </label>
            </div>

            <div id="signup-password-strength">
              <PasswordStrengthMeter
                value={state.password}
                onStrengthChange={(s) => setStrength(s)}
              />
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset className={styles.stepBody}>
            <legend
              style={{
                position: "absolute",
                clipPath: "inset(50%)",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              Workshop details
            </legend>

            <div className={styles.field} data-filled={Boolean(state.workshopType) || undefined}>
              <select
                id="signup-type"
                className={styles.select}
                value={state.workshopType}
                onChange={(e) => set("workshopType", e.target.value)}
                required
              >
                {WORKSHOP_TYPES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <label htmlFor="signup-type" className={styles.label}>
                Workshop type
              </label>
            </div>

            <div className={styles.field}>
              <input
                id="signup-suburb"
                name="suburb"
                type="text"
                autoComplete="address-level2"
                required
                placeholder="Suburb"
                className={styles.input}
                value={state.suburb}
                onChange={(e) => set("suburb", e.target.value)}
              />
              <label htmlFor="signup-suburb" className={styles.label}>
                Suburb
              </label>
            </div>

            <div className={styles.field} data-filled={Boolean(state.fleetSize) || undefined}>
              <select
                id="signup-fleet"
                className={styles.select}
                value={state.fleetSize}
                onChange={(e) => set("fleetSize", e.target.value)}
                required
              >
                {FLEET_BANDS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <label htmlFor="signup-fleet" className={styles.label}>
                Fleet size you service
              </label>
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <div className={styles.stepBody}>
            <article className={styles.summaryCard}>
              <header className={styles.summaryHead}>
                <h3 className={styles.summaryHeading}>Your workshop</h3>
                <span className={styles.summaryMeta}>Ready to dispatch</span>
              </header>
              <dl>
                <div className={styles.summaryRow}>
                  <dt className={styles.summaryKey}>Owner</dt>
                  <dd className={styles.summaryValue}>{state.name || "—"}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt className={styles.summaryKey}>Email</dt>
                  <dd className={styles.summaryValue}>{state.email || "—"}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt className={styles.summaryKey}>Type</dt>
                  <dd className={styles.summaryValue}>
                    {WORKSHOP_TYPES.find((t) => t.value === state.workshopType)?.label || "—"}
                  </dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt className={styles.summaryKey}>Suburb</dt>
                  <dd className={styles.summaryValue}>{state.suburb || "—"}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt className={styles.summaryKey}>Fleet band</dt>
                  <dd className={styles.summaryValue}>
                    {FLEET_BANDS.find((t) => t.value === state.fleetSize)?.label || "—"}
                  </dd>
                </div>
              </dl>
            </article>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={state.acceptedTerms}
                onChange={(e) => set("acceptedTerms", e.target.checked)}
                required
              />
              <span>
                I confirm I&apos;m authorised to provision this workshop and accept the Mufflermen
                operator agreement.
              </span>
            </label>
          </div>
        ) : null}

        {step === 0 ? <OauthButtonRow /> : null}

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.backButton}
            onClick={back}
            disabled={step === 0}
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </button>
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={!canAdvance}
          >
            <span>{step === STEPS.length - 1 ? "Open the workshop" : "Continue"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </footer>

        <LegalFineprint />
      </form>
    </AuthShell>
  )
}
