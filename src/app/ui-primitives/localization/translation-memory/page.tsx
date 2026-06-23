import type { Metadata } from "next"

import { TranslationMemoryCard } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { MEMORY_HITS } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Translation memory card | Localization",
  description:
    "Primitive 12 — translation memory suggestion card with source string, ranked memory hits, similarity score, and a reuse CTA per hit.",
}

export default function TranslationMemoryScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Memory"
        title="Translation memory card"
        description="When a translator hits Save, the TM looks up similar strings already approved in other features. Hits are ranked by similarity — 100% exact, 90%+ high, 70–89% mid, below that low. The reuse CTA copies the hit straight into the editor."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Translation memory" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — TM hits for &ldquo;Book a muffler service&rdquo;
        </span>
        <TranslationMemoryCard
          sourceString="Book a muffler service"
          sourceLocale="en-AU"
          hits={MEMORY_HITS}
        />
      </section>
    </main>
  )
}
