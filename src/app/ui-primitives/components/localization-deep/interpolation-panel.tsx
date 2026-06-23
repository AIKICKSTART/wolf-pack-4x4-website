"use client"

import { useId, useMemo, useState } from "react"

import { isRtlTag } from "../localization/localization-types"

import styles from "./interpolation-panel.module.css"

export interface InterpolationVariable {
  /** Variable name without braces, e.g. "customerName". */
  name: string
  /** Sample value used by the preview. */
  sample: string
  /** Optional human description for translators. */
  description?: string
}

export interface InterpolationPanelProps {
  /** Locale for direction inference. */
  locale: string
  /** Template containing {variable} tokens. */
  template: string
  /** Variables referenced by the template. */
  variables: ReadonlyArray<InterpolationVariable>
}

const TOKEN_REGEX = /\{([a-zA-Z0-9_]+)\}/g

interface ParsedToken {
  kind: "text" | "token"
  value: string
}

function parseTemplate(template: string): ReadonlyArray<ParsedToken> {
  const segments: ParsedToken[] = []
  let lastIndex = 0
  for (const match of template.matchAll(TOKEN_REGEX)) {
    const start = match.index ?? 0
    if (start > lastIndex) {
      segments.push({ kind: "text", value: template.slice(lastIndex, start) })
    }
    segments.push({ kind: "token", value: match[1] ?? "" })
    lastIndex = start + match[0].length
  }
  if (lastIndex < template.length) {
    segments.push({ kind: "text", value: template.slice(lastIndex) })
  }
  return segments
}

export function InterpolationPanel({
  locale,
  template,
  variables,
}: InterpolationPanelProps) {
  const groupId = useId()
  const [samples, setSamples] = useState<Readonly<Record<string, string>>>(
    () => {
      const initial: Record<string, string> = {}
      for (const variable of variables) {
        initial[variable.name] = variable.sample
      }
      return initial
    },
  )

  const segments = useMemo(() => parseTemplate(template), [template])

  const referencedTokens = useMemo(() => {
    const set = new Set<string>()
    for (const segment of segments) {
      if (segment.kind === "token") set.add(segment.value)
    }
    return set
  }, [segments])

  const declaredTokens = useMemo(
    () => new Set(variables.map((variable) => variable.name)),
    [variables],
  )

  const missingTokens = useMemo(() => {
    const list: string[] = []
    for (const token of referencedTokens) {
      if (!declaredTokens.has(token)) list.push(token)
    }
    return list
  }, [referencedTokens, declaredTokens])

  const unusedTokens = useMemo(() => {
    const list: string[] = []
    for (const token of declaredTokens) {
      if (!referencedTokens.has(token)) list.push(token)
    }
    return list
  }, [referencedTokens, declaredTokens])

  const dir = isRtlTag(locale) ? "rtl" : "ltr"

  return (
    <article className={styles.wrap} aria-labelledby={`${groupId}-title`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Interpolation preview</span>
        <h3 id={`${groupId}-title`} className={styles.title}>
          {locale}
        </h3>
      </header>

      <section className={styles.template} aria-label="Template">
        <span className={styles.sectionKicker}>Template</span>
        <p className={styles.templateText}>
          {segments.map((segment, index) => {
            if (segment.kind === "text") {
              return <span key={index}>{segment.value}</span>
            }
            return (
              <span key={index} className={styles.token}>
                {"{" + segment.value + "}"}
              </span>
            )
          })}
        </p>
      </section>

      <section className={styles.preview} aria-label="Rendered preview">
        <span className={styles.sectionKicker}>Preview</span>
        <p className={styles.previewText} dir={dir}>
          {segments.map((segment, index) => {
            if (segment.kind === "text") {
              return <span key={index}>{segment.value}</span>
            }
            const value = samples[segment.value]
            const hasValue = value !== undefined && value.length > 0
            return (
              <span
                key={index}
                className={styles.previewToken}
                data-missing={!hasValue}
                title={`{${segment.value}}`}
              >
                {hasValue ? value : `{${segment.value}}`}
              </span>
            )
          })}
        </p>
      </section>

      <section className={styles.variables} aria-label="Sample values">
        <span className={styles.sectionKicker}>Sample values</span>
        <ul className={styles.varList}>
          {variables.map((variable) => {
            const inputId = `${groupId}-${variable.name}`
            const used = referencedTokens.has(variable.name)
            return (
              <li key={variable.name} className={styles.varRow} data-unused={!used}>
                <label htmlFor={inputId} className={styles.varLabel}>
                  <span className={styles.varName}>{"{" + variable.name + "}"}</span>
                  {variable.description ? (
                    <span className={styles.varDescription}>
                      {variable.description}
                    </span>
                  ) : null}
                </label>
                <input
                  id={inputId}
                  type="text"
                  className={styles.varInput}
                  value={samples[variable.name] ?? ""}
                  onChange={(event) =>
                    setSamples((prev) => ({
                      ...prev,
                      [variable.name]: event.target.value,
                    }))
                  }
                />
              </li>
            )
          })}
        </ul>
      </section>

      {missingTokens.length > 0 || unusedTokens.length > 0 ? (
        <section className={styles.diagnostics} aria-label="Interpolation diagnostics">
          {missingTokens.length > 0 ? (
            <p className={styles.diag} data-tone="red">
              <span className={styles.diagKicker}>Missing</span>
              {missingTokens.map((token) => `{${token}}`).join(", ")}
            </p>
          ) : null}
          {unusedTokens.length > 0 ? (
            <p className={styles.diag} data-tone="amber">
              <span className={styles.diagKicker}>Unused</span>
              {unusedTokens.map((token) => `{${token}}`).join(", ")}
            </p>
          ) : null}
        </section>
      ) : null}
    </article>
  )
}

export default InterpolationPanel
