import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SendForSignatureCard } from "../../components/quotes"

import { SIGNATURE_DEFAULTS } from "../quote-fixtures"
import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Send for signature | Quotes | UI Primitives",
  description:
    "Email send-out surface — signer details, cover note, Send-for-signature CTA.",
}

export default function SendForSignatureCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 06"
        title="Send for signature"
        description="Final step in the quote authoring flow — capture the signer, set the email subject and cover note, and dispatch the secure-link email. Recipient lands on a hosted page with the e-signature pad and acceptance tracker."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Send for signature" },
        ]}
      />
      <SendForSignatureCard defaults={SIGNATURE_DEFAULTS} />
    </main>
  )
}
