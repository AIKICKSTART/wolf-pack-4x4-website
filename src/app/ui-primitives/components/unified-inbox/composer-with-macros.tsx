"use client"

import { Send, Sparkles } from "lucide-react"
import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import { Chip } from "../primitives/chip"

import type { MacroChip, MacroVariable } from "./unified-inbox-types"
import styles from "./composer-with-macros.module.css"

interface ComposerWithMacrosProps {
  /** Canned-reply chips shown above the composer. */
  macros: ReadonlyArray<MacroChip>
  /** Default value for the textarea. */
  defaultValue?: string
  /** Customer display name to drive the placeholder. */
  customerName?: string
  /** Triggered when the operator sends the reply. */
  onSend?: (value: string) => void
  className?: string
}

const MAX_ROWS = 8

function insertVariable(
  current: string,
  selectionStart: number,
  selectionEnd: number,
  token: string,
): { next: string; cursor: number } {
  const before = current.slice(0, selectionStart)
  const after = current.slice(selectionEnd)
  const next = `${before}${token}${after}`
  return { next, cursor: before.length + token.length }
}

export function ComposerWithMacros({
  macros,
  defaultValue = "",
  customerName,
  onSend,
  className,
}: ComposerWithMacrosProps) {
  const [value, setValue] = useState<string>(defaultValue)
  const [activeMacroId, setActiveMacroId] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const composerId = useId()

  const placeholder = customerName
    ? `Write a reply to ${customerName}…`
    : "Write a reply…"

  const activeMacro = useMemo(() => {
    if (!activeMacroId) return null
    return macros.find((macro) => macro.id === activeMacroId) ?? null
  }, [macros, activeMacroId])

  const autoSize = (node: HTMLTextAreaElement) => {
    node.style.height = "auto"
    const lineHeight = 22
    const capped = Math.min(node.scrollHeight, lineHeight * MAX_ROWS + 24)
    node.style.height = `${capped}px`
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
    autoSize(event.target)
  }

  const submit = useCallback(() => {
    const trimmed = value.trim()
    if (trimmed.length === 0) return
    onSend?.(trimmed)
    setValue("")
    setActiveMacroId(null)
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }, [value, onSend])

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      (event.metaKey || event.ctrlKey)
    ) {
      event.preventDefault()
      submit()
    }
  }

  const insertMacro = (macro: MacroChip) => {
    setValue((prev) => {
      const separator = prev.length > 0 && !prev.endsWith("\n") ? "\n\n" : ""
      const next = `${prev}${separator}${macro.body}`
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          textareaRef.current.setSelectionRange(next.length, next.length)
          autoSize(textareaRef.current)
        }
      })
      return next
    })
    setActiveMacroId(macro.id)
  }

  const insertToken = (variable: MacroVariable) => {
    const node = textareaRef.current
    if (!node) return
    const { next, cursor } = insertVariable(
      value,
      node.selectionStart ?? value.length,
      node.selectionEnd ?? value.length,
      variable.token,
    )
    setValue(next)
    requestAnimationFrame(() => {
      node.focus()
      node.setSelectionRange(cursor, cursor)
      autoSize(node)
    })
  }

  const classes = [styles.composer, className].filter(Boolean).join(" ")
  const canSend = value.trim().length > 0

  return (
    <form
      className={classes}
      role="form"
      aria-label="Composer with macros"
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      {macros.length > 0 ? (
        <div
          className={styles.macroStrip}
          role="toolbar"
          aria-label="Canned replies"
        >
          <span className={styles.macroLabel}>
            <Sparkles size={12} strokeWidth={2.2} aria-hidden="true" />
            <span>Macros</span>
          </span>
          {macros.map((macro) => (
            <Chip
              key={macro.id}
              label={macro.label}
              tone="teal"
              selected={activeMacroId === macro.id}
              onSelect={() => insertMacro(macro)}
            />
          ))}
        </div>
      ) : null}

      {activeMacro && activeMacro.variables && activeMacro.variables.length > 0 ? (
        <div
          className={styles.varStrip}
          role="toolbar"
          aria-label={`Variables for ${activeMacro.label}`}
        >
          <span className={styles.varLabel}>Insert variable</span>
          {activeMacro.variables.map((variable) => (
            <button
              key={variable.token}
              type="button"
              className={styles.varBtn}
              onClick={() => insertToken(variable)}
              title={variable.label}
            >
              <span className={styles.varToken}>{variable.token}</span>
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.editorRow}>
        <label htmlFor={composerId} className={styles.srOnly}>
          Reply body
        </label>
        <textarea
          id={composerId}
          ref={textareaRef}
          className={styles.textarea}
          placeholder={placeholder}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className={styles.actionRow}>
        <span className={styles.charCount} aria-live="polite">
          {value.length} chars
        </span>
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={!canSend}
          aria-label="Send reply"
        >
          <Send size={13} strokeWidth={2.4} aria-hidden="true" />
          <span>Send reply</span>
        </button>
      </div>
    </form>
  )
}

export default ComposerWithMacros
