import { FileText, Quote } from "lucide-react"

import { Chip } from "../primitives/chip"
import { CitationPill } from "../ai/citation-pill"
import {
  CHANNEL_LABEL,
  CHANNEL_TONE,
  TOOL_LABEL,
  type HermesChannel,
  type HermesToolName,
} from "./hermes-agent-types"
import styles from "./transcript-viewer.module.css"

export type TranscriptSpeaker = "customer" | "agent" | "tool" | "system"

export interface TranscriptCitation {
  index: number
  title: string
  url: string
  snippet?: string
}

export interface TranscriptToolPayload {
  toolName: HermesToolName
  inputJson: string
  outputJson?: string
}

export interface TranscriptTurn {
  id: string
  speaker: TranscriptSpeaker
  /** Display name for the speaker. */
  authorName: string
  /** Timestamp, e.g. "10:14:32 AM". */
  timestamp: string
  /** Body of the message. */
  text: string
  citations?: ReadonlyArray<TranscriptCitation>
  tool?: TranscriptToolPayload
}

interface TranscriptViewerProps {
  /** Conversation ID label. */
  conversationId: string
  customerName: string
  channel: HermesChannel
  /** Display duration label, e.g. "8m 14s". */
  duration: string
  /** Final outcome chip label. */
  outcomeLabel: string
  turns: ReadonlyArray<TranscriptTurn>
  className?: string
}

const SPEAKER_LABEL: Record<TranscriptSpeaker, string> = {
  customer: "Customer",
  agent: "Hermes",
  tool: "Tool",
  system: "System",
}

const SPEAKER_COLOR: Record<TranscriptSpeaker, string> = {
  customer: "var(--primitive-teal)",
  agent: "var(--primitive-red)",
  tool: "var(--hermes-violet)",
  system: "var(--primitive-muted)",
}

export function TranscriptViewer({
  conversationId,
  customerName,
  channel,
  duration,
  outcomeLabel,
  turns,
  className,
}: TranscriptViewerProps) {
  const classes = [styles.viewer, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      role="region"
      aria-label={`Transcript ${conversationId}`}
    >
      <header className={styles.head}>
        <div>
          <h3 className={styles.title}>
            <FileText
              size={13}
              strokeWidth={2.4}
              aria-hidden="true"
              style={{ marginInlineEnd: 6 }}
            />
            {customerName} · {conversationId}
          </h3>
          <span className={styles.kicker}>
            Duration · {duration} · {turns.length} turns
          </span>
        </div>
        <div className={styles.meta}>
          <Chip
            label={CHANNEL_LABEL[channel]}
            tone={CHANNEL_TONE[channel]}
          />
          <Chip label={outcomeLabel} tone="green" />
        </div>
      </header>

      <ol className={styles.list} aria-label="Transcript turns">
        {turns.map((turn) => (
          <li
            key={turn.id}
            className={styles.turn}
            data-speaker={turn.speaker}
          >
            <div className={styles.turnTime}>
              <span>{turn.timestamp}</span>
              <span>{turn.id}</span>
            </div>
            <div className={styles.turnBody}>
              <span
                className={styles.speaker}
                style={{ color: SPEAKER_COLOR[turn.speaker] }}
              >
                <span className={styles.speakerDot} aria-hidden="true" />
                {SPEAKER_LABEL[turn.speaker]} · {turn.authorName}
              </span>
              <p className={styles.text}>{turn.text}</p>
              {turn.tool ? (
                <details className={styles.expandable}>
                  <summary>
                    <Quote
                      size={11}
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                    Expand tool call · {TOOL_LABEL[turn.tool.toolName]}
                  </summary>
                  <div className={styles.expandableBody}>
                    <strong>Input</strong>
                    {"\n"}
                    {turn.tool.inputJson}
                    {turn.tool.outputJson ? (
                      <>
                        {"\n\n"}
                        <strong>Output</strong>
                        {"\n"}
                        {turn.tool.outputJson}
                      </>
                    ) : null}
                  </div>
                </details>
              ) : null}
              {turn.citations && turn.citations.length > 0 ? (
                <div className={styles.citations}>
                  {turn.citations.map((citation) => (
                    <CitationPill
                      key={citation.index}
                      index={citation.index}
                      title={citation.title}
                      url={citation.url}
                      snippet={citation.snippet}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <footer className={styles.footer}>
        <span className={styles.kicker}>Read-only · transcript snapshot</span>
        <span className={styles.kicker}>v1 · Hermes 1.4 · gpt-4o-mini</span>
      </footer>
    </section>
  )
}

export default TranscriptViewer
