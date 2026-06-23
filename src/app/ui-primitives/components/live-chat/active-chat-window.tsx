import { Info, MoreHorizontal, Pin } from "lucide-react"
import type { ReactNode } from "react"

import { MessageBubble } from "../inbox/message-bubble"
import { TypingIndicator } from "../inbox/typing-indicator"
import { ReplyComposer } from "../inbox/reply-composer"
import type {
  InboxPerson,
  MessageReaction,
  MessageSender,
  MessageStatus,
} from "../inbox/inbox-types"

import styles from "./active-chat-window.module.css"

export interface ActiveChatMessage {
  id: string
  sender: MessageSender
  authorName: string
  content: ReactNode
  timestamp: string
  status?: MessageStatus
  reactions?: ReadonlyArray<MessageReaction>
}

interface ActiveChatWindowProps {
  /** Visitor display name. */
  visitorName: string
  /** Short identifier such as IP region + device. */
  visitorMeta: string
  /** Full message list rendered as bubbles. */
  messages: ReadonlyArray<ActiveChatMessage>
  /** Optional typing indicator participant. */
  typingPerson?: InboxPerson
  /** Mention candidates for composer @ handling. */
  mentionCandidates?: ReadonlyArray<InboxPerson>
  /** Composer submit callback. */
  onSend?: (value: string) => void
  className?: string
}

export function ActiveChatWindow({
  visitorName,
  visitorMeta,
  messages,
  typingPerson,
  mentionCandidates,
  onSend,
  className,
}: ActiveChatWindowProps) {
  const classes = [styles.window, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Active chat with ${visitorName}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <h3 className={styles.name}>{visitorName}</h3>
          <span className={styles.meta}>
            <span className={styles.metaDot} aria-hidden="true" />
            <span>{visitorMeta}</span>
          </span>
        </div>
        <div />
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            aria-label="Pin this chat"
          >
            <Pin size={14} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            aria-label="View chat info"
          >
            <Info size={14} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            aria-label="More options"
          >
            <MoreHorizontal size={14} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        className={styles.thread}
        aria-label={`Conversation transcript with ${visitorName}`}
      >
        {messages.length === 0 ? (
          <p className={styles.empty}>
            No messages yet. Greet {visitorName} and ask what they need.
          </p>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              sender={message.sender}
              content={message.content}
              timestamp={message.timestamp}
              status={message.status}
              authorName={message.authorName}
              reactions={message.reactions}
              showReactionTray={false}
            />
          ))
        )}
        {typingPerson ? <TypingIndicator author={typingPerson} /> : null}
      </div>

      <div className={styles.composer}>
        <ReplyComposer
          participantName={visitorName}
          mentionCandidates={mentionCandidates}
          onSend={onSend}
        />
      </div>
    </section>
  )
}

export default ActiveChatWindow
