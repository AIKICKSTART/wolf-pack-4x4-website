"use client"

import { Bold, Italic, Type as TypeIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { ChangeEvent } from "react"

import styles from "./text-box-tool.module.css"

export type TextBoxFontFamily = "display" | "body" | "mono"
export type TextBoxFontSize = "sm" | "md" | "lg" | "xl"

export interface TextBoxToolProps {
  /** Initial text value. */
  defaultValue?: string
  /** Placeholder shown when empty. */
  placeholder?: string
  /** Initial font family. */
  defaultFamily?: TextBoxFontFamily
  /** Initial font size. */
  defaultSize?: TextBoxFontSize
  /** Initial bold state. */
  defaultBold?: boolean
  /** Initial italic state. */
  defaultItalic?: boolean
  /** Initial text colour. */
  defaultColor?: string
  /** Force the floating toolbar visible (otherwise visible on focus). */
  alwaysShowToolbar?: boolean
  /** Optional className passthrough. */
  className?: string
  /** Called when the value commits (blur). */
  onCommit?: (value: string) => void
}

const COLOR_OPTIONS: ReadonlyArray<string> = [
  "#0a0b10",
  "#ffffff",
  "#e62028",
  "#ffc14f",
  "#40bcff",
  "#37d67a",
]

const SIZE_LABEL: Record<TextBoxFontSize, string> = {
  sm: "12",
  md: "16",
  lg: "20",
  xl: "28",
}

const SIZE_PX: Record<TextBoxFontSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
}

const FAMILY_STACK: Record<TextBoxFontFamily, string> = {
  display: "var(--primitive-font-display)",
  body: "var(--primitive-font-body)",
  mono: "var(--primitive-font-mono)",
}

const FAMILY_LABEL: Record<TextBoxFontFamily, string> = {
  display: "Display",
  body: "Body",
  mono: "Mono",
}

export function TextBoxTool({
  defaultValue = "",
  placeholder = "Type here…",
  defaultFamily = "body",
  defaultSize = "md",
  defaultBold = false,
  defaultItalic = false,
  defaultColor = "#ffffff",
  alwaysShowToolbar = false,
  className,
  onCommit,
}: TextBoxToolProps) {
  const [value, setValue] = useState<string>(defaultValue)
  const [family, setFamily] = useState<TextBoxFontFamily>(defaultFamily)
  const [size, setSize] = useState<TextBoxFontSize>(defaultSize)
  const [bold, setBold] = useState<boolean>(defaultBold)
  const [italic, setItalic] = useState<boolean>(defaultItalic)
  const [color, setColor] = useState<string>(defaultColor)
  const [focused, setFocused] = useState<boolean>(alwaysShowToolbar)
  const taRef = useRef<HTMLTextAreaElement | null>(null)
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const toolbarOpen = alwaysShowToolbar || focused

  // Auto-grow textarea height to match content.
  useEffect(() => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = `${ta.scrollHeight}px`
  }, [value, size, family])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  return (
    <div className={classes}>
      <div
        className={`${styles.toolbar} ${toolbarOpen ? styles.toolbarOpen : ""}`}
        role="toolbar"
        aria-label="Text formatting"
        aria-hidden={!toolbarOpen}
      >
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Font</span>
          <select
            value={family}
            onChange={(event) => setFamily(event.target.value as TextBoxFontFamily)}
          >
            {(Object.keys(FAMILY_LABEL) as TextBoxFontFamily[]).map((f) => (
              <option key={f} value={f}>
                {FAMILY_LABEL[f]}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Size</span>
          <select
            value={size}
            onChange={(event) => setSize(event.target.value as TextBoxFontSize)}
          >
            {(Object.keys(SIZE_LABEL) as TextBoxFontSize[]).map((s) => (
              <option key={s} value={s}>
                {SIZE_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={`${styles.iconBtn} ${bold ? styles.iconActive : ""}`}
          aria-pressed={bold}
          aria-label="Bold"
          onClick={() => setBold((prev) => !prev)}
        >
          <Bold aria-hidden={true} />
        </button>
        <button
          type="button"
          className={`${styles.iconBtn} ${italic ? styles.iconActive : ""}`}
          aria-pressed={italic}
          aria-label="Italic"
          onClick={() => setItalic((prev) => !prev)}
        >
          <Italic aria-hidden={true} />
        </button>
        <span className={styles.colors} role="group" aria-label="Text colour">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.colorDot} ${color === c ? styles.colorActive : ""}`}
              style={{ background: c }}
              aria-pressed={color === c}
              aria-label={`Colour ${c}`}
              onClick={() => setColor(c)}
            />
          ))}
        </span>
      </div>
      <div className={styles.fieldBox}>
        <span className={styles.fieldChip} aria-hidden="true">
          <TypeIcon aria-hidden={true} />
          Text
        </span>
        <textarea
          ref={taRef}
          className={styles.textarea}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(alwaysShowToolbar)
            onCommit?.(value)
          }}
          placeholder={placeholder}
          rows={1}
          aria-label="Text box content"
          style={{
            fontFamily: FAMILY_STACK[family],
            fontSize: SIZE_PX[size],
            fontWeight: bold ? 800 : 500,
            fontStyle: italic ? "italic" : "normal",
            color,
          }}
        />
      </div>
    </div>
  )
}

export default TextBoxTool
