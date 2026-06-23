import type { Metadata } from "next"

import { ConversationHeader } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import { PEOPLE } from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Conversation header | Inbox primitives",
  description:
    "Primitive 02 — conversation top bar with avatar, presence dot, name, role chip, and the call / video / pin / mute / archive actions.",
}

export default function ConversationHeaderPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Conversation header"
        title="Conversation header"
        description="Top bar shown above the message transcript. Renders the participant identity, presence state, role chip, and the conversation-level action row."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Conversation header" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Customer thread</span>
        <ConversationHeader
          participant={PEOPLE.mick}
          subtitle="HILUX N80 / quote #4421"
        />
        <span className={styles.demoLabel}>Team member thread (busy)</span>
        <ConversationHeader
          participant={PEOPLE.sam}
          subtitle="Bay 1 dyno cell — calibration window"
        />
        <span className={styles.demoLabel}>Offline customer thread</span>
        <ConversationHeader
          participant={PEOPLE.leah}
          subtitle="VF Commodore install booked Fri 9:00am"
        />
      </section>
    </main>
  )
}
