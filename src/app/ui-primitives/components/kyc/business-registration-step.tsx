"use client"

import { useId, useState, type ChangeEvent } from "react"

import {
  BUSINESS_STRUCTURE_LABEL,
  type BusinessStructure,
} from "./kyc-types"
import styles from "./business-registration-step.module.css"

interface AbnLookupResult {
  abn: string
  entityName: string
  status: "active" | "cancelled"
  gstStatus: "registered" | "not-registered"
  state: string
}

export interface BusinessRegistrationStepProps {
  /** Eyebrow label. */
  kicker: string
  /** Headline above the form. */
  title: string
  /** Default ABN value rendered in the lookup input. */
  defaultAbn?: string
  /** Default trading-since date (YYYY-MM-DD). */
  defaultTradingSince?: string
  /** Default selected structure. */
  defaultStructure?: BusinessStructure
  /** Auto-filled ABN lookup result; demo-mode visual only. */
  lookupResult?: AbnLookupResult
  className?: string
}

const STRUCTURE_ORDER: ReadonlyArray<BusinessStructure> = [
  "sole-trader",
  "pty-ltd",
  "partnership",
  "trust",
]

export function BusinessRegistrationStep({
  kicker,
  title,
  defaultAbn = "",
  defaultTradingSince = "",
  defaultStructure = "pty-ltd",
  lookupResult,
  className,
}: BusinessRegistrationStepProps) {
  const formId = useId()
  const [abn, setAbn] = useState<string>(defaultAbn)
  const [structure, setStructure] =
    useState<BusinessStructure>(defaultStructure)

  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleAbnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAbn(event.target.value)
  }

  return (
    <section className={classes} aria-labelledby={`${formId}-title`}>
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 id={`${formId}-title`} className={styles.title}>
          {title}
        </h3>
      </header>

      <form className={styles.form} noValidate>
        <label className={styles.field} htmlFor={`${formId}-business-name`}>
          <span className={styles.label}>Business name</span>
          <input
            id={`${formId}-business-name`}
            type="text"
            className={styles.input}
            placeholder="Oak Flats Mufflermen Pty Ltd"
            autoComplete="organization"
          />
        </label>

        <div className={styles.lookupBlock}>
          <label className={styles.field} htmlFor={`${formId}-abn`}>
            <span className={styles.label}>ABN lookup</span>
            <div className={styles.lookupRow}>
              <input
                id={`${formId}-abn`}
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder="11 222 333 444"
                value={abn}
                onChange={handleAbnChange}
                aria-describedby={
                  lookupResult ? `${formId}-abn-result` : undefined
                }
              />
              <button type="button" className={styles.lookupCta}>
                Lookup
              </button>
            </div>
          </label>
          {lookupResult ? (
            <div
              id={`${formId}-abn-result`}
              className={styles.lookupResult}
              role="status"
            >
              <span className={styles.lookupBadge} data-status={lookupResult.status}>
                {lookupResult.status === "active" ? "Active" : "Cancelled"}
              </span>
              <div className={styles.lookupDetail}>
                <span className={styles.lookupEntity}>
                  {lookupResult.entityName}
                </span>
                <span className={styles.lookupMeta}>
                  {lookupResult.abn} · {lookupResult.state} · GST{" "}
                  {lookupResult.gstStatus === "registered"
                    ? "registered"
                    : "not registered"}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <fieldset className={styles.structureBlock}>
          <legend className={styles.label}>Business structure</legend>
          <div className={styles.structureRow} role="radiogroup">
            {STRUCTURE_ORDER.map((option) => {
              const checked = option === structure
              const id = `${formId}-structure-${option}`
              return (
                <label
                  key={option}
                  htmlFor={id}
                  className={styles.structureChip}
                  data-checked={checked}
                >
                  <input
                    id={id}
                    type="radio"
                    name={`${formId}-structure`}
                    value={option}
                    checked={checked}
                    onChange={() => setStructure(option)}
                    className={styles.radio}
                  />
                  <span>{BUSINESS_STRUCTURE_LABEL[option]}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <label className={styles.field} htmlFor={`${formId}-trading-since`}>
          <span className={styles.label}>Trading since</span>
          <input
            id={`${formId}-trading-since`}
            type="date"
            className={styles.input}
            defaultValue={defaultTradingSince}
          />
        </label>
      </form>
    </section>
  )
}

export default BusinessRegistrationStep
