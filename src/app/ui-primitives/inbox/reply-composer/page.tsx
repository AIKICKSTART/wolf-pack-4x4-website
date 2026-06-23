import type { Metadata } from "next"

import { ReplyComposer } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import { MENTION_CANDIDATES } from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Reply composer | Inbox primitives",
  description:
    "Primitive 06 — auto-grow textarea with emoji / attach / mention buttons and a send action. Cmd+Enter to send.",
}

export default function ReplyComposerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Reply composer"
        title="Reply composer"
        description="The bottom-of-conversation composer. Multi-line auto-grow textarea with action row, mention picker triggered by typing '@', and a primary send button. Cmd+Enter sends."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Reply composer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composer (customer thread)</span>
        <ReplyComposer
          participantName="Mick Davis"
          mentionCandidates={MENTION_CANDIDATES}
        />
        <span className={styles.demoLabel}>Composer with draft text</span>
        <ReplyComposer
          participantName="Jordan"
          defaultValue="Heads up — the Hi-Flow midpipe is on the bench, ready for Bay 2."
          mentionCandidates={MENTION_CANDIDATES}
        />
      </section>
    </main>
  )
}
