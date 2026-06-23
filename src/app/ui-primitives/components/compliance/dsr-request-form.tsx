"use client"

import { useCallback, useId, useState, type ChangeEvent } from "react"

import {
  DSR_DESCRIPTION,
  DSR_LABEL,
  type DsrRequestType,
} from "./compliance-types"
import styles from "./dsr-request-form.module.css"

export interface DsrScopeOption {
  id: string
  label: string
}

export interface DsrSubmission {
  fullName: string
  email: string
  verificationMethod: string
  requestType: DsrRequestType
  scopeIds: ReadonlyArray<string>
}

export interface DsrRequestFormProps {
  title?: string
  subtitle?: string
  scopeOptions: ReadonlyArray<DsrScopeOption>
  requestTypes?: ReadonlyArray<DsrRequestType>
  /** Step at which the form starts (1 = identity, 2 = type, 3 = scope). */
  startStep?: 1 | 2 | 3
  onSubmit?: (submission: DsrSubmission) => void
  className?: string
}

type Step = 1 | 2 | 3

const STEP_LABEL: Record<Step, string> = {
  1: "Identity",
  2: "Request type",
  3: "Scope",
}

const ALL_DSR: ReadonlyArray<DsrRequestType> = [
  "access",
  "erasure",
  "rectification",
  "portability",
  "restriction",
]

export function DsrRequestForm({
  title = "Data subject request",
  subtitle = "Lodge a request under the Privacy Act 1988 (Cth) or GDPR. We respond within 30 days.",
  scopeOptions,
  requestTypes = ALL_DSR,
  startStep = 1,
  onSubmit,
  className,
}: DsrRequestFormProps) {
  const [step, setStep] = useState<Step>(startStep)
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [verificationMethod, setVerificationMethod] = useState<string>(
    "Government photo ID + selfie",
  )
  const [requestType, setRequestType] = useState<DsrRequestType>(
    requestTypes[0] ?? "access",
  )
  const [scopeIds, setScopeIds] = useState<ReadonlyArray<string>>([])
  const formId = useId()

  const toggleScope = useCallback((id: string) => {
    setScopeIds((current) => {
      if (current.includes(id)) {
        return current.filter((x) => x !== id)
      }
      return [...current, id]
    })
  }, [])

  const canSubmit =
    fullName.trim().length >= 2 &&
    email.includes("@") &&
    scopeIds.length > 0

  const submit = () => {
    if (!canSubmit) return
    onSubmit?.({
      fullName,
      email,
      verificationMethod,
      requestType,
      scopeIds,
    })
  }

  const advance = () => setStep((s) => (s < 3 ? ((s + 1) as Step) : s))
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))

  return (
    <form
      className={[styles.form, className].filter(Boolean).join(" ")}
      aria-labelledby={`${formId}-title`}
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Privacy Act 1988 · DSR</span>
        <h2 id={`${formId}-title`} className={styles.title}>
          {title}
        </h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>

      <ol className={styles.stepper} aria-label="Form progress">
        {([1, 2, 3] as ReadonlyArray<Step>).map((n) => {
          const cls =
            n === step
              ? styles.stepActive
              : n < step
              ? styles.stepDone
              : ""
          return (
            <li
              key={n}
              className={[styles.stepItem, cls].filter(Boolean).join(" ")}
              aria-current={n === step ? "step" : undefined}
            >
              <span className={styles.stepIndex}>{n}</span>
              {STEP_LABEL[n]}
            </li>
          )
        })}
      </ol>

      {step === 1 ? (
        <fieldset className={styles.section}>
          <legend className={styles.sectionTitle}>Identity verification</legend>
          <div className={styles.fieldRow}>
            <label className={styles.field}>
              <span className={styles.label}>Full legal name</span>
              <input
                type="text"
                className={styles.input}
                value={fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFullName(e.target.value)
                }
                autoComplete="name"
                required
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Email on file</span>
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                required
              />
            </label>
          </div>
          <label className={styles.field}>
            <span className={styles.label}>Verification method</span>
            <input
              type="text"
              className={styles.input}
              value={verificationMethod}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setVerificationMethod(e.target.value)
              }
            />
          </label>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className={styles.section}>
          <legend className={styles.sectionTitle}>Choose request type</legend>
          <div className={styles.requestGrid}>
            {requestTypes.map((type) => {
              const isSelected = requestType === type
              return (
                <button
                  key={type}
                  type="button"
                  className={styles.requestOption}
                  aria-pressed={isSelected}
                  onClick={() => setRequestType(type)}
                >
                  <span className={styles.requestLabel}>{DSR_LABEL[type]}</span>
                  <span className={styles.requestHint}>
                    {DSR_DESCRIPTION[type]}
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset className={styles.section}>
          <legend className={styles.sectionTitle}>
            Scope of request — pick at least one
          </legend>
          <div className={styles.scope}>
            {scopeOptions.map((option) => {
              const isSelected = scopeIds.includes(option.id)
              return (
                <button
                  key={option.id}
                  type="button"
                  className={styles.scopeChip}
                  aria-pressed={isSelected}
                  onClick={() => toggleScope(option.id)}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </fieldset>
      ) : null}

      <div className={styles.actions}>
        <span className={styles.notice}>
          Responses delivered to the verified email within 30 days under OAIC
          guidance.
        </span>
        <div className={styles.actionStack}>
          <button
            type="button"
            className={styles.actionSecondary}
            onClick={back}
            disabled={step === 1}
          >
            Back
          </button>
          {step < 3 ? (
            <button
              type="button"
              className={styles.actionPrimary}
              onClick={advance}
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className={styles.actionPrimary}
              disabled={!canSubmit}
            >
              Submit request
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default DsrRequestForm
