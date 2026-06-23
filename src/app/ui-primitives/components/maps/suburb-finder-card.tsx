"use client"

import { useId, useMemo, useState } from "react"

import styles from "./suburb-finder-card.module.css"

export interface SuburbEntry {
  name: string
  postcode: string
  /** km from workshop centre. */
  distance: number
}

export interface SuburbFinderCardProps {
  suburbs: ReadonlyArray<SuburbEntry>
  onLocate?: () => void
}

export function SuburbFinderCard({ suburbs, onLocate }: SuburbFinderCardProps) {
  const id = useId()
  const [query, setQuery] = useState("")

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return suburbs.slice(0, 5)
    }
    return suburbs
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) || s.postcode.startsWith(q)
      )
      .slice(0, 5)
  }, [query, suburbs])

  return (
    <section className={styles.root} aria-label="Suburb finder">
      <header className={styles.head}>
        <span className={styles.kicker}>Coverage check</span>
        <h3 className={styles.title}>Find your suburb</h3>
        <p className={styles.desc}>
          Search by suburb name or NSW postcode, or share your location for the
          fastest result.
        </p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchField}>
          <label htmlFor={`${id}-q`} className={styles.label}>
            Suburb or postcode
          </label>
          <input
            id={`${id}-q`}
            type="search"
            inputMode="search"
            autoComplete="postal-code"
            placeholder="Albion Park · 2527"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={styles.input}
          />
        </div>
        <button type="button" className={styles.locateBtn} onClick={onLocate}>
          <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.locateIcon}>
            <circle cx="8" cy="8" r="3" fill="currentColor" />
            <circle
              cx="8"
              cy="8"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="2 2"
            />
            <path
              d="M8 1 v3 M8 12 v3 M1 8 h3 M12 8 h3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          Locate me
        </button>
      </div>

      <ol className={styles.results} aria-label="Matching suburbs">
        {matches.length === 0 ? (
          <li className={styles.empty}>No suburbs match — try a wider search.</li>
        ) : (
          matches.map((s) => (
            <li key={`${s.name}-${s.postcode}`} className={styles.result}>
              <span className={styles.resultName}>
                {s.name} <small>{s.postcode}</small>
              </span>
              <span className={styles.resultDistance}>
                {s.distance.toFixed(1)} km
              </span>
            </li>
          ))
        )}
      </ol>
    </section>
  )
}

export default SuburbFinderCard
