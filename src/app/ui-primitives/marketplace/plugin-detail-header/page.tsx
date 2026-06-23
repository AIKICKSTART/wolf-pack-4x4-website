import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PluginDetailHeader } from "../../components/marketplace/plugin-detail-header"
import { InstallButton } from "../../components/marketplace/install-button"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Plugin detail header | Marketplace | UI Primitives",
  description: "Detail page header with logo, title, author, tagline, install slot, and tab strip.",
}

export default function PluginDetailHeaderShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.5 / Detail header"
        title="Plugin detail header"
        description="Large detail-page header used at the top of every plugin profile page — five tabs, install slot, and clear authorship attribution."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Plugin detail header" },
        ]}
      />

      <section className={styles.section} aria-labelledby="detail-header-demo">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Detail header</span>
          <h2 id="detail-header-demo" className={styles.sectionTitle}>
            Stripe payments — overview tab active
          </h2>
        </header>
        <PluginDetailHeader
          name="Stripe payments"
          author="Stripe Inc."
          tagline="Take card, Apple Pay and Afterpay through the workshop quoting tool. Auto-reconciles to Xero overnight."
          installSlot={<InstallButton state="installed" pluginName="Stripe payments" />}
          activeTab="overview"
        />
      </section>
    </main>
  )
}
