"use client"

import { useId, useMemo, type ChangeEvent } from "react"

import styles from "./token-font-picker.module.css"
import { useThemeController } from "./theme-controller"
import { themeTokens, type ThemeTokenId } from "./theme-tokens"

interface FontStackOption {
  label: string
  value: string
}

/**
 * Font family stacks already loaded by the route or commonly available system stacks.
 * We do NOT load Google Fonts at runtime here; the picker only swaps between
 * known available families.
 */
const FONT_STACK_OPTIONS: ReadonlyArray<FontStackOption> = [
  { label: "Anton — heavy display", value: "Anton, Impact, sans-serif" },
  { label: "Big Shoulders Inline", value: "\"Big Shoulders Inline Display\", Anton, sans-serif" },
  { label: "Playfair Display", value: "\"Playfair Display\", Georgia, serif" },
  { label: "Cormorant Garamond", value: "\"Cormorant Garamond\", Georgia, serif" },
  { label: "Space Mono — brutalist", value: "\"Space Mono\", \"JetBrains Mono\", monospace" },
  { label: "Manrope — modern", value: "\"Manrope\", \"Inter\", sans-serif" },
  { label: "Inter — neutral body", value: "\"Inter\", Arial, sans-serif" },
  { label: "Geist — system sans", value: "var(--ff-geist, Inter, Arial, sans-serif)" },
  { label: "Georgia — serif body", value: "Georgia, \"Times New Roman\", serif" },
  { label: "JetBrains Mono", value: "\"JetBrains Mono\", monospace" },
  { label: "IBM Plex Mono", value: "\"IBM Plex Mono\", \"JetBrains Mono\", monospace" },
  { label: "Courier New", value: "\"Courier New\", monospace" },
  { label: "Helvetica Neue", value: "\"Helvetica Neue\", Arial, sans-serif" },
]

interface TokenFontPickerProps {
  tokenId: ThemeTokenId
  className?: string
}

export function TokenFontPicker({ tokenId, className }: TokenFontPickerProps) {
  const { values, setToken } = useThemeController()
  const inputId = useId()
  const token = useMemo(() => themeTokens.find((entry) => entry.id === tokenId), [tokenId])
  if (!token || token.category !== "type") {
    return null
  }

  const value = values[tokenId]
  const isCustom = !FONT_STACK_OPTIONS.some((option) => option.value === value)

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setToken(tokenId, event.target.value)
  }

  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div className={wrapperClass}>
      <label className={styles.label} htmlFor={inputId}>
        <span className={styles.labelText}>{token.label}</span>
        <span className={styles.tokenName}>{`--primitive-${tokenId}`}</span>
      </label>
      <select
        id={inputId}
        className={styles.select}
        value={isCustom ? "__custom__" : value}
        onChange={handleChange}
      >
        {isCustom && (
          <option value="__custom__" disabled>
            Custom stack
          </option>
        )}
        {FONT_STACK_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className={styles.preview} style={{ fontFamily: value }}>
        The quick brown fox jumps over the lazy dog. 1234567890
      </p>
      <p className={styles.hint}>{token.description}</p>
    </div>
  )
}
