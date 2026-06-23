"use client"

import { useMemo, useState, type FormEvent } from "react"

import {
  AuthAsideMarquee,
  AuthShell,
  FormStepper,
  LegalFineprint,
  OauthButtonRow,
  PasswordStrengthMeter,
  SocialProofStrip,
  TwoFactorPad,
  type PasswordStrength,
} from "../../components/auth"
import {
  AUTH_TESTIMONIALS,
  BRAND_HIGHLIGHTS,
  LEGAL_LINKS,
  OAUTH_PROVIDERS,
  SERVICE_REGIONS,
  SIGNUP_STEPS,
  STRONG_ENOUGH,
  TORQUE_NAME,
  TORQUE_TAGLINE_LINE,
  TRUST_MARKS,
  VERIFY_DEMO_CODE,
  VERIFY_EMAIL,
  WORKSHOP_TYPES,
} from "./_demo-data"
import styles from "./auth.module.css"

type Mode = "signin" | "signup"

interface SignupState {
  name: string
  email: string
  password: string
  workshopType: string
  region: string
}

const INITIAL_SIGNUP: SignupState = {
  name: "",
  email: "",
  password: "",
  workshopType: "",
  region: "",
}

/** Placeholder circular Torque avatar — real mascot lands later. */
function TorqueAvatar() {
  return (
    <span className={styles.avatar} aria-hidden="true">
      <span className={styles.avatarInitial}>T</span>
    </span>
  )
}

/** Shared marketing pane content rendered inside the AuthShell brand slot. */
function BrandBody() {
  return (
    <div className={styles.brandStack}>
      <div className={styles.brandLede}>
        <TorqueAvatar />
        <p className={styles.brandLine}>{TORQUE_TAGLINE_LINE}</p>
      </div>

      <ul className={styles.highlights}>
        {BRAND_HIGHLIGHTS.map((item) => (
          <li key={item.label} className={styles.highlight}>
            <span className={styles.highlightStat}>{item.stat}</span>
            <span className={styles.highlightLabel}>{item.label}</span>
          </li>
        ))}
      </ul>

      <AuthAsideMarquee
        testimonials={AUTH_TESTIMONIALS}
        label="From the workshop floor"
        className={styles.marquee}
      />

      <SocialProofStrip
        label="Trusted by Illawarra workshops & fleets"
        marks={TRUST_MARKS}
        className={styles.trust}
      />
    </div>
  )
}

function ModeTabs({
  mode,
  onChange,
}: {
  mode: Mode
  onChange: (next: Mode) => void
}) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Authentication mode">
      <button
        type="button"
        role="tab"
        aria-selected={mode === "signin"}
        className={styles.tab}
        data-active={mode === "signin"}
        onClick={() => onChange("signin")}
      >
        Sign in
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "signup"}
        className={styles.tab}
        data-active={mode === "signup"}
        onClick={() => onChange("signup")}
      >
        Create account
      </button>
    </div>
  )
}

function SignInPanel() {
  return (
    <div className={styles.panel} role="tabpanel" aria-label="Sign in">
      <header className={styles.head}>
        <span className={styles.eyebrow}>Welcome back</span>
        <h2 className={styles.title}>Sign in to {TORQUE_NAME}</h2>
        <p className={styles.subtitle}>
          Pick up where you left off — your drafts, quotes and enquiry replies
          are waiting.
        </p>
      </header>

      <OauthButtonRow providers={OAUTH_PROVIDERS} />

      <div className={styles.divider} aria-hidden="true">
        <span>or with email</span>
      </div>

      <form
        className={styles.form}
        onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}
        noValidate
      >
        <div className={styles.field}>
          <input
            id="signin-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@workshop.com.au"
            className={styles.input}
            defaultValue={VERIFY_EMAIL}
          />
          <label htmlFor="signin-email" className={styles.label}>
            Work email
          </label>
        </div>

        <div className={styles.field}>
          <input
            id="signin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Your password"
            className={styles.input}
          />
          <label htmlFor="signin-password" className={styles.label}>
            Password
          </label>
          <a className={styles.fieldLink} href="#reset">
            Forgot?
          </a>
        </div>

        <label className={styles.remember}>
          <input type="checkbox" defaultChecked />
          <span>Keep me signed in on this workshop terminal</span>
        </label>

        <button type="submit" className={styles.primaryButton}>
          <span>Sign in</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <LegalFineprint
        prefix={`By signing in you accept the ${TORQUE_NAME}`}
        links={LEGAL_LINKS}
      />
    </div>
  )
}

