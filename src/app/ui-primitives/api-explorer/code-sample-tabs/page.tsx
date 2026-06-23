import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CodeSampleTabs } from "../../components/api-explorer"
import { SAMPLES_CREATE_QUOTE, SAMPLES_LIST_PARTS } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Code sample tabs | API Explorer",
  description:
    "Primitive 06 — multi-language code sample tabs. Three states: full matrix, partial (cURL + JS), compact (no tab strip).",
}

const CURL_ONLY = {
  curl: SAMPLES_LIST_PARTS.curl ?? "",
}

export default function CodeSampleTabsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Code sample tabs"
        title="Code sample tabs"
        description="A tab strip across cURL, JavaScript, Python, and PHP, sitting above a reusable CodeBlock with copy-to-clipboard. Falls back gracefully when only a subset of languages is available."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Code sample tabs" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Full SDK matrix">
        <span className={styles.sectionLabel}>State 01 / Full SDK matrix</span>
        <CodeSampleTabs
          samples={SAMPLES_LIST_PARTS}
          heading="GET /v1/parts"
        />
      </section>

      <section className={styles.routeSection} aria-label="Partial — cURL + JS only">
        <span className={styles.sectionLabel}>State 02 / Partial (cURL + JS)</span>
        <CodeSampleTabs
          samples={{
            curl: SAMPLES_CREATE_QUOTE.curl,
            javascript: SAMPLES_CREATE_QUOTE.javascript,
          }}
          heading="POST /v1/quotes"
        />
      </section>

      <section className={styles.routeSection} aria-label="Compact — single language">
        <span className={styles.sectionLabel}>State 03 / Compact (cURL only)</span>
        <CodeSampleTabs samples={CURL_ONLY} compact />
      </section>

      <aside className={styles.note}>
        <span>Reuse note</span>
        <p>
          The tab strip leans on the primitives <code>CodeBlock</code> for syntax & copy
          behaviour. Adding a language is one entry in <code>SampleLanguage</code>.
        </p>
      </aside>
    </main>
  )
}
