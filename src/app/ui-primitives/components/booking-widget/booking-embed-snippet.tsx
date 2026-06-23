"use client"

import { useMemo, useState } from "react"

import { CodeBlock } from "../primitives/code-block"
import styles from "./booking-embed-snippet.module.css"
import type { EmbedMode } from "./booking-widget-types"

interface BookingEmbedSnippetProps {
  /** Public URL for the booking widget, e.g. /book or a full host. */
  bookingUrl: string
  /** Initial tab. Defaults to "iframe". */
  defaultMode?: EmbedMode
  /** When the consumer wants to react to mode changes. */
  onModeChange?: (mode: EmbedMode) => void
}

const MODE_LABEL: Record<EmbedMode, string> = {
  iframe: "iframe",
  popup: "Popup",
  inline: "Inline",
}

const MODE_LANGUAGE: Record<EmbedMode, string> = {
  iframe: "html",
  popup: "html",
  inline: "html",
}

/**
 * Literal brand hex values emitted as copy-paste HTML/data attributes for the
 * consumer's own page. These are string content for the generated snippet —
 * not styling applied to this widget — so they cannot reference our CSS custom
 * properties (which would not exist on the embedding host). They mirror the
 * central `--primitive-red` accent and `--primitive-canvas` surface.
 */
const EMBED_ACCENT_HEX = "#e62028"
const EMBED_SURFACE_HEX = "#050508"

function buildSnippet(mode: EmbedMode, url: string, customized: boolean): string {
  const themeAttr = customized
    ? ` data-theme="mufflermen-red" data-accent="${EMBED_ACCENT_HEX}"`
    : ""
  if (mode === "iframe") {
    return [
      `<iframe`,
      `  src="${url}"`,
      `  width="100%"`,
      `  height="720"`,
      `  loading="lazy"`,
      `  title="Book a Mufflermen bay"`,
      `  style="border:0;border-radius:14px;background:${EMBED_SURFACE_HEX}"${themeAttr}>`,
      `</iframe>`,
    ].join("\n")
  }
  if (mode === "popup") {
    return [
      `<button data-mufflermen-popup="${url}"${themeAttr}>Book a bay</button>`,
      `<script async src="https://oakflats.mufflermen.com.au/embed/popup.js"></script>`,
    ].join("\n")
  }
  return [
    `<div id="mufflermen-booking" data-src="${url}"${themeAttr}></div>`,
    `<script async src="https://oakflats.mufflermen.com.au/embed/inline.js"></script>`,
  ].join("\n")
}

export function BookingEmbedSnippet({
  bookingUrl,
  defaultMode = "iframe",
  onModeChange,
}: BookingEmbedSnippetProps) {
  const [mode, setMode] = useState<EmbedMode>(defaultMode)
  const [customized, setCustomized] = useState<boolean>(false)

  const handleMode = (next: EmbedMode) => {
    setMode(next)
    onModeChange?.(next)
  }

  const snippet = useMemo(
    () => buildSnippet(mode, bookingUrl, customized),
    [mode, bookingUrl, customized],
  )

  return (
    <div className={styles.wrap}>
      <header className={styles.head}>
        <div role="tablist" aria-label="Embed type" className={styles.tabs}>
          {(Object.keys(MODE_LABEL) as ReadonlyArray<EmbedMode>).map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={mode === option}
              className={[styles.tab, mode === option && styles.tabActive]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleMode(option)}
            >
              {MODE_LABEL[option]}
            </button>
          ))}
        </div>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={customized}
            onChange={(event) => setCustomized(event.target.checked)}
          />
          <span>Customize styling</span>
        </label>
      </header>
      <CodeBlock
        code={snippet}
        language={MODE_LANGUAGE[mode]}
        fileName={`mufflermen-${mode}.html`}
        showLineNumbers
        maxHeight={260}
      />
    </div>
  )
}

export default BookingEmbedSnippet
