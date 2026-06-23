"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

import { Chip } from "../primitives/chip"
import { Kbd } from "../primitives/kbd"

import styles from "./vin-decoder-strip.module.css"

export interface VinDecoderFields {
  make: string
  model: string
  engine: string
  body: string
  origin: string
  year: number
}

interface VinDecoderStripProps {
  vin: string
  fields: VinDecoderFields
  className?: string
}

const VIN_LENGTH = 17

function pad17(vin: string): string {
  return vin.replace(/\s+/g, "").toUpperCase().slice(0, VIN_LENGTH).padEnd(VIN_LENGTH, "·")
}

export function VinDecoderStrip({ vin, fields, className }: VinDecoderStripProps) {
  const [copied, setCopied] = useState(false)
  const display = pad17(vin)
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(vin)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // copy is best-effort; if the clipboard API is unavailable we simply
      // skip the success state. This intentionally swallows the error.
      setCopied(false)
    }
  }

  return (
    <section className={classes} aria-label="VIN decoder">
      <header className={styles.head}>
        <span className={styles.label}>VIN</span>
        <ol className={styles.code} aria-label="Vehicle identification number">
          {display.split("").map((char, index) => (
            <li key={index} className={styles.codeCell}>
              <Kbd size="sm">{char}</Kbd>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label={copied ? "VIN copied" : "Copy VIN"}
        >
          {copied ? (
            <Check size={14} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Copy size={14} strokeWidth={2.4} aria-hidden="true" />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </header>

      <dl className={styles.fields}>
        <div className={styles.field}>
          <dt>Make</dt>
          <dd>
            <Chip label={fields.make} tone="amber" />
          </dd>
        </div>
        <div className={styles.field}>
          <dt>Model</dt>
          <dd>
            <Chip label={fields.model} tone="teal" />
          </dd>
        </div>
        <div className={styles.field}>
          <dt>Engine</dt>
          <dd>
            <Chip label={fields.engine} tone="red" />
          </dd>
        </div>
        <div className={styles.field}>
          <dt>Body</dt>
          <dd>
            <Chip label={fields.body} tone="neutral" />
          </dd>
        </div>
        <div className={styles.field}>
          <dt>Origin</dt>
          <dd>
            <Chip label={fields.origin} tone="green" />
          </dd>
        </div>
        <div className={styles.field}>
          <dt>Year</dt>
          <dd>
            <Chip label={String(fields.year)} tone="neutral" />
          </dd>
        </div>
      </dl>
    </section>
  )
}

export default VinDecoderStrip
