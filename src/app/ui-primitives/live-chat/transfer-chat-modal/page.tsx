"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { TransferChatModal } from "../../components/live-chat"

import {
  TRANSFER_OPERATORS,
  TRANSFER_TEAMS,
} from "../_mock-data"
import styles from "../live-chat.module.css"

export default function TransferChatModalScenePage() {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Transfer"
        title="Transfer chat modal"
        description="The transfer modal — choose an operator or a team, optionally pass context (cart, ticket history, sentiment) and leave a hand-off note. Composes the BasicDialog overlay primitive, the Avatar primitive for both list views and the support status palette."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Transfer chat modal" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · transfer Mick Davis chat
        </span>
        <div className={styles.consoleOverlay}>
          <button
            type="button"
            className={styles.openTransferBtn}
            onClick={() => setOpen(true)}
          >
            Open transfer modal
          </button>
        </div>
        <TransferChatModal
          open={open}
          onOpenChange={setOpen}
          operators={TRANSFER_OPERATORS}
          teams={TRANSFER_TEAMS}
          visitorName="Mick Davis"
        />
      </section>
    </main>
  )
}
