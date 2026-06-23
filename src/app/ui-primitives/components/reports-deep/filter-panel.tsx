"use client"

import { useCallback, useMemo, useState, type ChangeEvent } from "react"

import type { FilterChipGroupDef, FilterFieldDef } from "./reports-deep-types"
import styles from "./filter-panel.module.css"

interface DateRangeValue {
  readonly start: string
  readonly end: string
}

interface NumericRangeValue {
  readonly min: number
  readonly max: number
}

interface FilterPanelProps {
  readonly title: string
  readonly dateRange: {
    readonly id: string
    readonly label: string
    readonly initial: DateRangeValue
  }
  readonly selectField: {
    readonly id: string
    readonly label: string
    readonly options: ReadonlyArray<{ readonly id: string; readonly label: string }>
    readonly initial: string
  }
  readonly numericRange: {
    readonly id: string
    readonly label: string
    readonly bounds: NumericRangeValue
    readonly initial: NumericRangeValue
    readonly unit?: string
  }
  readonly chipGroups: ReadonlyArray<FilterChipGroupDef>
  readonly textFields?: ReadonlyArray<FilterFieldDef>
  readonly className?: string
  readonly onClear?: () => void
}

export function FilterPanel({
  title,
  dateRange,
  selectField,
  numericRange,
  chipGroups,
  textFields = [],
  className,
  onClear,
}: FilterPanelProps) {
  const [range, setRange] = useState<DateRangeValue>(dateRange.initial)
  const [select, setSelect] = useState<string>(selectField.initial)
  const [numeric, setNumeric] = useState<NumericRangeValue>(numericRange.initial)
  const [chipState, setChipState] = useState<Record<string, ReadonlySet<string>>>(
    () => Object.fromEntries(chipGroups.map((group) => [group.id, new Set<string>()])),
  )
  const [text, setText] = useState<Record<string, string>>(
    () => Object.fromEntries(textFields.map((field) => [field.id, ""])),
  )

  const totalActive = useMemo(() => {
    const chipCount = Object.values(chipState).reduce((acc, set) => acc + set.size, 0)
    const textCount = Object.values(text).filter(Boolean).length
    const numericActive =
      numeric.min !== numericRange.bounds.min || numeric.max !== numericRange.bounds.max ? 1 : 0
    const selectActive = select !== selectField.initial ? 1 : 0
    return chipCount + textCount + numericActive + selectActive
  }, [chipState, numeric, numericRange.bounds, select, selectField.initial, text])

  const handleStartChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setRange((current) => ({ ...current, start: value }))
  }, [])

  const handleEndChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setRange((current) => ({ ...current, end: value }))
  }, [])

  const handleSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value)
  }, [])

  const handleNumericMin = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setNumeric((current) => ({ ...current, min: Number.isNaN(value) ? current.min : value }))
  }, [])

  const handleNumericMax = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setNumeric((current) => ({ ...current, max: Number.isNaN(value) ? current.max : value }))
  }, [])

  const toggleChip = useCallback(
    (groupId: string, optionId: string) => () => {
      setChipState((current) => {
        const set = new Set(current[groupId] ?? [])
        if (set.has(optionId)) {
          set.delete(optionId)
        } else {
          set.add(optionId)
        }
        return { ...current, [groupId]: set }
      })
    },
    [],
  )

  const handleClear = useCallback(() => {
    setRange(dateRange.initial)
    setSelect(selectField.initial)
    setNumeric(numericRange.initial)
    setChipState(Object.fromEntries(chipGroups.map((group) => [group.id, new Set<string>()])))
    setText(Object.fromEntries(textFields.map((field) => [field.id, ""])))
    onClear?.()
  }, [
    chipGroups,
    dateRange.initial,
    numericRange.initial,
    onClear,
    selectField.initial,
    textFields,
  ])

  const handleTextChange = useCallback(
    (fieldId: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setText((current) => ({ ...current, [fieldId]: value }))
    },
    [],
  )

  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} aria-label={`${title} filter panel`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Filters</span>
        <h3 className={styles.title}>{title}</h3>
        <button type="button" className={styles.clear} onClick={handleClear}>
          Clear · {totalActive}
        </button>
      </header>

      <section className={styles.section} aria-labelledby={`${dateRange.id}-label`}>
        <div id={`${dateRange.id}-label`} className={styles.sectionLabel}>
          {dateRange.label}
        </div>
        <div className={styles.dateRow}>
          <label className={styles.dateField}>
            <span>Start</span>
            <input
              type="date"
              value={range.start}
              onChange={handleStartChange}
              aria-label={`${dateRange.label} start`}
            />
          </label>
          <label className={styles.dateField}>
            <span>End</span>
            <input
              type="date"
              value={range.end}
              onChange={handleEndChange}
              aria-label={`${dateRange.label} end`}
            />
          </label>
        </div>
      </section>

      <section className={styles.section}>
        <label className={styles.sectionLabel} htmlFor={selectField.id}>
          {selectField.label}
        </label>
        <select
          id={selectField.id}
          className={styles.select}
          value={select}
          onChange={handleSelectChange}
        >
          {selectField.options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      <section className={styles.section} aria-labelledby={`${numericRange.id}-label`}>
        <div id={`${numericRange.id}-label`} className={styles.sectionLabel}>
          {numericRange.label}
          {numericRange.unit ? ` (${numericRange.unit})` : ""}
        </div>
        <div className={styles.numericRow}>
          <label className={styles.numericField}>
            <span>Min</span>
            <input
              type="number"
              min={numericRange.bounds.min}
              max={numericRange.bounds.max}
              value={numeric.min}
              onChange={handleNumericMin}
              aria-label={`${numericRange.label} min`}
            />
          </label>
          <span className={styles.dash} aria-hidden="true">
            —
          </span>
          <label className={styles.numericField}>
            <span>Max</span>
            <input
              type="number"
              min={numericRange.bounds.min}
              max={numericRange.bounds.max}
              value={numeric.max}
              onChange={handleNumericMax}
              aria-label={`${numericRange.label} max`}
            />
          </label>
        </div>
      </section>

      {chipGroups.map((group) => (
        <section key={group.id} className={styles.section} aria-labelledby={`${group.id}-label`}>
          <div id={`${group.id}-label`} className={styles.sectionLabel}>
            {group.label}
          </div>
          <div className={styles.chipGrid} role="group" aria-labelledby={`${group.id}-label`}>
            {group.options.map((option) => {
              const isOn = chipState[group.id]?.has(option.id) ?? false
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`${styles.chip} ${isOn ? styles.chipOn : ""}`.trim()}
                  aria-pressed={isOn}
                  onClick={toggleChip(group.id, option.id)}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </section>
      ))}

      {textFields.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionLabel}>Search</div>
          <div className={styles.textGrid}>
            {textFields.map((field) => (
              <label key={field.id} className={styles.textField}>
                <span>{field.label}</span>
                <input
                  type="text"
                  value={text[field.id] ?? ""}
                  placeholder={field.hint}
                  onChange={handleTextChange(field.id)}
                  aria-label={field.label}
                />
              </label>
            ))}
          </div>
        </section>
      ) : null}
    </aside>
  )
}

export default FilterPanel
