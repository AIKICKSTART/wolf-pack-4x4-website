"use client"

import { useMemo, useState } from "react"

import { CodeBlock } from "../primitives/code-block"

import styles from "./theme-export-panel.module.css"
import { useThemeController } from "./theme-controller"
import { TOKEN_CSS_VAR, themeTokens, type ThemeTokenId } from "./theme-tokens"

type ExportFormat = "css" | "json" | "tailwind"

interface FormatTab {
  id: ExportFormat
  label: string
  language: string
  fileName: string
  description: string
}

const FORMATS: ReadonlyArray<FormatTab> = [
  {
    id: "css",
    label: "CSS",
    language: "css",
    fileName: "theme.css",
    description: "Scoped wrapper snapshot.",
  },
  {
    id: "json",
    label: "JSON",
    language: "json",
    fileName: "theme.json",
    description: "Audit snapshot for tooling.",
  },
  {
    id: "tailwind",
    label: "Tailwind",
    language: "ts",
    fileName: "tailwind.config.ts",
    description: "Stub for downstream consumers.",
  },
]

interface ThemeExportPanelProps {
  className?: string
}

export function ThemeExportPanel({ className }: ThemeExportPanelProps) {
  const { values, currentPresetId } = useThemeController()
  const [activeFormat, setActiveFormat] = useState<ExportFormat>("css")
  const [confirmation, setConfirmation] = useState<string | null>(null)

  const exports = useMemo(() => ({
    css: buildCss(values, currentPresetId),
    json: buildJson(values),
    tailwind: buildTailwind(values),
  }), [values, currentPresetId])

  const active = FORMATS.find((format) => format.id === activeFormat) ?? FORMATS[0]
  const activeCode = exports[active.id]

  const handleConfirmation = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(activeCode)
      setConfirmation(`Copied ${active.label} export`)
      window.setTimeout(() => setConfirmation(null), 1800)
    } catch {
      setConfirmation("Clipboard unavailable")
    }
  }

  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section className={wrapperClass} aria-label="Theme export">
      <header className={styles.head}>
        <span className={styles.kicker}>Export</span>
        <h2 className={styles.title}>Theme handoff</h2>
        <p className={styles.lede}>
          The current scoped preset, with overrides applied, as a review snapshot for CSS,
          JSON, or a Tailwind config stub. Promote values through the theme catalog before
          treating them as source truth. Preset id <code className={styles.pid}>{currentPresetId}</code>.
        </p>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Export format">
        {FORMATS.map((format) => {
          const isActive = format.id === activeFormat
          return (
            <button
              key={format.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              onClick={() => setActiveFormat(format.id)}
            >
              <span>{format.label}</span>
              <small>{format.description}</small>
            </button>
          )
        })}
      </div>

      <div className={styles.codeWrap}>
        <CodeBlock
          code={activeCode}
          language={active.language}
          fileName={active.fileName}
          maxHeight={320}
        />
      </div>

      <div className={styles.footRow}>
        <button type="button" className={styles.copyAll} onClick={handleConfirmation}>
          Copy {active.label} export
        </button>
        <div role="status" aria-live="polite" className={styles.confirmation}>
          {confirmation ?? " "}
        </div>
      </div>
    </section>
  )
}

function buildCss(values: Record<ThemeTokenId, string>, presetId: string): string {
  const lines = themeTokens.map((token) => `  ${TOKEN_CSS_VAR[token.id]}: ${values[token.id]};`)
  return `[data-theme-preset="${presetId}"] {\n${lines.join("\n")}\n}\n`
}

function buildJson(values: Record<ThemeTokenId, string>): string {
  const ordered: Record<string, string> = {}
  for (const token of themeTokens) {
    ordered[token.id] = values[token.id]
  }
  return `${JSON.stringify(ordered, null, 2)}\n`
}

function buildTailwind(values: Record<ThemeTokenId, string>): string {
  const colors: Record<string, string> = {}
  const fonts: Record<string, string> = {}
  for (const token of themeTokens) {
    if (token.category === "type") {
      fonts[token.id] = values[token.id]
    } else {
      colors[token.id] = values[token.id]
    }
  }
  const colorBlock = JSON.stringify(colors, null, 8)
    .replace(/^\{\n/, "")
    .replace(/\n\}$/, "")
  const fontBlock = JSON.stringify(fonts, null, 8)
    .replace(/^\{\n/, "")
    .replace(/\n\}$/, "")
  return `import type { Config } from "tailwindcss"\n\nconst theme: Config["theme"] = {\n  extend: {\n    colors: {\n${colorBlock}\n    },\n    fontFamily: {\n${fontBlock}\n    },\n  },\n}\n\nexport default theme\n`
}
