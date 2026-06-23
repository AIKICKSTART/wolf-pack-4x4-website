"use client"

import { useId, useMemo, useState, type FormEvent } from "react"

import styles from "./address-form.module.css"

export type AddressCountry = "AU" | "NZ" | "GB" | "US"

export interface AddressFormValues {
  country: AddressCountry
  street: string
  suburb: string
  state: string
  postcode: string
  deliverDifferent: boolean
  deliveryStreet: string
  deliverySuburb: string
  deliveryPostcode: string
}

interface AddressFormProps {
  onSubmit?: (data: FormData) => void
  defaultValues?: Partial<AddressFormValues>
}

interface CountryOption {
  code: AddressCountry
  flag: string
  label: string
}

const COUNTRIES: ReadonlyArray<CountryOption> = [
  { code: "AU", flag: "AU", label: "Australia" },
  { code: "NZ", flag: "NZ", label: "New Zealand" },
  { code: "GB", flag: "GB", label: "United Kingdom" },
  { code: "US", flag: "US", label: "United States" },
]

const STATES: Record<AddressCountry, ReadonlyArray<string>> = {
  AU: ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"],
  NZ: ["Auckland", "Wellington", "Canterbury", "Otago"],
  GB: ["England", "Scotland", "Wales", "Northern Ireland"],
  US: ["NY", "CA", "TX", "FL", "WA"],
}

const STREET_SUGGESTIONS: ReadonlyArray<{ value: string; tag: string }> = [
  { value: "12 Industrial Drive, Oak Flats", tag: "Workshop" },
  { value: "47 Princes Highway, Oak Flats", tag: "Retail" },
  { value: "3 Central Avenue, Albion Park", tag: "Suburb" },
  { value: "88 Beach Road, Shellharbour", tag: "Coast" },
]

const SUBURB_OPTIONS: ReadonlyArray<string> = [
  "Oak Flats",
  "Albion Park",
  "Shellharbour",
  "Warilla",
  "Dapto",
]

