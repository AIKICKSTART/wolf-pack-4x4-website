"use client"

import { useId, useMemo, useState, type FormEvent } from "react"

import type {
  LandingLeadFormStep,
  LandingLeadFormValues,
} from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface LeadCaptureFormProps {
  kicker?: string
  heading: string
  lede?: string
  services: ReadonlyArray<{ value: string; label: string }>
  /** Called once the third step has been submitted. */
  onSubmit?: (values: LandingLeadFormValues) => void
  successMessage?: string
  className?: string
}

const EMPTY: LandingLeadFormValues = {
  name: "",
  email: "",
  phone: "",
  vehicle: "",
  service: "",
  notes: "",
}

interface StepCopy {
  count: string
  label: string
}

const STEPS: ReadonlyArray<StepCopy> = [
  { count: "Step 01", label: "Contact" },
  { count: "Step 02", label: "Vehicle" },
  { count: "Step 03", label: "Service" },
] as const

function stepClass(step: LandingLeadFormStep, current: LandingLeadFormStep): string {
  if (step === current) return `${styles.leadFormStep} ${styles.leadFormStepActive}`
  if (step < current) return `${styles.leadFormStep} ${styles.leadFormStepDone}`
  return styles.leadFormStep
}

/**
 * Primitive 09 — Hero lead-capture form. Three progressive steps
 * (contact → vehicle → service) with stepper feedback, an explicit success
 * panel after submit, and a single primary CTA per step. Form state stays
 * client-side; the consumer receives a snapshot on final submit.
 */
export function LeadCaptureForm({
  kicker,
  heading,
  lede,
  services,
  onSubmit,
  successMessage = "Quote request received. Mufflermen reception will call you back inside two hours.",
  className,
}: LeadCaptureFormProps) {
  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const vehicleId = useId()
  const serviceId = useId()
  const notesId = useId()

  const [step, setStep] = useState<LandingLeadFormStep>(0)
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState<LandingLeadFormValues>(EMPTY)

  const handleChange = <Key extends keyof LandingLeadFormValues>(
    key: Key,
    value: LandingLeadFormValues[Key],
  ) => {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const canAdvance = useMemo(() => {
    if (step === 0) return values.name.length > 1 && values.email.includes("@")
    if (step === 1) return values.phone.length >= 6 && values.vehicle.length > 1
    return values.service.length > 0
  }, [step, values])

  const nextStep = (current: LandingLeadFormStep): LandingLeadFormStep => {
    if (current === 0) return 1
    if (current === 1) return 2
    return 2
  }

  const prevStep = (current: LandingLeadFormStep): LandingLeadFormStep => {
    if (current === 2) return 1
    if (current === 1) return 0
    return 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canAdvance) return
    if (step < 2) {
      setStep((current) => nextStep(current))
      return
    }
    onSubmit?.(values)
    setSubmitted(true)
  }

  const handleBack = () => {
    setStep((current) => prevStep(current))
  }

  const formClasses = [styles.leadForm, className].filter(Boolean).join(" ")

  if (submitted) {
    return (
      <section className={formClasses} aria-live="polite">
        <header className={styles.leadFormHead}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          <h2 className={styles.leadFormTitle}>{heading}</h2>
        </header>
        <p className={styles.leadFormSuccess}>{successMessage}</p>
      </section>
    )
  }

  return (
    <form className={formClasses} onSubmit={handleSubmit} noValidate aria-label={heading}>
      <header className={styles.leadFormHead}>
        {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
        <h2 className={styles.leadFormTitle}>{heading}</h2>
        {lede ? <p className={styles.leadFormLede}>{lede}</p> : null}
      </header>

      <ol className={styles.leadFormStepper}>
        {STEPS.map((stepCopy, stepIndex) => (
          <li
            key={stepCopy.count}
            className={stepClass(stepIndex as LandingLeadFormStep, step)}
            aria-current={stepIndex === step ? "step" : undefined}
          >
            <span>{stepCopy.count}</span>
            <strong>{stepCopy.label}</strong>
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <div className={styles.leadFormGroup}>
          <div className={styles.leadFormField}>
            <label htmlFor={nameId} className={styles.leadFormLabel}>
              Full name
            </label>
            <input
              id={nameId}
              type="text"
              autoComplete="name"
              required
              className={styles.leadFormInput}
              value={values.name}
              onChange={(event) => handleChange("name", event.currentTarget.value)}
            />
          </div>
          <div className={styles.leadFormField}>
            <label htmlFor={emailId} className={styles.leadFormLabel}>
              Email
            </label>
            <input
              id={emailId}
              type="email"
              autoComplete="email"
              required
              className={styles.leadFormInput}
              value={values.email}
              onChange={(event) => handleChange("email", event.currentTarget.value)}
            />
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className={styles.leadFormGroup}>
          <div className={styles.leadFormField}>
            <label htmlFor={phoneId} className={styles.leadFormLabel}>
              Phone
            </label>
            <input
              id={phoneId}
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              required
              className={styles.leadFormInput}
              value={values.phone}
              onChange={(event) => handleChange("phone", event.currentTarget.value)}
            />
          </div>
          <div className={styles.leadFormField}>
            <label htmlFor={vehicleId} className={styles.leadFormLabel}>
              Vehicle (year, make, model)
            </label>
            <input
              id={vehicleId}
              type="text"
              required
              className={styles.leadFormInput}
              placeholder="e.g. 2018 Toyota Hilux SR5"
              value={values.vehicle}
              onChange={(event) => handleChange("vehicle", event.currentTarget.value)}
            />
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className={styles.leadFormGroup}>
          <div className={styles.leadFormField}>
            <label htmlFor={serviceId} className={styles.leadFormLabel}>
              Service needed
            </label>
            <select
              id={serviceId}
              className={styles.leadFormSelect}
              required
              value={values.service}
              onChange={(event) => handleChange("service", event.currentTarget.value)}
            >
              <option value="" disabled>
                Pick a service
              </option>
              {services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.leadFormField}>
            <label htmlFor={notesId} className={styles.leadFormLabel}>
              Notes (optional)
            </label>
            <textarea
              id={notesId}
              className={styles.leadFormTextarea}
              placeholder="Anything the workshop should know up front?"
              value={values.notes ?? ""}
              onChange={(event) => handleChange("notes", event.currentTarget.value)}
            />
          </div>
        </div>
      ) : null}

      <div className={styles.leadFormActions}>
        {step > 0 ? (
          <button
            type="button"
            className={`${styles.action} ${styles.actionGhost}`}
            onClick={handleBack}
          >
            <span>Back</span>
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
        <button
          type="submit"
          className={`${styles.action} ${styles.actionPrimary}`}
          disabled={!canAdvance}
        >
          <span>{step < 2 ? "Continue" : "Send quote request"}</span>
          <span className={styles.arrow} aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}

export default LeadCaptureForm
