import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../../components/page-header"
import { StateEmptyInbox } from "../../components/states"
import styles from "../states.module.css"

export const metadata: Metadata = {
  title: "Empty inbox | UI Primitives — System States",
}

export default function EmptyInboxShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.07 / System states"
        title="All caught up · empty inbox"
        description="Soft 'zero waiting' surface for the workshop inbox. Envelope illustration with a tick stamp, a stats trio (cleared today, average response, open quotes), and a back-to-dashboard escape."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Empty inbox" },
        ]}
      />
      <section className={styles.canvas}>
        <StateEmptyInbox
          headline="Inbox is clear"
          message="Quote replies, supplier dispatch notes, and ADR confirmations have all been parked. Nothing waiting on Bay 1 or Bay 3 either. Enjoy the lull — first walk-in is at 8:30."
          stats={[
            { label: "Cleared today", value: "14" },
            { label: "Avg response", value: "6m" },
            { label: "Open quotes", value: "0" },
            { label: "Bays free", value: "2 / 3" },
          ]}
          primaryAction={
            <Link href="/ui-primitives/data-display" className={styles.btnRed}>
              Open ledger
            </Link>
          }
          secondaryAction={
            <Link href="/ui-primitives" className={styles.btnGhost}>
              Back to dashboard
            </Link>
          }
        />
        <aside className={styles.note}>
          <span>Accessibility</span>
          <p>
            Role=&quot;status&quot; with polite live region. The stats grid is rendered as a dl so
            each label / value pair is announced as an associated unit by screen-readers.
          </p>
        </aside>
      </section>
    </main>
  )
}
