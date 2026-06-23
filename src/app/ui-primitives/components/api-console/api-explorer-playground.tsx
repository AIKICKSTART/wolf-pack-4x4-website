"use client"

import { Play } from "lucide-react"
import { useId, useState } from "react"

import { CodeBlock } from "../primitives/code-block"
import { HttpStatusChip } from "./http-status-chip"
import type { HttpMethod, HttpStatusCode } from "./api-console-types"

import styles from "./api-explorer-playground.module.css"

interface KeyValue {
  id: string
  name: string
  value: string
}

export interface ExplorerResponse {
  status: HttpStatusCode | number
  durationMs: number
  body: string
}

interface ApiExplorerPlaygroundProps {
  defaultMethod?: HttpMethod
  defaultUrl?: string
  defaultParams?: ReadonlyArray<KeyValue>
  defaultHeaders?: ReadonlyArray<KeyValue>
  defaultBody?: string
  /** Optional response — when omitted the response panel is empty until `onSend` populates it. */
  response?: ExplorerResponse
  onSend?: (input: {
    method: HttpMethod
    url: string
    params: ReadonlyArray<KeyValue>
    headers: ReadonlyArray<KeyValue>
    body: string
  }) => void
  className?: string
}

const METHODS: ReadonlyArray<HttpMethod> = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"]

function newRow(): KeyValue {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name: "", value: "" }
}

function KeyValueEditor({
  rows,
  onChange,
  nameLabel,
  ariaLabel,
}: {
  rows: ReadonlyArray<KeyValue>
  onChange: (next: ReadonlyArray<KeyValue>) => void
  nameLabel: string
  ariaLabel: string
}) {
  const handleUpdate = (id: string, patch: Partial<KeyValue>) => {
    onChange(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)))
  }
  const handleRemove = (id: string) => {
    onChange(rows.filter((row) => row.id !== id))
  }
  return (
    <div className={styles.kvEditor} aria-label={ariaLabel}>
      <div className={[styles.kvRow, styles.kvHead].join(" ")}>
        <span>{nameLabel}</span>
        <span>Value</span>
        <span aria-hidden="true" />
      </div>
      {rows.map((row) => (
        <div key={row.id} className={styles.kvRow}>
          <input
            className={styles.kvInput}
            type="text"
            value={row.name}
            placeholder={nameLabel}
            spellCheck={false}
            autoComplete="off"
            onChange={(event) => handleUpdate(row.id, { name: event.target.value })}
          />
          <input
            className={styles.kvInput}
            type="text"
            value={row.value}
            placeholder="value"
            spellCheck={false}
            autoComplete="off"
            onChange={(event) => handleUpdate(row.id, { value: event.target.value })}
          />
          <button
            type="button"
            className={styles.kvRemove}
            onClick={() => handleRemove(row.id)}
            aria-label={`Remove ${row.name || "row"}`}
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" className={styles.kvAdd} onClick={() => onChange([...rows, newRow()])}>
        + Add row
      </button>
    </div>
  )
}

export function ApiExplorerPlayground({
  defaultMethod = "GET",
  defaultUrl = "https://api.muffler.men/v1/quotes",
  defaultParams = [],
  defaultHeaders = [
    { id: "h-1", name: "Authorization", value: "Bearer mufflermen_live_sk_…" },
    { id: "h-2", name: "Accept", value: "application/json" },
  ],
  defaultBody = "",
  response,
  onSend,
  className,
}: ApiExplorerPlaygroundProps) {
  const [method, setMethod] = useState<HttpMethod>(defaultMethod)
  const [url, setUrl] = useState(defaultUrl)
  const [params, setParams] = useState<ReadonlyArray<KeyValue>>(defaultParams)
  const [headers, setHeaders] = useState<ReadonlyArray<KeyValue>>(defaultHeaders)
  const [body, setBody] = useState(defaultBody)
  const [tab, setTab] = useState<"params" | "headers" | "body">("headers")
  const bodyId = useId()
  const classes = [styles.playground, className].filter(Boolean).join(" ")

  const handleSend = () => {
    onSend?.({ method, url, params, headers, body })
  }

  return (
    <section className={classes} aria-label="API explorer playground">
      <header className={styles.urlBar}>
        <label className={styles.methodSelectWrap}>
          <span className={styles.srOnly}>HTTP method</span>
          <select
            className={styles.methodSelect}
            value={method}
            onChange={(event) => setMethod(event.target.value as HttpMethod)}
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <input
          type="text"
          className={styles.urlInput}
          value={url}
          spellCheck={false}
          autoComplete="off"
          onChange={(event) => setUrl(event.target.value)}
          aria-label="Request URL"
        />
        <button type="button" className={styles.sendBtn} onClick={handleSend}>
          <Play size={13} strokeWidth={2.6} aria-hidden="true" />
          <span>Send</span>
        </button>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Request body">
        {(["params", "headers", "body"] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            className={[styles.tab, tab === value && styles.tabActive].filter(Boolean).join(" ")}
            onClick={() => setTab(value)}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        {tab === "params" && (
          <KeyValueEditor
            rows={params}
            onChange={setParams}
            nameLabel="Param"
            ariaLabel="Query parameters"
          />
        )}
        {tab === "headers" && (
          <KeyValueEditor
            rows={headers}
            onChange={setHeaders}
            nameLabel="Header"
            ariaLabel="Request headers"
          />
        )}
        {tab === "body" && (
          <div className={styles.bodyPane}>
            <label htmlFor={bodyId} className={styles.bodyLabel}>
              JSON body
            </label>
            <textarea
              id={bodyId}
              className={styles.bodyInput}
              value={body}
              spellCheck={false}
              onChange={(event) => setBody(event.target.value)}
              placeholder={'{\n  "registration": "ABC123",\n  "service": "muffler_swap"\n}'}
              rows={8}
            />
          </div>
        )}
      </div>

      <section className={styles.responsePane} aria-label="Response">
        <header className={styles.responseHead}>
          <span className={styles.responseLabel}>Response</span>
          {response ? (
            <div className={styles.responseMeta}>
              <HttpStatusChip code={response.status} />
              <span className={styles.duration}>{response.durationMs}ms</span>
            </div>
          ) : (
            <span className={styles.responsePlaceholder}>Send a request to see the response.</span>
          )}
        </header>
        {response && (
          <CodeBlock
            code={response.body}
            language="json"
            showLineNumbers
            maxHeight={280}
            fileName="response.json"
          />
        )}
      </section>
    </section>
  )
}

export default ApiExplorerPlayground
