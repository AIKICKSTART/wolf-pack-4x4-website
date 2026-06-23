import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DuplicateDetectionBanner } from "../../components/quotes"

import { DUPLICATE_SUMMARY } from "../quote-fixtures"
import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Duplicate detection banner | Quotes | UI Primitives",
  description:
    "Warning banner shown when a similar quote already exists for the same customer + vehicle.",
}

export default function DuplicateDetectionBannerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 14"
        title="Duplicate detection banner"
        description="Fires when the authoring tool detects a near-duplicate quote (same customer, same vehicle, similar parts) already exists. Shows the similar quote summary and offers two paths — open the existing draft or override and create a new one anyway."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Duplicate banner" },
        ]}
      />
      <DuplicateDetectionBanner similar={DUPLICATE_SUMMARY} />
    </main>
  )
}
