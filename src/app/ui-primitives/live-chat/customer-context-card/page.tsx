import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CustomerContextCard } from "../../components/live-chat"

import { HILUX_CART } from "../_mock-data"
import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "Customer context card | Live chat",
  description:
    "Primitive 05 — right-rail customer profile with page-viewing, cart contents, past chats and open ticket counts.",
}

export default function CustomerContextCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Context"
        title="Customer context card"
        description="The right-rail customer card. Up top: avatar, name, contact and an optional persona chip. Then the page the visitor is on right now, a three-stat row (cart items, past chats, open tickets) and the live cart contents with AUD totals. Composes Avatar + Chip; surfaces realistic Mufflermen part lines."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Customer context card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · Mick Davis · Hilux fitment scenario
        </span>
        <CustomerContextCard
          visitorName="Mick Davis"
          contact="mick.davis@example.com.au · +61 412 884 902"
          pageTitle="Manta 3in cat-back · high-clearance variant"
          pageMeta="/parts/manta-3in-cat-back/hilux-n80-long-range · 14m on site"
          cart={HILUX_CART}
          pastChats={4}
          openTickets={1}
          persona="Returning customer · LTV $12,845"
        />
      </section>
    </main>
  )
}
