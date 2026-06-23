"use client"

import { useState } from "react"

import { MergeConversationsModal } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import { CONVERSATIONS } from "../_mock-data"
import styles from "../unified-inbox.module.css"

export default function MergeConversationsModalScenePage() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Merge modal"
        title="Merge conversations modal"
        description="Modal to fold duplicate threads into a primary conversation. Cross-channel duplicates are common — a customer who DMs on Facebook and then texts the workshop number. Pick the duplicates, decide whether to interleave or append history, and merge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Merge conversations modal" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Trigger · primary is the Mick D. SMS thread
        </span>
        <div className={styles.fullActions}>
          <button
            type="button"
            className={styles.fullActionBtn}
            onClick={() => setOpen(true)}
          >
            Open merge modal
          </button>
        </div>
        <MergeConversationsModal
          open={open}
          onOpenChange={setOpen}
          candidates={CONVERSATIONS}
          primaryId="conv-mick"
        />
      </section>
    </main>
  )
}
