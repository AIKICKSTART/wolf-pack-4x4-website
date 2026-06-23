import type { Metadata } from "next"

import { MessageBubble, ReadReceiptRow } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import { DEMO_READ_RECEIPTS } from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Read receipts row | Inbox primitives",
  description:
    "Primitive 14 — small avatar group + timestamp shown beneath your last sent message indicating who has read it.",
}

export default function ReadReceiptsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Read receipts"
        title="Read receipts row"
        description="Shown directly under the viewer's last outbound message. Tracks who has seen the message and when, with overflow counter when more readers exist than fit avatars."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Read receipts" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Beneath last sent message</span>
        <ul className={styles.threadList}>
          <li>
            <MessageBubble
              sender="me"
              content="Heads up team — Mick's Hilux is in at 1pm sharp, Bay 2."
              timestamp="9:42a"
              status="read"
            />
          </li>
        </ul>
        <ReadReceiptRow receipts={DEMO_READ_RECEIPTS} />

        <span className={styles.demoLabel}>Overflow counter (max 2 visible)</span>
        <ReadReceiptRow receipts={DEMO_READ_RECEIPTS} maxAvatars={2} />

        <span className={styles.demoLabel}>Custom label</span>
        <ReadReceiptRow
          receipts={DEMO_READ_RECEIPTS.slice(0, 2)}
          label="Seen by"
        />
      </section>
    </main>
  )
}
