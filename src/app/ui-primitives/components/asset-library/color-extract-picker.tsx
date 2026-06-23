"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import type { AssetSwatch } from "./asset-library-types"

import styles from "./color-extract-picker.module.css"

interface ColorExtractPickerProps {
  /** Source asset name shown as caption. */
  assetName: string
  /** Exactly five swatches recommended for the canonical palette. */
  swatches: ReadonlyArray<AssetSwatch>
  className?: string
}

export function ColorExtractPicker({
  assetName,
  swatches,
  className,
}: ColorExtractPickerProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (hex: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopied(hex)
      window.setTimeout(() => setCopied(null), 1400)
      return
    }
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      window.setTimeout(() => setCopied(null), 1400)
    } catch {
      setCopied(hex)
      window.setTimeout(() => setCopied(null), 1400)
    }
  }

  return (
    <section
      className={[styles.surface, className].filter(Boolean).join(" ")}
      aria-label={`Colour palette extracted from ${assetName}`}
    >
      <header className={styles.header}>
        <span className={styles.kicker}>Extracted palette</span>
        <h3 className={styles.title}>{assetName}</h3>
      </header>

      <ul className={styles.list}>
        {swatches.map((swatch) => {
          const isCopied = copied === swatch.hex
          return (
            <li key={swatch.hex} className={styles.row}>
              <span
                className={styles.swatch}
                style={{ ["--swatch-color" as string]: swatch.hex }}
                aria-hidden="true"
              />
              <div className={styles.info}>
                <span className={styles.hex}>{swatch.hex.toUpperCase()}</span>
                <span className={styles.role}>{swatch.role}</span>
              </div>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={() => copy(swatch.hex)}
                aria-label={`Copy ${swatch.hex}`}
              >
                {isCopied ? (
                  <>
                    <Check size={12} strokeWidth={2.4} aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} strokeWidth={2.2} aria-hidden="true" />
                    Copy
                  </>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ColorExtractPicker
