"use client"

import { ChevronDown, RotateCcw, Settings2 } from "lucide-react"
import { useCallback, useState, type ChangeEvent } from "react"

import styles from "./system-prompt-editor.module.css"

interface SystemPromptEditorProps {
  defaultPrompt: string
  resetPrompt?: string
  maxLength?: number
  onChange?: (value: string) => void
  defaultOpen?: boolean
  className?: string
}

export function SystemPromptEditor({
  defaultPrompt,
  resetPrompt,
  maxLength = 4000,
  onChange,
  defaultOpen = false,
  className,
}: SystemPromptEditorProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [value, setValue] = useState(defaultPrompt)

  const baseline = resetPrompt ?? defaultPrompt

  const update = useCallback(
    (next: string) => {
      setValue(next)
      onChange?.(next)
    },
    [onChange],
  )

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    update(event.target.value)
  }

  const handleReset = () => {
    update(baseline)
  }

  const isDirty = value !== baseline
  const remaining = maxLength - value.length
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="System prompt editor">
      <button
        type="button"
        className={styles.head}
        aria-expanded={open}
        aria-controls="system-prompt-editor-body"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.icon} aria-hidden="true">
          <Settings2 size={14} strokeWidth={2.2} aria-hidden="true" />
        </span>
        <span className={styles.headMeta}>
          <span className={styles.kicker}>System prompt</span>
          <span className={styles.subhead}>
            {isDirty ? "Edited from baseline" : "Using baseline"}
          </span>
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2.4}
          className={`${styles.caret} ${open ? styles.caretOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id="system-prompt-editor-body" className={styles.body}>
          <label className={styles.fieldLabel} htmlFor="system-prompt-editor-textarea">
            <span>Assistant instructions</span>
            <span className={styles.counter} aria-live="polite">
              {remaining.toLocaleString()} chars left
            </span>
          </label>
          <textarea
            id="system-prompt-editor-textarea"
            className={styles.textarea}
            value={value}
            onChange={handleChange}
            maxLength={maxLength}
            rows={6}
            spellCheck
          />
          <footer className={styles.actions}>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleReset}
              disabled={!isDirty}
            >
              <RotateCcw size={12} strokeWidth={2.4} aria-hidden="true" />
              <span>Reset to default</span>
            </button>
          </footer>
        </div>
      )}
    </section>
  )
}

export default SystemPromptEditor
