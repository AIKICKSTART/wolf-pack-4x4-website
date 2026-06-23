import type { Metadata } from "next"

import { MessageBubble, MessageGroup } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import { PEOPLE } from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Message group | Inbox primitives",
  description:
    "Primitive 04 — groups consecutive messages from a single sender under one avatar / name / time header.",
}

export default function MessageGroupPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Message group"
        title="Message group"
        description="Groups consecutive bubbles from the same sender. Reduces visual repetition for fast back-and-forth conversations and clarifies authorship at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Message group" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Group — Jordan (Bay 2 Tech)</span>
        <MessageGroup author={PEOPLE.jordan} sender="other" timestamp="9:31a">
          <li>
            <MessageBubble
              sender="other"
              content="Bay 2 hoist is open — pulled the LS out of the Falcon shell already."
              timestamp="9:31a"
            />
          </li>
          <li>
            <MessageBubble
              sender="other"
              content="Sophie said Mick's quote is signed off, want me to start on the Hilux exhaust at the same time?"
              timestamp="9:32a"
            />
          </li>
          <li>
            <MessageBubble
              sender="other"
              content="Daniel reckons Hi-Flow have the mid-pipe in stock."
              timestamp="9:33a"
            />
          </li>
        </MessageGroup>

        <span className={styles.demoLabel}>Group — Me (foreman)</span>
        <MessageGroup author={PEOPLE.jordan} sender="me" timestamp="9:35a">
          <li>
            <MessageBubble
              sender="me"
              content="Go ahead on the Hilux — keep the LS in the shell until lunch."
              timestamp="9:35a"
              status="read"
            />
          </li>
          <li>
            <MessageBubble
              sender="me"
              content="Daniel — confirm the Wollongong run when you get a sec."
              timestamp="9:35a"
              status="delivered"
            />
          </li>
        </MessageGroup>
      </section>
    </main>
  )
}
