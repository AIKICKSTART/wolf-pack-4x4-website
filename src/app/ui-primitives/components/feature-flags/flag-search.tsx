"use client"

import { useState, type ChangeEvent } from "react"

import styles from "./flag-search.module.css"

export type FlagSearchStatus = "any" | "on" | "off" | "ramping" | "killed"

export interface FlagSearchOwner {
  id: string
  label: string
}

export interface FlagSearchState {
  query: string
  ownerIds: ReadonlyArray<string>
  status: FlagSearchStatus
  includeArchived: boolean
}

export interface FlagSearchProps {
  owners: ReadonlyArray<FlagSearchOwner>
  initialState?: FlagSearchState
  onChange?: (state: FlagSearchState) => void
  className?: string
}

const STATUS_FILTERS: ReadonlyArray<{ id: FlagSearchStatus; label: string }> = [
  { id: "any", label: "Any" },
  { id: "on", label: "On" },
  { id: "off", label: "Off" },
  { id: "ramping", label: "Ramping" },
  { id: "killed", label: "Killed" },
]

function defaultState(): FlagSearchState {
  return {
    query: "",
    ownerIds: [],
    status: "any",
    includeArchived: false,
  }
}

export function FlagSearch({
  owners,
  initialState,
  onChange,
  className,
}: FlagSearchProps) {
  const [state, setState] = useState<FlagSearchState>(initialState ?? defaultState())

  const update = (next: FlagSearchState) => {
    setState(next)
    onChange?.(next)
  }

  const toggleOwner = (id: string) => {
    const ownerIds = state.ownerIds.includes(id)
      ? state.ownerIds.filter((o) => o !== id)
      : [...state.ownerIds, id]
    update({ ...state, ownerIds })
  }

  return (
    <section
      className={[styles.search, className].filter(Boolean).join(" ")}
      aria-label="Flag search"
    >
      <div className={styles.queryRow}>
        <span className={styles.searchGlyph} aria-hidden="true">
          ⌕
        </span>
        <input
          type="search"
          className={styles.queryInput}
          placeholder="Search flags by name or key…"
          value={state.query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            update({ ...state, query: event.target.value })
          }
          aria-label="Search flags"
        />
        <kbd className={styles.kbd} aria-hidden="true">
          ⌘ K
        </kbd>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.group} aria-label="Owners">
          <span className={styles.groupLabel}>Owners</span>
          <ul className={styles.chipList}>
            {owners.map((owner) => {
              const selected = state.ownerIds.includes(owner.id)
              return (
                <li key={owner.id}>
                  <button
                    type="button"
                    className={[styles.chip, selected ? styles.chipSelected : ""]
                      .filter(Boolean)
                      .join(" ")}
                    aria-pressed={selected}
                    onClick={() => toggleOwner(owner.id)}
                  >
                    {owner.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.group} aria-label="Status">
          <span className={styles.groupLabel}>Status</span>
          <ul className={styles.chipList}>
            {STATUS_FILTERS.map((filter) => {
              const selected = state.status === filter.id
              return (
                <li key={filter.id}>
                  <button
                    type="button"
                    className={[styles.chip, selected ? styles.chipSelected : ""]
                      .filter(Boolean)
                      .join(" ")}
                    aria-pressed={selected}
                    onClick={() => update({ ...state, status: filter.id })}
                  >
                    {filter.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <label className={styles.archived}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={state.includeArchived}
            onChange={(event) =>
              update({ ...state, includeArchived: event.target.checked })
            }
          />
          <span>Include archived</span>
        </label>
      </div>
    </section>
  )
}

export default FlagSearch
