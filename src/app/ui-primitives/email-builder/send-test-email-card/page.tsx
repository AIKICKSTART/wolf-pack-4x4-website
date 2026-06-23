import type { Metadata } from "next"

import { SendTestEmailCard } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import { TEST_RECIPIENTS } from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Send test email card | Email builder",
  description:
    "Primitive 07 — multi-recipient test input, A/B/C variant picker, send CTA, and sent-status chip.",
}

export default function SendTestEmailCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Send test email card"
        title="Send test email card"
        description="A compact card for previewing the active draft in a real inbox. Recipients land in the TagInput primitive, variants are chip-based, and the send CTA reports queueing and sent states inline."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Send test email card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Winter newsletter test</span>
        <div className={styles.demoInline}>
          <SendTestEmailCard defaultRecipients={TEST_RECIPIENTS} />
        </div>
      </section>
    </main>
  )
}
