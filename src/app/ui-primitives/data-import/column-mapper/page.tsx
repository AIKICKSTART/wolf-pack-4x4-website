import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ColumnMapper } from "../../components/data-import"
import {
  PARTS_INITIAL_MAPPINGS,
  PARTS_SOURCE_COLUMNS,
  PARTS_TARGET_FIELDS,
} from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Column mapper | Data import",
  description:
    "Primitive 03 — Source columns map to target fields. Per-column target picker, skip toggle, required-field indicator, auto-match confidence chip.",
}

export default function ColumnMapperScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Column mapper"
        title="Column mapper"
        description="Map every detected source column to a target field on the part record. Skip toggles short-circuit a column; required-field chips and auto-match scores keep operators honest about which mappings are real and which are guesses."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Column mapper" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Manta parts catalog → parts table</span>
        <ColumnMapper
          sources={PARTS_SOURCE_COLUMNS}
          targets={PARTS_TARGET_FIELDS}
          initialMappings={PARTS_INITIAL_MAPPINGS}
        />
      </section>
    </main>
  )
}
