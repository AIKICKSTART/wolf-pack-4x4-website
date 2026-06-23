"use client"

import { useId } from "react"
import type { CSSProperties, KeyboardEvent } from "react"

import styles from "./toggle.module.css"

/**
 * Toggle — the shared on/off switch primitive for the Oak Flats Mufflermen
 * UI-primitives system. A `role="switch"` button whose track sinks from a
 * recessed field-bg into a tone-green channel as it turns on, while a
 * chrome/metallic knob slides across on a token-driven transform.
 *
 * Style is 100% `--primitive-*` token driven, so light/dark parity is automatic.
 * Keyboard: Space / Enter toggle. Reduced-motion collapses the slide to instant.
 *
 * @example
 * ```tsx
 * const [on, setOn] = useState(false)
 * <Toggle checked={on} onCheckedChange={setOn} label="Bay heater" />
 * <Toggle checked={on} onCheckedChange={setOn} size="sm" tone="amber"
 *   label="Notify" disabled />
 * ```
 */

export type ToggleTone = "green" | "red" | "amber" | "teal"
export type ToggleSize = "sm" | "md"

interface ToggleProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  tone?: ToggleTone
  size?: ToggleSize
  disabled?: boolean
  id?: string
  className?: string
}

const TONE_VAR: Record<ToggleTone, string> = {
  green: "var(--primitive-green)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
}

const SIZE_CLASS: Record<ToggleSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
}

export function Toggle({
  checked,
  onCheckedChange,
  label,
  tone = "green",
  size = "md",
  disabled = false,
  id,
  className,
}: ToggleProps) {
  const reactId = useId()
  const labelId = label ? `${id ?? reactId}-label` : undefined

  const classes = [
    styles.root,
    SIZE_CLASS[size],
    checked && styles.on,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const handleClick = () => {
    if (disabled) {
      return
    }
    onCheckedChange(!checked)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return
    }
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      onCheckedChange(!checked)
    }
  }

  return (
    <span
      className={classes}
      style={{ "--toggle-tone": TONE_VAR[tone] } as CSSProperties}
    >
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label ? undefined : "Toggle"}
        aria-labelledby={labelId}
        disabled={disabled}
        className={styles.control}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
      </button>
      {label && (
        <span id={labelId} className={styles.label} onClick={handleClick}>
          {label}
        </span>
      )}
    </span>
  )
}

export default Toggle
