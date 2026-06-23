"use client"

import { useId, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { Search, ShieldCheck, ShieldAlert } from "lucide-react"

import { Chip } from "../primitives/chip"

import {
  FITMENT_STATUS_LABEL,
  FITMENT_STATUS_TONE,
  type FitmentStatus,
} from "./vehicle-data-types"
import styles from "./fitment-validator.module.css"

export interface FitmentEvaluation {
  /** Resolved vehicle label (e.g. "2021 Hilux N80 SR5"). */
  vehicleLabel: string
  /** Resolved rego or VIN echoed back to the operator. */
  resolvedIdentifier: string
  /** Overall fitment status. */
  status: FitmentStatus
  /** Part the system is validating against. */
  partLabel: string
  /** Per-criteria checks (bolt pattern, ride height, sensor protocol, etc). */
  checks: ReadonlyArray<{ label: string; passed: boolean; note?: string }>
}

interface FitmentValidatorProps {
  /** Lookup function. Returning `null` keeps the empty state. */
  resolve?: (input: string) => FitmentEvaluation | null
  /** Default identifier to render in the entry field. */
  defaultIdentifier?: string
  /** Pre-resolved evaluation to render. */
  initialResult?: FitmentEvaluation
  className?: string
}

const PLACEHOLDER = "Enter rego or 17-character VIN"

function statusGlyph(status: FitmentStatus) {
  if (status === "match") {
    return <ShieldCheck size={20} strokeWidth={2.2} aria-hidden="true" />
  }
  if (status === "mismatch") {
    return <ShieldAlert size={20} strokeWidth={2.2} aria-hidden="true" />
  }
  return <Search size={20} strokeWidth={2.2} aria-hidden="true" />
}

export function FitmentValidator({
  resolve,
  defaultIdentifier = "",
  initialResult,
  className,
}: FitmentValidatorProps) {
  const inputId = useId()
  const [draft, setDraft] = useState(defaultIdentifier)
  const [result, setResult] = useState<FitmentEvaluation | null>(initialResult ?? null)

  const classes = useMemo(
    () => [styles.card, className].filter(Boolean).join(" "),
    [className],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value.toUpperCase().slice(0, 17))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = draft.trim()
    if (resolve) {
      setResult(resolve(trimmed))
      return
    }
    setResult(initialResult ?? null)
  }

  return (
    <section className={classes} aria-label="Fitment validator">
      <header className={styles.head}>
        <span className={styles.kicker}>Fitment validator</span>
        <h2 className={styles.title}>Does this part fit?</h2>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor={inputId}>
          Rego or VIN
        </label>
        <div className={styles.field}>
          <Search size={16} strokeWidth={2.2} aria-hidden="true" className={styles.fieldIcon} />
          <input
            id={inputId}
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            maxLength={17}
            value={draft}
            onChange={handleChange}
            placeholder={PLACEHOLDER}
            className={styles.input}
          />
          <button type="submit" className={styles.submit}>
            Validate
          </button>
        </div>
      </form>

      {result ? (
        <div
          className={[styles.result, styles[`status-${result.status}`]].join(" ")}
          aria-live="polite"
        >
          <div className={styles.summary}>
            <span className={styles.statusGlyph} aria-hidden="true">
              {statusGlyph(result.status)}
            </span>
            <div className={styles.summaryCopy}>
              <span className={styles.summaryKicker}>{result.partLabel}</span>
              <h3 className={styles.summaryTitle}>{result.vehicleLabel}</h3>
              <span className={styles.summaryMeta}>
                Looked up <strong>{result.resolvedIdentifier}</strong>
              </span>
            </div>
            <Chip
              label={FITMENT_STATUS_LABEL[result.status]}
              tone={FITMENT_STATUS_TONE[result.status]}
            />
          </div>
          <ul className={styles.checks}>
            {result.checks.map((check) => (
              <li
                key={check.label}
                className={[styles.check, check.passed ? styles.checkPass : styles.checkFail].join(" ")}
              >
                <span className={styles.checkDot} aria-hidden="true" />
                <div className={styles.checkBody}>
                  <strong>{check.label}</strong>
                  {check.note ? <span>{check.note}</span> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.empty}>
          Enter the customer&apos;s rego or VIN — the validator pulls the build
          spec and checks every fitment criterion against the part on the bench.
        </p>
      )}
    </section>
  )
}

export default FitmentValidator
