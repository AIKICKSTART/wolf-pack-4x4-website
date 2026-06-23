import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { NewsletterSignup } from "../../components/forms-gallery/newsletter-signup"

import styles from "../forms-gallery.module.css"

export const metadata: Metadata = {
  title: "Newsletter signup | Forms Gallery",
  description:
    "Pattern 06 — compact inline newsletter signup with animated tick and follow-on CTA.",
}

export default function NewsletterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Pattern 06 / Newsletter"
        title="Newsletter signup"
        description="Compact inline signup pattern — email field, submit button, animated success state, and follow-on CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery", href: "/ui-primitives/forms-gallery" },
          { label: "Newsletter" },
        ]}
      />
      <NewsletterSignup />
    </main>
  )
}
