"use client"

import { Filter, RotateCcw, Sliders, X } from "lucide-react"
import { useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"

import type { FacetGroup } from "./storefront-types"
import { STORE_DEFAULT_CURRENCY, STORE_LOCALE } from "./storefront-types"
import styles from "./faceted-filter-panel.module.css"

interface FacetedFilterPanelProps {
  groups: ReadonlyArray<FacetGroup>
  resultCount: number
  onToggleOption?: (groupKey: string, optionId: string) => void
  onRangeChange?: (groupKey: string, value: [number, number]) => void
  onClear?: () => void
  onRegoSubmit?: (groupKey: string, rego: string) => void
  ariaLabel?: string
  currency?: string
  locale?: string
}

function formatCurrency(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function FacetedFilterPanel({
  groups,
  resultCount,
  onToggleOption,
  onRangeChange,
  onClear,
  onRegoSubmit,
  ariaLabel = "Refine results",
  currency = STORE_DEFAULT_CURRENCY,
  locale = STORE_LOCALE,
}: FacetedFilterPanelProps) {
  const [regoDraft, setRegoDraft] = useState<Record<string, string>>({})

  const activeChips = groups.flatMap((group) =>
    (group.options ?? [])
      .filter((option) => option.selected)
      .map((option) => ({ groupKey: group.key, option })),
  )

  return (
    <aside className={styles.panel} aria-label={ariaLabel}>
      <header className={styles.head}>
        <div className={styles.headLabel}>
          <Sliders size={14} aria-hidden="true" />
          <span>Filters</span>
        </div>
        <span className={styles.resultPill}>
          <span className={styles.numeric}>{resultCount}</span> matches
        </span>
      </header>

      {activeChips.length > 0 && (
        <div className={styles.activeRow}>
          <ul className={styles.activeChips}>
            {activeChips.map((chip) => (
              <li key={`${chip.groupKey}-${chip.option.id}`}>
                <Chip
                  label={chip.option.label}
                  tone="amber"
                  dismissible
                  onDismiss={() => onToggleOption?.(chip.groupKey, chip.option.id)}
                />
              </li>
            ))}
          </ul>
          {onClear && (
            <button type="button" className={styles.clearAll} onClick={onClear}>
              <RotateCcw size={12} aria-hidden="true" /> Clear all
            </button>
          )}
        </div>
      )}

      <div className={styles.groups}>
        {groups.map((group) => (
          <details key={group.key} className={styles.group} open>
            <summary className={styles.groupHead}>
              <span>{group.label}</span>
              <Filter size={12} aria-hidden="true" />
            </summary>

            {group.kind === "checkbox" && group.options && (
              <ul className={styles.optList}>
                {group.options.map((option) => {
                  const optId = `facet-${group.key}-${option.id}`
                  return (
                    <li key={option.id}>
                      <label htmlFor={optId} className={styles.optRow}>
                        <input
                          id={optId}
                          type="checkbox"
                          className={styles.checkbox}
                          checked={option.selected ?? false}
                          onChange={() => onToggleOption?.(group.key, option.id)}
                        />
                        <span className={styles.optLabel}>{option.label}</span>
                        <span className={styles.optCount}>{option.count}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            )}

            {group.kind === "swatch" && group.options && (
              <ul className={styles.swatchGrid}>
                {group.options.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      className={`${styles.swatchBtn} ${option.selected ? styles.swatchSelected : ""}`}
                      aria-pressed={option.selected ?? false}
                      onClick={() => onToggleOption?.(group.key, option.id)}
                    >
                      {option.label}
                      <span className={styles.swatchCount}>({option.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {group.kind === "range" && group.rangeValue && (
              <div className={styles.rangeBlock}>
                <div className={styles.rangeRow}>
                  <span className={styles.numeric}>
                    {group.unit === "currency"
                      ? formatCurrency(group.rangeValue[0], currency, locale)
                      : `${group.rangeValue[0]} ${group.unit ?? ""}`}
                  </span>
                  <span className={styles.numeric}>
                    {group.unit === "currency"
                      ? formatCurrency(group.rangeValue[1], currency, locale)
                      : `${group.rangeValue[1]} ${group.unit ?? ""}`}
                  </span>
                </div>
                <div className={styles.rangeInputs}>
                  <input
                    type="range"
                    min={group.rangeMin}
                    max={group.rangeMax}
                    value={group.rangeValue[0]}
                    aria-label={`${group.label} minimum`}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const lo = Number.parseInt(event.target.value, 10)
                      onRangeChange?.(group.key, [
                        Number.isNaN(lo) ? group.rangeValue?.[0] ?? 0 : lo,
                        group.rangeValue?.[1] ?? group.rangeMax ?? 0,
                      ])
                    }}
                  />
                  <input
                    type="range"
                    min={group.rangeMin}
                    max={group.rangeMax}
                    value={group.rangeValue[1]}
                    aria-label={`${group.label} maximum`}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const hi = Number.parseInt(event.target.value, 10)
                      onRangeChange?.(group.key, [
                        group.rangeValue?.[0] ?? 0,
                        Number.isNaN(hi) ? group.rangeValue?.[1] ?? group.rangeMax ?? 0 : hi,
                      ])
                    }}
                  />
                </div>
              </div>
            )}

            {group.kind === "rego" && (
              <div className={styles.regoBlock}>
                <p className={styles.regoCaption}>Enter your rego — we match parts to your fitment.</p>
                <div className={styles.regoRow}>
                  <input
                    type="text"
                    maxLength={7}
                    className={styles.regoInput}
                    placeholder="BVA42K"
                    value={regoDraft[group.key] ?? ""}
                    onChange={(event) =>
                      setRegoDraft((prev) => ({
                        ...prev,
                        [group.key]: event.target.value.toUpperCase(),
                      }))
                    }
                    aria-label="Vehicle registration"
                  />
                  <button
                    type="button"
                    className={styles.regoBtn}
                    onClick={() => onRegoSubmit?.(group.key, regoDraft[group.key] ?? "")}
                  >
                    Match
                  </button>
                </div>
              </div>
            )}
          </details>
        ))}
      </div>

      <footer className={styles.foot}>
        <button type="button" className={styles.applyBtn}>
          Show {resultCount} parts
        </button>
        <button
          type="button"
          className={styles.dismissBtn}
          onClick={onClear}
          aria-label="Reset all filters"
        >
          <X size={12} aria-hidden="true" /> Reset
        </button>
      </footer>
    </aside>
  )
}

export default FacetedFilterPanel
