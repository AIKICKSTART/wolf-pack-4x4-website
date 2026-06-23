import type { Metadata } from "next"

import {
  ConversationHeader,
  ConversationListRail,
  FileAttachmentBubble,
  ImageAttachmentBubble,
  MessageBubble,
  MessageGroup,
  PinnedMessageBar,
  ReadReceiptRow,
  ReplyComposer,
  ThreadReplyRow,
  TypingIndicator,
  UnreadDivider,
  VoiceMemoBubble,
} from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import {
  DEMO_CONVERSATIONS,
  DEMO_MEMO_WAVEFORM,
  DEMO_PINNED,
  DEMO_READ_RECEIPTS,
  DEMO_THREAD_SUMMARY,
  MENTION_CANDIDATES,
  PEOPLE,
} from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Full inbox scene | Inbox primitives",
  description:
    "Composition — full inbox scene combining list rail, header, pinned bar, threaded transcript with mixed media, unread divider, typing indicator, read receipts, and composer.",
}

export default function FullSceneInboxPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full scene"
        title="Full inbox scene"
        description="All inbox primitives composed into one Mufflermen workshop conversation. Mick Davis's Hilux quote thread, with bay tech updates, parts pickup confirmations, and a pinned reference strip up top."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Full scene" },
        ]}
      />

      <section className={styles.scene} aria-label="Inbox scene">
        <ConversationListRail
          conversations={DEMO_CONVERSATIONS}
          activeId="c-mick"
        />

        <div className={styles.sceneMain}>
          <ConversationHeader
            participant={PEOPLE.mick}
            subtitle="HILUX N80 / quote #4421"
          />

          <PinnedMessageBar pinned={DEMO_PINNED} />

          <div className={styles.sceneTranscript} role="log" aria-live="polite" aria-relevant="additions">
            <MessageGroup author={PEOPLE.mick} sender="other" timestamp="9:18a">
              <li>
                <MessageBubble
                  sender="other"
                  content="Morning lads — finally booked in for the stainless 3-inch upgrade. Got a couple of questions before I head down."
                  timestamp="9:18a"
                  authorName="Mick"
                />
              </li>
              <li>
                <MessageBubble
                  sender="other"
                  content="Will the system clear the Hilux factory diff drop?"
                  timestamp="9:19a"
                  authorName="Mick"
                />
              </li>
              <li>
                <ImageAttachmentBubble
                  sender="other"
                  alt="Underside of Mick's Hilux"
                  fileName="hilux-diff-drop.jpg"
                  fileSize="2.4 MB"
                  caption="Underbody — diff drop and stock hangers"
                />
              </li>
            </MessageGroup>

            <MessageGroup author={PEOPLE.sophie} sender="me" timestamp="9:21a">
              <li>
                <MessageBubble
                  sender="me"
                  content="Hi Mick — yes the 3-inch stainless system clears the factory diff drop with the spacer kit on your Toyota brackets."
                  timestamp="9:21a"
                  status="read"
                  reactions={[
                    {
                      id: "thumbs-up",
                      glyph: "👍",
                      label: "Thumbs up",
                      count: 1,
                    },
                  ]}
                />
              </li>
              <li>
                <FileAttachmentBubble
                  sender="me"
                  kind="pdf"
                  fileName="hilux-stainless-3in-quote.pdf"
                  fileSize="412 KB"
                  downloadHref="#"
                />
              </li>
            </MessageGroup>

            <ThreadReplyRow summary={DEMO_THREAD_SUMMARY} />

            <ReadReceiptRow receipts={DEMO_READ_RECEIPTS} />

            <UnreadDivider count={2} />

            <MessageGroup author={PEOPLE.jordan} sender="other" timestamp="9:31a">
              <li>
                <MessageBubble
                  sender="other"
                  content="Bay 2 hoist is open — pulled the LS out of the Falcon shell already. Want me to start on Mick's Hilux this morning?"
                  timestamp="9:31a"
                  authorName="Jordan"
                />
              </li>
            </MessageGroup>

            <MessageGroup author={PEOPLE.mick} sender="other" timestamp="9:42a">
              <li>
                <VoiceMemoBubble
                  sender="other"
                  samples={DEMO_MEMO_WAVEFORM}
                  progress={0.36}
                  duration="0:38"
                  caption="Quick walkaround of underbody"
                  authorName="Mick"
                />
              </li>
              <li>
                <MessageBubble
                  sender="other"
                  content="@Verridian Ops — and the rear muffler, will it tuck under above the tow bar?"
                  timestamp="9:43a"
                  authorName="Mick"
                />
              </li>
            </MessageGroup>

            <TypingIndicator author={PEOPLE.mick} />
          </div>

          <ReplyComposer
            participantName="Mick Davis"
            mentionCandidates={MENTION_CANDIDATES}
          />
        </div>
      </section>
    </main>
  )
}
