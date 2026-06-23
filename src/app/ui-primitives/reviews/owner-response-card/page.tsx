import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OwnerResponseCard } from "../../components/reviews"

import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Owner response card | Reviews",
  description:
    "Primitive 07 — workshop reply card nested inside a review.",
}

export default function OwnerResponseCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Reply"
        title="Owner response card"
        description="The workshop reply nested under a review. Visually distinct via a brand-red border + role badge so readers can scan replies separately from review bodies."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Owner response" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop response to a positive review</span>
        <OwnerResponseCard
          responderName="Dani · Oak Flats Mufflermen"
          responderRole="Workshop response"
          body="Cheers Marcus — glad the drone is sorted. Drop in for a torque check after the next thousand kays."
          timestamp="2 days ago"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop response to a quote-walkup review</span>
        <OwnerResponseCard
          responderName="Brett · Oak Flats Mufflermen"
          responderRole="Service manager"
          body="Fair feedback Sarah — we’re trialling a quote-movement SMS so the customer signs off the new total before extra drill time."
          timestamp="2 weeks ago"
          avatarTone="amber"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Tech-tier reply explaining a fitment choice</span>
        <OwnerResponseCard
          responderName="Macca · Bay 2 tech"
          responderRole="Workshop tech"
          body="Toby — we offset the mid-mount hanger by 14 mm so the Manta cat-back clears the spare-tyre carrier on the BT-50. Glad it cleared engineering first pass."
          timestamp="1 week ago"
          avatarTone="teal"
        />
      </section>
    </main>
  )
}
