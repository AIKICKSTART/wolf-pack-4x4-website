import {
  CHANNEL_GLYPH,
  CHANNEL_LABEL,
  CHANNEL_TONE,
  VISIBILITY_LABEL,
  VISIBILITY_TONE,
  type NoteVisibility,
  type SupportChannel,
  type SupportTone,
} from "./support-types"
import styles from "./support-conversation-thread.module.css"

export interface SupportConversationEntry {
  id: string
  author: string
  /** Optional role badge, e.g. "Workshop · Bay 2", "Customer". */
  role?: string
  /** Human timestamp, e.g. "Today · 10:42 AEST". */
  timestamp: string
  body: string
  channel: SupportChannel
  visibility: NoteVisibility
}

export interface SupportConversationThreadProps {
  ticketSubject: string
  ticketId: string
  entries: ReadonlyArray<SupportConversationEntry>
  className?: string
}

const TONE_CLASS: Record<SupportTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

export function SupportConversationThread({
  ticketSubject,
  ticketId,
  entries,
  className,
}: SupportConversationThreadProps) {
  const classes = [styles.thread, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Support conversation for ticket ${ticketId} — ${ticketSubject}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Conversation · {ticketId}</span>
        <h3 className={styles.title}>{ticketSubject}</h3>
      </header>

      <ol className={styles.list}>
        {entries.map((entry) => {
          const visibilityTone = VISIBILITY_TONE[entry.visibility]
          const channelTone = CHANNEL_TONE[entry.channel]
          const isInternal = entry.visibility === "internal"
          return (
            <li key={entry.id} className={styles.item}>
              <article
                className={[
                  styles.entry,
                  isInternal ? styles.internal : styles.public,
                  TONE_CLASS[visibilityTone],
                ].join(" ")}
              >
                <header className={styles.entryHead}>
                  <span className={styles.author}>
                    {entry.author}
                    {entry.role ? (
                      <span className={styles.role}>{entry.role}</span>
                    ) : null}
                  </span>
                  <span className={styles.entryMeta}>
                    <span
                      className={[styles.channelChip, TONE_CLASS[channelTone]].join(" ")}
                      aria-label={`Channel: ${CHANNEL_LABEL[entry.channel]}`}
                    >
                      <span className={styles.channelGlyph} aria-hidden="true">
                        {CHANNEL_GLYPH[entry.channel]}
                      </span>
                      {CHANNEL_LABEL[entry.channel]}
                    </span>
                    <span
                      className={[styles.visibilityChip, TONE_CLASS[visibilityTone]].join(" ")}
                    >
                      {VISIBILITY_LABEL[entry.visibility]}
                    </span>
                    <time className={styles.timestamp}>{entry.timestamp}</time>
                  </span>
                </header>
                <p className={styles.body}>{entry.body}</p>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default SupportConversationThread
