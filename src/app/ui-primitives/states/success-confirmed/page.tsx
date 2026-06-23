import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../states.module.css"
import { SuccessConfirmedDemo } from "./success-confirmed-demo"

export const metadata: Metadata = {
  title: "Success confirmed | UI Primitives — System States",
}

export default function SuccessConfirmedShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.12 / System states"
        title="Workshop · job confirmed"
        description="Chequered flag with a drawn-in tick badge. Optional confetti cannon (respects reduced motion), workshop-grade summary rows, and a follow-up CTA into the ledger."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Success confirmed" },
        ]}
      />
      <section className={styles.canvas}>
        <SuccessConfirmedDemo />
      </section>
    </main>
  )
}
