import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SdkChangelogRow } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "SDK changelog row | UI Primitives — Dev experience",
}

export default function SdkChangelogRowPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 09"
        title="SDK changelog row"
        description="One changelog entry — version chip, date, categorised chips, and a one-line summary with optional detail line."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "SDK changelog row" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>@mufflermen/sdk · recent releases</span>
          <SdkChangelogRow
            version="3.4.0"
            date="2026-05-21"
            categories={["added", "changed"]}
            summary="Add bay-availability streaming + retag quote.created events with bay_id."
            detail="Streaming uses Server-Sent Events. Drop-in upgrade — existing webhook handlers continue receiving JSON."
          />
          <SdkChangelogRow
            version="3.3.2"
            date="2026-05-05"
            categories={["fixed"]}
            summary="Resolve Idempotency-Key collision when retrying quotes.create within 1s."
          />
          <SdkChangelogRow
            version="3.3.0"
            date="2026-04-18"
            categories={["added", "deprecated"]}
            summary="Add parts.lookup vector search. Deprecate parts.search — removal in v4.0."
            detail="Migration guide: pass query.vector instead of query.text. Vector embeddings come from the @mufflermen/embeddings helper."
          />
          <SdkChangelogRow
            version="3.0.0"
            date="2026-02-14"
            categories={["removed", "changed"]}
            summary="Drop legacy v1 quote builder. Quote totals now return total_aud (number) instead of total (string)."
            detail="Breaking — codemod available at @mufflermen/sdk-codemod migrate-v3."
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each row is an <code>&lt;article&gt;</code> with an aria-label combining
            version + date. Category chips render in the order supplied, so authors can
            put the most relevant category first. Detail copy is optional and uses the
            monospace family to read as inline release notes.
          </p>
        </div>
      </section>
    </main>
  )
}
