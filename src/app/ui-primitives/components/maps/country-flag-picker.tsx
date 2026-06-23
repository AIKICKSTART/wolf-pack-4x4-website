"use client"

import { useId, useMemo, useState } from "react"

import styles from "./country-flag-picker.module.css"

export interface CountryEntry {
  /** ISO 3166-1 alpha-2 code. */
  code: string
  name: string
}

export interface CountryFlagPickerProps {
  countries?: ReadonlyArray<CountryEntry>
  /** Selected country code; defaults to AU. */
  value?: string
  onChange?: (code: string) => void
}

const TOP_CODES: ReadonlyArray<string> = ["AU", "NZ", "US", "UK", "IE", "CA", "ZA"]

const DEFAULT_COUNTRIES: ReadonlyArray<CountryEntry> = [
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "IE", name: "Ireland" },
  { code: "CA", name: "Canada" },
  { code: "ZA", name: "South Africa" },
  { code: "AR", name: "Argentina" },
  { code: "BR", name: "Brazil" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "MX", name: "Mexico" },
  { code: "NL", name: "Netherlands" },
  { code: "PH", name: "Philippines" },
  { code: "SE", name: "Sweden" },
  { code: "SG", name: "Singapore" },
]

interface CountryFlagProps {
  code: string
}

function CountryFlag({ code }: CountryFlagProps) {
  // Minimalist abstract SVGs — represent the flag identity without exact accuracy
  switch (code) {
    case "AU":
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={styles.flag}>
          <rect width="24" height="16" fill="#012169" />
          <rect width="12" height="8" fill="#012169" />
          <path d="M0 0 L12 8 M12 0 L0 8" stroke="#fff" strokeWidth="1.2" />
          <path d="M6 0 V8 M0 4 H12" stroke="#fff" strokeWidth="2" />
          <path d="M6 0 V8 M0 4 H12" stroke="#c8102e" strokeWidth="1" />
          <circle cx="18" cy="4" r="1" fill="#fff" />
          <circle cx="20" cy="10" r="1" fill="#fff" />
          <circle cx="16" cy="11" r="0.7" fill="#fff" />
        </svg>
      )
    case "NZ":
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={styles.flag}>
          <rect width="24" height="16" fill="#00247d" />
          <rect width="12" height="8" fill="#00247d" />
          <path d="M0 0 L12 8 M12 0 L0 8" stroke="#fff" strokeWidth="1.2" />
          <path d="M6 0 V8 M0 4 H12" stroke="#fff" strokeWidth="2" />
          <path d="M6 0 V8 M0 4 H12" stroke="#cc142b" strokeWidth="1" />
          <circle cx="18" cy="5" r="1.2" fill="#cc142b" />
          <circle cx="21" cy="8" r="1.2" fill="#cc142b" />
          <circle cx="17" cy="11" r="1.2" fill="#cc142b" />
          <circle cx="20" cy="12" r="1.2" fill="#cc142b" />
        </svg>
      )
    case "US":
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={styles.flag}>
          <rect width="24" height="16" fill="#fff" />
          {[0, 2, 4, 6, 8, 10, 12, 14].map((y) => (
            <rect key={y} y={y} width="24" height="1.1" fill="#b22234" />
          ))}
          <rect width="10" height="8" fill="#3c3b6e" />
        </svg>
      )
    case "UK":
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={styles.flag}>
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="2.4" />
          <path d="M0 0 L24 16 M24 0 L0 16" stroke="#c8102e" strokeWidth="1.2" />
          <path d="M12 0 V16 M0 8 H24" stroke="#fff" strokeWidth="3.6" />
          <path d="M12 0 V16 M0 8 H24" stroke="#c8102e" strokeWidth="2" />
        </svg>
      )
    case "IE":
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={styles.flag}>
          <rect width="8" height="16" fill="#169b62" />
          <rect x="8" width="8" height="16" fill="#fff" />
          <rect x="16" width="8" height="16" fill="#ff883e" />
        </svg>
      )
    case "CA":
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={styles.flag}>
          <rect width="6" height="16" fill="#d52b1e" />
          <rect x="18" width="6" height="16" fill="#d52b1e" />
          <rect x="6" width="12" height="16" fill="#fff" />
          <path d="M12 3 L13.3 6.5 L16 7 L13.7 9 L14.2 12 L12 10 L9.8 12 L10.3 9 L8 7 L10.7 6.5 Z" fill="#d52b1e" />
        </svg>
      )
    case "ZA":
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={styles.flag}>
          <rect width="24" height="8" fill="#de3831" />
          <rect y="8" width="24" height="8" fill="#002395" />
          <path d="M0 0 L10 8 L0 16 Z" fill="#007a4d" stroke="#fff" strokeWidth="1.4" />
          <path d="M0 0 L10 8 L0 16 Z" fill="#000" />
        </svg>
      )
    default:
      // Generic two-tone flag fallback for additional countries
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={styles.flag}>
          <rect width="24" height="16" fill="var(--primitive-panel-strong)" />
          <rect width="24" height="8" fill="var(--primitive-teal)" opacity="0.7" />
          <text
            x="12"
            y="11"
            textAnchor="middle"
            fill="var(--primitive-text-strong)"
            fontFamily="monospace"
            fontSize="6"
            fontWeight="700"
            letterSpacing="0.1"
          >
            {code}
          </text>
        </svg>
      )
  }
}

function orderCountries(input: ReadonlyArray<CountryEntry>): CountryEntry[] {
  const top: CountryEntry[] = []
  const rest: CountryEntry[] = []
  const seen = new Set<string>()

  for (const code of TOP_CODES) {
    const match = input.find((c) => c.code === code)
    if (match) {
      top.push(match)
      seen.add(code)
    }
  }
  for (const country of input) {
    if (!seen.has(country.code)) {
      rest.push(country)
    }
  }
  rest.sort((a, b) => a.name.localeCompare(b.name))
  return [...top, ...rest]
}

export function CountryFlagPicker({
  countries = DEFAULT_COUNTRIES,
  value = "AU",
  onChange,
}: CountryFlagPickerProps) {
  const id = useId()
  const [query, setQuery] = useState("")
  const ordered = useMemo(() => orderCountries(countries), [countries])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ordered
    return ordered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    )
  }, [query, ordered])

  return (
    <section className={styles.root} aria-label="Country selector">
      <header className={styles.head}>
        <span className={styles.kicker}>Country</span>
        <h3 className={styles.title}>Select region</h3>
      </header>

      <div className={styles.searchWrap}>
        <label htmlFor={`${id}-q`} className={styles.label}>
          Search countries
        </label>
        <input
          id={`${id}-q`}
          type="search"
          inputMode="search"
          placeholder="Australia"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={styles.input}
        />
      </div>

      <ol className={styles.list} role="listbox" aria-label="Country options">
        {filtered.map((country) => {
          const isSelected = country.code === value
          return (
            <li key={country.code}>
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`${styles.option} ${isSelected ? styles.optionActive : ""}`}
                onClick={() => onChange?.(country.code)}
              >
                <CountryFlag code={country.code} />
                <span className={styles.optionName}>{country.name}</span>
                <span className={styles.optionCode}>{country.code}</span>
              </button>
            </li>
          )
        })}
        {filtered.length === 0 ? (
          <li className={styles.empty}>No matches</li>
        ) : null}
      </ol>
    </section>
  )
}

export default CountryFlagPicker
