"use client"

import { ChevronDown, Filter } from "lucide-react"
import {
  useCallback,
  useId,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react"

import styles from "./faceted-filter-sidebar.module.css"

export type FacetGroupKind = "checkbox" | "chip" | "toggle" | "range"

export interface FacetCheckboxOption {
  id: string
  label: string
  count?: number
  checked?: boolean
}

export interface FacetChipOption {
  id: string
  label: string
  selected?: boolean
}

export interface FacetRangeValue {
  min: number
  max: number
  current: number
  step?: number
  format?: (value: number) => string
}

export interface FacetGroup {
  id: string
  heading: string
  kind: FacetGroupKind
  defaultOpen?: boolean
  options?: ReadonlyArray<FacetCheckboxOption | FacetChipOption>
  range?: FacetRangeValue
  toggleLabel?: string
  toggleOn?: boolean
}

interface FacetedFilterSidebarProps {
  groups: ReadonlyArray<FacetGroup>
  heading?: string
  appliedCount?: number
  onCheckboxToggle?: (groupId: string, optionId: string, next: boolean) => void
  onChipToggle?: (groupId: string, optionId: string, next: boolean) => void
  onRangeChange?: (groupId: string, value: number) => void
  onToggleChange?: (groupId: string, next: boolean) => void
  onClearAll?: () => void
  className?: string
}

function isCheckboxOption(
  option: FacetCheckboxOption | FacetChipOption,
): option is FacetCheckboxOption {
  return "checked" in option || "count" in option
}

export function FacetedFilterSidebar({
  groups,
  heading = "Refine",
  appliedCount = 0,
  onCheckboxToggle,
  onChipToggle,
  onRangeChange,
  onToggleChange,
  onClearAll,
  className,
}: FacetedFilterSidebarProps) {
  const initialOpen = groups.reduce<Record<string, boolean>>((acc, g) => {
    acc[g.id] = g.defaultOpen ?? true
    return acc
  }, {})
  const [openState, setOpenState] = useState<Record<string, boolean>>(initialOpen)
  const reactId = useId()

  const toggleGroup = useCallback((id: string) => {
    setOpenState((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const classes = [styles.sidebar, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} aria-label="Filters">
      <header className={styles.header}>
        <span className={styles.headerIcon} aria-hidden="true">
          <Filter size={13} strokeWidth={2.2} />
        </span>
        <h3 className={styles.title}>{heading}</h3>
        {appliedCount > 0 ? (
          <span className={styles.appliedPill}>
            {appliedCount} applied
          </span>
        ) : null}
        {onClearAll && appliedCount > 0 ? (
          <button type="button" className={styles.clearAll} onClick={onClearAll}>
            Clear
          </button>
        ) : null}
      </header>

      <div className={styles.scroller}>
        {groups.map((group) => {
          const isOpen = openState[group.id] ?? true
          const panelId = `${reactId}-${group.id}-panel`
          return (
            <section key={group.id} className={styles.group}>
              <button
                type="button"
                className={styles.groupHead}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleGroup(group.id)}
              >
                <span className={styles.groupTitle}>{group.heading}</span>
                <span
                  className={styles.chevron}
                  data-open={isOpen ? "true" : "false"}
                  aria-hidden="true"
                >
                  <ChevronDown size={14} strokeWidth={2.2} />
                </span>
              </button>
              {isOpen ? (
                <div id={panelId} className={styles.groupBody}>
                  {group.kind === "checkbox" && group.options ? (
                    <CheckboxList
                      groupId={group.id}
                      options={group.options}
                      onToggle={onCheckboxToggle}
                    />
                  ) : null}
                  {group.kind === "chip" && group.options ? (
                    <ChipGrid
                      groupId={group.id}
                      options={group.options}
                      onToggle={onChipToggle}
                    />
                  ) : null}
                  {group.kind === "toggle" ? (
                    <ToggleControl
                      groupId={group.id}
                      label={group.toggleLabel ?? "Enabled"}
                      checked={group.toggleOn ?? false}
                      onToggle={onToggleChange}
                    />
                  ) : null}
                  {group.kind === "range" && group.range ? (
                    <RangeControl
                      groupId={group.id}
                      range={group.range}
                      onChange={onRangeChange}
                    />
                  ) : null}
                </div>
              ) : null}
            </section>
          )
        })}
      </div>
    </aside>
  )
}

function CheckboxList({
  groupId,
  options,
  onToggle,
}: {
  groupId: string
  options: ReadonlyArray<FacetCheckboxOption | FacetChipOption>
  onToggle?: (groupId: string, optionId: string, next: boolean) => void
}): ReactNode {
  return (
    <ul className={styles.checkboxList}>
      {options.map((option) => {
        const checkbox = isCheckboxOption(option) ? option : null
        const checked = checkbox?.checked ?? false
        const count = checkbox?.count
        return (
          <li key={option.id}>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={checked}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onToggle?.(groupId, option.id, event.target.checked)
                }
              />
              <span className={styles.checkboxLabel}>{option.label}</span>
              {typeof count === "number" ? (
                <span className={styles.checkboxCount}>{count}</span>
              ) : null}
            </label>
          </li>
        )
      })}
    </ul>
  )
}

function ChipGrid({
  groupId,
  options,
  onToggle,
}: {
  groupId: string
  options: ReadonlyArray<FacetCheckboxOption | FacetChipOption>
  onToggle?: (groupId: string, optionId: string, next: boolean) => void
}): ReactNode {
  return (
    <div className={styles.chipGrid}>
      {options.map((option) => {
        const selected =
          isCheckboxOption(option) ? (option.checked ?? false) : (option.selected ?? false)
        return (
          <button
            key={option.id}
            type="button"
            className={styles.chip}
            aria-pressed={selected}
            data-selected={selected ? "true" : "false"}
            onClick={() => onToggle?.(groupId, option.id, !selected)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function ToggleControl({
  groupId,
  label,
  checked,
  onToggle,
}: {
  groupId: string
  label: string
  checked: boolean
  onToggle?: (groupId: string, next: boolean) => void
}): ReactNode {
  const id = useId()
  return (
    <label className={styles.toggleRow} htmlFor={id}>
      <span className={styles.toggleLabel}>{label}</span>
      <span className={styles.toggleSwitch} data-on={checked ? "true" : "false"}>
        <input
          id={id}
          type="checkbox"
          role="switch"
          className={styles.toggleInput}
          checked={checked}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onToggle?.(groupId, event.target.checked)
          }
        />
        <span className={styles.toggleThumb} aria-hidden="true" />
      </span>
    </label>
  )
}

function RangeControl({
  groupId,
  range,
  onChange,
}: {
  groupId: string
  range: FacetRangeValue
  onChange?: (groupId: string, value: number) => void
}): ReactNode {
  const format = range.format ?? ((value: number) => value.toLocaleString())
  return (
    <div className={styles.range}>
      <div className={styles.rangeReadout}>
        <span className={styles.rangeMin}>{format(range.min)}</span>
        <span className={styles.rangeCurrent}>{format(range.current)}</span>
        <span className={styles.rangeMax}>{format(range.max)}</span>
      </div>
      <input
        type="range"
        className={styles.rangeInput}
        min={range.min}
        max={range.max}
        step={range.step ?? 1}
        value={range.current}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange?.(groupId, Number(event.target.value))
        }
      />
    </div>
  )
}

export default FacetedFilterSidebar
