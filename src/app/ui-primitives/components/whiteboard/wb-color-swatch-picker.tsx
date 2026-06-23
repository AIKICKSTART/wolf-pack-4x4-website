"use client"

import { useState } from "react"
import type { ChangeEvent } from "react"

import styles from "./wb-color-swatch-picker.module.css"

export interface WbColorSwatchPickerProps {
  /** Title shown above the grid. */
  title?: string
  /** 12 grid swatches. */
  swatches?: ReadonlyArray<string>
  /** Recent colours strip. */
  recent?: ReadonlyArray<string>
  /** Initial selected hex. */
  defaultValue?: string
  /** Called when a swatch is picked or hex is committed. */
  onChange?: (color: string) => void
  /** Optional className passthrough. */
  className?: string
}

const DEFAULT_SWATCHES: ReadonlyArray<string> = [
  "#0a0b10",
  "#ffffff",
  "#e62028",
  "#ffc14f",
  "#40bcff",
  "#37d67a",
  "#c89cff",
  "#ff9fc1",
  "#ffe66a",
  "#8ec7ff",
  "#8ce0a4",
  "#ffba6a",
]

function normalizeHex(input: string): string | null {
  const v = input.trim()
  if (v.length === 0) return null
  const withHash = v.startsWith("#") ? v : `#${v}`
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(withHash)) {
    return withHash.toLowerCase()
  }
  return null
}

export function WbColorSwatchPicker({
  title = "Tool colour",
  swatches = DEFAULT_SWATCHES,
  recent,
  defaultValue = "#e62028",
  onChange,
  className,
}: WbColorSwatchPickerProps) {
  const [value, setValue] = useState<string>(defaultValue)
  const [draft, setDraft] = useState<string>(defaultValue.replace("#", ""))
  const [invalid, setInvalid] = useState<boolean>(false)
  const classes = [styles.picker, className].filter(Boolean).join(" ")

  const handlePick = (color: string) => {
    setValue(color)
    setDraft(color.replace("#", ""))
    setInvalid(false)
    onChange?.(color)
  }

  const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value)
    const next = normalizeHex(event.target.value)
    if (next) {
      setInvalid(false)
      setValue(next)
      onChange?.(next)
    } else if (event.target.value.length > 0) {
      setInvalid(true)
    } else {
      setInvalid(false)
    }
  }

  return (
    <section role="group" aria-label={title} className={classes}>
      <header className={styles.head}>
        <span className={styles.kicker}>{title}</span>
        <span
          className={styles.preview}
          style={{ background: value }}
          aria-hidden="true"
        />
      </header>
      <ul className={styles.grid} aria-label="Colour swatches">
        {swatches.map((color) => (
          <li key={color}>
            <button
              type="button"
              className={`${styles.swatch} ${value === color ? styles.active : ""}`}
              style={{ background: color }}
              aria-pressed={value === color}
              aria-label={color}
              onClick={() => handlePick(color)}
            />
          </li>
        ))}
      </ul>
      {recent && recent.length > 0 ? (
        <div className={styles.recent}>
          <span className={styles.label}>Recent</span>
          <ul className={styles.recentRow}>
            {recent.map((color) => (
              <li key={`recent-${color}`}>
                <button
                  type="button"
                  className={`${styles.swatch} ${styles.recentSwatch} ${
                    value === color ? styles.active : ""
                  }`}
                  style={{ background: color }}
                  aria-pressed={value === color}
                  aria-label={`Recent ${color}`}
                  onClick={() => handlePick(color)}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <label className={`${styles.hex} ${invalid ? styles.hexInvalid : ""}`}>
        <span aria-hidden="true">#</span>
        <input
          type="text"
          value={draft}
          onChange={handleHexChange}
          maxLength={7}
          inputMode="text"
          aria-label="Hex colour value"
          aria-invalid={invalid}
        />
      </label>
    </section>
  )
}

export default WbColorSwatchPicker
