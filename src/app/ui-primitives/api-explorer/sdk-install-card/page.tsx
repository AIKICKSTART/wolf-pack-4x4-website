import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SdkInstallCard } from "../../components/api-explorer"
import { SDK_PARTS_SNIPPETS, SDK_QUOTES_SNIPPETS } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "SDK install card | API Explorer",
  description:
    "Primitive 11 — SDK install card. Three states: full matrix, JS-only, Python-default.",
}

export default function SdkInstallCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / SDK install card"
        title="SDK install card"
        description="A single-shot install snippet card. Tabs across npm, pnpm, yarn, pip, and composer; copies to clipboard with visual confirmation. Default tab is opinionated per SDK."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "SDK install card" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Full SDK matrix">
        <span className={styles.sectionLabel}>State 01 / Full matrix — @mufflermen/parts</span>
        <SdkInstallCard
          name="@mufflermen/parts"
          description="Typed client for the parts catalogue API."
          snippets={SDK_PARTS_SNIPPETS}
        />
      </section>

      <section className={styles.routeSection} aria-label="JS-only matrix">
        <span className={styles.sectionLabel}>State 02 / JS-only — @mufflermen/quotes</span>
        <SdkInstallCard
          name="@mufflermen/quotes"
          description="Helpers for quote drafting and pricing simulation."
          snippets={SDK_QUOTES_SNIPPETS}
        />
      </section>

      <section className={styles.routeSection} aria-label="Python default">
        <span className={styles.sectionLabel}>State 03 / Python-default — mufflermen-parts</span>
        <SdkInstallCard
          name="mufflermen-parts (Python)"
          description="Python SDK for workshop parts integrations."
          snippets={SDK_PARTS_SNIPPETS}
          defaultManager="pip"
        />
      </section>
    </main>
  )
}
