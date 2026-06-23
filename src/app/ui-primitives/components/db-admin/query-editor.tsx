"use client"

import { useMemo, useState } from "react"
import { Play } from "lucide-react"

import styles from "./query-editor.module.css"

const LIMIT_OPTIONS: ReadonlyArray<number> = [100, 500, 1000, 5000]

interface QueryEditorProps {
  /** Initial query text. */
  defaultQuery?: string
  /** Connection label rendered in toolbar — e.g. "prod · postgres". */
  connection?: string
  /** Initial row limit chip. */
  defaultLimit?: number
  /** Called when run is clicked with the current sql + limit. */
  onRun?: (query: string, limit: number) => void
  /** Render the run button in disabled state. */
  isRunning?: boolean
  className?: string
}

export function QueryEditor({
  defaultQuery = "",
  connection = "local · postgres",
  defaultLimit = 500,
  onRun,
  isRunning = false,
  className,
}: QueryEditorProps) {
  const [query, setQuery] = useState<string>(defaultQuery)
  const [limit, setLimit] = useState<number>(defaultLimit)

  const lineCount = useMemo(() => Math.max(1, query.split("\n").length), [query])
  const lineNumbers = useMemo(
    () => Array.from({ length: lineCount }, (_, index) => index + 1),
    [lineCount],
  )

  const cycleLimit = () => {
    const currentIndex = LIMIT_OPTIONS.indexOf(limit)
    const nextIndex = (currentIndex + 1) % LIMIT_OPTIONS.length
    setLimit(LIMIT_OPTIONS[nextIndex])
  }

  const classes = [styles.editor, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="SQL query editor">
      <div className={styles.toolbar}>
        <span className={styles.kicker}>Query</span>
        <span className={styles.connection}>{connection}</span>
        <span className={styles.spacer} />
        <button
          type="button"
          className={styles.limitChip}
          onClick={cycleLimit}
          aria-label={`Row limit: ${limit}. Click to cycle.`}
        >
          LIMIT {limit.toLocaleString("en-US")}
        </button>
        <button
          type="button"
          className={styles.runButton}
          disabled={isRunning || query.trim().length === 0}
          onClick={() => onRun?.(query, limit)}
          aria-label={isRunning ? "Query running" : "Run query"}
        >
          <Play size={12} strokeWidth={2.4} aria-hidden="true" />
          {isRunning ? "Running" : "Run"}
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.gutter} aria-hidden="true">
          <ol>
            {lineNumbers.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ol>
        </div>
        <textarea
          className={styles.textarea}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="SQL query input"
        />
      </div>
      <div className={styles.statusBar}>
        <span>SQL</span>
        <span>{query.length} chars</span>
        <span>{lineCount} lines</span>
      </div>
    </section>
  )
}

export default QueryEditor
