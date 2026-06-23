"use client"

import { Search, X } from "lucide-react"
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react"

import styles from "./inline-search-input.module.css"

interface InlineSearchInputProps {
  label: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onDebouncedChange?: (value: string) => void
  debounceMs?: number
  resultCount?: number
  resultNoun?: string
  helper?: ReactNode
  className?: string
}

export function InlineSearchInput({
  label,
  placeholder = "Filter list…",
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  onDebouncedChange,
  debounceMs = 220,
  resultCount,
  resultNoun = "results",
  helper,
  className,
}: InlineSearchInputProps) {
  const [internalValue, setInternalValue] = useState<string>(defaultValue)
  const [isPulsing, setIsPulsing] = useState<boolean>(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputId = useId()
  const statusId = useId()

  const value = controlledValue ?? internalValue

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value
    if (controlledValue === undefined) {
      setInternalValue(next)
    }
    onValueChange?.(next)

    if (onDebouncedChange) {
      setIsPulsing(true)
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        onDebouncedChange(next)
        setIsPulsing(false)
        timeoutRef.current = null
      }, debounceMs)
    }
  }

  const handleClear = () => {
    if (controlledValue === undefined) {
      setInternalValue("")
    }
    onValueChange?.("")
    if (onDebouncedChange) {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      onDebouncedChange("")
      setIsPulsing(false)
    }
    inputRef.current?.focus()
  }

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <div className={styles.field} data-active={value.length > 0 ? "true" : "false"}>
        <span className={styles.icon} aria-hidden="true">
          <Search size={16} strokeWidth={2.2} />
        </span>
        <input
          id={inputId}
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          aria-describedby={statusId}
          autoComplete="off"
          spellCheck={false}
        />
        {isPulsing ? (
          <span className={styles.pulse} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        ) : null}
        {resultCount !== undefined ? (
          <output
            id={statusId}
            htmlFor={inputId}
            className={styles.count}
            aria-live="polite"
            role="status"
          >
            {resultCount} {resultNoun}
          </output>
        ) : null}
        {value.length > 0 ? (
          <button
            type="button"
            className={styles.clear}
            onClick={handleClear}
            aria-label="Clear filter"
          >
            <X size={12} strokeWidth={2.6} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      {helper ? <p className={styles.helper}>{helper}</p> : null}
    </div>
  )
}

export default InlineSearchInput
