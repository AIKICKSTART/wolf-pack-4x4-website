import type { Metadata } from "next"

import { MessageBubble, ThreadReplyRow } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import { DEMO_THREAD_SUMMARY } from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Thread reply row | Inbox primitives",
  description:
    "Primitive 11 — collapsible thread row revealing nested replies inside an indented side panel.",
}

export default function ThreadReplyPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Thread reply"
        title="Thread reply row"
        description="Shows the reply count beneath a bubble. Toggles open into a nested thread panel — visually offset and tealed to differentiate from the main transcript."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Thread reply" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Closed thread row</span>
        <ThreadReplyRow summary={DEMO_THREAD_SUMMARY} />

        <span className={styles.demoLabel}>Opened thread panel</span>
        <ThreadReplyRow
          summary={DEMO_THREAD_SUMMARY}
          defaultOpen
          panelChildren={
            <ul className={styles.threadList}>
              <li>
                <MessageBubble
                  sender="other"
                  content="Just confirming — Wollongong run is 11:30 not 11:15."
                  timestamp="9:36a"
                  authorName="Daniel"
                />
              </li>
              <li>
                <MessageBubble
                  sender="other"
                  content="Got the mid-pipe in their warehouse hold for Mufflermen."
                  timestamp="9:37a"
                  authorName="Daniel"
                />
              </li>
              <li>
                <MessageBubble
                  sender="me"
                  content="Beauty — Jordan, schedule the Hilux for 1pm in Bay 2."
                  timestamp="9:38a"
                  status="read"
                />
              </li>
            </ul>
          }
        />
      </section>
    </main>
  )
}
