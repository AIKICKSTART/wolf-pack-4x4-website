import {
  CHANNEL_GLYPH,
  CHANNEL_LABEL,
  CHANNEL_TONE,
  type UnifiedChannel,
  type UnifiedThreadMessage,
} from "./unified-inbox-types"
import styles from "./conversation-thread-view.module.css"

interface ConversationThreadViewProps {
  /** Conversation channel — sets the contextual chip + bubble accents. */
  channel: UnifiedChannel
  /** Conversation subject line. */
  subject: string
  /** Customer display name. */
  customerName: string
  /** Optional contact (email / phone) shown in the header. */
  customerContact?: string
  /** Ordered message list. */
  messages: ReadonlyArray<UnifiedThreadMessage>
  className?: string
}

export function ConversationThreadView({
  channel,
  subject,
  customerName,
  customerContact,
  messages,
  className,
}: ConversationThreadViewProps) {
  const classes = [styles.thread, className].filter(Boolean).join(" ")
  const channelLabel = CHANNEL_LABEL[channel]
  const channelTone = CHANNEL_TONE[channel]
  const channelGlyph = CHANNEL_GLYPH[channel]

  return (
    <section
      className={classes}
      aria-label={`Thread with ${customerName} on ${channelLabel}`}
    >
      <header className={styles.head}>
        <div
          className={[styles.channelTag, styles[`tone_${channelTone}`]]
            .filter(Boolean)
            .join(" ")}
          aria-label={`Channel: ${channelLabel}`}
        >
          <span className={styles.channelGlyph} aria-hidden="true">
            {channelGlyph}
          </span>
          <span>{channelLabel}</span>
        </div>
        <div className={styles.headBody}>
          <h3 className={styles.subject}>{subject}</h3>
          <span className={styles.headMeta}>
            <span className={styles.customerName}>{customerName}</span>
            {customerContact ? (
              <span className={styles.contact}>· {customerContact}</span>
            ) : null}
          </span>
        </div>
      </header>

      <ol className={styles.stream} aria-label="Messages">
        {messages.map((message) => {
          const isOutbound = message.direction === "outbound"
          const tone = CHANNEL_TONE[message.channel ?? channel]
          return (
            <li
              key={message.id}
              className={[
                styles.row,
                isOutbound ? styles.rowOutbound : styles.rowInbound,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <article
                className={[
                  styles.bubble,
                  isOutbound ? styles.bubbleOutbound : styles.bubbleInbound,
                  styles[`tone_${tone}`],
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`${message.authorName} message`}
              >
                <header className={styles.bubbleHead}>
                  <span className={styles.bubbleAuthor}>
                    {message.authorName}
                  </span>
                  {message.channel && message.channel !== channel ? (
                    <span
                      className={styles.bubbleChannelTag}
                      aria-label={`Sent via ${CHANNEL_LABEL[message.channel]}`}
                    >
                      via {CHANNEL_LABEL[message.channel]}
                    </span>
                  ) : null}
                </header>
                <p className={styles.body}>{message.body}</p>
                <footer className={styles.bubbleFoot}>
                  <time className={styles.timestamp}>{message.timestamp}</time>
                  {isOutbound ? (
                    <span
                      className={styles.readState}
                      aria-label={message.read ? "Read" : "Delivered"}
                    >
                      {message.read ? "Read" : "Delivered"}
                    </span>
                  ) : null}
                </footer>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default ConversationThreadView
