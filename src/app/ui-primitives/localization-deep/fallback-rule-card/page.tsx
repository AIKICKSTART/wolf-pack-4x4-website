import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FallbackRuleCard } from "../../components/localization-deep"

import { FALLBACK_AR, FALLBACK_NZ, FALLBACK_PRIMARY } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "Fallback rule card | Localization deep",
  description:
    "Primitive 05 — editable fallback chain (en-AU → en-NZ → en-GB → en-US) with a switcher for the final policy when every chain step misses.",
}

export default function FallbackRuleCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Fallback"
        title="Fallback rule card"
        description="Encodes the resolution chain Mufflermen uses when a translation key is missing. en-AU is the canonical source; en-NZ / en-GB / en-US are nearly always present; zh-CN and ar-SA defer up the chain until coverage hits 75%."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Fallback rule card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>zh-CN · roadmap locale, defer to en-AU</span>
        <FallbackRuleCard {...FALLBACK_PRIMARY} />

        <span className={styles.stageCaption}>en-NZ · 97% coverage, chain rarely fires</span>
        <FallbackRuleCard {...FALLBACK_NZ} />

        <span className={styles.stageCaption}>ar-SA · early-stage, show key for engineering review</span>
        <FallbackRuleCard {...FALLBACK_AR} />
      </section>
    </main>
  )
}
