import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CategorySidebar } from "../../components/marketplace/category-sidebar"
import {
  FeaturedBanner,
  type FeaturedBannerSlide,
} from "../../components/marketplace/featured-banner"
import { PluginCard } from "../../components/marketplace/plugin-card"
import { RecentlyUpdatedRow } from "../../components/marketplace/recently-updated-row"
import { TrendingStrip } from "../../components/marketplace/trending-strip"
import {
  CATEGORY_COUNTS,
  PLUGINS,
  RECENTLY_UPDATED,
  TRENDING,
} from "../marketplace-fixtures"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Full marketplace | Marketplace | UI Primitives",
  description:
    "Composition view — featured banner, category sidebar, plugin grid, trending strip, and recently updated row stitched together for the workshop's full marketplace home page.",
}

const FEATURED: ReadonlyArray<FeaturedBannerSlide> = [
  {
    id: "feat-hermes",
    kicker: "Editor's pick",
    title: "Hermes content sync",
    description:
      "One-click mirror from the Hermes editor into the public mufflermen.com.au site. Show notes, blog posts, and Mufflerpulse episodes stay in lockstep.",
    ctaLabel: "Install Hermes",
    badgeLabel: "HX",
  },
  {
    id: "feat-stripe",
    kicker: "Pay with confidence",
    title: "Stripe payments",
    description:
      "Take Apple Pay, Afterpay and card payments through the workshop quoting tool with overnight Xero reconciliation.",
    ctaLabel: "Install Stripe",
    badgeLabel: "ST",
  },
  {
    id: "feat-quote",
    kicker: "AI for the workshop",
    title: "Quote drafter",
    description:
      "Voice memo in, draft quote out. Front-of-house reviews and signs — no more lost notes from the bay floor.",
    ctaLabel: "Try Quote drafter",
    badgeLabel: "AI",
  },
]

export default function FullMarketplaceCompositionPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.B / Composition"
        title="Full marketplace"
        description="Composition view of every marketplace primitive working together. Featured carousel on top, category sidebar on the left, plugin grid in the centre, trending + recently updated rails on the right."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Full marketplace" },
        ]}
      />

      <span className={styles.notice}>Composition reference — no real plugin install actions wired</span>

      <FeaturedBanner slides={FEATURED} autoplayMs={9000} />

      <section className={styles.full} aria-labelledby="full-marketplace-body">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Browse</span>
          <h2 id="full-marketplace-body" className={styles.sectionTitle}>
            Browse plugins
          </h2>
        </header>

        <div className={styles.fullLayout}>
          <CategorySidebar items={CATEGORY_COUNTS} activeCategory="payments" />
          <div className={styles.pluginGrid}>
            {PLUGINS.map((plugin) => (
              <PluginCard
                key={plugin.id}
                name={plugin.name}
                author={plugin.author}
                description={plugin.description}
                category={plugin.category}
                installState={plugin.installState}
                rating={plugin.rating}
                ratingCount={plugin.ratingCount}
                pricingTier={plugin.pricingTier}
              />
            ))}
          </div>
        </div>
      </section>

      <TrendingStrip items={TRENDING} />

      <RecentlyUpdatedRow items={RECENTLY_UPDATED} />
    </main>
  )
}
