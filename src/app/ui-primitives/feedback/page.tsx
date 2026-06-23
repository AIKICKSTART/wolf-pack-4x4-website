import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import { FeedbackSection } from "../sections"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Feedback | UI Primitives",
}

export default function FeedbackPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Dialogs, alerts, sheets, recovery states"
        description="System feedback primitives for approvals, validation, loading, destructive actions, and the recovery moments that need to stay legible under workshop pressure."
        dnaSectionId="feedback"
      />
      <FeedbackSection />
    </main>
  )
}
