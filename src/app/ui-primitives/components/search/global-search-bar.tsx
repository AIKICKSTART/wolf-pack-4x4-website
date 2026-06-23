"use client"

import { Search, X } from "lucide-react"
import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react"

import { Kbd } from "../primitives/kbd"
import styles from "./global-search-bar.module.css"

export type GlobalSearchBarTone = "neutral" | "red" | "teal" | "ghost"

export interface GlobalSearchBarHandle {
  focus: () => void
  clear: () => void
}

interface GlobalSearchBarProps {
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  tone?: GlobalSearchBarTone
  shortcutHint?: string
  showShortcutHint?: boolean
  leadingBadge?: ReactNode
  trailingSlot?: ReactNode
  className?: string
  ariaLabel?: string
}

const TONE_CLASS: Record<GlobalSearchBarTone, string> = {
  neutral: styles.toneNeutral,
  red: styles.toneRed,
  teal: styles.toneTeal,
  ghost: styles.toneGhost,
}

export const GlobalSearchBar = forwardRef<GlobalSearchBarHandle, GlobalSearchBarProps>(
  function GlobalSearchBar(
    {
      placeholder = "Search the workshop — parts, jobs, vehicles, people…",
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      onSubmit,
      tone = "neutral",
      shortcutHint = "/",
      showShortcutHint = true,
      leadingBadge,
      trailingSlot,
      className,
      ariaLabel = "Workshop search",
    },
    ref,
  ) {
    const [internalValue, setInternalValue] = useState<string>(defaultValue)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const inputId = useId()

    const value = controlledValue ?? internalValue

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (controlledValue === undefined) {
          setInternalValue("")
        }
        onValueChange?.("")
      },
    }))

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value
      if (controlledValue === undefined) {
        setInternalValue(next)
      }
      onValueChange?.(next)
    }

    const handleClear = () => {
      if (controlledValue === undefined) {
        setInternalValue("")
      }
      onValueChange?.("")
      inputRef.current?.focus()
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape" && value.length > 0) {
        event.preventDefault()
        handleClear()
      }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onSubmit?.(value)
    }

    const classes = [styles.bar, TONE_CLASS[tone], className].filter(Boolean).join(" ")

    return (
      <form
        role="search"
        aria-label={ariaLabel}
        className={classes}
        onSubmit={handleSubmit}
      >
        {leadingBadge ? <span className={styles.badge}>{leadingBadge}</span> : null}
        <span className={styles.iconLeading} aria-hidden="true">
          <Search size={18} strokeWidth={2.2} />
        </span>
        <label htmlFor={inputId} className={styles.label}>
          {ariaLabel}
        </label>
        <input
          id={inputId}
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-keyshortcuts={shortcutHint}
          autoComplete="off"
          spellCheck={false}
        />
        {value.length > 0 ? (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
        ) : null}
        {showShortcutHint && value.length === 0 ? (
          <span className={styles.shortcut} aria-hidden="true">
            <Kbd size="sm">{shortcutHint}</Kbd>
          </span>
        ) : null}
        {trailingSlot ? <span className={styles.trailing}>{trailingSlot}</span> : null}
      </form>
    )
  },
)

export default GlobalSearchBar
