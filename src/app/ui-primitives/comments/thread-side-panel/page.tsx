import type { Metadata } from "next"

import { ThreadSidePanel } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { THREAD_LIST } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Thread side panel | Comments primitives",
  description:
    "Primitive 08 — right-side panel listing every comment thread on a document, with Open / Resolved / @me filter chips.",
}

export default function ThreadSidePanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Thread side panel"
        title="Thread side panel"
        description="Right rail listing every comment thread on a doc. Filter by Open, Resolved, or @me. Selected thread highlights with aria-current."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Side panel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Open filter · first thread selected</span>
        <ThreadSidePanel
          threads={THREAD_LIST}
          defaultSelectedId="t-1"
        />
      </section>
    </main>
  )
}
