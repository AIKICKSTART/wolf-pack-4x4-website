"use client"

import { MapPin, Search } from "lucide-react"
import { useMemo, useState, type ChangeEvent } from "react"

import type { AustralianAddress, AustralianState } from "./storefront-types"
import styles from "./address-form-card.module.css"

const STATES: ReadonlyArray<AustralianState> = [
  "NSW",
  "VIC",
  "QLD",
  "WA",
  "SA",
  "TAS",
  "ACT",
  "NT",
]

const STATE_LABEL: Record<AustralianState, string> = {
  NSW: "New South Wales",
  VIC: "Victoria",
  QLD: "Queensland",
  WA: "Western Australia",
  SA: "South Australia",
  TAS: "Tasmania",
  ACT: "Aust. Capital Territory",
  NT: "Northern Territory",
}

export interface AddressSuggestion {
  id: string
  label: string
  meta?: string
  patch: Partial<AustralianAddress>
}

interface AddressFormCardProps {
  value: AustralianAddress
  onChange: (next: AustralianAddress) => void
  onSubmit?: (value: AustralianAddress) => void
  suggestions?: ReadonlyArray<AddressSuggestion>
  errors?: Partial<Record<keyof AustralianAddress, string>>
  title?: string
  kicker?: string
  submitLabel?: string
}

export function AddressFormCard({
  value,
  onChange,
  onSubmit,
  suggestions,
  errors,
  title = "Shipping address",
  kicker = "Step 2 · Shipping",
  submitLabel = "Continue to payment",
}: AddressFormCardProps) {
  const [showSuggest, setShowSuggest] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")

  const filtered = useMemo(() => {
    if (!suggestions) {
      return []
    }
    const q = query.trim().toLowerCase()
    if (q.length === 0) {
      return suggestions.slice(0, 4)
    }
    return suggestions
      .filter((entry) => entry.label.toLowerCase().includes(q))
      .slice(0, 6)
  }, [suggestions, query])

  const patch = (next: Partial<AustralianAddress>) => {
    onChange({ ...value, ...next })
  }

  const handleField = (key: keyof AustralianAddress) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      patch({ [key]: event.target.value } as Partial<AustralianAddress>)
    }

  const handlePickSuggestion = (suggestion: AddressSuggestion) => {
    setShowSuggest(false)
    setQuery(suggestion.label)
    patch(suggestion.patch)
  }

  const errorOf = (key: keyof AustralianAddress): string | undefined => errors?.[key]

  return (
    <form
      className={styles.card}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.(value)
      }}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.title}>{title}</h2>
      </header>

      <div className={styles.autocomplete}>
        <label className={styles.fieldLabel} htmlFor="addr-autocomplete">
          Address lookup
        </label>
        <div
          className={styles.lookupRow}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={showSuggest}
          aria-controls="addr-suggest-list"
        >
          <Search size={14} aria-hidden="true" className={styles.lookupIcon} />
          <input
            id="addr-autocomplete"
            type="text"
            className={styles.lookupInput}
            placeholder="Start typing — e.g. 24 Industrial Rd, Albion Park"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setShowSuggest(true)
            }}
            onFocus={() => setShowSuggest(true)}
            onBlur={() => window.setTimeout(() => setShowSuggest(false), 120)}
            aria-autocomplete="list"
            aria-controls="addr-suggest-list"
          />
        </div>
        {showSuggest && filtered.length > 0 && (
          <ul id="addr-suggest-list" className={styles.suggestList} role="listbox">
            {filtered.map((suggestion) => (
              <li key={suggestion.id} role="option" aria-selected="false">
                <button
                  type="button"
                  className={styles.suggestBtn}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handlePickSuggestion(suggestion)}
                >
                  <MapPin size={12} aria-hidden="true" />
                  <span className={styles.suggestLabel}>{suggestion.label}</span>
                  {suggestion.meta && (
                    <span className={styles.suggestMeta}>{suggestion.meta}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="addr-name">
            Full name
          </label>
          <input
            id="addr-name"
            type="text"
            className={styles.input}
            value={value.fullName}
            onChange={handleField("fullName")}
            required
            autoComplete="name"
            aria-invalid={Boolean(errorOf("fullName"))}
          />
          {errorOf("fullName") && (
            <span className={styles.error}>{errorOf("fullName")}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="addr-company">
            Company (optional)
          </label>
          <input
            id="addr-company"
            type="text"
            className={styles.input}
            value={value.company ?? ""}
            onChange={handleField("company")}
            autoComplete="organization"
          />
        </div>

        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.fieldLabel} htmlFor="addr-line1">
            Street address
          </label>
          <input
            id="addr-line1"
            type="text"
            className={styles.input}
            value={value.line1}
            onChange={handleField("line1")}
            required
            autoComplete="address-line1"
            aria-invalid={Boolean(errorOf("line1"))}
          />
          {errorOf("line1") && <span className={styles.error}>{errorOf("line1")}</span>}
        </div>

        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.fieldLabel} htmlFor="addr-line2">
            Apartment, unit, bay (optional)
          </label>
          <input
            id="addr-line2"
            type="text"
            className={styles.input}
            value={value.line2 ?? ""}
            onChange={handleField("line2")}
            autoComplete="address-line2"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="addr-suburb">
            Suburb
          </label>
          <input
            id="addr-suburb"
            type="text"
            className={styles.input}
            value={value.suburb}
            onChange={handleField("suburb")}
            required
            autoComplete="address-level2"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="addr-state">
            State / Territory
          </label>
          <select
            id="addr-state"
            className={styles.select}
            value={value.state}
            onChange={handleField("state")}
            required
            autoComplete="address-level1"
          >
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state} — {STATE_LABEL[state]}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="addr-postcode">
            Postcode
          </label>
          <input
            id="addr-postcode"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            className={styles.input}
            value={value.postcode}
            onChange={handleField("postcode")}
            required
            autoComplete="postal-code"
            aria-invalid={Boolean(errorOf("postcode"))}
          />
          {errorOf("postcode") && (
            <span className={styles.error}>{errorOf("postcode")}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="addr-phone">
            Phone
          </label>
          <input
            id="addr-phone"
            type="tel"
            className={styles.input}
            value={value.phone ?? ""}
            onChange={handleField("phone")}
            placeholder="0432 188 207"
            autoComplete="tel"
          />
        </div>

        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.fieldLabel} htmlFor="addr-instructions">
            Delivery instructions (optional)
          </label>
          <textarea
            id="addr-instructions"
            className={styles.textarea}
            rows={2}
            value={value.instructions ?? ""}
            onChange={handleField("instructions")}
            placeholder="Authority to leave at side gate, ring on arrival, etc."
          />
        </div>
      </div>

      {onSubmit && (
        <footer className={styles.foot}>
          <button type="submit" className={styles.submit}>
            {submitLabel}
          </button>
        </footer>
      )}
    </form>
  )
}

export default AddressFormCard
