"use client"

import { useId, useState, type FormEvent } from "react"

import styles from "./quote-request-form.module.css"

export type QuoteAudience = "private" | "fleet"

export interface QuoteRequestFormValues {
  make: string
  model: string
  year: string
  services: string[]
  name: string
  email: string
  phone: string
  audience: QuoteAudience
}

interface QuoteRequestFormProps {
  onSubmit?: (data: FormData) => void
  defaultValues?: Partial<QuoteRequestFormValues>
}

interface ServiceOption {
  id: string
  label: string
  desc: string
}

const SERVICES: ReadonlyArray<ServiceOption> = [
  { id: "muffler", label: "Muffler swap", desc: "Direct-fit replacement" },
  { id: "catback", label: "Cat-back", desc: "Full system from cat" },
  { id: "headers", label: "Headers", desc: "Performance manifold" },
  { id: "diagnostic", label: "Diagnostic", desc: "Sound + flow scan" },
  { id: "noise", label: "Noise tuning", desc: "Drone fix · resonator" },
  { id: "rust", label: "Rust repair", desc: "Patch / heat shield" },
]

const STEP_TITLES = [
  { count: "Step 01", label: "Vehicle" },
  { count: "Step 02", label: "Services" },
  { count: "Step 03", label: "Contact" },
] as const

export function QuoteRequestForm({ onSubmit, defaultValues }: QuoteRequestFormProps) {
  const makeId = useId()
  const modelId = useId()
  const yearId = useId()
  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()

  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [services, setServices] = useState<string[]>(defaultValues?.services ?? [])
  const [audience, setAudience] = useState<QuoteAudience>(
    defaultValues?.audience ?? "private",
  )

  const toggleService = (id: string) => {
    setServices((current) =>
      current.includes(id)
        ? current.filter((s) => s !== id)
        : [...current, id],
    )
  }

  const handleNext = () => {
    setStep((current) => (current < 2 ? ((current + 1) as 0 | 1 | 2) : current))
  }

  const handleBack = () => {
    setStep((current) => (current > 0 ? ((current - 1) as 0 | 1 | 2) : current))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step < 2) {
      handleNext()
      return
    }
    const data = new FormData(event.currentTarget)
    services.forEach((s) => data.append("services", s))
    onSubmit?.(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.head}>
        <span className={styles.eyebrow}>04 / Quote request</span>
        <h2 className={styles.title}>Build a workshop quote</h2>
        <p className={styles.lede}>
          Three short steps — vehicle, service needs, contact. Quotes are emailed within 24 hours.
        </p>
      </header>

      <ol className={styles.stepper}>
        {STEP_TITLES.map((s, idx) => {
          const className = [
            styles.step,
            idx === step ? styles.stepOn : "",
            idx < step ? styles.stepDone : "",
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <li key={s.count} className={className} aria-current={idx === step ? "step" : undefined}>
              <span className={styles.stepCount}>{s.count}</span>
              <span className={styles.stepLabel}>{s.label}</span>
            </li>
          )
        })}
      </ol>

      {step === 0 ? (
        <fieldset className={styles.fieldset}>
          <h3 className={styles.fieldsetTitle}>Vehicle details</h3>
          <div className={styles.row2}>
            <div className={styles.field}>
              <label htmlFor={makeId} className={styles.label}>
                Make
              </label>
              <input
                id={makeId}
                name="make"
                type="text"
                required
                placeholder="Holden"
                defaultValue={defaultValues?.make}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={modelId} className={styles.label}>
                Model
              </label>
              <input
                id={modelId}
                name="model"
                type="text"
                required
                placeholder="Commodore VE"
                defaultValue={defaultValues?.model}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor={yearId} className={styles.label}>
              Year
            </label>
            <input
              id={yearId}
              name="year"
              type="number"
              min={1960}
              max={2030}
              required
              placeholder="2010"
              defaultValue={defaultValues?.year}
              className={styles.input}
            />
          </div>
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className={styles.fieldset}>
          <h3 className={styles.fieldsetTitle}>What needs work?</h3>
          <span className={styles.help}>Pick every service relevant to this quote.</span>
          <div className={styles.serviceGrid} role="group">
            {SERVICES.map((option) => {
              const isOn = services.includes(option.id)
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`${styles.serviceChip} ${isOn ? styles.serviceChipOn : ""}`}
                  aria-pressed={isOn}
                  onClick={() => toggleService(option.id)}
                >
                  <span>{option.label}</span>
                  <span className={styles.serviceChipDesc}>{option.desc}</span>
                </button>
              )
            })}
          </div>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className={styles.fieldset}>
          <h3 className={styles.fieldsetTitle}>Contact</h3>
          <div className={styles.row2}>
            <div className={styles.field}>
              <label htmlFor={nameId} className={styles.label}>
                Name
              </label>
              <input
                id={nameId}
                name="name"
                type="text"
                required
                placeholder="Jordan"
                defaultValue={defaultValues?.name}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={emailId} className={styles.label}>
                Email
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                inputMode="email"
                required
                placeholder="you@workshop.com"
                defaultValue={defaultValues?.email}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor={phoneId} className={styles.label}>
              Phone
            </label>
            <input
              id={phoneId}
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="0400 000 000"
              defaultValue={defaultValues?.phone}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Audience</span>
            <div className={styles.audienceRow} role="radiogroup" aria-label="Audience">
              <button
                type="button"
                role="radio"
                aria-checked={audience === "private"}
                className={`${styles.serviceChip} ${audience === "private" ? styles.serviceChipOn : ""}`}
                onClick={() => setAudience("private")}
              >
                <span>Private vehicle</span>
                <span className={styles.serviceChipDesc}>Single car / ute</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={audience === "fleet"}
                className={`${styles.serviceChip} ${audience === "fleet" ? styles.serviceChipOn : ""}`}
                onClick={() => setAudience("fleet")}
              >
                <span>Fleet</span>
                <span className={styles.serviceChipDesc}>Three or more vehicles</span>
              </button>
            </div>
            <input type="hidden" name="audience" value={audience} />
          </div>
        </fieldset>
      ) : null}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.btnGhost}
          onClick={handleBack}
          disabled={step === 0}
          aria-disabled={step === 0}
        >
          ← Back
        </button>
        <button type="submit" className={styles.btnPrimary}>
          {step < 2 ? "Continue →" : "Send quote request"}
        </button>
      </div>
    </form>
  )
}
