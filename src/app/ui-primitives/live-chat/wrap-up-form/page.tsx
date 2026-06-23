"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { WrapUpForm } from "../../components/live-chat"

import { SUGGESTED_TAGS } from "../_mock-data"
import styles from "../live-chat.module.css"

export default function WrapUpFormScenePage() {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Wrap"
        title="Wrap-up form"
        description="The post-chat wrap-up form. Outcome chip group + tag input + free-text notes + send-transcript switch + live summary. Composes BasicDialog, the Chip primitive group, the TagInput primitive and shows a chat duration summary so the operator can see the shape of what they're closing out."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Wrap-up form" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · wrap up Mick Davis chat
        </span>
        <div className={styles.consoleOverlay}>
          <button
            type="button"
            className={styles.openWrapBtn}
            onClick={() => setOpen(true)}
          >
            Open wrap-up form
          </button>
        </div>
        <WrapUpForm
          open={open}
          onOpenChange={setOpen}
          visitorName="Mick Davis"
          suggestedTags={SUGGESTED_TAGS}
          durationSummary="8m 22s · 14 messages · sentiment +56"
        />
      </section>
    </main>
  )
}
