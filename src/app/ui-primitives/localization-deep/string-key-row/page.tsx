import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StringKeyRow } from "../../components/localization-deep"

import { STRING_KEY_ROWS } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "String key row | Localization deep",
  description:
    "Primitive 07 — flat-key string row with namespace chip, source string, usage count, last edit and critical flag.",
}

export default function StringKeyRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Keys"
        title="String key row"
        description="The atom of a strings catalogue browser — namespace chip, full flat key, source string, usage count, last edit and editor. Critical-flagged keys gain a red accent for legal / CTA / error rows."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "String key row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Mufflermen production strings · sample</span>
        <div className={styles.stack}>
          {STRING_KEY_ROWS.map((row) => (
            <StringKeyRow key={row.translationKey} {...row} />
          ))}
        </div>
      </section>
    </main>
  )
}
