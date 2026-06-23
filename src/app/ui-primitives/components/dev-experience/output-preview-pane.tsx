"use client"

import { useId, useState } from "react"

import {
  OUTPUT_STREAM_LABEL,
  type OutputStream,
} from "./dev-experience-types"
import styles from "./output-preview-pane.module.css"

export interface OutputStreamSample {
  stream: OutputStream
  /** Stream content — printed verbatim inside a <pre>. */
  content: string
  /** Optional badge label, e.g. "200 OK" for network, "ms" for stdout. */
  badge?: string
}

export interface OutputPreviewPaneProps {
  /** Streams shown in the tab list. */
  streams: ReadonlyArray<OutputStreamSample>
  /** Default selected stream. */
  defaultStream?: OutputStream
  /** Optional className passthrough. */
  className?: string
}

const TONE_CLASS: Record<OutputStream, string> = {
  stdout: styles.toneStdout,
  stderr: styles.toneStderr,
  network: styles.toneNetwork,
  json: styles.toneJson,
}

export function OutputPreviewPane({
  streams,
  defaultStream,
  className,
}: OutputPreviewPaneProps) {
  const initial = defaultStream ?? streams[0]?.stream ?? "stdout"
  const [active, setActive] = useState<OutputStream>(initial)
  const tablistId = useId()
  const current = streams.find((s) => s.stream === active) ?? streams[0]
  const classes = [styles.pane, className].filter(Boolean).join(" ")

  if (!current) {
    return null
  }

  return (
    <section className={classes} aria-label="Output preview">
      <div
        className={styles.tablist}
        role="tablist"
        aria-label="Output stream"
        id={tablistId}
      >
        {streams.map((sample) => {
          const selected = sample.stream === active
          return (
            <button
              key={sample.stream}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tablistId}-${sample.stream}`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${TONE_CLASS[sample.stream]} ${
                selected ? styles.tabActive : ""
              }`}
              onClick={() => setActive(sample.stream)}
            >
              <span className={styles.tabLabel}>
                {OUTPUT_STREAM_LABEL[sample.stream]}
              </span>
              {sample.badge ? (
                <span className={styles.tabBadge}>{sample.badge}</span>
              ) : null}
            </button>
          )
        })}
      </div>
      <pre
        role="tabpanel"
        id={`${tablistId}-${current.stream}`}
        aria-label={`${OUTPUT_STREAM_LABEL[current.stream]} output`}
        className={`${styles.panel} ${TONE_CLASS[current.stream]}`}
      >
        {current.content}
      </pre>
    </section>
  )
}

export default OutputPreviewPane
