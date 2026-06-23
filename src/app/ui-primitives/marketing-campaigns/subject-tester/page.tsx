import type { Metadata } from "next"

import { SubjectLineTester } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_SUBJECT_SUGGESTIONS } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Subject line tester | Marketing campaigns",
  description:
    "Primitive 08 — type a subject and inspect spam score, word count and emoji-fit chips with AI suggestions.",
}

export default function SubjectTesterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Subject line tester"
        title="Subject line tester"
        description="Type a subject line and watch spam-score, word-count and emoji-fit chips update in real time. Open the AI suggestions dialog for alternates — clicking one replaces the current subject."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Subject line tester" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <SubjectLineTester
          defaultSubject="Manta cat-back is in — book your install"
          suggestions={DEMO_SUBJECT_SUGGESTIONS}
        />
      </section>
    </main>
  )
}
