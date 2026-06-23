import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TermsConditionsEditor } from "../../components/quotes"

import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Terms & conditions editor | Quotes | UI Primitives",
  description:
    "Rich-text terms and conditions editor — bold / italic / bullet / link toolbar with version chip.",
}

const INITIAL_TERMS = `**Terms of acceptance — Oak Flats Mufflermen Pty Ltd**

- Quote valid for **14 days** from issue date. Pricing subject to change after expiry.
- Workshop labour booked once **50% deposit** is received via the accept link.
- All parts come with a **12-month manufacturer warranty**; workshop labour is warranted for 6 months from fitment.
- Vehicle must be supplied with at least a quarter tank of fuel for the wideband O2 retune.
- See [our full terms page](https://mufflermen.com.au/terms) for cancellation policy and dispute resolution.`

export default function TermsConditionsEditorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 05"
        title="Terms & conditions editor"
        description="Simple rich-text editor for the terms shown on every quote. Lightweight markdown-style formatting via toolbar buttons — bold, italic, bullets, links — with a version chip showing the last edit timestamp so contract changes are auditable."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Terms editor" },
        ]}
      />
      <TermsConditionsEditor
        initialValue={INITIAL_TERMS}
        lastEditedAt="Wed 28 May · 11:04 AEST"
        version="v2.1"
      />
    </main>
  )
}
