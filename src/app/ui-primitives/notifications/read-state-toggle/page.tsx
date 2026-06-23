import type { Metadata } from "next"

import { ReadStateToggle } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Read-state toggle | Notifications",
  description:
    "Primitive 05 — tiny circular dot toggling between unread (filled, brand) and read (hollow, muted).",
}

export default function ReadStateTogglePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Read state"
        title="Read-state toggle"
        description="An 18px circular dot that toggles between an unread filled state and a read hollow state. Keyboard-focusable, aria-pressed semantics, with a halo on focus and a 12% scale-up on hover."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Read-state toggle" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoInline}>
          <ReadStateToggle unread controlled={false} defaultUnread />
          <ReadStateToggle unread={false} controlled={false} defaultUnread={false} />
          <ReadStateToggle unread controlled={false} defaultUnread />
          <ReadStateToggle unread={false} controlled={false} defaultUnread={false} />
        </div>
      </section>
    </main>
  )
}
