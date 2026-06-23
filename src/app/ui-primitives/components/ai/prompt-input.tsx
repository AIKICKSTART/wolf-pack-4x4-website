"use client"

import { Paperclip, SendHorizontal, Slash } from "lucide-react"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react"

import { Kbd, KbdGroup } from "../primitives/kbd"
import styles from "./prompt-input.module.css"

interface PromptInputProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  maxLength?: number
  disabled?: boolean
  trailing?: ReactNode
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onSlashCommand?: () => void
  onAttach?: () => void
  className?: string
}

const MAX_TEXTAREA_HEIGHT = 220
const MIN_TEXTAREA_HEIGHT = 56

function autoGrow(node: HTMLTextAreaElement): void {
  node.style.height = "auto"
  const next = Math.min(Math.max(node.scrollHeight, MIN_TEXTAREA_HEIGHT), MAX_TEXTAREA_HEIGHT)
  node.style.height = `${next}px`
}

export function PromptInput({
  value: controlledValue,
  defaultValue = "",
  placeholder = "Ask the Mufflermen assistant…",
  maxLength = 4000,
  disabled = false,
  trailing,
  onValueChange,
  onSubmit,
  onSlashCommand,
  onAttach,
  className,
}: PromptInputProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<string>(defaultValue)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const currentValue = isControlled ? controlledValue : internalValue
  const remaining = maxLength - currentValue.length

  useEffect(() => {
    const node = textareaRef.current
    if (node) {
      autoGrow(node)
    }
  }, [currentValue])

  const updateValue = useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalValue(next)
      }
      onValueChange?.(next)
    },
    [isControlled, onValueChange],
  )

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateValue(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!currentValue.trim() || disabled) {
      return
    }
    onSubmit?.(currentValue)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "/" && currentValue.length === 0) {
      event.preventDefault()
      onSlashCommand?.()
      return
    }
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      if (currentValue.trim() && !disabled) {
        onSubmit?.(currentValue)
      }
    }
  }

  const classes = [styles.composer, className].filter(Boolean).join(" ")

  return (
    <form className={classes} onSubmit={handleSubmit} aria-label="Prompt composer">
      <div className={styles.field}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          rows={2}
          aria-label="Message"
        />
        {trailing && <div className={styles.trailing}>{trailing}</div>}
      </div>

      <div className={styles.actions}>
        <div className={styles.toolGroup}>
          <button
            type="button"
            className={styles.toolBtn}
            aria-label="Slash command menu"
            onClick={onSlashCommand}
            disabled={disabled}
          >
            <Slash size={14} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            aria-label="Attach file"
            onClick={onAttach}
            disabled={disabled}
          >
            <Paperclip size={14} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.hint}>
          <span className={styles.counter} aria-live="polite">
            {remaining.toLocaleString()} left
          </span>
          <KbdGroup size="sm">
            <Kbd size="sm">⌘</Kbd>
            <Kbd size="sm">Enter</Kbd>
          </KbdGroup>
        </div>

        <button
          type="submit"
          className={styles.sendBtn}
          aria-label="Send message"
          disabled={disabled || currentValue.trim().length === 0}
        >
          <SendHorizontal size={14} strokeWidth={2.4} aria-hidden="true" />
          <span>Send</span>
        </button>
      </div>
    </form>
  )
}

export default PromptInput
