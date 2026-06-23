"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { HttpStatusChip } from "../api-console/http-status-chip"
import {
  formatDuration,
  type HttpMethod,
  type TryItHistoryEntry,
} from "./api-explorer-types"

import styles from "./try-it-history-row.module.css"

interface TryItHistoryRowProps extends TryItHistoryEntry {
  /** Click handler — when omitted the row is non-interactive. */
  onReplay?: (id: string) => void
  className?: string
}

const METHOD_CLASS: Record<HttpMethod, string> = {
  GET: styles.methodGet,
  POST: styles.methodPost,
  PUT: styles.methodPut,
  PATCH: styles.methodPatch,
  DELETE: styles.methodDelete,
  HEAD: styles.methodHead,
  OPTIONS: styles.methodOptions,
}

export function TryItHistoryRow({
  id,
  method,
  path,
  status,
  durationMs,
  timestamp,
  curl,
  onReplay,
  className,
}: TryItHistoryRowProps) {
  const [copied, setCopied] = useState(false)
  const classes = [styles.row, className].filter(Boolean).join(" ")

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(curl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article className={classes} aria-label={`Recent ${method} ${path} request`}>
      <span className={styles.timestamp}>{timestamp}</span>
      <span className={[styles.method, METHOD_CLASS[method]].join(" ")}>{method}</span>
      <code className={styles.path}>{path}</code>
      <HttpStatusChip code={status} compact />
      <span className={styles.duration} aria-label={`Duration ${formatDuration(durationMs)}`}>
        {formatDuration(durationMs)}
      </span>
      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ""}`}
          onClick={handleCopy}
          aria-label={copied ? "Copied cURL" : "Copy cURL command"}
        >
          {copied ? (
            <Check size={11} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Copy size={11} strokeWidth={2.4} aria-hidden="true" />
          )}
          <span>{copied ? "Copied" : "cURL"}</span>
        </button>
        {onReplay && (
          <button
            type="button"
            className={styles.replayBtn}
            onClick={() => onReplay(id)}
            aria-label={`Replay request ${id}`}
          >
            Replay
          </button>
        )}
      </div>
    </article>
  )
}

export default TryItHistoryRow