function SignUpPanel() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<SignupState>(INITIAL_SIGNUP)
  const [strength, setStrength] = useState<PasswordStrength>("empty")
  const [code, setCode] = useState("")
  const [codeError, setCodeError] = useState(false)
  const [verified, setVerified] = useState(false)

  const set = <K extends keyof SignupState>(key: K, value: SignupState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const canAdvance = useMemo(() => {
    if (step === 0) {
      return (
        state.name.trim().length > 1 &&
        state.email.includes("@") &&
        STRONG_ENOUGH.includes(strength as "fair" | "good" | "strong")
      )
    }
    if (step === 1) {
      return Boolean(state.workshopType) && Boolean(state.region)
    }
    return verified
  }, [step, state, strength, verified])

  const advance = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (!canAdvance) return
    if (step < SIGNUP_STEPS.length - 1) {
      setStep((value) => value + 1)
    }
  }

  const back = () => {
    if (step > 0) setStep((value) => value - 1)
  }

  const handleCodeComplete = (next: string) => {
    if (next === VERIFY_DEMO_CODE) {
      setCodeError(false)
      setVerified(true)
    } else {
      setCodeError(true)
      setVerified(false)
    }
  }

  return (
    <div className={styles.panel} role="tabpanel" aria-label="Create account">
      <header className={styles.head}>
        <span className={styles.eyebrow}>
          Step {step + 1} · {SIGNUP_STEPS[step]}
        </span>
        <h2 className={styles.title}>Set up your workshop</h2>
        <p className={styles.subtitle}>
          {step === 0 &&
            "Three quick steps and Torque starts drafting for your shop."}
          {step === 1 &&
            "Tell us about the bays you run so Torque sounds like your shop."}
          {step === 2 &&
            "Confirm it's you — we sent a six-digit code to your work email."}
        </p>
      </header>

      <FormStepper steps={[...SIGNUP_STEPS]} currentStep={step} />

      <form className={styles.form} onSubmit={advance} noValidate>
        {step === 0 ? (
          <fieldset className={styles.fieldset}>
            <legend className={styles.visuallyHidden}>Account details</legend>

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
                onChange={(event) => set("name", event.target.value)}
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
                inputMode="email"
                autoComplete="email"
                required
                placeholder="you@workshop.com.au"
                className={styles.input}
                value={state.email}
                onChange={(event) => set("email", event.target.value)}
              />
              <label htmlFor="signup-email" className={styles.label}>
                Work email
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
                onChange={(event) => set("password", event.target.value)}
                aria-describedby="signup-strength"
              />
              <label htmlFor="signup-password" className={styles.label}>
                Password
              </label>
            </div>

            <div id="signup-strength">
              <PasswordStrengthMeter
                value={state.password}
                onStrengthChange={(next) => setStrength(next)}
              />
            </div>

            <div className={styles.divider} aria-hidden="true">
              <span>or sign up with</span>
            </div>

            <OauthButtonRow providers={OAUTH_PROVIDERS} />
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset className={styles.fieldset}>
            <legend className={styles.visuallyHidden}>Workshop details</legend>

            <div
              className={styles.field}
              data-filled={Boolean(state.workshopType) || undefined}
            >
              <select
                id="signup-type"
                className={styles.select}
                value={state.workshopType}
                onChange={(event) => set("workshopType", event.target.value)}
                required
              >
                {WORKSHOP_TYPES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label htmlFor="signup-type" className={styles.label}>
                Workshop type
              </label>
            </div>

            <div
              className={styles.field}
              data-filled={Boolean(state.region) || undefined}
            >
              <select
                id="signup-region"
                className={styles.select}
                value={state.region}
                onChange={(event) => set("region", event.target.value)}
                required
              >
                {SERVICE_REGIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label htmlFor="signup-region" className={styles.label}>
                Service region
              </label>
            </div>

            <p className={styles.fieldHint}>
              Torque uses this to seed your house voice and the suburbs it
              mentions in posts and replies.
            </p>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <div className={styles.verifyStep}>
            <p className={styles.verifyLede}>
              Enter the code we sent to{" "}
              <strong className={styles.verifyEmail}>{state.email || VERIFY_EMAIL}</strong>
              .
            </p>
            <TwoFactorPad
              length={6}
              value={code}
              onChange={(next) => {
                setCode(next)
                if (codeError) setCodeError(false)
              }}
              onComplete={handleCodeComplete}
              hasError={codeError}
              ariaLabel="Six-digit verification code"
            />
            <p
              className={styles.verifyStatus}
              data-state={verified ? "ok" : codeError ? "error" : "idle"}
              role="status"
              aria-live="polite"
            >
              {verified
                ? "Verified — your workshop is ready to open."
                : codeError
                  ? "That code didn't match. Check the latest email and try again."
                  : `Demo code: ${VERIFY_DEMO_CODE}. Paste or type to continue.`}
            </p>
            <button type="button" className={styles.resend}>
              Resend code
            </button>
          </div>
        ) : null}

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
            <span>
              {step === SIGNUP_STEPS.length - 1 ? "Open the workshop" : "Continue"}
            </span>
            <span aria-hidden="true">→</span>
          </button>
        </footer>
      </form>

      <LegalFineprint
        prefix={`By creating an account you accept the ${TORQUE_NAME}`}
        links={LEGAL_LINKS}
      />
    </div>
  )
}

export function AuthScene() {
  const [mode, setMode] = useState<Mode>("signin")

  return (
    <AuthShell
      kicker="Torque access"
      headline="Open your workshop"
      tagline="Sign in to keep Torque drafting for Oak Flats Muffler Men, or set up a new workshop in three steps."
      tone="red"
      region="Oak Flats · Illawarra NSW"
      version="torque · auth · v2"
      brandBodySlot={<BrandBody />}
    >
      <div className={styles.formColumn}>
        <ModeTabs mode={mode} onChange={setMode} />
        {mode === "signin" ? <SignInPanel /> : <SignUpPanel />}
      </div>
    </AuthShell>
  )
}

export default AuthScene
