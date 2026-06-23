import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PluginCard } from "../../components/marketplace/plugin-card"
import { PLUGINS } from "../marketplace-fixtures"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Plugin card | Marketplace | UI Primitives",
  description:
    "Plugin discovery card primitive — logo, author, description, install state, rating, price chip, and CTA.",
}

export default function PluginCardShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.1 / Plugin card"
        title="Plugin card"
        description="Discovery card primitive used throughout the marketplace grid. Six realistic Mufflermen plugins, three install states, four pricing tiers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Plugin card" },
        ]}
      />

      <section className={styles.section} aria-labelledby="plugin-card-grid">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Grid</span>
          <h2 id="plugin-card-grid" className={styles.sectionTitle}>
            Mufflermen marketplace cards
          </h2>
          <p className={styles.sectionLead}>
            Top six plugins from the workshop marketplace. Rating + price + state condensed into one card.
          </p>
        </header>
        <div className={styles.pluginGrid}>
          {PLUGINS.slice(0, 6).map((plugin) => (
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
      </section>
    </main>
  )
}
