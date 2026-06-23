"use client"

import { useId, useState } from "react"

import styles from "./region-switcher.module.css"
import type { RegionSummary } from "./localization-types"

export interface RegionSwitcherProps {
  regions: ReadonlyArray<RegionSummary>
  value: string
  onChange?: (id: string) => void
  label?: string
}

const MEASUREMENT_LABEL: Record<RegionSummary["measurement"], string> = {
  metric: "Metric · km, kg, °C",
  imperial: "Imperial · mi, lb, °F",
}

export function RegionSwitcher({
  regions,
  value,
  onChange,
  label = "Operating region",
}: RegionSwitcherProps) {
  const groupId = useId()
  const [selected, setSelected] = useState(value)

  const handleSelect = (id: string) => {
    setSelected(id)
    onChange?.(id)
  }

  return (
    <section className={styles.root} aria-labelledby={groupId}>
      <header className={styles.head}>
        <span id={groupId} className={styles.label}>
          {label}
        </span>
        <span className={styles.helper}>
          Drives timezone, currency, units, and date format defaults.
        </span>
      </header>

      <ol className={styles.list} role="radiogroup" aria-labelledby={groupId}>
        {regions.map((region) => {
          const active = region.id === selected
          return (
            <li key={region.id}>
              <button
                type="button"
                role="radio"
                aria-checked={active}
                className={`${styles.tile} ${active ? styles.tileActive : ""}`}
                onClick={() => handleSelect(region.id)}
              >
                <span className={styles.title}>{region.label}</span>
                <dl className={styles.chips}>
                  <div className={styles.chip} data-tone="teal">
                    <dt>Timezone</dt>
                    <dd>{region.timezone}</dd>
                  </div>
                  <div className={styles.chip} data-tone="amber">
                    <dt>Currency</dt>
                    <dd>{region.currency}</dd>
                  </div>
                  <div className={styles.chip} data-tone="green">
                    <dt>Units</dt>
                    <dd>{MEASUREMENT_LABEL[region.measurement]}</dd>
                  </div>
                </dl>
              </button>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default RegionSwitcher
