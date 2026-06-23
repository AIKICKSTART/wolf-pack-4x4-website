import type { Metadata } from "next"

import { PinnedMessageBar } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import { DEMO_PINNED } from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Pinned message bar | Inbox primitives",
  description:
    "Primitive 12 — top-of-conversation strip showing pinned messages. Scroll horizontally or use the chevron controls to navigate.",
}

export default function PinnedBarPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Pinned bar"
        title="Pinned message bar"
        description="Sits between the conversation header and transcript. Pinned cards scroll horizontally on the track; arrow keys and the chevron buttons advance one card at a time."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Pinned bar" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three pinned messages</span>
        <PinnedMessageBar pinned={DEMO_PINNED} />
      </section>
    </main>
  )
}
