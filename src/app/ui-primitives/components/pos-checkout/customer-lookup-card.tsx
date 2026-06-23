"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"

import type { LoyaltyTier, PosCustomer } from "./pos-checkout-types"
import styles from "./customer-lookup-card.module.css"

type LookupMode = "phone" | "email" | "rego"

interface CustomerLookupCardProps {
  /** Initial search mode. */
  initialMode?: LookupMode
  /** Initial query value. */
  initialQuery?: string
  /** Matched customer to display. */
  match?: PosCustomer | null
  /** Fires when the operator submits a search. */
  onSearch?: (mode: LookupMode, query: string) => void
  /** Fires when the operator attaches the customer to the sale. */
  onAttach?: (customer: PosCustomer) => void
}

const MODE_LABEL: Record<LookupMode, string> = {
  phone: "Phone",
  email: "Email",
  rego: "Rego",
}

const MODE_PLACEHOLDER: Record<LookupMode, string> = {
  phone: "0432 000 000",
  email: "name@example.com",
  rego: "BVA42K",
}

const TIER_LABEL: Record<LoyaltyTier, string> = {
  casual: "Casual",
  trade: "Trade",
  fleet: "Fleet",
  vip: "VIP · Workshop crew",
}

const TIER_TONE: Record<LoyaltyTier, ChipTone> = {
  casual: "neutral",
  trade: "teal",
  fleet: "amber",
  vip: "green",
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function CustomerLookupCard({
  initialMode = "phone",
  initialQuery = "",
  match,
  onSearch,
  onAttach,
}: CustomerLookupCardProps) {
  const [mode, setMode] = useState<LookupMode>(initialMode)
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    onSearch?.(mode, trimmed)
  }

  const handleModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMode(event.target.value as LookupMode)
  }

  return (
    <section className={styles.card} aria-label="Customer lookup">
      <header className={styles.head}>
        <span className={styles.kicker}>Customer · POS lookup</span>
        <h2 className={styles.title}>Attach a customer</h2>
      </header>

      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.searchRow}>
          <label htmlFor="pos-lookup-mode" hidden>
            Search mode
          </label>
          <select
            id="pos-lookup-mode"
            className={styles.modeSelect}
            value={mode}
            onChange={handleModeChange}
          >
            {(Object.keys(MODE_LABEL) as ReadonlyArray<LookupMode>).map((key) => (
              <option key={key} value={key}>
                {MODE_LABEL[key]}
              </option>
            ))}
          </select>
          <label htmlFor="pos-lookup-query" hidden>
            Search query
          </label>
          <input
            id="pos-lookup-query"
            className={styles.input}
            type="text"
            autoComplete="off"
            placeholder={MODE_PLACEHOLDER[mode]}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={`Search by ${MODE_LABEL[mode]}`}
          />
          <button type="submit" className={styles.cta} disabled={query.trim().length === 0}>
            Search
          </button>
        </div>
      </form>

      {match ? (
        <article className={styles.match}>
          <header className={styles.matchHead}>
            <Avatar name={match.name} tone="amber" size="md" />
            <div>
              <h3 className={styles.matchName}>{match.name}</h3>
              <span className={styles.matchMeta}>
                {match.phone} · {match.email}
                {match.rego ? ` · Rego ${match.rego}` : ""}
              </span>
            </div>
            <Chip label={TIER_LABEL[match.tier]} tone={TIER_TONE[match.tier]} />
          </header>
          <div className={styles.matchRow}>
            <span>
              ID <strong>{match.id}</strong>
            </span>
            <span>
              Phone <strong>{match.phone}</strong>
            </span>
          </div>
          <div className={styles.matchStats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Lifetime spend</span>
              <span className={styles.statValue}>{formatAud(match.lifetimeSpend)}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Visits</span>
              <span className={styles.statValue}>{match.visitCount}</span>
            </div>
          </div>
          <button
            type="button"
            className={styles.attachCta}
            onClick={() => onAttach?.(match)}
          >
            Attach to sale
          </button>
        </article>
      ) : (
        <p className={styles.empty}>No customer attached — search by phone, email or rego</p>
      )}
    </section>
  )
}

export default CustomerLookupCard
