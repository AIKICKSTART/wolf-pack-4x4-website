"use client"

import { useId, useMemo, useState } from "react"

import styles from "./tax-info-edit.module.css"

export interface TaxInfoFormState {
  country: string
  businessName: string
  taxIdLabel: "ABN" | "TFN" | "VAT" | "NZBN" | "EIN"
  taxIdValue: string
  isValid: boolean
  reverseCharge: boolean
}

interface TaxInfoEditProps {
  initial?: Partial<TaxInfoFormState>
  onSave?: (form: TaxInfoFormState) => void
}

interface CountryEntry {
  code: string
  name: string
  taxIdLabel: TaxInfoFormState["taxIdLabel"]
  validator: (v: string) => boolean
  reverseChargeCapable: boolean
}

const COUNTRIES: ReadonlyArray<CountryEntry> = [
  {
    code: "AU",
    name: "Australia",
    taxIdLabel: "ABN",
    validator: (v) => v.replace(/\s/g, "").length === 11,
    reverseChargeCapable: false,
  },
  {
    code: "NZ",
    name: "New Zealand",
    taxIdLabel: "NZBN",
    validator: (v) => v.replace(/\s/g, "").length === 13,
    reverseChargeCapable: false,
  },
  {
    code: "GB",
    name: "United Kingdom",
    taxIdLabel: "VAT",
    validator: (v) => /^GB\d{9}$/.test(v.replace(/\s/g, "")),
    reverseChargeCapable: true,
  },
  {
    code: "US",
    name: "United States",
    taxIdLabel: "EIN",
    validator: (v) => v.replace(/\D/g, "").length === 9,
    reverseChargeCapable: false,
  },
]

export function TaxInfoEdit({ initial, onSave }: TaxInfoEditProps) {
  const countryId = useId()
  const businessId = useId()
  const taxIdInputId = useId()

  const [countryCode, setCountryCode] = useState(initial?.country ?? "AU")
  const [businessName, setBusinessName] = useState(initial?.businessName ?? "Oak Flats Mufflermen Pty Ltd")
  const [taxId, setTaxId] = useState(initial?.taxIdValue ?? "")
  const [reverseCharge, setReverseCharge] = useState(initial?.reverseCharge ?? false)

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0],
    [countryCode],
  )

  const isValid = country.validator(taxId)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave?.({
      country: countryCode,
      businessName,
      taxIdLabel: country.taxIdLabel,
      taxIdValue: taxId,
      isValid,
      reverseCharge,
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="Tax information">
      <header className={styles.head}>
        <span className={styles.kicker}>Tax information</span>
        <h3 className={styles.title}>Business details for invoicing</h3>
      </header>

      <div className={styles.grid}>
        <label className={styles.field} htmlFor={countryId}>
          <span className={styles.fieldLabel}>Country</span>
          <select
            id={countryId}
            className={styles.input}
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className={styles.fieldWide} htmlFor={businessId}>
          <span className={styles.fieldLabel}>Business / trading name</span>
          <input
            id={businessId}
            className={styles.input}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </label>

        <label className={styles.fieldWide} htmlFor={taxIdInputId}>
          <span className={styles.fieldLabel}>
            {country.taxIdLabel}
            <span className={isValid ? styles.validChip : styles.invalidChip} aria-live="polite">
              {taxId.length === 0 ? "Required" : isValid ? "Validated" : "Invalid format"}
            </span>
          </span>
          <input
            id={taxIdInputId}
            className={styles.input}
            placeholder={
              country.taxIdLabel === "ABN"
                ? "12 345 678 901"
                : country.taxIdLabel === "EIN"
                  ? "9-digit Employer Identification Number"
                  : ""
            }
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            aria-invalid={!isValid && taxId.length > 0}
          />
        </label>
      </div>

      {country.reverseChargeCapable ? (
        <label className={styles.toggleRow}>
          <input
            type="checkbox"
            checked={reverseCharge}
            onChange={(e) => setReverseCharge(e.target.checked)}
          />
          <span className={styles.toggleText}>
            <span className={styles.chip}>VAT reverse charge</span>
            <span>Apply reverse-charge VAT for cross-border B2B sales.</span>
          </span>
        </label>
      ) : (
        <p className={styles.taxNote}>
          GST {countryCode === "AU" ? "10%" : "applicable"} will be added to taxable invoices.
        </p>
      )}

      <footer className={styles.footer}>
        <button type="submit" className={styles.saveBtn} disabled={!isValid}>
          Save tax info
        </button>
      </footer>
    </form>
  )
}

export default TaxInfoEdit
