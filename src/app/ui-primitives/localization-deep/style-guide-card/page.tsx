import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StyleGuideCard } from "../../components/localization-deep"

import { STYLE_GUIDE_AU, STYLE_GUIDE_ZH } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "Style guide card | Localization deep",
  description:
    "Primitive 12 — locale style guide card with tone, formality, voice summary, quirks list and do/don't examples.",
}

export default function StyleGuideCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Voice"
        title="Style guide card"
        description="Codifies the Mufflermen brand voice per locale. The en-AU card captures Brad's blokey casual tone; the zh-CN card sets a neutral, technical voice that still preserves brand and suburb names verbatim."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Style guide card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>en-AU · the source voice</span>
        <StyleGuideCard {...STYLE_GUIDE_AU} />

        <span className={styles.stageCaption}>zh-CN · roadmap target voice</span>
        <StyleGuideCard {...STYLE_GUIDE_ZH} />
      </section>
    </main>
  )
}
