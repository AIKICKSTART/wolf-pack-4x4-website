"use client"

import { ChevronDown } from "lucide-react"
import {
  forwardRef,
  useId,
  type CSSProperties,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react"

import styles from "./select.module.css"

/**
 * Select — premium native `<select>` styled to the Carbon & Red DNA.
 *
 * A real `<select>` underneath (full keyboard + screen-reader support, native
 * option list), dressed with a recessed field surface, metallic chrome edge on
 * focus, and an absolutely-positioned lucide chevron. Sizes map to the shared
 * `--primitive-size-field-*` scale; light/dark parity is automatic via tokens.
 *
 * @example
 * <Select
 *   label="Bay"
 *   placeholder="Choose a bay"
 *   size="md"
 *   options={[
 *     { value: "1", label: "Bay 1 — Hoist" },
 *     { value: "2", label: "Bay 2 — Alignment" },
 *     { value: "x", label: "Out of service", disabled: true },
 *   ]}
 *   onChange={(e) => setBay(e.target.value)}
 * />
 *
 * @example
 * // Or compose <option>/<optgroup> children directly:
 * <Select label="Sort" defaultValue="recent">
 *   <option value="recent">Most recent</option>
 *   <option value="oldest">Oldest first</option>
 * </Select>
 */

export type SelectSize = "sm" | "md" | "lg"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string
  options?: SelectOption[]
  placeholder?: string
  size?: SelectSize
  error?: boolean
  children?: ReactNode
  className?: string
}

const SIZE_CLASS: Record<SelectSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

const CHEVRON_SIZE: Record<SelectSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      options,
      placeholder,
      size = "md",
      error = false,
      children,
      className,
      id,
      value,
      defaultValue,
      required,
      disabled,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId()
    const selectId = id ?? generatedId

    const rootClasses = [
      styles.root,
      SIZE_CLASS[size],
      error && styles.errored,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ")

    // A placeholder is rendered as a disabled, empty-value option. It only acts
    // as the resting selection when the field is uncontrolled-empty.
    const showPlaceholder = Boolean(placeholder)
    const hasNoInitialValue = value === undefined && defaultValue === undefined
    const placeholderDefault =
      showPlaceholder && hasNoInitialValue ? "" : undefined

    return (
      <div
        className={rootClasses}
        style={{ "--select-chevron": `${CHEVRON_SIZE[size]}px` } as CSSProperties}
      >
        {label && (
          <label className={styles.label} htmlFor={selectId}>
            <span className={styles.labelText}>{label}</span>
            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className={styles.field}>
          <select
            ref={ref}
            id={selectId}
            className={styles.control}
            value={value}
            defaultValue={value === undefined ? defaultValue ?? placeholderDefault : undefined}
            required={required}
            disabled={disabled}
            aria-label={label ? undefined : ariaLabel}
            aria-invalid={error || undefined}
            {...rest}
          >
            {showPlaceholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </select>

          <span className={styles.chevron} aria-hidden="true">
            <ChevronDown size={CHEVRON_SIZE[size]} strokeWidth={2.2} />
          </span>
        </div>
      </div>
    )
  },
)

export default Select
