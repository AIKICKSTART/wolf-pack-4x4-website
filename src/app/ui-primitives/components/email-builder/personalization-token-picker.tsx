"use client"

import { useMemo, useState } from "react"

import { CodeBlock } from "../primitives/code-block"
import { Kbd } from "../primitives/kbd"

import type { PersonalizationToken } from "./email-builder-types"
import styles from "./personalization-token-picker.module.css"

interface PersonalizationTokenPickerProps {
  tokens: ReadonlyArray<PersonalizationToken>
  className?: string
}

export function PersonalizationTokenPicker({
  tokens,
  className,
}: PersonalizationTokenPickerProps) {
  const [query, setQuery] = useState<string>("")
  const [activeToken, setActiveToken] = useState<PersonalizationToken | null>(
    tokens[0] ?? null,
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tokens
    return tokens.filter(
      (token) =>
        token.token.toLowerCase().includes(q) ||
        token.label.toLowerCase().includes(q) ||
        (token.group?.toLowerCase().includes(q) ?? false),
    )
  }, [tokens, query])

  const classes = [styles.card, className].filter(Boolean).join(" ")

  const previewSnippet = activeToken
    ? `Hi ${activeToken.sample},\n\nWe've finished servicing your ${
        tokens.find((t) => t.token === "{{vehicle.rego}}")?.sample ?? "vehicle"
      }.`
    : ""

  return (
    <section className={classes} aria-label="Personalisation token picker">
      <header className={styles.head}>
        <span className={styles.kicker}>Personalisation</span>
        <h3 className={styles.title}>Insert a token</h3>
        <span className={styles.subtitle}>
          Type <Kbd>{"{"}{"{"}</Kbd> to open this picker anywhere in the canvas.
        </span>
      </header>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search tokens — first name, rego, quote total…"
        className={styles.search}
        aria-label="Search personalisation tokens"
      />

      <ul className={styles.list} role="listbox" aria-label="Personalisation tokens">
        {filtered.map((token) => {
          const isActive = activeToken?.token === token.token
          return (
            <li key={token.token}>
              <button
                type="button"
                role="option"
                aria-selected={isActive}
                className={[styles.row, isActive ? styles.rowActive : ""]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setActiveToken(token)}
              >
                <span className={styles.rowToken}>{token.token}</span>
                <span className={styles.rowBody}>
                  <span className={styles.rowLabel}>{token.label}</span>
                  {token.group ? (
                    <span className={styles.rowGroup}>{token.group}</span>
                  ) : null}
                </span>
                <span className={styles.rowSample}>{token.sample}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {activeToken ? (
        <div className={styles.previewBlock}>
          <span className={styles.previewLabel}>Sample preview</span>
          <CodeBlock
            code={previewSnippet}
            language="text"
            showLineNumbers={false}
            maxHeight={120}
          />
          <button type="button" className={styles.insertBtn}>
            Insert {activeToken.token}
          </button>
        </div>
      ) : null}
    </section>
  )
}
