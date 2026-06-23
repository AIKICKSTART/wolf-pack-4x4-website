"use client"

import { X } from "lucide-react"
import {
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import styles from "./tag-input.module.css"

interface TagInputProps {
  label?: string
  placeholder?: string
  value?: string[]
  defaultValue?: string[]
  maxTags?: number
  onChange?: (tags: string[]) => void
  separators?: Array<" " | "Enter" | "," | ";">
  className?: string
  helperText?: string
  disabled?: boolean
}

const DEFAULT_SEPARATORS: Array<" " | "Enter" | "," | ";"> = ["Enter", ","]

export function TagInput({
  label,
  placeholder = "Add tag…",
  value: controlledValue,
  defaultValue = [],
  maxTags,
  onChange,
  separators = DEFAULT_SEPARATORS,
  className,
  helperText,
  disabled = false,
}: TagInputProps) {
  const [internalTags, setInternalTags] = useState<string[]>(defaultValue)
  const [draft, setDraft] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputId = useId()
  const tags = controlledValue ?? internalTags

  const apply = useCallback(
    (next: string[]) => {
      if (controlledValue === undefined) {
        setInternalTags(next)
      }
      onChange?.(next)
    },
    [controlledValue, onChange],
  )

  const commit = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()
      if (trimmed.length === 0) {
        return
      }
      if (tags.includes(trimmed)) {
        setDraft("")
        return
      }
      if (maxTags !== undefined && tags.length >= maxTags) {
        return
      }
      apply([...tags, trimmed])
      setDraft("")
    },
    [tags, apply, maxTags],
  )

  const removeAt = useCallback(
    (index: number) => {
      const next = tags.filter((_, position) => position !== index)
      apply(next)
    },
    [tags, apply],
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }
    if (separators.includes(event.key as " " | "Enter" | "," | ";")) {
      if (draft.trim().length > 0) {
        event.preventDefault()
        commit(draft)
      } else if (event.key === "Enter") {
        event.preventDefault()
      }
      return
    }
    if (event.key === "Backspace" && draft.length === 0 && tags.length > 0) {
      event.preventDefault()
      removeAt(tags.length - 1)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value
    if (separators.includes(",") && next.endsWith(",")) {
      commit(next.slice(0, -1))
      return
    }
    setDraft(next)
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const classes = [styles.tagInput, disabled && styles.disabled, className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {maxTags !== undefined && (
            <span className={styles.count}>
              {tags.length}/{maxTags}
            </span>
          )}
        </label>
      )}
      <div
        className={styles.field}
        onClick={focusInput}
        role="presentation"
      >
        {tags.map((tag, index) => (
          <span key={`${tag}-${index}`} className={styles.tag}>
            <span className={styles.tagLabel}>{tag}</span>
            <button
              type="button"
              className={styles.tagRemove}
              aria-label={`Remove ${tag}`}
              onClick={(event) => {
                event.stopPropagation()
                removeAt(index)
              }}
              disabled={disabled}
            >
              <X size={11} strokeWidth={2.6} aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          id={inputId}
          ref={inputRef}
          className={styles.input}
          type="text"
          spellCheck={false}
          autoComplete="off"
          value={draft}
          placeholder={tags.length === 0 ? placeholder : undefined}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
      </div>
      {helperText && <span className={styles.helper}>{helperText}</span>}
    </div>
  )
}

export default TagInput
