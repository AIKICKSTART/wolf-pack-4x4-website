import type { Metadata } from "next"

import { MessageBubble } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Message bubble | Inbox primitives",
  description:
    "Primitive 03 — single message bubble for human messaging. Right-aligned brand tone for the viewer, left-aligned neutral panel for others, with status ticks and a hover reaction tray.",
}

export default function MessageBubblePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Message bubble"
        title="Message bubble"
        description="The atomic unit of a transcript. Shows status states (sending, sent, delivered, read), inline reactions, and a hover-only quick reactions tray."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Message bubble" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Sent by me (read)</span>
        <ul className={styles.threadList}>
          <li>
            <MessageBubble
              sender="me"
              content="Hi Mick — the 3-inch stainless system clears the Hilux factory diff drop. We'll need to add the spacer kit on your Toyota brackets."
              timestamp="9:42a"
              status="read"
              authorName="You"
              reactions={[
                { id: "ok", glyph: "👍", label: "Thumbs up", count: 2, mine: true },
              ]}
            />
          </li>
        </ul>

        <span className={styles.demoLabel}>Sent by other (customer)</span>
        <ul className={styles.threadList}>
          <li>
            <MessageBubble
              sender="other"
              content="Sweet — and the rear muffler diameter, will it tuck under above the tow bar?"
              timestamp="9:44a"
              authorName="Mick Davis"
            />
          </li>
        </ul>

        <span className={styles.demoLabel}>Status variants</span>
        <ul className={styles.threadList}>
          <li>
            <MessageBubble
              sender="me"
              content="Quote drafted — sending now."
              timestamp="9:45a"
              status="sending"
            />
          </li>
          <li>
            <MessageBubble
              sender="me"
              content="Quote sent."
              timestamp="9:45a"
              status="sent"
            />
          </li>
          <li>
            <MessageBubble
              sender="me"
              content="Delivered to Mick's phone."
              timestamp="9:46a"
              status="delivered"
            />
          </li>
        </ul>
      </section>
    </main>
  )
}
