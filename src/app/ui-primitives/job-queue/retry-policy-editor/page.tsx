import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RetryPolicyEditor } from "../../components/job-queue"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Retry policy editor | Job Queue",
  description:
    "Primitive 04 — retry policy editor: max attempts, backoff strategy, base/max delay, on-error action.",
}

export default function RetryPolicyEditorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Retry policy"
        title="Retry policy editor"
        description="Per-queue retry rules — pick max attempts, a backoff strategy (exponential / linear / fixed), base + max delay in milliseconds, and the final on-error action when all attempts are exhausted."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Retry policy editor" },
        ]}
      />
      <RetryPolicyEditor
        initial={{
          maxAttempts: 5,
          backoff: "exponential",
          baseDelayMs: 500,
          maxDelayMs: 60_000,
          onError: "dead-letter",
        }}
      />
    </main>
  )
}
