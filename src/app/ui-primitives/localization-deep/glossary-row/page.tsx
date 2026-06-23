import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { GlossaryRow } from "../../components/localization-deep"

import { GLOSSARY_ROWS } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "Glossary row | Localization deep",
  description:
    "Primitive 02 — glossary term row with source, targets, part-of-speech and do-not-translate / case-sensitive flags.",
}

export default function GlossaryRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Glossary"
        title="Glossary row"
        description='Locks brand terms ("Mufflermen"), suburb names ("Wollongong", "Shellharbour"), and AU-specific vocab ("extractors", "ute") across every locale. Do-not-translate rows render the source in every target.'
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Glossary row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Mufflermen glossary · stable terms</span>
        <div className={styles.stack}>
          {GLOSSARY_ROWS.map((row) => (
            <GlossaryRow key={row.term} {...row} />
          ))}
        </div>
      </section>
    </main>
  )
}
