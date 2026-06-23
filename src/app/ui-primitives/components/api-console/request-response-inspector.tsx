import { CodeBlock } from "../primitives/code-block"
import { HttpStatusChip } from "./http-status-chip"
import type { HttpMethod, HttpStatusCode } from "./api-console-types"

import styles from "./request-response-inspector.module.css"

export interface InspectorHeader {
  name: string
  value: string
}

export interface InspectorRequest {
  method: HttpMethod
  url: string
  headers: ReadonlyArray<InspectorHeader>
  /** JSON body or empty string for no body. */
  body: string
  /** Optional language hint for the body block. Defaults to "json". */
  bodyLanguage?: string
}

export interface InspectorResponse {
  status: HttpStatusCode | number
  durationMs: number
  headers: ReadonlyArray<InspectorHeader>
  body: string
  bodyLanguage?: string
}

interface RequestResponseInspectorProps {
  request: InspectorRequest
  response: InspectorResponse
  className?: string
}

function HeaderTable({ headers, ariaLabel }: { headers: ReadonlyArray<InspectorHeader>; ariaLabel: string }) {
  return (
    <div className={styles.headers} role="table" aria-label={ariaLabel}>
      <div role="row" className={styles.headerRow}>
        <span role="columnheader">Name</span>
        <span role="columnheader">Value</span>
      </div>
      {headers.map((header) => (
        <div role="row" className={styles.headerRow} key={`${header.name}-${header.value}`}>
          <span role="cell" className={styles.headerName}>
            {header.name}
          </span>
          <span role="cell" className={styles.headerValue}>
            {header.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function RequestResponseInspector({
  request,
  response,
  className,
}: RequestResponseInspectorProps) {
  const classes = [styles.inspector, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Request response inspector">
      <article className={styles.pane}>
        <header className={styles.paneHead}>
          <span className={styles.paneLabel}>Request</span>
          <div className={styles.urlLine}>
            <span className={[styles.method, styles[`method-${request.method.toLowerCase()}`]].join(" ")}>
              {request.method}
            </span>
            <code className={styles.url}>{request.url}</code>
          </div>
        </header>
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Headers</span>
          <HeaderTable headers={request.headers} ariaLabel="Request headers" />
        </div>
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Body</span>
          {request.body.length === 0 ? (
            <span className={styles.emptyBody}>No body</span>
          ) : (
            <CodeBlock
              code={request.body}
              language={request.bodyLanguage ?? "json"}
              maxHeight={260}
              showLineNumbers
            />
          )}
        </div>
      </article>

      <article className={styles.pane}>
        <header className={styles.paneHead}>
          <span className={styles.paneLabel}>Response</span>
          <div className={styles.urlLine}>
            <HttpStatusChip code={response.status} />
            <span className={styles.duration}>{response.durationMs}ms</span>
          </div>
        </header>
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Headers</span>
          <HeaderTable headers={response.headers} ariaLabel="Response headers" />
        </div>
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Body</span>
          {response.body.length === 0 ? (
            <span className={styles.emptyBody}>No body</span>
          ) : (
            <CodeBlock
              code={response.body}
              language={response.bodyLanguage ?? "json"}
              maxHeight={260}
              showLineNumbers
            />
          )}
        </div>
      </article>
    </section>
  )
}

export default RequestResponseInspector
