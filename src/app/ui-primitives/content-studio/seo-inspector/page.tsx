import type { Metadata } from "next"

import { SeoInspector } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { SEO_META_PREVIEW, SEO_SIGNALS } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "SEO inspector | Content studio",
  description:
    "Primitive 04 — search-readiness inspector with composite score, snippet preview, and per-signal hints. Three states — healthy, needs attention, and brand new draft.",
}

const LOW_SIGNALS = SEO_SIGNALS.map((signal) => ({
  ...signal,
  score: Math.max(18, Math.round(signal.score * 0.35)),
  value: signal.id === "seo-keyword" ? "0.3%" : signal.value,
}))

const BRAND_NEW_PREVIEW = {
  ...SEO_META_PREVIEW,
  title: "Untitled draft · 0 / 60 chars",
  description: "No meta description set yet — write one to control how the snippet looks in Google.",
  url: "https://mufflermen.com.au/journal/untitled-draft",
}

const BRAND_NEW_SIGNALS = SEO_SIGNALS.map((signal) => ({
  ...signal,
  score: 28,
  hint: "No content analysed yet — write a draft to populate this signal.",
}))

export default function SeoInspectorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / SEO inspector"
        title="SEO inspector"
        description="Live readability, keyword density, meta length, heading hierarchy, alt coverage, and outbound links. Three states — healthy draft, draft that needs attention, brand new doc."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "SEO inspector" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <SeoInspector signals={SEO_SIGNALS} metaPreview={SEO_META_PREVIEW} />
          <SeoInspector signals={LOW_SIGNALS} metaPreview={SEO_META_PREVIEW} />
          <SeoInspector signals={BRAND_NEW_SIGNALS} metaPreview={BRAND_NEW_PREVIEW} />
        </div>
      </section>
    </main>
  )
}
