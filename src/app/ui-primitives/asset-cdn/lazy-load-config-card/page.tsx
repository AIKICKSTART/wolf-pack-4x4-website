import type { Metadata } from "next"

import { LazyLoadConfigCard } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Lazy-load config card | Asset CDN",
  description: "Primitive 13 — lazy-load placeholder strategy with blur, opacity, and root margin controls.",
}

export default function LazyLoadConfigCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Lazy-load"
        title="Lazy-load config card"
        description="Pick a placeholder strategy — low-quality image, blur-up, traced sketch, or dominant colour — then tune blur, fade opacity, and the IntersectionObserver root margin. Two preview frames show the placeholder vs the resolved frame side-by-side."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Lazy-load config" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · interactive</span>
        <LazyLoadConfigCard />
      </section>
    </main>
  )
}
