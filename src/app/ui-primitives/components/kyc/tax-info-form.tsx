"use client"

import { useId, useMemo, useState, type ChangeEvent } from "react"

import type { ResidencyCountry } from "./kyc-types"
import styles from "./tax-info-form.module.css"

interface CountryOption {
  code: ResidencyCountry
  label: string
}

const COUNTRY_OPTIONS: ReadonlyArray<CountryOption> = [
  { code: "AU", label: "Australia" },
  { code: "NZ", label: "New Zealand" },
  { code: "US", label: "United States" },
  { code: "UK", label: "United Kingdom" },
  { code: "OTHER", label: "Other" },
]

interface CountrySchema {
  primary: {
    label: string
    placeholder: string
    pattern: string
  }
  secondary?: {
    label: string
    placeholder: string
  }
  formLabel: string
  formLink: string
  agency: string
}

const SCHEMAS: Record<ResidencyCountry, CountrySchema> = {
  AU: {
    primary: {
      label: "Tax File Number (TFN)",
      placeholder: "•••-•••-•••",
      pattern: "[0-9]{9}",
    },
    secondary: {
      label: "ABN (if registered)",
      placeholder: "•• ••• ••• •••",
    },
    formLabel: "TFN declaration",
    formLink: "/forms/tfn-declaration.pdf",
    agency: "Australian Taxation Office (ATO)",
  },
  NZ: {
    primary: {
      label: "IRD number",
      placeholder: "•••-•••-•••",
      pattern: "[0-9]{8,9}",
    },
    formLabel: "IR330 form",
    formLink: "/forms/ir330.pdf",
    agency: "Inland Revenue (IRD)",
  },
  US: {
    primary: {
      label: "SSN or ITIN",
      placeholder: "•••-••-••••",
      pattern: "[0-9]{9}",
    },
    formLabel: "W-9 form",
    formLink: "/forms/w-9.pdf",
    agency: "Internal Revenue Service (IRS)",
  },
  UK: {
    primary: {
      label: "UTR (Unique Taxpayer Reference)",
      placeholder: "••••• •••••",
      pattern: "[0-9]{10}",
    },
    formLabel: "Self assessment guide",
    formLink: "/forms/sa100.pdf",
    agency: "HM Revenue & Customs (HMRC)",
  },
  OTHER: {
    primary: {
      label: "Foreign tax identification number (TIN)",
      placeholder: "Enter your local TIN",
      pattern: ".{4,}",
    },
    formLabel: "W-8BEN form",
    formLink: "/forms/w-8ben.pdf",
    agency: "Foreign tax authority",
  },
}

export interface TaxInfoFormProps {
  /** Eyebrow label. */
  kicker: string
  /** Headline above the form. */
  title: string
  /** Default country selection. */
  defaultCountry?: ResidencyCountry
  /** Fired when the country selection changes. */
  onCountryChange?: (country: ResidencyCountry) => void
  className?: string
}

export function TaxInfoForm({
  kicker,
  title,
  defaultCountry = "AU",
  onCountryChange,
  className,
}: TaxInfoFormProps) {
  const formId = useId()
  const [country, setCountry] = useState<ResidencyCountry>(defaultCountry)
  const schema = useMemo(() => SCHEMAS[country], [country])

  const handleCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as ResidencyCountry
    setCountry(next)
    onCountryChange?.(next)
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-labelledby={`${formId}-title`}>
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 id={`${formId}-title`} className={styles.title}>
          {title}
        </h3>
      </header>

      <form className={styles.form} noValidate>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Tax residency</legend>
          <label className={styles.field} htmlFor={`${formId}-country`}>
            <span className={styles.label}>Country</span>
            <select
              id={`${formId}-country`}
              className={styles.select}
              value={country}
              onChange={handleCountry}
            >
              {COUNTRY_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <p className={styles.agency}>
            Reported to{" "}
            <span className={styles.agencyName}>{schema.agency}</span>.
          </p>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Tax identifiers</legend>
          <label className={styles.field} htmlFor={`${formId}-primary`}>
            <span className={styles.label}>{schema.primary.label}</span>
            <input
              id={`${formId}-primary`}
              type="text"
              inputMode="numeric"
              className={styles.input}
              placeholder={schema.primary.placeholder}
              pattern={schema.primary.pattern}
            />
          </label>

          {schema.secondary ? (
            <label className={styles.field} htmlFor={`${formId}-secondary`}>
              <span className={styles.label}>{schema.secondary.label}</span>
              <input
                id={`${formId}-secondary`}
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder={schema.secondary.placeholder}
              />
            </label>
          ) : null}
        </fieldset>

        <a className={styles.downloadCta} href={schema.formLink}>
          <span aria-hidden="true">⬇</span>
          Download {schema.formLabel}
        </a>
      </form>
    </section>
  )
}

export default TaxInfoForm
