import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OutputPreviewPane } from "../../components/dev-experience"
import type { OutputStreamSample } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "Output preview pane | UI Primitives — Dev experience",
}

const SAMPLES: ReadonlyArray<OutputStreamSample> = [
  {
    stream: "stdout",
    badge: "412 ms",
    content: `> @mufflermen/sdk@3.4.0 quote:create
> tsx scripts/first-quote.ts

Resolved bay availability for bay_oak_flats_03
Created quote qte_2026_xforce_extractor_001
Quote total: AUD 1842.50`,
  },
  {
    stream: "stderr",
    badge: "1 warn",
    content: `WARN [@mufflermen/sdk] Bay availability stream reconnected after 240ms gap.
  - bay_id: bay_oak_flats_03
  - reason: idle_timeout
  - reconnect_attempt: 1`,
  },
  {
    stream: "network",
    badge: "201",
    content: `POST https://api.mufflermen.com/v1/quotes 201 Created
  → x-request-id: req_01HQ8FK4ZJM7CVS3Y9VTBP2NTR
  → server-timing: total;dur=387
  ← idempotency-key: 019700cf-7d28-7c4e-9c4f-3b1d8e5e2f4a`,
  },
  {
    stream: "json",
    badge: "payload",
    content: `{
  "id": "qte_2026_xforce_extractor_001",
  "status": "draft",
  "total_aud": 1842.50,
  "valid_until": "2026-05-23T08:42:11Z"
}`,
  },
]

export default function OutputPreviewPanePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 12"
        title="Output preview pane"
        description="stdout / stderr / network / json tabs with tone-coded badges. Drop-in for SDK CLI runs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "Output preview pane" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>pnpm quote:create — full run output</span>
          <OutputPreviewPane streams={SAMPLES} />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each stream gets its own tone — teal for stdout, red for stderr, amber for
            network, green for JSON. Tabs use proper{" "}
            <code>role=&quot;tab&quot;</code> / <code>aria-selected</code>. The pane is a{" "}
            <code>&lt;pre&gt;</code> so whitespace and indentation are preserved in
            assistive output.
          </p>
        </div>
      </section>
    </main>
  )
}
