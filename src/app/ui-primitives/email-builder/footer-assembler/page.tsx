import type { Metadata } from "next"

import { FooterAssembler } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Footer assembler | Email builder",
  description:
    "Primitive 09 — physical address, unsubscribe label, legal-link chips, and a social row toggle with live preview.",
}

export default function FooterAssemblerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Footer assembler"
        title="Footer assembler"
        description="Compliance-grade footer editor. Mailing address, unsubscribe label, legal link chips, and a social row toggle. The bottom strip is rendered using the shared email tokens so the preview matches the production receipts and digests."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Footer assembler" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Oak Flats footer</span>
        <div className={styles.demoInline}>
          <FooterAssembler />
        </div>
      </section>
    </main>
  )
}
