import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FeedbackForm } from "../../components/forms-gallery/feedback-form"

import styles from "../forms-gallery.module.css"

export const metadata: Metadata = {
  title: "Feedback form | Forms Gallery",
  description:
    "Pattern 05 — workshop feedback form with star rating, category chips, title, message, and anonymity toggle.",
}

export default function FeedbackScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Pattern 05 / Feedback"
        title="Feedback form"
        description="Star rating with hover preview, category chip selector, title + message, photo attach, anonymity toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery", href: "/ui-primitives/forms-gallery" },
          { label: "Feedback" },
        ]}
      />
      <FeedbackForm />
    </main>
  )
}
