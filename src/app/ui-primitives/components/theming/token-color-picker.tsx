"use client"

import { useId, useMemo, type ChangeEvent } from "react"

import styles from "./token-color-picker.module.css"
import { useThemeController } from "./theme-controller"
import { themeTokens, type ThemeTokenId } from "./theme-tokens"

interface TokenColorPickerProps {
  tokenId: ThemeTokenId
  className?: string
}

/**
 * Tokens may contain `rgba(...)`, `oklch(...)`, hex, or named values. We display
 * the literal value in the text input so authors can paste any CSS value, and
 * synchronise the native colour input only when we can derive a sensible hex.
 */
function toHexProbe(value: string): string {
  const trimmed = value.trim()
  const match = trimmed.match(/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/)
  if (match) {
    const hex = match[1]
    if (hex.length === 3 || hex.length === 4) {
      const [r, g, b] = hex
      return `#${r}${r}${g}${g}${b}${b}`
    }
    return `#${hex.slice(0, 6)}`
  }
  return "#000000"
}

export function TokenColorPicker({ tokenId, className }: TokenColorPickerProps) {
  const { values, setToken } = useThemeController()
  const inputId = useId()
  const token = useMemo(() => themeTokens.find((entry) => entry.id === tokenId), [tokenId])
  if (!token || token.category === "type") {
    return null
  }

  const value = values[tokenId]
  const hexProbe = toHexProbe(value)

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setToken(tokenId, event.target.value)
  }

  const handleSwatchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setToken(tokenId, event.target.value)
  }

  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div className={wrapperClass}>
      <label className={styles.label} htmlFor={`${inputId}-text`}>
        <span className={styles.labelText}>{token.label}</span>
        <span className={styles.tokenName}>{`--primitive-${tokenId}`}</span>
      </label>
      <div className={styles.controlRow}>
        <input
          id={`${inputId}-swatch`}
          type="color"
          value={hexProbe}
          onChange={handleSwatchChange}
          className={styles.colorInput}
          aria-label={`${token.label} colour picker`}
          suppressHydrationWarning
        />
        <input
          id={`${inputId}-text`}
          type="text"
          value={value}
          onChange={handleTextChange}
          className={styles.textInput}
          spellCheck={false}
          autoComplete="off"
          suppressHydrationWarning
        />
      </div>
      <p className={styles.hint}>{token.description}</p>
    </div>
  )
}
