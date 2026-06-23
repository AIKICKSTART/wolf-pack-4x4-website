import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MtPreviewCard } from "../../components/localization-deep"

import { MT_PREVIEW_NZ, MT_PREVIEW_PRIMARY } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "MT preview card | Localization deep",
  description:
    "Primitive 03 — machine translation preview with per-engine confidence, latency and a sortable variant chooser.",
}

export default function MtPreviewCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / MT"
        title="MT preview card"
        description="Lets translators compare DeepL, Google, Azure, Amazon and internal MT outputs side-by-side with confidence and latency, before picking the strongest starting point for their human edit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "MT preview card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>en-AU → zh-CN · roadmap locale</span>
        <MtPreviewCard {...MT_PREVIEW_PRIMARY} />

        <span className={styles.stageCaption}>en-AU → en-NZ · high-confidence near-mirror</span>
        <MtPreviewCard {...MT_PREVIEW_NZ} />
      </section>
    </main>
  )
}
