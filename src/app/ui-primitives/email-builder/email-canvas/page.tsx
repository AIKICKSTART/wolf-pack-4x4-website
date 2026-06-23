import type { Metadata } from "next"

import { EmailCanvas } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import {
  SAMPLE_FROM,
  SAMPLE_PREHEADER,
  SAMPLE_SUBJECT,
  WINTER_NEWSLETTER_BLOCKS,
} from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Email canvas | Email builder",
  description:
    "Primitive 01 — the centre 600px column canvas with drop zones between rows and an inbox-style chrome header.",
}

export default function EmailCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Email canvas"
        title="Email canvas"
        description="A 600-pixel centred column with an inbox-style chrome header, drop zones between every block, and a legend strip for the visual states. Selected blocks pick up the amber highlight ring from the underlying FormCanvas primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Email canvas" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Winter workshop newsletter</span>
        <EmailCanvas
          subject={SAMPLE_SUBJECT}
          preheader={SAMPLE_PREHEADER}
          fromLine={SAMPLE_FROM}
          blocks={WINTER_NEWSLETTER_BLOCKS}
          selectedBlockId="blk-cta"
          dropTargetState="hover"
        />
      </section>
    </main>
  )
}
