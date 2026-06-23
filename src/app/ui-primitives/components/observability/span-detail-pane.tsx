import { GlassSurface } from "../surfaces/glass-surface"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import type { StatusTone } from "../status-page/status-types"

import {
  SEVERITY_TONE,
  type Severity,
  type SpanKind,
} from "./observability-types"
import styles from "./span-detail-pane.module.css"

export interface SpanLinkedLog {
  id: string
  /** Pre-formatted log line. */
  message: string
  severity: Severity
}

export interface SpanDetailPaneProps {
  /** Trace ID for the span. */
  traceId: string
  /** Span ID. */
  spanId: string
  /** Operation name, e.g. "POST /quotes". */
  operation: string
  /** Service producing the span. */
  service: string
  /** Span kind. */
  kind: SpanKind
  /** Duration in ms. */
  durationMs: number
  /** Optional error message. */
  errorMessage?: string
  /** Free-form tag key-values. */
  tags: Readonly<Record<string, string>>
  /** Linked log lines correlated to this span. */
  linkedLogs?: ReadonlyArray<SpanLinkedLog>
  className?: string
}

const TONE_CHIP: Record<StatusTone, ChipTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
  violet: "teal",
}

const KIND_LABEL: Record<SpanKind, string> = {
  server: "Server",
  client: "Client",
  internal: "Internal",
  producer: "Producer",
  consumer: "Consumer",
}

export function SpanDetailPane({
  traceId,
  spanId,
  operation,
  service,
  kind,
  durationMs,
  errorMessage,
  tags,
  linkedLogs,
  className,
}: SpanDetailPaneProps) {
  const classes = [styles.pane, className].filter(Boolean).join(" ")
  const hasError = Boolean(errorMessage)

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <article aria-label={`Span detail — ${operation}`}>
        <header className={styles.head}>
          <div className={styles.identity}>
            <span className={styles.kind}>{KIND_LABEL[kind]}</span>
            <h3 className={styles.operation}>{operation}</h3>
            <span className={styles.service}>{service}</span>
          </div>
          <div className={styles.headMeta}>
            <span className={styles.duration}>
              {durationMs}
              <em className={styles.durationUnit}>ms</em>
            </span>
            {hasError ? (
              <Chip label="Error" tone="red" selected />
            ) : (
              <Chip label="OK" tone="green" selected />
            )}
          </div>
        </header>

        <dl className={styles.ids}>
          <div className={styles.idCell}>
            <dt className={styles.idLabel}>Trace ID</dt>
            <dd className={styles.idValue}>{traceId}</dd>
          </div>
          <div className={styles.idCell}>
            <dt className={styles.idLabel}>Span ID</dt>
            <dd className={styles.idValue}>{spanId}</dd>
          </div>
        </dl>

        {hasError ? (
          <div className={styles.error} role="alert">
            <span className={styles.errorLabel}>Error</span>
            <span className={styles.errorMessage}>{errorMessage}</span>
          </div>
        ) : null}

        <section className={styles.tagsSection} aria-label="Span tags">
          <h4 className={styles.sectionTitle}>Tags</h4>
          <ul className={styles.tagsList}>
            {Object.entries(tags).map(([k, v]) => (
              <li key={k} className={styles.tag}>
                <span className={styles.tagKey}>{k}</span>
                <span className={styles.tagValue}>{v}</span>
              </li>
            ))}
          </ul>
        </section>

        {linkedLogs && linkedLogs.length > 0 ? (
          <section className={styles.logsSection} aria-label="Linked logs">
            <h4 className={styles.sectionTitle}>Linked logs</h4>
            <ul className={styles.logsList}>
              {linkedLogs.map((log) => (
                <li key={log.id} className={styles.logRow}>
                  <Chip
                    label={log.severity.toUpperCase()}
                    tone={TONE_CHIP[SEVERITY_TONE[log.severity]]}
                  />
                  <span className={styles.logMessage}>{log.message}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </GlassSurface>
  )
}

export default SpanDetailPane
