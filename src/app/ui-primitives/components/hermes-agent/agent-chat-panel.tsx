import { Bot, Sparkles } from "lucide-react"
import type { ReactNode } from "react"

import { ChatThread } from "../ai/chat-thread"
import { UserMessageBubble } from "../ai/user-message-bubble"
import { AssistantMessageBubble } from "../ai/assistant-message-bubble"
import { CitationPill } from "../ai/citation-pill"
import { StreamingIndicator } from "../ai/streaming-indicator"
import { ToolCallCard } from "../ai/tool-call-card"
import type { ToolCallStatus } from "../ai/tool-call-card"
import { PromptInput } from "../ai/prompt-input"
import { Chip } from "../primitives/chip"
import {
  CHANNEL_LABEL,
  CHANNEL_TONE,
  type HermesChannel,
  type HermesToolName,
  TOOL_LABEL,
} from "./hermes-agent-types"
import styles from "./agent-chat-panel.module.css"

export interface AgentChatCitation {
  index: number
  title: string
  url: string
  snippet?: string
}

export interface AgentChatToolTrace {
  toolName: HermesToolName
  status: ToolCallStatus
  inputJson: string
  outputJson?: string
  durationMs?: number
}

export type AgentChatTurn =
  | {
      kind: "customer"
      id: string
      authorName: string
      content: ReactNode
      timestamp: string
    }
  | {
      kind: "agent"
      id: string
      content: ReactNode
      timestamp: string
      streaming?: boolean
      citations?: ReadonlyArray<AgentChatCitation>
      toolTraces?: ReadonlyArray<AgentChatToolTrace>
    }

interface AgentChatPanelProps {
  customerName: string
  customerMeta: string
  channels: ReadonlyArray<HermesChannel>
  turns: ReadonlyArray<AgentChatTurn>
  /** Suggested follow-up prompts inserted above the composer. */
  suggestedPrompts?: ReadonlyArray<string>
  /** Show the read-only Hermes notice above the composer. */
  readOnlyNotice?: string
  className?: string
}

function ToolTraceList({
  traces,
}: {
  traces: ReadonlyArray<AgentChatToolTrace>
}) {
  return (
    <div className={styles.toolTrace} aria-label="Tool call trace">
      <span className={styles.toolTraceLabel}>
        <Sparkles size={11} strokeWidth={2.2} aria-hidden="true" />
        Tool trace · {traces.length} call{traces.length === 1 ? "" : "s"}
      </span>
      {traces.map((trace, idx) => (
        <ToolCallCard
          key={`${trace.toolName}-${idx}`}
          toolName={TOOL_LABEL[trace.toolName]}
          status={trace.status}
          inputJson={trace.inputJson}
          outputJson={trace.outputJson}
          durationMs={trace.durationMs}
        />
      ))}
    </div>
  )
}

export function AgentChatPanel({
  customerName,
  customerMeta,
  channels,
  turns,
  suggestedPrompts,
  readOnlyNotice,
  className,
}: AgentChatPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Hermes conversation with ${customerName}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.crest} aria-hidden="true">
            <Bot size={18} strokeWidth={2.2} />
          </span>
          <div className={styles.identityText}>
            <h3 className={styles.name}>Hermes · {customerName}</h3>
            <span className={styles.subtitle}>{customerMeta}</span>
          </div>
        </div>
        <div className={styles.channelChips} aria-label="Wired channels">
          {channels.map((channel) => (
            <Chip
              key={channel}
              label={CHANNEL_LABEL[channel]}
              tone={CHANNEL_TONE[channel]}
            />
          ))}
        </div>
        <div className={styles.meta}>
          <span>v1.4 · gpt-4o-mini</span>
        </div>
      </header>

      <div className={styles.thread}>
        <ChatThread ariaLabel={`Conversation with ${customerName}`}>
          {turns.map((turn) => {
            if (turn.kind === "customer") {
              return (
                <UserMessageBubble
                  key={turn.id}
                  authorName={turn.authorName}
                  timestamp={turn.timestamp}
                >
                  {turn.content}
                </UserMessageBubble>
              )
            }
            const citations = turn.citations ?? []
            const traces = turn.toolTraces ?? []
            return (
              <AssistantMessageBubble
                key={turn.id}
                authorName="Hermes"
                modelName="gpt-4o-mini"
                timestamp={turn.timestamp}
                streaming={turn.streaming}
                citations={
                  citations.length > 0 ? (
                    <div className={styles.citationRow}>
                      {citations.map((citation) => (
                        <CitationPill
                          key={citation.index}
                          index={citation.index}
                          title={citation.title}
                          url={citation.url}
                          snippet={citation.snippet}
                        />
                      ))}
                    </div>
                  ) : null
                }
              >
                {turn.content}
                {turn.streaming ? (
                  <span style={{ marginInlineStart: 6 }}>
                    <StreamingIndicator label="Hermes is composing" />
                  </span>
                ) : null}
                {traces.length > 0 ? <ToolTraceList traces={traces} /> : null}
              </AssistantMessageBubble>
            )
          })}
        </ChatThread>
      </div>

      <div className={styles.composer}>
        {readOnlyNotice ? (
          <div className={styles.composerHint}>
            <span className={styles.notice}>{readOnlyNotice}</span>
          </div>
        ) : null}
        {suggestedPrompts && suggestedPrompts.length > 0 ? (
          <div className={styles.composerHint}>
            {suggestedPrompts.map((prompt) => (
              <Chip key={prompt} label={prompt} tone="teal" />
            ))}
          </div>
        ) : null}
        <PromptInput
          placeholder={`Reply as Hermes to ${customerName}…`}
          maxLength={1200}
        />
      </div>
    </section>
  )
}

export default AgentChatPanel
