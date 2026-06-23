"use client"

import { useState } from "react"

import { CodeBlock } from "../primitives/code-block"
import type { EmbedMode } from "./form-builder-types"
import styles from "./embed-code-generator.module.css"

interface EmbedCodeGeneratorProps {
  /** Form id used in the generated snippets. */
  formId: string
  /** Optional embed host — defaults to forms.mufflermen.com.au. */
  host?: string
  /** Initial active embed mode. Defaults to "inline". */
  initialMode?: EmbedMode
  className?: string
}

const MODES: ReadonlyArray<{ id: EmbedMode; label: string; hint: string }> = [
  { id: "inline", label: "Inline", hint: "Drops the form into the page flow" },
  { id: "popup", label: "Popup", hint: "Opens centred with overlay" },
  { id: "slider", label: "Slider", hint: "Slides in from the right" },
  { id: "fullscreen", label: "Fullscreen", hint: "Takes over the viewport" },
]

export function EmbedCodeGenerator({
  formId,
  host = "forms.mufflermen.com.au",
  initialMode = "inline",
  className,
}: EmbedCodeGeneratorProps) {
  const [mode, setMode] = useState<EmbedMode>(initialMode)
  const classes = [styles.generator, className].filter(Boolean).join(" ")

  const snippet = buildSnippet({ mode, formId, host })

  return (
    <section className={classes} aria-label="Embed code generator">
      <header className={styles.head}>
        <span className={styles.kicker}>Embed</span>
        <div>
          <h3 className={styles.title}>Drop this on any site</h3>
          <p className={styles.subtitle}>
            Choose how the form should appear, then copy the snippet.
          </p>
        </div>
      </header>

      <div className={styles.modes} role="radiogroup" aria-label="Embed mode">
        {MODES.map((modeOption) => {
          const isActive = mode === modeOption.id
          return (
            <button
              key={modeOption.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={[styles.mode, isActive ? styles.modeActive : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setMode(modeOption.id)}
            >
              <span className={styles.modeLabel}>{modeOption.label}</span>
              <span className={styles.modeHint}>{modeOption.hint}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.code}>
        <CodeBlock
          code={snippet}
          language="html"
          fileName={`embed-${mode}.html`}
          showLineNumbers
        />
      </div>
    </section>
  )
}

interface BuildArgs {
  mode: EmbedMode
  formId: string
  host: string
}

function buildSnippet({ mode, formId, host }: BuildArgs): string {
  const src = `https://${host}/forms/${formId}`
  switch (mode) {
    case "inline":
      return [
        `<!-- Mufflermen forms — inline embed -->`,
        `<div`,
        `  data-mufflermen-form="${formId}"`,
        `  data-mode="inline"`,
        `  style="width:100%;min-height:520px"`,
        `></div>`,
        `<script async src="${src}/embed.js"></script>`,
      ].join("\n")
    case "popup":
      return [
        `<!-- Mufflermen forms — popup embed -->`,
        `<button`,
        `  data-mufflermen-form="${formId}"`,
        `  data-mode="popup"`,
        `>`,
        `  Get a quote`,
        `</button>`,
        `<script async src="${src}/embed.js"></script>`,
      ].join("\n")
    case "slider":
      return [
        `<!-- Mufflermen forms — slider embed -->`,
        `<a`,
        `  href="#quote"`,
        `  data-mufflermen-form="${formId}"`,
        `  data-mode="slider"`,
        `  data-side="right"`,
        `>`,
        `  Open quote form`,
        `</a>`,
        `<script async src="${src}/embed.js"></script>`,
      ].join("\n")
    case "fullscreen":
      return [
        `<!-- Mufflermen forms — fullscreen takeover -->`,
        `<button`,
        `  data-mufflermen-form="${formId}"`,
        `  data-mode="fullscreen"`,
        `  data-trigger="exit-intent"`,
        `>`,
        `  Book a fitting`,
        `</button>`,
        `<script async src="${src}/embed.js"></script>`,
      ].join("\n")
    default:
      return ""
  }
}
