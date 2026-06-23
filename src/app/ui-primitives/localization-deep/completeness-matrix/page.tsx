import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CompletenessMatrix } from "../../components/localization-deep"

import { COMPLETENESS_LOCALES, COMPLETENESS_NAMESPACES } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "Completeness matrix | Localization deep",
  description:
    "Primitive 04 — locale × namespace heat grid showing translation coverage as percentages with a tone-coded legend.",
}

export default function CompletenessMatrixPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Coverage"
        title="Completeness matrix"
        description="One-glance read on where translation work is concentrated. Rows are namespaces (checkout, parts, booking, legal, emails, errors); columns are locales. Cells render as a tone-coded bar plus a percentage."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Completeness matrix" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Mufflermen production locales · 6 namespaces × 6 locales</span>
        <CompletenessMatrix
          locales={COMPLETENESS_LOCALES}
          namespaces={COMPLETENESS_NAMESPACES}
        />
      </section>
    </main>
  )
}
