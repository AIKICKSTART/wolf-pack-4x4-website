"use client"

import { Bold, Italic, List, Link as LinkIcon } from "lucide-react"
import { useState, useRef, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"

import styles from "./terms-conditions-editor.module.css"

interface TermsConditionsEditorProps {
  initialValue: string
  lastEditedAt: string
  version?: string
  onChange?: (value: string) => void
}

type ToolbarAction = "bold" | "italic" | "bullet" | "link"

const TOOLBAR_LABELS: Record<ToolbarAction, string> = {
  bold: "Bold",
  italic: "Italic",
  bullet: "Bullet list",
  link: "Insert link",
}

export function TermsConditionsEditor({
  initialValue,
  lastEditedAt,
  version = "v1.0",
  onChange,
}: TermsConditionsEditorProps) {
  const [value, setValue] = useState<string>(initialValue)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
    onChange?.(event.target.value)
  }

  const wrap = (action: ToolbarAction) => {
    const textarea = textareaRef.current
    if (!textarea) {
      return
    }
    const { selectionStart, selectionEnd } = textarea
    const selected = value.slice(selectionStart, selectionEnd)
    let inserted = selected
    if (action === "bold") {
      inserted = `**${selected || "bold text"}**`
    } else if (action === "italic") {
      inserted = `_${selected || "italic text"}_`
    } else if (action === "bullet") {
      inserted = selected
        ? selected.split("\n").map((line) => `- ${line}`).join("\n")
        : "- new item"
    } else if (action === "link") {
      inserted = `[${selected || "link text"}](https://example.com)`
    }
    const next = value.slice(0, selectionStart) + inserted + value.slice(selectionEnd)
    setValue(next)
    onChange?.(next)
  }

  return (
    <section className={styles.card} aria-labelledby="terms-editor-title">
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Terms & conditions</span>
          <h3 id="terms-editor-title" className={styles.title}>Quote terms</h3>
        </div>
        <Chip label={`${version} · edited ${lastEditedAt}`} tone="teal" />
      </header>
      <div className={styles.toolbar} role="toolbar" aria-label="Formatting toolbar">
        <button
          type="button"
          className={styles.toolBtn}
          aria-label={TOOLBAR_LABELS.bold}
          onClick={() => wrap("bold")}
        >
          <Bold size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.toolBtn}
          aria-label={TOOLBAR_LABELS.italic}
          onClick={() => wrap("italic")}
        >
          <Italic size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.toolBtn}
          aria-label={TOOLBAR_LABELS.bullet}
          onClick={() => wrap("bullet")}
        >
          <List size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.toolBtn}
          aria-label={TOOLBAR_LABELS.link}
          onClick={() => wrap("link")}
        >
          <LinkIcon size={14} aria-hidden="true" />
        </button>
      </div>
      <textarea
        ref={textareaRef}
        className={styles.area}
        value={value}
        rows={8}
        aria-label="Terms and conditions"
        onChange={handleChange}
      />
    </section>
  )
}

export default TermsConditionsEditor
