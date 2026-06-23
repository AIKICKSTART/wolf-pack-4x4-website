import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ShareReportCard } from "../../components/reports-deep"
import { SHARE_EMBED, SHARE_ENTRIES, SHARE_URL } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Share report card | Reports-deep",
  description:
    "Primitive 14 — share modal card with link/embed/email/Slack tabs, default permission radio and an access list.",
}

export default function ShareReportCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Share report card"
        title="Share report card"
        description="Share a report through any of four channels — public link, embed iframe, email, or Slack. Default permission tile sets the access scope for new shares; the access list shows existing collaborators by group with their effective permission."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Share report card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ShareReportCard
          title="Weekly revenue · Week 22 FY26"
          publicUrl={SHARE_URL}
          embedSnippet={SHARE_EMBED}
          entries={SHARE_ENTRIES}
          initialChannel="link"
          initialPermission="view"
        />
      </section>
    </main>
  )
}
