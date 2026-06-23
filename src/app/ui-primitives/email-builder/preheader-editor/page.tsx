import type { Metadata } from "next"

import { PreheaderEditor } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_PREHEADER, SAMPLE_SUBJECT } from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Preheader editor | Email builder",
  description:
    "Primitive 08 — subject + preheader inputs with character counters, spam-trigger chips, and a fake inbox preview.",
}

export default function PreheaderEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Preheader editor"
        title="Preheader editor"
        description="A compact editor that pairs subject and preheader inputs with live character counters and a spam-trigger word detector. The bottom strip shows a faux inbox row so you can see exactly how the line lands beside the sender name."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Preheader editor" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Winter newsletter subject</span>
        <div className={styles.demoInline}>
          <PreheaderEditor
            defaultSubject={SAMPLE_SUBJECT}
            defaultPreheader={SAMPLE_PREHEADER}
          />
        </div>
      </section>
    </main>
  )
}
