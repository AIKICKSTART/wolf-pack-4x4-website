import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MiniCartBadge } from "../../components/storefront"

import styles from "../storefront.module.css"

export const metadata: Metadata = {
  title: "Mini cart badge | Storefront",
  description: "Primitive 04 — header cart icon with count badge and pulse on add.",
}

export default function MiniCartBadgePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Mini cart badge"
        title="Mini cart badge"
        description="Header cart icon with item-count badge. Pulses when count increases, surfaces optional currency total, supports solid and outline variants."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Mini cart badge" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · solid · 3 items · $2,670</span>
        <div style={{ display: "flex", gap: "var(--primitive-space-4)", flexWrap: "wrap" }}>
          <MiniCartBadge count={3} totalLabel="$2,670.00" />
        </div>
        <span className={styles.stageCaption}>State 02 · outline · 1 item · no total</span>
        <div style={{ display: "flex", gap: "var(--primitive-space-4)", flexWrap: "wrap" }}>
          <MiniCartBadge count={1} variant="outline" />
        </div>
        <span className={styles.stageCaption}>State 03 · empty · max overflow (99+)</span>
        <div style={{ display: "flex", gap: "var(--primitive-space-4)", flexWrap: "wrap" }}>
          <MiniCartBadge count={0} />
          <MiniCartBadge count={140} totalLabel="$48,290.00" />
        </div>
      </section>
    </main>
  )
}
