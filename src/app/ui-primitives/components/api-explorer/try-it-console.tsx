"use client"

import { Play, Plus, X } from "lucide-react"
import { useId, useState } from "react"

import type { HttpMethod } from "./api-explorer-types"

import styles from "./try-it-console.module.css"

interface KeyValue {
  id: string
  name: string
  value: string
}

export interface TryItRequest {
  method: HttpMethod
  url: string
  params: ReadonlyArray<KeyValue>
  headers: ReadonlyArray<KeyValue>
  body: string
}

interface TryItConsoleProps {
  defaultMethod?: HttpMethod
  defaultUrl?: string
  defaultParams?: ReadonlyArray<KeyValue>
  defaultHeaders?: ReadonlyArray<KeyValue>
  defaultBody?: string
  /** Disables the send button (e.g. while a request is in flight). */
  sending?: boolean
  onSend?: (request: TryItRequest) => void
  className?: string
}

const METHODS: ReadonlyArray<HttpMethod> = ["GET", "POST", "PUT", "PATCH", "DELETE"]

function makeRow(): KeyValue {
  return {
    id: `kv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    value: "",
  }
}

interface KeyValueEditorProps {
  rows: ReadonlyArray<KeyValue>
  onChange: (next: ReadonlyArray<KeyValue>) => void
  nameLabel: string
  ariaLabel: string
}

function KeyValueEditor({ rows, onChange, nameLabel, ariaLabel }: KeyValueEditorProps) {
  const update = (id: string, patch: Partial<KeyValue>) => {
    onChange(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)))
  }
  const remove = (id: string) => {
    onChange(rows.filter((row) => row.id !== id))
  }
  return (
    <div className={styles.kv} aria-label={ariaLabel}>
      <div className={`${styles.kvRow} ${styles.kvHead}`}>
        <span>{nameLabel}</span>
        <span>Value</span>
        <span aria-hidden="true" />
      </div>
      {rows.length === 0 && (
        <p className={styles.kvEmpty}>No {nameLabel.toLowerCase()}s yet — add one below.</p>
      )}
      {rows.map((row) => (
        <div key={row.id} className={styles.kvRow}>
          <input
            type="text"
            className={styles.kvInput}
            value={row.name}
            placeholder={nameLabel}
            spellCheck={false}
            autoComplete="off"
            aria-label={`${nameLabel} name`}
            onChange={(event) => update(row.id, { name: event.target.value })}
          />
          <input
            type="text"
            className={styles.kvInput}
            value={row.value}
            placeholder="value"
            spellCheck={false}
            autoComplete="off"
            aria-label={`${nameLabel} value`}
            onChange={(event) => update(row.id, { value: event.target.value })}
          />
          <button
            type="button"
            className={styles.kvRemove}
            onClick={() => remove(row.id)}
            aria-label={`Remove ${row.name || nameLabel}`}
          >
            <X size={12} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
      ))}
      <button
        type="button"
        className={styles.kvAdd}
        onClick={() => onChange([...rows, makeRow()])}
      >
        <Plus size={12} strokeWidth={2.4} aria-hidden="true" />
        Add row
      </button>
    </div>
  )
}

type Tab = "params" | "headers" | "body"

export function TryItConsole({
  defaultMethod = "POST",
  defaultUrl = "https://api.muffler.men/v1/quotes",
  defaultParams = [],
  defaultHeaders = [
    {
      id: "h-auth",
      name: "Authorization",
      value: "Bearer mfm_live_sk_…7af2",
    },
    { id: "h-accept", name: "Accept", value: "application/json" },
    { id: "h-ctype", name: "Content-Type", value: "application/json" },
  ],
  defaultBody = "",
  sending = false,
  onSend,
  className,
}: TryItConsoleProps) {
  const [method, setMethod] = useState<HttpMethod>(defaultMethod)
  const [url, setUrl] = useState(defaultUrl)
  const [params, setParams] = useState<ReadonlyArray<KeyValue>>(defaultParams)
  const [headers, setHeaders] = useState<ReadonlyArray<KeyValue>>(defaultHeaders)
  const [body, setBody] = useState(defaultBody)
  const [tab, setTab] = useState<Tab>("headers")
  const bodyId = useId()
  const classes = [styles.console, className].filter(Boolean).join(" ")

  const send = () => {
    onSend?.({ method, url, params, headers, body })
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    send()
  }

  return (
    <form
      className={classes}
      role="form"
      aria-label="Try-it request builder"
      onSubmit={handleFormSubmit}
    >
      <div className={styles.urlBar}>
        <label className={styles.methodWrap}>
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
          aria-label="Request URL"
          onChange={(event) => setUrl(event.target.value)}
        />
        <button type="submit" className={styles.sendBtn} disabled={sending}>
          <Play size={13} strokeWidth={2.6} aria-hidden="true" />
          <span>{sending ? "Sending…" : "Send"}</span>
        </button>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Request configuration">
        {(["params", "headers", "body"] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            id={`try-tab-${value}`}
            aria-controls={`try-panel-${value}`}
            aria-selected={tab === value}
            className={`${styles.tab} ${tab === value ? styles.tabActive : ""}`}
            onClick={() => setTab(value)}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        ))}
      </div>

      <div
        className={styles.panel}
        role="tabpanel"
        id={`try-panel-${tab}`}
        aria-labelledby={`try-tab-${tab}`}
      >
        {tab === "params" && (
          <KeyValueEditor
            rows={params}
            onChange={setParams}
            nameLabel="Param"
            ariaLabel="Query parameters editor"
          />
        )}
        {tab === "headers" && (
          <KeyValueEditor
            rows={headers}
            onChange={setHeaders}
            nameLabel="Header"
            ariaLabel="Request headers editor"
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
              placeholder={'{\n  "registration": "OAK-194",\n  "service": "muffler_swap"\n}'}
              onChange={(event) => setBody(event.target.value)}
              rows={8}
            />
          </div>
        )}
      </div>
    </form>
  )
}

export default TryItConsole
