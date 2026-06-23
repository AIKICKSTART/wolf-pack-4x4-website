"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { useMemo, useState } from "react"

import { CodeBlock } from "../primitives/code-block"
import { HttpStatusChip } from "../api-console/http-status-chip"
import { formatBytes, formatDuration, type ResponsePayload } from "./api-explorer-types"

import styles from "./response-viewer.module.css"

interface ResponseViewerProps {
  response?: ResponsePayload
  /** Override the empty-state placeholder. */
  placeholder?: string
  className?: string
}

type Tab = "body" | "tree" | "headers"

type JsonValue =
  | string
  | number
  | boolean
  | null
  | ReadonlyArray<JsonValue>
  | { readonly [key: string]: JsonValue }

function safeParse(body: string): JsonValue | undefined {
  try {
    return JSON.parse(body) as JsonValue
  } catch {
    return undefined
  }
}

interface JsonTreeNodeProps {
  label: string
  value: JsonValue
  depth: number
  isLast: boolean
}

function JsonTreeNode({ label, value, depth, isLast }: JsonTreeNodeProps) {
  const [open, setOpen] = useState(depth < 1)

  if (value === null) {
    return (
      <div className={styles.treeRow} style={{ paddingLeft: `${depth * 12}px` }}>
        <span className={styles.treeKey}>{label}</span>
        <span className={styles.treeNull}>null</span>
        {!isLast && <span className={styles.treeComma}>,</span>}
      </div>
    )
  }

  if (typeof value === "string") {
    return (
      <div className={styles.treeRow} style={{ paddingLeft: `${depth * 12}px` }}>
        <span className={styles.treeKey}>{label}</span>
        <span className={styles.treeString}>&quot;{value}&quot;</span>
        {!isLast && <span className={styles.treeComma}>,</span>}
      </div>
    )
  }

  if (typeof value === "number") {
    return (
      <div className={styles.treeRow} style={{ paddingLeft: `${depth * 12}px` }}>
        <span className={styles.treeKey}>{label}</span>
        <span className={styles.treeNumber}>{value}</span>
        {!isLast && <span className={styles.treeComma}>,</span>}
      </div>
    )
  }

  if (typeof value === "boolean") {
    return (
      <div className={styles.treeRow} style={{ paddingLeft: `${depth * 12}px` }}>
        <span className={styles.treeKey}>{label}</span>
        <span className={styles.treeBool}>{value ? "true" : "false"}</span>
        {!isLast && <span className={styles.treeComma}>,</span>}
      </div>
    )
  }

  const isArray = Array.isArray(value)
  const entries: Array<[string, JsonValue]> = isArray
    ? value.map((v, i) => [String(i), v])
    : Object.entries(value as { readonly [key: string]: JsonValue })
  const sizeLabel = `${entries.length} ${isArray ? "item" : "key"}${entries.length === 1 ? "" : "s"}`
  const openBrace = isArray ? "[" : "{"
  const closeBrace = isArray ? "]" : "}"

  return (
    <div style={{ paddingLeft: `${depth * 12}px` }}>
      <button
        type="button"
        className={styles.treeToggle}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown size={11} strokeWidth={2.4} aria-hidden="true" />
        ) : (
          <ChevronRight size={11} strokeWidth={2.4} aria-hidden="true" />
        )}
        <span className={styles.treeKey}>{label}</span>
        <span className={styles.treeBrace}>{openBrace}</span>
        {!open && <span className={styles.treeSize}>{sizeLabel}</span>}
        {!open && <span className={styles.treeBrace}>{closeBrace}</span>}
        {!open && !isLast && <span className={styles.treeComma}>,</span>}
      </button>
      {open && (
        <>
          {entries.map(([childKey, childValue], index) => (
            <JsonTreeNode
              key={childKey}
              label={isArray ? `[${childKey}]` : `"${childKey}":`}
              value={childValue}
              depth={depth + 1}
              isLast={index === entries.length - 1}
            />
          ))}
          <div className={styles.treeRow} style={{ paddingLeft: `${depth * 12}px` }}>
            <span className={styles.treeBrace}>{closeBrace}</span>
            {!isLast && <span className={styles.treeComma}>,</span>}
          </div>
        </>
      )}
    </div>
  )
}

export function ResponseViewer({
  response,
  placeholder = "Send a request to see the response.",
  className,
}: ResponseViewerProps) {
  const [tab, setTab] = useState<Tab>("body")
  const parsed = useMemo(() => (response ? safeParse(response.body) : undefined), [response])
  const classes = [styles.viewer, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="API response viewer">
      <header className={styles.head}>
        <span className={styles.label}>Response</span>
        {response ? (
          <div className={styles.meta}>
            <HttpStatusChip code={response.status} />
            <span className={styles.metric} aria-label={`Duration ${formatDuration(response.durationMs)}`}>
              {formatDuration(response.durationMs)}
            </span>
            <span className={styles.metric} aria-label={`Size ${formatBytes(response.sizeBytes)}`}>
              {formatBytes(response.sizeBytes)}
            </span>
          </div>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </header>

      {response && (
        <>
          <div className={styles.tabs} role="tablist" aria-label="Response views">
            {(["body", "tree", "headers"] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={tab === value}
                className={`${styles.tab} ${tab === value ? styles.tabActive : ""}`}
                onClick={() => setTab(value)}
              >
                {value === "body" ? "Raw" : value === "tree" ? "Tree" : "Headers"}
              </button>
            ))}
          </div>

          <div className={styles.panel}>
            {tab === "body" && (
              <CodeBlock
                code={response.body}
                language="json"
                showLineNumbers
                maxHeight={320}
                fileName="response.json"
              />
            )}
            {tab === "tree" && (
              <div className={styles.tree} role="tree" aria-label="JSON tree">
                {parsed === undefined ? (
                  <p className={styles.treeError}>
                    Response body is not valid JSON. Switch to the Raw tab to inspect it.
                  </p>
                ) : (
                  <JsonTreeNode label="" value={parsed} depth={0} isLast />
                )}
              </div>
            )}
            {tab === "headers" && (
              <table className={styles.headers}>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {response.headers.map((header) => (
                    <tr key={header.name}>
                      <th scope="row">{header.name}</th>
                      <td>{header.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default ResponseViewer
