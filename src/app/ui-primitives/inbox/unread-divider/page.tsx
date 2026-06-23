import type { Metadata } from "next"

import {
  MessageBubble,
  UnreadDivider,
} from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Unread divider | Inbox primitives",
  description:
    "Primitive 13 — horizontal divider rendered between read and unread groups of messages in a conversation transcript.",
}

export default function UnreadDividerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Unread divider"
        title="Unread divider"
        description="Marks the boundary between read and unread messages. Pulsing red pill anchors the viewer's eye to the next-unread spot."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Unread divider" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>In context — between groups</span>
        <ul className={styles.threadList}>
          <li>
            <MessageBubble
              sender="other"
              content="Hilux quote signed and emailed back."
              timestamp="9:18a"
              authorName="Sophie"
            />
          </li>
          <li>
            <MessageBubble
              sender="me"
              content="Top stuff — booking Bay 2 for it."
              timestamp="9:21a"
              status="read"
            />
          </li>
        </ul>

        <UnreadDivider count={3} />

        <ul className={styles.threadList}>
          <li>
            <MessageBubble
              sender="other"
              content="Mick wants to know if you can fit a flapper valve too."
              timestamp="9:42a"
              authorName="Sophie"
            />
          </li>
        </ul>

        <span className={styles.demoLabel}>Bare divider</span>
        <UnreadDivider />

        <span className={styles.demoLabel}>Custom label</span>
        <UnreadDivider label="New since you last looked" count={12} />
      </section>
    </main>
  )
}
