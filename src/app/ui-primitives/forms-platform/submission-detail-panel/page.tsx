import type { Metadata } from "next"

import { SubmissionDetailPanel } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { SUBMISSION_ANSWERS, SUBMISSION_AUDIT } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Submission detail panel | Forms platform",
  description:
    "Primitive 09 — the submission detail panel with answers, audit log, and approve / reject / reply actions.",
}

export default function SubmissionDetailPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Submission detail panel"
        title="Submission detail panel"
        description="Full view of submission s-001 — Mick Stafford&rsquo;s VL Walkinshaw booking. The answer rail shows the 7 answers (special-notes row flagged for review), the side rail holds the audit timeline including Stripe capture and the Bay 2 reservation. Action chips approve, reject, or reply."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Submission detail panel" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — submission s-001
        </span>
        <SubmissionDetailPanel
          formName="Book a Service · VL Walkinshaw"
          submitter="Mick Stafford"
          submitterEmail="mick.s@oldmate.com.au"
          status="reviewing"
          submittedAt="2026-05-29 09:14:02 AEST"
          workshop="Oak Flats · Bay 2"
          sourceLabel="Embed · mufflermen.com.au/book"
          answers={SUBMISSION_ANSWERS}
          audit={SUBMISSION_AUDIT}
        />
      </section>
    </main>
  )
}
