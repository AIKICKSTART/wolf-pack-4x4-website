import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QaIssueRow } from "../../components/localization-deep"

import { QA_ISSUE_ROWS } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "QA issue row | Localization deep",
  description:
    "Primitive 14 — QA issue row covering missing variables, length overflow, profanity, untranslated keys, tag mismatch and formality drift.",
}

export default function QaIssueRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / QA"
        title="QA issue row"
        description="The translator triage row. Each entry surfaces a single QA rule hit, severity stripe, locale chip and a resolve / dismiss action. Severity tones map to the umbrella info / warning / error palette."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "QA issue row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Live QA queue · sample issues</span>
        <div className={styles.stack}>
          {QA_ISSUE_ROWS.map((row, index) => (
            <QaIssueRow
              key={`${row.translationKey}-${row.locale}-${index}`}
              {...row}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
