"use client"

import { useId, useMemo, useState } from "react"

import { ProgressLinear } from "../primitives/progress-linear"
import type { LocaleSummary } from "../localization/localization-types"

import styles from "./locale-switcher.module.css"
import { REGION_FLAG } from "./localization-deep-types"

export interface LocaleSwitcherEntry {
  /** Locale tag, e.g. "en-AU". */
  tag: string
  /** Friendly display label. */
  label: string
  /** ISO region two-letter shorthand. */
  region: string
  /** Optional endonym, e.g. "简体中文". */
  endonym?: string
  /** Completion ratio 0–1. */
  completion: number
}

export interface LocaleSwitcherProps {
  /** Locales available to switch between. */
  locales: ReadonlyArray<LocaleSwitcherEntry>
  /** Currently selected locale tag. */
  value: string
  /** Optional change handler. */
  onChange?: (tag: string) => void
  /** Optional header label. */
  label?: string
}

function regionShorthand(region: string): string {
  return REGION_FLAG[region.toUpperCase()] ?? region.toUpperCase()
}

function toneFor(ratio: number): "red" | "amber" | "teal" | "green" {
  if (ratio >= 0.95) return "green"
  if (ratio >= 0.75) return "teal"
  if (ratio >= 0.4) return "amber"
  return "red"
}

/** Type-bridge so the standalone summary type stays compatible. */
export function entryFromSummary(
  summary: LocaleSummary,
  completion: number,
): LocaleSwitcherEntry {
  return {
    tag: summary.tag,
    label: summary.label,
    region: summary.region,
    endonym: summary.endonym,
    completion,
  }
}

export function LocaleSwitcher({
  locales,
  value,
  onChange,
  label = "Translator locale",
}: LocaleSwitcherProps) {
  const triggerId = useId()
  const listId = useId()
  const [open, setOpen] = useState(false)
  const current = useMemo(
    () => locales.find((entry) => entry.tag === value) ?? locales[0],
    [locales, value],
  )

  const handleSelect = (tag: string) => {
    onChange?.(tag)
    setOpen(false)
  }

  return (
    <div className={styles.root}>
      <label htmlFor={triggerId} className={styles.label}>
        {label}
      </label>
      <button
        id={triggerId}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.flag} aria-hidden="true">
          {current ? regionShorthand(current.region) : "??"}
        </span>
        <span className={styles.triggerText}>
          <span className={styles.triggerLabel}>
            {current?.label ?? "Select locale"}
          </span>
          <span className={styles.triggerTag}>{current?.tag ?? ""}</span>
        </span>
        {current ? (
          <span
            className={styles.triggerCompletion}
            data-tone={toneFor(current.completion)}
          >
            {Math.round(current.completion * 100)}%
          </span>
        ) : null}
        <span className={styles.chevron} aria-hidden="true" data-open={open}>
          ▾
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Locale options"
          className={styles.list}
        >
          {locales.map((entry) => {
            const selected = entry.tag === current?.tag
            const tone = toneFor(entry.completion)
            return (
              <li key={entry.tag}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={styles.option}
                  data-selected={selected}
                  onClick={() => handleSelect(entry.tag)}
                >
                  <span className={styles.optionFlag} aria-hidden="true">
                    {regionShorthand(entry.region)}
                  </span>
                  <span className={styles.optionText}>
                    <span className={styles.optionLabel}>{entry.label}</span>
                    {entry.endonym ? (
                      <span className={styles.optionEndonym}>
                        {entry.endonym}
                      </span>
                    ) : null}
                  </span>
                  <span className={styles.optionTag}>{entry.tag}</span>
                  <span className={styles.optionMeter}>
                    <ProgressLinear
                      value={Math.round(entry.completion * 100)}
                      max={100}
                      tone={tone}
                      variant="solid"
                      label={`${entry.label} completion`}
                    />
                  </span>
                  <span className={styles.optionRatio} data-tone={tone}>
                    {Math.round(entry.completion * 100)}%
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default LocaleSwitcher
