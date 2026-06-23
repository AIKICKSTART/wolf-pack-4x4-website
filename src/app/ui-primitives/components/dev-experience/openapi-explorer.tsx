"use client"

import { Play } from "lucide-react"
import { useId, useState, type ReactNode } from "react"

import type { OpenApiMethod } from "./dev-experience-types"
import styles from "./openapi-explorer.module.css"

export type OpenApiTabKey = "parameters" | "request-body" | "responses" | "code"

export interface OpenApiTab {
  key: OpenApiTabKey
  label: string
  content: ReactNode
}

export interface OpenApiExplorerProps {
  /** HTTP verb shown in the leading chip. */
  method: OpenApiMethod
  /** Endpoint path, e.g. /v1/quotes. */
  path: string
  /** Short summary rendered next to the path. */
  summary: string
  /** Tabs rendered in order. */
  tabs: ReadonlyArray<OpenApiTab>
  /** Default tab key. */
  defaultTab?: OpenApiTabKey
  /** Optional try-it CTA — when provided renders the action button. */
  onTryIt?: () => void
  /** Optional className passthrough. */
  className?: string
}

const METHOD_CLASS: Record<OpenApiMethod, string> = {
  GET: styles.methodGet,
  POST: styles.methodPost,
  PUT: styles.methodPut,
  PATCH: styles.methodPatch,
  DELETE: styles.methodDelete,
}

export function OpenApiExplorer({
  method,
  path,
  summary,
  tabs,
  defaultTab,
  onTryIt,
  className,
}: OpenApiExplorerProps) {
  const initial: OpenApiTabKey = defaultTab ?? tabs[0]?.key ?? "parameters"
  const [active, setActive] = useState<OpenApiTabKey>(initial)
  const tablistId = useId()
  const current = tabs.find((t) => t.key === active) ?? tabs[0]
  const classes = [styles.explorer, className].filter(Boolean).join(" ")

  if (!current) {
    return null
  }

  return (
    <section
      className={classes}
      aria-label={`OpenAPI explorer for ${method} ${path}`}
    >
      <header className={styles.head}>
        <div className={styles.endpoint}>
          <span className={`${styles.methodChip} ${METHOD_CLASS[method]}`}>
            {method}
          </span>
          <code className={styles.path}>{path}</code>
        </div>
        <p className={styles.summary}>{summary}</p>
        {onTryIt ? (
          <button
            type="button"
            className={styles.tryIt}
            onClick={onTryIt}
            aria-label={`Try ${method} ${path}`}
          >
            <Play size={13} strokeWidth={2.4} aria-hidden="true" />
            <span>Try it</span>
          </button>
        ) : null}
      </header>
      <div
        className={styles.tablist}
        role="tablist"
        aria-label="OpenAPI section"
        id={tablistId}
      >
        {tabs.map((tab) => {
          const selected = tab.key === active
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tablistId}-${tab.key}`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`${tablistId}-${current.key}`}
        aria-label={`${current.label} panel`}
        className={styles.panel}
      >
        {current.content}
      </div>
    </section>
  )
}

export default OpenApiExplorer
