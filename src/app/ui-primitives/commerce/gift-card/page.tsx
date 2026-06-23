import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../commerce.module.css"

import { GiftCardScene } from "./gift-card-scene"

export const metadata: Metadata = {
  title: "Gift card | Commerce | UI Primitives",
  description:
    "Gift card redeem hero with segmented code input and balance reveal animation, plus recent redemptions list.",
}

export default function GiftCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 06"
        title="Gift card"
        description="Redeem a 16-character workshop gift card. Try OFM-XXXX-XXXX-XXXX or MUFFLER-WAVE-2024-XXXX to see the balance reveal. Paste a full code to auto-fill all four segments."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Commerce", href: "/ui-primitives/commerce" },
          { label: "Gift card" },
        ]}
      />
      <GiftCardScene />
    </main>
  )
}
