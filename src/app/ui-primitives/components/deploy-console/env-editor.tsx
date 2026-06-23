"use client"

import { useId, useMemo, useState } from "react"
import type { ChangeEvent } from "react"

import type { EnvDirtyState, EnvScope, EnvValueKind, EnvVariable } from "./deploy-console-types"
import styles from "./env-editor.module.css"
import shell from "./deploy-console.module.css"

export interface EnvEditorProps {
  variables: ReadonlyArray<EnvVariable>
  /** Initial scope filter. */
  initialScope?: EnvScope | "all"
  /** Caption rendered above the grid. */
  caption?: string
  /** Optional kicker rendered above the caption. */
  kicker?: string
  className?: string
}

const KIND_LABEL: Record<EnvValueKind, string> = {
  string: "string",
  url: "url",
  secret: "secret",
  json: "json",
  number: "num",
  boolean: "bool",
}

const KIND_TONE_CLASS: Record<EnvValueKind, string> = {
  string: shell.toneNeutral,
  url: shell.toneTeal,
  secret: shell.toneAmber,
  json: shell.toneViolet,
  number: shell.toneTeal,
  boolean: shell.toneGreen,
}

const DIRTY_LABEL: Record<EnvDirtyState, string> = {
  clean: "Saved",
  added: "Added",
  modified: "Edited",
  removed: "Removed",
}

const DIRTY_TONE_CLASS: Record<EnvDirtyState, string> = {
  clean: shell.toneNeutral,
  added: shell.toneGreen,
  modified: shell.toneAmber,
  removed: shell.toneRed,
}

const SCOPE_OPTIONS: ReadonlyArray<{ value: EnvScope | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "production", label: "Production" },
  { value: "preview", label: "Preview" },
  { value: "development", label: "Development" },
]

function maskValue(raw: string): string {
  if (raw.length <= 4) {
    return "*".repeat(Math.max(raw.length, 6))
  }
  return `${raw.slice(0, 4)}${"*".repeat(Math.min(raw.length - 4, 18))}`
}

function detectKindBadgeTone(kind: EnvValueKind): string {
  return [shell.chip, KIND_TONE_CLASS[kind]].join(" ")
}

export function EnvEditor({
  variables,
  initialScope = "all",
  caption,
  kicker,
  className,
}: EnvEditorProps) {
  const [scope, setScope] = useState<EnvScope | "all">(initialScope)
  const [revealedKey, setRevealedKey] = useState<string | null>(null)
  const headingId = useId()

  const filtered = useMemo(() => {
    if (scope === "all") return variables
    return variables.filter((variable) => variable.scope === scope)
  }, [scope, variables])

  const dirtyCount = useMemo(
    () => variables.filter((variable) => variable.dirty !== "clean").length,
    [variables],
  )

  const handleScopeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as EnvScope | "all"
    setScope(next)
  }

  const handleToggleReveal = (key: string) => {
    setRevealedKey((current) => (current === key ? null : key))
  }

  return (
    <section
      className={[shell.shell, styles.editor, className].filter(Boolean).join(" ")}
      aria-labelledby={headingId}
    >
      <header className={shell.shellHead}>
        <div className={shell.shellIdentity}>
          {kicker ? <span className={shell.kicker}>{kicker}</span> : null}
          <h3 className={shell.title} id={headingId}>
            {caption ?? "Environment variables"}
          </h3>
          <p className={shell.subtitle}>
            <span className={shell.tabular}>{filtered.length}</span> variables
            {dirtyCount > 0 ? (
              <>
                {" · "}
                <span className={shell.tabular}>{dirtyCount}</span> unsaved
              </>
            ) : null}
          </p>
        </div>
        <label className={styles.scopeLabel}>
          <span className={shell.sectionLabel}>Scope</span>
          <select
            className={styles.scopeSelect}
            value={scope}
            onChange={handleScopeChange}
            aria-label="Filter env variables by scope"
          >
            {SCOPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className={styles.gridHead} aria-hidden="true">
        <span>Key</span>
        <span>Value</span>
        <span>Kind</span>
        <span>Scope</span>
        <span>State</span>
      </div>

      <ul className={styles.list}>
        {filtered.map((variable) => {
          const isSecret = variable.kind === "secret"
          const revealed = revealedKey === variable.key
          const displayValue =
            isSecret && !revealed ? maskValue(variable.value) : variable.value
          return (
            <li
              key={`${variable.scope}-${variable.key}`}
              className={[styles.gridRow, styles[`dirty-${variable.dirty}`]]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.cellKey}>
                <span className={styles.key}>{variable.key}</span>
                {variable.description ? (
                  <span className={styles.desc}>{variable.description}</span>
                ) : null}
                <span className={styles.meta}>
                  <span className={shell.tabular}>{variable.updatedAt}</span>
                  {variable.updatedBy ? <span> · {variable.updatedBy}</span> : null}
                </span>
              </div>
              <div className={styles.cellValue}>
                <code className={styles.value}>{displayValue}</code>
                {isSecret ? (
                  <button
                    type="button"
                    className={styles.revealButton}
                    onClick={() => handleToggleReveal(variable.key)}
                    aria-pressed={revealed}
                    aria-label={revealed ? `Hide ${variable.key}` : `Reveal ${variable.key}`}
                  >
                    {revealed ? "Hide" : "Reveal"}
                  </button>
                ) : null}
              </div>
              <div className={styles.cellKind}>
                <span className={detectKindBadgeTone(variable.kind)}>
                  {KIND_LABEL[variable.kind]}
                </span>
              </div>
              <div className={styles.cellScope}>
                <span className={shell.mono}>{variable.scope}</span>
              </div>
              <div className={styles.cellState}>
                <span
                  className={[shell.chip, DIRTY_TONE_CLASS[variable.dirty]].join(" ")}
                  aria-label={`State ${DIRTY_LABEL[variable.dirty]}`}
                >
                  {DIRTY_LABEL[variable.dirty]}
                </span>
              </div>
            </li>
          )
        })}
        {filtered.length === 0 ? (
          <li className={styles.empty}>No variables in this scope.</li>
        ) : null}
      </ul>
    </section>
  )
}

export default EnvEditor
