import type { Metadata } from "next"

import { SubmissionInboxRow } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { INBOX_ENTRIES } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Submission inbox row | Forms platform",
  description:
    "Primitive 03 — a single submission row in the inbox. Form, submitter, preview, status chip, amount, date.",
}

export default function SubmissionInboxRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Submission inbox row"
        title="Submission inbox row"
        description="18 submissions today across Book-a-Service, Request Quote, Trade Account Apply, Newsletter Signup, and Warranty Claim. The row dispatches status tones for new, reviewing, approved, rejected, spam, and archived, and surfaces the Stripe AU amount when the form took payment."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Submission inbox row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — 6 of 18 submissions today
        </span>
        <div className={styles.demoRowList}>
          {INBOX_ENTRIES.map((entry) => (
            <SubmissionInboxRow key={entry.id} entry={entry} />
          ))}
        </div>
      </section>
    </main>
  )
}