export function AddressForm({ onSubmit, defaultValues }: AddressFormProps) {
  const countryId = useId()
  const streetId = useId()
  const stateId = useId()
  const postcodeId = useId()
  const dStreetId = useId()
  const dSuburbId = useId()
  const dPostcodeId = useId()
  const deliverId = useId()
  const suburbLabelId = useId()

  const [country, setCountry] = useState<AddressCountry>(
    defaultValues?.country ?? "AU",
  )
  const [street, setStreet] = useState<string>(defaultValues?.street ?? "")
  const [suburb, setSuburb] = useState<string>(defaultValues?.suburb ?? "Oak Flats")
  const [deliverDifferent, setDeliverDifferent] = useState<boolean>(
    defaultValues?.deliverDifferent ?? false,
  )

  const filteredStreets = useMemo(() => {
    if (street.trim().length === 0) return []
    return STREET_SUGGESTIONS.filter((option) =>
      option.value.toLowerCase().includes(street.toLowerCase()),
    ).slice(0, 4)
  }, [street])

  const currentCountry = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0]
  const statesForCountry = STATES[country]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmit?.(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.head}>
        <span className={styles.eyebrow}>09 / Address</span>
        <h2 className={styles.title}>Where do we send it?</h2>
        <p className={styles.lede}>
          Country first, then a street autocomplete and a postcode mask. Optional separate delivery.
        </p>
      </header>

      <div className={styles.field}>
        <label htmlFor={countryId} className={styles.label}>
          Country
        </label>
        <div className={styles.countryRow}>
          <span className={styles.countryFlag} aria-hidden="true">
            {currentCountry.flag}
          </span>
          <select
            id={countryId}
            name="country"
            value={country}
            onChange={(event) => setCountry(event.target.value as AddressCountry)}
            className={styles.countrySelect}
          >
            {COUNTRIES.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={`${styles.layout} ${deliverDifferent ? styles.layoutDual : ""}`}>
        <div className={styles.column}>
          <div className={styles.columnHead}>
            <h3 className={styles.columnTitle}>Billing</h3>
            <span className={styles.columnTag}>Required</span>
          </div>

          <div className={styles.field}>
            <label htmlFor={streetId} className={styles.label}>
              Street
            </label>
            <div className={styles.autocomplete}>
              <input
                id={streetId}
                name="street"
                type="text"
                required
                placeholder="Start typing your address…"
                value={street}
                onChange={(event) => setStreet(event.target.value)}
                autoComplete="street-address"
                className={styles.input}
              />
              {filteredStreets.length > 0 ? (
                <div className={styles.autoMenu} role="listbox">
                  {filteredStreets.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={street === option.value}
                      className={styles.autoOption}
                      onClick={() => setStreet(option.value)}
                    >
                      <span>{option.value}</span>
                      <span className={styles.autoOptionTag}>{option.tag}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles.field}>
            <span id={suburbLabelId} className={styles.label}>
              Suburb
            </span>
            <span
              className={styles.suburbChip}
              role="button"
              tabIndex={0}
              aria-labelledby={suburbLabelId}
              onClick={() => {
                const idx = SUBURB_OPTIONS.indexOf(suburb)
                const next = SUBURB_OPTIONS[(idx + 1) % SUBURB_OPTIONS.length]
                setSuburb(next)
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  const idx = SUBURB_OPTIONS.indexOf(suburb)
                  const next = SUBURB_OPTIONS[(idx + 1) % SUBURB_OPTIONS.length]
                  setSuburb(next)
                }
              }}
            >
              {suburb}
              <span className={styles.suburbChipRemove} aria-hidden="true">
                ↻
              </span>
            </span>
            <input type="hidden" name="suburb" value={suburb} />
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label htmlFor={stateId} className={styles.label}>
                State
              </label>
              <select
                id={stateId}
                name="state"
                defaultValue={defaultValues?.state ?? statesForCountry[0]}
                className={styles.select}
              >
                {statesForCountry.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor={postcodeId} className={styles.label}>
                Postcode
              </label>
              <input
                id={postcodeId}
                name="postcode"
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                placeholder="0 0 0 0"
                defaultValue={defaultValues?.postcode ?? "2529"}
                className={`${styles.input} ${styles.postcodeInput}`}
              />
            </div>
          </div>
        </div>

        {deliverDifferent ? (
          <div className={styles.column}>
            <div className={styles.columnHead}>
              <h3 className={styles.columnTitle}>Deliver to</h3>
              <span className={styles.columnTag}>Override</span>
            </div>

            <div className={styles.field}>
              <label htmlFor={dStreetId} className={styles.label}>
                Delivery street
              </label>
              <input
                id={dStreetId}
                name="deliveryStreet"
                type="text"
                placeholder="Workshop address or PO box"
                defaultValue={defaultValues?.deliveryStreet}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor={dSuburbId} className={styles.label}>
                Delivery suburb
              </label>
              <input
                id={dSuburbId}
                name="deliverySuburb"
                type="text"
                placeholder="Suburb"
                defaultValue={defaultValues?.deliverySuburb}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor={dPostcodeId} className={styles.label}>
                Delivery postcode
              </label>
              <input
                id={dPostcodeId}
                name="deliveryPostcode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                placeholder="0 0 0 0"
                defaultValue={defaultValues?.deliveryPostcode}
                className={`${styles.input} ${styles.postcodeInput}`}
              />
            </div>
          </div>
        ) : null}
      </div>

      <label htmlFor={deliverId} className={styles.deliver}>
        <span className={styles.deliverIcon} aria-hidden="true">
          ⇆
        </span>
        <span className={styles.deliverBody}>
          <span>Deliver to a different address</span>
          <span className={styles.deliverHelp}>
            Useful for workshop deliveries that differ from the billing address.
          </span>
        </span>
        <span className={styles.toggle}>
          <input
            id={deliverId}
            name="deliverDifferent"
            type="checkbox"
            checked={deliverDifferent}
            onChange={(event) => setDeliverDifferent(event.target.checked)}
          />
          <span className={styles.toggleTrack} aria-hidden="true" />
        </span>
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.primaryBtn}>
          Save address
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}
